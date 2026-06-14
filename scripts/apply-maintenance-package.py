from __future__ import annotations

import argparse
import importlib.util
from pathlib import Path
from types import ModuleType


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_IMAGE_OUT = ROOT / "data" / "image-review-decisions.js"
DEFAULT_MAINTENANCE_OUT = ROOT / "data" / "maintenance-overrides.js"


def load_helper(name: str, filename: str) -> ModuleType:
    path = SCRIPT_DIR / filename
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load helper script: {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Apply a full maintenance package to the static review and maintenance data files.",
    )
    parser.add_argument("input", type=Path, help="JSON exported from the maintenance package, image review, or maintenance panel")
    parser.add_argument("--image-out", type=Path, default=DEFAULT_IMAGE_OUT, help=f"Image review output, default: {DEFAULT_IMAGE_OUT}")
    parser.add_argument(
        "--maintenance-out",
        type=Path,
        default=DEFAULT_MAINTENANCE_OUT,
        help=f"Maintenance override output, default: {DEFAULT_MAINTENANCE_OUT}",
    )
    parser.add_argument("--skip-image-review", action="store_true", help="Do not write image review decisions")
    parser.add_argument("--skip-maintenance-overrides", action="store_true", help="Do not write maintenance overrides")
    parser.add_argument("--dry-run", action="store_true", help="Validate and summarize without writing")
    args = parser.parse_args()

    image_review = load_helper("apply_image_review", "apply-image-review.py")
    maintenance = load_helper("apply_maintenance_overrides", "apply-maintenance-overrides.py")

    review_decisions = {} if args.skip_image_review else image_review.load_payload(args.input)
    maintenance_overrides = {} if args.skip_maintenance_overrides else maintenance.load_payload(args.input)

    if not args.dry_run:
        if not args.skip_image_review:
            image_review.write_js(review_decisions, args.image_out)
        if not args.skip_maintenance_overrides:
            maintenance.write_js(maintenance_overrides, args.maintenance_out)

    review_counts = {action: 0 for action in sorted(image_review.VALID_ACTIONS)}
    for row in review_decisions.values():
        review_counts[row["action"]] += 1
    coordinate_overrides = sum(1 for row in maintenance_overrides.values() if "lat" in row and "lng" in row)

    target = "(dry run)" if args.dry_run else "static data files"
    print(f"maintenance package -> {target}")
    if not args.skip_image_review:
        print(f"image review decisions: {len(review_decisions)}")
        print("actions:", ", ".join(f"{key}={value}" for key, value in review_counts.items()))
    if not args.skip_maintenance_overrides:
        print(f"maintenance overrides: {len(maintenance_overrides)}")
        print(f"coordinate overrides: {coordinate_overrides}")


if __name__ == "__main__":
    main()
