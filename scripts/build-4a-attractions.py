from __future__ import annotations

import json
import math
import os
import re
from collections import defaultdict
from datetime import datetime, timezone
from io import StringIO
from pathlib import Path

import lxml.html
import pandas as pd
import requests


ROOT = Path(__file__).resolve().parents[1]
OUT_FILE = ROOT / "data" / "attractions-4a.js"

WIKI_4A_URL = "https://zh.wikipedia.org/wiki/%E5%9B%BD%E5%AE%B64A%E7%BA%A7%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA"
CITY_GEO_URL = "https://raw.githubusercontent.com/88250/city-geo/master/data.json"
USER_AGENT = "ChinaTravelMap/1.0 (https://github.com/marksui/China-Travel-Map)"


MANUAL_LOCATION_OVERRIDES = {
    "雄安新区": (38.990, 115.872, "雄安新区"),
    "沈抚改革创新示范区": (41.847, 123.704, "沈抚改革创新示范区"),
    "平潭综合实验区": (25.503, 119.789, "平潭综合实验区"),
    "长白山保护开发区": (42.420, 128.083, "长白山保护开发区"),
    "长白山管委会": (42.420, 128.083, "长白山管委会"),
    "梅河口市": (42.539, 125.711, "梅河口市"),
    "韩城市": (35.477, 110.442, "韩城市"),
    "杨凌示范区": (34.272, 108.085, "杨凌示范区"),
    "西咸新区": (34.307, 108.712, "西咸新区"),
    "兰州新区": (36.503, 103.620, "兰州新区"),
    "天府新区": (30.404, 104.076, "天府新区"),
    "两江新区": (29.665, 106.568, "两江新区"),
    "万盛经开区": (28.963, 106.928, "万盛经开区"),
    "万盛经济技术开发区": (28.963, 106.928, "万盛经济技术开发区"),
    "贵安新区": (26.410, 106.496, "贵安新区"),
    "大鹏新区": (22.596, 114.476, "大鹏新区"),
    "深汕特别合作区": (22.858, 115.035, "深汕特别合作区"),
    "横琴粤澳深度合作区": (22.116, 113.548, "横琴粤澳深度合作区"),
    "神农架林区": (31.744, 110.681, "神农架林区"),
    "济源市": (35.067, 112.602, "济源市"),
    "仙桃市": (30.363, 113.454, "仙桃市"),
    "潜江市": (30.402, 112.899, "潜江市"),
    "天门市": (30.664, 113.167, "天门市"),
    "儋州市": (19.520, 109.580, "儋州市"),
    "琼海市": (19.259, 110.475, "琼海市"),
    "万宁市": (18.795, 110.391, "万宁市"),
    "东方市": (19.096, 108.653, "东方市"),
    "五指山市": (18.776, 109.517, "五指山市"),
    "文昌市": (19.543, 110.797, "文昌市"),
    "屯昌县": (19.351, 110.104, "屯昌县"),
    "澄迈县": (19.738, 110.006, "澄迈县"),
    "临高县": (19.912, 109.690, "临高县"),
    "定安县": (19.681, 110.360, "定安县"),
    "陵水黎族自治县": (18.505, 110.037, "陵水黎族自治县"),
    "保亭黎族苗族自治县": (18.640, 109.702, "保亭黎族苗族自治县"),
    "琼中黎族苗族自治县": (19.035, 109.839, "琼中黎族苗族自治县"),
    "昌江黎族自治县": (19.298, 109.055, "昌江黎族自治县"),
    "乐东黎族自治县": (18.747, 109.173, "乐东黎族自治县"),
    "白沙黎族自治县": (19.225, 109.451, "白沙黎族自治县"),
    "图木舒克市": (39.868, 79.069, "图木舒克市"),
    "五家渠市": (44.167, 87.542, "五家渠市"),
    "铁门关市": (41.868, 85.675, "铁门关市"),
    "北屯市": (47.363, 87.824, "北屯市"),
    "双河市": (44.840, 82.353, "双河市"),
    "可克达拉市": (43.947, 81.044, "可克达拉市"),
    "昆玉市": (37.207, 79.291, "昆玉市"),
    "玉东新区": (22.628, 110.203, "玉东新区"),
}

ATTRACTION_LOCATION_OVERRIDES = {
    ("广西", "克拉湾水上乐园"): (22.628, 110.203, "区县", "玉东新区"),
}


def fetch_text(url: str) -> str:
    response = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=60)
    response.raise_for_status()
    response.encoding = response.encoding or "utf-8"
    return response.text


def fetch_json(url: str):
    response = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=60)
    response.raise_for_status()
    return response.json()


def normalize(value: object) -> str:
    text = str(value or "").strip()
    if text.lower() == "nan":
        return ""
    return (
        text.replace("壯", "壮")
        .replace("區", "区")
        .replace("縣", "县")
        .replace("臺", "台")
        .replace("巿", "市")
        .replace("\u3000", " ")
        .strip()
    )


def province_short(full_name: str) -> str:
    name = normalize(full_name)
    for suffix in (
        "维吾尔自治区",
        "壮族自治区",
        "回族自治区",
        "特别行政区",
        "自治区",
        "省",
        "市",
    ):
        if name.endswith(suffix):
            return name[: -len(suffix)]
    return name


def valid_lat_lng(row: dict) -> bool:
    try:
        lat = float(row.get("lat") or math.nan)
        lng = float(row.get("lng") or math.nan)
    except (TypeError, ValueError):
        return False
    return 17.0 <= lat <= 54.5 and 73.0 <= lng <= 135.0


def location_variants(location: str) -> list[str]:
    values = []
    raw = normalize(location)
    if raw:
        values.append(raw)
    for part in re.split(r"[、，,;；/和及]+", raw):
        part = part.strip()
        if part and part not in values:
            values.append(part)

    extra = []
    for value in values:
        if value.endswith(("市", "区", "县", "旗")):
            extra.append(value[:-1])
        if value.endswith("地区"):
            extra.append(value[:-2])
        if value.endswith("自治州"):
            extra.append(value.replace("自治州", "州"))
        if value.endswith("新区"):
            extra.append(value.replace("新区", ""))
    for value in extra:
        if value and value not in values:
            values.append(value)
    return values


def build_geo_lookup(city_geo: list[dict]):
    by_area = defaultdict(list)
    by_city = defaultdict(list)
    province_centers = {}
    valid_rows = [row for row in city_geo if valid_lat_lng(row)]

    for row in valid_rows:
        province = province_short(row["province"])
        area = normalize(row.get("area"))
        city = normalize(row.get("city"))
        if area:
            by_area[(province, area)].append(row)
        if city:
            by_city[(province, city)].append(row)
        if not area and city == "市辖区":
            province_centers[province] = row

    for province in sorted({province_short(row["province"]) for row in valid_rows}):
        if province in province_centers:
            continue
        centers = [row for row in valid_rows if province_short(row["province"]) == province and not normalize(row.get("area"))]
        if centers:
            province_centers[province] = {
                "lat": sum(float(row["lat"]) for row in centers) / len(centers),
                "lng": sum(float(row["lng"]) for row in centers) / len(centers),
                "city": "",
                "area": "",
            }

    return by_area, by_city, province_centers


def match_geo(province: str, location: str, name: str, by_area, by_city, province_centers):
    attraction_override = ATTRACTION_LOCATION_OVERRIDES.get((province, name))
    if attraction_override:
        lat, lng, level, label = attraction_override
        return lat, lng, level, label

    for value in location_variants(location):
        if value in MANUAL_LOCATION_OVERRIDES:
            lat, lng, label = MANUAL_LOCATION_OVERRIDES[value]
            return lat, lng, "区县", label

    for value in location_variants(location):
        rows = by_area.get((province, value))
        if rows:
            row = rows[0]
            return float(row["lat"]), float(row["lng"]), "区县", value

    for value in location_variants(location):
        rows = by_city.get((province, value))
        if rows:
            row = next((item for item in rows if not normalize(item.get("area"))), rows[0])
            return float(row["lat"]), float(row["lng"]), "城市", value

    center = province_centers.get(province)
    if center:
        return float(center["lat"]), float(center["lng"]), "省级", province
    return 35.8, 103.8, "国家", "中国"


def parse_year(value: object):
    text = normalize(value)
    match = re.search(r"(19|20)\d{2}", text)
    return int(match.group(0)) if match else None


def parse_source_tables(html: str):
    tables = pd.read_html(StringIO(html))
    root = lxml.html.fromstring(html)
    headings = []
    for table in root.xpath('//table[contains(@class,"wikitable")]'):
        previous = table.xpath("preceding::*[self::h2 or self::h3 or self::h4][1]")
        heading = "".join(previous[0].itertext()).strip() if previous else ""
        heading = re.sub(r"\[编辑\].*", "", heading).strip()
        headings.append(heading)
    return list(zip(headings, tables))


def build_rows(html: str, city_geo: list[dict]) -> list[dict]:
    by_area, by_city, province_centers = build_geo_lookup(city_geo)
    rows = []
    seen = set()

    for heading, table in parse_source_tables(html):
        if normalize(heading) == "摘牌列表":
            continue
        province = province_short(heading)
        if not province:
            continue

        for _, record in table.iterrows():
            name = normalize(record.iloc[0] if len(record) > 0 else "")
            location = normalize(record.iloc[1] if len(record) > 1 else "")
            if not name:
                continue

            key = (province, name, location)
            if key in seen:
                continue
            seen.add(key)

            lat, lng, coordinate_level, coordinate_label = match_geo(province, location, name, by_area, by_city, province_centers)
            year = parse_year(record.iloc[2]) if len(record) > 2 else None
            row = {
                "id": f"{province}-4A-{len(rows) + 1:04d}",
                "rating": "official4A",
                "ratingLabel": "国家4A",
                "basis": "开放名录：国家4A级旅游景区",
                "province": province,
                "city": location,
                "name": name,
                "year": year,
                "lat": round(lat, 6),
                "lng": round(lng, 6),
                "coordinateLevel": coordinate_level,
                "coordinateLabel": coordinate_label,
            }
            if year is None:
                row.pop("year")
            rows.append(row)

    return rows


def write_js(rows: list[dict]) -> None:
    province_count = len({row["province"] for row in rows})
    level_counts = defaultdict(int)
    for row in rows:
        level_counts[row["coordinateLevel"]] += 1

    meta = {
        "count": len(rows),
        "official4ACount": len(rows),
        "provinces": province_count,
        "source": "Wikipedia 国家4A级旅游景区 page + city-geo administrative centers",
        "sourceUrls": [WIKI_4A_URL, CITY_GEO_URL],
        "coordinateNote": "4A 名录未统一提供景区经纬度；初始点位采用区县/城市/省级行政参考点，选中后仍会优先查询 OSM 面边界。",
        "coordinateLevels": dict(sorted(level_counts.items())),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }

    content = (
        "// Auto-generated by scripts/build-4a-attractions.py\n"
        "// Source: Wikipedia 国家4A级旅游景区 + city-geo administrative centers\n"
        f"window.CHINA_4A_ATTRACTIONS = {json.dumps(rows, ensure_ascii=False, indent=2)};\n"
        f"window.CHINA_4A_META = {json.dumps(meta, ensure_ascii=False, indent=2)};\n"
    )
    OUT_FILE.write_text(content, encoding="utf-8")


def main() -> None:
    html = fetch_text(WIKI_4A_URL)
    city_geo = fetch_json(CITY_GEO_URL)
    rows = build_rows(html, city_geo)
    write_js(rows)
    print(f"Wrote {len(rows)} 4A attractions to {OUT_FILE}")


if __name__ == "__main__":
    main()
