from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

import lxml.html
import requests


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


ROOT = Path(__file__).resolve().parents[1]
ATTRACTIONS_PATH = ROOT / "data" / "attractions-4a.js"
MANIFEST_PATH = ROOT / "data" / "attraction-images-4a.js"
MISSING_PATH = ROOT / "data" / "attraction-images-4a-missing.json"
SOURCES_PATH = ROOT / "assets" / "images" / "SOURCES-4A.md"
IMAGE_ROOT = ROOT / "assets" / "images"

WIKI_4A_URL = "https://zh.wikipedia.org/wiki/%E5%9B%BD%E5%AE%B64A%E7%BA%A7%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA"
UA = "ChinaTravelMap4AImageBuilder/1.0 (local static site build)"

REJECTED_TERMS = (
    "logo",
    "icon",
    "svg",
    "map",
    "locator",
    "diagram",
    "chart",
    "graph",
    "poster",
    "collage",
    "montage",
    "selfie",
    "portrait",
    "group photo",
    "floor plan",
    "site plan",
    "位置图",
    "地图",
    "示意图",
    "分布图",
    "徽标",
    "标志",
    "海报",
    "拼图",
    "合成",
    "自拍",
)


def main() -> None:
    args = parse_args()
    attractions = load_js_value(ATTRACTIONS_PATH, "CHINA_4A_ATTRACTIONS", [])
    existing = load_js_value(MANIFEST_PATH, "CHINA_4A_IMAGES", {})
    paths = build_image_paths(attractions, existing)
    selected = select_attractions(attractions, existing, args)

    session = requests.Session()
    session.headers.update({"User-Agent": UA})
    wiki_links = parse_wiki_links(session)
    linked_candidates = load_linked_page_images(session, selected, wiki_links)

    manifest = dict(existing)
    missing = []
    downloaded = 0
    skipped = 0

    for index, attraction in enumerate(selected, 1):
        if not args.force and attraction["id"] in manifest and image_exists(manifest[attraction["id"]]):
            skipped += 1
            continue

        candidates = []
        candidates.extend(linked_candidates.get(attraction["id"], []))
        if args.commons:
            candidates.extend(search_commons(session, attraction, args))
        if args.openverse:
            candidates.extend(search_openverse(session, attraction, args))

        candidates = rank_candidates(candidates, attraction)
        if not candidates:
            missing.append(missing_row(attraction, "no reliable open image candidate"))
            if not args.quiet_missing:
                print(f"[{index}/{len(selected)}] missing {attraction['id']} {attraction['name']}")
            continue

        rel_path = paths[attraction["id"]]
        out_path = IMAGE_ROOT / rel_path
        source = None
        for candidate in candidates:
            try:
                download_image(session, candidate, out_path, args)
                source = candidate
                break
            except Exception as error:  # noqa: BLE001 - keep batch moving
                print(f"  skip candidate {candidate.get('title', '')}: {error}")

        if not source:
            missing.append(missing_row(attraction, "download failed"))
            print(f"[{index}/{len(selected)}] failed {attraction['id']} {attraction['name']}")
            continue

        manifest[attraction["id"]] = {
            "url": f"assets/images/{rel_path.as_posix()}",
            "pageUrl": source["pageUrl"],
            "caption": f"图片来源：{source['source']} · {source['title']}",
        }
        downloaded += 1
        print(f"[{index}/{len(selected)}] saved {attraction['id']} {attraction['name']} <- {source['source']} · {source['title']}")

        if downloaded % args.flush_every == 0:
            write_outputs(manifest, missing, attractions)

    write_outputs(manifest, missing, attractions)
    print(f"Done. downloaded={downloaded}, skipped={skipped}, manifest={len(manifest)}, missing_this_run={len(missing)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--from", dest="from_index", type=int, default=1)
    parser.add_argument("--to", dest="to_index", type=int, default=0)
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--province", default="")
    parser.add_argument("--targets", default="")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--commons", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--openverse", action=argparse.BooleanOptionalAction, default=False)
    parser.add_argument("--width", type=int, default=900)
    parser.add_argument("--quality", type=int, default=72)
    parser.add_argument("--gap", type=float, default=0.18)
    parser.add_argument("--download-gap", type=float, default=0.15)
    parser.add_argument("--retries", type=int, default=3)
    parser.add_argument("--retry-gap", type=float, default=1.8)
    parser.add_argument("--flush-every", type=int, default=20)
    parser.add_argument("--quiet-missing", action="store_true")
    return parser.parse_args()


def load_js_value(path: Path, variable: str, fallback):
    if not path.exists():
        return fallback
    text = path.read_text(encoding="utf-8")
    marker = f"window.{variable} = "
    if marker not in text:
        return fallback
    start = text.index(marker) + len(marker)
    end = text.index(";\n", start) if ";\n" in text[start:] else text.rindex(";")
    return json.loads(text[start:end])


def select_attractions(attractions: list[dict], manifest: dict, args: argparse.Namespace) -> list[dict]:
    targets = {item.strip() for item in args.targets.split(",") if item.strip()}
    selected = []
    for number, attraction in enumerate(attractions, 1):
        if args.province and attraction.get("province") != args.province:
            continue
        if targets and attraction["id"] not in targets and attraction["name"] not in targets:
            continue
        if number < args.from_index:
            continue
        if args.to_index and number > args.to_index:
            continue
        if not args.force and attraction["id"] in manifest and image_exists(manifest[attraction["id"]]):
            continue
        selected.append(attraction)
        if args.limit and len(selected) >= args.limit:
            break
    return selected


def image_exists(entry: dict) -> bool:
    url = entry.get("url", "")
    if not url.startswith("assets/images/"):
        return False
    return (ROOT / url).exists()


def parse_wiki_links(session: requests.Session) -> dict[tuple[str, str, str], dict]:
    html = session.get(WIKI_4A_URL, timeout=60).text
    root = lxml.html.fromstring(html)
    links = {}

    for table in root.xpath('//table[contains(@class,"wikitable")]'):
        previous = table.xpath("preceding::*[self::h2 or self::h3 or self::h4][1]")
        heading = "".join(previous[0].itertext()).strip() if previous else ""
        if "摘牌" in heading:
            continue
        province = province_short(heading)
        for row in table.xpath(".//tr"):
            cells = row.xpath("./td|./th")
            if len(cells) < 2:
                continue
            name = normalize("".join(cells[0].itertext()))
            location = normalize("".join(cells[1].itertext()))
            link = cells[0].xpath('.//a[starts-with(@href,"/wiki/") and not(contains(@href,":"))][1]')
            if not province or not name or not link:
                continue
            title = unquote(link[0].get("href").split("/wiki/", 1)[1].split("#", 1)[0]).replace("_", " ")
            links[(province, name, location)] = {
                "title": title,
                "pageUrl": f"https://zh.wikipedia.org/wiki/{quote(title.replace(' ', '_'))}",
            }
    return links


def load_linked_page_images(session: requests.Session, attractions: list[dict], wiki_links: dict) -> dict[str, list[dict]]:
    links_by_name = {}
    for key, link in wiki_links.items():
        province, name, _location = key
        links_by_name.setdefault((province, name), link)

    title_by_id = {}
    for attraction in attractions:
        link = wiki_links.get((attraction["province"], attraction["name"], attraction.get("city", ""))) or wiki_links.get(
            (attraction["province"], attraction["name"], "")
        ) or links_by_name.get((attraction["province"], attraction["name"]))
        if link:
            title_by_id[attraction["id"]] = link["title"]

    ids_by_title = {}
    for attraction_id, title in title_by_id.items():
        ids_by_title.setdefault(title, []).append(attraction_id)

    candidates = {}
    titles = list(ids_by_title)
    for start in range(0, len(titles), 45):
        batch = titles[start : start + 45]
        params = {
            "origin": "*",
            "action": "query",
            "titles": "|".join(batch),
            "redirects": "1",
            "prop": "pageimages|info",
            "piprop": "thumbnail|original|name",
            "pithumbsize": "1280",
            "inprop": "url",
            "format": "json",
        }
        data = fetch_json(session, "https://zh.wikipedia.org/w/api.php", params)
        pages = data.get("query", {}).get("pages", {})
        redirects = {item.get("from"): item.get("to") for item in data.get("query", {}).get("redirects", [])}
        page_by_title = {page.get("title"): page for page in pages.values()}
        for title in batch:
            page = page_by_title.get(redirects.get(title, title)) or page_by_title.get(title)
            candidate = wikipedia_candidate(page)
            if not candidate:
                continue
            for attraction_id in ids_by_title.get(title, []):
                candidates.setdefault(attraction_id, []).append({**candidate, "trusted": True})
        time.sleep(0.08)
    return candidates


def wikipedia_candidate(page: dict | None) -> dict | None:
    if not page or not page.get("thumbnail", {}).get("source"):
        return None
    file_name = page.get("pageimage")
    width = page.get("original", {}).get("width") or page.get("thumbnail", {}).get("width")
    height = page.get("original", {}).get("height") or page.get("thumbnail", {}).get("height")
    candidate = {
        "url": commons_redirect_url(file_name) or page["thumbnail"]["source"],
        "pageUrl": page.get("fullurl") or f"https://zh.wikipedia.org/wiki/{quote(page.get('title', '').replace(' ', '_'))}",
        "title": page.get("title", "维基百科图片"),
        "source": "维基百科",
        "width": width,
        "height": height,
        "text": " ".join([page.get("title", ""), page.get("pageimage", ""), page.get("fullurl", "")]),
    }
    return candidate if allowed(candidate) else None


def search_commons(session: requests.Session, attraction: dict, args: argparse.Namespace) -> list[dict]:
    queries = image_queries(attraction)
    candidates = []
    for query in queries[:3]:
        params = {
            "origin": "*",
            "action": "query",
            "generator": "search",
            "gsrsearch": query,
            "gsrnamespace": "6",
            "gsrlimit": "8",
            "prop": "imageinfo",
            "iiurlwidth": "1280",
            "iiprop": "url|mime|size|extmetadata",
            "format": "json",
        }
        data = fetch_json(session, "https://commons.wikimedia.org/w/api.php", params)
        for page in data.get("query", {}).get("pages", {}).values():
            info = (page.get("imageinfo") or [{}])[0]
            meta = info.get("extmetadata") or {}
            file_name = strip_file_prefix(page.get("title", "Wikimedia Commons image"))
            candidate = {
                "url": commons_redirect_url(file_name, args.width) or info.get("thumburl") or info.get("url"),
                "pageUrl": info.get("descriptionurl"),
                "title": file_name,
                "source": "Wikimedia Commons",
                "width": info.get("width"),
                "height": info.get("height"),
                "text": " ".join(
                    [
                        page.get("title", ""),
                        clean_html(meta.get("ObjectName", {}).get("value", "")),
                        clean_html(meta.get("ImageDescription", {}).get("value", "")),
                    ]
                ),
            }
            if allowed(candidate):
                candidates.append(candidate)
        time.sleep(args.gap)
        if rank_candidates(candidates, attraction):
            break
    return candidates


def search_openverse(session: requests.Session, attraction: dict, args: argparse.Namespace) -> list[dict]:
    candidates = []
    for query in image_queries(attraction)[:2]:
        params = {
            "q": query,
            "page_size": 8,
            "mature": "false",
            "extension": "jpg,png,webp",
        }
        data = fetch_json(session, "https://api.openverse.engineering/v1/images/", params)
        for item in data.get("results", []):
            creator = item.get("creator") or ""
            source = item.get("source") or "Openverse"
            license_code = item.get("license") or ""
            title = item.get("title") or f"{attraction['name']} photo"
            candidate = {
                "url": item.get("url") or item.get("thumbnail"),
                "pageUrl": item.get("foreign_landing_url") or item.get("url"),
                "title": title,
                "source": f"Openverse/{source}",
                "width": item.get("width"),
                "height": item.get("height"),
                "text": " ".join(
                    [
                        title,
                        creator,
                        source,
                        license_code,
                        item.get("foreign_landing_url") or "",
                    ]
                ),
            }
            if allowed(candidate) and has_explicit_name_match(candidate, attraction):
                candidates.append(candidate)
        time.sleep(args.gap)
        if rank_candidates(candidates, attraction):
            break
    return candidates


def fetch_json(session: requests.Session, url: str, params: dict) -> dict:
    try:
        response = session.get(url, params=params, timeout=45)
        if not response.ok:
            return {}
        return response.json()
    except Exception:
        return {}


def image_queries(attraction: dict) -> list[str]:
    name = attraction["name"]
    clean = clean_name(name)
    city = attraction.get("city", "")
    province = attraction.get("province", "")
    return unique(
        [
            f"{name} {city} {province} China",
            f"{clean} {city} {province} China",
            f"{name} {province} 中国",
            f"{clean} 中国",
            name,
        ]
    )


def rank_candidates(candidates: list[dict], attraction: dict) -> list[dict]:
    scored = []
    for candidate in candidates:
        score = score_candidate(candidate, attraction)
        if candidate.get("trusted"):
            score += 12
        if score >= (8 if candidate.get("trusted") else 11):
            scored.append((score, candidate))
    scored.sort(key=lambda item: (item[0], image_area(item[1])), reverse=True)
    return [candidate for _, candidate in scored]


def score_candidate(candidate: dict, attraction: dict) -> int:
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    name = clean_name(attraction["name"])
    raw_name = normalize_search(attraction["name"])
    clean = normalize_search(name)
    city = normalize_search(attraction.get("city", ""))
    province = normalize_search(attraction.get("province", ""))
    score = 0
    if raw_name and raw_name in text:
        score += 10
    if clean and clean in text:
        score += 8
    for token in meaningful_tokens(name):
        if token in text:
            score += 4
    if city and city in text:
        score += 2
    if province and province in text:
        score += 1
    if candidate.get("source") == "Wikimedia Commons":
        score += 2
    width, height = candidate.get("width") or 0, candidate.get("height") or 0
    if width and height and 1.05 <= width / height <= 2.1:
        score += 1
    return score


def has_explicit_name_match(candidate: dict, attraction: dict) -> bool:
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    raw_name = normalize_search(attraction["name"])
    clean = normalize_search(clean_name(attraction["name"]))
    if raw_name and raw_name in text:
        return True
    if clean and clean in text:
        return True
    return any(token in text for token in meaningful_tokens(attraction["name"]))


def download_image(session: requests.Session, source: dict, out_path: Path, args: argparse.Namespace) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    urls = unique([compressed_url(source["url"], args), source["url"]])
    last_error = None
    for url in urls:
        for attempt in range(max(args.retries, 1)):
            try:
                response = session.get(url, timeout=60)
                if not response.ok:
                    raise RuntimeError(f"HTTP {response.status_code}")
                content = response.content
                if len(content) < 3500 or not looks_like_image(content):
                    raise RuntimeError("not an image")
                out_path.write_bytes(content)
                if args.download_gap:
                    time.sleep(args.download_gap)
                return
            except Exception as error:  # noqa: BLE001
                last_error = error
                if "HTTP 429" in str(error) or "HTTP 5" in str(error):
                    time.sleep(args.retry_gap * (attempt + 1))
                else:
                    time.sleep(0.25)
    raise RuntimeError(str(last_error))


def compressed_url(url: str, args: argparse.Namespace) -> str:
    parsed = urlparse(url)
    if not parsed.netloc:
        return url
    if parsed.netloc == "commons.wikimedia.org" and "/Special:Redirect/file/" in parsed.path:
        return url
    source = f"{parsed.netloc}{parsed.path}"
    if parsed.query:
        source += f"?{parsed.query}"
    return f"https://images.weserv.nl/?url={quote(source, safe=':/?=&%')}&w={args.width}&output=jpg&q={args.quality}"


def commons_redirect_url(file_name: str | None, width: int = 960) -> str | None:
    if not file_name:
        return None
    return f"https://commons.wikimedia.org/wiki/Special:Redirect/file/{quote(file_name)}?width={width}"


def looks_like_image(content: bytes) -> bool:
    return (
        content.startswith(b"\xff\xd8\xff")
        or content.startswith(b"\x89PNG\r\n\x1a\n")
        or content.startswith(b"RIFF")
        or content.startswith(b"GIF87a")
        or content.startswith(b"GIF89a")
    )


def allowed(candidate: dict) -> bool:
    if not candidate.get("url") or not candidate.get("pageUrl"):
        return False
    url = candidate["url"].lower()
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", ""), url]))
    if any(term in text for term in REJECTED_TERMS):
        return False
    if url.endswith(".svg") or "/svg/" in url:
        return False
    width, height = candidate.get("width") or 0, candidate.get("height") or 0
    if width and height:
        if width < 420 or height < 260:
            return False
        ratio = width / height
        if ratio < 0.72 or ratio > 2.75:
            return False
    return True


def build_image_paths(attractions: list[dict], existing: dict) -> dict[str, Path]:
    used = {entry.get("url", "").replace("assets/images/", "").lower() for entry in existing.values() if entry.get("url")}
    paths = {}
    for attraction in attractions:
        existing_url = existing.get(attraction["id"], {}).get("url", "")
        if existing_url.startswith("assets/images/"):
            paths[attraction["id"]] = Path(existing_url.replace("assets/images/", ""))
            continue
        province = safe_path(attraction.get("province") or "未分组")
        name = safe_path(attraction.get("name") or attraction["id"])
        city = safe_path(attraction.get("city") or "")
        rel = Path("4A") / province / f"{name}.jpg"
        if rel.as_posix().lower() in used and city:
            rel = Path("4A") / province / f"{name}-{city}.jpg"
        index = 2
        while rel.as_posix().lower() in used:
            rel = Path("4A") / province / f"{name}-{index}.jpg"
            index += 1
        used.add(rel.as_posix().lower())
        paths[attraction["id"]] = rel
    return paths


def write_outputs(manifest: dict, missing: list[dict], attractions: list[dict]) -> None:
    ordered_manifest = {key: manifest[key] for key in sorted(manifest, key=sort_key)}
    complete_missing = build_complete_missing(ordered_manifest, missing, attractions)
    MANIFEST_PATH.write_text(
        "// Generated by scripts/build-4a-images.py. Do not edit by hand.\n"
        f"window.CHINA_4A_IMAGES = {json.dumps(ordered_manifest, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    MISSING_PATH.write_text(json.dumps(complete_missing, ensure_ascii=False, indent=2), encoding="utf-8")
    SOURCES_PATH.write_text(build_sources_markdown(ordered_manifest, attractions), encoding="utf-8")


def build_complete_missing(manifest: dict, run_missing: list[dict], attractions: list[dict]) -> list[dict]:
    run_missing_by_id = {row["id"]: row for row in run_missing}
    complete = []
    for attraction in attractions:
        attraction_id = attraction["id"]
        if attraction_id in manifest and image_exists(manifest[attraction_id]):
            continue
        row = run_missing_by_id.get(attraction_id) or missing_row(attraction, "not fetched yet or no reliable open image candidate")
        complete.append(row)
    return complete


def build_sources_markdown(manifest: dict, attractions: list[dict]) -> str:
    by_id = {item["id"]: item for item in attractions}
    lines = [
        "# 4A 图片来源",
        "",
        "本文件记录 4A 景区本地插图来源。脚本只写入已找到可靠开放来源并保存到本地的图片。",
        "",
        "| ID | 景点 | 本地文件 | 来源 | 来源页面 |",
        "| --- | --- | --- | --- | --- |",
    ]
    for attraction_id, entry in manifest.items():
        attraction = by_id.get(attraction_id, {})
        caption = entry.get("caption", "").replace("图片来源：", "")
        source = caption or "未标注"
        file_path = entry.get("url", "").replace("assets/images/", "assets/images/")
        lines.append(
            f"| {attraction_id} | {attraction.get('name', attraction_id)} | `{file_path}` | {source} | [链接]({entry.get('pageUrl', '')}) |"
        )
    return "\n".join(lines) + "\n"


def missing_row(attraction: dict, reason: str) -> dict:
    return {
        "id": attraction["id"],
        "province": attraction.get("province"),
        "city": attraction.get("city"),
        "name": attraction.get("name"),
        "reason": reason,
    }


def sort_key(attraction_id: str):
    match = re.search(r"4A-(\d+)$", attraction_id)
    return (int(match.group(1)) if match else 0, attraction_id)


def clean_name(name: str) -> str:
    return re.sub(r"[（(].*?[）)]", "", normalize(name)).replace("·", " ").replace("—", " ").replace("-", " ").strip()


def meaningful_tokens(name: str) -> list[str]:
    stripped = re.sub(r"旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院|博物馆|文化园区|度假区|示范区|保护区", " ", name)
    return [normalize_search(item) for item in re.split(r"\s+|·|—|-", stripped) if len(item.strip()) >= 2]


def province_short(full_name: str) -> str:
    name = normalize(full_name)
    for suffix in ("维吾尔自治区", "壮族自治区", "回族自治区", "特别行政区", "自治区", "省", "市"):
        if name.endswith(suffix):
            return name[: -len(suffix)]
    return name


def normalize(value: str) -> str:
    return (
        str(value or "")
        .replace("壯", "壮")
        .replace("區", "区")
        .replace("縣", "县")
        .replace("臺", "台")
        .replace("\u3000", " ")
        .strip()
    )


def normalize_search(value: str) -> str:
    return re.sub(r"\s+", "", normalize(value).lower())


def safe_path(value: str) -> str:
    cleaned = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "-", normalize(value))
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" .")
    return (cleaned or "未命名")[:90]


def strip_file_prefix(title: str) -> str:
    return re.sub(r"^(File|Image):", "", title or "", flags=re.I).strip()


def clean_html(value: str) -> str:
    return re.sub(r"<[^>]+>", " ", value or "")


def unique(values: list[str]) -> list[str]:
    seen = set()
    result = []
    for value in values:
        normalized = normalize(value)
        if normalized and normalized not in seen:
            seen.add(normalized)
            result.append(normalized)
    return result


def image_area(candidate: dict) -> int:
    return int(candidate.get("width") or 0) * int(candidate.get("height") or 0)


if __name__ == "__main__":
    main()
