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
CACHE_ROOT = ROOT / ".codex-tmp" / "image-cache"
WIKI_LINKS_CACHE = CACHE_ROOT / "4a-wiki-links.json"

WIKI_4A_URL = "https://zh.wikipedia.org/wiki/%E5%9B%BD%E5%AE%B64A%E7%BA%A7%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA"
UA = "ChinaTravelMap4AImageBuilder/1.0 (local static site build)"

SKIP_LINKED_PAGE_IMAGE_NAMES = {
    "安昌古镇",
    "汉陵苑",
    "湖光岩风景区",
    "海丰红宫红场旧址·彭湃烈士故居红色旅游景区",
    "妈屿岛旅游区",
    "平顶山博物馆",
    "始兴县满堂客家大围景区",
    "浙江自然博物院安吉馆",
    "佗城",
    "龟山",
    "龙门洞",
    "龙羊峡",
}

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
    "pdf",
    "webm",
    "mp4",
    "video",
    "scan",
    "book",
    "document",
    "selfie",
    "portrait",
    "group photo",
    "floor plan",
    "site plan",
    "railway station",
    "train station",
    "metro station",
    "subway station",
    "station platform",
    "arrival yard",
    "departure yard",
    "exit ",
    "line ",
    "platform",
    "concourse",
    "guide map",
    "navigation map",
    "tourist map",
    "plaque",
    "signboard",
    "satellite",
    "landsat",
    "sentinel",
    "nasa",
    "iss image",
    "view of earth",
    "viewofearth",
    "earth observation",
    "earthobservatory",
    "earth from orbit",
    "orbital image",
    "from space",
    "aerial map",
    "\u5305\u542b",
    "\u5f20\u7167\u7247",
    "\u5f20\u56fe\u7247",
    "\u56fe\u96c6",
    "\u76f8\u518c",
    "\u65c5\u6e38\u653b\u7565",
    "\u56fe\u7247\u5927\u5168",
    "\u7cbe\u5f69\u56fe\u96c6",
    "\u666f\u70b9\u7167\u7247",
    "位置图",
    "地图",
    "导览图",
    "示意图",
    "分布图",
    "徽标",
    "标志",
    "牌匾",
    "文物保护单位",
    "海报",
    "拼图",
    "合成",
    "古籍",
    "书页",
    "文档",
    "扫描",
    "视频",
    "自拍",
)

WRONG_COUNTRY_TERMS = (
    "southkorea",
    "republicofkorea",
    "korea",
    "seoul",
    "busan",
    "japan",
    "tokyo",
    "utah",
    "archesnationalpark",
    "delicatearch",
    "france",
    "avignon",
)

REJECTED_TERMS += (
    "\u5bfc\u89c8\u724c",
    "\u5bfc\u89c8\u56fe",
    "\u6e38\u89c8\u56fe",
    "\u793a\u610f\u56fe",
    "\u51fa\u5165\u53e3",
    "\u51fa\u53e3",
    "\u5730\u94c1\u7ad9",
    "\u8f66\u7ad9",
    "\u7ad9\u53f0",
    "\u552e\u7968\u5904",
    "c\u53e3",
    "d\u53e3",
)

WRONG_COUNTRY_TERMS += (
    "taiwan",
    "penghu",
    "\u53f0\u6e7e",
    "\u81fa\u7063",
    "\u671b\u5b89",
)

TARGET_REJECTED_TERMS = {
    "天生桥": ("弥渡", "midu", "yunnan"),
    "南禅寺": ("五台", "wutai", "shanxi", "山西"),
    "灵山": ("拈花湾", "nianhua", "wuxi", "无锡", "jiangsu", "江苏"),
    "白云山": ("椒江", "jiaojiang", "taizhou", "台州", "zhejiang", "浙江"),
}

TARGET_REJECTED_TERMS.update(
    {
        "灵岩山": ("苏州", "suzhou"),
        "烟台山": ("福州", "fuzhou", "福建", "fujian", "保护单位", "近代建筑群"),
        "天台山": ("台湾", "臺灣", "penghu", "望安"),
        "白鹭湾": ("成都", "chengdu", "环球中心", "global center"),
        "欧乐堡梦幻世界": ("泉城", "quancheng"),
        "灵山湾": ("辛屯", "地铁", "车站", "c口"),
        "沂水雪山彩虹谷": ("导览牌", "纪念碑", "石碑"),
        "黑油山": ("地窖",),
        "吐峪沟": ("博物馆", "展出", "壁画残块"),
        "白桦林景区": ("入口", "entrance"),
        "七星景区": ("大门",),
        "刘三姐大观园": ("表演",),
        "莫土司衙署": ("保护范围", "保护单位", "20260214"),
    }
)

GENERIC_SUFFIXES = (
    "道教文化名胜区",
    "风景名胜区",
    "文化旅游区",
    "生态旅游区",
    "旅游度假区",
    "国家森林公园",
    "森林旅游区",
    "水利风景区",
    "文化园区",
    "地质公园",
    "湿地公园",
    "水上乐园",
    "主题公园",
    "旅游景区",
    "旅游区",
    "风景区",
    "景区",
    "公园",
    "博物院",
    "博物馆",
    "度假区",
    "示范区",
    "保护区",
)

ADMIN_SUFFIXES = ("市", "区", "县", "州", "盟")
ADMIN_PREFIX_PATTERN = re.compile(r"^([\u4e00-\u9fff]{2,10}(?:自治州|自治县|新区|林区|地区|市|区|县|旗|镇|乡|街道))(.+)$")
TOO_GENERIC_TITLE_VARIANTS = {
    "旅游",
    "文化",
    "生态",
    "森林",
    "度假",
    "公园",
    "景区",
    "风景",
    "博物",
    "博物院",
    "博物馆",
    "大运河",
}
GENERIC_FRAGMENT_SUFFIXES = ("旅游", "文化", "生态", "森林", "风景", "度假", "水利", "地质")

SEARCH_ALIASES = {
    "香山公园": ["Fragrant Hills"],
    "八大处公园": ["Badachu Park", "Badachu"],
    "戒台寺": ["Jietai Temple"],
    "周口店遗址博物馆": ["Zhoukoudian", "Peking Man Site"],
    "石花洞": ["Shihua Cave", "Stone Flower Cave"],
    "房山十渡风景名胜区": ["Shidu", "Ten Ferries"],
    "雁栖湖": ["Yanqi Lake"],
    "北京黄花城水长城旅游区": ["Huanghuacheng Great Wall", "Huanghua Cheng"],
    "北京园博园": ["Beijing Garden Expo Park"],
    "中国园林博物馆": ["Museum of Chinese Gardens and Landscape Architecture"],
    "北京汽车博物馆": ["Beijing Auto Museum"],
    "灵岩寺": ["灵岩寺 (长清)", "Lingyan Temple (Jinan)", "Pizhi Pagoda"],
    "西安博物院": ["Xi'an Museum", "小雁塔", "Small Wild Goose Pagoda"],
    "沈阳故宫": ["沈阳故宫博物院", "Mukden Palace", "Shenyang Imperial Palace"],
    "蒙山景区": ["太原蒙山大佛", "蒙山大佛"],
    "中国煤炭博物馆煤海探秘景区": ["中国煤炭博物馆", "China Coal Museum"],
    "云州区大同火山群景区": ["大同火山群", "Datong Volcanic Group"],
    "天镇县李二口长城景区": ["李二口长城"],
    "灵丘县平型关大捷景区": ["平型关大捷纪念馆", "平型关战役遗址"],
    "平城区大同古城墙景区": ["大同城墙", "Datong City Wall"],
    "浑源县北岳恒山景区": ["恒山", "Mount Heng Shanxi", "Hengshan Shanxi"],
    "平城区善化寺景区": ["善化寺", "Shanhua Temple"],
    "平城区华严寺景区": ["华严寺 (大同)", "Huayan Temple Datong"],
    "朔城区崇福寺景区": ["崇福寺 (朔州)", "Chongfu Temple Shuozhou"],
    "偏关县老牛湾景区": ["老牛湾", "Laoniuwan"],
    "忻府区忻州古城": ["忻州古城", "Xinzhou Ancient City"],
    "宁武县万年冰洞景区": ["万年冰洞", "Ningwu Ice Cave"],
    "宁武县芦芽山景区": ["芦芽山", "Luya Mountain"],
    "原平市天涯山景区": ["天涯山"],
    "贺兰山国家森林公园": ["贺兰山", "Helan Mountains"],
    "鸣翠湖国家湿地公园": ["鸣翠湖", "Mingcui Lake"],
    "盐州古城": ["盐州古城", "盐州城"],
    "哈巴湖": ["哈巴湖", "Haba Lake"],
    "六盘山国家森林公园": ["六盘山", "Liupan Mountains", "Liupan Mountain"],
    "六盘山红军长征景区": ["六盘山红军长征纪念馆", "六盘山红军长征纪念亭"],
    "固原市博物馆": ["固原博物馆", "Guyuan Museum"],
    "须弥山": ["须弥山石窟", "Xumishan Grottoes"],
    "火石寨国家地质公园": ["火石寨", "Huoshizhai"],
    "寺口子风景旅游区": ["寺口子", "Sikouzi"],
    "青海藏医药文化博物院": ["青海藏医药文化博物馆", "Qinghai Tibetan Medicine Museum"],
    "青藏高原自然博物馆": ["Qinghai-Tibet Plateau Nature Museum", "青藏高原自然博物馆"],
    "门源百里油菜花海景区": ["门源油菜花", "Menyuan rapeseed flower", "Menyuan County rapeseed"],
    "祁连风光旅游景区": ["祁连山", "Qilian Mountains"],
    "龙羊峡": ["龙羊峡水库", "Longyangxia Dam", "Longyangxia Reservoir"],
    "贵德县国家地质公园": ["贵德国家地质公园", "Guide National Geopark"],
    "新寨嘉那玛尼石经城旅游区": ["嘉那玛尼石经城", "Jiana Mani Stone Mound"],
    "格尔木昆仑旅游区": ["昆仑山口", "Kunlun Pass"],
    "茶卡壹号·盐湖景区": ["茶卡盐湖", "Chaka Salt Lake"],
    "乌素特（水上）雅丹景区": ["乌素特水上雅丹", "Wusute Yardang", "Water Yardang"],
    "翡翠湖景区": ["大柴旦翡翠湖", "Emerald Lake Dachaidan"],
    "石家庄苍岩山景区": ["苍岩山", "Cangyan Mountain"],
    "抱犊寨风景区": ["抱犊寨", "Baodu Zhai"],
    "石家庄嶂石岩风景名胜区": ["嶂石岩", "Zhangshiyan"],
    "正定隆兴寺": ["隆兴寺", "Longxing Temple", "Longxing Monastery"],
    "正定荣国府": ["荣国府"],
    "御道口草原森林风景区": ["御道口", "Yudaokou"],
    "双塔山景区": ["双塔山"],
    "董存瑞纪念馆": ["董存瑞烈士陵园", "董存瑞纪念馆"],
    "磬锤峰森林公园": ["磬锤峰", "棒槌山"],
    "大境门": ["大境门", "Dajingmen"],
    "角山景区": ["角山长城", "Jiaoshan Great Wall"],
    "鸽子窝公园": ["鸽子窝公园", "Geziwo Park"],
    "秦皇求仙入海处景区": ["秦皇求仙入海处"],
    "乐亭县李大钊纪念馆及故居": ["李大钊纪念馆", "李大钊故居"],
    "滦州古城景区": ["滦州古城"],
    "蔚州古城": ["蔚州古城"],
    "东北虎林园": ["东北虎林园", "Siberian Tiger Park Harbin"],
    "伏尔加庄园": ["伏尔加庄园", "Volga Manor"],
    "牡丹江市雪乡景区": ["中国雪乡", "Xuexiang"],
    "牡丹江市宁安渤海上京龙泉府遗址旅游景区": ["渤海上京龙泉府遗址", "渤海上京龙泉府"],
    "牡丹江市横道河子东北虎林园景区": ["横道河子东北虎林园", "Hengdaohezi Siberian Tiger Park"],
    "同江市三江口生态旅游区": ["三江口", "同江三江口"],
    "黑瞎子岛旅游区": ["黑瞎子岛", "Heixiazi Island", "Bolshoy Ussuriysky Island"],
    "铁人王进喜纪念馆景区": ["铁人王进喜纪念馆"],
    "大庆博物馆": ["大庆博物馆", "Daqing Museum"],
    "兴凯湖旅游度假区": ["兴凯湖", "Lake Khanka"],
    "嘉荫恐龙国家地质公园": ["嘉荫恐龙国家地质公园", "Jiayin Dinosaur National Geopark"],
    "嘉荫茅兰沟森林旅游景区": ["茅兰沟"],
    "武汉园博园": ["武汉园博园", "Wuhan Garden Expo Park"],
    "武汉欢乐谷": ["武汉欢乐谷", "Happy Valley Wuhan"],
    "襄阳唐城": ["中国唐城", "襄阳唐城"],
    "襄阳古城": ["襄阳城", "Xiangyang City Wall"],
    "南漳春秋寨": ["春秋寨", "Chunqiu Village Nanzhang"],
    "三游洞": ["三游洞"],
    "柴埠溪大峡谷": ["柴埠溪", "Chaibuxi"],
    "宜昌博物馆": ["宜昌博物馆", "Yichang Museum"],
    "黄石国家矿山公园": ["黄石国家矿山公园", "Huangshi National Mine Park"],
    "铜绿山国家考古遗址公园": ["铜绿山古铜矿遗址"],
    "十堰市博物馆": ["十堰博物馆"],
    "静乐宫": ["静乐宫"],
    "武当山南神道旅游区": ["武当山南神道"],
    "安义古村群": ["安义古村", "Anyi ancient village"],
    "八大山人梅湖": ["八大山人纪念馆", "Bada Shanren"],
    "汉代海昏侯国考古遗址": ["海昏侯国遗址", "海昏侯墓", "Haihunhou"],
    "小平小道陈列馆": ["小平小道"],
    "龙宫洞": ["彭泽龙宫洞", "Longgong Cave Jiangxi"],
    "黄庭坚故里": ["黄庭坚纪念馆", "Huang Tingjian"],
    "鄱阳湖吴城候鸟旅游区": ["吴城候鸟保护区", "Poyang Lake Wucheng"],
    "福州国家森林公园（福州植物园）": ["福州国家森林公园", "福州植物园", "Fuzhou National Forest Park"],
    "石竹山": ["石竹山", "Shizhushan"],
    "永泰云顶": ["永泰云顶", "Yunding Yongtai"],
    "集美鳌园": ["鳌园", "Jimei Aoyuan"],
    "九鲤湖": ["九鲤湖", "Jiuli Lake"],
    "福安白云山": ["白云山 福安", "Baiyun Mountain Fu'an"],
    "中原福塔": ["中原福塔", "Zhongyuan Tower"],
    "郑州方特欢乐世界": ["郑州方特欢乐世界", "Zhengzhou Fantawild Adventure"],
    "观星台": ["登封观星台", "Gaocheng Astronomical Observatory"],
    "开封铁塔公园": ["开封铁塔", "Iron Pagoda Kaifeng"],
    "南京眼": ["南京眼", "Nanjing Eye", "Nanjing Eye Footbridge"],
    "南京渡江胜利纪念馆": ["渡江胜利纪念馆", "Memorial Hall of the Victorious Crossing of the Yangtze River"],
    "南京欢乐谷": ["南京欢乐谷", "Nanjing Happy Valley"],
    "宜兴竹海": ["宜兴竹海", "Yixing Bamboo Sea"],
    "上海犹太难民纪念馆": ["上海犹太难民纪念馆", "Shanghai Jewish Refugees Museum"],
    "上海博物馆": ["上海博物馆", "Shanghai Museum"],
    "上海城市规划展示馆": ["上海城市规划展示馆", "Shanghai Urban Planning Exhibition Center"],
    "古猗园": ["古猗园", "Guyi Garden"],
    "上海嘉定州桥": ["嘉定州桥", "Jiading Zhouqiao"],
    "南翔镇": ["南翔古镇", "Nanxiang"],
    "枫泾古镇": ["枫泾古镇", "Fengjing Ancient Town"],
    "七宝古镇": ["七宝古镇", "Qibao"],
    "中国航海博物馆": ["中国航海博物馆", "China Maritime Museum"],
    "朱家角": ["朱家角古镇", "Zhujiajiao"],
    "佘山国家森林公园": ["佘山", "Sheshan"],
    "辰山植物园": ["辰山植物园", "Shanghai Chenshan Botanical Garden"],
    "广富林文化公园": ["广富林文化遗址", "Guangfulin"],
    "上海植物园": ["上海植物园", "Shanghai Botanical Garden"],
    "上海宋庆龄故居纪念馆": ["宋庆龄故居", "Soong Ching-ling Memorial Residence"],
    "龙华烈士陵园": ["龙华烈士陵园", "Longhua Martyrs Cemetery"],
    "安徽博物院": ["安徽博物院", "Anhui Museum"],
    "合肥包公园": ["包公园", "包公祠 合肥", "Lord Bao Park"],
    "合肥三国遗址公园": ["三国遗址公园", "Three Kingdoms Heritage Park Hefei"],
    "渡江战役纪念馆（安徽名人馆）": ["渡江战役纪念馆", "安徽名人馆"],
    "亳州市博物馆": ["亳州博物馆"],
    "花戏楼": ["亳州花戏楼", "Huaxilou"],
    "蚌埠市博物馆": ["蚌埠博物馆"],
    "寿春楚文化博物馆": ["寿春楚文化博物馆"],
    "凤阳县明皇陵": ["明皇陵", "Minghuangling"],
    "全椒县吴敬梓纪念馆": ["吴敬梓纪念馆"],
    "皖西博物馆": ["皖西博物馆", "Wanxi Museum"],
    "青岛海滨风景区": ["青岛海滨", "Qingdao Seaside Scenic Area"],
    "青岛极地海洋公园": ["青岛极地海洋世界", "Qingdao Polar Ocean World"],
    "青岛金沙滩景区": ["青岛金沙滩", "Qingdao Golden Beach", "Golden Beach Qingdao"],
    "青岛老城": ["青岛老城", "Qingdao old town"],
    "青岛葡萄酒博物馆": ["青岛葡萄酒博物馆", "Qingdao Wine Museum"],
    "中国陶瓷琉璃馆": ["中国陶瓷琉璃馆", "China Ceramics and Glass Museum"],
    "齐文化博物院（齐文化博物馆、足球博物馆）": ["齐文化博物馆", "齐文化博物院"],
    "台儿庄大战纪念馆": ["台儿庄大战纪念馆"],
    "烟台山": ["烟台山景区", "Yantai Hill"],
}


def main() -> None:
    args = parse_args()
    apply_fast_mode(args)
    attractions = load_js_value(ATTRACTIONS_PATH, "CHINA_4A_ATTRACTIONS", [])
    existing = load_js_value(MANIFEST_PATH, "CHINA_4A_IMAGES", {})
    paths = build_image_paths(attractions, existing)
    selected = select_attractions(attractions, existing, args)

    session = requests.Session()
    session.headers.update({"User-Agent": UA})
    session.request_timeout = args.http_timeout
    session.download_timeout = args.download_timeout
    needs_wiki_links = not args.skip_linked_pages or args.wikidata_title_images or args.commons_categories
    wiki_links = parse_wiki_links(session, args) if needs_wiki_links else {}
    linked_candidates = {} if args.skip_linked_pages else load_linked_page_images(session, selected, wiki_links, args)
    wikidata_title_candidates = (
        load_wikidata_title_images(session, selected, wiki_links, args) if args.wikidata_title_images else {}
    )
    commons_category_candidates = (
        load_commons_category_images(session, selected, wiki_links, args) if args.commons_categories else {}
    )

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
        candidates.extend(wikidata_title_candidates.get(attraction["id"], []))
        candidates.extend(commons_category_candidates.get(attraction["id"], []))
        if args.wikidata:
            candidates.extend(search_wikidata_images(session, attraction, args))
        if args.wiki_search:
            candidates.extend(search_wikipedia_pages(session, attraction, args))
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
    parser.add_argument("--quick", action="store_true")
    parser.add_argument("--fast", action="store_true")
    parser.add_argument("--openverse-quick", action="store_true")
    parser.add_argument("--skip-linked-pages", action="store_true")
    parser.add_argument("--fast-commons", action="store_true")
    parser.add_argument("--wikidata-title-images", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--wikidata", action=argparse.BooleanOptionalAction, default=False)
    parser.add_argument("--wiki-search", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--commons", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--commons-categories", action=argparse.BooleanOptionalAction, default=False)
    parser.add_argument("--commons-category-limit", type=int, default=2)
    parser.add_argument("--commons-query-limit", type=int, default=3)
    parser.add_argument("--openverse", action=argparse.BooleanOptionalAction, default=False)
    parser.add_argument("--openverse-query-limit", type=int, default=2)
    parser.add_argument("--openverse-page-size", type=int, default=8)
    parser.add_argument("--width", type=int, default=900)
    parser.add_argument("--quality", type=int, default=72)
    parser.add_argument("--proxy-commons-redirects", action="store_true")
    parser.add_argument("--gap", type=float, default=0.18)
    parser.add_argument("--download-gap", type=float, default=0.15)
    parser.add_argument("--http-timeout", type=float, default=45.0)
    parser.add_argument("--download-timeout", type=float, default=60.0)
    parser.add_argument("--retries", type=int, default=3)
    parser.add_argument("--retry-gap", type=float, default=1.8)
    parser.add_argument("--flush-every", type=int, default=20)
    parser.add_argument("--quiet-missing", action="store_true")
    parser.add_argument("--refresh-cache", action="store_true")
    return parser.parse_args()


def apply_fast_mode(args: argparse.Namespace) -> None:
    if args.openverse_quick:
        args.wikidata = False
        args.wikidata_title_images = False
        args.wiki_search = False
        args.commons = False
        args.commons_categories = False
        args.openverse = True
        args.skip_linked_pages = True
        args.openverse_query_limit = min(max(args.openverse_query_limit, 1), 1)
        args.openverse_page_size = min(max(args.openverse_page_size, 1), 5)
        args.gap = min(args.gap, 0.0)
        args.download_gap = min(args.download_gap, 0.0)
        args.retries = min(args.retries, 1)
        args.http_timeout = min(args.http_timeout, 12.0)
        args.download_timeout = min(args.download_timeout, 15.0)
        args.flush_every = max(args.flush_every, 50)
    if args.quick:
        args.fast = True
        args.fast_commons = False
    if not args.fast:
        return
    args.wikidata = False
    args.wiki_search = False
    args.commons = bool(args.fast_commons)
    args.openverse = False
    args.commons_query_limit = min(max(args.commons_query_limit, 1), 1)
    args.gap = min(args.gap, 0.0)
    args.download_gap = min(args.download_gap, 0.0)
    args.retries = min(args.retries, 1)
    args.flush_every = max(args.flush_every, 50)
    if args.quick:
        args.wikidata_title_images = False
        args.commons_categories = False
        args.proxy_commons_redirects = True
        args.http_timeout = min(args.http_timeout, 12.0)
        args.download_timeout = min(args.download_timeout, 15.0)
        args.flush_every = max(args.flush_every, 100)


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


def parse_wiki_links(session: requests.Session, args: argparse.Namespace) -> dict[tuple[str, str, str], dict]:
    if args.quick and WIKI_LINKS_CACHE.exists() and not args.refresh_cache:
        try:
            return deserialize_wiki_links(json.loads(WIKI_LINKS_CACHE.read_text(encoding="utf-8")))
        except Exception:
            pass

    try:
        html = session.get(WIKI_4A_URL, timeout=getattr(session, "request_timeout", 60.0)).text
    except Exception as error:  # noqa: BLE001 - keep image batches moving
        print(f"Could not fetch 4A wiki list: {error}", file=sys.stderr)
        return {}
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
    if args.quick:
        write_wiki_links_cache(links)
    return links


def deserialize_wiki_links(rows: list[dict]) -> dict[tuple[str, str, str], dict]:
    links = {}
    for row in rows:
        links[(row.get("province", ""), row.get("name", ""), row.get("location", ""))] = {
            "title": row.get("title", ""),
            "pageUrl": row.get("pageUrl", ""),
        }
    return links


def write_wiki_links_cache(links: dict[tuple[str, str, str], dict]) -> None:
    CACHE_ROOT.mkdir(parents=True, exist_ok=True)
    rows = [
        {
            "province": province,
            "name": name,
            "location": location,
            "title": link.get("title", ""),
            "pageUrl": link.get("pageUrl", ""),
        }
        for (province, name, location), link in sorted(links.items())
    ]
    WIKI_LINKS_CACHE.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")


def load_linked_page_images(
    session: requests.Session,
    attractions: list[dict],
    wiki_links: dict,
    args: argparse.Namespace,
) -> dict[str, list[dict]]:
    links_by_name = {}
    for key, link in wiki_links.items():
        province, name, _location = key
        links_by_name.setdefault((province, name), link)

    titles_by_id = {}
    for attraction in attractions:
        if normalize(attraction["name"]) in SKIP_LINKED_PAGE_IMAGE_NAMES:
            titles_by_id[attraction["id"]] = []
            continue
        link = wiki_links.get((attraction["province"], attraction["name"], attraction.get("city", ""))) or wiki_links.get(
            (attraction["province"], attraction["name"], "")
        ) or links_by_name.get((attraction["province"], attraction["name"]))
        titles_by_id[attraction["id"]] = linked_title_candidates(attraction, link, args)

    ids_by_title = {}
    for attraction_id, titles in titles_by_id.items():
        for title in titles:
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
        if args.gap:
            time.sleep(args.gap)
    return candidates


def linked_title_candidates(attraction: dict, link: dict | None, args: argparse.Namespace) -> list[str]:
    titles = []
    if link:
        titles.append(link["title"])

    titles.extend(SEARCH_ALIASES.get(normalize(attraction["name"]), []))

    if args.quick:
        return unique(titles)

    if args.fast:
        titles.extend(title_core_variants(attraction))
        return unique(titles)

    titles.extend(name_variants(attraction["name"], include_aliases=True))
    return unique(titles)


def title_core_variants(attraction: dict) -> list[str]:
    cleaned = clean_name(attraction["name"])
    variants = [attraction["name"], cleaned]
    variants.extend(strip_generic_suffixes(cleaned))

    for value in list(variants):
        variants.extend(strip_location_prefixes(value, attraction))

    for value in list(variants):
        variants.extend(strip_generic_suffixes(value))

    return [value for value in unique(variants) if reliable_title_variant(value)]


def strip_generic_suffixes(value: str) -> list[str]:
    variants = []
    cleaned = normalize(value)
    for suffix in GENERIC_SUFFIXES:
        if cleaned.endswith(suffix):
            stripped = cleaned[: -len(suffix)].strip()
            if reliable_title_variant(stripped):
                variants.append(stripped)
    return unique(variants)


def strip_location_prefixes(value: str, attraction: dict) -> list[str]:
    cleaned = normalize(value)
    prefixes = []
    province = province_short(attraction.get("province", ""))
    city = normalize(attraction.get("city", ""))
    if province:
        prefixes.append(province)
    if city:
        prefixes.extend([city, strip_admin_suffix(city)])

    variants = []
    for prefix in sorted(unique(prefixes), key=len, reverse=True):
        if cleaned.startswith(prefix):
            stripped = cleaned[len(prefix) :].strip()
            if reliable_title_variant(stripped):
                variants.append(stripped)

    match = ADMIN_PREFIX_PATTERN.match(cleaned)
    if match:
        stripped = match.group(2).strip()
        if reliable_title_variant(stripped):
            variants.append(stripped)
    return unique(variants)


def strip_admin_suffix(value: str) -> str:
    cleaned = normalize(value)
    for suffix in ("自治州", "自治县", "新区", "林区", "地区", "市", "区", "县", "旗", "镇", "乡", "街道"):
        if cleaned.endswith(suffix):
            return cleaned[: -len(suffix)]
    return cleaned


def reliable_title_variant(value: str) -> bool:
    cleaned = normalize(value)
    if not cleaned:
        return False
    if cleaned in TOO_GENERIC_TITLE_VARIANTS:
        return False
    if cleaned.endswith(GENERIC_FRAGMENT_SUFFIXES):
        return False
    if is_short_admin_name(cleaned):
        return False
    return len(cleaned) >= 3 or bool(re.search(r"[a-zA-Z]", cleaned))


def load_wikidata_title_images(
    session: requests.Session,
    attractions: list[dict],
    wiki_links: dict,
    args: argparse.Namespace,
) -> dict[str, list[dict]]:
    title_ids_by_site = wikidata_title_ids_by_site(attractions, wiki_links, args)
    attractions_by_id = {attraction["id"]: attraction for attraction in attractions}
    candidates: dict[str, list[dict]] = {}

    for site, ids_by_title in title_ids_by_site.items():
        titles = list(ids_by_title)
        ids_by_title_key = {wikidata_title_key(title): ids for title, ids in ids_by_title.items()}
        for start in range(0, len(titles), 45):
            batch = titles[start : start + 45]
            params = {
                "origin": "*",
                "action": "wbgetentities",
                "sites": site,
                "titles": "|".join(batch),
                "props": "claims|labels|descriptions|aliases|sitelinks",
                "languages": "zh|en",
                "sitefilter": "zhwiki|enwiki",
                "format": "json",
            }
            data = fetch_json(session, "https://www.wikidata.org/w/api.php", params)
            for entity in data.get("entities", {}).values():
                if entity.get("missing"):
                    continue
                sitelink_title = (entity.get("sitelinks", {}).get(site) or {}).get("title", "")
                if not sitelink_title:
                    continue
                attraction_ids = ids_by_title.get(sitelink_title) or ids_by_title_key.get(wikidata_title_key(sitelink_title), [])
                for attraction_id in attraction_ids:
                    attraction = attractions_by_id.get(attraction_id)
                    if not attraction:
                        continue
                    rows = wikidata_entity_candidates(entity, attraction, args, sitelink_title)
                    if rows:
                        candidates.setdefault(attraction_id, []).extend(rows)
            time.sleep(args.gap)
    return candidates


def wikidata_title_ids_by_site(
    attractions: list[dict],
    wiki_links: dict,
    args: argparse.Namespace,
) -> dict[str, dict[str, list[str]]]:
    links_by_name = {}
    for key, link in wiki_links.items():
        province, name, _location = key
        links_by_name.setdefault((province, name), link)

    titles_by_site = {"zhwiki": {}, "enwiki": {}}
    for attraction in attractions:
        if normalize(attraction["name"]) in SKIP_LINKED_PAGE_IMAGE_NAMES:
            continue
        link = wiki_links.get((attraction["province"], attraction["name"], attraction.get("city", ""))) or wiki_links.get(
            (attraction["province"], attraction["name"], "")
        ) or links_by_name.get((attraction["province"], attraction["name"]))
        for title in linked_title_candidates(attraction, link, args):
            site = "enwiki" if re.search(r"[A-Za-z]", title) else "zhwiki"
            titles_by_site[site].setdefault(title, []).append(attraction["id"])

    return titles_by_site


def wikidata_title_key(title: str) -> str:
    return normalize_search(str(title or "").replace("_", " "))


def load_commons_category_images(
    session: requests.Session,
    attractions: list[dict],
    wiki_links: dict,
    args: argparse.Namespace,
) -> dict[str, list[dict]]:
    title_ids_by_site = wikidata_title_ids_by_site(attractions, wiki_links, args)
    attractions_by_id = {attraction["id"]: attraction for attraction in attractions}
    categories_by_id: dict[str, list[str]] = {}

    for site, ids_by_title in title_ids_by_site.items():
        titles = list(ids_by_title)
        ids_by_title_key = {wikidata_title_key(title): ids for title, ids in ids_by_title.items()}
        for start in range(0, len(titles), 45):
            batch = titles[start : start + 45]
            params = {
                "origin": "*",
                "action": "wbgetentities",
                "sites": site,
                "titles": "|".join(batch),
                "props": "claims|sitelinks",
                "sitefilter": f"{site}|commonswiki",
                "format": "json",
            }
            data = fetch_json(session, "https://www.wikidata.org/w/api.php", params)
            for entity in data.get("entities", {}).values():
                if entity.get("missing"):
                    continue
                sitelink_title = (entity.get("sitelinks", {}).get(site) or {}).get("title", "")
                if not sitelink_title:
                    continue
                attraction_ids = ids_by_title.get(sitelink_title) or ids_by_title_key.get(wikidata_title_key(sitelink_title), [])
                categories = wikidata_entity_commons_categories(entity)
                if not categories:
                    continue
                for attraction_id in attraction_ids:
                    categories_by_id.setdefault(attraction_id, []).extend(categories)
            if args.gap:
                time.sleep(args.gap)

    candidates_by_id: dict[str, list[dict]] = {}
    for attraction_id, categories in categories_by_id.items():
        attraction = attractions_by_id.get(attraction_id)
        if not attraction:
            continue
        for category in unique(categories)[: max(args.commons_category_limit, 0)]:
            if not reliable_commons_category(category):
                continue
            rows = commons_category_candidates(session, category, attraction, args)
            if rows:
                candidates_by_id.setdefault(attraction_id, []).extend(rows)
                if rank_candidates(candidates_by_id[attraction_id], attraction):
                    break
    return candidates_by_id


def wikidata_entity_commons_categories(entity: dict) -> list[str]:
    categories = []
    for claim in entity.get("claims", {}).get("P373", []):
        value = claim.get("mainsnak", {}).get("datavalue", {}).get("value")
        if value:
            categories.append(str(value).replace("_", " "))

    commons_title = (entity.get("sitelinks", {}).get("commonswiki") or {}).get("title", "")
    if commons_title.lower().startswith("category:"):
        categories.append(commons_title.split(":", 1)[1].replace("_", " "))
    return unique(categories)


def reliable_commons_category(category: str) -> bool:
    cleaned = normalize(category)
    if not cleaned or has_rejected_term(cleaned):
        return False
    return not normalize_search(cleaned).startswith(("maps", "logos", "diagrams"))


def commons_category_candidates(
    session: requests.Session,
    category: str,
    attraction: dict,
    args: argparse.Namespace,
) -> list[dict]:
    params = {
        "origin": "*",
        "action": "query",
        "generator": "categorymembers",
        "gcmtitle": f"Category:{category}",
        "gcmnamespace": "6",
        "gcmlimit": "12",
        "prop": "imageinfo",
        "iiurlwidth": "1280",
        "iiprop": "url|mime|size|extmetadata",
        "format": "json",
    }
    data = fetch_json(session, "https://commons.wikimedia.org/w/api.php", params)
    candidates = []
    for page in data.get("query", {}).get("pages", {}).values():
        info = (page.get("imageinfo") or [{}])[0]
        meta = info.get("extmetadata") or {}
        file_name = strip_file_prefix(page.get("title", "Wikimedia Commons image"))
        candidate = {
            "url": commons_redirect_url(file_name, args.width) or info.get("thumburl") or info.get("url"),
            "pageUrl": info.get("descriptionurl") or commons_file_page(file_name),
            "title": file_name,
            "source": "Wikimedia Commons Category",
            "width": info.get("width"),
            "height": info.get("height"),
            "trusted": True,
            "text": " ".join(
                [
                    f"Category:{category}",
                    page.get("title", ""),
                    clean_html(meta.get("ObjectName", {}).get("value", "")),
                    clean_html(meta.get("ImageDescription", {}).get("value", "")),
                    attraction.get("name", ""),
                    attraction.get("city", ""),
                    attraction.get("province", ""),
                ]
            ),
        }
        if allowed(candidate):
            candidates.append(candidate)
    if args.gap:
        time.sleep(args.gap)
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


def search_wikidata_images(session: requests.Session, attraction: dict, args: argparse.Namespace) -> list[dict]:
    candidates = []
    seen_ids = set()
    for query in wikidata_search_queries(attraction)[:4]:
        for language in ("zh", "en"):
            params = {
                "origin": "*",
                "action": "wbsearchentities",
                "search": query,
                "language": language,
                "uselang": language,
                "type": "item",
                "limit": "4",
                "format": "json",
            }
            data = fetch_json(session, "https://www.wikidata.org/w/api.php", params)
            entity_ids = []
            for row in data.get("search", []):
                entity_id = row.get("id")
                if not entity_id or entity_id in seen_ids:
                    continue
                seen_ids.add(entity_id)
                entity_ids.append(entity_id)
            if not entity_ids:
                continue

            params = {
                "origin": "*",
                "action": "wbgetentities",
                "ids": "|".join(entity_ids),
                "props": "claims|labels|descriptions|aliases|sitelinks",
                "languages": "zh|en",
                "sitefilter": "zhwiki|enwiki",
                "format": "json",
            }
            data = fetch_json(session, "https://www.wikidata.org/w/api.php", params)
            for entity in data.get("entities", {}).values():
                candidates.extend(wikidata_entity_candidates(entity, attraction, args, query))
            time.sleep(args.gap)
            if rank_candidates(candidates, attraction):
                return candidates
    return candidates


def wikidata_search_queries(attraction: dict) -> list[str]:
    city = attraction.get("city", "")
    province = attraction.get("province", "")
    variants = name_variants(attraction["name"], include_aliases=True)
    queries = list(variants)
    for variant in variants:
        queries.extend([f"{variant} {city}", f"{variant} {province}", f"{variant} China"])
    return unique(queries)


def wikidata_entity_candidates(entity: dict, attraction: dict, args: argparse.Namespace, query: str) -> list[dict]:
    claims = entity.get("claims", {})
    files = []
    for claim in claims.get("P18", []):
        value = claim.get("mainsnak", {}).get("datavalue", {}).get("value")
        if value:
            files.append(value)
    if not files:
        return []

    labels = [value.get("value", "") for value in (entity.get("labels") or {}).values()]
    descriptions = [value.get("value", "") for value in (entity.get("descriptions") or {}).values()]
    aliases = [
        alias.get("value", "")
        for alias_values in (entity.get("aliases") or {}).values()
        for alias in alias_values
    ]
    sitelinks = [value.get("title", "") for value in (entity.get("sitelinks") or {}).values()]
    entity_text = " ".join(
        [
            entity.get("id", ""),
            query,
            attraction.get("city", ""),
            attraction.get("province", ""),
            *labels,
            *descriptions,
            *aliases,
            *sitelinks,
        ]
    )

    candidates = []
    for file_name in unique(files):
        candidate = {
            "url": commons_redirect_url(file_name, args.width),
            "pageUrl": commons_file_page(file_name),
            "title": file_name,
            "source": "Wikidata P18",
            "width": 0,
            "height": 0,
            "text": " ".join([entity_text, file_name]),
        }
        if allowed(candidate):
            candidates.append(candidate)
    return candidates


def commons_file_page(file_name: str) -> str:
    return f"https://commons.wikimedia.org/wiki/File:{quote(file_name.replace(' ', '_'))}"


def search_wikipedia_pages(session: requests.Session, attraction: dict, args: argparse.Namespace) -> list[dict]:
    candidates = []
    seen_titles = set()
    for query in wikipedia_search_queries(attraction)[:3]:
        params = {
            "origin": "*",
            "action": "query",
            "list": "search",
            "srsearch": query,
            "srlimit": "5",
            "format": "json",
        }
        data = fetch_json(session, "https://zh.wikipedia.org/w/api.php", params)
        titles = []
        for row in data.get("query", {}).get("search", []):
            title = row.get("title", "")
            if not title or title in seen_titles:
                continue
            seen_titles.add(title)
            if search_title_is_too_generic(title, attraction):
                continue
            titles.append(title)
        if not titles:
            time.sleep(args.gap)
            continue

        params = {
            "origin": "*",
            "action": "query",
            "titles": "|".join(titles),
            "redirects": "1",
            "prop": "pageimages|info",
            "piprop": "thumbnail|original|name",
            "pithumbsize": "1280",
            "inprop": "url",
            "format": "json",
        }
        data = fetch_json(session, "https://zh.wikipedia.org/w/api.php", params)
        for page in data.get("query", {}).get("pages", {}).values():
            candidate = wikipedia_candidate(page)
            if candidate:
                candidate["text"] = " ".join([candidate.get("text", ""), query, attraction.get("city", ""), attraction.get("province", "")])
                candidates.append(candidate)
        time.sleep(args.gap)
        if rank_candidates(candidates, attraction):
            break
    return candidates


def wikipedia_search_queries(attraction: dict) -> list[str]:
    city = attraction.get("city", "")
    province = attraction.get("province", "")
    variants = name_variants(attraction["name"], include_aliases=True)
    queries = list(variants)
    for variant in variants:
        queries.extend(
            [
                f'intitle:"{variant}" {city}',
                f'"{variant}" {city} {province}',
                f'"{variant}" 景区',
                variant,
            ]
        )
    return unique(queries)


def search_title_is_too_generic(title: str, attraction: dict) -> bool:
    normalized = normalize_search(title)
    if not normalized:
        return True
    bad_title_terms = ("列表", "分类", "消歧义", "行政区划", "车站", "站", "道路", "街道")
    if any(normalize_search(term) in normalized for term in bad_title_terms):
        return True
    for variant in name_variants(attraction["name"], include_aliases=True):
        if normalize_search(variant) and normalize_search(variant) in normalized:
            return False
    tokens = meaningful_tokens(attraction["name"])
    return bool(tokens) and not any(token in normalized for token in tokens)


def search_commons(session: requests.Session, attraction: dict, args: argparse.Namespace) -> list[dict]:
    queries = image_queries(attraction)
    candidates = []
    query_limit = max(0, args.commons_query_limit)
    for query in queries[:query_limit]:
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
    query_limit = max(0, args.openverse_query_limit)
    page_size = min(max(args.openverse_page_size, 1), 20)
    for query in image_queries(attraction)[:query_limit]:
        params = {
            "q": query,
            "page_size": page_size,
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
            if allowed(candidate) and has_explicit_name_match(candidate, attraction) and reliable_openverse_candidate(candidate, attraction):
                candidates.append(candidate)
        time.sleep(args.gap)
        if rank_candidates(candidates, attraction):
            break
    return candidates


def fetch_json(session: requests.Session, url: str, params: dict) -> dict:
    try:
        response = session.get(url, params=params, timeout=getattr(session, "request_timeout", 45.0))
        if not response.ok:
            return {}
        return response.json()
    except Exception:
        return {}


def image_queries(attraction: dict) -> list[str]:
    name = attraction["name"]
    city = attraction.get("city", "")
    province = attraction.get("province", "")
    variants = name_variants(name, include_aliases=True)
    queries = list(variants)
    for variant in variants:
        queries.extend(
            [
                f"{variant} {city} {province} China",
                f"{variant} {province} 中国",
                f"{variant} 中国",
                variant,
            ]
        )
    return unique(queries)


def rank_candidates(candidates: list[dict], attraction: dict) -> list[dict]:
    scored = []
    for candidate in candidates:
        if rejected_for_target(candidate, attraction):
            continue
        if likely_wrong_country(candidate, attraction):
            continue
        if candidate.get("trusted") and not trusted_candidate_is_specific(candidate, attraction):
            continue
        score = score_candidate(candidate, attraction)
        if candidate.get("trusted"):
            score += 12
        if score >= (8 if candidate.get("trusted") else 11):
            scored.append((score, candidate))
    scored.sort(key=lambda item: (item[0], image_area(item[1])), reverse=True)
    return [candidate for _, candidate in scored]


def rejected_for_target(candidate: dict, attraction: dict) -> bool:
    terms = TARGET_REJECTED_TERMS.get(normalize(attraction.get("name", "")), ())
    if not terms:
        return False
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    return any(normalize_search(term) in text for term in terms)


def trusted_candidate_is_specific(candidate: dict, attraction: dict) -> bool:
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    location_terms = [
        attraction.get("province", ""),
        province_short(attraction.get("province", "")),
        attraction.get("city", ""),
    ]
    if any(normalize_search(term) in text for term in location_terms if len(normalize(term)) >= 2):
        return True

    cleaned = normalize_search(clean_name(attraction["name"]))
    title = normalize_search(candidate.get("title", ""))
    if len(cleaned) >= 5 and cleaned in title:
        return True

    tokens = meaningful_tokens(attraction["name"])
    return len(tokens) >= 2 and all(token in text for token in tokens)


def likely_wrong_country(candidate: dict, attraction: dict) -> bool:
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    if not any(term in text for term in WRONG_COUNTRY_TERMS):
        return False
    anchors = [
        "china",
        "中国",
        attraction.get("province", ""),
        province_short(attraction.get("province", "")),
        attraction.get("city", ""),
    ]
    return not any(normalize_search(anchor) in text for anchor in anchors if anchor)


def score_candidate(candidate: dict, attraction: dict) -> int:
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    city = normalize_search(attraction.get("city", ""))
    province = normalize_search(attraction.get("province", ""))
    score = 0
    for variant in name_variants(attraction["name"], include_aliases=True):
        normalized = normalize_search(variant)
        if normalized and normalized in text:
            score += 10 if variant == attraction["name"] else 8
            break
    name = clean_name(attraction["name"])
    for token in meaningful_tokens(name):
        if token in text:
            score += 4
    if city and city in text:
        score += 2
    if province and province in text:
        score += 1
    if str(candidate.get("source", "")).startswith("Wikimedia Commons"):
        score += 2
    width, height = candidate.get("width") or 0, candidate.get("height") or 0
    if width and height and 1.05 <= width / height <= 2.1:
        score += 1
    return score


def has_explicit_name_match(candidate: dict, attraction: dict) -> bool:
    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    for variant in name_variants(attraction["name"], include_aliases=True):
        normalized = normalize_search(variant)
        if normalized and normalized in text:
            return True
    return any(token in text for token in meaningful_tokens(attraction["name"]))


def reliable_openverse_candidate(candidate: dict, attraction: dict) -> bool:
    if not str(candidate.get("source", "")).startswith("Openverse"):
        return True

    name = normalize(clean_name(attraction["name"]))
    if len(name) > 4:
        return True

    text = normalize_search(" ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", "")]))
    anchors = [
        attraction.get("province", ""),
        province_short(attraction.get("province", "")),
        attraction.get("city", ""),
        strip_admin_suffix(attraction.get("city", "")),
    ]
    return any(normalize_search(anchor) in text for anchor in anchors if len(normalize(anchor)) >= 2)


def download_image(session: requests.Session, source: dict, out_path: Path, args: argparse.Namespace) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    urls = unique([compressed_url(source["url"], args), source["url"]])
    last_error = None
    for url in urls:
        for attempt in range(max(args.retries, 1)):
            try:
                response = session.get(url, timeout=getattr(session, "download_timeout", 60.0))
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
                if attempt + 1 >= max(args.retries, 1):
                    continue
                if "HTTP 429" in str(error) or "HTTP 5" in str(error):
                    time.sleep(args.retry_gap * (attempt + 1))
                else:
                    time.sleep(0.25)
    raise RuntimeError(str(last_error))


def compressed_url(url: str, args: argparse.Namespace) -> str:
    parsed = urlparse(url)
    if not parsed.netloc:
        return url
    if (
        parsed.netloc == "commons.wikimedia.org"
        and "/Special:Redirect/file/" in parsed.path
        and not args.proxy_commons_redirects
    ):
        return url
    source = f"{parsed.netloc}{parsed.path}"
    if parsed.query:
        source += f"?{parsed.query}"
    return f"https://images.weserv.nl/?url={quote(source, safe=':/?=&%')}&w={args.width}&output=jpg&q={args.quality}"


def commons_redirect_url(file_name: str | None, width: int = 900) -> str | None:
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
    text = " ".join([candidate.get("title", ""), candidate.get("text", ""), candidate.get("pageUrl", ""), url])
    if has_rejected_term(text):
        return False
    if url.endswith((".svg", ".webm", ".mp4", ".ogv", ".pdf")) or "/svg/" in url:
        return False
    width, height = candidate.get("width") or 0, candidate.get("height") or 0
    if width and height:
        if width < 420 or height < 260:
            return False
        ratio = width / height
        if ratio < 0.72 or ratio > 2.75:
            return False
    return True


def has_rejected_term(value: str) -> bool:
    raw_text = normalize(value).lower()
    compact_text = normalize_search(raw_text)
    for term in REJECTED_TERMS:
        raw_term = normalize(term).lower()
        compact_term = normalize_search(raw_term)
        if raw_term and raw_term in raw_text:
            return True
        if not compact_term:
            continue
        if re.search(r"[\u4e00-\u9fff]", raw_term) and compact_term in compact_text:
            return True
        if " " in raw_term.strip() and compact_term in compact_text:
            return True
        if " " not in raw_term and compact_term in compact_text:
            return True
    return False


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


def name_variants(name: str, include_aliases: bool = False) -> list[str]:
    cleaned = clean_name(name)
    variants = [name, cleaned]
    if include_aliases:
        variants.extend(SEARCH_ALIASES.get(normalize(name), []))
    variants.extend(strip_generic_suffixes(cleaned))
    variants.extend(token for token in re.split(r"\s+|·|—|-", cleaned) if len(token.strip()) >= 2)
    return unique(variants)


def meaningful_tokens(name: str) -> list[str]:
    stripped = re.sub("|".join(re.escape(suffix) for suffix in GENERIC_SUFFIXES), " ", name)
    return [
        normalize_search(item)
        for item in re.split(r"\s+|·|—|-", stripped)
        if (len(item.strip()) >= 3 or re.search(r"[a-zA-Z]", item)) and not is_short_admin_name(item.strip())
    ]


def is_short_admin_name(value: str) -> bool:
    normalized = normalize(value)
    return len(normalized) <= 4 and normalized.endswith(ADMIN_SUFFIXES)


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
