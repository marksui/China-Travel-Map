from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFESTS = (
    ("data/attraction-images.js", "window.CHINA_5A_IMAGES = "),
    ("data/attraction-images-4a.js", "window.CHINA_4A_IMAGES = "),
)


def main() -> None:
    args = parse_args()
    changed = []
    skipped = []

    for file_name, marker in DEFAULT_MANIFESTS:
        if args.manifest and file_name != args.manifest:
            continue
        manifest = read_js_value(ROOT / file_name, marker)
        for attraction_id, entry in manifest.items():
            if attraction_id == "fallback":
                continue
            url = entry.get("url") or entry.get("src") or entry.get("local") or ""
            if not url.startswith("assets/images/"):
                continue
            image_path = ROOT / url
            if not image_path.exists():
                skipped.append((attraction_id, url, "missing"))
                continue
            try:
                if normalize_image(image_path, args.max_side, args.quality):
                    changed.append((attraction_id, url))
            except Exception as error:  # noqa: BLE001 - keep batch moving
                skipped.append((attraction_id, url, str(error)))

    print(json.dumps({"changed": len(changed), "skipped": skipped}, ensure_ascii=False, indent=2))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", default="")
    parser.add_argument("--max-side", type=int, default=900)
    parser.add_argument("--quality", type=int, default=78)
    return parser.parse_args()


def read_js_value(path: Path, marker: str) -> dict:
    text = path.read_text(encoding="utf-8")
    start = text.index(marker) + len(marker)
    end = text.index(";\n", start) if ";\n" in text[start:] else text.rindex(";")
    return json.loads(text[start:end])


def normalize_image(path: Path, max_side: int, quality: int) -> bool:
    with Image.open(path) as source:
        orientation = source.getexif().get(274)
        image = ImageOps.exif_transpose(source).convert("RGB")
        original_size = image.size
        image.thumbnail((max_side, max_side))
        needs_orientation = bool(orientation and orientation != 1)
        needs_resize = image.size != original_size
        needs_jpeg = not is_jpeg(path)
        if not needs_orientation and not needs_resize and not needs_jpeg:
            return False
        image.save(path, "JPEG", quality=quality, optimize=True)
    return True


def is_jpeg(path: Path) -> bool:
    with path.open("rb") as handle:
        return handle.read(3) == b"\xff\xd8\xff"


if __name__ == "__main__":
    main()
