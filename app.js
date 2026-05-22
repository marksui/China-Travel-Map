const attractions = window.CHINA_5A_ATTRACTIONS || [];
const meta = window.CHINA_5A_META || {};
const localImages = window.CHINA_5A_IMAGES || {};
const localizedAttractionNames = window.CHINA_5A_ATTRACTION_NAMES || {};

const highlightColor = "#b65345";
const fallbackImage = localImages.fallback || {
  url: "assets/images/fallback.jpg",
  pageUrl:
    "https://commons.wikimedia.org/wiki/File:Mutianyu_%E2%80%93_Panorama_(Greg_Zaal_via_Poly_Haven).jpg",
  caption: "暂无该景点本地实景图，显示通用景区图",
};

const allRegionsValue = "全部";
const languages = {
  "zh-CN": { htmlLang: "zh-CN" },
  "zh-TW": { htmlLang: "zh-Hant" },
  en: { htmlLang: "en" },
  ko: { htmlLang: "ko" },
  ja: { htmlLang: "ja" },
  th: { htmlLang: "th" },
  es: { htmlLang: "es" },
  ru: { htmlLang: "ru" },
};

const translations = {
  "zh-CN": {
    documentTitle: "中国景点互动地图",
    siteNav: "站点导航",
    brand: "中国景点地图",
    aboutMap: "关于这个地图",
    aboutAria: "关于中国景点地图",
    aboutClose: "关闭说明",
    aboutEyebrow: "开放数据说明",
    aboutTitle: "关于中国景点地图",
    aboutLead: "这是一张开放、可核查的中国景点互动地图，用来浏览中国大陆官方 5A 景区，并补充台港澳代表性对标景点。",
    aboutDataTitle: "数据",
    aboutDataBody: "大陆 5A 景区依据公开公告与本地整理数据维护；台港澳景点作为对标展示。",
    aboutOpenTitle: "开放",
    aboutOpenBody: "项目以静态网页和本地数据文件组织，方便学习、审阅、复用和继续补充。",
    aboutDisclaimerTitle: "免责声明",
    aboutDisclaimerBody: "景点评级、边界、图片和坐标会随官方公告、开放地图和图片授权变化而变化，本页面仅供浏览参考，不构成官方发布、出行承诺或商业建议。",
    aboutCredit: "Made by marksui",
    aboutDate: "2026年6月",
    searchPlaceholder: "搜索景点或地区",
    clearSearch: "清空搜索",
    mapTools: "地图工具",
    collapseFilters: "收起筛选",
    openFilters: "打开筛选",
    fitResults: "定位结果",
    mapGuide: "地图说明",
    language: "语言",
    mapAria: "中国景点地图",
    closeMapGuide: "关闭地图说明",
    currentFilterStats: "当前筛选统计",
    official5A: "国家5A",
    peerAttractions: "对标景点",
    regions: "地区",
    official5ATitle: "国家 5A",
    official5ADesc: "中国大陆官方 AAAAA 级旅游景区",
    peer5ATitle: "对标 5A",
    peer5ADesc: "台湾、香港、澳门代表性景点，非大陆官方评级",
    selectedRangeTitle: "选中范围",
    selectedRangeDesc: "点击景点后优先显示 OSM 面边界；没有面边界时只保留选中点",
    regionalHeat: "地区热度",
    clickToFilter: "点击可筛选",
    filtersAria: "景点筛选",
    closeFilters: "收起筛选面板",
    featureAlt: "慕田峪长城全景",
    featureCaption: "慕田峪长城全景",
    eyebrow: "国家 5A / 对标 5A 景点",
    heroLine1: "欢迎使用中国景点",
    heroLine2: "在线地图",
    intro: "覆盖中国大陆官方 5A 景区，并加入台湾、香港、澳门的对标 5A 景点。",
    summaryStats: "统计摘要",
    attractions: "景点",
    filteredResults: "筛选结果",
    filterConditions: "筛选条件",
    regionLabel: "地区",
    allRegions: "全部地区",
    nationwide: "全国",
    resultCount: "{count} 个景点",
    filterSubtitle: "{region} · 国家5A + 对标景点",
    reset: "重置",
    attractionList: "景点列表",
    noMatches: "没有匹配的景点",
    detailAria: "景点详情",
    closeDetail: "关闭详情",
    chooseAttraction: "选择景点",
    noSelectionTitle: "在地图或列表中选择一个景点",
    scenicImageAlt: "景点图片",
    rating: "评级",
    basis: "依据",
    footprint: "占地范围",
    focus: "定位",
    sameRegion: "同地区景点",
    noSelection: "暂无选择",
    noSameRegion: "没有其他同地区景点",
    relatedCaption: "{region} · {count} 个",
    distributionCaption: "{region} · {count} 个景点",
    peerBadgeShort: "对标",
    peerMeta: "对标大陆 5A",
    officialMeta: "{year} 年评为 5A",
    peerDetail: "{label}（非大陆官方评级）",
    officialDetail: "{year} 年",
    osmBoundary: "OSM 面边界",
    imageSourcePrefix: "图片来源：",
    imageUnavailable: "暂无可靠图片，正在补图",
    fallbackImageCaption: "通用景区占位图（慕田峪长城全景）",
    sourceNote:
      '大陆 5A 数据以用户提供的 <span>China-5A-tourist-attraction.md</span> 为基础，并补充文旅部 2020-2024 官方公告；台港澳为对标 5A 手动补充；可用面边界来自 OpenStreetMap；地图底图 © OpenStreetMap。',
  },
  "zh-TW": {
    documentTitle: "中國景點互動地圖",
    siteNav: "站點導覽",
    brand: "中國景點地圖",
    searchPlaceholder: "搜尋景點或地區",
    clearSearch: "清除搜尋",
    mapTools: "地圖工具",
    collapseFilters: "收起篩選",
    openFilters: "打開篩選",
    fitResults: "定位結果",
    mapGuide: "地圖說明",
    language: "語言",
    mapAria: "中國景點地圖",
    closeMapGuide: "關閉地圖說明",
    currentFilterStats: "目前篩選統計",
    official5A: "國家5A",
    peerAttractions: "對標景點",
    regions: "地區",
    official5ATitle: "國家 5A",
    official5ADesc: "中國大陸官方 AAAAA 級旅遊景區",
    peer5ATitle: "對標 5A",
    peer5ADesc: "臺灣、香港、澳門代表性景點，非大陸官方評級",
    selectedRangeTitle: "選中範圍",
    selectedRangeDesc: "點擊景點後優先顯示 OSM 面邊界；沒有面邊界時只保留選中點",
    regionalHeat: "地區熱度",
    clickToFilter: "點擊可篩選",
    filtersAria: "景點篩選",
    closeFilters: "收起篩選面板",
    featureAlt: "慕田峪長城全景",
    featureCaption: "慕田峪長城全景",
    eyebrow: "國家 5A / 對標 5A 景點",
    heroLine1: "歡迎使用中國景點",
    heroLine2: "線上地圖",
    intro: "覆蓋中國大陸官方 5A 景區，並加入臺灣、香港、澳門的對標 5A 景點。",
    summaryStats: "統計摘要",
    attractions: "景點",
    filteredResults: "篩選結果",
    filterConditions: "篩選條件",
    regionLabel: "地區",
    allRegions: "全部地區",
    nationwide: "全國",
    resultCount: "{count} 個景點",
    filterSubtitle: "{region} · 國家5A + 對標景點",
    reset: "重置",
    attractionList: "景點列表",
    noMatches: "沒有符合的景點",
    detailAria: "景點詳情",
    closeDetail: "關閉詳情",
    chooseAttraction: "選擇景點",
    noSelectionTitle: "在地圖或列表中選擇一個景點",
    scenicImageAlt: "景點圖片",
    rating: "評級",
    basis: "依據",
    footprint: "占地範圍",
    focus: "定位",
    sameRegion: "同地區景點",
    noSelection: "暫無選擇",
    noSameRegion: "沒有其他同地區景點",
    relatedCaption: "{region} · {count} 個",
    distributionCaption: "{region} · {count} 個景點",
    peerBadgeShort: "對標",
    peerMeta: "對標大陸 5A",
    officialMeta: "{year} 年評為 5A",
    peerDetail: "{label}（非大陸官方評級）",
    officialDetail: "{year} 年",
    osmBoundary: "OSM 面邊界",
    imageSourcePrefix: "圖片來源：",
    fallbackImageCaption: "通用景區占位圖（慕田峪長城全景）",
    sourceNote:
      '大陸 5A 資料以使用者提供的 <span>China-5A-tourist-attraction.md</span> 為基礎，並補充文旅部 2020-2024 官方公告；臺港澳為對標 5A 手動補充；可用面邊界來自 OpenStreetMap；地圖底圖 © OpenStreetMap。',
  },
  en: {
    documentTitle: "China Attractions Interactive Map",
    siteNav: "Site navigation",
    brand: "China Attractions Map",
    searchPlaceholder: "Search attractions or regions",
    clearSearch: "Clear search",
    mapTools: "Map tools",
    collapseFilters: "Hide filters",
    openFilters: "Show filters",
    fitResults: "Fit results",
    mapGuide: "Map guide",
    language: "Language",
    mapAria: "Map of China attractions",
    closeMapGuide: "Close map guide",
    currentFilterStats: "Current filter statistics",
    official5A: "Official 5A",
    peerAttractions: "Peer sites",
    regions: "Regions",
    official5ATitle: "Official 5A",
    official5ADesc: "Mainland China official AAAAA tourist attractions",
    peer5ATitle: "Peer 5A",
    peer5ADesc: "Representative sites in Taiwan, Hong Kong, and Macao; not mainland official ratings",
    selectedRangeTitle: "Selected area",
    selectedRangeDesc: "Shows an OSM polygon when available; otherwise keeps only the selected point",
    regionalHeat: "Regional density",
    clickToFilter: "Click to filter",
    filtersAria: "Attraction filters",
    closeFilters: "Hide filter panel",
    featureAlt: "Mutianyu Great Wall panorama",
    featureCaption: "Mutianyu Great Wall panorama",
    eyebrow: "Official 5A / Peer 5A Attractions",
    heroLine1: "China Attractions",
    heroLine2: "Interactive Map",
    intro:
      "Covers official mainland China 5A scenic areas plus peer 5A attractions in Taiwan, Hong Kong, and Macao.",
    summaryStats: "Summary statistics",
    attractions: "Attractions",
    filteredResults: "Shown",
    filterConditions: "Filters",
    regionLabel: "Region",
    allRegions: "All regions",
    nationwide: "Nationwide",
    resultCount: "{count} attractions",
    filterSubtitle: "{region} · mainland 5A + peer attractions",
    reset: "Reset",
    attractionList: "Attraction list",
    noMatches: "No matching attractions",
    detailAria: "Attraction details",
    closeDetail: "Close details",
    chooseAttraction: "Choose an attraction",
    noSelectionTitle: "Select an attraction on the map or list",
    scenicImageAlt: "Attraction image",
    rating: "Rating",
    basis: "Basis",
    footprint: "Footprint",
    focus: "Focus",
    sameRegion: "Same region",
    noSelection: "No selection",
    noSameRegion: "No other attractions in this region",
    relatedCaption: "{region} · {count}",
    distributionCaption: "{region} · {count} attractions",
    peerBadgeShort: "P5A",
    peerMeta: "Peer to mainland 5A",
    officialMeta: "Rated 5A in {year}",
    peerDetail: "{label} (not an official mainland rating)",
    officialDetail: "{year}",
    osmBoundary: "OSM polygon",
    imageSourcePrefix: "Image source: ",
    fallbackImageCaption: "generic scenic placeholder (Mutianyu Great Wall panorama)",
    sourceNote:
      'Mainland 5A data is based on the user-provided <span>China-5A-tourist-attraction.md</span>, with 2020-2024 Ministry of Culture and Tourism announcements added; Taiwan, Hong Kong, and Macao peer sites were added manually; available polygons come from OpenStreetMap; basemap © OpenStreetMap.',
  },
  ko: {
    documentTitle: "중국 명소 인터랙티브 지도",
    siteNav: "사이트 내비게이션",
    brand: "중국 명소 지도",
    searchPlaceholder: "명소 또는 지역 검색",
    clearSearch: "검색 지우기",
    mapTools: "지도 도구",
    collapseFilters: "필터 접기",
    openFilters: "필터 열기",
    fitResults: "결과 보기",
    mapGuide: "지도 안내",
    language: "언어",
    mapAria: "중국 명소 지도",
    closeMapGuide: "지도 안내 닫기",
    currentFilterStats: "현재 필터 통계",
    official5A: "국가 5A",
    peerAttractions: "준 5A 명소",
    regions: "지역",
    official5ATitle: "국가 5A",
    official5ADesc: "중국 본토 공식 AAAAA급 관광지",
    peer5ATitle: "준 5A",
    peer5ADesc: "대만, 홍콩, 마카오의 대표 명소이며 본토 공식 등급은 아닙니다",
    selectedRangeTitle: "선택 범위",
    selectedRangeDesc: "OSM 면 경계가 있으면 우선 표시하고, 없으면 선택 지점만 표시합니다",
    regionalHeat: "지역 밀도",
    clickToFilter: "클릭하여 필터",
    filtersAria: "명소 필터",
    closeFilters: "필터 패널 닫기",
    featureAlt: "무톈위 만리장성 전경",
    featureCaption: "무톈위 만리장성 전경",
    eyebrow: "국가 5A / 준 5A 명소",
    heroLine1: "중국 명소",
    heroLine2: "온라인 지도",
    intro: "중국 본토 공식 5A 관광지와 대만, 홍콩, 마카오의 준 5A 명소를 함께 제공합니다.",
    summaryStats: "통계 요약",
    attractions: "명소",
    filteredResults: "표시 결과",
    filterConditions: "필터 조건",
    regionLabel: "지역",
    allRegions: "전체 지역",
    nationwide: "전국",
    resultCount: "명소 {count}곳",
    filterSubtitle: "{region} · 국가5A + 준 5A 명소",
    reset: "초기화",
    attractionList: "명소 목록",
    noMatches: "일치하는 명소가 없습니다",
    detailAria: "명소 상세",
    closeDetail: "상세 닫기",
    chooseAttraction: "명소 선택",
    noSelectionTitle: "지도나 목록에서 명소를 선택하세요",
    scenicImageAlt: "명소 이미지",
    rating: "등급",
    basis: "근거",
    footprint: "점유 범위",
    focus: "이동",
    sameRegion: "같은 지역 명소",
    noSelection: "선택 없음",
    noSameRegion: "이 지역의 다른 명소가 없습니다",
    relatedCaption: "{region} · {count}곳",
    distributionCaption: "{region} · 명소 {count}곳",
    peerBadgeShort: "준5A",
    peerMeta: "본토 5A에 준함",
    officialMeta: "{year}년 5A 지정",
    peerDetail: "{label} (중국 본토 공식 등급 아님)",
    officialDetail: "{year}년",
    osmBoundary: "OSM 면 경계",
    imageSourcePrefix: "이미지 출처: ",
    fallbackImageCaption: "공통 명소 대체 이미지(무톈위 만리장성 전경)",
    sourceNote:
      '중국 본토 5A 데이터는 사용자가 제공한 <span>China-5A-tourist-attraction.md</span>를 기반으로 하며 2020-2024년 문화여유부 공식 공고를 보완했습니다. 대만, 홍콩, 마카오 준 5A 명소는 수동으로 보완했으며, 사용 가능한 면 경계는 OpenStreetMap, 배경 지도는 © OpenStreetMap입니다.',
  },
  ja: {
    documentTitle: "中国観光地インタラクティブ地図",
    siteNav: "サイトナビゲーション",
    brand: "中国観光地マップ",
    searchPlaceholder: "観光地または地域を検索",
    clearSearch: "検索をクリア",
    mapTools: "地図ツール",
    collapseFilters: "フィルターを閉じる",
    openFilters: "フィルターを開く",
    fitResults: "結果に合わせる",
    mapGuide: "地図ガイド",
    language: "言語",
    mapAria: "中国観光地の地図",
    closeMapGuide: "地図ガイドを閉じる",
    currentFilterStats: "現在のフィルター統計",
    official5A: "国家5A",
    peerAttractions: "準 5A",
    regions: "地域",
    official5ATitle: "国家 5A",
    official5ADesc: "中国本土の公式 AAAAA 級観光地",
    peer5ATitle: "準 5A",
    peer5ADesc: "台湾、香港、マカオの代表的観光地。本土公式等級ではありません",
    selectedRangeTitle: "選択範囲",
    selectedRangeDesc: "OSM の面境界があれば優先表示し、ない場合は選択点のみ表示します",
    regionalHeat: "地域密度",
    clickToFilter: "クリックで絞り込み",
    filtersAria: "観光地フィルター",
    closeFilters: "フィルターパネルを閉じる",
    featureAlt: "慕田峪長城の全景",
    featureCaption: "慕田峪長城の全景",
    eyebrow: "国家 5A / 準 5A 観光地",
    heroLine1: "中国観光地",
    heroLine2: "オンラインマップ",
    intro: "中国本土の公式 5A 観光地に加え、台湾、香港、マカオの準 5A 観光地を掲載しています。",
    summaryStats: "統計概要",
    attractions: "観光地",
    filteredResults: "表示結果",
    filterConditions: "フィルター条件",
    regionLabel: "地域",
    allRegions: "すべての地域",
    nationwide: "全国",
    resultCount: "{count} 件の観光地",
    filterSubtitle: "{region} · 国家5A + 準 5A 観光地",
    reset: "リセット",
    attractionList: "観光地リスト",
    noMatches: "一致する観光地がありません",
    detailAria: "観光地詳細",
    closeDetail: "詳細を閉じる",
    chooseAttraction: "観光地を選択",
    noSelectionTitle: "地図またはリストから観光地を選択してください",
    scenicImageAlt: "観光地画像",
    rating: "等級",
    basis: "根拠",
    footprint: "範囲",
    focus: "移動",
    sameRegion: "同じ地域の観光地",
    noSelection: "未選択",
    noSameRegion: "同じ地域の他の観光地はありません",
    relatedCaption: "{region} · {count} 件",
    distributionCaption: "{region} · {count} 件の観光地",
    peerBadgeShort: "準5A",
    peerMeta: "本土 5A 相当",
    officialMeta: "{year}年に 5A 認定",
    peerDetail: "{label}（中国本土の公式等級ではありません）",
    officialDetail: "{year}年",
    osmBoundary: "OSM 面境界",
    imageSourcePrefix: "画像出典: ",
    fallbackImageCaption: "共通の観光地プレースホルダー（慕田峪長城の全景）",
    sourceNote:
      '中国本土 5A データはユーザー提供の <span>China-5A-tourist-attraction.md</span> を基に、2020-2024 年の文化観光部公式公告を補足しています。台湾、香港、マカオの準 5A は手動で追加しました。利用可能な面境界は OpenStreetMap、背景地図は © OpenStreetMap です。',
  },
  th: {
    documentTitle: "แผนที่โต้ตอบแหล่งท่องเที่ยวในจีน",
    siteNav: "การนำทางไซต์",
    brand: "แผนที่แหล่งท่องเที่ยวของจีน",
    searchPlaceholder: "ค้นหาแหล่งท่องเที่ยวหรือภูมิภาค",
    clearSearch: "ล้างการค้นหา",
    mapTools: "เครื่องมือแผนที่",
    collapseFilters: "ซ่อนตัวกรอง",
    openFilters: "เปิดตัวกรอง",
    fitResults: "ดูผลลัพธ์",
    mapGuide: "คำอธิบายแผนที่",
    language: "ภาษา",
    mapAria: "แผนที่แหล่งท่องเที่ยวในจีน",
    closeMapGuide: "ปิดคำอธิบายแผนที่",
    currentFilterStats: "สถิติตัวกรองปัจจุบัน",
    official5A: "5A ทางการ",
    peerAttractions: "แหล่งเทียบเท่า",
    regions: "ภูมิภาค",
    official5ATitle: "5A ทางการ",
    official5ADesc: "แหล่งท่องเที่ยวระดับ AAAAA อย่างเป็นทางการของจีนแผ่นดินใหญ่",
    peer5ATitle: "เทียบเท่า 5A",
    peer5ADesc: "แหล่งเด่นในไต้หวัน ฮ่องกง และมาเก๊า ไม่ใช่การจัดอันดับทางการของจีนแผ่นดินใหญ่",
    selectedRangeTitle: "พื้นที่ที่เลือก",
    selectedRangeDesc: "แสดงขอบเขตพื้นที่จาก OSM หากมี มิฉะนั้นจะแสดงเฉพาะจุดที่เลือก",
    regionalHeat: "ความหนาแน่นตามภูมิภาค",
    clickToFilter: "คลิกเพื่อกรอง",
    filtersAria: "ตัวกรองแหล่งท่องเที่ยว",
    closeFilters: "ปิดแผงตัวกรอง",
    featureAlt: "ภาพพาโนรามากำแพงเมืองจีนมู่เถียนยวี่",
    featureCaption: "ภาพพาโนรามากำแพงเมืองจีนมู่เถียนยวี่",
    eyebrow: "แหล่งท่องเที่ยว 5A ทางการ / เทียบเท่า 5A",
    heroLine1: "แหล่งท่องเที่ยวของจีน",
    heroLine2: "แผนที่ออนไลน์",
    intro: "ครอบคลุมแหล่งท่องเที่ยว 5A ทางการในจีนแผ่นดินใหญ่ พร้อมแหล่งเทียบเท่าในไต้หวัน ฮ่องกง และมาเก๊า",
    summaryStats: "สรุปสถิติ",
    attractions: "แหล่งท่องเที่ยว",
    filteredResults: "ผลลัพธ์ที่แสดง",
    filterConditions: "เงื่อนไขตัวกรอง",
    regionLabel: "ภูมิภาค",
    allRegions: "ทุกภูมิภาค",
    nationwide: "ทั่วประเทศ",
    resultCount: "{count} แหล่งท่องเที่ยว",
    filterSubtitle: "{region} · 5A ทางการ + แหล่งเทียบเท่า",
    reset: "รีเซ็ต",
    attractionList: "รายชื่อแหล่งท่องเที่ยว",
    noMatches: "ไม่พบแหล่งท่องเที่ยวที่ตรงกัน",
    detailAria: "รายละเอียดแหล่งท่องเที่ยว",
    closeDetail: "ปิดรายละเอียด",
    chooseAttraction: "เลือกแหล่งท่องเที่ยว",
    noSelectionTitle: "เลือกแหล่งท่องเที่ยวบนแผนที่หรือในรายการ",
    scenicImageAlt: "ภาพแหล่งท่องเที่ยว",
    rating: "ระดับ",
    basis: "หลักเกณฑ์",
    footprint: "ขอบเขตพื้นที่",
    focus: "โฟกัส",
    sameRegion: "ภูมิภาคเดียวกัน",
    noSelection: "ยังไม่ได้เลือก",
    noSameRegion: "ไม่มีแหล่งท่องเที่ยวอื่นในภูมิภาคนี้",
    relatedCaption: "{region} · {count}",
    distributionCaption: "{region} · {count} แหล่งท่องเที่ยว",
    peerBadgeShort: "เทียบ",
    peerMeta: "เทียบเท่า 5A แผ่นดินใหญ่",
    officialMeta: "ได้รับระดับ 5A ในปี {year}",
    peerDetail: "{label} (ไม่ใช่การจัดอันดับทางการของจีนแผ่นดินใหญ่)",
    officialDetail: "{year}",
    osmBoundary: "ขอบเขตพื้นที่ OSM",
    imageSourcePrefix: "ที่มาภาพ: ",
    fallbackImageCaption: "ภาพตัวอย่างทั่วไป (พาโนรามากำแพงเมืองจีนมู่เถียนยวี่)",
    sourceNote:
      'ข้อมูล 5A ของจีนแผ่นดินใหญ่อ้างอิงจากไฟล์ <span>China-5A-tourist-attraction.md</span> ที่ผู้ใช้ให้มา และเพิ่มประกาศทางการของกระทรวงวัฒนธรรมและการท่องเที่ยวปี 2020-2024; แหล่งเทียบเท่าในไต้หวัน ฮ่องกง และมาเก๊าเพิ่มด้วยตนเอง; ขอบเขตพื้นที่ที่มีมาจาก OpenStreetMap; แผนที่พื้นฐาน © OpenStreetMap.',
  },
  es: {
    documentTitle: "Mapa interactivo de atracciones de China",
    siteNav: "Navegación del sitio",
    brand: "Mapa de atracciones de China",
    searchPlaceholder: "Buscar atracciones o regiones",
    clearSearch: "Borrar búsqueda",
    mapTools: "Herramientas del mapa",
    collapseFilters: "Ocultar filtros",
    openFilters: "Mostrar filtros",
    fitResults: "Ver resultados",
    mapGuide: "Guía del mapa",
    language: "Idioma",
    mapAria: "Mapa de atracciones de China",
    closeMapGuide: "Cerrar guía del mapa",
    currentFilterStats: "Estadísticas del filtro actual",
    official5A: "5A oficial",
    peerAttractions: "Sitios equivalentes",
    regions: "Regiones",
    official5ATitle: "5A oficial",
    official5ADesc: "Atracciones turísticas AAAAA oficiales de China continental",
    peer5ATitle: "Equivalente 5A",
    peer5ADesc: "Sitios representativos de Taiwán, Hong Kong y Macao; no son calificaciones oficiales continentales",
    selectedRangeTitle: "Área seleccionada",
    selectedRangeDesc: "Muestra un polígono de OSM si existe; si no, conserva solo el punto seleccionado",
    regionalHeat: "Densidad regional",
    clickToFilter: "Haz clic para filtrar",
    filtersAria: "Filtros de atracciones",
    closeFilters: "Ocultar panel de filtros",
    featureAlt: "Panorama de la Gran Muralla de Mutianyu",
    featureCaption: "Panorama de la Gran Muralla de Mutianyu",
    eyebrow: "Atracciones 5A oficiales / equivalentes 5A",
    heroLine1: "Atracciones de China",
    heroLine2: "Mapa en línea",
    intro:
      "Cubre las áreas escénicas 5A oficiales de China continental y atracciones equivalentes en Taiwán, Hong Kong y Macao.",
    summaryStats: "Resumen estadístico",
    attractions: "Atracciones",
    filteredResults: "Mostradas",
    filterConditions: "Filtros",
    regionLabel: "Región",
    allRegions: "Todas las regiones",
    nationwide: "Todo el país",
    resultCount: "{count} atracciones",
    filterSubtitle: "{region} · 5A continental + equivalentes",
    reset: "Restablecer",
    attractionList: "Lista de atracciones",
    noMatches: "No hay atracciones coincidentes",
    detailAria: "Detalles de la atracción",
    closeDetail: "Cerrar detalles",
    chooseAttraction: "Elige una atracción",
    noSelectionTitle: "Selecciona una atracción en el mapa o la lista",
    scenicImageAlt: "Imagen de la atracción",
    rating: "Calificación",
    basis: "Base",
    footprint: "Área",
    focus: "Centrar",
    sameRegion: "Misma región",
    noSelection: "Sin selección",
    noSameRegion: "No hay otras atracciones en esta región",
    relatedCaption: "{region} · {count}",
    distributionCaption: "{region} · {count} atracciones",
    peerBadgeShort: "Eq.",
    peerMeta: "Equivalente a 5A continental",
    officialMeta: "Calificada 5A en {year}",
    peerDetail: "{label} (no es una calificación oficial de China continental)",
    officialDetail: "{year}",
    osmBoundary: "Polígono OSM",
    imageSourcePrefix: "Fuente de imagen: ",
    fallbackImageCaption: "marcador visual genérico (panorama de la Gran Muralla de Mutianyu)",
    sourceNote:
      'Los datos 5A de China continental se basan en el archivo <span>China-5A-tourist-attraction.md</span> proporcionado por el usuario, con anuncios oficiales 2020-2024 del Ministerio de Cultura y Turismo añadidos; los sitios equivalentes de Taiwán, Hong Kong y Macao se añadieron manualmente; los polígonos disponibles provienen de OpenStreetMap; mapa base © OpenStreetMap.',
  },
  ru: {
    documentTitle: "Интерактивная карта достопримечательностей Китая",
    siteNav: "Навигация по сайту",
    brand: "Карта достопримечательностей Китая",
    searchPlaceholder: "Поиск достопримечательностей или регионов",
    clearSearch: "Очистить поиск",
    mapTools: "Инструменты карты",
    collapseFilters: "Скрыть фильтры",
    openFilters: "Открыть фильтры",
    fitResults: "Показать результаты",
    mapGuide: "Описание карты",
    language: "Язык",
    mapAria: "Карта достопримечательностей Китая",
    closeMapGuide: "Закрыть описание карты",
    currentFilterStats: "Статистика текущего фильтра",
    official5A: "Официальные 5A",
    peerAttractions: "Аналоги",
    regions: "Регионы",
    official5ATitle: "Официальные 5A",
    official5ADesc: "Официальные туристические зоны AAAAA материкового Китая",
    peer5ATitle: "Аналог 5A",
    peer5ADesc: "Представительные места Тайваня, Гонконга и Макао; не являются официальным рейтингом материкового Китая",
    selectedRangeTitle: "Выбранная область",
    selectedRangeDesc: "Если доступен полигон OSM, он показывается первым; иначе остается только выбранная точка",
    regionalHeat: "Плотность по регионам",
    clickToFilter: "Нажмите для фильтра",
    filtersAria: "Фильтры достопримечательностей",
    closeFilters: "Скрыть панель фильтров",
    featureAlt: "Панорама участка Мутяньюй Великой Китайской стены",
    featureCaption: "Панорама участка Мутяньюй Великой Китайской стены",
    eyebrow: "Официальные 5A / аналоги 5A",
    heroLine1: "Достопримечательности Китая",
    heroLine2: "Онлайн-карта",
    intro:
      "Охватывает официальные зоны 5A материкового Китая и аналогичные достопримечательности Тайваня, Гонконга и Макао.",
    summaryStats: "Сводная статистика",
    attractions: "Места",
    filteredResults: "Показано",
    filterConditions: "Фильтры",
    regionLabel: "Регион",
    allRegions: "Все регионы",
    nationwide: "Вся страна",
    resultCount: "{count} мест",
    filterSubtitle: "{region} · 5A материка + аналоги",
    reset: "Сбросить",
    attractionList: "Список достопримечательностей",
    noMatches: "Совпадений не найдено",
    detailAria: "Детали достопримечательности",
    closeDetail: "Закрыть детали",
    chooseAttraction: "Выберите достопримечательность",
    noSelectionTitle: "Выберите место на карте или в списке",
    scenicImageAlt: "Изображение достопримечательности",
    rating: "Рейтинг",
    basis: "Основание",
    footprint: "Территория",
    focus: "Фокус",
    sameRegion: "Тот же регион",
    noSelection: "Ничего не выбрано",
    noSameRegion: "В этом регионе нет других мест",
    relatedCaption: "{region} · {count}",
    distributionCaption: "{region} · {count} мест",
    peerBadgeShort: "Аналог",
    peerMeta: "Аналог 5A материка",
    officialMeta: "Получило 5A в {year}",
    peerDetail: "{label} (не официальный рейтинг материкового Китая)",
    officialDetail: "{year}",
    osmBoundary: "Полигон OSM",
    imageSourcePrefix: "Источник изображения: ",
    fallbackImageCaption: "универсальное изображение-заглушка (панорама Великой Китайской стены Мутяньюй)",
    sourceNote:
      'Данные 5A материкового Китая основаны на файле <span>China-5A-tourist-attraction.md</span>, предоставленном пользователем, и дополнены официальными объявлениями Министерства культуры и туризма за 2020-2024 годы; аналоги Тайваня, Гонконга и Макао добавлены вручную; доступные полигоны взяты из OpenStreetMap; базовая карта © OpenStreetMap.',
  },
};

const aboutTranslations = {
  "zh-CN": {
    aboutMap: "关于这个地图",
    aboutAria: "关于中国景点地图",
    aboutClose: "关闭说明",
    aboutEyebrow: "开放数据说明",
    aboutTitle: "关于中国景点地图",
    aboutLead: "这是一张开放、可核查的中国景点互动地图，用来浏览中国大陆官方 5A 景区，并补充台港澳代表性对标景点。",
    aboutDataTitle: "开放数据",
    aboutDataBody: "大陆 5A 景区来自公开公告与本地整理数据；边界参考 OpenStreetMap，图片来自开放授权图库并保留来源。",
    aboutOpenTitle: "开源复用",
    aboutOpenBody: "项目以静态网页和本地数据文件组织，方便审阅、学习、复用、二次开发和继续补充。",
    aboutDisclaimerTitle: "免责声明",
    aboutDisclaimerBody: "景点评级、边界、图片和坐标会随官方公告、开放地图和图片授权变化而变化，本页面仅供浏览参考，不构成官方发布、出行承诺或商业建议。",
    aboutCredit: "Made by marksui",
    aboutDate: "2026年6月",
  },
  "zh-TW": {
    aboutMap: "關於這個地圖",
    aboutAria: "關於中國景點地圖",
    aboutClose: "關閉說明",
    aboutEyebrow: "開放資料說明",
    aboutTitle: "關於中國景點地圖",
    aboutLead: "這是一張開放、可核查的中國景點互動地圖，用來瀏覽中國大陸官方 5A 景區，並補充台港澳代表性對標景點。",
    aboutDataTitle: "開放資料",
    aboutDataBody: "大陸 5A 景區來自公開公告與本地整理資料；邊界參考 OpenStreetMap，圖片來自開放授權圖庫並保留來源。",
    aboutOpenTitle: "開源複用",
    aboutOpenBody: "專案以靜態網頁和本地資料檔組織，方便審閱、學習、複用、二次開發和持續補充。",
    aboutDisclaimerTitle: "免責聲明",
    aboutDisclaimerBody: "景點評級、邊界、圖片和座標會隨官方公告、開放地圖和圖片授權變化而變化，本頁面僅供瀏覽參考，不構成官方發布、出行承諾或商業建議。",
    aboutCredit: "Made by marksui",
    aboutDate: "2026年6月",
  },
  en: {
    aboutMap: "About this map",
    aboutAria: "About China Attractions Map",
    aboutClose: "Close information",
    aboutEyebrow: "Open Data Notice",
    aboutTitle: "About China Attractions Map",
    aboutLead: "An open, reviewable interactive map for browsing official mainland China 5A scenic areas, with representative peer sites in Taiwan, Hong Kong, and Macao.",
    aboutDataTitle: "Open Data",
    aboutDataBody: "Mainland 5A sites are maintained from public announcements and local curated data; boundaries reference OpenStreetMap, and images come from open-license sources with attribution kept.",
    aboutOpenTitle: "Open Source",
    aboutOpenBody: "The project is organized as static pages and local data files so it can be reviewed, learned from, reused, extended, and supplemented.",
    aboutDisclaimerTitle: "Disclaimer",
    aboutDisclaimerBody: "Ratings, boundaries, images, and coordinates may change with official notices, open-map edits, and image licenses. This page is for browsing only and is not an official release, travel commitment, or business advice.",
    aboutCredit: "Made by marksui",
    aboutDate: "June 2026",
  },
  ko: {
    aboutMap: "이 지도 소개",
    aboutAria: "중국 명소 지도 소개",
    aboutClose: "설명 닫기",
    aboutEyebrow: "오픈 데이터 안내",
    aboutTitle: "중국 명소 지도 소개",
    aboutLead: "중국 본토 공식 5A 관광지를 살펴보고 대만, 홍콩, 마카오의 대표적인 비교 명소를 함께 볼 수 있는 개방형 인터랙티브 지도입니다.",
    aboutDataTitle: "오픈 데이터",
    aboutDataBody: "본토 5A 관광지는 공개 공고와 로컬 정리 데이터를 기준으로 관리합니다. 경계는 OpenStreetMap을 참고하고, 이미지는 출처를 남긴 공개 라이선스 자료를 사용합니다.",
    aboutOpenTitle: "오픈 소스",
    aboutOpenBody: "정적 웹페이지와 로컬 데이터 파일로 구성되어 검토, 학습, 재사용, 확장, 보완이 쉽습니다.",
    aboutDisclaimerTitle: "면책 고지",
    aboutDisclaimerBody: "등급, 경계, 이미지, 좌표는 공식 공고, 오픈 지도 편집, 이미지 라이선스 변화에 따라 달라질 수 있습니다. 이 페이지는 참고용이며 공식 발표, 여행 보장, 비즈니스 조언이 아닙니다.",
    aboutCredit: "Made by marksui",
    aboutDate: "2026년 6월",
  },
  ja: {
    aboutMap: "この地図について",
    aboutAria: "中国観光地マップについて",
    aboutClose: "説明を閉じる",
    aboutEyebrow: "オープンデータの説明",
    aboutTitle: "中国観光地マップについて",
    aboutLead: "中国本土の公式 5A 観光地を閲覧し、台湾・香港・マカオの代表的な比較対象スポットも確認できる、オープンで検証しやすいインタラクティブ地図です。",
    aboutDataTitle: "オープンデータ",
    aboutDataBody: "本土 5A 観光地は公開公告とローカル整理データをもとに管理しています。境界は OpenStreetMap を参照し、画像は出典を保持したオープンライセンス素材を使用します。",
    aboutOpenTitle: "オープンソース",
    aboutOpenBody: "静的ページとローカルデータファイルで構成しているため、確認、学習、再利用、拡張、追加がしやすくなっています。",
    aboutDisclaimerTitle: "免責事項",
    aboutDisclaimerBody: "等級、境界、画像、座標は公式公告、オープン地図の編集、画像ライセンスの変更により変わる場合があります。このページは閲覧用の参考であり、公式発表、旅行上の保証、商業的助言ではありません。",
    aboutCredit: "Made by marksui",
    aboutDate: "2026年6月",
  },
  th: {
    aboutMap: "เกี่ยวกับแผนที่นี้",
    aboutAria: "เกี่ยวกับแผนที่สถานที่ท่องเที่ยวจีน",
    aboutClose: "ปิดคำอธิบาย",
    aboutEyebrow: "คำอธิบายข้อมูลเปิด",
    aboutTitle: "เกี่ยวกับแผนที่สถานที่ท่องเที่ยวจีน",
    aboutLead: "แผนที่แบบโต้ตอบที่เปิดเผยและตรวจสอบได้ สำหรับดูแหล่งท่องเที่ยว 5A อย่างเป็นทางการของจีนแผ่นดินใหญ่ พร้อมสถานที่เทียบเคียงจากไต้หวัน ฮ่องกง และมาเก๊า",
    aboutDataTitle: "ข้อมูลเปิด",
    aboutDataBody: "ข้อมูล 5A ของจีนแผ่นดินใหญ่มาจากประกาศสาธารณะและข้อมูลที่จัดทำในเครื่อง ขอบเขตอ้างอิง OpenStreetMap และรูปภาพมาจากแหล่งอนุญาตแบบเปิดพร้อมเก็บเครดิตไว้",
    aboutOpenTitle: "โอเพนซอร์ส",
    aboutOpenBody: "โครงการจัดเป็นหน้าเว็บแบบสแตติกและไฟล์ข้อมูลในเครื่อง เพื่อให้ตรวจสอบ เรียนรู้ นำกลับใช้ พัฒนาต่อ และเติมข้อมูลได้ง่าย",
    aboutDisclaimerTitle: "ข้อจำกัดความรับผิด",
    aboutDisclaimerBody: "ระดับแหล่งท่องเที่ยว ขอบเขต รูปภาพ และพิกัดอาจเปลี่ยนตามประกาศทางการ การแก้ไขแผนที่เปิด และเงื่อนไขอนุญาตรูปภาพ หน้านี้มีไว้เพื่อการอ้างอิงเท่านั้น ไม่ใช่ประกาศทางการ คำรับรองการเดินทาง หรือคำแนะนำทางธุรกิจ",
    aboutCredit: "Made by marksui",
    aboutDate: "มิถุนายน 2026",
  },
  es: {
    aboutMap: "Acerca de este mapa",
    aboutAria: "Acerca del mapa de atracciones de China",
    aboutClose: "Cerrar información",
    aboutEyebrow: "Aviso de datos abiertos",
    aboutTitle: "Acerca del mapa de atracciones de China",
    aboutLead: "Un mapa interactivo abierto y verificable para explorar las zonas escénicas 5A oficiales de China continental, con sitios de referencia de Taiwán, Hong Kong y Macao.",
    aboutDataTitle: "Datos Abiertos",
    aboutDataBody: "Los sitios 5A de China continental se mantienen a partir de anuncios públicos y datos locales curados; los límites usan OpenStreetMap como referencia y las imágenes provienen de fuentes con licencia abierta y atribución.",
    aboutOpenTitle: "Código Abierto",
    aboutOpenBody: "El proyecto se organiza como páginas estáticas y archivos de datos locales para facilitar revisión, aprendizaje, reutilización, extensión y nuevas aportaciones.",
    aboutDisclaimerTitle: "Aviso Legal",
    aboutDisclaimerBody: "Las calificaciones, límites, imágenes y coordenadas pueden cambiar según avisos oficiales, ediciones de mapas abiertos y licencias de imagen. Esta página es solo de referencia y no constituye una publicación oficial, garantía de viaje ni asesoría comercial.",
    aboutCredit: "Made by marksui",
    aboutDate: "junio de 2026",
  },
  ru: {
    aboutMap: "Об этой карте",
    aboutAria: "О карте достопримечательностей Китая",
    aboutClose: "Закрыть описание",
    aboutEyebrow: "Сведения об открытых данных",
    aboutTitle: "О карте достопримечательностей Китая",
    aboutLead: "Открытая и проверяемая интерактивная карта официальных туристических зон 5A материкового Китая с представительными сопоставимыми объектами Тайваня, Гонконга и Макао.",
    aboutDataTitle: "Открытые данные",
    aboutDataBody: "Список 5A материкового Китая ведется по публичным объявлениям и локально подготовленным данным; границы опираются на OpenStreetMap, а изображения берутся из открыто лицензированных источников с сохранением атрибуции.",
    aboutOpenTitle: "Открытый исходный код",
    aboutOpenBody: "Проект организован как статические страницы и локальные файлы данных, чтобы его было удобно проверять, изучать, повторно использовать, развивать и дополнять.",
    aboutDisclaimerTitle: "Отказ от ответственности",
    aboutDisclaimerBody: "Рейтинги, границы, изображения и координаты могут меняться вслед за официальными сообщениями, правками открытых карт и лицензиями изображений. Страница предназначена только для справочного просмотра и не является официальной публикацией, гарантией поездки или коммерческой рекомендацией.",
    aboutCredit: "Made by marksui",
    aboutDate: "июнь 2026",
  },
};

for (const [language, copy] of Object.entries(aboutTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const provinceNames = {
  "zh-CN": {},
  "zh-TW": {
    北京: "北京",
    天津: "天津",
    河北: "河北",
    山西: "山西",
    内蒙古: "內蒙古",
    辽宁: "遼寧",
    吉林: "吉林",
    黑龙江: "黑龍江",
    上海: "上海",
    江苏: "江蘇",
    浙江: "浙江",
    安徽: "安徽",
    福建: "福建",
    江西: "江西",
    山东: "山東",
    河南: "河南",
    湖南: "湖南",
    湖北: "湖北",
    广东: "廣東",
    广西: "廣西",
    海南: "海南",
    重庆: "重慶",
    四川: "四川",
    贵州: "貴州",
    云南: "雲南",
    西藏: "西藏",
    陕西: "陝西",
    甘肃: "甘肅",
    青海: "青海",
    宁夏: "寧夏",
    新疆: "新疆",
    "台湾": "臺灣",
    香港: "香港",
    澳门: "澳門",
  },
  en: {
    北京: "Beijing",
    天津: "Tianjin",
    河北: "Hebei",
    山西: "Shanxi",
    内蒙古: "Inner Mongolia",
    辽宁: "Liaoning",
    吉林: "Jilin",
    黑龙江: "Heilongjiang",
    上海: "Shanghai",
    江苏: "Jiangsu",
    浙江: "Zhejiang",
    安徽: "Anhui",
    福建: "Fujian",
    江西: "Jiangxi",
    山东: "Shandong",
    河南: "Henan",
    湖南: "Hunan",
    湖北: "Hubei",
    广东: "Guangdong",
    广西: "Guangxi",
    海南: "Hainan",
    重庆: "Chongqing",
    四川: "Sichuan",
    贵州: "Guizhou",
    云南: "Yunnan",
    西藏: "Tibet",
    陕西: "Shaanxi",
    甘肃: "Gansu",
    青海: "Qinghai",
    宁夏: "Ningxia",
    新疆: "Xinjiang",
    "台湾": "Taiwan",
    香港: "Hong Kong",
    澳门: "Macao",
  },
  ko: {
    北京: "베이징",
    天津: "톈진",
    河北: "허베이",
    山西: "산시",
    内蒙古: "내몽골",
    辽宁: "랴오닝",
    吉林: "지린",
    黑龙江: "헤이룽장",
    上海: "상하이",
    江苏: "장쑤",
    浙江: "저장",
    安徽: "안후이",
    福建: "푸젠",
    江西: "장시",
    山东: "산둥",
    河南: "허난",
    湖南: "후난",
    湖北: "후베이",
    广东: "광둥",
    广西: "광시",
    海南: "하이난",
    重庆: "충칭",
    四川: "쓰촨",
    贵州: "구이저우",
    云南: "윈난",
    西藏: "티베트",
    陕西: "산시성",
    甘肃: "간쑤",
    青海: "칭하이",
    宁夏: "닝샤",
    新疆: "신장",
    "台湾": "타이완",
    香港: "홍콩",
    澳门: "마카오",
  },
  ja: {
    北京: "北京",
    天津: "天津",
    河北: "河北",
    山西: "山西",
    内蒙古: "内モンゴル",
    辽宁: "遼寧",
    吉林: "吉林",
    黑龙江: "黒竜江",
    上海: "上海",
    江苏: "江蘇",
    浙江: "浙江",
    安徽: "安徽",
    福建: "福建",
    江西: "江西",
    山东: "山東",
    河南: "河南",
    湖南: "湖南",
    湖北: "湖北",
    广东: "広東",
    广西: "広西",
    海南: "海南",
    重庆: "重慶",
    四川: "四川",
    贵州: "貴州",
    云南: "雲南",
    西藏: "チベット",
    陕西: "陝西",
    甘肃: "甘粛",
    青海: "青海",
    宁夏: "寧夏",
    新疆: "新疆",
    "台湾": "台湾",
    香港: "香港",
    澳门: "マカオ",
  },
  th: {
    北京: "ปักกิ่ง",
    天津: "เทียนจิน",
    河北: "เหอเป่ย์",
    山西: "ซานซี",
    内蒙古: "มองโกเลียใน",
    辽宁: "เหลียวหนิง",
    吉林: "จี๋หลิน",
    黑龙江: "เฮย์หลงเจียง",
    上海: "เซี่ยงไฮ้",
    江苏: "เจียงซู",
    浙江: "เจ้อเจียง",
    安徽: "อันฮุย",
    福建: "ฝูเจี้ยน",
    江西: "เจียงซี",
    山东: "ซานตง",
    河南: "เหอหนาน",
    湖南: "หูหนาน",
    湖北: "หูเป่ย์",
    广东: "กวางตุ้ง",
    广西: "กว่างซี",
    海南: "ไห่หนาน",
    重庆: "ฉงชิ่ง",
    四川: "เสฉวน",
    贵州: "กุ้ยโจว",
    云南: "ยูนนาน",
    西藏: "ทิเบต",
    陕西: "ส่านซี",
    甘肃: "กานซู่",
    青海: "ชิงไห่",
    宁夏: "หนิงเซี่ย",
    新疆: "ซินเจียง",
    "台湾": "ไต้หวัน",
    香港: "ฮ่องกง",
    澳门: "มาเก๊า",
  },
  es: {
    北京: "Pekín",
    天津: "Tianjin",
    河北: "Hebei",
    山西: "Shanxi",
    内蒙古: "Mongolia Interior",
    辽宁: "Liaoning",
    吉林: "Jilin",
    黑龙江: "Heilongjiang",
    上海: "Shanghái",
    江苏: "Jiangsu",
    浙江: "Zhejiang",
    安徽: "Anhui",
    福建: "Fujian",
    江西: "Jiangxi",
    山东: "Shandong",
    河南: "Henan",
    湖南: "Hunan",
    湖北: "Hubei",
    广东: "Guangdong",
    广西: "Guangxi",
    海南: "Hainan",
    重庆: "Chongqing",
    四川: "Sichuan",
    贵州: "Guizhou",
    云南: "Yunnan",
    西藏: "Tíbet",
    陕西: "Shaanxi",
    甘肃: "Gansu",
    青海: "Qinghai",
    宁夏: "Ningxia",
    新疆: "Xinjiang",
    "台湾": "Taiwán",
    香港: "Hong Kong",
    澳门: "Macao",
  },
  ru: {
    北京: "Пекин",
    天津: "Тяньцзинь",
    河北: "Хэбэй",
    山西: "Шаньси",
    内蒙古: "Внутренняя Монголия",
    辽宁: "Ляонин",
    吉林: "Цзилинь",
    黑龙江: "Хэйлунцзян",
    上海: "Шанхай",
    江苏: "Цзянсу",
    浙江: "Чжэцзян",
    安徽: "Аньхой",
    福建: "Фуцзянь",
    江西: "Цзянси",
    山东: "Шаньдун",
    河南: "Хэнань",
    湖南: "Хунань",
    湖北: "Хубэй",
    广东: "Гуандун",
    广西: "Гуанси",
    海南: "Хайнань",
    重庆: "Чунцин",
    四川: "Сычуань",
    贵州: "Гуйчжоу",
    云南: "Юньнань",
    西藏: "Тибет",
    陕西: "Шэньси",
    甘肃: "Ганьсу",
    青海: "Цинхай",
    宁夏: "Нинся",
    新疆: "Синьцзян",
    "台湾": "Тайвань",
    香港: "Гонконг",
    澳门: "Макао",
  },
};

const descriptionTemplates = {
  "zh-CN": "{name}位于{region}，{phrase}",
  "zh-TW": "{name}位於{region}，{phrase}",
  en: "{name} is in {region}, {phrase}",
  ko: "{name}은/는 {region}에 있으며, {phrase}",
  ja: "{name}は{region}にあり、{phrase}",
  th: "{name} อยู่ใน{region} {phrase}",
  es: "{name} está en {region}, {phrase}",
  ru: "{name} находится в регионе {region}, {phrase}",
};

const descriptionPhrases = {
  "zh-CN": {
    museum: "以馆藏展陈与历史文化见长。",
    heritage: "以历史遗存、古建格局和人文景观见长。",
    nature: "以山水地貌和自然风光见长。",
    water: "以湖海水景和滨水游览见长。",
    settlement: "以传统聚落、街巷风貌和地方生活气息见长。",
    leisure: "以主题体验和休闲游览见长。",
    default: "是当地代表性景观与文化名片。",
  },
  "zh-TW": {
    museum: "以館藏展陳與歷史文化見長。",
    heritage: "以歷史遺存、古建格局和人文景觀見長。",
    nature: "以山水地貌和自然風光見長。",
    water: "以湖海水景和濱水遊覽見長。",
    settlement: "以傳統聚落、街巷風貌和地方生活氣息見長。",
    leisure: "以主題體驗和休閒遊覽見長。",
    default: "是當地代表性景觀與文化名片。",
  },
  en: {
    museum: "known for collections, exhibitions, and cultural history.",
    heritage: "known for historic remains, traditional architecture, and cultural scenery.",
    nature: "known for landforms, mountains, and natural scenery.",
    water: "known for lakes, coastlines, and waterside views.",
    settlement: "known for traditional settlements, streets, and local life.",
    leisure: "known for themed experiences and leisure travel.",
    default: "a representative landmark for local scenery and culture.",
  },
  ko: {
    museum: "소장품 전시와 역사 문화로 알려져 있습니다.",
    heritage: "역사 유적, 전통 건축, 인문 경관으로 알려져 있습니다.",
    nature: "산수 지형과 자연 풍경으로 알려져 있습니다.",
    water: "호수, 해안, 물가 풍경으로 알려져 있습니다.",
    settlement: "전통 마을, 거리 풍경, 지역 생활감으로 알려져 있습니다.",
    leisure: "테마 체험과 휴식형 여행으로 알려져 있습니다.",
    default: "지역 경관과 문화를 보여 주는 대표 명소입니다.",
  },
  ja: {
    museum: "収蔵展示と歴史文化で知られています。",
    heritage: "歴史遺構、伝統建築、人文景観で知られています。",
    nature: "地形、山水、自然風景で知られています。",
    water: "湖や海岸、水辺の景観で知られています。",
    settlement: "伝統集落、街並み、地域の暮らしで知られています。",
    leisure: "テーマ体験とレジャー観光で知られています。",
    default: "地域の景観と文化を代表する観光地です。",
  },
  th: {
    museum: "โดดเด่นด้านนิทรรศการ ของสะสม และประวัติศาสตร์วัฒนธรรม",
    heritage: "โดดเด่นด้านร่องรอยประวัติศาสตร์ สถาปัตยกรรม และภูมิทัศน์วัฒนธรรม",
    nature: "โดดเด่นด้านภูมิประเทศ ภูเขา และธรรมชาติ",
    water: "โดดเด่นด้านทะเลสาบ ชายฝั่ง และทิวทัศน์ริมน้ำ",
    settlement: "โดดเด่นด้านชุมชนดั้งเดิม ถนนเก่า และวิถีชีวิตท้องถิ่น",
    leisure: "โดดเด่นด้านประสบการณ์ธีมและการพักผ่อน",
    default: "เป็นแลนด์มาร์กที่สะท้อนทิวทัศน์และวัฒนธรรมท้องถิ่น",
  },
  es: {
    museum: "destaca por sus colecciones, exposiciones e historia cultural.",
    heritage: "destaca por sus vestigios históricos, arquitectura tradicional y paisaje cultural.",
    nature: "destaca por sus formas del relieve, montañas y paisajes naturales.",
    water: "destaca por sus lagos, costas y vistas junto al agua.",
    settlement: "destaca por sus asentamientos tradicionales, calles y vida local.",
    leisure: "destaca por sus experiencias temáticas y turismo de ocio.",
    default: "es un punto representativo del paisaje y la cultura local.",
  },
  ru: {
    museum: "известен коллекциями, экспозициями и культурной историей.",
    heritage: "известен историческими памятниками, традиционной архитектурой и культурным ландшафтом.",
    nature: "известен рельефом, горами и природными видами.",
    water: "известен озерами, побережьями и видами у воды.",
    settlement: "известен традиционными поселениями, улицами и местной жизнью.",
    leisure: "известен тематическими впечатлениями и отдыхом.",
    default: "это заметный ориентир местного ландшафта и культуры.",
  },
};

const descriptionRules = [
  { category: "leisure", pattern: /迪士尼|乐园|樂園|海洋公园|海洋公園|欢乐|歡樂|影视|影視|温泉|溫泉|度假|环球|環球|方特/ },
  { category: "museum", pattern: /博物|纪念馆|紀念館|科技馆|科技館|展馆|展館|故宫|故宮/ },
  { category: "settlement", pattern: /古镇|古鎮|古村|老街|街区|街區|民俗|村|寨|土楼|土樓|部落/ },
  { category: "heritage", pattern: /古城|园林|園林|府|宫|宮|城墙|城牆|陵|庙|廟|寺|祠|坛|壇|塔|楼|樓|关|關|窟|石刻|遗址|遺址|古堡|长城|長城|布达拉|布達拉|莫高窟|中正纪念堂|中正紀念堂/ },
  { category: "water", pattern: /湖|潭|海|湾|灣|港|江|河|溪|瀑|泉|湿地|濕地|岛|島|海岸|漂流|水/ },
  { category: "nature", pattern: /山|峰|岭|嶺|峡|峽|谷|岩|石林|地质|地質|丹霞|喀斯特|洞|沟|溝|坡|天池|草原|沙|胡杨|胡楊|森林|林|国家公园|國家公園/ },
];

const chinaBounds = L.latLngBounds([18, 73], [54, 135]);
const state = {
  search: "",
  province: allRegionsValue,
  language: resolveInitialLanguage(),
  selectedId: null,
  distributionOpen: false,
  controlOpen: false,
  aboutOpen: false,
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  clearSearch: document.querySelector("#clearSearch"),
  provinceSelect: document.querySelector("#provinceSelect"),
  attractionList: document.querySelector("#attractionList"),
  resultCount: document.querySelector("#resultCount"),
  filterSubtitle: document.querySelector("#filterSubtitle"),
  totalStat: document.querySelector("#totalStat"),
  provinceStat: document.querySelector("#provinceStat"),
  visibleStat: document.querySelector("#visibleStat"),
  dataCountPill: document.querySelector("#dataCountPill"),
  languageSelect: document.querySelector("#languageSelect"),
  openAbout: document.querySelector("#openAbout"),
  aboutDialog: document.querySelector("#aboutDialog"),
  closeAbout: document.querySelector("#closeAbout"),
  resetFilters: document.querySelector("#resetFilters"),
  toggleControlPanel: document.querySelector("#toggleControlPanel"),
  closeControlPanel: document.querySelector("#closeControlPanel"),
  fitFiltered: document.querySelector("#fitFiltered"),
  toggleDistribution: document.querySelector("#toggleDistribution"),
  closeLegend: document.querySelector("#closeLegend"),
  distributionPanel: document.querySelector("#distributionPanel"),
  provinceBars: document.querySelector("#provinceBars"),
  distributionCaption: document.querySelector("#distributionCaption"),
  legendOfficialStat: document.querySelector("#legendOfficialStat"),
  legendPeerStat: document.querySelector("#legendPeerStat"),
  legendRegionStat: document.querySelector("#legendRegionStat"),
  detailPanel: document.querySelector("#detailPanel"),
  closeDetail: document.querySelector("#closeDetail"),
  detailProvince: document.querySelector("#detailProvince"),
  detailName: document.querySelector("#detailName"),
  detailDescription: document.querySelector("#detailDescription"),
  detailImage: document.querySelector("#detailImage"),
  detailVisual: document.querySelector(".detail-visual"),
  detailImageLink: document.querySelector("#detailImageLink"),
  detailYear: document.querySelector("#detailYear"),
  detailPrecision: document.querySelector("#detailPrecision"),
  detailPrecisionRow: document.querySelector("#detailPrecision")?.closest("div"),
  focusSelected: document.querySelector("#focusSelected"),
  filterProvince: document.querySelector("#filterProvince"),
  relatedList: document.querySelector("#relatedList"),
  relatedCaption: document.querySelector("#relatedCaption"),
};

const map = L.map("map", {
  center: [35.8, 103.8],
  zoom: 4,
  minZoom: 3,
  maxBounds: chinaBounds.pad(0.22),
  zoomControl: false,
  preferCanvas: true,
});

map.createPane("footprintPane");
map.getPane("footprintPane").style.zIndex = 420;
map.getPane("footprintPane").style.pointerEvents = "none";

L.control.zoom({ position: "topright" }).addTo(map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: "abc",
  updateWhenIdle: true,
  updateWhenZooming: false,
  keepBuffer: 1,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const markerLayer =
  typeof L.markerClusterGroup === "function"
    ? L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 46,
        spiderfyDistanceMultiplier: 1.5,
      })
    : L.layerGroup();

markerLayer.addTo(map);

const markersById = new Map();
const attractionsById = new Map(attractions.map((item) => [item.id, item]));
const footprintCache = new Map();
const correctedCentersById = new Map();
const selectionLayer = L.layerGroup().addTo(map);
let activeFootprintRequest = 0;

function init() {
  applyLanguage();
  renderBaseStats();
  populateProvinceSelect();
  bindEvents();
  syncControlPanel();
  syncDistributionPanel();
  render();
  fitTo(attractions);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderBaseStats() {
  const provinces = unique(attractions.map((item) => item.province));
  els.totalStat.textContent = String(meta.count || attractions.length);
  els.provinceStat.textContent = String(meta.provinces || provinces.length);
  els.dataCountPill.textContent = String(meta.count || attractions.length);
}

function populateProvinceSelect() {
  const provinces = unique(attractions.map((item) => item.province));
  els.provinceSelect.innerHTML = [
    `<option value="${allRegionsValue}">${escapeHtml(t("allRegions"))}</option>`,
    ...provinces.map(
      (province) => `<option value="${escapeHtml(province)}">${escapeHtml(regionName(province))}</option>`,
    ),
  ].join("");
  els.provinceSelect.value = state.province;
}

function bindEvents() {
  els.languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  els.openAbout.addEventListener("click", () => {
    setAboutOpen(true);
  });

  els.closeAbout.addEventListener("click", () => {
    setAboutOpen(false);
  });

  els.aboutDialog.addEventListener("click", (event) => {
    if (event.target === els.aboutDialog) {
      setAboutOpen(false);
    }
  });

  els.detailImage.addEventListener("error", () => {
    if (els.detailImage.dataset.fallback !== "true") {
      setDetailImage(null, t("scenicImageAlt"));
    }
  });

  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    render();
  });

  els.clearSearch.addEventListener("click", () => {
    state.search = "";
    els.searchInput.value = "";
    render();
    els.searchInput.focus();
  });

  els.provinceSelect.addEventListener("change", (event) => {
    state.province = event.target.value;
    render();
    fitTo(getFilteredAttractions());
  });

  els.resetFilters.addEventListener("click", () => {
    state.search = "";
    state.province = allRegionsValue;
    els.searchInput.value = "";
    els.provinceSelect.value = allRegionsValue;
    render();
    fitTo(attractions);
  });

  els.toggleControlPanel.addEventListener("click", () => {
    setControlPanelOpen(!state.controlOpen);
  });

  els.closeControlPanel.addEventListener("click", () => {
    setControlPanelOpen(false);
  });

  els.fitFiltered.addEventListener("click", () => fitTo(getFilteredAttractions()));

  els.toggleDistribution.addEventListener("click", () => {
    setDistributionOpen(!state.distributionOpen);
  });

  els.closeLegend.addEventListener("click", () => {
    setDistributionOpen(false);
  });

  els.closeDetail.addEventListener("click", () => selectAttraction(null));

  els.focusSelected.addEventListener("click", () => {
    const selected = getSelected();
    if (selected) {
      focusAttraction(selected, true);
    }
  });

  els.filterProvince.addEventListener("click", () => {
    const selected = getSelected();
    if (!selected) return;
    state.province = selected.province;
    els.provinceSelect.value = selected.province;
    render();
    fitTo(getFilteredAttractions());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.aboutOpen) {
        setAboutOpen(false);
      } else if (getSelected()) {
        selectAttraction(null);
      } else if (state.distributionOpen) {
        setDistributionOpen(false);
      }
    }
  });
}

function setLanguage(language) {
  if (!languages[language] || language === state.language) return;
  state.language = language;

  applyLanguage();
  populateProvinceSelect();
  render();
}

function applyLanguage() {
  document.documentElement.lang = languages[state.language]?.htmlLang || languages["zh-CN"].htmlLang;
  document.title = t("documentTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.setAttribute("alt", t(element.dataset.i18nAlt));
  });

  if (els.languageSelect) {
    els.languageSelect.value = state.language;
  }
  syncControlPanel();
}

function setAboutOpen(open) {
  state.aboutOpen = open;
  els.aboutDialog.classList.toggle("hidden", !open);
  els.aboutDialog.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("about-open", open);
  if (open) {
    window.setTimeout(() => els.closeAbout.focus(), 0);
  } else {
    els.openAbout.focus();
  }
}

function setControlPanelOpen(open) {
  state.controlOpen = open;
  syncControlPanel();
  window.requestAnimationFrame(() => {
    map.invalidateSize();
  });
}

function syncControlPanel() {
  document.body.classList.toggle("control-panel-closed", !state.controlOpen);
  els.toggleControlPanel.setAttribute("aria-expanded", String(state.controlOpen));
  const label = els.toggleControlPanel.querySelector(".nav-label");
  if (label) {
    label.textContent = state.controlOpen ? t("collapseFilters") : t("openFilters");
  }
}

function setDistributionOpen(open) {
  state.distributionOpen = open;
  syncDistributionPanel();
}

function syncDistributionPanel() {
  els.distributionPanel.classList.toggle("collapsed", !state.distributionOpen);
  els.toggleDistribution.setAttribute("aria-expanded", String(state.distributionOpen));
  els.toggleDistribution.classList.toggle("active", state.distributionOpen);
}

function render() {
  const filtered = getFilteredAttractions();
  updateSummary(filtered);
  renderList(filtered);
  renderMarkers(filtered);
  renderDistribution(filtered);
  syncActiveMapMarker(getSelected());

  if (state.selectedId && !filtered.some((item) => item.id === state.selectedId)) {
    selectAttraction(null, { skipRender: true });
  } else {
    renderDetail(getSelected());
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function getFilteredAttractions() {
  const query = normalize(state.search);
  return attractions.filter((item) => {
    const matchesProvince = state.province === allRegionsValue || item.province === state.province;
    const searchable = normalize(
      [
        item.name,
        item.displayName,
        item.city,
        displayAttractionName(item),
        attractionLocationLabel(item),
        ...Object.values(localizedAttractionNames[item.id] || {}),
        item.province,
        ...regionSearchNames(item.province),
        item.coordinateLabel,
        item.coordinateLevel,
        item.ratingLabel || "",
        ratingMeta(item),
        ratingDetail(item),
      ].join(" "),
    );
    const matchesSearch = !query || searchable.includes(query);
    return matchesProvince && matchesSearch;
  });
}

function updateSummary(filtered) {
  els.visibleStat.textContent = String(filtered.length);
  els.resultCount.textContent = t("resultCount", { count: filtered.length });
  const provinceText = state.province === allRegionsValue ? t("nationwide") : regionName(state.province);
  els.filterSubtitle.textContent = t("filterSubtitle", { region: provinceText });
}

function renderList(items) {
  if (!items.length) {
    els.attractionList.innerHTML = `<li class="empty-state">${escapeHtml(t("noMatches"))}</li>`;
    return;
  }

  els.attractionList.innerHTML = items
    .map((item) => {
      const active = item.id === state.selectedId ? " active" : "";
      return `
        <li>
          <button class="attraction-card${active}" type="button" data-id="${item.id}">
            <span class="card-main">
              <span>
                <span class="card-name">${escapeHtml(displayAttractionName(item))}</span>
                <span class="card-meta">${escapeHtml(attractionLocationLabel(item))} · ${escapeHtml(ratingMeta(item))}</span>
              </span>
              <span class="year-badge">${escapeHtml(ratingBadge(item))}</span>
            </span>
          </button>
        </li>
      `;
    })
    .join("");

  els.attractionList.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = attractions.find((attraction) => attraction.id === button.dataset.id);
      selectAttraction(item);
    });
  });
}

function renderMarkers(items) {
  markerLayer.clearLayers();
  markersById.clear();

  items.forEach((item) => {
    const marker = L.marker(getAttractionLatLng(item), {
      icon: markerIcon(item),
      title: displayAttractionName(item),
    });

    marker.bindPopup(
      `<strong>${escapeHtml(displayAttractionName(item))}</strong><br>${escapeHtml(attractionLocationLabel(item))} · ${escapeHtml(
        ratingMeta(item),
      )}`,
    );

    marker.on("click", () => selectAttraction(item));
    markersById.set(item.id, marker);
    markerLayer.addLayer(marker);
  });
}

function renderDistribution(items) {
  const counts = countBy(items, (item) => item.province).sort((a, b) => b.count - a.count);
  const max = Math.max(1, ...counts.map((item) => item.count));
  const regionText = state.province === allRegionsValue ? t("nationwide") : regionName(state.province);
  const officialCount = items.filter((item) => !isPeerAttraction(item)).length;
  const peerCount = items.length - officialCount;
  els.distributionCaption.textContent = t("distributionCaption", { region: regionText, count: items.length });
  els.legendOfficialStat.textContent = String(officialCount);
  els.legendPeerStat.textContent = String(peerCount);
  els.legendRegionStat.textContent = String(counts.length);

  if (!counts.length) {
    els.provinceBars.innerHTML = `<div class="empty-state">${escapeHtml(t("noMatches"))}</div>`;
    return;
  }

  els.provinceBars.innerHTML = counts
    .slice(0, 8)
    .map(
      (item) => `
        <button class="province-bar related-item" type="button" data-province="${escapeHtml(
          item.key,
        )}">
          <span>${escapeHtml(regionName(item.key))}</span>
          <span class="province-bar-track" aria-hidden="true">
            <span class="province-bar-fill" style="width: ${(item.count / max) * 100}%"></span>
          </span>
          <strong>${item.count}</strong>
        </button>
      `,
    )
    .join("");

  els.provinceBars.querySelectorAll("[data-province]").forEach((button) => {
    button.addEventListener("click", () => {
      state.province = button.dataset.province;
      els.provinceSelect.value = state.province;
      render();
      fitTo(getFilteredAttractions());
    });
  });
}

function selectAttraction(item, options = {}) {
  state.selectedId = item?.id || null;
  renderDetail(item || null);
  syncActiveListItem();
  syncActiveMapMarker(item || null);

  if (!options.skipRender) {
    renderList(getFilteredAttractions());
  }
}

function renderDetail(item) {
  const hasItem = Boolean(item);
  document.body.classList.toggle("has-selection", hasItem);
  els.detailProvince.textContent = hasItem ? attractionLocationLabel(item) : t("chooseAttraction");
  els.detailName.textContent = hasItem ? displayAttractionName(item) : t("noSelectionTitle");
  els.detailDescription.textContent = hasItem ? attractionDescription(item) : "";
  els.detailYear.textContent = hasItem ? ratingDetail(item) : "-";
  setFootprintDetail(null);
  els.focusSelected.disabled = !hasItem;
  els.filterProvince.disabled = !hasItem;

  if (!hasItem) {
    setDetailImage(fallbackImage, t("scenicImageAlt"));
    clearFootprint();
    els.relatedCaption.textContent = "-";
    els.relatedList.innerHTML = `<div class="empty-state">${escapeHtml(t("noSelection"))}</div>`;
    return;
  }

  loadDetailImage(item);
  loadAttractionFootprint(item);

  const related = attractions
    .filter((candidate) => candidate.province === item.province && candidate.id !== item.id)
    .slice(0, 8);

  els.relatedCaption.textContent = t("relatedCaption", {
    region: regionName(item.province),
    count: related.length,
  });
  els.relatedList.innerHTML = related.length
    ? related
        .map(
          (candidate) => `
            <button class="related-item" type="button" data-id="${candidate.id}">
              <strong>${escapeHtml(displayAttractionName(candidate))}</strong>
              <span>${escapeHtml(attractionLocationLabel(candidate))} · ${escapeHtml(ratingMeta(candidate))}</span>
            </button>
          `,
        )
        .join("")
    : `<div class="empty-state">${escapeHtml(t("noSameRegion"))}</div>`;

  els.relatedList.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const relatedItem = attractions.find((candidate) => candidate.id === button.dataset.id);
      selectAttraction(relatedItem);
    });
  });
}

function attractionDescription(item) {
  const language = descriptionTemplates[state.language] ? state.language : "zh-CN";
  const category = attractionDescriptionCategory(item);
  const phrase = descriptionPhrases[language]?.[category] || descriptionPhrases[language]?.default;
  const template = descriptionTemplates[language] || descriptionTemplates["zh-CN"];
  return template
    .replace("{name}", displayAttractionName(item))
    .replace("{region}", attractionLocationLabel(item))
    .replace("{phrase}", phrase);
}

function attractionDescriptionCategory(item) {
  const text = [item.name, item.coordinateLabel].filter(Boolean).join(" ");
  return descriptionRules.find((rule) => rule.pattern.test(text))?.category || "default";
}

function syncActiveListItem() {
  els.attractionList.querySelectorAll(".attraction-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.id === state.selectedId);
  });
}

function syncActiveMapMarker(item) {
  markersById.forEach((marker, id) => {
    const active = id === state.selectedId;
    const attraction = attractionsById.get(id);
    if (attraction) {
      marker.setIcon(markerIcon(attraction, active));
    }
    marker.setZIndexOffset(active ? 1000 : 0);
    marker.getElement()?.classList.toggle("selected", active);
  });
}

async function loadAttractionFootprint(item) {
  const requestId = ++activeFootprintRequest;
  renderApproximateFootprint(item);

  const cached = footprintCache.get(item.id);
  if (cached) {
    renderFootprint(cached, item, { fit: false });
    return;
  }

  const footprint = await findAttractionFootprint(item);
  if (requestId !== activeFootprintRequest || state.selectedId !== item.id) return;

  footprintCache.set(item.id, footprint);
  renderFootprint(footprint, item, { fit: false });
}

async function findAttractionFootprint(item) {
  for (const query of footprintQueries(item)) {
    const footprint = await searchNominatimFootprint(query, item);
    if (footprint) return footprint;
  }

  return {
    kind: "approximate",
    radius: estimateFootprintRadius(item),
  };
}

function footprintQueries(item) {
  const compactName = item.name
    .replace(/[（(].*?[）)]/g, "")
    .replace(/—|·|-/g, " ")
    .replace(/旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院|文化园区/g, "")
    .trim();
  const withoutProvince = compactName.replace(new RegExp(`^${item.province}`), "").trim();

  return unique([
    `${item.province} ${item.coordinateLabel}`,
    `${item.province} ${item.name}`,
    item.name,
    compactName,
    withoutProvince,
    item.coordinateLabel,
  ].filter(Boolean));
}

async function searchNominatimFootprint(query, item) {
  const params = new URLSearchParams({
    format: "geojson",
    polygon_geojson: "1",
    addressdetails: "0",
    extratags: "1",
    limit: "6",
    countrycodes: "cn,tw,hk,mo",
    q: query,
  });

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { "Accept-Language": osmLanguageHeader() },
    });
    const data = await response.json();
    const candidates = (data.features || [])
      .filter((feature) => isFootprintCandidate(feature, item))
      .map((feature) => ({
        feature,
        score: scoreFootprintCandidate(feature, item),
      }))
      .filter((candidate) => candidate.score >= 2)
      .sort((a, b) => b.score - a.score);

    const best = candidates[0]?.feature;
    if (!best) return null;

    return {
      kind: "osm",
      feature: best,
      center: featureDisplayCenter(best),
      name: best.properties?.name || item.coordinateLabel,
    };
  } catch {
    return null;
  }
}

function isFootprintCandidate(feature, item) {
  const type = feature.geometry?.type;
  if (type !== "Polygon" && type !== "MultiPolygon") return false;

  const bbox = feature.bbox;
  if (bbox?.length === 4) {
    const lngSpan = Math.abs(bbox[2] - bbox[0]);
    const latSpan = Math.abs(bbox[3] - bbox[1]);
    if (lngSpan > 4 || latSpan > 4) return false;
  }

  const text = footprintCandidateText(feature);
  const category = feature.properties?.category;
  const typeName = feature.properties?.type;
  if (category === "boundary" && typeName === "administrative") return false;

  return true;
}

function scoreFootprintCandidate(feature, item) {
  const text = footprintCandidateText(feature);
  const category = feature.properties?.category || "";
  const center = featureCenter(feature);
  let score = 0;

  for (const token of footprintTokens(item)) {
    if (token && text.includes(token.toLocaleLowerCase("zh-CN"))) score += token.length >= 3 ? 3 : 1;
  }

  if (category === "tourism" || category === "leisure" || category === "historic") score += 4;
  if (category === "natural" || category === "boundary") score += 2;

  if (center) {
    const distance = haversineKm(getAttractionLatLng(item), center);
    if (distance < 2) score += 3;
    else if (distance < 12) score += 2;
    else if (distance < 40) score += 1;
    else score -= 3;
  }

  return score;
}

function footprintTokens(item) {
  return unique([
    item.name,
    item.coordinateLabel,
    item.name.replace(/旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院/g, ""),
  ].filter(Boolean));
}

function footprintCandidateText(feature) {
  return [
    feature.properties?.name,
    feature.properties?.display_name,
    feature.properties?.category,
    feature.properties?.type,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("zh-CN");
}

function featureCenter(feature) {
  const bbox = feature.bbox;
  if (!bbox?.length) return null;
  return [(bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2];
}

function featureDisplayCenter(feature) {
  const ring = largestOuterRing(feature.geometry);
  if (!ring) return featureCenter(feature);
  return ringCentroid(ring) || featureCenter(feature);
}

function largestOuterRing(geometry) {
  if (!geometry) return null;
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates || [];
  let bestRing = null;
  let bestArea = 0;

  polygons.forEach((polygon) => {
    const ring = polygon?.[0];
    if (!ring?.length) return;
    const area = Math.abs(ringArea(ring));
    if (area > bestArea) {
      bestArea = area;
      bestRing = ring;
    }
  });

  return bestRing;
}

function ringArea(ring) {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    area += x1 * y2 - x2 * y1;
  }
  return area / 2;
}

function ringCentroid(ring) {
  let twiceArea = 0;
  let lngSum = 0;
  let latSum = 0;

  for (let index = 0; index < ring.length - 1; index += 1) {
    const [lng1, lat1] = ring[index];
    const [lng2, lat2] = ring[index + 1];
    const cross = lng1 * lat2 - lng2 * lat1;
    twiceArea += cross;
    lngSum += (lng1 + lng2) * cross;
    latSum += (lat1 + lat2) * cross;
  }

  if (Math.abs(twiceArea) < 1e-12) return averageRingPoint(ring);

  const lng = lngSum / (3 * twiceArea);
  const lat = latSum / (3 * twiceArea);
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : averageRingPoint(ring);
}

function averageRingPoint(ring) {
  const points = ring.filter(([lng, lat]) => Number.isFinite(lat) && Number.isFinite(lng));
  if (!points.length) return null;
  const total = points.reduce(
    (sum, [lng, lat]) => ({
      lat: sum.lat + lat,
      lng: sum.lng + lng,
    }),
    { lat: 0, lng: 0 },
  );
  return [total.lat / points.length, total.lng / points.length];
}

function haversineKm([lat1, lng1], [lat2, lng2]) {
  const radius = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(a));
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function renderApproximateFootprint(item) {
  renderFootprint(
    {
      kind: "approximate",
      radius: estimateFootprintRadius(item),
    },
    item,
    { fit: false },
  );
}

function renderFootprint(footprint, item, options = {}) {
  const fit = options.fit !== false;
  selectionLayer.clearLayers();

  if (footprint.kind === "osm" && footprint.feature) {
    const layer = L.geoJSON(footprint.feature, {
      pane: "footprintPane",
      interactive: false,
      style: {
        color: highlightColor,
        weight: 2.5,
        opacity: 0.9,
        fillColor: highlightColor,
        fillOpacity: 0.12,
      },
    }).addTo(selectionLayer);
    alignAttractionToFootprint(item, footprint.center || featureDisplayCenter(footprint.feature));
    setFootprintDetail(`${t("osmBoundary")} · ${footprint.name || item.coordinateLabel}`);
    fitFootprintBounds(layer, fit);
    return;
  }

  L.circleMarker(getAttractionLatLng(item), {
    pane: "footprintPane",
    radius: footprint.radius || estimateFootprintRadius(item),
    color: highlightColor,
    weight: 2,
    opacity: 0.86,
    fillColor: highlightColor,
    fillOpacity: 0.12,
    interactive: false,
  }).addTo(selectionLayer);
  setFootprintDetail(null);
}

function alignAttractionToFootprint(item, center) {
  const normalizedCenter = normalizeLatLngPair(center);
  if (!normalizedCenter) return;

  const previousCenter = getAttractionLatLng(item);
  correctedCentersById.set(item.id, normalizedCenter);

  const marker = markersById.get(item.id);
  if (marker) {
    marker.setLatLng(normalizedCenter);
    marker.setIcon(markerIcon(item, item.id === state.selectedId));
    marker.setZIndexOffset(item.id === state.selectedId ? 1000 : 0);
    marker.getElement()?.classList.toggle("selected", item.id === state.selectedId);
  }

  if (state.selectedId === item.id && haversineKm(previousCenter, normalizedCenter) > 0.08) {
    map.panTo(normalizedCenter, {
      animate: true,
      duration: 0.45,
    });
  }
}

function normalizeLatLngPair(center) {
  if (!Array.isArray(center) || center.length < 2) return null;
  const lat = Number(center[0]);
  const lng = Number(center[1]);
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
}

function setFootprintDetail(label) {
  const hasLabel = Boolean(label);
  els.detailPrecision.textContent = hasLabel ? label : "";
  if (els.detailPrecisionRow) {
    els.detailPrecisionRow.hidden = !hasLabel;
  }
}

function fitFootprintBounds(layer, fit) {
  if (!fit) return;
  const bounds = layer.getBounds?.();
  if (bounds?.isValid()) {
    map.fitBounds(bounds.pad(0.22), {
      paddingTopLeft: mapPaddingTopLeft(),
      paddingBottomRight: mapPaddingBottomRight(true),
      maxZoom: 8,
    });
  }
}

function clearFootprint() {
  activeFootprintRequest += 1;
  selectionLayer.clearLayers();
}

function estimateFootprintRadius(item) {
  if (item.coordinateLevel === "景区") return 10;
  if (item.coordinateLevel === "城市") return 12;
  return 14;
}

function focusAttraction(item, openPopup = false) {
  const targetZoom = Math.min(Math.max(map.getZoom(), 5.6), 7);
  map.flyTo(getAttractionLatLng(item), targetZoom, {
    animate: true,
    duration: 0.65,
  });

  const marker = markersById.get(item.id);
  if (marker && openPopup) {
    window.setTimeout(() => {
      if (marker.getElement()) {
        syncActiveMapMarker(item);
        marker.openPopup();
      }
    }, 680);
  }
}

function fitTo(items) {
  if (!items.length) {
    map.fitBounds(chinaBounds, { padding: [24, 24] });
    return;
  }

  const bounds = L.latLngBounds(items.map((item) => getAttractionLatLng(item)));
  if (bounds.isValid()) {
    map.fitBounds(bounds.pad(0.08), {
      paddingTopLeft: mapPaddingTopLeft(),
      paddingBottomRight: mapPaddingBottomRight(false),
      maxZoom: 7,
    });
  }
}

function mapPaddingTopLeft() {
  if (!isDesktopLayout()) return [24, 24];
  return state.controlOpen ? [390, 70] : [44, 70];
}

function mapPaddingBottomRight(hasDetail) {
  if (!isDesktopLayout()) return [24, 24];
  return hasDetail ? [370, 40] : [44, 40];
}

function isDesktopLayout() {
  return window.matchMedia("(min-width: 981px)").matches;
}

function markerIcon(item, active = item.id === state.selectedId) {
  return L.divIcon({
    className: `map-marker-shell${active ? " selected" : ""}`,
    html: `<div class="map-marker"><span>${escapeHtml(ratingBadge(item))}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 33],
    popupAnchor: [0, -28],
  });
}

function getSelected() {
  return attractions.find((item) => item.id === state.selectedId) || null;
}

function getAttractionLatLng(item) {
  return correctedCentersById.get(item.id) || [item.lat, item.lng];
}

function unique(items) {
  return [...new Set(items)];
}

function isPeerAttraction(item) {
  return item.rating === "peer5A";
}

function ratingBadge(item) {
  return isPeerAttraction(item) ? t("peerBadgeShort") : "5A";
}

function ratingMeta(item) {
  return isPeerAttraction(item) ? t("peerMeta") : t("officialMeta", { year: item.year });
}

function ratingDetail(item) {
  return isPeerAttraction(item)
    ? t("peerDetail", { label: t("peer5ATitle") })
    : t("officialDetail", { year: item.year });
}

function displayAttractionName(item) {
  const name = attractionDisplayParts(item).name;
  if (state.language === "zh-TW") return toTraditionalName(name);
  if (state.language !== "zh-CN") return localizedAttractionNames[item.id]?.[state.language] || localizedAttractionNames[item.id]?.en || name;
  return name;
}

function attractionLocationLabel(item) {
  const { city } = attractionDisplayParts(item);
  const province = provinceDisplayName(item.province);
  const cityName = cityDisplayName(city, item.province);
  if (state.language === "zh-TW") {
    return cityName && !isSameAdministrativeName(province, cityName) ? `${province} ${cityName}` : province;
  }
  if (state.language !== "zh-CN") return province;
  return cityName && !isSameAdministrativeName(province, cityName) ? `${province} ${cityName}` : province;
}

function attractionDisplayParts(item) {
  if (item.displayName || item.city) {
    const fallbackName = String(item.name || "").trim();
    return {
      city: item.city || provinceCityName(item.province),
      name: cleanDisplayName(item.displayName || fallbackName) || fallbackName,
    };
  }

  const rawName = String(item.name || "").trim();
  const withoutProvince = removeLeadingProvince(rawName, item.province);
  const leadingCity = inferLeadingCity(withoutProvince, item.province);

  if (leadingCity) {
    return {
      city: leadingCity.city,
      name: cleanDisplayName(leadingCity.name) || rawName,
    };
  }

  const cityMatch = splitLeadingAdministrativeCity(withoutProvince);

  if (cityMatch) {
    return {
      city: cityMatch.city,
      name: cleanDisplayName(cityMatch.name) || rawName,
    };
  }

  const name = isPeerAttraction(item) ? rawName : cleanDisplayName(withoutProvince);
  return {
    city: provinceCityName(item.province),
    name: name || rawName,
  };
}

function removeLeadingProvince(name, province) {
  const prefixes = provincePrefixes(province).sort((a, b) => b.length - a.length);
  const prefix = prefixes.find((candidate) => name.startsWith(candidate));
  return prefix ? name.slice(prefix.length).trim() : name;
}

function provincePrefixes(province) {
  return unique([
    province,
    fullProvinceName(province),
    `${province}省`,
    `${province}市`,
    `${province}自治区`,
    `${province}壮族自治区`,
    `${province}回族自治区`,
    `${province}维吾尔自治区`,
    `${province}特别行政区`,
  ]);
}

function provinceCityName(province) {
  return ["北京", "天津", "上海", "重庆"].includes(province) ? province : "";
}

function splitLeadingAdministrativeCity(name) {
  const cityMatch = name.match(/^(.+?市)(.+)$/);
  if (cityMatch && cityMatch[2].trim().length >= 2) {
    return {
      city: cityMatch[1].trim(),
      name: cityMatch[2],
    };
  }

  const regionalMatch = name.match(/^(.+?(?:自治州|地区|盟|州))(.+)$/);
  if (regionalMatch && regionalMatch[2].trim().length >= 2) {
    return {
      city: regionalMatch[1].trim(),
      name: regionalMatch[2],
    };
  }

  return null;
}

function provinceDisplayName(province) {
  const name = state.language === "zh-CN" || state.language === "zh-TW" ? fullProvinceName(province) : regionName(province);
  return state.language === "zh-TW" ? toTraditionalName(name) : name;
}

function fullProvinceName(province) {
  const names = {
    北京: "北京市",
    天津: "天津市",
    河北: "河北省",
    山西: "山西省",
    内蒙古: "内蒙古自治区",
    辽宁: "辽宁省",
    吉林: "吉林省",
    黑龙江: "黑龙江省",
    上海: "上海市",
    江苏: "江苏省",
    浙江: "浙江省",
    安徽: "安徽省",
    福建: "福建省",
    江西: "江西省",
    山东: "山东省",
    河南: "河南省",
    湖南: "湖南省",
    湖北: "湖北省",
    广东: "广东省",
    广西: "广西壮族自治区",
    海南: "海南省",
    重庆: "重庆市",
    四川: "四川省",
    贵州: "贵州省",
    云南: "云南省",
    西藏: "西藏自治区",
    陕西: "陕西省",
    甘肃: "甘肃省",
    青海: "青海省",
    宁夏: "宁夏回族自治区",
    新疆: "新疆维吾尔自治区",
    新疆生产建设兵团: "新疆生产建设兵团",
    台湾: "台湾地区",
    香港: "香港特别行政区",
    澳门: "澳门特别行政区",
  };
  return names[province] || province;
}

function cityDisplayName(city, province) {
  const name = cleanDisplayName(city);
  if (!name) return "";
  const normalized = name.match(/(市|州|地区|盟|县|区|自治州|特别行政区)$/) ? name : `${name}市`;
  return state.language === "zh-TW" ? toTraditionalName(normalized) : normalized;
}

function isSameAdministrativeName(province, city) {
  const simplify = (value) =>
    String(value || "")
      .replace(/(省|市|地区|特别行政区|维吾尔自治区|壮族自治区|回族自治区|自治区)$/g, "")
      .replace(/(臺|台)灣/g, "台湾")
      .trim();
  return simplify(province) === simplify(city);
}

function inferLeadingCity(name, province) {
  const aliases = {
    吉林: [{ prefix: "长春", city: "长春市" }],
    山东: [{ prefix: "烟台", city: "烟台市" }],
    河南: [{ prefix: "开封", city: "开封市" }],
    陕西: [{ prefix: "渭南", city: "渭南市" }],
    甘肃: [{ prefix: "天水", city: "天水市" }],
    宁夏: [{ prefix: "银川", city: "银川市" }],
    新疆: [
      { prefix: "乌鲁木齐", city: "乌鲁木齐市" },
      { prefix: "伊犁", city: "伊犁哈萨克自治州" },
    ],
    台湾: [{ prefix: "台北", city: "台北市" }],
  };
  const match = (aliases[province] || [])
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find((candidate) => name.startsWith(candidate.prefix));
  if (!match) return null;
  return {
    city: match.city,
    name: name.slice(match.prefix.length),
  };
}

function cleanDisplayName(name) {
  return String(name || "")
    .replace(/^[\s·—-]+/, "")
    .trim();
}

function toTraditionalName(value) {
  const replacements = {
    台: "臺",
    湾: "灣",
    门: "門",
    龙: "龍",
    马: "馬",
    鸟: "鳥",
    鸡: "雞",
    鱼: "魚",
    岛: "島",
    关: "關",
    广: "廣",
    东: "東",
    庆: "慶",
    宁: "寧",
    苏: "蘇",
    浙: "浙",
    皖: "皖",
    闽: "閩",
    赣: "贛",
    鲁: "魯",
    豫: "豫",
    湘: "湘",
    鄂: "鄂",
    桂: "桂",
    琼: "瓊",
    川: "川",
    贵: "貴",
    云: "雲",
    陕: "陝",
    甘: "甘",
    青: "青",
    疆: "疆",
    厦: "廈",
    阳: "陽",
    阴: "陰",
    园: "園",
    场: "場",
    馆: "館",
    纪: "紀",
    念: "念",
    乡: "鄉",
    镇: "鎮",
    县: "縣",
    区: "區",
    级: "級",
    观: "觀",
    华: "華",
    历: "歷",
    史: "史",
    城: "城",
    们: "們",
    风: "風",
    景: "景",
    名: "名",
    胜: "勝",
    旅: "旅",
    游: "遊",
    线: "線",
    联: "聯",
    合: "合",
    国: "國",
    教: "教",
    科: "科",
    文: "文",
    组: "組",
    织: "織",
    世: "世",
    界: "界",
    质: "質",
    乐: "樂",
    义: "義",
    议: "議",
    归: "歸",
    体: "體",
    宝: "寶",
    佛: "佛",
    陕: "陝",
    头: "頭",
    滩: "灘",
    湿: "濕",
    术: "術",
    业: "業",
    万: "萬",
    壮: "壯",
    藏: "藏",
    维: "維",
    吾: "吾",
    尔: "爾",
    黄: "黃",
    鹤: "鶴",
    楼: "樓",
    庙: "廟",
    坛: "壇",
    祠: "祠",
    宫: "宮",
    厅: "廳",
    洞: "洞",
    峡: "峽",
    沟: "溝",
    岭: "嶺",
    邓: "鄧",
    鲜: "鮮",
    旧: "舊",
    车: "車",
    叶: "葉",
    单: "單",
    双: "雙",
    开: "開",
    发: "發",
    经: "經",
    济: "濟",
    视: "視",
    线: "線",
    画: "畫",
    牆: "牆",
  };
  return String(value || "").replace(/[^\x00-\x7F]/g, (char) => replacements[char] || char);
}

function loadDetailImage(item) {
  const image = localImages[item.id];
  setDetailImage(isReliableImage(image) ? image : null, displayAttractionName(item));
}

function setDetailImage(image, alt) {
  const hasImage = isReliableImage(image);
  const safeImage = hasImage ? image : null;
  els.detailVisual.classList.toggle("image-missing", !hasImage);
  els.detailVisual.dataset.placeholder = t("imageUnavailable");
  els.detailImage.dataset.fallback = hasImage ? "false" : "true";
  els.detailImage.src = safeImage?.url || "";
  els.detailImage.alt = alt;
  els.detailImageLink.href = safeImage?.pageUrl || "#";
  els.detailImageLink.textContent = hasImage ? localizeImageCaption(safeImage.caption) : t("imageUnavailable");
}

function isReliableImage(image) {
  if (!image?.url) return false;
  return (
    isLocalImageUrl(image.url) &&
    !image.url.includes("fallback") &&
    !String(image.pageUrl || "").includes("Mutianyu") &&
    !String(image.caption || "").includes("通用景区占位")
  );
}

function isLocalImageUrl(url) {
  return String(url || "").startsWith("assets/images/");
}

function localizeImageCaption(caption) {
  const fallbackCaption = `${t("imageSourcePrefix")}Wikimedia Commons · ${t("fallbackImageCaption")}`;
  const rawCaption = caption || fallbackCaption;
  if (state.language === "zh-CN") return rawCaption;

  if (state.language === "zh-TW") {
    return rawCaption
      .replace(/^图片来源：/, t("imageSourcePrefix"))
      .replace(/通用景区占位图（慕田峪长城全景）/g, t("fallbackImageCaption"));
  }

  return rawCaption
    .replace(/^图片来源：/, t("imageSourcePrefix"))
    .replace(/通用景区占位图（慕田峪长城全景）/g, t("fallbackImageCaption"));
}

function countBy(items, getKey) {
  const counts = new Map();
  items.forEach((item) => {
    const key = getKey(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()].map(([key, count]) => ({ key, count }));
}

function normalize(value) {
  return String(value).trim().toLocaleLowerCase();
}

function resolveInitialLanguage() {
  return "zh-CN";
}

function t(key, params = {}) {
  const value = translations[state.language]?.[key] ?? translations["zh-CN"][key] ?? key;
  return value.replace(/\{(\w+)\}/g, (_, paramKey) => params[paramKey] ?? "");
}

function regionName(region) {
  if (region === allRegionsValue) return t("allRegions");
  return provinceNames[state.language]?.[region] || region;
}

function regionSearchNames(region) {
  return unique([region, ...Object.values(provinceNames).map((names) => names[region])].filter(Boolean));
}

function osmLanguageHeader() {
  if (state.language === "en") return "en,zh-CN;q=0.8,zh;q=0.7";
  if (state.language === "zh-TW") return "zh-TW,zh-Hant;q=0.9,zh-CN;q=0.8,zh;q=0.7";
  if (state.language === "ko") return "ko,zh-CN;q=0.8,zh;q=0.7";
  if (state.language === "ja") return "ja,zh-CN;q=0.8,zh;q=0.7";
  if (state.language === "th") return "th,zh-CN;q=0.8,zh;q=0.7";
  if (state.language === "es") return "es,zh-CN;q=0.8,zh;q=0.7";
  if (state.language === "ru") return "ru,zh-CN;q=0.8,zh;q=0.7";
  return "zh-CN,zh;q=0.9";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[char];
  });
}

init();
