from __future__ import annotations

import argparse
import csv
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT = ROOT / "china-travel-map-maintenance.json"
REVIEW_ACTIONS = {"keep", "replace", "delete", "missing"}


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert edited maintenance queue CSV files into a maintenance package JSON.",
    )
    parser.add_argument("inputs", nargs="+", type=Path, help="CSV file(s) or directory/directories exported by audit-maintenance.mjs")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT, help=f"Output package, default: {DEFAULT_OUT}")
    parser.add_argument("--dry-run", action="store_true", help="Summarize without writing the package")
    args = parser.parse_args()

    csv_files = expand_inputs(args.inputs)
    package = build_package(csv_files)

    if not args.dry_run:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(f"{json.dumps(package, ensure_ascii=False, indent=2)}\n", encoding="utf-8")

    target = "(dry run)" if args.dry_run else args.out
    print(f"maintenance CSV package -> {target}")
    print(f"csv files: {len(csv_files)}")
    print(f"image review decisions: {len(package['reviewDecisions'])}")
    print(f"maintenance overrides: {len(package['maintenanceOverrides'])}")


def expand_inputs(inputs: list[Path]) -> list[Path]:
    files: list[Path] = []
    for input_path in inputs:
        path = input_path.resolve()
        if path.is_dir():
            files.extend(sorted(file for file in path.glob("*.csv") if file.name != "queue-summary.csv"))
        elif path.is_file():
            files.append(path)
        else:
            raise FileNotFoundError(path)
    return sorted(unique_paths(files))


def unique_paths(paths: list[Path]) -> list[Path]:
    seen: set[Path] = set()
    unique: list[Path] = []
    for path in paths:
        resolved = path.resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        unique.append(resolved)
    return unique


def build_package(csv_files: list[Path]) -> dict[str, Any]:
    generated_at = datetime.now(timezone.utc).isoformat()
    review_decisions: dict[str, dict[str, Any]] = {}
    maintenance_overrides: dict[str, dict[str, Any]] = {}

    for csv_file in csv_files:
        for row in read_csv_rows(csv_file):
            item_id = clean_string(row.get("id"))
            if not item_id:
                continue
            review = review_decision_from_row(row, generated_at)
            if review:
                review_decisions[item_id] = merge_non_empty(review_decisions.get(item_id, {}), review)
            override = maintenance_override_from_row(row, generated_at)
            if override:
                maintenance_overrides[item_id] = merge_non_empty(maintenance_overrides.get(item_id, {}), override)

    return {
        "generatedAt": generated_at,
        "source": "scripts/maintenance-csv-to-package.py",
        "reviewDecisions": dict(sorted(review_decisions.items())),
        "maintenanceOverrides": dict(sorted(maintenance_overrides.items())),
    }


def read_csv_rows(csv_file: Path) -> list[dict[str, str]]:
    with csv_file.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            return []
        return [{clean_string(key): value for key, value in row.items() if key is not None} for row in reader]


def review_decision_from_row(row: dict[str, str], updated_at: str) -> dict[str, Any] | None:
    action = clean_string(row.get("reviewAction") or row.get("action"))
    if action not in REVIEW_ACTIONS:
        return None

    decision = base_fields(row, updated_at)
    decision["action"] = action
    decision["note"] = clean_string(row.get("note"))
    decision["imageUrl"] = normalize_local_image(clean_string(row.get("imageUrl")))
    decision["pageUrl"] = clean_string(row.get("pageUrl") or row.get("imagePageUrl"))

    replacement_url = normalize_local_image(clean_string(row.get("replacementUrl")))
    if replacement_url:
        decision["replacementUrl"] = replacement_url
        if action == "replace" and not decision["note"]:
            decision["note"] = replacement_url

    return compact(decision)


def maintenance_override_from_row(row: dict[str, str], updated_at: str) -> dict[str, Any] | None:
    override = base_fields(row, updated_at)
    edited = False

    lat = number_field(row.get("newLat"))
    lng = number_field(row.get("newLng"))
    if lat is not None and lng is not None and -90 <= lat <= 90 and -180 <= lng <= 180:
        override["lat"] = round(lat, 6)
        override["lng"] = round(lng, 6)
        edited = True

    for source_key, target_key in [
        ("newCoordinateLevel", "coordinateLevel"),
        ("newCoordinateLabel", "coordinateLabel"),
        ("newCategory", "categoryOverride"),
        ("newSourceKey", "sourceKey"),
        ("newDataUpdated", "dataUpdated"),
    ]:
        value = clean_string(row.get(source_key))
        if value:
            override[target_key] = value
            edited = True

    themes = split_choices(row.get("newThemes"))
    if themes:
        override["themeOverride"] = themes
        edited = True

    seasons = split_choices(row.get("newSeasons"))
    if seasons:
        override["seasonOverride"] = seasons
        edited = True

    if edited:
        note = clean_string(row.get("maintenanceNote") or row.get("note"))
        if note:
            override["note"] = note
        return compact(override)
    return None


def base_fields(row: dict[str, str], updated_at: str) -> dict[str, Any]:
    name = clean_string(row.get("name") or row.get("displayName"))
    display_name = clean_string(row.get("displayName") or row.get("name"))
    return {
        "id": clean_string(row.get("id")),
        "name": name,
        "displayName": display_name,
        "province": clean_string(row.get("province")),
        "city": clean_string(row.get("city")),
        "updatedAt": clean_string(row.get("updatedAt")) or updated_at,
    }


def merge_non_empty(existing: dict[str, Any], incoming: dict[str, Any]) -> dict[str, Any]:
    merged = dict(existing)
    for key, value in incoming.items():
        if value not in ("", None, []):
            merged[key] = value
    return merged


def compact(row: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in row.items() if value not in ("", None, [])}


def clean_string(value: Any) -> str:
    return str(value or "").strip()


def number_field(value: Any) -> float | None:
    try:
        number = float(clean_string(value))
    except (TypeError, ValueError):
        return None
    return number if number == number else None


def normalize_local_image(value: str) -> str:
    normalized = value.replace("\\", "/")
    if normalized.startswith("assets/images/") and normalized.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        return normalized
    return ""


def split_choices(value: Any) -> list[str]:
    text = clean_string(value)
    if not text:
        return []
    parts = re.split(r"[\s,;|/\u3001\uff0c\uff1b]+", text)
    choices: list[str] = []
    for part in parts:
        key = part.strip()
        if key and key not in choices:
            choices.append(key)
    return choices


if __name__ == "__main__":
    main()
