window.CHINA_TRAVEL_SOURCE_INDEX = {
  "datasetVersion": "2026-06",
  "updatedAt": "2026-06-13",
  "maintainer": "marksui",
  "sources": {
    "mct-official-5a": {
      "label": {
        "zh-CN": "文旅部官方 5A 查询",
        "zh-TW": "文旅部官方 5A 查詢",
        "ko": "문화여유부 공식 5A 조회",
        "ja": "文化観光部公式 5A 検索",
        "th": "การค้นหา 5A ทางการของกระทรวงวัฒนธรรมและการท่องเที่ยว",
        "es": "Consulta oficial 5A del MCT",
        "ru": "Официальный поиск 5A Минкультуры и туризма",
        "en": "MCT official 5A lookup"
      },
      "type": "official",
      "url": "https://zwfw.mct.gov.cn/wycx/5ajlyjq/",
      "updatedAt": "2026-06",
      "note": {
        "zh-CN": "用于核对国家 5A 景区名称、所在地区与评定年份。",
        "en": "Used to verify official 5A names, regions, and rating years."
      }
    },
    "mct-2024-announcements": {
      "label": {
        "zh-CN": "文旅部 2024 年 5A 公告",
        "zh-TW": "文旅部 2024 年 5A 公告",
        "ko": "문화여유부 2024년 5A 공고",
        "ja": "文化観光部 2024 年 5A 公告",
        "th": "ประกาศ 5A ปี 2024 ของกระทรวงวัฒนธรรมและการท่องเที่ยว",
        "es": "Anuncios 5A 2024 del MCT",
        "ru": "Объявления 5A за 2024 год",
        "en": "MCT 2024 5A announcements"
      },
      "type": "official",
      "urls": [
        "https://zwgk.mct.gov.cn/zfxxgkml/zykf/202402/t20240206_951222.html",
        "https://zwgk.mct.gov.cn/zfxxgkml/zykf/202412/t20241227_957450.html"
      ],
      "updatedAt": "2024-12-27",
      "note": {
        "zh-CN": "用于补充近年新增的国家 5A 景区批次。",
        "en": "Used for recently added official 5A batches."
      }
    },
    "open-4a-list": {
      "label": {
        "zh-CN": "开放 4A 名录",
        "zh-TW": "開放 4A 名錄",
        "ko": "공개 4A 명단",
        "ja": "公開 4A 名簿",
        "th": "รายการเปิด 4A",
        "es": "Lista abierta 4A",
        "ru": "Открытый список 4A",
        "en": "Open 4A list"
      },
      "type": "open-list",
      "url": "https://zh.wikipedia.org/wiki/%E5%9B%BD%E5%AE%B64A%E7%BA%A7%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA",
      "updatedAt": "2026-06",
      "note": {
        "zh-CN": "4A 及以下等级由省级文旅行政主管部门评定管理；当前 4A 数据为开放名录整理，不等同于统一部级官方清单。",
        "en": "4A and lower ratings are managed by provincial culture and tourism authorities; this is an open-list compilation, not a unified ministry-level official list."
      }
    },
    "city-geo": {
      "label": {
        "zh-CN": "city-geo 行政参考点",
        "zh-TW": "city-geo 行政參考點",
        "ko": "city-geo 행정 기준점",
        "ja": "city-geo 行政参照点",
        "th": "จุดอ้างอิงเขตปกครอง city-geo",
        "es": "Puntos administrativos city-geo",
        "ru": "Административные точки city-geo",
        "en": "city-geo administrative reference points"
      },
      "type": "open-data",
      "url": "https://github.com/88250/city-geo",
      "updatedAt": "2026-06",
      "note": {
        "zh-CN": "用于 4A 初始区县/城市参考坐标，后续需要继续校正到真实景区点位。",
        "en": "Used for initial 4A district/city reference coordinates; exact scenic points still need review."
      }
    },
    "peer-curated": {
      "label": {
        "zh-CN": "台港澳对标景点手动整理",
        "zh-TW": "台港澳對標景點手動整理",
        "ko": "대만/홍콩/마카오 준 5A 수동 정리",
        "ja": "台湾・香港・マカオ比較スポット手動整理",
        "th": "สถานที่เทียบเคียงไต้หวัน ฮ่องกง และมาเก๊าที่จัดทำเอง",
        "es": "Sitios pares de Taiwán/Hong Kong/Macao curados",
        "ru": "Кураторские аналоги Тайваня, Гонконга и Макао",
        "en": "Curated Taiwan/Hong Kong/Macao peer sites"
      },
      "type": "curated",
      "updatedAt": "2026-06",
      "note": {
        "zh-CN": "仅作浏览对照，不属于中国大陆官方 A 级景区评定。",
        "en": "For browsing comparison only; these are not mainland China official A-rated scenic areas."
      }
    },
    "openstreetmap": {
      "label": {
        "zh-CN": "OpenStreetMap 面边界",
        "zh-TW": "OpenStreetMap 面邊界",
        "ko": "OpenStreetMap 면 경계",
        "ja": "OpenStreetMap 面境界",
        "th": "ขอบเขตพื้นที่ OpenStreetMap",
        "es": "Polígonos de OpenStreetMap",
        "ru": "Полигоны OpenStreetMap",
        "en": "OpenStreetMap boundaries"
      },
      "type": "open-map",
      "url": "https://www.openstreetmap.org/copyright",
      "updatedAt": "live",
      "note": {
        "zh-CN": "选中景点后在线查询 OSM 面边界；缺少面边界时显示近似范围。",
        "en": "Queried online for selected attraction boundaries; approximate ranges are shown when no polygon is found."
      }
    },
    "mct-2020-announcements": {
      "label": {
        "zh-CN": "文旅部 2020 年 5A 公告",
        "zh-TW": "文旅部 2020 年 5A 公告",
        "ko": "MCT 2020 5A announcement",
        "ja": "MCT 2020 5A announcement",
        "th": "MCT 2020 5A announcement",
        "es": "Anuncio 5A 2020 del MCT",
        "ru": "MCT 2020 5A announcement",
        "en": "MCT 2020 5A announcement"
      },
      "type": "official",
      "urls": [
        "https://zwgk.mct.gov.cn/zfxxgkml/zykf/202012/t20201230_920356.html"
      ],
      "updatedAt": "2020-12-29",
      "note": {
        "zh-CN": "用于标记 2020 年新增 21 家国家 5A 景区公告批次。",
        "en": "Used for the 2020 official batch adding 21 national 5A scenic areas."
      }
    },
    "mct-2021-announcements": {
      "label": {
        "zh-CN": "文旅部 2021 年 5A 公告",
        "zh-TW": "文旅部 2021 年 5A 公告",
        "ko": "MCT 2021 5A announcements",
        "ja": "MCT 2021 5A announcements",
        "th": "MCT 2021 5A announcements",
        "es": "Anuncios 5A 2021 del MCT",
        "ru": "MCT 2021 5A announcements",
        "en": "MCT 2021 5A announcements"
      },
      "type": "official",
      "urls": [
        "https://zwgk.mct.gov.cn/zfxxgkml/zykf/202105/t20210512_924422.html",
        "https://zwgk.mct.gov.cn/zfxxgkml/zykf/202106/t20210611_925193.html"
      ],
      "updatedAt": "2021-06-09",
      "note": {
        "zh-CN": "用于标记 2021 年新疆、上海、湖南等国家 5A 景区公告批次。",
        "en": "Used for 2021 official 5A batches covering Xinjiang, Shanghai, Hunan, and related sites."
      }
    },
    "mct-2022-announcements": {
      "label": {
        "zh-CN": "文旅部 2022 年 5A 公告",
        "zh-TW": "文旅部 2022 年 5A 公告",
        "ko": "MCT 2022 5A announcement",
        "ja": "MCT 2022 5A announcement",
        "th": "MCT 2022 5A announcement",
        "es": "Anuncio 5A 2022 del MCT",
        "ru": "MCT 2022 5A announcement",
        "en": "MCT 2022 5A announcement"
      },
      "type": "official",
      "urls": [
        "https://zwgk.mct.gov.cn/zfxxgkml/zykf/202207/t20220715_934688.html"
      ],
      "updatedAt": "2022-07-15",
      "note": {
        "zh-CN": "用于标记 2022 年新增 12 家国家 5A 景区公告批次。",
        "en": "Used for the 2022 official batch adding 12 national 5A scenic areas."
      }
    }
  },
  "officialAnnouncementSources": {
    "2020": [
      "mct-2020-announcements"
    ],
    "2021": [
      "mct-2021-announcements"
    ],
    "2022": [
      "mct-2022-announcements"
    ],
    "2024": [
      "mct-2024-announcements"
    ]
  }
};
