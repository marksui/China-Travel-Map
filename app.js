const fiveAAttractions = window.CHINA_5A_ATTRACTIONS || [];
const fourAAttractions = window.CHINA_4A_ATTRACTIONS || [];
const attractions = [...fiveAAttractions, ...fourAAttractions];
const fiveAMeta = window.CHINA_5A_META || {};
const fourAMeta = window.CHINA_4A_META || {};
const meta = {
  count: attractions.length,
  officialCount: fiveAMeta.officialCount || fiveAAttractions.filter((item) => item.rating === "official5A").length,
  official4ACount: fourAMeta.official4ACount || fourAAttractions.length,
  peerCount: fiveAMeta.peerCount || fiveAAttractions.filter((item) => item.rating === "peer5A").length,
  provinces: new Set(attractions.map((item) => item.province)).size,
  fiveA: fiveAMeta,
  fourA: fourAMeta,
};
const localImages = { ...(window.CHINA_5A_IMAGES || {}), ...(window.CHINA_4A_IMAGES || {}) };
const imageQualityFlags = window.CHINA_IMAGE_QUALITY_FLAGS || {};
const localizedAttractionNames = window.CHINA_5A_ATTRACTION_NAMES || {};
const sourceIndex = window.CHINA_TRAVEL_SOURCE_INDEX || {};
const seededReviewDecisions = window.CHINA_IMAGE_REVIEW_DECISIONS || {};
const seededMaintenanceOverrides = window.CHINA_MAINTENANCE_OVERRIDES || {};

const highlightColor = "#b65345";
const fallbackImage = localImages.fallback || {
  url: "assets/images/fallback.jpg",
  pageUrl:
    "https://commons.wikimedia.org/wiki/File:Mutianyu_%E2%80%93_Panorama_(Greg_Zaal_via_Poly_Haven).jpg",
  caption: "暂无该景点本地实景图，显示通用景区图",
};

const allRegionsValue = "全部";
const ratingFilterOrder = ["official5A", "official4A", "peer5A"];
const defaultRatingFilters = ["official5A", "peer5A"];
const categoryFilterOrder = ["all", "nature", "water", "heritage", "settlement", "museum", "religious", "red", "leisure", "other"];
const themeFilterOrder = ["all", "nature", "culture", "family", "ancient", "red", "water"];
const seasonFilterOrder = ["all", "spring", "summer", "autumn", "winter"];
const coordinateLevelOptions = ["景区", "区县", "城市"];
const fourAZoomThreshold = 6;
const searchSuggestionLimit = 6;
const reviewStorageKey = "china-travel-map-image-review-v1";
const favoritesStorageKey = "china-travel-map-favorites-v1";
const maintenanceStorageKey = "china-travel-map-maintenance-overrides-v1";
const reviewActionValues = new Set(["keep", "replace", "delete", "missing"]);
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
    aboutLead: "这是一张开放、可核查的中国景点互动地图，用来浏览中国大陆官方 5A/4A 景区，并补充台港澳代表性对标景点。",
    aboutDataTitle: "数据",
    aboutDataBody: "大陆 5A 景区依据公开公告与本地整理数据维护；4A 景区依据开放名录补充，点位优先使用区县/城市参考坐标；台港澳景点作为对标展示。",
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
    official4A: "国家4A",
    peerAttractions: "对标景点",
    regions: "地区",
    official5ATitle: "国家 5A",
    official5ADesc: "中国大陆官方 AAAAA 级旅游景区",
    official4ATitle: "国家 4A",
    official4ADesc: "中国大陆 AAAA 级旅游景区，初始点位为区县或城市参考坐标",
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
    eyebrow: "国家 5A / 4A 景点",
    heroLine1: "欢迎使用中国景点",
    heroLine2: "在线地图",
    intro: "覆盖中国大陆官方 5A 与 4A 景区，并加入台湾、香港、澳门的对标 5A 景点。",
    summaryStats: "统计摘要",
    attractions: "景点",
    filteredResults: "筛选结果",
    filterConditions: "筛选条件",
    regionLabel: "地区",
    levelLabel: "等级",
    levelFilters: "等级筛选",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "对标",
    fourANotice: "4A 点位较密，请选择省份、搜索景点或放大地图后显示。",
    categoryLabel: "类型",
    categoryAll: "全部类型",
    categoryNature: "山岳自然",
    categoryWater: "湖海湿地",
    categoryHeritage: "古迹建筑",
    categorySettlement: "古镇村落",
    categoryMuseum: "博物馆展陈",
    categoryReligious: "寺庙石窟",
    categoryRed: "红色旅游",
    categoryLeisure: "休闲乐园",
    categoryOther: "其他",
    allRegions: "全部地区",
    nationwide: "全国",
    resultCount: "{count} 个景点",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "坐标精度",
    coordinateExact: "精确坐标",
    coordinateDistrict: "区县参考",
    coordinateCity: "城市参考",
    precisionLegendDesc: "地图点越透明，坐标越偏参考性质；详情页会显示具体精度。",
    coordinateApproxNote: "参考点，并非景区真实入口或边界中心",
    dataSource: "数据来源",
    dataUpdated: "更新时间",
    auditStatus: "校正状态",
    auditDone: "已校正",
    auditPartial: "需复核",
    auditPending: "待校正",
    trustMetrics: "可信度概览",
    trustExact: "精确坐标",
    trustApprox: "参考坐标",
    trustImages: "本地图片",
    trustReviewed: "维护记录",
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
    official4AMeta: "国家 4A 景区",
    peerDetail: "{label}（非大陆官方评级）",
    officialDetail: "{year} 年",
    official4ADetail: "国家 4A",
    osmBoundary: "OSM 面边界",
    imageSourcePrefix: "图片来源：",
    imageUnavailable: "暂无可靠图片，正在补图",
    fallbackImageCaption: "通用景区占位图（慕田峪长城全景）",
    imageReview: "图片维护",
    closeImageReview: "关闭图片维护",
    reviewSearchPlaceholder: "搜索景点",
    reviewFilter: "图片维护状态",
    reviewAll: "全部图片",
    reviewMissingOnly: "缺图",
    reviewSuspiciousOnly: "疑似错图",
    reviewWithImage: "已有图片",
    reviewFlagged: "已标记",
    reviewNoSelection: "选择一张图片开始维护",
    reviewNotePlaceholder: "备注或替换文件名",
    reviewKeep: "保留",
    reviewReplace: "替换",
    reviewDelete: "删除",
    reviewMissing: "缺图",
    reviewSuspicious: "疑似",
    reviewExport: "导出",
    reviewImport: "导入",
    reviewImported: "维护记录已导入",
    reviewImportError: "导入失败，请检查 JSON",
    reviewApplyHint: "导出维护包后可用 scripts/apply-maintenance-package.py 一次写入图片维护记录和维护覆盖。",
    reviewSummary: "{count} 项 · {decisions} 条记录",
    reviewNoMatches: "没有匹配的维护项",
    reviewSource: "来源",
    reviewDecision: "当前记录",
    reviewNoImage: "暂无本地图",
    reviewExported: "维护记录已导出",
    aboutCoordinateTitle: "坐标",
    aboutCoordinateBody: "5A 优先使用景区坐标；4A 初始点位多为区县或城市参考坐标，页面会明确标识精度。",
    aboutImageTitle: "图片",
    aboutImageBody: "本地插图保留来源；缺图和疑似错图可通过维护面板继续记录和替换。",
    aboutSourceTitle: "来源索引",
    aboutSourceBody: "来源、授权和更新时间集中记录在本地数据文件中，详情页会显示当前景点采用的来源。",
    sourceNote:
      '大陆 5A 数据以用户提供的 <span>China-5A-tourist-attraction.md</span> 为基础，并补充文旅部 2020-2024 官方公告；4A 名录来自开放列表，坐标采用 city-geo 行政参考点；台港澳为对标 5A 手动补充；可用面边界来自 OpenStreetMap；地图底图 © OpenStreetMap。',
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
    official4A: "國家4A",
    peerAttractions: "對標景點",
    regions: "地區",
    official5ATitle: "國家 5A",
    official5ADesc: "中國大陸官方 AAAAA 級旅遊景區",
    official4ATitle: "國家 4A",
    official4ADesc: "中國大陸 AAAA 級旅遊景區，初始點位為區縣或城市參考座標",
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
    eyebrow: "國家 5A / 4A 景點",
    heroLine1: "歡迎使用中國景點",
    heroLine2: "線上地圖",
    intro: "覆蓋中國大陸官方 5A 與 4A 景區，並加入臺灣、香港、澳門的對標 5A 景點。",
    summaryStats: "統計摘要",
    attractions: "景點",
    filteredResults: "篩選結果",
    filterConditions: "篩選條件",
    regionLabel: "地區",
    levelLabel: "等級",
    levelFilters: "等級篩選",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "對標",
    allRegions: "全部地區",
    nationwide: "全國",
    resultCount: "{count} 個景點",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "座標精度",
    coordinateExact: "精確座標",
    coordinateDistrict: "區縣參考",
    coordinateCity: "城市參考",
    precisionLegendDesc: "地圖點越透明，座標越偏參考性質；詳情頁會顯示具體精度。",
    coordinateApproxNote: "參考點，並非景區真實入口或邊界中心",
    dataSource: "資料來源",
    dataUpdated: "更新時間",
    auditStatus: "校正狀態",
    auditDone: "已校正",
    auditPartial: "需複核",
    auditPending: "待校正",
    trustMetrics: "可信度概覽",
    trustExact: "精確座標",
    trustApprox: "參考座標",
    trustImages: "本地圖片",
    trustReviewed: "維護記錄",
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
    official4AMeta: "國家 4A 景區",
    peerDetail: "{label}（非大陸官方評級）",
    officialDetail: "{year} 年",
    official4ADetail: "國家 4A",
    osmBoundary: "OSM 面邊界",
    imageSourcePrefix: "圖片來源：",
    fallbackImageCaption: "通用景區占位圖（慕田峪長城全景）",
    imageReview: "圖片維護",
    closeImageReview: "關閉圖片維護",
    reviewSearchPlaceholder: "搜尋景點",
    reviewFilter: "圖片維護狀態",
    reviewAll: "全部圖片",
    reviewMissingOnly: "缺圖",
    reviewSuspiciousOnly: "疑似錯圖",
    reviewWithImage: "已有圖片",
    reviewFlagged: "已標記",
    reviewNoSelection: "選擇一張圖片開始維護",
    reviewNotePlaceholder: "備註或替換檔名",
    reviewKeep: "保留",
    reviewReplace: "替換",
    reviewDelete: "刪除",
    reviewMissing: "缺圖",
    reviewSuspicious: "疑似",
    reviewExport: "匯出",
    reviewImport: "匯入",
    reviewImported: "維護記錄已匯入",
    reviewImportError: "匯入失敗，請檢查 JSON",
    reviewApplyHint: "匯出維護包後可用 scripts/apply-maintenance-package.py 一次寫入圖片維護記錄和維護覆蓋。",
    reviewSummary: "{count} 項 · {decisions} 條記錄",
    reviewNoMatches: "沒有符合的維護項",
    reviewSource: "來源",
    reviewDecision: "目前記錄",
    reviewNoImage: "暫無本地圖",
    reviewExported: "維護記錄已匯出",
    aboutCoordinateTitle: "座標",
    aboutCoordinateBody: "5A 優先使用景區座標；4A 初始點位多為區縣或城市參考座標，頁面會明確標識精度。",
    aboutImageTitle: "圖片",
    aboutImageBody: "本地插圖保留來源；缺圖和疑似錯圖可透過維護面板繼續記錄和替換。",
    aboutSourceTitle: "來源索引",
    aboutSourceBody: "來源、授權和更新時間集中記錄在本地資料檔中，詳情頁會顯示目前景點採用的來源。",
    sourceNote:
      '大陸 5A 資料以使用者提供的 <span>China-5A-tourist-attraction.md</span> 為基礎，並補充文旅部 2020-2024 官方公告；4A 名錄來自開放列表，座標採用 city-geo 行政參考點；臺港澳為對標 5A 手動補充；可用面邊界來自 OpenStreetMap；地圖底圖 © OpenStreetMap。',
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
    official4A: "Official 4A",
    peerAttractions: "Peer sites",
    regions: "Regions",
    official5ATitle: "Official 5A",
    official5ADesc: "Mainland China official AAAAA tourist attractions",
    official4ATitle: "Official 4A",
    official4ADesc: "Mainland China AAAA tourist attractions; initial points use district or city reference coordinates",
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
    eyebrow: "Official 5A / 4A Attractions",
    heroLine1: "China Attractions",
    heroLine2: "Interactive Map",
    intro:
      "Covers official mainland China 5A and 4A scenic areas plus peer 5A attractions in Taiwan, Hong Kong, and Macao.",
    summaryStats: "Summary statistics",
    attractions: "Attractions",
    filteredResults: "Shown",
    filterConditions: "Filters",
    regionLabel: "Region",
    levelLabel: "Level",
    levelFilters: "Level filters",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "Peer",
    fourANotice: "4A points are dense. Select a region, search, or zoom in to show them.",
    categoryLabel: "Type",
    categoryAll: "All types",
    categoryNature: "Mountains & nature",
    categoryWater: "Lakes & wetlands",
    categoryHeritage: "Heritage",
    categorySettlement: "Old towns",
    categoryMuseum: "Museums",
    categoryReligious: "Temples & grottoes",
    categoryRed: "Red tourism",
    categoryLeisure: "Leisure parks",
    categoryOther: "Other",
    allRegions: "All regions",
    nationwide: "Nationwide",
    resultCount: "{count} attractions",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "Coordinate precision",
    coordinateExact: "Exact point",
    coordinateDistrict: "District reference",
    coordinateCity: "City reference",
    precisionLegendDesc: "The more transparent a marker is, the more reference-based its coordinate is; details show the exact precision.",
    coordinateApproxNote: "Reference point, not the actual entrance or boundary center",
    dataSource: "Data source",
    dataUpdated: "Updated",
    auditStatus: "Correction status",
    auditDone: "Corrected",
    auditPartial: "Needs review",
    auditPending: "Pending correction",
    trustMetrics: "Trust overview",
    trustExact: "Exact coordinates",
    trustApprox: "Reference points",
    trustImages: "Local images",
    trustReviewed: "Review records",
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
    official4AMeta: "Official 4A scenic area",
    peerDetail: "{label} (not an official mainland rating)",
    officialDetail: "{year}",
    official4ADetail: "Official 4A",
    osmBoundary: "OSM polygon",
    imageSourcePrefix: "Image source: ",
    fallbackImageCaption: "generic scenic placeholder (Mutianyu Great Wall panorama)",
    imageReview: "Image review",
    closeImageReview: "Close image review",
    reviewSearchPlaceholder: "Search attractions",
    reviewFilter: "Image review status",
    reviewAll: "All images",
    reviewMissingOnly: "Missing",
    reviewSuspiciousOnly: "Suspicious",
    reviewWithImage: "Has image",
    reviewFlagged: "Flagged",
    reviewNoSelection: "Select an image to review",
    reviewNotePlaceholder: "Note or replacement filename",
    reviewKeep: "Keep",
    reviewReplace: "Replace",
    reviewDelete: "Delete",
    reviewMissing: "Missing",
    reviewSuspicious: "Suspicious",
    reviewExport: "Export",
    reviewImport: "Import",
    reviewImported: "Review records imported",
    reviewImportError: "Import failed; check the JSON",
    reviewApplyHint: "After exporting a maintenance package, run scripts/apply-maintenance-package.py to write review decisions and maintenance overrides.",
    reviewSummary: "{count} items · {decisions} records",
    reviewNoMatches: "No matching review items",
    reviewSource: "Source",
    reviewDecision: "Current record",
    reviewNoImage: "No local image",
    reviewExported: "Review records exported",
    aboutCoordinateTitle: "Coordinates",
    aboutCoordinateBody: "5A points prefer scenic-area coordinates; many 4A points start as district or city references, and their precision is labeled.",
    aboutImageTitle: "Images",
    aboutImageBody: "Local illustrations keep attribution; missing or suspicious images can be recorded and replaced through the review panel.",
    aboutSourceTitle: "Source index",
    aboutSourceBody: "Sources, licensing notes, and update dates are recorded in local data files; each detail view shows the source used for that attraction.",
    sourceNote:
      'Mainland 5A data is based on the user-provided <span>China-5A-tourist-attraction.md</span>, with 2020-2024 Ministry of Culture and Tourism announcements added; 4A data comes from an open list and uses city-geo administrative reference points; Taiwan, Hong Kong, and Macao peer sites were added manually; available polygons come from OpenStreetMap; basemap © OpenStreetMap.',
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
    official4A: "국가 4A",
    peerAttractions: "준 5A 명소",
    regions: "지역",
    official5ATitle: "국가 5A",
    official5ADesc: "중국 본토 공식 AAAAA급 관광지",
    official4ATitle: "국가 4A",
    official4ADesc: "중국 본토 공식 AAAA급 관광지이며 초기 위치는 구/현 또는 도시 기준 좌표입니다",
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
    eyebrow: "국가 5A / 4A 명소",
    heroLine1: "중국 명소",
    heroLine2: "온라인 지도",
    intro: "중국 본토 공식 5A와 4A 관광지, 대만·홍콩·마카오의 준 5A 명소를 함께 제공합니다.",
    summaryStats: "통계 요약",
    attractions: "명소",
    filteredResults: "표시 결과",
    filterConditions: "필터 조건",
    regionLabel: "지역",
    levelLabel: "등급",
    levelFilters: "등급 필터",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "준5A",
    allRegions: "전체 지역",
    nationwide: "전국",
    resultCount: "명소 {count}곳",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "좌표 정밀도",
    coordinateExact: "정확한 좌표",
    coordinateDistrict: "구/현 기준",
    coordinateCity: "도시 기준",
    precisionLegendDesc: "마커가 투명할수록 좌표가 참고용에 가깝고, 상세 화면에 구체적인 정밀도가 표시됩니다.",
    coordinateApproxNote: "참조 지점이며 실제 입구나 경계 중심이 아닙니다",
    dataSource: "데이터 출처",
    dataUpdated: "업데이트",
    auditStatus: "보정 상태",
    auditDone: "보정됨",
    auditPartial: "검토 필요",
    auditPending: "보정 대기",
    trustMetrics: "신뢰도 개요",
    trustExact: "정확한 좌표",
    trustApprox: "참조 좌표",
    trustImages: "로컬 이미지",
    trustReviewed: "검토 기록",
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
    official4AMeta: "국가 4A 관광지",
    peerDetail: "{label} (중국 본토 공식 등급 아님)",
    officialDetail: "{year}년",
    official4ADetail: "국가 4A",
    osmBoundary: "OSM 면 경계",
    imageSourcePrefix: "이미지 출처: ",
    fallbackImageCaption: "공통 명소 대체 이미지(무톈위 만리장성 전경)",
    imageReview: "이미지 검토",
    closeImageReview: "이미지 검토 닫기",
    reviewSearchPlaceholder: "명소 검색",
    reviewFilter: "이미지 검토 상태",
    reviewAll: "전체 이미지",
    reviewMissingOnly: "이미지 없음",
    reviewSuspiciousOnly: "의심 이미지",
    reviewWithImage: "이미지 있음",
    reviewFlagged: "표시됨",
    reviewNoSelection: "이미지를 선택해 검토하세요",
    reviewNotePlaceholder: "메모 또는 대체 파일명",
    reviewKeep: "유지",
    reviewReplace: "교체",
    reviewDelete: "삭제",
    reviewMissing: "없음",
    reviewSuspicious: "의심",
    reviewExport: "내보내기",
    reviewImport: "가져오기",
    reviewImported: "검토 기록을 가져왔습니다",
    reviewImportError: "가져오기 실패: JSON을 확인하세요",
    reviewApplyHint: "내보낸 뒤 scripts/apply-image-review.py로 data/image-review-decisions.js에 기록할 수 있습니다.",
    reviewSummary: "{count}개 항목 · {decisions}개 기록",
    reviewNoMatches: "일치하는 검토 항목이 없습니다",
    reviewSource: "출처",
    reviewDecision: "현재 기록",
    reviewNoImage: "로컬 이미지 없음",
    reviewExported: "검토 기록을 내보냈습니다",
    aboutCoordinateTitle: "좌표",
    aboutCoordinateBody: "5A는 가능한 한 관광지 좌표를 사용하고, 많은 4A 초기 지점은 구/현 또는 도시 참조 좌표이며 정밀도를 표시합니다.",
    aboutImageTitle: "이미지",
    aboutImageBody: "로컬 이미지는 출처를 보존하며, 누락되거나 의심스러운 이미지는 검토 패널에서 기록하고 교체할 수 있습니다.",
    aboutSourceTitle: "출처 색인",
    aboutSourceBody: "출처, 라이선스 메모, 업데이트 날짜는 로컬 데이터 파일에 기록되며 상세 화면에서 해당 출처를 표시합니다.",
    sourceNote:
      '중국 본토 5A 데이터는 사용자가 제공한 <span>China-5A-tourist-attraction.md</span>를 기반으로 하며 2020-2024년 문화여유부 공식 공고를 보완했습니다. 4A 명단은 공개 목록과 city-geo 행정 기준 좌표를 사용했습니다. 대만, 홍콩, 마카오 준 5A 명소는 수동으로 보완했으며, 사용 가능한 면 경계는 OpenStreetMap, 배경 지도는 © OpenStreetMap입니다.',
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
    official4A: "国家4A",
    peerAttractions: "準 5A",
    regions: "地域",
    official5ATitle: "国家 5A",
    official5ADesc: "中国本土の公式 AAAAA 級観光地",
    official4ATitle: "国家 4A",
    official4ADesc: "中国本土の AAAA 級観光地。初期位置は区県または都市の参照座標です",
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
    eyebrow: "国家 5A / 4A 観光地",
    heroLine1: "中国観光地",
    heroLine2: "オンラインマップ",
    intro: "中国本土の公式 5A・4A 観光地に加え、台湾、香港、マカオの準 5A 観光地を掲載しています。",
    summaryStats: "統計概要",
    attractions: "観光地",
    filteredResults: "表示結果",
    filterConditions: "フィルター条件",
    regionLabel: "地域",
    levelLabel: "等級",
    levelFilters: "等級フィルター",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "準5A",
    allRegions: "すべての地域",
    nationwide: "全国",
    resultCount: "{count} 件の観光地",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "座標精度",
    coordinateExact: "正確な座標",
    coordinateDistrict: "区県参照",
    coordinateCity: "都市参照",
    precisionLegendDesc: "マーカーが透明なほど参照座標に近く、詳細で具体的な精度を確認できます。",
    coordinateApproxNote: "参照点であり、実際の入口や境界中心ではありません",
    dataSource: "データ出典",
    dataUpdated: "更新日",
    auditStatus: "補正状況",
    auditDone: "補正済み",
    auditPartial: "要確認",
    auditPending: "補正待ち",
    trustMetrics: "信頼性概要",
    trustExact: "正確な座標",
    trustApprox: "参照座標",
    trustImages: "ローカル画像",
    trustReviewed: "レビュー記録",
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
    official4AMeta: "国家 4A 観光地",
    peerDetail: "{label}（中国本土の公式等級ではありません）",
    officialDetail: "{year}年",
    official4ADetail: "国家 4A",
    osmBoundary: "OSM 面境界",
    imageSourcePrefix: "画像出典: ",
    fallbackImageCaption: "共通の観光地プレースホルダー（慕田峪長城の全景）",
    imageReview: "画像レビュー",
    closeImageReview: "画像レビューを閉じる",
    reviewSearchPlaceholder: "観光地を検索",
    reviewFilter: "画像レビュー状態",
    reviewAll: "すべての画像",
    reviewMissingOnly: "画像なし",
    reviewSuspiciousOnly: "疑わしい画像",
    reviewWithImage: "画像あり",
    reviewFlagged: "記録あり",
    reviewNoSelection: "画像を選択してレビュー",
    reviewNotePlaceholder: "メモまたは差し替えファイル名",
    reviewKeep: "保持",
    reviewReplace: "差し替え",
    reviewDelete: "削除",
    reviewMissing: "画像なし",
    reviewSuspicious: "疑わしい",
    reviewExport: "エクスポート",
    reviewImport: "インポート",
    reviewImported: "レビュー記録をインポートしました",
    reviewImportError: "インポートに失敗しました。JSON を確認してください",
    reviewApplyHint: "エクスポート後、scripts/apply-image-review.py で data/image-review-decisions.js に書き込めます。",
    reviewSummary: "{count} 件 · {decisions} 件の記録",
    reviewNoMatches: "一致するレビュー項目がありません",
    reviewSource: "出典",
    reviewDecision: "現在の記録",
    reviewNoImage: "ローカル画像なし",
    reviewExported: "レビュー記録をエクスポートしました",
    aboutCoordinateTitle: "座標",
    aboutCoordinateBody: "5A は観光地座標を優先し、多くの 4A 初期点は区県または都市の参照座標として精度を表示します。",
    aboutImageTitle: "画像",
    aboutImageBody: "ローカル画像は出典を保持し、欠落や疑わしい画像はレビュー画面で記録・差し替えできます。",
    aboutSourceTitle: "出典索引",
    aboutSourceBody: "出典、ライセンスメモ、更新日はローカルデータファイルに記録し、詳細画面で使用中の出典を表示します。",
    sourceNote:
      '中国本土 5A データはユーザー提供の <span>China-5A-tourist-attraction.md</span> を基に、2020-2024 年の文化観光部公式公告を補足しています。4A 名簿は公開リストと city-geo の行政参照座標を使用しています。台湾、香港、マカオの準 5A は手動で追加しました。利用可能な面境界は OpenStreetMap、背景地図は © OpenStreetMap です。',
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
    official4A: "4A ทางการ",
    peerAttractions: "แหล่งเทียบเท่า",
    regions: "ภูมิภาค",
    official5ATitle: "5A ทางการ",
    official5ADesc: "แหล่งท่องเที่ยวระดับ AAAAA อย่างเป็นทางการของจีนแผ่นดินใหญ่",
    official4ATitle: "4A ทางการ",
    official4ADesc: "แหล่งท่องเที่ยวระดับ AAAA ในจีนแผ่นดินใหญ่ ตำแหน่งเริ่มต้นใช้พิกัดอำเภอหรือเมืองอ้างอิง",
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
    eyebrow: "แหล่งท่องเที่ยว 5A / 4A ทางการ",
    heroLine1: "แหล่งท่องเที่ยวของจีน",
    heroLine2: "แผนที่ออนไลน์",
    intro: "ครอบคลุมแหล่งท่องเที่ยว 5A และ 4A ทางการในจีนแผ่นดินใหญ่ พร้อมแหล่งเทียบเท่าในไต้หวัน ฮ่องกง และมาเก๊า",
    summaryStats: "สรุปสถิติ",
    attractions: "แหล่งท่องเที่ยว",
    filteredResults: "ผลลัพธ์ที่แสดง",
    filterConditions: "เงื่อนไขตัวกรอง",
    regionLabel: "ภูมิภาค",
    levelLabel: "ระดับ",
    levelFilters: "ตัวกรองระดับ",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "เทียบ",
    allRegions: "ทุกภูมิภาค",
    nationwide: "ทั่วประเทศ",
    resultCount: "{count} แหล่งท่องเที่ยว",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "ความแม่นยำพิกัด",
    coordinateExact: "พิกัดแม่นยำ",
    coordinateDistrict: "อ้างอิงเขต/อำเภอ",
    coordinateCity: "อ้างอิงเมือง",
    precisionLegendDesc: "หมุดยิ่งโปร่งใส พิกัดยิ่งเป็นข้อมูลอ้างอิง; หน้ารายละเอียดจะแสดงระดับความแม่นยำ",
    coordinateApproxNote: "เป็นจุดอ้างอิง ไม่ใช่ทางเข้าหรือศูนย์กลางขอบเขตจริง",
    dataSource: "แหล่งข้อมูล",
    dataUpdated: "อัปเดต",
    auditStatus: "สถานะแก้พิกัด",
    auditDone: "แก้ไขแล้ว",
    auditPartial: "ต้องตรวจทาน",
    auditPending: "รอแก้ไข",
    trustMetrics: "ภาพรวมความน่าเชื่อถือ",
    trustExact: "พิกัดแม่นยำ",
    trustApprox: "พิกัดอ้างอิง",
    trustImages: "รูปในเครื่อง",
    trustReviewed: "บันทึกตรวจทาน",
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
    official4AMeta: "แหล่งท่องเที่ยว 4A ทางการ",
    peerDetail: "{label} (ไม่ใช่การจัดอันดับทางการของจีนแผ่นดินใหญ่)",
    officialDetail: "{year}",
    official4ADetail: "4A ทางการ",
    osmBoundary: "ขอบเขตพื้นที่ OSM",
    imageSourcePrefix: "ที่มาภาพ: ",
    fallbackImageCaption: "ภาพตัวอย่างทั่วไป (พาโนรามากำแพงเมืองจีนมู่เถียนยวี่)",
    imageReview: "ตรวจทานรูปภาพ",
    closeImageReview: "ปิดการตรวจทานรูปภาพ",
    reviewSearchPlaceholder: "ค้นหาแหล่งท่องเที่ยว",
    reviewFilter: "สถานะตรวจทานรูปภาพ",
    reviewAll: "รูปทั้งหมด",
    reviewMissingOnly: "ไม่มีรูป",
    reviewSuspiciousOnly: "รูปน่าสงสัย",
    reviewWithImage: "มีรูป",
    reviewFlagged: "มีบันทึก",
    reviewNoSelection: "เลือกรูปเพื่อเริ่มตรวจทาน",
    reviewNotePlaceholder: "หมายเหตุหรือชื่อไฟล์แทนที่",
    reviewKeep: "เก็บไว้",
    reviewReplace: "แทนที่",
    reviewDelete: "ลบ",
    reviewMissing: "ไม่มีรูป",
    reviewSuspicious: "น่าสงสัย",
    reviewExport: "ส่งออก",
    reviewImport: "นำเข้า",
    reviewImported: "นำเข้าบันทึกตรวจทานแล้ว",
    reviewImportError: "นำเข้าไม่สำเร็จ โปรดตรวจสอบ JSON",
    reviewApplyHint: "หลังส่งออก ใช้ scripts/apply-image-review.py เพื่อเขียน data/image-review-decisions.js",
    reviewSummary: "{count} รายการ · {decisions} บันทึก",
    reviewNoMatches: "ไม่มีรายการตรวจทานที่ตรงกัน",
    reviewSource: "ที่มา",
    reviewDecision: "บันทึกปัจจุบัน",
    reviewNoImage: "ไม่มีรูปในเครื่อง",
    reviewExported: "ส่งออกบันทึกตรวจทานแล้ว",
    aboutCoordinateTitle: "พิกัด",
    aboutCoordinateBody: "5A ใช้พิกัดแหล่งท่องเที่ยวเป็นหลัก ส่วน 4A จำนวนมากเริ่มจากพิกัดอ้างอิงเขตหรือเมืองและจะแสดงระดับความแม่นยำ",
    aboutImageTitle: "รูปภาพ",
    aboutImageBody: "รูปในเครื่องเก็บเครดิตแหล่งที่มาไว้ และสามารถบันทึก/แทนที่รูปที่ขาดหรือน่าสงสัยในแผงตรวจทาน",
    aboutSourceTitle: "ดัชนีแหล่งที่มา",
    aboutSourceBody: "แหล่งที่มา หมายเหตุใบอนุญาต และวันที่อัปเดตบันทึกในไฟล์ข้อมูลในเครื่อง และหน้าแสดงรายละเอียดจะบอกแหล่งที่ใช้",
    sourceNote:
      'ข้อมูล 5A ของจีนแผ่นดินใหญ่อ้างอิงจากไฟล์ <span>China-5A-tourist-attraction.md</span> ที่ผู้ใช้ให้มา และเพิ่มประกาศทางการของกระทรวงวัฒนธรรมและการท่องเที่ยวปี 2020-2024; ข้อมูล 4A มาจากรายการเปิดและใช้จุดอ้างอิงเขตปกครองจาก city-geo; แหล่งเทียบเท่าในไต้หวัน ฮ่องกง และมาเก๊าเพิ่มด้วยตนเอง; ขอบเขตพื้นที่ที่มีมาจาก OpenStreetMap; แผนที่พื้นฐาน © OpenStreetMap.',
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
    official4A: "4A oficial",
    peerAttractions: "Sitios equivalentes",
    regions: "Regiones",
    official5ATitle: "5A oficial",
    official5ADesc: "Atracciones turísticas AAAAA oficiales de China continental",
    official4ATitle: "4A oficial",
    official4ADesc: "Atracciones turísticas AAAA de China continental; los puntos iniciales usan coordenadas de distrito o ciudad",
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
    eyebrow: "Atracciones 5A / 4A oficiales",
    heroLine1: "Atracciones de China",
    heroLine2: "Mapa en línea",
    intro:
      "Cubre las áreas escénicas 5A y 4A oficiales de China continental y atracciones equivalentes en Taiwán, Hong Kong y Macao.",
    summaryStats: "Resumen estadístico",
    attractions: "Atracciones",
    filteredResults: "Mostradas",
    filterConditions: "Filtros",
    regionLabel: "Región",
    levelLabel: "Nivel",
    levelFilters: "Filtros de nivel",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "Eq.",
    allRegions: "Todas las regiones",
    nationwide: "Todo el país",
    resultCount: "{count} atracciones",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "Precisión de coordenadas",
    coordinateExact: "Coordenada exacta",
    coordinateDistrict: "Referencia de distrito",
    coordinateCity: "Referencia de ciudad",
    precisionLegendDesc: "Cuanto más transparente es el punto, más referencial es la coordenada; los detalles muestran la precisión exacta.",
    coordinateApproxNote: "Punto de referencia, no entrada real ni centro del límite",
    dataSource: "Fuente de datos",
    dataUpdated: "Actualizado",
    auditStatus: "Estado de corrección",
    auditDone: "Corregido",
    auditPartial: "Requiere revisión",
    auditPending: "Pendiente",
    trustMetrics: "Resumen de confianza",
    trustExact: "Coordenadas exactas",
    trustApprox: "Puntos de referencia",
    trustImages: "Imágenes locales",
    trustReviewed: "Registros revisados",
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
    official4AMeta: "Atracción 4A oficial",
    peerDetail: "{label} (no es una calificación oficial de China continental)",
    officialDetail: "{year}",
    official4ADetail: "4A oficial",
    osmBoundary: "Polígono OSM",
    imageSourcePrefix: "Fuente de imagen: ",
    fallbackImageCaption: "marcador visual genérico (panorama de la Gran Muralla de Mutianyu)",
    imageReview: "Revisión de imágenes",
    closeImageReview: "Cerrar revisión de imágenes",
    reviewSearchPlaceholder: "Buscar atracciones",
    reviewFilter: "Estado de revisión",
    reviewAll: "Todas las imágenes",
    reviewMissingOnly: "Sin imagen",
    reviewSuspiciousOnly: "Sospechosa",
    reviewWithImage: "Con imagen",
    reviewFlagged: "Marcada",
    reviewNoSelection: "Selecciona una imagen para revisar",
    reviewNotePlaceholder: "Nota o archivo de reemplazo",
    reviewKeep: "Conservar",
    reviewReplace: "Reemplazar",
    reviewDelete: "Eliminar",
    reviewMissing: "Sin imagen",
    reviewSuspicious: "Sospechosa",
    reviewExport: "Exportar",
    reviewImport: "Importar",
    reviewImported: "Registros de revisión importados",
    reviewImportError: "Error al importar; revisa el JSON",
    reviewApplyHint: "Tras exportar, usa scripts/apply-image-review.py para escribir data/image-review-decisions.js.",
    reviewSummary: "{count} elementos · {decisions} registros",
    reviewNoMatches: "No hay elementos de revisión coincidentes",
    reviewSource: "Fuente",
    reviewDecision: "Registro actual",
    reviewNoImage: "Sin imagen local",
    reviewExported: "Registros de revisión exportados",
    aboutCoordinateTitle: "Coordenadas",
    aboutCoordinateBody: "Los puntos 5A priorizan coordenadas de la zona escénica; muchos 4A empiezan como referencias de distrito o ciudad y muestran su precisión.",
    aboutImageTitle: "Imágenes",
    aboutImageBody: "Las imágenes locales conservan atribución; las faltantes o sospechosas pueden registrarse y reemplazarse desde el panel de revisión.",
    aboutSourceTitle: "Índice de fuentes",
    aboutSourceBody: "Fuentes, notas de licencia y fechas de actualización se registran en archivos locales; cada detalle muestra la fuente usada.",
    sourceNote:
      'Los datos 5A de China continental se basan en el archivo <span>China-5A-tourist-attraction.md</span> proporcionado por el usuario, con anuncios oficiales 2020-2024 del Ministerio de Cultura y Turismo añadidos; los datos 4A provienen de una lista abierta y usan puntos administrativos de city-geo; los sitios equivalentes de Taiwán, Hong Kong y Macao se añadieron manualmente; los polígonos disponibles provienen de OpenStreetMap; mapa base © OpenStreetMap.',
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
    official4A: "Официальные 4A",
    peerAttractions: "Аналоги",
    regions: "Регионы",
    official5ATitle: "Официальные 5A",
    official5ADesc: "Официальные туристические зоны AAAAA материкового Китая",
    official4ATitle: "Официальные 4A",
    official4ADesc: "Туристические зоны AAAA материкового Китая; начальные точки используют координаты района или города",
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
    eyebrow: "Официальные 5A / 4A",
    heroLine1: "Достопримечательности Китая",
    heroLine2: "Онлайн-карта",
    intro:
      "Охватывает официальные зоны 5A и 4A материкового Китая и аналогичные достопримечательности Тайваня, Гонконга и Макао.",
    summaryStats: "Сводная статистика",
    attractions: "Места",
    filteredResults: "Показано",
    filterConditions: "Фильтры",
    regionLabel: "Регион",
    levelLabel: "Уровень",
    levelFilters: "Фильтр уровня",
    levelOfficial5A: "5A",
    levelOfficial4A: "4A",
    levelPeer5A: "Аналог",
    allRegions: "Все регионы",
    nationwide: "Вся страна",
    resultCount: "{count} мест",
    filterSubtitle: "{region} · {levels}",
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
    coordinatePrecision: "Точность координат",
    coordinateExact: "Точные координаты",
    coordinateDistrict: "Ориентир района",
    coordinateCity: "Ориентир города",
    precisionLegendDesc: "Чем прозрачнее метка, тем больше координата носит справочный характер; точность указана в деталях.",
    coordinateApproxNote: "Справочная точка, не фактический вход или центр границы",
    dataSource: "Источник данных",
    dataUpdated: "Обновлено",
    auditStatus: "Статус коррекции",
    auditDone: "Исправлено",
    auditPartial: "Нужна проверка",
    auditPending: "Ожидает коррекции",
    trustMetrics: "Обзор надежности",
    trustExact: "Точные координаты",
    trustApprox: "Справочные точки",
    trustImages: "Локальные изображения",
    trustReviewed: "Записи проверки",
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
    official4AMeta: "Официальная зона 4A",
    peerDetail: "{label} (не официальный рейтинг материкового Китая)",
    officialDetail: "{year}",
    official4ADetail: "Официальные 4A",
    osmBoundary: "Полигон OSM",
    imageSourcePrefix: "Источник изображения: ",
    fallbackImageCaption: "универсальное изображение-заглушка (панорама Великой Китайской стены Мутяньюй)",
    imageReview: "Проверка изображений",
    closeImageReview: "Закрыть проверку изображений",
    reviewSearchPlaceholder: "Поиск мест",
    reviewFilter: "Статус проверки изображений",
    reviewAll: "Все изображения",
    reviewMissingOnly: "Нет изображения",
    reviewSuspiciousOnly: "Сомнительное",
    reviewWithImage: "Есть изображение",
    reviewFlagged: "Отмечено",
    reviewNoSelection: "Выберите изображение для проверки",
    reviewNotePlaceholder: "Заметка или файл замены",
    reviewKeep: "Оставить",
    reviewReplace: "Заменить",
    reviewDelete: "Удалить",
    reviewMissing: "Нет изображения",
    reviewSuspicious: "Сомнительное",
    reviewExport: "Экспорт",
    reviewImport: "Импорт",
    reviewImported: "Записи проверки импортированы",
    reviewImportError: "Ошибка импорта, проверьте JSON",
    reviewApplyHint: "После экспорта используйте scripts/apply-image-review.py для записи data/image-review-decisions.js.",
    reviewSummary: "{count} элементов · {decisions} записей",
    reviewNoMatches: "Нет подходящих записей проверки",
    reviewSource: "Источник",
    reviewDecision: "Текущая запись",
    reviewNoImage: "Нет локального изображения",
    reviewExported: "Записи проверки экспортированы",
    aboutCoordinateTitle: "Координаты",
    aboutCoordinateBody: "Для 5A используются координаты объектов, где возможно; многие 4A начинаются как ориентиры района или города, и точность явно отмечена.",
    aboutImageTitle: "Изображения",
    aboutImageBody: "Локальные изображения сохраняют атрибуцию; отсутствующие или сомнительные можно записывать и заменять через панель проверки.",
    aboutSourceTitle: "Индекс источников",
    aboutSourceBody: "Источники, лицензии и даты обновления записаны в локальных файлах данных; в деталях показан источник для выбранного места.",
    sourceNote:
      'Данные 5A материкового Китая основаны на файле <span>China-5A-tourist-attraction.md</span>, предоставленном пользователем, и дополнены официальными объявлениями Министерства культуры и туризма за 2020-2024 годы; данные 4A взяты из открытого списка и используют административные опорные точки city-geo; аналоги Тайваня, Гонконга и Макао добавлены вручную; доступные полигоны взяты из OpenStreetMap; базовая карта © OpenStreetMap.',
  },
};

const aboutTranslations = {
  "zh-CN": {
    aboutMap: "关于这个地图",
    aboutAria: "关于中国景点地图",
    aboutClose: "关闭说明",
    aboutEyebrow: "开放数据说明",
    aboutTitle: "关于中国景点地图",
    aboutLead: "这是一张开放、可核查的中国景点互动地图，用来浏览中国大陆官方 5A/4A 景区，并补充台港澳代表性对标景点。",
    aboutDataTitle: "开放数据",
    aboutDataBody: "大陆 5A 景区来自公开公告与本地整理数据；4A 景区来自开放名录，初始坐标采用区县/城市行政参考点；边界参考 OpenStreetMap，图片来自开放授权图库并保留来源。",
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
    aboutLead: "這是一張開放、可核查的中國景點互動地圖，用來瀏覽中國大陸官方 5A/4A 景區，並補充台港澳代表性對標景點。",
    aboutDataTitle: "開放資料",
    aboutDataBody: "大陸 5A 景區來自公開公告與本地整理資料；4A 景區來自開放名錄，初始座標採用區縣/城市行政參考點；邊界參考 OpenStreetMap，圖片來自開放授權圖庫並保留來源。",
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
    aboutLead: "An open, reviewable interactive map for browsing official mainland China 5A and 4A scenic areas, with representative peer sites in Taiwan, Hong Kong, and Macao.",
    aboutDataTitle: "Open Data",
    aboutDataBody: "Mainland 5A sites are maintained from public announcements and local curated data; 4A sites come from an open list and initially use district or city administrative reference points; boundaries reference OpenStreetMap, and images come from open-license sources with attribution kept.",
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
    aboutLead: "중국 본토 공식 5A와 4A 관광지를 살펴보고 대만, 홍콩, 마카오의 대표적인 비교 명소를 함께 볼 수 있는 개방형 인터랙티브 지도입니다.",
    aboutDataTitle: "오픈 데이터",
    aboutDataBody: "본토 5A 관광지는 공개 공고와 로컬 정리 데이터를 기준으로 관리합니다. 4A 관광지는 공개 목록을 사용하며 초기 좌표는 구/현 또는 도시 기준점입니다. 경계는 OpenStreetMap을 참고하고, 이미지는 출처를 남긴 공개 라이선스 자료를 사용합니다.",
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
    aboutLead: "中国本土の公式 5A・4A 観光地を閲覧し、台湾・香港・マカオの代表的な比較対象スポットも確認できる、オープンで検証しやすいインタラクティブ地図です。",
    aboutDataTitle: "オープンデータ",
    aboutDataBody: "本土 5A 観光地は公開公告とローカル整理データをもとに管理しています。4A 観光地は公開リストを使い、初期座標は区県または都市の行政参照点です。境界は OpenStreetMap を参照し、画像は出典を保持したオープンライセンス素材を使用します。",
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
    aboutLead: "แผนที่แบบโต้ตอบที่เปิดเผยและตรวจสอบได้ สำหรับดูแหล่งท่องเที่ยว 5A และ 4A อย่างเป็นทางการของจีนแผ่นดินใหญ่ พร้อมสถานที่เทียบเคียงจากไต้หวัน ฮ่องกง และมาเก๊า",
    aboutDataTitle: "ข้อมูลเปิด",
    aboutDataBody: "ข้อมูล 5A ของจีนแผ่นดินใหญ่มาจากประกาศสาธารณะและข้อมูลที่จัดทำในเครื่อง ส่วน 4A มาจากรายการเปิดและใช้พิกัดอ้างอิงเขตหรือเมืองในขั้นต้น ขอบเขตอ้างอิง OpenStreetMap และรูปภาพมาจากแหล่งอนุญาตแบบเปิดพร้อมเก็บเครดิตไว้",
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
    aboutLead: "Un mapa interactivo abierto y verificable para explorar las zonas escénicas 5A y 4A oficiales de China continental, con sitios de referencia de Taiwán, Hong Kong y Macao.",
    aboutDataTitle: "Datos Abiertos",
    aboutDataBody: "Los sitios 5A de China continental se mantienen a partir de anuncios públicos y datos locales curados; los 4A provienen de una lista abierta y usan puntos administrativos de distrito o ciudad inicialmente; los límites usan OpenStreetMap como referencia y las imágenes provienen de fuentes con licencia abierta y atribución.",
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
    aboutLead: "Открытая и проверяемая интерактивная карта официальных туристических зон 5A и 4A материкового Китая с представительными сопоставимыми объектами Тайваня, Гонконга и Макао.",
    aboutDataTitle: "Открытые данные",
    aboutDataBody: "Список 5A материкового Китая ведется по публичным объявлениям и локально подготовленным данным; 4A взяты из открытого списка и сначала используют административные точки районов или городов; границы опираются на OpenStreetMap, а изображения берутся из открыто лицензированных источников с сохранением атрибуции.",
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

const inspirationTranslations = {
  "zh-CN": {
    themeLabel: "主题",
    themeAll: "全部主题",
    themeNature: "自然山水",
    themeCulture: "人文历史",
    themeFamily: "亲子休闲",
    themeAncient: "古建石窟",
    themeRed: "红色记忆",
    themeWater: "湖海湿地",
    seasonLabel: "季节",
    seasonAll: "全部季节",
    seasonSpring: "春季",
    seasonSummer: "夏季",
    seasonAutumn: "秋季",
    seasonWinter: "冬季",
    inspirationAria: "旅行灵感",
    inspirationTitle: "旅行灵感",
    inspirationCaption: "{count} 个可发现景点",
    randomAttraction: "随机发现",
    randomRegion: "随机地区",
    buildRoute: "生成路线",
    routeEmpty: "选择主题或季节后生成一条路线",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "收藏清单",
    favorite: "收藏",
    unfavorite: "已收藏",
    noFavorites: "还没有收藏",
    maintenanceExport: "维护导出",
    maintenanceExported: "维护包已导出",
  },
  "zh-TW": {
    themeLabel: "主題",
    themeAll: "全部主題",
    themeNature: "自然山水",
    themeCulture: "人文歷史",
    themeFamily: "親子休閒",
    themeAncient: "古建石窟",
    themeRed: "紅色記憶",
    themeWater: "湖海濕地",
    seasonLabel: "季節",
    seasonAll: "全部季節",
    seasonSpring: "春季",
    seasonSummer: "夏季",
    seasonAutumn: "秋季",
    seasonWinter: "冬季",
    inspirationAria: "旅行靈感",
    inspirationTitle: "旅行靈感",
    inspirationCaption: "{count} 個可發現景點",
    randomAttraction: "隨機發現",
    randomRegion: "隨機地區",
    buildRoute: "生成路線",
    routeEmpty: "選擇主題或季節後生成一條路線",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "收藏清單",
    favorite: "收藏",
    unfavorite: "已收藏",
    noFavorites: "還沒有收藏",
    maintenanceExport: "維護匯出",
    maintenanceExported: "維護包已匯出",
  },
  en: {
    themeLabel: "Theme",
    themeAll: "All themes",
    themeNature: "Nature",
    themeCulture: "Culture",
    themeFamily: "Family",
    themeAncient: "Ancient sites",
    themeRed: "Red memory",
    themeWater: "Water & wetlands",
    seasonLabel: "Season",
    seasonAll: "All seasons",
    seasonSpring: "Spring",
    seasonSummer: "Summer",
    seasonAutumn: "Autumn",
    seasonWinter: "Winter",
    inspirationAria: "Travel inspiration",
    inspirationTitle: "Travel Inspiration",
    inspirationCaption: "{count} discoverable places",
    randomAttraction: "Surprise me",
    randomRegion: "Random region",
    buildRoute: "Build route",
    routeEmpty: "Pick a theme or season to build a route",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "Saved List",
    favorite: "Save",
    unfavorite: "Saved",
    noFavorites: "No saved places yet",
    maintenanceExport: "Maintenance export",
    maintenanceExported: "Maintenance package exported",
  },
  ko: {
    themeLabel: "테마",
    themeAll: "전체 테마",
    themeNature: "자연",
    themeCulture: "인문 역사",
    themeFamily: "가족 휴식",
    themeAncient: "고건축·석굴",
    themeRed: "혁명 역사",
    themeWater: "호수·습지",
    seasonLabel: "계절",
    seasonAll: "전체 계절",
    seasonSpring: "봄",
    seasonSummer: "여름",
    seasonAutumn: "가을",
    seasonWinter: "겨울",
    inspirationAria: "여행 영감",
    inspirationTitle: "여행 영감",
    inspirationCaption: "{count}곳 발견 가능",
    randomAttraction: "랜덤 발견",
    randomRegion: "랜덤 지역",
    buildRoute: "루트 만들기",
    routeEmpty: "테마나 계절을 선택해 루트를 만드세요",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "저장 목록",
    favorite: "저장",
    unfavorite: "저장됨",
    noFavorites: "저장한 곳이 없습니다",
    maintenanceExport: "관리 내보내기",
    maintenanceExported: "관리 패키지를 내보냈습니다",
  },
  ja: {
    themeLabel: "テーマ",
    themeAll: "すべてのテーマ",
    themeNature: "自然",
    themeCulture: "文化・歴史",
    themeFamily: "家族・休暇",
    themeAncient: "古建築・石窟",
    themeRed: "革命史跡",
    themeWater: "湖・湿地",
    seasonLabel: "季節",
    seasonAll: "すべての季節",
    seasonSpring: "春",
    seasonSummer: "夏",
    seasonAutumn: "秋",
    seasonWinter: "冬",
    inspirationAria: "旅行のヒント",
    inspirationTitle: "旅行のヒント",
    inspirationCaption: "{count} 件を発見できます",
    randomAttraction: "ランダム発見",
    randomRegion: "ランダム地域",
    buildRoute: "ルート作成",
    routeEmpty: "テーマまたは季節を選ぶとルートを作成できます",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "保存リスト",
    favorite: "保存",
    unfavorite: "保存済み",
    noFavorites: "保存した場所はまだありません",
    maintenanceExport: "管理エクスポート",
    maintenanceExported: "管理パッケージをエクスポートしました",
  },
  th: {
    themeLabel: "ธีม",
    themeAll: "ทุกธีม",
    themeNature: "ธรรมชาติ",
    themeCulture: "วัฒนธรรม",
    themeFamily: "ครอบครัว",
    themeAncient: "โบราณสถาน",
    themeRed: "ประวัติศาสตร์ปฏิวัติ",
    themeWater: "น้ำและพื้นที่ชุ่มน้ำ",
    seasonLabel: "ฤดูกาล",
    seasonAll: "ทุกฤดูกาล",
    seasonSpring: "ฤดูใบไม้ผลิ",
    seasonSummer: "ฤดูร้อน",
    seasonAutumn: "ฤดูใบไม้ร่วง",
    seasonWinter: "ฤดูหนาว",
    inspirationAria: "แรงบันดาลใจท่องเที่ยว",
    inspirationTitle: "แรงบันดาลใจท่องเที่ยว",
    inspirationCaption: "{count} สถานที่ให้ค้นพบ",
    randomAttraction: "สุ่มค้นพบ",
    randomRegion: "สุ่มภูมิภาค",
    buildRoute: "สร้างเส้นทาง",
    routeEmpty: "เลือกธีมหรือฤดูกาลเพื่อสร้างเส้นทาง",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "รายการบันทึก",
    favorite: "บันทึก",
    unfavorite: "บันทึกแล้ว",
    noFavorites: "ยังไม่มีรายการบันทึก",
    maintenanceExport: "ส่งออกสำหรับดูแลข้อมูล",
    maintenanceExported: "ส่งออกแพ็กเกจดูแลข้อมูลแล้ว",
  },
  es: {
    themeLabel: "Tema",
    themeAll: "Todos los temas",
    themeNature: "Naturaleza",
    themeCulture: "Cultura e historia",
    themeFamily: "Familia y ocio",
    themeAncient: "Sitios antiguos",
    themeRed: "Memoria roja",
    themeWater: "Agua y humedales",
    seasonLabel: "Temporada",
    seasonAll: "Todas las temporadas",
    seasonSpring: "Primavera",
    seasonSummer: "Verano",
    seasonAutumn: "Otoño",
    seasonWinter: "Invierno",
    inspirationAria: "Inspiración de viaje",
    inspirationTitle: "Inspiración de viaje",
    inspirationCaption: "{count} lugares por descubrir",
    randomAttraction: "Descubrir al azar",
    randomRegion: "Región al azar",
    buildRoute: "Crear ruta",
    routeEmpty: "Elige tema o temporada para crear una ruta",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "Lista guardada",
    favorite: "Guardar",
    unfavorite: "Guardado",
    noFavorites: "Aún no hay guardados",
    maintenanceExport: "Exportar mantenimiento",
    maintenanceExported: "Paquete de mantenimiento exportado",
  },
  ru: {
    themeLabel: "Тема",
    themeAll: "Все темы",
    themeNature: "Природа",
    themeCulture: "Культура и история",
    themeFamily: "Семейный отдых",
    themeAncient: "Древние памятники",
    themeRed: "Красная память",
    themeWater: "Вода и болота",
    seasonLabel: "Сезон",
    seasonAll: "Все сезоны",
    seasonSpring: "Весна",
    seasonSummer: "Лето",
    seasonAutumn: "Осень",
    seasonWinter: "Зима",
    inspirationAria: "Идеи для поездки",
    inspirationTitle: "Идеи для поездки",
    inspirationCaption: "{count} мест для открытия",
    randomAttraction: "Случайное место",
    randomRegion: "Случайный регион",
    buildRoute: "Собрать маршрут",
    routeEmpty: "Выберите тему или сезон, чтобы собрать маршрут",
    routeTitle: "{theme} · {season}",
    favoritesTitle: "Сохраненное",
    favorite: "Сохранить",
    unfavorite: "Сохранено",
    noFavorites: "Пока нет сохраненных мест",
    maintenanceExport: "Экспорт обслуживания",
    maintenanceExported: "Пакет обслуживания экспортирован",
  },
};

for (const [language, copy] of Object.entries(inspirationTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const routeInsightTranslations = {
  "zh-CN": {
    routeSummary: "约 {distance} 公里 · 跨 {regions} 个地区",
    routeSummarySingleRegion: "约 {distance} 公里 · 同地区",
    routeStart: "起点",
    routeLegDistance: "距上一站约 {distance} 公里",
  },
  "zh-TW": {
    routeSummary: "約 {distance} 公里 · 跨 {regions} 個地區",
    routeSummarySingleRegion: "約 {distance} 公里 · 同地區",
    routeStart: "起點",
    routeLegDistance: "距上一站約 {distance} 公里",
  },
  en: {
    routeSummary: "About {distance} km · {regions} regions",
    routeSummarySingleRegion: "About {distance} km · same region",
    routeStart: "Start",
    routeLegDistance: "About {distance} km from previous",
  },
  ko: {
    routeSummary: "약 {distance} km · {regions}개 지역",
    routeSummarySingleRegion: "약 {distance} km · 같은 지역",
    routeStart: "출발점",
    routeLegDistance: "이전 지점에서 약 {distance} km",
  },
  ja: {
    routeSummary: "約 {distance} km · {regions} 地域",
    routeSummarySingleRegion: "約 {distance} km · 同一地域",
    routeStart: "起点",
    routeLegDistance: "前の地点から約 {distance} km",
  },
  th: {
    routeSummary: "ประมาณ {distance} กม. · {regions} ภูมิภาค",
    routeSummarySingleRegion: "ประมาณ {distance} กม. · ภูมิภาคเดียวกัน",
    routeStart: "จุดเริ่มต้น",
    routeLegDistance: "ประมาณ {distance} กม. จากจุดก่อนหน้า",
  },
  es: {
    routeSummary: "Aprox. {distance} km · {regions} regiones",
    routeSummarySingleRegion: "Aprox. {distance} km · misma región",
    routeStart: "Inicio",
    routeLegDistance: "Aprox. {distance} km desde la anterior",
  },
  ru: {
    routeSummary: "Около {distance} км · {regions} регионов",
    routeSummarySingleRegion: "Около {distance} км · один регион",
    routeStart: "Старт",
    routeLegDistance: "Около {distance} км от предыдущей",
  },
};

for (const [language, copy] of Object.entries(routeInsightTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const maintenanceTranslations = {
  "zh-CN": {
    maintenancePanel: "维护",
    closeMaintenance: "关闭维护面板",
    maintenanceSelected: "当前景点",
    maintenanceSummary: "{count} 条覆盖",
    maintenanceQueueTitle: "维护队列",
    maintenanceQueueSummary: "{count} 个待处理",
    maintenanceQueueMissingImage: "缺图",
    maintenanceQueueMissingImageDesc: "没有可靠本地插图",
    maintenanceQueueSuspiciousImage: "疑似错图",
    maintenanceQueueSuspiciousImageDesc: "命名或来源可能不匹配",
    maintenanceQueueCityCoordinate: "城市坐标",
    maintenanceQueueCityCoordinateDesc: "需要校正到景区点位",
    maintenanceQueueDistrictCoordinate: "区县坐标",
    maintenanceQueueDistrictCoordinateDesc: "需要进一步精确",
    maintenanceQueueOverridden: "已有覆盖",
    maintenanceQueueOverriddenDesc: "本地维护记录",
    maintenanceLatitude: "纬度",
    maintenanceLongitude: "经度",
    maintenanceCoordinateLabel: "坐标备注",
    maintenanceNote: "维护备注",
    maintenanceSave: "保存覆盖",
    maintenanceDelete: "恢复原始",
    maintenanceExportOverrides: "导出覆盖",
    maintenanceExportAudit: "导出检查",
    maintenanceImport: "导入覆盖",
    maintenanceSaved: "维护覆盖已保存",
    maintenanceDeleted: "已恢复原始数据",
    maintenanceImported: "维护覆盖已导入",
    maintenanceImportError: "导入失败，请检查 JSON",
    maintenanceOverridesExported: "维护覆盖已导出",
    maintenanceAuditExported: "维护检查已导出",
    maintenanceApplyHint: "导出覆盖或维护包后，可用 scripts/apply-maintenance-package.py 统一写入静态数据文件。",
  },
  en: {
    maintenancePanel: "Maintenance",
    closeMaintenance: "Close maintenance panel",
    maintenanceSelected: "Selected place",
    maintenanceSummary: "{count} overrides",
    maintenanceQueueTitle: "Maintenance Queue",
    maintenanceQueueSummary: "{count} need attention",
    maintenanceQueueMissingImage: "Missing image",
    maintenanceQueueMissingImageDesc: "No reliable local image",
    maintenanceQueueSuspiciousImage: "Suspicious image",
    maintenanceQueueSuspiciousImageDesc: "Name or source may not match",
    maintenanceQueueCityCoordinate: "City coordinate",
    maintenanceQueueCityCoordinateDesc: "Needs scenic-area correction",
    maintenanceQueueDistrictCoordinate: "District coordinate",
    maintenanceQueueDistrictCoordinateDesc: "Needs better precision",
    maintenanceQueueOverridden: "Overrides",
    maintenanceQueueOverriddenDesc: "Local maintenance records",
    maintenanceLatitude: "Latitude",
    maintenanceLongitude: "Longitude",
    maintenanceCoordinateLabel: "Coordinate note",
    maintenanceNote: "Maintenance note",
    maintenanceSave: "Save override",
    maintenanceDelete: "Restore original",
    maintenanceExportOverrides: "Export overrides",
    maintenanceExportAudit: "Export check",
    maintenanceImport: "Import overrides",
    maintenanceSaved: "Maintenance override saved",
    maintenanceDeleted: "Original data restored",
    maintenanceImported: "Maintenance overrides imported",
    maintenanceImportError: "Import failed. Check the JSON file",
    maintenanceOverridesExported: "Maintenance overrides exported",
    maintenanceAuditExported: "Maintenance check exported",
    maintenanceApplyHint: "After exporting overrides or a package, run scripts/apply-maintenance-package.py to update the static data files.",
  },
  "zh-TW": {
    reviewApplyHint: "匯出維護包後可用 scripts/apply-maintenance-package.py 一次寫入審核記錄和維護覆蓋。",
    maintenanceExportAudit: "匯出檢查",
    maintenanceAuditExported: "維護檢查已匯出",
    maintenanceApplyHint: "匯出覆蓋或維護包後，可用 scripts/apply-maintenance-package.py 統一寫入靜態資料檔。",
  },
  ko: {
    reviewApplyHint: "유지보수 패키지를 내보낸 뒤 scripts/apply-maintenance-package.py로 검토 기록과 유지보수 오버라이드를 한 번에 기록할 수 있습니다.",
    maintenanceExportAudit: "검사 내보내기",
    maintenanceAuditExported: "유지관리 검사를 내보냈습니다",
    maintenanceApplyHint: "오버라이드나 유지보수 패키지를 내보낸 뒤 scripts/apply-maintenance-package.py로 정적 데이터 파일을 갱신합니다.",
  },
  ja: {
    reviewApplyHint: "メンテナンスパッケージを書き出した後、scripts/apply-maintenance-package.py で審査記録とメンテナンス上書きを一度に書き込めます。",
    maintenanceExportAudit: "チェックを書き出す",
    maintenanceAuditExported: "メンテナンスチェックを書き出しました",
    maintenanceApplyHint: "上書きまたはメンテナンスパッケージを書き出した後、scripts/apply-maintenance-package.py で静的データを更新します。",
  },
  th: {
    reviewApplyHint: "หลังส่งออกแพ็กเกจดูแลข้อมูล ใช้ scripts/apply-maintenance-package.py เพื่อเขียนบันทึกตรวจรูปและข้อมูลแก้ไขพร้อมกัน",
    maintenanceExportAudit: "ส่งออกการตรวจ",
    maintenanceAuditExported: "ส่งออกการตรวจดูแลแล้ว",
    maintenanceApplyHint: "หลังส่งออกข้อมูลแก้ไขหรือแพ็กเกจดูแลข้อมูล ใช้ scripts/apply-maintenance-package.py เพื่ออัปเดตไฟล์ข้อมูลสแตติก",
  },
  es: {
    reviewApplyHint: "Tras exportar un paquete de mantenimiento, usa scripts/apply-maintenance-package.py para escribir las revisiones y las correcciones.",
    maintenanceExportAudit: "Exportar chequeo",
    maintenanceAuditExported: "Chequeo de mantenimiento exportado",
    maintenanceApplyHint: "Tras exportar correcciones o un paquete de mantenimiento, usa scripts/apply-maintenance-package.py para actualizar los datos estáticos.",
  },
  ru: {
    reviewApplyHint: "После экспорта пакета обслуживания используйте scripts/apply-maintenance-package.py, чтобы записать проверки изображений и правки обслуживания.",
    maintenanceExportAudit: "Экспорт проверки",
    maintenanceAuditExported: "Проверка обслуживания экспортирована",
    maintenanceApplyHint: "После экспорта правок или пакета обслуживания используйте scripts/apply-maintenance-package.py для обновления статических данных.",
  },
};

for (const [language, copy] of Object.entries(maintenanceTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const feedbackTranslations = {
  "zh-CN": {
    favoriteAdded: "已收藏：{name}",
    favoriteRemoved: "已取消收藏：{name}",
    reviewDecisionSaved: "已标记：{name} · {action}",
  },
  "zh-TW": {
    favoriteAdded: "已收藏：{name}",
    favoriteRemoved: "已取消收藏：{name}",
    reviewDecisionSaved: "已標記：{name} · {action}",
  },
  en: {
    favoriteAdded: "Saved: {name}",
    favoriteRemoved: "Removed from saved: {name}",
    reviewDecisionSaved: "Marked: {name} · {action}",
  },
  ko: {
    favoriteAdded: "저장됨: {name}",
    favoriteRemoved: "저장에서 제거됨: {name}",
    reviewDecisionSaved: "표시됨: {name} · {action}",
  },
  ja: {
    favoriteAdded: "保存しました：{name}",
    favoriteRemoved: "保存を解除しました：{name}",
    reviewDecisionSaved: "マークしました：{name} · {action}",
  },
  th: {
    favoriteAdded: "บันทึกแล้ว: {name}",
    favoriteRemoved: "นำออกจากรายการบันทึกแล้ว: {name}",
    reviewDecisionSaved: "ทำเครื่องหมายแล้ว: {name} · {action}",
  },
  es: {
    favoriteAdded: "Guardado: {name}",
    favoriteRemoved: "Eliminado de guardados: {name}",
    reviewDecisionSaved: "Marcado: {name} · {action}",
  },
  ru: {
    favoriteAdded: "Сохранено: {name}",
    favoriteRemoved: "Удалено из сохраненного: {name}",
    reviewDecisionSaved: "Отмечено: {name} · {action}",
  },
};

for (const [language, copy] of Object.entries(feedbackTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const searchExperienceTranslations = {
  "zh-CN": {
    searchSuggestions: "搜索建议",
    searchSuggestionEmpty: "没有候选，试试景点名、城市名、拼音或英文别名",
    noMatchesTitle: "没有找到匹配景点",
    noMatchesBody: "可以换一个景点名、城市名、拼音或英文别名，也可以放宽当前筛选条件。",
    noMatchesClearSearch: "清空搜索",
    noMatchesResetFilters: "重置筛选",
  },
  "zh-TW": {
    searchSuggestions: "搜尋建議",
    searchSuggestionEmpty: "沒有候選，試試景點名、城市名、拼音或英文別名",
    noMatchesTitle: "沒有找到符合景點",
    noMatchesBody: "可以換一個景點名、城市名、拼音或英文別名，也可以放寬目前篩選條件。",
    noMatchesClearSearch: "清除搜尋",
    noMatchesResetFilters: "重置篩選",
  },
  en: {
    searchSuggestions: "Search suggestions",
    searchSuggestionEmpty: "No suggestions. Try an attraction, city, pinyin, or English alias",
    noMatchesTitle: "No matching attractions",
    noMatchesBody: "Try another attraction, city, pinyin, or English alias, or loosen the current filters.",
    noMatchesClearSearch: "Clear search",
    noMatchesResetFilters: "Reset filters",
  },
  ko: {
    searchSuggestions: "검색 제안",
    searchSuggestionEmpty: "제안이 없습니다. 명소, 도시, 병음 또는 영어 별명을 입력해 보세요",
    noMatchesTitle: "일치하는 명소가 없습니다",
    noMatchesBody: "다른 명소, 도시, 병음 또는 영어 별명을 입력하거나 현재 필터를 완화해 보세요.",
    noMatchesClearSearch: "검색 지우기",
    noMatchesResetFilters: "필터 초기화",
  },
  ja: {
    searchSuggestions: "検索候補",
    searchSuggestionEmpty: "候補がありません。観光地、都市、ピンイン、英語別名を試してください",
    noMatchesTitle: "一致する観光地がありません",
    noMatchesBody: "別の観光地、都市、ピンイン、英語別名を試すか、現在のフィルターを緩めてください。",
    noMatchesClearSearch: "検索をクリア",
    noMatchesResetFilters: "フィルターをリセット",
  },
  th: {
    searchSuggestions: "คำแนะนำการค้นหา",
    searchSuggestionEmpty: "ไม่พบคำแนะนำ ลองใช้ชื่อสถานที่ เมือง พินอิน หรือชื่อภาษาอังกฤษ",
    noMatchesTitle: "ไม่พบแหล่งท่องเที่ยวที่ตรงกัน",
    noMatchesBody: "ลองใช้ชื่อสถานที่ เมือง พินอิน หรือชื่อภาษาอังกฤษอื่น หรือผ่อนตัวกรองปัจจุบัน",
    noMatchesClearSearch: "ล้างการค้นหา",
    noMatchesResetFilters: "รีเซ็ตตัวกรอง",
  },
  es: {
    searchSuggestions: "Sugerencias de búsqueda",
    searchSuggestionEmpty: "Sin sugerencias. Prueba una atracción, ciudad, pinyin o alias en inglés",
    noMatchesTitle: "No hay atracciones coincidentes",
    noMatchesBody: "Prueba otra atracción, ciudad, pinyin o alias en inglés, o relaja los filtros actuales.",
    noMatchesClearSearch: "Borrar búsqueda",
    noMatchesResetFilters: "Restablecer filtros",
  },
  ru: {
    searchSuggestions: "Поисковые подсказки",
    searchSuggestionEmpty: "Нет подсказок. Попробуйте название, город, пиньинь или английский псевдоним",
    noMatchesTitle: "Совпадений не найдено",
    noMatchesBody: "Попробуйте другое место, город, пиньинь или английский псевдоним либо ослабьте фильтры.",
    noMatchesClearSearch: "Очистить поиск",
    noMatchesResetFilters: "Сбросить фильтры",
  },
};

for (const [language, copy] of Object.entries(searchExperienceTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const qualityTranslations = {
  "zh-CN": {
    trustProgressTitle: "可信度进度",
    trustCoordinateProgress: "坐标精确率",
    trustImageProgress: "图片覆盖率",
    trustSourceProgress: "来源覆盖率",
    trustReviewProgress: "维护覆盖率",
  },
  "zh-TW": {
    trustProgressTitle: "可信度進度",
    trustCoordinateProgress: "座標精確率",
    trustImageProgress: "圖片覆蓋率",
    trustSourceProgress: "來源覆蓋率",
    trustReviewProgress: "維護覆蓋率",
  },
  en: {
    trustProgressTitle: "Trust Progress",
    trustCoordinateProgress: "Exact coordinates",
    trustImageProgress: "Image coverage",
    trustSourceProgress: "Source coverage",
    trustReviewProgress: "Review coverage",
  },
  ko: {
    trustProgressTitle: "신뢰도 진행률",
    trustCoordinateProgress: "정확 좌표율",
    trustImageProgress: "이미지 적용률",
    trustSourceProgress: "출처 적용률",
    trustReviewProgress: "검토 적용률",
  },
  ja: {
    trustProgressTitle: "信頼性の進捗",
    trustCoordinateProgress: "正確な座標率",
    trustImageProgress: "画像カバー率",
    trustSourceProgress: "出典カバー率",
    trustReviewProgress: "確認カバー率",
  },
  th: {
    trustProgressTitle: "ความคืบหน้าความน่าเชื่อถือ",
    trustCoordinateProgress: "พิกัดแม่นยำ",
    trustImageProgress: "ความครอบคลุมรูป",
    trustSourceProgress: "ความครอบคลุมแหล่งที่มา",
    trustReviewProgress: "ความครอบคลุมการตรวจ",
  },
  es: {
    trustProgressTitle: "Progreso de confianza",
    trustCoordinateProgress: "Coordenadas exactas",
    trustImageProgress: "Cobertura de imágenes",
    trustSourceProgress: "Cobertura de fuentes",
    trustReviewProgress: "Cobertura de revisión",
  },
  ru: {
    trustProgressTitle: "Прогресс доверия",
    trustCoordinateProgress: "Точные координаты",
    trustImageProgress: "Покрытие изображений",
    trustSourceProgress: "Покрытие источников",
    trustReviewProgress: "Покрытие проверок",
  },
};

for (const [language, copy] of Object.entries(qualityTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const actionableQualityTranslations = {
  "zh-CN": {
    reviewUnreviewedOnly: "未处理",
    maintenanceQueueUnknownSource: "未知来源",
    maintenanceQueueUnknownSourceDesc: "数据来源字段未能匹配来源索引",
  },
  "zh-TW": {
    reviewUnreviewedOnly: "未處理",
    maintenanceQueueUnknownSource: "未知來源",
    maintenanceQueueUnknownSourceDesc: "資料來源欄位未能匹配來源索引",
  },
  en: {
    reviewUnreviewedOnly: "Unreviewed",
    maintenanceQueueUnknownSource: "Unknown source",
    maintenanceQueueUnknownSourceDesc: "Source key does not match the source index",
  },
  ko: {
    reviewUnreviewedOnly: "미검토",
    maintenanceQueueUnknownSource: "알 수 없는 출처",
    maintenanceQueueUnknownSourceDesc: "출처 키가 출처 색인과 일치하지 않음",
  },
  ja: {
    reviewUnreviewedOnly: "未確認",
    maintenanceQueueUnknownSource: "不明な出典",
    maintenanceQueueUnknownSourceDesc: "出典キーが出典索引と一致しません",
  },
  th: {
    reviewUnreviewedOnly: "ยังไม่ตรวจ",
    maintenanceQueueUnknownSource: "ไม่ทราบแหล่งที่มา",
    maintenanceQueueUnknownSourceDesc: "คีย์แหล่งที่มาไม่ตรงกับดัชนีแหล่งข้อมูล",
  },
  es: {
    reviewUnreviewedOnly: "Sin revisar",
    maintenanceQueueUnknownSource: "Fuente desconocida",
    maintenanceQueueUnknownSourceDesc: "La clave de fuente no coincide con el índice",
  },
  ru: {
    reviewUnreviewedOnly: "Не проверено",
    maintenanceQueueUnknownSource: "Неизвестный источник",
    maintenanceQueueUnknownSourceDesc: "Ключ источника не найден в индексе",
  },
};

for (const [language, copy] of Object.entries(actionableQualityTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const reviewQueueTranslations = {
  "zh-CN": {
    reviewQueueOverview: "图片维护队列",
    reviewLowPrecision: "低精度",
  },
  "zh-TW": {
    reviewQueueOverview: "圖片維護佇列",
    reviewLowPrecision: "低精度",
  },
  en: {
    reviewQueueOverview: "Image review queue",
    reviewLowPrecision: "Low precision",
  },
  ko: {
    reviewQueueOverview: "이미지 검토 대기열",
    reviewLowPrecision: "낮은 정밀도",
  },
  ja: {
    reviewQueueOverview: "画像レビューキュー",
    reviewLowPrecision: "低精度",
  },
  th: {
    reviewQueueOverview: "คิวตรวจทานรูปภาพ",
    reviewLowPrecision: "ความแม่นยำต่ำ",
  },
  es: {
    reviewQueueOverview: "Cola de revisión de imágenes",
    reviewLowPrecision: "Baja precisión",
  },
  ru: {
    reviewQueueOverview: "Очередь проверки изображений",
    reviewLowPrecision: "Низкая точность",
  },
};

for (const [language, copy] of Object.entries(reviewQueueTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const detailTrustTranslations = {
  "zh-CN": { reviewPending: "待处理" },
  "zh-TW": { reviewPending: "待處理" },
  en: { reviewPending: "Pending review" },
  ko: { reviewPending: "검토 대기" },
  ja: { reviewPending: "確認待ち" },
  th: { reviewPending: "รอตรวจทาน" },
  es: { reviewPending: "Pendiente de revisión" },
  ru: { reviewPending: "Ожидает проверки" },
};

for (const [language, copy] of Object.entries(detailTrustTranslations)) {
  translations[language] = { ...(translations[language] || {}), ...copy };
}

const imageMaintenanceLanguageOverrides = {
  "zh-CN": {
    trustReviewed: "维护记录",
    imageReview: "图片维护",
    closeImageReview: "关闭图片维护",
    reviewFilter: "图片维护状态",
    reviewNoSelection: "选择一张图片开始维护",
    reviewImported: "维护记录已导入",
    reviewApplyHint: "导出维护包后可用 scripts/apply-maintenance-package.py 一次写入图片维护记录和维护覆盖。",
    reviewNoMatches: "没有匹配的维护项",
    reviewExported: "维护记录已导出",
    aboutImageBody: "本地插图保留来源；缺图和疑似错图可通过图片维护面板继续记录和替换。",
    trustReviewProgress: "维护覆盖率",
    reviewUnreviewedOnly: "未处理",
    reviewQueueOverview: "图片维护队列",
    reviewPending: "待处理",
    reviewDecisionSaved: "已记录：{name} · {action}",
  },
  "zh-TW": {
    trustReviewed: "維護記錄",
    imageReview: "圖片維護",
    closeImageReview: "關閉圖片維護",
    reviewFilter: "圖片維護狀態",
    reviewNoSelection: "選擇一張圖片開始維護",
    reviewImported: "維護記錄已匯入",
    reviewApplyHint: "匯出維護包後可用 scripts/apply-maintenance-package.py 一次寫入圖片維護記錄和維護覆蓋。",
    reviewNoMatches: "沒有符合的維護項",
    reviewExported: "維護記錄已匯出",
    aboutImageBody: "本地插圖保留來源；缺圖和疑似錯圖可透過圖片維護面板繼續記錄和替換。",
    trustReviewProgress: "維護覆蓋率",
    reviewUnreviewedOnly: "未處理",
    reviewQueueOverview: "圖片維護佇列",
    reviewPending: "待處理",
    reviewDecisionSaved: "已記錄：{name} · {action}",
  },
  en: {
    trustReviewed: "Maintenance records",
    imageReview: "Image maintenance",
    closeImageReview: "Close image maintenance",
    reviewFilter: "Image maintenance status",
    reviewNoSelection: "Select an image to maintain",
    reviewImported: "Maintenance records imported",
    reviewApplyHint:
      "After exporting a maintenance package, run scripts/apply-maintenance-package.py to write image maintenance records and maintenance overrides.",
    reviewNoMatches: "No matching maintenance items",
    reviewExported: "Maintenance records exported",
    aboutImageBody:
      "Local illustrations keep attribution; missing or suspicious images can be recorded and replaced through the image maintenance panel.",
    trustReviewProgress: "Maintenance coverage",
    reviewUnreviewedOnly: "Unprocessed",
    reviewQueueOverview: "Image maintenance queue",
    reviewPending: "Pending action",
    reviewDecisionSaved: "Recorded: {name} · {action}",
  },
  ko: {
    trustReviewed: "유지관리 기록",
    imageReview: "이미지 유지관리",
    closeImageReview: "이미지 유지관리 닫기",
    reviewFilter: "이미지 유지관리 상태",
    reviewNoSelection: "유지관리할 이미지를 선택하세요",
    reviewImported: "유지관리 기록을 가져왔습니다",
    reviewApplyHint:
      "유지관리 패키지를 내보낸 뒤 scripts/apply-maintenance-package.py로 이미지 유지관리 기록과 유지관리 덮어쓰기를 한 번에 기록할 수 있습니다.",
    reviewNoMatches: "일치하는 유지관리 항목이 없습니다",
    reviewExported: "유지관리 기록을 내보냈습니다",
    aboutImageBody:
      "로컬 이미지는 출처를 보존하며, 누락 또는 의심 이미지는 이미지 유지관리 패널에서 기록하고 교체할 수 있습니다.",
    trustReviewProgress: "유지관리 적용률",
    reviewUnreviewedOnly: "미처리",
    reviewQueueOverview: "이미지 유지관리 대기열",
    reviewPending: "처리 대기",
    reviewDecisionSaved: "기록됨: {name} · {action}",
  },
  ja: {
    trustReviewed: "メンテナンス記録",
    imageReview: "画像メンテナンス",
    closeImageReview: "画像メンテナンスを閉じる",
    reviewFilter: "画像メンテナンス状態",
    reviewNoSelection: "メンテナンスする画像を選択",
    reviewImported: "メンテナンス記録をインポートしました",
    reviewApplyHint:
      "メンテナンスパッケージを書き出した後、scripts/apply-maintenance-package.py で画像メンテナンス記録とメンテナンス上書きを一度に書き込めます。",
    reviewNoMatches: "一致するメンテナンス項目がありません",
    reviewExported: "メンテナンス記録をエクスポートしました",
    aboutImageBody:
      "ローカル画像は出典を保持し、欠落または疑わしい画像は画像メンテナンスパネルで記録して差し替えられます。",
    trustReviewProgress: "メンテナンス適用率",
    reviewUnreviewedOnly: "未処理",
    reviewQueueOverview: "画像メンテナンスキュー",
    reviewPending: "処理待ち",
    reviewDecisionSaved: "記録しました：{name} · {action}",
  },
  th: {
    trustReviewed: "บันทึกดูแลรูปภาพ",
    imageReview: "ดูแลรูปภาพ",
    closeImageReview: "ปิดการดูแลรูปภาพ",
    reviewFilter: "สถานะดูแลรูปภาพ",
    reviewNoSelection: "เลือกรูปภาพเพื่อดูแล",
    reviewImported: "นำเข้าบันทึกดูแลแล้ว",
    reviewApplyHint:
      "หลังส่งออกแพ็กเกจดูแลข้อมูล ใช้ scripts/apply-maintenance-package.py เพื่อเขียนบันทึกดูแลรูปภาพและข้อมูลแก้ไขพร้อมกัน",
    reviewNoMatches: "ไม่มีรายการดูแลที่ตรงกัน",
    reviewExported: "ส่งออกบันทึกดูแลแล้ว",
    aboutImageBody:
      "รูปภาพในเครื่องเก็บที่มาไว้ครบถ้วน รูปที่ขาดหายหรือน่าสงสัยสามารถบันทึกและแทนที่ผ่านแผงดูแลรูปภาพ",
    trustReviewProgress: "ความครอบคลุมการดูแล",
    reviewUnreviewedOnly: "ยังไม่จัดการ",
    reviewQueueOverview: "คิวดูแลรูปภาพ",
    reviewPending: "รอดำเนินการ",
    reviewDecisionSaved: "บันทึกแล้ว: {name} · {action}",
  },
  es: {
    trustReviewed: "Registros de mantenimiento",
    imageReview: "Mantenimiento de imágenes",
    closeImageReview: "Cerrar mantenimiento de imágenes",
    reviewFilter: "Estado de mantenimiento de imágenes",
    reviewNoSelection: "Selecciona una imagen para mantener",
    reviewImported: "Registros de mantenimiento importados",
    reviewApplyHint:
      "Tras exportar un paquete de mantenimiento, usa scripts/apply-maintenance-package.py para escribir los registros de imagen y las correcciones.",
    reviewNoMatches: "No hay elementos de mantenimiento coincidentes",
    reviewExported: "Registros de mantenimiento exportados",
    aboutImageBody:
      "Las imágenes locales conservan atribución; las faltantes o sospechosas se pueden registrar y reemplazar desde el panel de mantenimiento.",
    trustReviewProgress: "Cobertura de mantenimiento",
    reviewUnreviewedOnly: "Sin procesar",
    reviewQueueOverview: "Cola de mantenimiento de imágenes",
    reviewPending: "Acción pendiente",
    reviewDecisionSaved: "Registrado: {name} · {action}",
  },
  ru: {
    trustReviewed: "Записи обслуживания",
    imageReview: "Обслуживание изображений",
    closeImageReview: "Закрыть обслуживание изображений",
    reviewFilter: "Статус обслуживания изображений",
    reviewNoSelection: "Выберите изображение для обслуживания",
    reviewImported: "Записи обслуживания импортированы",
    reviewApplyHint:
      "После экспорта пакета обслуживания используйте scripts/apply-maintenance-package.py, чтобы записать обслуживание изображений и правки.",
    reviewNoMatches: "Нет подходящих элементов обслуживания",
    reviewExported: "Записи обслуживания экспортированы",
    aboutImageBody:
      "Локальные изображения сохраняют атрибуцию; отсутствующие или сомнительные изображения можно записывать и заменять через панель обслуживания.",
    trustReviewProgress: "Покрытие обслуживания",
    reviewUnreviewedOnly: "Не обработано",
    reviewQueueOverview: "Очередь обслуживания изображений",
    reviewPending: "Ожидает действия",
    reviewDecisionSaved: "Записано: {name} · {action}",
  },
};

for (const [language, copy] of Object.entries(imageMaintenanceLanguageOverrides)) {
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
  { category: "red", pattern: /红色|紅色|革命|烈士|八路军|八路軍|新四军|新四軍|长征|長征|会址|會址|旧址|舊址|纪念园|紀念園/ },
  { category: "religious", pattern: /寺|庙|廟|观|觀|宫|宮|祠|坛|壇|佛|道教|石窟|石刻|清真|塔/ },
  { category: "settlement", pattern: /古镇|古鎮|古村|老街|街区|街區|民俗|村|寨|土楼|土樓|部落/ },
  { category: "heritage", pattern: /古城|园林|園林|府|宫|宮|城墙|城牆|陵|庙|廟|寺|祠|坛|壇|塔|楼|樓|关|關|窟|石刻|遗址|遺址|古堡|长城|長城|布达拉|布達拉|莫高窟|中正纪念堂|中正紀念堂/ },
  { category: "water", pattern: /湖|潭|海|湾|灣|港|江|河|溪|瀑|泉|湿地|濕地|岛|島|海岸|漂流|水/ },
  { category: "nature", pattern: /山|峰|岭|嶺|峡|峽|谷|岩|石林|地质|地質|丹霞|喀斯特|洞|沟|溝|坡|天池|草原|沙|胡杨|胡楊|森林|林|国家公园|國家公園/ },
];

const chinaBounds = L.latLngBounds([18, 73], [54, 135]);
const state = {
  search: "",
  province: allRegionsValue,
  category: "all",
  theme: "all",
  season: "all",
  ratingFilters: new Set(defaultRatingFilters),
  language: resolveInitialLanguage(),
  selectedId: null,
  routeIds: [],
  favoriteIds: loadFavoriteIds(),
  distributionOpen: false,
  controlOpen: false,
  aboutOpen: false,
  imageReviewOpen: false,
  maintenanceOpen: false,
  reviewFilter: "all",
  reviewSearch: "",
  reviewSelectedId: null,
  reviewDecisions: loadReviewDecisions(),
  maintenanceOverrides: loadMaintenanceOverrides(),
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  clearSearch: document.querySelector("#clearSearch"),
  provinceSelect: document.querySelector("#provinceSelect"),
  categorySelect: document.querySelector("#categorySelect"),
  themeSelect: document.querySelector("#themeSelect"),
  seasonSelect: document.querySelector("#seasonSelect"),
  fourANotice: document.querySelector("#fourANotice"),
  ratingFilterButtons: [...document.querySelectorAll("[data-rating-filter]")],
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
  randomAttraction: document.querySelector("#randomAttraction"),
  randomRegion: document.querySelector("#randomRegion"),
  buildRoute: document.querySelector("#buildRoute"),
  inspirationCaption: document.querySelector("#inspirationCaption"),
  inspirationRoute: document.querySelector("#inspirationRoute"),
  favoriteCount: document.querySelector("#favoriteCount"),
  favoriteList: document.querySelector("#favoriteList"),
  toggleControlPanel: document.querySelector("#toggleControlPanel"),
  closeControlPanel: document.querySelector("#closeControlPanel"),
  fitFiltered: document.querySelector("#fitFiltered"),
  toggleDistribution: document.querySelector("#toggleDistribution"),
  closeLegend: document.querySelector("#closeLegend"),
  distributionPanel: document.querySelector("#distributionPanel"),
  toggleImageReview: document.querySelector("#toggleImageReview"),
  toggleMaintenance: document.querySelector("#toggleMaintenance"),
  closeImageReview: document.querySelector("#closeImageReview"),
  imageReviewPanel: document.querySelector("#imageReviewPanel"),
  reviewSearch: document.querySelector("#reviewSearch"),
  reviewFilter: document.querySelector("#reviewFilter"),
  reviewQuickStats: document.querySelector("#reviewQuickStats"),
  reviewSummary: document.querySelector("#reviewSummary"),
  reviewList: document.querySelector("#reviewList"),
  reviewPreview: document.querySelector("#reviewPreview"),
  reviewNote: document.querySelector("#reviewNote"),
  reviewKeep: document.querySelector("#reviewKeep"),
  reviewReplace: document.querySelector("#reviewReplace"),
  reviewDelete: document.querySelector("#reviewDelete"),
  reviewMissing: document.querySelector("#reviewMissing"),
  reviewExport: document.querySelector("#reviewExport"),
  maintenanceExport: document.querySelector("#maintenanceExport"),
  reviewImportInput: document.querySelector("#reviewImportInput"),
  closeMaintenance: document.querySelector("#closeMaintenance"),
  maintenancePanel: document.querySelector("#maintenancePanel"),
  maintenanceSummary: document.querySelector("#maintenanceSummary"),
  maintenanceSelectedName: document.querySelector("#maintenanceSelectedName"),
  maintenanceQueueSummary: document.querySelector("#maintenanceQueueSummary"),
  maintenanceQueueList: document.querySelector("#maintenanceQueueList"),
  maintenanceLat: document.querySelector("#maintenanceLat"),
  maintenanceLng: document.querySelector("#maintenanceLng"),
  maintenanceCoordinateLevel: document.querySelector("#maintenanceCoordinateLevel"),
  maintenanceCoordinateLabel: document.querySelector("#maintenanceCoordinateLabel"),
  maintenanceCategory: document.querySelector("#maintenanceCategory"),
  maintenanceSourceKey: document.querySelector("#maintenanceSourceKey"),
  maintenanceDataUpdated: document.querySelector("#maintenanceDataUpdated"),
  maintenanceThemes: document.querySelector("#maintenanceThemes"),
  maintenanceSeasons: document.querySelector("#maintenanceSeasons"),
  maintenanceNote: document.querySelector("#maintenanceNote"),
  maintenanceSave: document.querySelector("#maintenanceSave"),
  maintenanceDelete: document.querySelector("#maintenanceDelete"),
  maintenanceExportOverrides: document.querySelector("#maintenanceExportOverrides"),
  maintenanceExportAudit: document.querySelector("#maintenanceExportAudit"),
  maintenanceImportInput: document.querySelector("#maintenanceImportInput"),
  provinceBars: document.querySelector("#provinceBars"),
  distributionCaption: document.querySelector("#distributionCaption"),
  legendOfficialStat: document.querySelector("#legendOfficialStat"),
  legendOfficial4AStat: document.querySelector("#legendOfficial4AStat"),
  legendPeerStat: document.querySelector("#legendPeerStat"),
  legendRegionStat: document.querySelector("#legendRegionStat"),
  trustMetricCaption: document.querySelector("#trustMetricCaption"),
  trustExactStat: document.querySelector("#trustExactStat"),
  trustApproxStat: document.querySelector("#trustApproxStat"),
  trustImageStat: document.querySelector("#trustImageStat"),
  trustReviewStat: document.querySelector("#trustReviewStat"),
  trustProgressList: document.querySelector("#trustProgressList"),
  detailPanel: document.querySelector("#detailPanel"),
  closeDetail: document.querySelector("#closeDetail"),
  detailProvince: document.querySelector("#detailProvince"),
  detailName: document.querySelector("#detailName"),
  detailDescription: document.querySelector("#detailDescription"),
  detailTrustChecks: document.querySelector("#detailTrustChecks"),
  detailImage: document.querySelector("#detailImage"),
  detailVisual: document.querySelector(".detail-visual"),
  detailImageLink: document.querySelector("#detailImageLink"),
  detailYear: document.querySelector("#detailYear"),
  detailCoordinatePrecision: document.querySelector("#detailCoordinatePrecision"),
  detailDataSource: document.querySelector("#detailDataSource"),
  detailDataUpdated: document.querySelector("#detailDataUpdated"),
  detailAuditStatus: document.querySelector("#detailAuditStatus"),
  detailFootprint: document.querySelector("#detailFootprint"),
  detailFootprintRow: document.querySelector("#detailFootprint")?.closest("div"),
  focusSelected: document.querySelector("#focusSelected"),
  filterProvince: document.querySelector("#filterProvince"),
  toggleFavorite: document.querySelector("#toggleFavorite"),
  relatedList: document.querySelector("#relatedList"),
  relatedCaption: document.querySelector("#relatedCaption"),
  sourceIndexList: document.querySelector("#sourceIndexList"),
  toastMessage: document.querySelector("#toastMessage"),
  searchSuggestions: document.querySelector("#searchSuggestions"),
};

let toastTimer = 0;
let searchSuggestionIndex = -1;
let currentSearchSuggestions = [];

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
map.createPane("routePane");
map.getPane("routePane").style.zIndex = 610;
map.getPane("routePane").style.pointerEvents = "none";

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
        iconCreateFunction: (cluster) => clusterIcon(cluster),
      })
    : L.layerGroup();

markerLayer.addTo(map);
const routeLayer = L.layerGroup().addTo(map);

const markersById = new Map();
const attractionsById = new Map(attractions.map((item) => [item.id, item]));
const originalAttractionsById = new Map(attractions.map((item) => [item.id, { ...item }]));
const attractionCategoryCache = new Map();
const attractionThemeCache = new Map();
const attractionSeasonCache = new Map();
const attractionSearchAliasCache = new Map();
const footprintCache = new Map();
const correctedCentersById = new Map();
const selectionLayer = L.layerGroup().addTo(map);
let activeFootprintRequest = 0;

function init() {
  applyMaintenanceOverridesToAttractions();
  hydrateAttractionTrustMetadata();
  applyLanguage();
  renderBaseStats();
  populateProvinceSelect();
  populateCategorySelect();
  populateThemeSelect();
  populateSeasonSelect();
  populateReviewFilter();
  populateMaintenanceSelects();
  renderSourceIndex();
  bindEvents();
  syncRatingFilterButtons();
  syncControlPanel();
  syncDistributionPanel();
  syncImageReviewPanel();
  syncMaintenancePanel();
  render();
  fitTo(getFilteredAttractions());

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

function hydrateAttractionTrustMetadata() {
  attractions.forEach((item) => {
    item.sourceKey = item.sourceKey || attractionSourceKey(item);
    item.dataUpdated = item.dataUpdated || sourceUpdatedAt(sourceIndex.sources?.[item.sourceKey]);
    item.coordinateAuditStatus = item.coordinateAuditStatus || coordinateAuditStatusKey(item);
  });
}

function populateCategorySelect() {
  if (!els.categorySelect) return;
  els.categorySelect.innerHTML = categoryFilterOrder
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(categoryLabel(category))}</option>`)
    .join("");
  els.categorySelect.value = state.category;
}

function populateThemeSelect() {
  if (!els.themeSelect) return;
  els.themeSelect.innerHTML = themeFilterOrder
    .map((theme) => `<option value="${escapeHtml(theme)}">${escapeHtml(themeLabel(theme))}</option>`)
    .join("");
  els.themeSelect.value = state.theme;
}

function populateSeasonSelect() {
  if (!els.seasonSelect) return;
  els.seasonSelect.innerHTML = seasonFilterOrder
    .map((season) => `<option value="${escapeHtml(season)}">${escapeHtml(seasonLabel(season))}</option>`)
    .join("");
  els.seasonSelect.value = state.season;
}

function populateReviewFilter() {
  if (!els.reviewFilter) return;
  const filters = [
    ["all", t("reviewAll")],
    ["unreviewed", t("reviewUnreviewedOnly")],
    ["missing", t("reviewMissingOnly")],
    ["suspicious", t("reviewSuspiciousOnly")],
    ["withImage", t("reviewWithImage")],
    ["lowPrecision", t("reviewLowPrecision")],
    ["flagged", t("reviewFlagged")],
  ];
  els.reviewFilter.innerHTML = filters
    .map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`)
    .join("");
  els.reviewFilter.value = state.reviewFilter;
}

function renderSourceIndex() {
  if (!els.sourceIndexList) return;
  const sources = sourceIndex.sources || {};
  const announcementSourceKeys = Object.values(sourceIndex.officialAnnouncementSources || {}).flat();
  const sourceKeys = [...new Set(["mct-official-5a", ...announcementSourceKeys, "open-4a-list", "city-geo", "openstreetmap"])];
  els.sourceIndexList.innerHTML = sourceKeys
    .filter((key) => sources[key])
    .map((key) => {
      const source = sources[key];
      const links = sourceUrls(source);
      const href = links[0] || "";
      const label = sourceLabel(source);
      const note = sourceNote(source);
      const metaText = [source.type, source.updatedAt || sourceIndex.updatedAt].filter(Boolean).join(" · ");
      const title = href
        ? `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`
        : `<span>${escapeHtml(label)}</span>`;
      const linkList =
        links.length > 1
          ? `<div class="source-index-links">${links
              .map(
                (url, index) =>
                  `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(`${label} ${index + 1}`)}">${index + 1}</a>`,
              )
              .join("")}</div>`
          : "";
      return `
        <article class="source-index-item">
          <div class="source-index-main">
            ${title}
            <small>${escapeHtml(metaText)}</small>
          </div>
          ${note ? `<p>${escapeHtml(note)}</p>` : ""}
          ${linkList}
        </article>
      `;
    })
    .join("");
}

function renderSearchSuggestions() {
  if (!els.searchSuggestions) return;
  const query = normalize(state.search);
  const isSearchFocused = document.activeElement === els.searchInput;
  if (!query || !isSearchFocused) {
    closeSearchSuggestions();
    return;
  }

  const items = getSearchSuggestionItems(query);
  currentSearchSuggestions = items;
  searchSuggestionIndex = items.length ? Math.min(searchSuggestionIndex, items.length - 1) : -1;
  els.searchSuggestions.hidden = false;
  els.searchSuggestions.classList.add("show");
  els.searchInput.setAttribute("aria-expanded", "true");

  if (!items.length) {
    els.searchSuggestions.innerHTML = `<p class="search-suggestion-empty">${escapeHtml(t("searchSuggestionEmpty"))}</p>`;
    els.searchInput.removeAttribute("aria-activedescendant");
    return;
  }

  els.searchSuggestions.innerHTML = items
    .map(
      (item, index) => `
        <button class="search-suggestion" id="searchSuggestion-${index}" type="button" role="option" aria-selected="${
          index === searchSuggestionIndex
        }" data-id="${escapeHtml(item.id)}">
          <span>
            <strong>${escapeHtml(displayAttractionName(item))}</strong>
            <small>${escapeHtml(attractionLocationLabel(item))} · ${escapeHtml(ratingMeta(item))}</small>
          </span>
          <em>${escapeHtml(ratingBadge(item))}</em>
        </button>
      `,
    )
    .join("");

  els.searchSuggestions.querySelectorAll("[data-id]").forEach((button, index) => {
    button.addEventListener("mouseenter", () => {
      searchSuggestionIndex = index;
      syncActiveSearchSuggestion();
    });
    button.addEventListener("click", () => {
      selectSearchSuggestion(currentSearchSuggestions[index]);
    });
  });
  syncActiveSearchSuggestion();
}

function getSearchSuggestionItems(query) {
  return attractions
    .map((item) => ({
      item,
      score: searchSuggestionScore(item, query),
    }))
    .filter((row) => row.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        ratingSuggestionRank(b.item) - ratingSuggestionRank(a.item) ||
        displayAttractionName(a.item).localeCompare(displayAttractionName(b.item), "zh-CN"),
    )
    .slice(0, searchSuggestionLimit)
    .map((row) => row.item);
}

function searchSuggestionScore(item, query) {
  const names = normalize([displayAttractionName(item), item.name, item.displayName, ...Object.values(localizedAttractionNames[item.id] || {})].join(" "));
  const location = normalize([attractionLocationLabel(item), item.city, item.province, ...regionSearchNames(item.province)].join(" "));
  const aliases = normalize(searchAliases(item).join(" "));
  let score = 0;
  if (names === query) score = 150;
  else if (names.startsWith(query)) score = 120;
  else if (names.includes(query)) score = 96;
  else if (location.includes(query)) score = 74;
  else if (aliases.includes(query)) score = 66;
  else if (attractionSearchText(item).includes(query)) score = 48;
  if (!score) return 0;
  if (coordinatePrecisionClass(item) === "precision-exact") score += 5;
  return score + ratingSuggestionRank(item);
}

function ratingSuggestionRank(item) {
  if (item.rating === "official5A") return 9;
  if (item.rating === "peer5A") return 6;
  return 3;
}

function handleSearchSuggestionKeydown(event) {
  if (!state.search && event.key !== "Escape") return;
  if (event.key === "Escape") {
    closeSearchSuggestions();
    return;
  }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (els.searchSuggestions.hidden) {
      renderSearchSuggestions();
    }
    moveSearchSuggestion(event.key === "ArrowDown" ? 1 : -1);
    return;
  }
  if (event.key === "Enter" && !els.searchSuggestions.hidden && searchSuggestionIndex >= 0) {
    event.preventDefault();
    selectSearchSuggestion(currentSearchSuggestions[searchSuggestionIndex]);
  }
}

function moveSearchSuggestion(delta) {
  if (!currentSearchSuggestions.length) return;
  const nextIndex = searchSuggestionIndex < 0 ? (delta > 0 ? 0 : currentSearchSuggestions.length - 1) : searchSuggestionIndex + delta;
  searchSuggestionIndex = (nextIndex + currentSearchSuggestions.length) % currentSearchSuggestions.length;
  syncActiveSearchSuggestion();
}

function syncActiveSearchSuggestion() {
  if (!els.searchSuggestions) return;
  els.searchSuggestions.querySelectorAll(".search-suggestion").forEach((button, index) => {
    const active = index === searchSuggestionIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (searchSuggestionIndex >= 0) {
    els.searchInput.setAttribute("aria-activedescendant", `searchSuggestion-${searchSuggestionIndex}`);
  } else {
    els.searchInput.removeAttribute("aria-activedescendant");
  }
}

function closeSearchSuggestions() {
  if (!els.searchSuggestions) return;
  currentSearchSuggestions = [];
  searchSuggestionIndex = -1;
  els.searchSuggestions.classList.remove("show");
  els.searchSuggestions.hidden = true;
  els.searchInput.setAttribute("aria-expanded", "false");
  els.searchInput.removeAttribute("aria-activedescendant");
}

function selectSearchSuggestion(item) {
  if (!item) return;
  const label = displayAttractionName(item);
  state.search = label;
  state.routeIds = [];
  els.searchInput.value = label;
  ensureSuggestionCanRender(item);
  closeSearchSuggestions();
  render();
  selectAttraction(item, { skipRender: true });
  focusAttraction(item, true);
}

function ensureSuggestionCanRender(item) {
  state.ratingFilters.add(item.rating);
  if (state.province !== allRegionsValue && item.province !== state.province) {
    state.province = allRegionsValue;
    els.provinceSelect.value = state.province;
  }
  if (state.category !== "all" && attractionCategory(item) !== state.category) {
    state.category = "all";
    els.categorySelect.value = state.category;
  }
  if (state.theme !== "all" && !attractionThemes(item).includes(state.theme)) {
    state.theme = "all";
    els.themeSelect.value = state.theme;
  }
  if (state.season !== "all" && !attractionSeasons(item).includes(state.season)) {
    state.season = "all";
    els.seasonSelect.value = state.season;
  }
  syncRatingFilterButtons();
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
    state.routeIds = [];
    searchSuggestionIndex = -1;
    render();
    renderSearchSuggestions();
  });

  els.searchInput.addEventListener("focus", () => {
    renderSearchSuggestions();
  });

  els.searchInput.addEventListener("keydown", handleSearchSuggestionKeydown);

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-shell")) {
      closeSearchSuggestions();
    }
  });

  els.attractionList.addEventListener("click", handleAttractionListClick);

  els.clearSearch.addEventListener("click", () => {
    clearSearch();
    els.searchInput.focus();
  });

  els.provinceSelect.addEventListener("change", (event) => {
    state.province = event.target.value;
    state.routeIds = [];
    render();
    fitTo(getFilteredAttractions());
  });

  els.categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    state.routeIds = [];
    render();
    fitTo(getFilteredAttractions());
  });

  els.themeSelect.addEventListener("change", (event) => {
    state.theme = event.target.value;
    state.routeIds = [];
    render();
    fitTo(getFilteredAttractions());
  });

  els.seasonSelect.addEventListener("change", (event) => {
    state.season = event.target.value;
    state.routeIds = [];
    render();
    fitTo(getFilteredAttractions());
  });

  els.ratingFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleRatingFilter(button.dataset.ratingFilter);
      state.routeIds = [];
      render();
      fitTo(getFilteredAttractions());
    });
  });

  els.resetFilters.addEventListener("click", () => {
    resetFiltersToDefault();
  });

  els.randomAttraction?.addEventListener("click", () => randomSelectAttraction());
  els.randomRegion?.addEventListener("click", () => randomSelectRegion());

  els.buildRoute?.addEventListener("click", () => {
    buildInspirationRoute();
    const routeItems = routeAttractions();
    if (routeItems.length) fitTo(routeItems);
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

  els.toggleImageReview.addEventListener("click", () => {
    setImageReviewOpen(!state.imageReviewOpen);
  });

  els.closeImageReview.addEventListener("click", () => {
    setImageReviewOpen(false);
  });

  els.reviewQuickStats?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-filter]");
    if (!button) return;
    state.reviewFilter = button.dataset.reviewFilter;
    if (els.reviewFilter) els.reviewFilter.value = state.reviewFilter;
    renderImageReview();
  });

  els.toggleMaintenance?.addEventListener("click", () => {
    setMaintenanceOpen(!state.maintenanceOpen);
  });

  els.closeMaintenance?.addEventListener("click", () => {
    setMaintenanceOpen(false);
  });

  els.reviewSearch.addEventListener("input", (event) => {
    state.reviewSearch = event.target.value.trim();
    renderImageReview();
  });

  els.reviewFilter.addEventListener("change", (event) => {
    state.reviewFilter = event.target.value;
    renderImageReview();
  });

  els.reviewKeep.addEventListener("click", () => recordReviewDecision("keep"));
  els.reviewReplace.addEventListener("click", () => recordReviewDecision("replace"));
  els.reviewDelete.addEventListener("click", () => recordReviewDecision("delete"));
  els.reviewMissing.addEventListener("click", () => recordReviewDecision("missing"));
  els.reviewExport.addEventListener("click", exportReviewDecisions);
  els.maintenanceExport?.addEventListener("click", exportMaintenancePackage);
  els.reviewImportInput?.addEventListener("change", importReviewDecisions);
  els.maintenanceSave?.addEventListener("click", saveSelectedMaintenanceOverride);
  els.maintenanceDelete?.addEventListener("click", deleteSelectedMaintenanceOverride);
  els.maintenanceExportOverrides?.addEventListener("click", exportMaintenanceOverrides);
  els.maintenanceExportAudit?.addEventListener("click", exportMaintenanceAuditReport);
  els.maintenanceImportInput?.addEventListener("change", importMaintenanceOverrides);
  els.maintenanceQueueList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-maintenance-queue]");
    if (!button || button.disabled) return;
    jumpToMaintenanceQueue(button.dataset.maintenanceQueue);
  });
  els.trustProgressList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-trust-action]");
    if (!button || button.disabled) return;
    handleTrustProgressAction(button.dataset.trustAction);
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
    state.routeIds = [];
    els.provinceSelect.value = selected.province;
    render();
    fitTo(getFilteredAttractions());
  });

  els.toggleFavorite?.addEventListener("click", () => {
    const selected = getSelected();
    if (selected) toggleFavorite(selected.id);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.aboutOpen) {
        setAboutOpen(false);
      } else if (state.maintenanceOpen) {
        setMaintenanceOpen(false);
      } else if (state.imageReviewOpen) {
        setImageReviewOpen(false);
      } else if (getSelected()) {
        selectAttraction(null);
      } else if (state.distributionOpen) {
        setDistributionOpen(false);
      }
    }
  });

  map.on("zoomend", () => {
    render();
  });
}

function setLanguage(language) {
  if (!languages[language] || language === state.language) return;
  state.language = language;

  applyLanguage();
  populateProvinceSelect();
  populateCategorySelect();
  populateThemeSelect();
  populateSeasonSelect();
  populateReviewFilter();
  populateMaintenanceSelects();
  renderSourceIndex();
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
  syncImageReviewPanel();
  syncMaintenancePanel();
  renderImageReview();
  renderMaintenancePanel();
  renderSearchSuggestions();
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

function setImageReviewOpen(open) {
  state.imageReviewOpen = open;
  if (open && state.maintenanceOpen) {
    setMaintenanceOpen(false);
  }
  syncImageReviewPanel();
  if (open) {
    renderImageReview();
  }
}

function syncImageReviewPanel() {
  if (!els.imageReviewPanel) return;
  els.imageReviewPanel.classList.toggle("collapsed", !state.imageReviewOpen);
  els.toggleImageReview.setAttribute("aria-expanded", String(state.imageReviewOpen));
  els.toggleImageReview.classList.toggle("active", state.imageReviewOpen);
}

function setMaintenanceOpen(open) {
  state.maintenanceOpen = open;
  if (open && state.imageReviewOpen) {
    setImageReviewOpen(false);
  }
  syncMaintenancePanel();
  if (open) {
    renderMaintenancePanel();
  }
}

function syncMaintenancePanel() {
  if (!els.maintenancePanel) return;
  els.maintenancePanel.classList.toggle("collapsed", !state.maintenanceOpen);
  els.toggleMaintenance?.setAttribute("aria-expanded", String(state.maintenanceOpen));
  els.toggleMaintenance?.classList.toggle("active", state.maintenanceOpen);
}

function toggleRatingFilter(rating) {
  if (!ratingFilterOrder.includes(rating)) return;
  const nextFilters = new Set(state.ratingFilters);
  if (nextFilters.has(rating) && nextFilters.size > 1) {
    nextFilters.delete(rating);
  } else {
    nextFilters.add(rating);
  }
  state.ratingFilters = nextFilters;
  syncRatingFilterButtons();
}

function syncRatingFilterButtons() {
  els.ratingFilterButtons.forEach((button) => {
    const active = state.ratingFilters.has(button.dataset.ratingFilter);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function clearSearch(options = {}) {
  state.search = "";
  state.routeIds = [];
  els.searchInput.value = "";
  closeSearchSuggestions();
  render();
  if (options.fit !== false) {
    fitTo(getFilteredAttractions());
  }
}

function resetFiltersToDefault() {
  state.search = "";
  state.province = allRegionsValue;
  state.category = "all";
  state.theme = "all";
  state.season = "all";
  state.routeIds = [];
  state.ratingFilters = new Set(defaultRatingFilters);
  els.searchInput.value = "";
  els.provinceSelect.value = allRegionsValue;
  els.categorySelect.value = state.category;
  els.themeSelect.value = state.theme;
  els.seasonSelect.value = state.season;
  closeSearchSuggestions();
  syncRatingFilterButtons();
  render();
  fitTo(getFilteredAttractions());
}

function render() {
  const filtered = getFilteredAttractions();
  syncFourANotice();
  updateSummary(filtered);
  renderList(filtered);
  renderMarkers(filtered);
  renderRouteMap();
  renderDistribution(filtered);
  renderTrustMetrics(filtered);
  renderInspiration(filtered);
  syncActiveMapMarker(getSelected());
  if (state.imageReviewOpen) {
    renderImageReview();
  }
  if (state.maintenanceOpen) {
    renderMaintenancePanel();
  }

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
  const canShowFourA = canShowFourAResults(query);
  return attractions.filter((item) => {
    const matchesProvince = state.province === allRegionsValue || item.province === state.province;
    const matchesRating = state.ratingFilters.has(item.rating);
    const matchesCategory = state.category === "all" || attractionCategory(item) === state.category;
    const matchesTheme = state.theme === "all" || attractionThemes(item).includes(state.theme);
    const matchesSeason = state.season === "all" || attractionSeasons(item).includes(state.season);
    const matchesFourAContext = item.rating !== "official4A" || canShowFourA;
    const searchable = attractionSearchText(item);
    const matchesSearch = !query || searchable.includes(query);
    return matchesProvince && matchesRating && matchesCategory && matchesTheme && matchesSeason && matchesFourAContext && matchesSearch;
  });
}

function attractionSearchText(item) {
  return normalize(
    [
      item.name,
      item.displayName,
      item.city,
      ...searchAliases(item),
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
      ...attractionThemes(item).map(themeLabel),
      ...attractionSeasons(item).map(seasonLabel),
    ].join(" "),
  );
}

function canShowFourAResults(query = normalize(state.search)) {
  return state.province !== allRegionsValue || Boolean(query) || map.getZoom() >= fourAZoomThreshold;
}

function syncFourANotice() {
  const shouldShow = state.ratingFilters.has("official4A") && !canShowFourAResults();
  els.fourANotice?.classList.toggle("hidden", !shouldShow);
}

function updateSummary(filtered) {
  els.visibleStat.textContent = String(filtered.length);
  els.resultCount.textContent = t("resultCount", { count: filtered.length });
  const provinceText = state.province === allRegionsValue ? t("nationwide") : regionName(state.province);
  const activeExtras = [
    state.category === "all" ? "" : categoryLabel(state.category),
    state.theme === "all" ? "" : themeLabel(state.theme),
    state.season === "all" ? "" : seasonLabel(state.season),
  ].filter(Boolean);
  const typeText = activeExtras.length ? ` · ${activeExtras.join(" · ")}` : "";
  els.filterSubtitle.textContent = t("filterSubtitle", { region: provinceText, levels: `${activeLevelSummary()}${typeText}` });
}

function activeLevelSummary() {
  return ratingFilterOrder.filter((rating) => state.ratingFilters.has(rating)).map(ratingFilterLabel).join(" + ");
}

function renderList(items) {
  if (!items.length) {
    els.attractionList.innerHTML = renderNoResultsState();
    refreshDynamicIcons();
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
              <span class="card-badges">
                <span class="year-badge">${escapeHtml(ratingBadge(item))}</span>
                <span class="precision-badge ${escapeHtml(coordinatePrecisionClass(item))}">${escapeHtml(coordinatePrecisionShort(item))}</span>
              </span>
            </span>
          </button>
        </li>
      `;
    })
    .join("");
}

function renderNoResultsState() {
  const hasSearch = Boolean(state.search);
  return `
    <li class="empty-state empty-state-rich">
      <strong>${escapeHtml(t("noMatchesTitle"))}</strong>
      <span>${escapeHtml(t("noMatchesBody"))}</span>
      <div class="empty-actions">
        ${
          hasSearch
            ? `<button class="text-button" type="button" data-empty-action="clear-search">
                <i data-lucide="x" aria-hidden="true"></i>
                <span>${escapeHtml(t("noMatchesClearSearch"))}</span>
              </button>`
            : ""
        }
        <button class="text-button primary" type="button" data-empty-action="reset-filters">
          <i data-lucide="rotate-ccw" aria-hidden="true"></i>
          <span>${escapeHtml(t("noMatchesResetFilters"))}</span>
        </button>
      </div>
    </li>
  `;
}

function handleAttractionListClick(event) {
  const emptyAction = event.target.closest("[data-empty-action]");
  if (emptyAction && els.attractionList.contains(emptyAction)) {
    if (emptyAction.dataset.emptyAction === "clear-search") {
      clearSearch();
      els.searchInput.focus();
      return;
    }
    resetFiltersToDefault();
    return;
  }

  const itemButton = event.target.closest("[data-id]");
  if (!itemButton || !els.attractionList.contains(itemButton)) return;
  const item = attractions.find((attraction) => attraction.id === itemButton.dataset.id);
  selectAttraction(item);
}

function refreshDynamicIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderMarkers(items) {
  markerLayer.clearLayers();
  markersById.clear();

  items.forEach((item) => {
    const marker = L.marker(getAttractionLatLng(item), {
      icon: markerIcon(item),
      title: displayAttractionName(item),
      attractionId: item.id,
    });

    marker.bindPopup(
      `<strong>${escapeHtml(displayAttractionName(item))}</strong><br>${escapeHtml(attractionLocationLabel(item))} · ${escapeHtml(
        ratingMeta(item),
      )}<br>${escapeHtml(t("coordinatePrecision"))}: ${escapeHtml(coordinatePrecisionText(item))}`,
    );

    marker.on("click", () => selectAttraction(item));
    markersById.set(item.id, marker);
    markerLayer.addLayer(marker);
  });
}

function renderRouteMap() {
  routeLayer.clearLayers();
  const items = routeAttractions().filter((item) => markersById.has(item.id));
  if (items.length < 2) return;

  const latLngs = items.map((item) => getAttractionLatLng(item));
  L.polyline(latLngs, {
    pane: "routePane",
    color: "#ffffff",
    weight: 9,
    opacity: 0.92,
    interactive: false,
    lineCap: "round",
    lineJoin: "round",
  }).addTo(routeLayer);
  L.polyline(latLngs, {
    pane: "routePane",
    color: highlightColor,
    weight: 4,
    opacity: 0.78,
    interactive: false,
    lineCap: "round",
    lineJoin: "round",
  }).addTo(routeLayer);

  items.forEach((item, index) => {
    L.marker(getAttractionLatLng(item), {
      pane: "routePane",
      interactive: false,
      keyboard: false,
      icon: routeStopIcon(index + 1),
    }).addTo(routeLayer);
  });
}

function routeStopIcon(index) {
  return L.divIcon({
    className: "route-stop-marker",
    html: `<span>${escapeHtml(index)}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function renderDistribution(items) {
  const counts = countBy(items, (item) => item.province).sort((a, b) => b.count - a.count);
  const max = Math.max(1, ...counts.map((item) => item.count));
  const regionText = state.province === allRegionsValue ? t("nationwide") : regionName(state.province);
  const officialCount = items.filter((item) => item.rating === "official5A").length;
  const official4ACount = items.filter((item) => item.rating === "official4A").length;
  const peerCount = items.filter(isPeerAttraction).length;
  els.distributionCaption.textContent = t("distributionCaption", { region: regionText, count: items.length });
  els.legendOfficialStat.textContent = String(officialCount);
  els.legendOfficial4AStat.textContent = String(official4ACount);
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

function renderTrustMetrics(items) {
  if (!els.trustExactStat) return;
  const exactCount = items.filter((item) => coordinatePrecisionClass(item) === "precision-exact").length;
  const approximateCount = items.length - exactCount;
  const imageCount = items.filter((item) => hasReliableAttractionImage(item)).length;
  const reviewCount = items.filter((item) => state.reviewDecisions[item.id]).length;
  els.trustExactStat.textContent = String(exactCount);
  els.trustApproxStat.textContent = String(approximateCount);
  els.trustImageStat.textContent = String(imageCount);
  els.trustReviewStat.textContent = String(reviewCount);
  if (els.trustMetricCaption) {
    els.trustMetricCaption.textContent = t("resultCount", { count: items.length });
  }
  renderTrustProgress(items, { exactCount, imageCount, reviewCount });
}

function renderTrustProgress(items, counts) {
  if (!els.trustProgressList) return;
  const total = items.length;
  const sourceCount = items.filter(hasKnownAttractionSource).length;
  const rows = [
    { label: t("trustCoordinateProgress"), count: counts.exactCount, total, action: "coordinate" },
    { label: t("trustImageProgress"), count: counts.imageCount, total, action: "missingImage" },
    { label: t("trustSourceProgress"), count: sourceCount, total, action: "unknownSource" },
    { label: t("trustReviewProgress"), count: counts.reviewCount, total, action: "unreviewed" },
  ];
  els.trustProgressList.innerHTML = rows.map(renderTrustProgressRow).join("");
}

function renderTrustProgressRow(row) {
  const value = percent(row.count, row.total);
  const disabled = row.count >= row.total ? " disabled" : "";
  return `
    <button class="trust-progress-row" type="button" data-trust-action="${escapeHtml(row.action)}"${disabled}>
      <span class="trust-progress-label">${escapeHtml(row.label)}</span>
      <strong class="trust-progress-value">${value}%</strong>
      <span class="trust-progress-track" aria-hidden="true">
        <span class="trust-progress-fill" style="width: ${value}%"></span>
      </span>
      <small>${escapeHtml(row.count)} / ${escapeHtml(row.total)}</small>
    </button>
  `;
}

function hasKnownAttractionSource(item) {
  return Boolean(sourceIndex.sources?.[attractionSourceKey(item)]);
}

function percent(count, total) {
  return total ? Math.round((count / total) * 100) : 0;
}

function handleTrustProgressAction(action) {
  if (action === "unreviewed") {
    state.reviewFilter = "unreviewed";
    if (els.reviewFilter) els.reviewFilter.value = state.reviewFilter;
    setImageReviewOpen(true);
    renderImageReview();
    return;
  }

  const queueKey = action === "coordinate" ? nextCoordinateMaintenanceQueue() : action;
  if (!maintenanceQueueItems(queueKey).length) return;
  setMaintenanceOpen(true);
  jumpToMaintenanceQueue(queueKey);
}

function nextCoordinateMaintenanceQueue() {
  return maintenanceQueueItems("cityCoordinate").length ? "cityCoordinate" : "districtCoordinate";
}

function renderInspiration(items) {
  if (els.inspirationCaption) {
    els.inspirationCaption.textContent = t("inspirationCaption", { count: items.length });
  }
  renderInspirationRoute();
  renderFavorites();
}

function renderInspirationRoute() {
  if (!els.inspirationRoute) return;
  const routeItems = routeAttractions();
  if (!routeItems.length) {
    els.inspirationRoute.innerHTML = `<p class="empty-state">${escapeHtml(t("routeEmpty"))}</p>`;
    return;
  }

  const theme = state.theme === "all" ? themeLabel(routeDominantTheme(routeItems)) : themeLabel(state.theme);
  const season = state.season === "all" ? seasonLabel(routeDominantSeason(routeItems)) : seasonLabel(state.season);
  const summary = routeSummary(routeItems);
  els.inspirationRoute.innerHTML = `
    <div class="route-heading">
      <span>
        <strong>${escapeHtml(t("routeTitle", { theme, season }))}</strong>
        <small>${escapeHtml(summary)}</small>
      </span>
      <span>${escapeHtml(t("resultCount", { count: routeItems.length }))}</span>
    </div>
    <ol class="route-list">
      ${routeItems
        .map(
          (item, index) => `
            <li>
              <button class="related-item route-item" type="button" data-id="${escapeHtml(item.id)}">
                <span class="route-index">${index + 1}</span>
                <span>
                  <strong>${escapeHtml(displayAttractionName(item))}</strong>
                  <span>${escapeHtml(attractionLocationLabel(item))} · ${escapeHtml(themeLabel(attractionThemes(item)[0]))}</span>
                  <span class="route-step-meta">${escapeHtml(routeStepMeta(routeItems, index))}</span>
                </span>
              </button>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
  els.inspirationRoute.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = attractionsById.get(button.dataset.id);
      if (item) {
        selectAttraction(item);
        focusAttraction(item, true);
      }
    });
  });
}

function renderFavorites() {
  if (!els.favoriteList) return;
  const items = favoriteAttractions();
  els.favoriteCount.textContent = String(items.length);
  if (!items.length) {
    els.favoriteList.innerHTML = `<p class="empty-state">${escapeHtml(t("noFavorites"))}</p>`;
    return;
  }

  els.favoriteList.innerHTML = items
    .slice(0, 8)
    .map(
      (item) => `
        <button class="related-item favorite-item" type="button" data-id="${escapeHtml(item.id)}">
          <strong>${escapeHtml(displayAttractionName(item))}</strong>
          <span>${escapeHtml(attractionLocationLabel(item))} · ${escapeHtml(ratingBadge(item))}</span>
        </button>
      `,
    )
    .join("");
  els.favoriteList.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = attractionsById.get(button.dataset.id);
      if (item) {
        selectAttraction(item);
        focusAttraction(item, true);
      }
    });
  });
}

function randomSelectAttraction() {
  const items = getFilteredAttractions();
  if (!items.length) return;
  const item = items[Math.floor(Math.random() * items.length)];
  selectAttraction(item);
  focusAttraction(item, true);
}

function randomSelectRegion() {
  const items = getRegionCandidateAttractions();
  const provinceCounts = countBy(items, (item) => item.province).filter((item) => item.count > 0);
  if (!provinceCounts.length) return;
  const weighted = provinceCounts.flatMap((item) => Array(Math.max(1, Math.min(8, Math.ceil(Math.sqrt(item.count))))).fill(item.key));
  const province = weighted[Math.floor(Math.random() * weighted.length)] || provinceCounts[0].key;
  state.search = "";
  state.province = province;
  state.routeIds = [];
  state.selectedId = null;
  els.searchInput.value = "";
  els.provinceSelect.value = province;
  render();
  fitTo(getFilteredAttractions());
}

function getRegionCandidateAttractions() {
  return attractions.filter((item) => {
    const matchesRating = state.ratingFilters.has(item.rating);
    const matchesCategory = state.category === "all" || attractionCategory(item) === state.category;
    const matchesTheme = state.theme === "all" || attractionThemes(item).includes(state.theme);
    const matchesSeason = state.season === "all" || attractionSeasons(item).includes(state.season);
    return matchesRating && matchesCategory && matchesTheme && matchesSeason;
  });
}

function buildInspirationRoute() {
  const items = getFilteredAttractions();
  state.routeIds = pickRouteItems(items).map((item) => item.id);
  renderInspiration(items);
  renderRouteMap();
}

function pickRouteItems(items) {
  const routeTheme = state.theme === "all" ? bestThemeForItems(items) : state.theme;
  const routeSeason = state.season === "all" ? bestSeasonForItems(items) : state.season;
  const preferred = items.filter((item) => attractionThemes(item).includes(routeTheme) && attractionSeasons(item).includes(routeSeason));
  const pool = preferred.length >= 3 ? preferred : items;
  const selected = pool
    .slice()
    .sort((a, b) => routeSortScore(b, routeTheme, routeSeason) - routeSortScore(a, routeTheme, routeSeason))
    .slice(0, Math.min(6, Math.max(3, pool.length)));
  return orderRouteByDistance(selected);
}

function routeSortScore(item, routeTheme, routeSeason) {
  return (
    (item.rating === "official5A" ? 8 : item.rating === "peer5A" ? 5 : 3) +
    (item.coordinateLevel === "景区" ? 3 : 0) +
    (hasReliableAttractionImage(item) ? 2 : 0) +
    (attractionThemes(item).includes(routeTheme) ? 2 : 0) +
    (attractionSeasons(item).includes(routeSeason) ? 1 : 0)
  );
}

function orderRouteByDistance(items) {
  if (items.length < 3) return items;
  const remaining = items.slice();
  const ordered = [remaining.shift()];
  while (remaining.length) {
    const current = ordered[ordered.length - 1];
    const nextIndex = nearestRouteItemIndex(current, remaining);
    ordered.push(remaining.splice(nextIndex, 1)[0]);
  }
  return ordered;
}

function nearestRouteItemIndex(current, candidates) {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  candidates.forEach((candidate, index) => {
    const distance = haversineKm(getAttractionLatLng(current), getAttractionLatLng(candidate));
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function routeAttractions() {
  return state.routeIds.map((id) => attractionsById.get(id)).filter(Boolean);
}

function routeSummary(items) {
  const distance = Math.round(routeDistanceKm(items));
  const regions = unique(items.map((item) => item.province)).length;
  const key = regions > 1 ? "routeSummary" : "routeSummarySingleRegion";
  return t(key, { distance: formatRouteDistance(distance), regions });
}

function routeStepMeta(items, index) {
  if (index === 0) return t("routeStart");
  const distance = Math.round(haversineKm(getAttractionLatLng(items[index - 1]), getAttractionLatLng(items[index])));
  return t("routeLegDistance", { distance: formatRouteDistance(distance) });
}

function routeDistanceKm(items) {
  if (items.length < 2) return 0;
  return items.slice(1).reduce((total, item, index) => {
    const previous = items[index];
    return total + haversineKm(getAttractionLatLng(previous), getAttractionLatLng(item));
  }, 0);
}

function formatRouteDistance(distance) {
  if (distance >= 1000) return String(Math.round(distance / 10) * 10);
  if (distance >= 100) return String(Math.round(distance / 5) * 5);
  return String(distance);
}

function routeDominantTheme(items) {
  return bestByCount(items.flatMap(attractionThemes), "culture");
}

function routeDominantSeason(items) {
  return bestByCount(items.flatMap(attractionSeasons), "autumn");
}

function bestThemeForItems(items) {
  return bestByCount(items.flatMap(attractionThemes).filter((theme) => theme !== "all"), "culture");
}

function bestSeasonForItems(items) {
  return bestByCount(items.flatMap(attractionSeasons).filter((season) => season !== "all"), "autumn");
}

function bestByCount(values, fallback) {
  const counts = countBy(values, (value) => value).sort((a, b) => b.count - a.count);
  return counts[0]?.key || fallback;
}

function selectAttraction(item, options = {}) {
  state.selectedId = item?.id || null;
  renderDetail(item || null);
  syncActiveListItem();
  syncActiveMapMarker(item || null);
  if (state.maintenanceOpen) {
    renderMaintenancePanel();
  }

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
  setDetailTrustChecks(item);
  setCoordinatePrecisionDetail(item);
  setTrustDetail(item);
  setFootprintDetail(null);
  els.focusSelected.disabled = !hasItem;
  els.filterProvince.disabled = !hasItem;
  if (els.toggleFavorite) {
    els.toggleFavorite.disabled = !hasItem;
    syncFavoriteButton(item);
  }

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

function attractionCategory(item) {
  if (attractionCategoryCache.has(item.id)) return attractionCategoryCache.get(item.id);
  const override = item.categoryOverride;
  const category = override && categoryFilterOrder.includes(override) ? override : attractionDescriptionCategory(item);
  const resolved = category === "default" ? "other" : category;
  attractionCategoryCache.set(item.id, resolved);
  return resolved;
}

function categoryLabel(category) {
  const labels = {
    all: t("categoryAll"),
    nature: t("categoryNature"),
    water: t("categoryWater"),
    heritage: t("categoryHeritage"),
    settlement: t("categorySettlement"),
    museum: t("categoryMuseum"),
    religious: t("categoryReligious"),
    red: t("categoryRed"),
    leisure: t("categoryLeisure"),
    other: t("categoryOther"),
  };
  return labels[category] || category;
}

function attractionThemes(item) {
  if (attractionThemeCache.has(item.id)) return attractionThemeCache.get(item.id);
  if (Array.isArray(item.themeOverride) && item.themeOverride.length) {
    const result = item.themeOverride.filter((theme) => themeFilterOrder.includes(theme) && theme !== "all");
    attractionThemeCache.set(item.id, result);
    return result;
  }
  const category = attractionCategory(item);
  const text = attractionTagText(item);
  const themes = new Set();

  if (["nature", "water"].includes(category) || /山|峰|岭|嶺|峡|峽|谷|草原|森林|沙|丹霞|地质|地質|洞|湖|海|瀑|湿地|濕地|岛|島/.test(text)) {
    themes.add("nature");
  }
  if (["heritage", "museum", "settlement", "religious"].includes(category) || /古|遗址|遺址|博物|园林|園林|石窟|石刻|寺|庙|廟|宫|宮|城|楼|樓|陵|祠/.test(text)) {
    themes.add("culture");
  }
  if (category === "leisure" || /乐园|樂園|迪士尼|欢乐|歡樂|海洋公园|海洋公園|动物园|動物園|植物园|植物園|度假|温泉|溫泉|影视|影視/.test(text)) {
    themes.add("family");
  }
  if (["heritage", "religious", "settlement"].includes(category) || /古城|古镇|古鎮|古村|园林|園林|石窟|石刻|寺|庙|廟|宫|宮|陵|遗址|遺址|长城|長城|土楼|土樓|牌坊|关|關/.test(text)) {
    themes.add("ancient");
  }
  if (category === "red" || /红色|紅色|革命|烈士|长征|長征|旧址|舊址|会址|會址|纪念|紀念/.test(text)) {
    themes.add("red");
  }
  if (category === "water" || /湖|海|江|河|溪|泉|瀑|湾|灣|港|湿地|濕地|岛|島|水/.test(text)) {
    themes.add("water");
  }

  if (!themes.size) themes.add(category === "other" ? "culture" : category);
  const result = [...themes].filter((theme) => themeFilterOrder.includes(theme));
  attractionThemeCache.set(item.id, result);
  return result;
}

function attractionSeasons(item) {
  if (attractionSeasonCache.has(item.id)) return attractionSeasonCache.get(item.id);
  if (Array.isArray(item.seasonOverride) && item.seasonOverride.length) {
    const result = item.seasonOverride.filter((season) => seasonFilterOrder.includes(season) && season !== "all");
    attractionSeasonCache.set(item.id, result);
    return result;
  }
  const text = attractionTagText(item);
  const themes = attractionThemes(item);
  const seasons = new Set();

  if (/花|樱|櫻|杜鹃|杜鵑|桃|梅|茶|园林|園林|古镇|古鎮|湿地|濕地|春/.test(text)) seasons.add("spring");
  if (/湖|海|岛|島|水|瀑|峡|峽|漂流|森林|草原|避暑|乐园|樂園|夏/.test(text) || themes.includes("water")) seasons.add("summer");
  if (/山|峰|岭|嶺|长城|長城|梯田|胡杨|胡楊|枫|楓|红叶|紅葉|古城|古镇|古鎮|秋/.test(text) || themes.includes("ancient")) seasons.add("autumn");
  if (/雪|冰|温泉|溫泉|雾凇|霧凇|长白山|長白山|哈尔滨|哈爾濱|冬/.test(text)) seasons.add("winter");

  if (!seasons.size) {
    seasons.add("spring");
    seasons.add("autumn");
    if (themes.includes("nature") || themes.includes("water") || themes.includes("family")) seasons.add("summer");
  }

  const result = [...seasons].filter((season) => seasonFilterOrder.includes(season));
  attractionSeasonCache.set(item.id, result);
  return result;
}

function attractionTagText(item) {
  return [item.name, item.displayName, item.coordinateLabel, item.city, item.province].filter(Boolean).join(" ");
}

function themeLabel(theme) {
  const labels = {
    all: t("themeAll"),
    nature: t("themeNature"),
    culture: t("themeCulture"),
    family: t("themeFamily"),
    ancient: t("themeAncient"),
    red: t("themeRed"),
    water: t("themeWater"),
  };
  return labels[theme] || theme;
}

function seasonLabel(season) {
  const labels = {
    all: t("seasonAll"),
    spring: t("seasonSpring"),
    summer: t("seasonSummer"),
    autumn: t("seasonAutumn"),
    winter: t("seasonWinter"),
  };
  return labels[season] || season;
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

function setCoordinatePrecisionDetail(item) {
  if (!els.detailCoordinatePrecision) return;
  if (!item) {
    els.detailCoordinatePrecision.textContent = "-";
    els.detailCoordinatePrecision.className = "";
    return;
  }
  const note = coordinatePrecisionNote(item);
  els.detailCoordinatePrecision.innerHTML = `
    <span class="precision-badge ${escapeHtml(coordinatePrecisionClass(item))}">${escapeHtml(coordinatePrecisionText(item))}</span>
    ${note ? `<span class="precision-note">${escapeHtml(note)}</span>` : ""}
  `;
}

function setDetailTrustChecks(item) {
  if (!els.detailTrustChecks) return;
  if (!item) {
    els.detailTrustChecks.hidden = true;
    els.detailTrustChecks.innerHTML = "";
    return;
  }

  els.detailTrustChecks.hidden = false;
  els.detailTrustChecks.setAttribute("aria-label", t("trustMetrics"));
  els.detailTrustChecks.innerHTML = detailTrustChecks(item)
    .map(
      (check) => `
        <div class="detail-trust-chip ${escapeHtml(check.tone)}">
          <span>${escapeHtml(check.label)}</span>
          <strong>${escapeHtml(check.value)}</strong>
        </div>
      `,
    )
    .join("");
}

function detailTrustChecks(item) {
  const precisionClass = coordinatePrecisionClass(item);
  const image = effectiveAttractionImage(item);
  const hasImage = isReliableImage(image);
  const knownSource = hasKnownAttractionSource(item);
  const decision = state.reviewDecisions[item.id];
  return [
    {
      label: t("coordinatePrecision"),
      value: coordinatePrecisionText(item),
      tone: precisionClass === "precision-exact" ? "good" : precisionClass === "precision-district" ? "warn" : "bad",
    },
    {
      label: t("trustImages"),
      value: hasImage ? t("reviewWithImage") : t("reviewNoImage"),
      tone: hasImage ? "good" : "bad",
    },
    {
      label: t("dataSource"),
      value: knownSource ? sourceLabel(attractionSource(item)) : t("maintenanceQueueUnknownSource"),
      tone: knownSource ? "good" : "bad",
    },
    {
      label: t("imageReview"),
      value: decision ? reviewStatusLabel(decision.action) : t("reviewPending"),
      tone: decision ? (decision.action === "delete" || decision.action === "missing" ? "warn" : "good") : "warn",
    },
  ];
}

function setTrustDetail(item) {
  if (!els.detailDataSource || !els.detailDataUpdated || !els.detailAuditStatus) return;
  if (!item) {
    els.detailDataSource.textContent = "-";
    els.detailDataUpdated.textContent = "-";
    els.detailAuditStatus.textContent = "-";
    return;
  }

  const source = attractionSource(item);
  const href = sourceHref(source, item);
  const label = sourceLabel(source);
  const note = sourceNote(source);
  els.detailDataSource.innerHTML = `
    ${href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>` : escapeHtml(label)}
    ${note ? `<span class="precision-note">${escapeHtml(note)}</span>` : ""}
  `;
  els.detailDataUpdated.textContent = item.dataUpdated || sourceUpdatedAt(source);
  els.detailAuditStatus.innerHTML = `
    <span class="precision-badge ${escapeHtml(coordinatePrecisionClass(item))}">${escapeHtml(coordinateAuditStatusText(item))}</span>
  `;
}

function coordinatePrecisionText(item) {
  if (item.coordinateLevel === "景区") return t("coordinateExact");
  if (item.coordinateLevel === "区县") return t("coordinateDistrict");
  if (item.coordinateLevel === "城市") return t("coordinateCity");
  return item.coordinateLevel || t("coordinateCity");
}

function coordinatePrecisionShort(item) {
  if (item.coordinateLevel === "景区") return t("coordinateExact");
  if (item.coordinateLevel === "区县") return t("coordinateDistrict");
  if (item.coordinateLevel === "城市") return t("coordinateCity");
  return item.coordinateLevel || t("coordinateCity");
}

function coordinatePrecisionNote(item) {
  return item.coordinateLevel === "景区" ? "" : t("coordinateApproxNote");
}

function coordinatePrecisionClass(item) {
  if (item.coordinateLevel === "景区") return "precision-exact";
  if (item.coordinateLevel === "区县") return "precision-district";
  return "precision-city";
}

function coordinateAuditStatusText(item) {
  const labels = {
    corrected: t("auditDone"),
    review: t("auditPartial"),
    pending: t("auditPending"),
  };
  return labels[coordinateAuditStatusKey(item)] || labels.pending;
}

function coordinateAuditStatusKey(item) {
  if (item.coordinateLevel === "景区") return "corrected";
  if (item.coordinateLevel === "区县") return "review";
  return "pending";
}

function attractionSource(item) {
  const key = attractionSourceKey(item);
  return sourceIndex.sources?.[key] || {};
}

function attractionSourceKey(item) {
  if (item.sourceKey) return item.sourceKey;
  const annualOfficialKey = `mct-${item.year}-announcements`;
  if (item.rating === "official5A" && sourceIndex.sources?.[annualOfficialKey]) return annualOfficialKey;
  if (isOfficial4AAttraction(item)) return "open-4a-list";
  if (isPeerAttraction(item)) return "peer-curated";
  if (Number(item.year) >= 2024) return "mct-2024-announcements";
  return "mct-official-5a";
}

function sourceLabel(source) {
  return source?.label?.[state.language] || source?.label?.["zh-CN"] || source?.label?.en || source?.name || "-";
}

function sourceNote(source) {
  if (source?.note?.[state.language]) return source.note[state.language];
  if (state.language === "zh-CN" || state.language === "zh-TW") return source?.note?.["zh-CN"] || "";
  return source?.note?.en || "";
}

function sourceHref(source, item) {
  return item?.sourceUrl || source?.url || source?.urls?.[0] || "";
}

function sourceUrls(source) {
  return unique([source?.url, ...(source?.urls || [])].filter(Boolean));
}

function sourceUpdatedAt(source) {
  return source?.updatedAt || sourceIndex.updatedAt || sourceIndex.datasetVersion || "-";
}

function showToast(message, tone = "info") {
  if (!els.toastMessage || !message) return;
  window.clearTimeout(toastTimer);
  els.toastMessage.hidden = false;
  els.toastMessage.textContent = message;
  els.toastMessage.dataset.tone = tone;
  window.requestAnimationFrame(() => {
    els.toastMessage.classList.add("show");
  });
  toastTimer = window.setTimeout(() => {
    els.toastMessage.classList.remove("show");
    window.setTimeout(() => {
      if (!els.toastMessage.classList.contains("show")) {
        els.toastMessage.hidden = true;
      }
    }, 180);
  }, 2400);
}

function setFootprintDetail(label) {
  const hasLabel = Boolean(label);
  els.detailFootprint.textContent = hasLabel ? label : "";
  if (els.detailFootprintRow) {
    els.detailFootprintRow.hidden = !hasLabel;
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
  if (item.coordinateLevel === "景区") return 8;
  if (item.coordinateLevel === "区县") return 14;
  return 18;
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
  const ratingClass = ratingMarkerClass(item);
  const precisionClass = coordinatePrecisionClass(item);
  return L.divIcon({
    className: `map-marker-shell ${ratingClass} ${precisionClass}${active ? " selected" : ""}`,
    html: `<div class="map-marker ${ratingClass} ${precisionClass}"><span>${escapeHtml(ratingBadge(item))}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 33],
    popupAnchor: [0, -28],
  });
}

function clusterIcon(cluster) {
  const childItems = cluster
    .getAllChildMarkers()
    .map((marker) => attractionsById.get(marker.options.attractionId))
    .filter(Boolean);
  const ratingClass = clusterRatingClass(childItems);
  const count = cluster.getChildCount();
  const size = count >= 100 ? 50 : count >= 20 ? 46 : 42;
  const composition = clusterCompositionStyle(childItems, ratingClass);
  return L.divIcon({
    className: `map-cluster-shell ${ratingClass}`,
    html: `<div class="map-cluster ${ratingClass}"${composition ? ` style="${composition}"` : ""}><span>${count}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function clusterRatingClass(items) {
  const ratings = new Set(items.map((item) => item.rating));
  if (ratings.size === 1) {
    const [rating] = ratings;
    if (rating === "official4A") return "four-a";
    if (rating === "peer5A") return "peer";
    return "official";
  }
  if (ratings.has("official4A") && !ratings.has("official5A") && !ratings.has("peer5A")) return "four-a";
  if (ratings.has("official5A") && !ratings.has("official4A") && !ratings.has("peer5A")) return "official";
  return "mixed";
}

function clusterCompositionStyle(items, ratingClass) {
  if (ratingClass !== "mixed" || !items.length) return "";
  const total = items.length;
  const fiveA = items.filter((item) => item.rating === "official5A").length;
  const fourA = items.filter((item) => item.rating === "official4A").length;
  const peer = Math.max(0, total - fiveA - fourA);
  const fiveEnd = (fiveA / total) * 100;
  const fourEnd = fiveEnd + (fourA / total) * 100;
  const peerEnd = fourEnd + (peer / total) * 100;
  return [
    "background: conic-gradient(",
    `var(--marker-5a) 0 ${fiveEnd.toFixed(2)}%, `,
    `var(--marker-4a) ${fiveEnd.toFixed(2)}% ${fourEnd.toFixed(2)}%, `,
    `var(--marker-peer) ${fourEnd.toFixed(2)}% ${peerEnd.toFixed(2)}%)`,
  ].join("");
}

function getSelected() {
  return attractions.find((item) => item.id === state.selectedId) || null;
}

function getAttractionLatLng(item) {
  const override = state.maintenanceOverrides[item.id];
  if (Number.isFinite(Number(override?.lat)) && Number.isFinite(Number(override?.lng))) {
    return [item.lat, item.lng];
  }
  return correctedCentersById.get(item.id) || [item.lat, item.lng];
}

function unique(items) {
  return [...new Set(items)];
}

function isPeerAttraction(item) {
  return item.rating === "peer5A";
}

function isOfficial4AAttraction(item) {
  return item.rating === "official4A";
}

function ratingBadge(item) {
  if (isPeerAttraction(item)) return t("peerBadgeShort");
  if (isOfficial4AAttraction(item)) return "4A";
  return "5A";
}

function ratingMeta(item) {
  if (isPeerAttraction(item)) return t("peerMeta");
  if (isOfficial4AAttraction(item)) return t("official4AMeta");
  return t("officialMeta", { year: item.year });
}

function ratingDetail(item) {
  if (isPeerAttraction(item)) return t("peerDetail", { label: t("peer5ATitle") });
  if (isOfficial4AAttraction(item)) {
    return item.year ? `${item.year} · ${t("official4ADetail")}` : t("official4ADetail");
  }
  return t("officialDetail", { year: item.year });
}

function ratingFilterLabel(rating) {
  if (rating === "official4A") return t("levelOfficial4A");
  if (rating === "peer5A") return t("levelPeer5A");
  return t("levelOfficial5A");
}

function ratingMarkerClass(item) {
  if (isPeerAttraction(item)) return "peer";
  if (isOfficial4AAttraction(item)) return "four-a";
  return "official";
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
  setDetailImage(effectiveAttractionImage(item), displayAttractionName(item));
}

function setDetailImage(image, alt) {
  const hasImage = isReliableImage(image);
  const safeImage = hasImage ? image : null;
  els.detailVisual.classList.toggle("image-missing", !hasImage);
  els.detailVisual.dataset.placeholder = t("imageUnavailable");
  els.detailImage.dataset.fallback = hasImage ? "false" : "true";
  if (safeImage?.url) {
    els.detailImage.src = safeImage.url;
  } else {
    els.detailImage.removeAttribute("src");
  }
  els.detailImage.alt = alt;
  els.detailImageLink.href = safeImage?.pageUrl || "#";
  els.detailImageLink.toggleAttribute("aria-disabled", !hasImage);
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

function effectiveAttractionImage(item) {
  const decision = state.reviewDecisions[item.id];
  if (decisionHidesImage(decision)) return null;
  if (decision?.action === "replace" && isLocalImageUrl(decision.replacementUrl)) {
    return {
      url: decision.replacementUrl,
      pageUrl: decision.pageUrl || "#",
      caption: decision.note || localImages[item.id]?.caption || "",
    };
  }
  const image = localImages[item.id];
  return isReliableImage(image) ? image : null;
}

function hasReliableAttractionImage(item) {
  return isReliableImage(effectiveAttractionImage(item));
}

function decisionHidesImage(decision) {
  return decision?.action === "missing" || decision?.action === "delete";
}

function isLocalImageUrl(url) {
  return String(url || "").startsWith("assets/images/");
}

function isSuspiciousImage(item, image) {
  if (!isReliableImage(image)) return false;
  const qualityFlag = imageQualityFlags[item.id];
  if (qualityFlag?.url && qualityFlag.url === image.url) return true;
  const text = normalize([image.url, image.pageUrl, image.caption].filter(Boolean).join(" "));
  const suspiciousTerms = ["selfie", "collage", "montage", "logo", "map", "diagram", "包含", "拼图", "合成", "自拍"];
  if (suspiciousTerms.some((term) => text.includes(normalize(term)))) return true;
  const tokens = imageMatchTokens(item);
  return tokens.length > 0 && !tokens.some((token) => text.includes(token));
}

function imageQualityReasons(item, image) {
  const qualityFlag = imageQualityFlags[item.id];
  return qualityFlag?.url && qualityFlag.url === image?.url ? qualityFlag.reasons || [] : [];
}

function imageMatchTokens(item) {
  const cleanName = String(item.name || "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院|博物馆|文化园区|度假区|示范区|保护区/g, " ")
    .replace(/[·—/,-]/g, " ");
  return unique([cleanName, item.coordinateLabel, ...cleanName.split(/\s+/)])
    .map((value) => normalize(value))
    .filter((value) => value.length >= 2);
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

function loadFavoriteIds() {
  try {
    const ids = JSON.parse(window.localStorage.getItem(favoritesStorageKey) || "[]");
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
}

function saveFavoriteIds() {
  window.localStorage.setItem(favoritesStorageKey, JSON.stringify([...state.favoriteIds]));
}

function toggleFavorite(id) {
  const item = attractionsById.get(id);
  const wasActive = state.favoriteIds.has(id);
  if (state.favoriteIds.has(id)) {
    state.favoriteIds.delete(id);
  } else {
    state.favoriteIds.add(id);
  }
  saveFavoriteIds();
  syncFavoriteButton(getSelected());
  renderInspiration(getFilteredAttractions());
  if (item) {
    showToast(t(wasActive ? "favoriteRemoved" : "favoriteAdded", { name: displayAttractionName(item) }));
  }
}

function favoriteAttractions() {
  return [...state.favoriteIds].map((id) => attractionsById.get(id)).filter(Boolean);
}

function syncFavoriteButton(item) {
  if (!els.toggleFavorite) return;
  const active = Boolean(item && state.favoriteIds.has(item.id));
  els.toggleFavorite.classList.toggle("active", active);
  els.toggleFavorite.setAttribute("aria-pressed", String(active));
  const label = els.toggleFavorite.querySelector("span");
  if (label) {
    label.textContent = active ? t("unfavorite") : t("favorite");
  }
}

function loadReviewDecisions() {
  try {
    const localDecisions = JSON.parse(window.localStorage.getItem(reviewStorageKey) || "{}");
    return { ...seededReviewDecisions, ...localDecisions };
  } catch {
    return { ...seededReviewDecisions };
  }
}

function saveReviewDecisions() {
  window.localStorage.setItem(reviewStorageKey, JSON.stringify(state.reviewDecisions));
}

function loadMaintenanceOverrides() {
  try {
    const localOverrides = JSON.parse(window.localStorage.getItem(maintenanceStorageKey) || "{}");
    return normalizeMaintenanceOverrides({ ...seededMaintenanceOverrides, ...localOverrides });
  } catch {
    return normalizeMaintenanceOverrides(seededMaintenanceOverrides);
  }
}

function saveMaintenanceOverrides() {
  window.localStorage.setItem(maintenanceStorageKey, JSON.stringify(state.maintenanceOverrides));
}

function normalizeMaintenanceOverrides(payload) {
  const rows = Array.isArray(payload) ? payload : Object.entries(payload || {}).map(([id, row]) => ({ id, ...(row || {}) }));
  return rows.reduce((acc, row) => {
    const normalized = normalizeMaintenanceOverride(row);
    if (normalized) acc[normalized.id] = normalized;
    return acc;
  }, {});
}

function normalizeMaintenanceOverride(row) {
  if (!row || typeof row !== "object") return null;
  const id = String(row.id || "").trim();
  if (!id) return null;

  const normalized = {
    id,
    name: stringField(row.name),
    displayName: stringField(row.displayName),
    province: stringField(row.province),
    city: stringField(row.city),
    updatedAt: stringField(row.updatedAt) || new Date().toISOString(),
  };
  const lat = Number(row.lat);
  const lng = Number(row.lng);
  if (Number.isFinite(lat) && lat >= -90 && lat <= 90 && Number.isFinite(lng) && lng >= -180 && lng <= 180) {
    normalized.lat = roundCoordinate(lat);
    normalized.lng = roundCoordinate(lng);
  }
  if (coordinateLevelOptions.includes(row.coordinateLevel)) normalized.coordinateLevel = row.coordinateLevel;
  if (stringField(row.coordinateLabel)) normalized.coordinateLabel = stringField(row.coordinateLabel);
  if (categoryFilterOrder.includes(row.categoryOverride || row.category)) {
    const category = row.categoryOverride || row.category;
    if (category !== "all") normalized.categoryOverride = category;
  }
  const themes = normalizeChoiceArray(row.themeOverride || row.themes, themeFilterOrder);
  if (themes.length) normalized.themeOverride = themes;
  const seasons = normalizeChoiceArray(row.seasonOverride || row.seasons, seasonFilterOrder);
  if (seasons.length) normalized.seasonOverride = seasons;
  const sourceKey = stringField(row.sourceKey);
  if (!sourceKey || sourceIndex.sources?.[sourceKey]) normalized.sourceKey = sourceKey;
  if (stringField(row.dataUpdated)) normalized.dataUpdated = stringField(row.dataUpdated);
  if (stringField(row.note || row.maintenanceNote)) normalized.note = stringField(row.note || row.maintenanceNote);

  return hasMaintenanceOverride(normalized) ? normalized : null;
}

function hasMaintenanceOverride(row) {
  return [
    "lat",
    "lng",
    "coordinateLevel",
    "coordinateLabel",
    "categoryOverride",
    "themeOverride",
    "seasonOverride",
    "sourceKey",
    "dataUpdated",
    "note",
  ].some((key) => Array.isArray(row[key]) ? row[key].length : row[key]);
}

function normalizeChoiceArray(value, allowed) {
  const rows = Array.isArray(value) ? value : String(value || "").split(/[,，\s]+/);
  return unique(rows.map((item) => String(item || "").trim()).filter((item) => allowed.includes(item) && item !== "all"));
}

function stringField(value) {
  return String(value || "").trim();
}

function roundCoordinate(value) {
  return Number(value.toFixed(6));
}

function applyMaintenanceOverridesToAttractions() {
  attractions.forEach((item) => {
    const original = originalAttractionsById.get(item.id);
    if (!original) return;
    Object.keys(item).forEach((key) => {
      if (!(key in original)) delete item[key];
    });
    Object.assign(item, original);

    const override = state.maintenanceOverrides[item.id];
    if (!override) return;
    if (Number.isFinite(Number(override.lat)) && Number.isFinite(Number(override.lng))) {
      item.lat = Number(override.lat);
      item.lng = Number(override.lng);
    }
    if (override.coordinateLevel) item.coordinateLevel = override.coordinateLevel;
    if (override.coordinateLabel) item.coordinateLabel = override.coordinateLabel;
    if (override.categoryOverride) item.categoryOverride = override.categoryOverride;
    if (Array.isArray(override.themeOverride)) item.themeOverride = [...override.themeOverride];
    if (Array.isArray(override.seasonOverride)) item.seasonOverride = [...override.seasonOverride];
    if (override.sourceKey) item.sourceKey = override.sourceKey;
    if (override.dataUpdated) item.dataUpdated = override.dataUpdated;
    if (override.note) item.maintenanceNote = override.note;
  });
  clearAttractionDerivedCaches();
}

function clearAttractionDerivedCaches() {
  attractionCategoryCache.clear();
  attractionThemeCache.clear();
  attractionSeasonCache.clear();
  attractionSearchAliasCache.clear();
}

function populateMaintenanceSelects() {
  if (!els.maintenancePanel) return;
  if (els.maintenanceCoordinateLevel) {
    els.maintenanceCoordinateLevel.innerHTML = coordinateLevelOptions
      .map((level) => `<option value="${escapeHtml(level)}">${escapeHtml(coordinateLevelLabel(level))}</option>`)
      .join("");
  }
  if (els.maintenanceCategory) {
    els.maintenanceCategory.innerHTML = categoryFilterOrder
      .filter((category) => category !== "all")
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(categoryLabel(category))}</option>`)
      .join("");
  }
  if (els.maintenanceSourceKey) {
    els.maintenanceSourceKey.innerHTML = Object.entries(sourceIndex.sources || {})
      .map(([key, source]) => `<option value="${escapeHtml(key)}">${escapeHtml(sourceLabel(source))}</option>`)
      .join("");
  }
  renderMaintenanceChecks(els.maintenanceThemes, themeFilterOrder.filter((theme) => theme !== "all"), "maintenance-theme", themeLabel);
  renderMaintenanceChecks(els.maintenanceSeasons, seasonFilterOrder.filter((season) => season !== "all"), "maintenance-season", seasonLabel);
}

function renderMaintenanceChecks(container, values, name, labeler) {
  if (!container) return;
  container.innerHTML = values
    .map(
      (value) => `
        <label class="maintenance-check">
          <input type="checkbox" name="${escapeHtml(name)}" value="${escapeHtml(value)}" />
          <span>${escapeHtml(labeler(value))}</span>
        </label>
      `,
    )
    .join("");
}

function coordinateLevelLabel(level) {
  if (level === "景区") return t("coordinateExact");
  if (level === "区县") return t("coordinateDistrict");
  return t("coordinateCity");
}

function renderMaintenancePanel() {
  if (!els.maintenancePanel) return;
  const item = getSelected();
  const overrideCount = Object.keys(state.maintenanceOverrides).length;
  els.maintenanceSummary.textContent = t("maintenanceSummary", { count: overrideCount });
  renderMaintenanceQueue(item);
  setMaintenanceControlsDisabled(!item);

  if (!item) {
    els.maintenanceSelectedName.textContent = t("noSelection");
    fillMaintenanceForm(null);
    return;
  }

  els.maintenanceSelectedName.textContent = `${displayAttractionName(item)} · ${attractionLocationLabel(item)}`;
  fillMaintenanceForm(item);
}

function renderMaintenanceQueue(selectedItem = getSelected()) {
  if (!els.maintenanceQueueList) return;
  const definitions = maintenanceQueueDefinitions();
  const actionableIds = new Set(
    ["missingImage", "suspiciousImage", "cityCoordinate", "districtCoordinate", "unknownSource"]
      .flatMap((key) => maintenanceQueueItems(key))
      .map((item) => item.id),
  );
  if (els.maintenanceQueueSummary) {
    els.maintenanceQueueSummary.textContent = t("maintenanceQueueSummary", { count: actionableIds.size });
  }

  els.maintenanceQueueList.innerHTML = definitions
    .map((definition) => {
      const items = maintenanceQueueItems(definition.key);
      const active = selectedItem && items.some((item) => item.id === selectedItem.id) ? " active" : "";
      return `
        <button class="maintenance-queue-item${active}" type="button" data-maintenance-queue="${escapeHtml(definition.key)}" ${
          items.length ? "" : "disabled"
        } onclick="window.CHINA_MAINTENANCE_QUEUE_JUMP?.('${escapeHtml(definition.key)}')">
          <span>
            <strong>${escapeHtml(definition.label)}</strong>
            <small>${escapeHtml(definition.description)}</small>
          </span>
          <em>${items.length}</em>
        </button>
      `;
    })
    .join("");

}

function maintenanceQueueDefinitions() {
  return [
    {
      key: "missingImage",
      label: t("maintenanceQueueMissingImage"),
      description: t("maintenanceQueueMissingImageDesc"),
    },
    {
      key: "suspiciousImage",
      label: t("maintenanceQueueSuspiciousImage"),
      description: t("maintenanceQueueSuspiciousImageDesc"),
    },
    {
      key: "cityCoordinate",
      label: t("maintenanceQueueCityCoordinate"),
      description: t("maintenanceQueueCityCoordinateDesc"),
    },
    {
      key: "districtCoordinate",
      label: t("maintenanceQueueDistrictCoordinate"),
      description: t("maintenanceQueueDistrictCoordinateDesc"),
    },
    {
      key: "unknownSource",
      label: t("maintenanceQueueUnknownSource"),
      description: t("maintenanceQueueUnknownSourceDesc"),
    },
    {
      key: "overridden",
      label: t("maintenanceQueueOverridden"),
      description: t("maintenanceQueueOverriddenDesc"),
    },
  ];
}

function maintenanceQueueItems(key) {
  const items = {
    missingImage: () => attractions.filter((item) => !hasReliableAttractionImage(item)),
    suspiciousImage: () => attractions.filter((item) => isSuspiciousImage(item, localImages[item.id])),
    cityCoordinate: () => attractions.filter((item) => coordinatePrecisionClass(item) === "precision-city"),
    districtCoordinate: () => attractions.filter((item) => coordinatePrecisionClass(item) === "precision-district"),
    unknownSource: () => attractions.filter((item) => !hasKnownAttractionSource(item)),
    overridden: () => attractions.filter((item) => state.maintenanceOverrides[item.id]),
  }[key];
  return items ? items().sort(maintenanceQueueSort) : [];
}

function maintenanceQueueSort(a, b) {
  return ratingFilterOrder.indexOf(a.rating) - ratingFilterOrder.indexOf(b.rating) || a.province.localeCompare(b.province, "zh-CN") || a.name.localeCompare(b.name, "zh-CN");
}

function jumpToMaintenanceQueue(key) {
  const items = maintenanceQueueItems(key);
  if (!items.length) return;
  const currentIndex = items.findIndex((item) => item.id === state.selectedId);
  const item = items[(currentIndex + 1) % items.length] || items[0];
  showAttractionForMaintenance(item);
}

function showAttractionForMaintenance(item) {
  state.search = "";
  state.province = item.province;
  state.category = "all";
  state.theme = "all";
  state.season = "all";
  state.ratingFilters = new Set([...state.ratingFilters, item.rating]);
  state.selectedId = item.id;

  if (els.searchInput) els.searchInput.value = "";
  if (els.provinceSelect) els.provinceSelect.value = item.province;
  if (els.categorySelect) els.categorySelect.value = "all";
  if (els.themeSelect) els.themeSelect.value = "all";
  if (els.seasonSelect) els.seasonSelect.value = "all";
  syncRatingFilterButtons();
  render();
  focusAttraction(item, true);
}

window.CHINA_MAINTENANCE_QUEUE_JUMP = jumpToMaintenanceQueue;

function fillMaintenanceForm(item) {
  const fieldValues = item
    ? {
        lat: item.lat,
        lng: item.lng,
        coordinateLevel: item.coordinateLevel || "城市",
        coordinateLabel: item.coordinateLabel || "",
        category: attractionCategory(item),
        sourceKey: attractionSourceKey(item),
        dataUpdated: item.dataUpdated || sourceUpdatedAt(attractionSource(item)),
        themes: attractionThemes(item),
        seasons: attractionSeasons(item),
        note: item.maintenanceNote || state.maintenanceOverrides[item.id]?.note || "",
      }
    : {
        lat: "",
        lng: "",
        coordinateLevel: "城市",
        coordinateLabel: "",
        category: "other",
        sourceKey: "",
        dataUpdated: "",
        themes: [],
        seasons: [],
        note: "",
      };

  if (els.maintenanceLat) els.maintenanceLat.value = fieldValues.lat;
  if (els.maintenanceLng) els.maintenanceLng.value = fieldValues.lng;
  if (els.maintenanceCoordinateLevel) els.maintenanceCoordinateLevel.value = fieldValues.coordinateLevel;
  if (els.maintenanceCoordinateLabel) els.maintenanceCoordinateLabel.value = fieldValues.coordinateLabel;
  if (els.maintenanceCategory) els.maintenanceCategory.value = fieldValues.category;
  if (els.maintenanceSourceKey) els.maintenanceSourceKey.value = fieldValues.sourceKey;
  if (els.maintenanceDataUpdated) els.maintenanceDataUpdated.value = fieldValues.dataUpdated;
  if (els.maintenanceNote) els.maintenanceNote.value = fieldValues.note;
  setCheckedValues(els.maintenanceThemes, fieldValues.themes);
  setCheckedValues(els.maintenanceSeasons, fieldValues.seasons);
}

function setCheckedValues(container, values) {
  const selected = new Set(values);
  container?.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function setMaintenanceControlsDisabled(disabled) {
  [
    els.maintenanceLat,
    els.maintenanceLng,
    els.maintenanceCoordinateLevel,
    els.maintenanceCoordinateLabel,
    els.maintenanceCategory,
    els.maintenanceSourceKey,
    els.maintenanceDataUpdated,
    els.maintenanceNote,
    els.maintenanceSave,
    els.maintenanceDelete,
  ].forEach((control) => {
    if (control) control.disabled = disabled;
  });
  els.maintenanceThemes?.querySelectorAll("input").forEach((input) => {
    input.disabled = disabled;
  });
  els.maintenanceSeasons?.querySelectorAll("input").forEach((input) => {
    input.disabled = disabled;
  });
}

function saveSelectedMaintenanceOverride() {
  const item = getSelected();
  if (!item) return;
  const override = normalizeMaintenanceOverride({
    id: item.id,
    name: item.name,
    displayName: displayAttractionName(item),
    province: item.province,
    city: item.city || "",
    lat: els.maintenanceLat?.value,
    lng: els.maintenanceLng?.value,
    coordinateLevel: els.maintenanceCoordinateLevel?.value,
    coordinateLabel: els.maintenanceCoordinateLabel?.value,
    categoryOverride: els.maintenanceCategory?.value,
    themeOverride: checkedMaintenanceValues(els.maintenanceThemes),
    seasonOverride: checkedMaintenanceValues(els.maintenanceSeasons),
    sourceKey: els.maintenanceSourceKey?.value,
    dataUpdated: els.maintenanceDataUpdated?.value,
    note: els.maintenanceNote?.value,
    updatedAt: new Date().toISOString(),
  });
  if (!override) return;
  state.maintenanceOverrides[item.id] = override;
  commitMaintenanceOverrides(t("maintenanceSaved"), item.id);
}

function deleteSelectedMaintenanceOverride() {
  const item = getSelected();
  if (!item) return;
  delete state.maintenanceOverrides[item.id];
  commitMaintenanceOverrides(t("maintenanceDeleted"), item.id);
}

function checkedMaintenanceValues(container) {
  return [...(container?.querySelectorAll("input[type='checkbox']:checked") || [])].map((input) => input.value);
}

function commitMaintenanceOverrides(message, selectedId = state.selectedId) {
  saveMaintenanceOverrides();
  correctedCentersById.delete(selectedId);
  applyMaintenanceOverridesToAttractions();
  hydrateAttractionTrustMetadata();
  state.selectedId = selectedId && attractionsById.has(selectedId) ? selectedId : null;
  render();
  if (els.maintenanceSummary) els.maintenanceSummary.textContent = message;
  showToast(message);
}

function exportMaintenanceOverrides() {
  const rows = Object.values(state.maintenanceOverrides);
  const payload = {
    generatedAt: new Date().toISOString(),
    datasetVersion: sourceIndex.datasetVersion || "",
    count: rows.length,
    overrides: rows,
  };
  downloadJson(payload, "maintenance-overrides.json");
  if (els.maintenanceSummary) {
    els.maintenanceSummary.textContent = t("maintenanceOverridesExported");
  }
  showToast(t("maintenanceOverridesExported"));
}

function exportMaintenanceAuditReport() {
  const payload = buildMaintenanceAuditReport(20);
  downloadJson(payload, "maintenance-audit.json");
  if (els.maintenanceSummary) {
    els.maintenanceSummary.textContent = t("maintenanceAuditExported");
  }
  showToast(t("maintenanceAuditExported"));
}

function buildMaintenanceAuditReport(limit = 20) {
  const rows = attractions.map((item) => {
    const image = effectiveAttractionImage(item);
    const hasImage = hasReliableAttractionImage(item);
    const suspicious = isSuspiciousImage(item, image);
    const sourceKey = attractionSourceKey(item);
    return {
      item,
      image,
      hasImage,
      suspicious,
      sourceKey,
      hasKnownSource: Boolean(sourceIndex.sources?.[sourceKey]),
      hasReviewDecision: Boolean(state.reviewDecisions[item.id]),
      hasMaintenanceOverride: Boolean(state.maintenanceOverrides[item.id]),
    };
  });
  const missingImages = rows.filter((row) => !row.hasImage);
  const suspiciousImages = rows.filter((row) => row.suspicious);
  const cityCoordinates = rows.filter((row) => coordinatePrecisionClass(row.item) === "precision-city");
  const districtCoordinates = rows.filter((row) => coordinatePrecisionClass(row.item) === "precision-district");
  const unknownSources = rows.filter((row) => !row.hasKnownSource);
  const maintenanceRows = rows.filter((row) => row.hasMaintenanceOverride);
  const counts = {
    attractions: attractions.length,
    ...prefixCountKeys(countObject(rows, (row) => row.item.rating || "unknown"), "rating."),
    exactCoordinates: rows.filter((row) => coordinatePrecisionClass(row.item) === "precision-exact").length,
    districtCoordinates: districtCoordinates.length,
    cityCoordinates: cityCoordinates.length,
    reliableImages: rows.filter((row) => row.hasImage).length,
    missingImages: missingImages.length,
    suspiciousImages: suspiciousImages.length,
    reviewDecisions: Object.keys(state.reviewDecisions).length,
    maintenanceOverrides: Object.keys(state.maintenanceOverrides).length,
    unknownSources: unknownSources.length,
  };

  return {
    generatedAt: new Date().toISOString(),
    datasetVersion: sourceIndex.datasetVersion || "",
    updatedAt: sourceIndex.updatedAt || "",
    maintainer: sourceIndex.maintainer || "",
    counts,
    quality: buildQualityMetrics(counts),
    coordinateLevels: countObject(rows, (row) => row.item.coordinateLevel || "unknown"),
    sources: countObject(rows, (row) => row.sourceKey || "unknown"),
    reviewActions: countObject(Object.values(state.reviewDecisions), (row) => row.action || "unknown"),
    provinceWorkload: maintenanceProvinceWorkload(rows).slice(0, limit),
    queues: {
      missingImages: maintenanceAuditSampleRows(missingImages, limit),
      suspiciousImages: maintenanceAuditSampleRows(suspiciousImages, limit),
      cityCoordinates: maintenanceAuditSampleRows(cityCoordinates, limit),
      districtCoordinates: maintenanceAuditSampleRows(districtCoordinates, limit),
      unknownSources: maintenanceAuditSampleRows(unknownSources, limit),
      maintenanceOverrides: maintenanceAuditSampleRows(maintenanceRows, limit),
    },
  };
}

function maintenanceAuditSampleRows(rows, limit) {
  return rows.slice(0, limit).map((row) => ({
    ...maintenanceAttractionRecord(row.item),
    sourceKey: row.sourceKey,
    imageUrl: row.image?.url || "",
    hasImage: row.hasImage,
    suspicious: row.suspicious,
    imageQualityReasons: imageQualityReasons(row.item, row.image),
    hasReviewDecision: row.hasReviewDecision,
    hasMaintenanceOverride: row.hasMaintenanceOverride,
  }));
}

function maintenanceProvinceWorkload(rows) {
  const byProvince = new Map();
  rows.forEach((row) => {
    const province = row.item.province || "unknown";
    const entry =
      byProvince.get(province) ||
      {
        province,
        missingImages: 0,
        suspiciousImages: 0,
        cityCoordinates: 0,
        districtCoordinates: 0,
        unknownSources: 0,
        workload: 0,
      };
    if (!row.hasImage) entry.missingImages += 1;
    if (row.suspicious) entry.suspiciousImages += 1;
    if (row.item.coordinateLevel === "城市") entry.cityCoordinates += 1;
    if (row.item.coordinateLevel === "区县") entry.districtCoordinates += 1;
    if (!row.hasKnownSource) entry.unknownSources += 1;
    entry.workload =
      entry.missingImages + entry.suspiciousImages + entry.cityCoordinates + entry.districtCoordinates + entry.unknownSources;
    byProvince.set(province, entry);
  });
  return [...byProvince.values()].sort((a, b) => b.workload - a.workload || a.province.localeCompare(b.province, "zh-CN"));
}

function countObject(items, getKey) {
  return countBy(items, getKey)
    .sort((a, b) => b.count - a.count || String(a.key).localeCompare(String(b.key), "zh-CN"))
    .reduce((acc, item) => {
      acc[item.key] = item.count;
      return acc;
    }, {});
}

function prefixCountKeys(object, prefix) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [`${prefix}${key}`, value]));
}

function buildQualityMetrics(counts) {
  const total = counts.attractions || 0;
  return {
    coordinateExactRate: percent(counts.exactCoordinates, total),
    imageCoverageRate: percent(counts.reliableImages, total),
    sourceCoverageRate: percent(total - counts.unknownSources, total),
    reviewCoverageRate: percent(counts.reviewDecisions, total),
  };
}

async function importMaintenanceOverrides(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const rows = payload.overrides || payload.maintenanceOverrides || payload;
    const incoming = normalizeMaintenanceOverrides(rows);
    state.maintenanceOverrides = { ...state.maintenanceOverrides, ...incoming };
    commitMaintenanceOverrides(t("maintenanceImported"));
  } catch {
    if (els.maintenanceSummary) {
      els.maintenanceSummary.textContent = t("maintenanceImportError");
    }
    showToast(t("maintenanceImportError"), "error");
  } finally {
    event.target.value = "";
  }
}

function renderImageReview() {
  if (!els.reviewList || !state.imageReviewOpen) return;
  const items = getReviewItems();
  renderReviewQuickStats(reviewQueueStats());
  const decisions = Object.keys(state.reviewDecisions).length;
  els.reviewSummary.textContent = t("reviewSummary", { count: items.length, decisions });

  if (!items.length) {
    state.reviewSelectedId = null;
    els.reviewList.innerHTML = `<div class="empty-state">${escapeHtml(t("reviewNoMatches"))}</div>`;
    els.reviewPreview.innerHTML = `<p class="empty-state">${escapeHtml(t("reviewNoSelection"))}</p>`;
    syncReviewButtons();
    return;
  }

  if (!state.reviewSelectedId || !items.some((item) => item.id === state.reviewSelectedId)) {
    state.reviewSelectedId = items[0].id;
  }

  els.reviewList.innerHTML = items
    .slice(0, 180)
    .map((item) => {
      const image = localImages[item.id];
      const decision = state.reviewDecisions[item.id];
      const active = item.id === state.reviewSelectedId ? " active" : "";
      const status = decision ? decision.action : !isReliableImage(image) ? "missing" : isSuspiciousImage(item, image) ? "suspicious" : "image";
      const hasImage = isReliableImage(image) && !decisionHidesImage(decision);
      return `
        <button class="review-list-item${active}" type="button" data-id="${escapeHtml(item.id)}">
          <span>
            <strong>${escapeHtml(displayAttractionName(item))}</strong>
            <small>${escapeHtml(attractionLocationLabel(item))} · ${escapeHtml(ratingBadge(item))}</small>
            <span class="review-list-tags">
              <b class="review-mini-tag ${hasImage ? "image" : "missing"}">${escapeHtml(hasImage ? t("reviewWithImage") : t("reviewNoImage"))}</b>
              <b class="review-mini-tag ${escapeHtml(coordinatePrecisionClass(item))}">${escapeHtml(coordinatePrecisionText(item))}</b>
            </span>
          </span>
          <em class="review-status ${escapeHtml(status)}">${escapeHtml(reviewStatusLabel(status))}</em>
        </button>
      `;
    })
    .join("");

  els.reviewList.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.reviewSelectedId = button.dataset.id;
      renderImageReview();
    });
  });

  renderReviewPreview(attractionsById.get(state.reviewSelectedId));
  syncReviewButtons();
}

function getReviewItems() {
  const query = normalize(state.reviewSearch);
  return attractions
    .filter((item) => {
      const image = localImages[item.id];
      const decision = state.reviewDecisions[item.id];
      if (state.reviewFilter === "unreviewed" && decision) return false;
      if (state.reviewFilter === "missing" && isReliableImage(image) && !decisionHidesImage(decision)) return false;
      if (state.reviewFilter === "suspicious" && !isSuspiciousImage(item, image)) return false;
      if (state.reviewFilter === "withImage" && (!isReliableImage(image) || decisionHidesImage(decision))) return false;
      if (state.reviewFilter === "lowPrecision" && item.coordinateLevel === "景区") return false;
      if (state.reviewFilter === "flagged" && !decision) return false;
      return matchesReviewQuery(item, query);
    })
    .sort((a, b) => reviewSortScore(a) - reviewSortScore(b));
}

function matchesReviewQuery(item, query) {
  if (!query) return true;
  const searchable = normalize(
    [
      item.id,
      item.name,
      item.displayName,
      item.city,
      item.province,
      displayAttractionName(item),
      attractionLocationLabel(item),
      ...searchAliases(item),
    ].join(" "),
  );
  return searchable.includes(query);
}

function reviewQueueStats() {
  const query = normalize(state.reviewSearch);
  const scopedItems = attractions.filter((item) => matchesReviewQuery(item, query));
  return scopedItems.reduce(
    (stats, item) => {
      const image = localImages[item.id];
      const decision = state.reviewDecisions[item.id];
      const hasImage = isReliableImage(image) && !decisionHidesImage(decision);
      stats.total += 1;
      if (!decision) stats.unreviewed += 1;
      if (!hasImage) stats.missing += 1;
      if (isSuspiciousImage(item, image)) stats.suspicious += 1;
      if (hasImage) stats.withImage += 1;
      if (decision) stats.flagged += 1;
      if (item.coordinateLevel !== "景区") stats.lowPrecision += 1;
      return stats;
    },
    { total: 0, unreviewed: 0, missing: 0, suspicious: 0, withImage: 0, flagged: 0, lowPrecision: 0 },
  );
}

function renderReviewQuickStats(stats) {
  if (!els.reviewQuickStats) return;
  const rows = [
    { filter: "missing", label: t("reviewMissingOnly"), count: stats.missing },
    { filter: "suspicious", label: t("reviewSuspiciousOnly"), count: stats.suspicious },
    { filter: "unreviewed", label: t("reviewUnreviewedOnly"), count: stats.unreviewed },
    { filter: "withImage", label: t("reviewWithImage"), count: stats.withImage },
    { filter: "lowPrecision", label: t("reviewLowPrecision"), count: stats.lowPrecision },
    { filter: "flagged", label: t("reviewFlagged"), count: stats.flagged },
  ];
  els.reviewQuickStats.innerHTML = rows
    .map((row) => {
      const active = state.reviewFilter === row.filter ? " active" : "";
      const disabled = row.count ? "" : " disabled";
      return `
        <button class="review-quick-stat${active}" type="button" data-review-filter="${escapeHtml(row.filter)}" aria-pressed="${state.reviewFilter === row.filter}"${disabled}>
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.count)}</strong>
        </button>
      `;
    })
    .join("");
}

function reviewSortScore(item) {
  const image = localImages[item.id];
  const decision = state.reviewDecisions[item.id];
  if (decision?.action === "delete" || decision?.action === "replace" || decision?.action === "missing") return 0;
  if (!isReliableImage(image)) return 1;
  if (isSuspiciousImage(item, image)) return 2;
  if (decision?.action === "keep") return 3;
  return 4;
}

function renderReviewPreview(item) {
  if (!item) {
    els.reviewPreview.innerHTML = `<p class="empty-state">${escapeHtml(t("reviewNoSelection"))}</p>`;
    return;
  }
  const image = localImages[item.id];
  const hasImage = isReliableImage(image);
  const decision = state.reviewDecisions[item.id];
  els.reviewNote.value = decision?.note || "";
  els.reviewPreview.innerHTML = `
    <div class="review-preview-header">
      <p class="eyebrow">${escapeHtml(attractionLocationLabel(item))}</p>
      <h3>${escapeHtml(displayAttractionName(item))}</h3>
      <span class="precision-badge ${escapeHtml(coordinatePrecisionClass(item))}">${escapeHtml(coordinatePrecisionText(item))}</span>
    </div>
    ${
      hasImage
        ? `<img src="${escapeHtml(image.url)}" alt="${escapeHtml(displayAttractionName(item))}" loading="lazy" decoding="async" />`
        : `<div class="review-image-missing">${escapeHtml(t("reviewNoImage"))}</div>`
    }
    <dl class="review-meta">
      <div><dt>ID</dt><dd>${escapeHtml(item.id)}</dd></div>
      <div><dt>${escapeHtml(t("rating"))}</dt><dd>${escapeHtml(ratingMeta(item))}</dd></div>
      <div><dt>${escapeHtml(t("dataSource"))}</dt><dd>${escapeHtml(sourceLabel(attractionSource(item)))}</dd></div>
      <div><dt>${escapeHtml(t("reviewSource"))}</dt><dd>${
        hasImage
          ? `<a href="${escapeHtml(image.pageUrl || "#")}" target="_blank" rel="noreferrer">${escapeHtml(localizeImageCaption(image.caption))}</a>`
          : escapeHtml(t("reviewNoImage"))
      }</dd></div>
      <div><dt>${escapeHtml(t("reviewDecision"))}</dt><dd>${escapeHtml(decision ? reviewStatusLabel(decision.action) : "-")}</dd></div>
    </dl>
  `;
}

function syncReviewButtons() {
  const disabled = !state.reviewSelectedId;
  [els.reviewKeep, els.reviewReplace, els.reviewDelete, els.reviewMissing, els.reviewExport].forEach((button) => {
    if (button) button.disabled = button === els.reviewExport ? false : disabled;
  });
}

function recordReviewDecision(action) {
  const item = attractionsById.get(state.reviewSelectedId);
  if (!item) return;
  const image = localImages[item.id];
  const note = els.reviewNote.value.trim();
  state.reviewDecisions[item.id] = {
    id: item.id,
    name: item.name,
    displayName: displayAttractionName(item),
    province: item.province,
    city: item.city || "",
    action,
    note,
    imageUrl: image?.url || "",
    pageUrl: image?.pageUrl || "",
    replacementUrl: replacementUrlFromNote(note),
    updatedAt: new Date().toISOString(),
  };
  saveReviewDecisions();
  renderImageReview();
  showToast(t("reviewDecisionSaved", { name: displayAttractionName(item), action: reviewStatusLabel(action) }));
}

function exportReviewDecisions() {
  const rows = Object.values(state.reviewDecisions);
  const payload = {
    generatedAt: new Date().toISOString(),
    count: rows.length,
    decisions: rows,
  };
  downloadJson(payload, "image-maintenance-records.json");
  els.reviewSummary.textContent = t("reviewExported");
  showToast(t("reviewExported"));
}

function exportMaintenancePackage() {
  const missingImages = attractions.filter((item) => !hasReliableAttractionImage(item));
  const suspiciousImages = attractions.filter((item) => isSuspiciousImage(item, localImages[item.id]));
  const coordinateLevels = countBy(attractions, (item) => item.coordinateLevel || "unknown").reduce((acc, item) => {
    acc[item.key] = item.count;
    return acc;
  }, {});
  const coordinateAudit = countBy(attractions, coordinateAuditStatusKey).reduce((acc, item) => {
    acc[item.key] = item.count;
    return acc;
  }, {});
  const payload = {
    generatedAt: new Date().toISOString(),
    datasetVersion: sourceIndex.datasetVersion || "",
    counts: {
      attractions: attractions.length,
      missingImages: missingImages.length,
      suspiciousImages: suspiciousImages.length,
      reviewDecisions: Object.keys(state.reviewDecisions).length,
      maintenanceOverrides: Object.keys(state.maintenanceOverrides).length,
      favorites: state.favoriteIds.size,
    },
    coordinateLevels,
    coordinateAudit,
    sources: sourceIndex.sources || {},
    reviewDecisions: state.reviewDecisions,
    maintenanceOverrides: state.maintenanceOverrides,
    favorites: favoriteAttractions().map(maintenanceAttractionRecord),
    missingImages: missingImages.slice(0, 500).map(maintenanceAttractionRecord),
    suspiciousImages: suspiciousImages.slice(0, 500).map(maintenanceAttractionRecord),
    attractions: attractions.map((item) => ({
      ...maintenanceAttractionRecord(item),
      dataUpdated: item.dataUpdated || sourceUpdatedAt(attractionSource(item)),
      coordinateAuditStatus: coordinateAuditStatusKey(item),
      category: attractionCategory(item),
      themes: attractionThemes(item),
      seasons: attractionSeasons(item),
      hasImage: hasReliableAttractionImage(item),
      reviewAction: state.reviewDecisions[item.id]?.action || "",
    })),
  };
  downloadJson(payload, "china-travel-map-maintenance.json");
  if (els.reviewSummary) {
    els.reviewSummary.textContent = t("maintenanceExported");
  }
  showToast(t("maintenanceExported"));
}

function maintenanceAttractionRecord(item) {
  return {
    id: item.id,
    name: item.name,
    displayName: displayAttractionName(item),
    province: item.province,
    city: item.city || "",
    rating: item.rating,
    coordinateLevel: item.coordinateLevel,
    coordinateLabel: item.coordinateLabel,
    sourceKey: attractionSourceKey(item),
    sourceUrl: item.sourceUrl || sourceHref(attractionSource(item), item),
    lat: item.lat,
    lng: item.lng,
    hasMaintenanceOverride: Boolean(state.maintenanceOverrides[item.id]),
  };
}

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function importReviewDecisions(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const imported = normalizeReviewPayload(payload);
    state.reviewDecisions = { ...state.reviewDecisions, ...imported };
    saveReviewDecisions();
    renderImageReview();
    render();
    els.reviewSummary.textContent = t("reviewImported");
    showToast(t("reviewImported"));
  } catch {
    els.reviewSummary.textContent = t("reviewImportError");
    showToast(t("reviewImportError"), "error");
  } finally {
    event.target.value = "";
  }
}

function normalizeReviewPayload(payload) {
  const raw = payload?.decisions || payload;
  const rows = Array.isArray(raw) ? raw : Object.values(raw || {});
  return rows.reduce((decisions, row) => {
    if (!row || !reviewActionValues.has(row.action) || !row.id) return decisions;
    const note = String(row.note || "").trim();
    decisions[row.id] = {
      id: row.id,
      name: row.name || row.displayName || "",
      displayName: row.displayName || row.name || "",
      province: row.province || "",
      city: row.city || "",
      action: row.action,
      note,
      imageUrl: row.imageUrl || "",
      pageUrl: row.pageUrl || "",
      replacementUrl: row.replacementUrl || replacementUrlFromNote(note),
      updatedAt: row.updatedAt || new Date().toISOString(),
    };
    return decisions;
  }, {});
}

function replacementUrlFromNote(note) {
  const value = String(note || "").trim().replace(/\\/g, "/");
  return isLocalImageUrl(value) && /\.(jpe?g|png|webp)$/i.test(value) ? value : "";
}

function reviewStatusLabel(status) {
  const labels = {
    image: t("reviewWithImage"),
    missing: t("reviewMissing"),
    suspicious: t("reviewSuspicious"),
    keep: t("reviewKeep"),
    replace: t("reviewReplace"),
    delete: t("reviewDelete"),
  };
  return labels[status] || status;
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

function searchAliases(item) {
  if (attractionSearchAliasCache.has(item.id)) return attractionSearchAliasCache.get(item.id);
  const aliases = unique([
    ...(Object.values(localizedAttractionNames[item.id] || {})),
    ...semanticSearchAliases(item),
    ...roughPinyinAlias([item.name, item.displayName, item.coordinateLabel].filter(Boolean).join(" ")),
  ].filter(Boolean));
  attractionSearchAliasCache.set(item.id, aliases);
  return aliases;
}

function semanticSearchAliases(item) {
  const text = [item.name, item.displayName, item.coordinateLabel, item.province, item.city].filter(Boolean).join(" ");
  const aliases = [];
  const rules = [
    [/泰山/, "taishan tai shan mount tai"],
    [/黄山|黃山/, "huangshan huang shan yellow mountain"],
    [/华山|華山/, "huashan hua shan mount hua"],
    [/衡山/, "hengshan heng shan"],
    [/恒山|恆山/, "hengshan heng shan"],
    [/嵩山|少林/, "songshan song shan shaolin"],
    [/长城|長城|八达岭|八達嶺|慕田峪|居庸关|司马台|司馬台/, "greatwall great wall changcheng"],
    [/故宫|故宮|紫禁城/, "forbidden city gugong palace museum"],
    [/天坛|天壇/, "temple of heaven tiantan"],
    [/颐和园|頤和園/, "summer palace yiheyuan"],
    [/孔庙|孔廟|孔府|孔林|曲阜|国子监|國子監/, "confucius kongmiao kong miao qufu"],
    [/西湖/, "west lake xihu"],
    [/九寨沟|九寨溝/, "jiuzhaigou jiu zhai gou"],
    [/张家界|張家界/, "zhangjiajie zhang jia jie"],
    [/兵马俑|兵馬俑|秦始皇/, "terracotta warriors bingmayong"],
    [/龙门石窟|龍門石窟/, "longmen grottoes longmen shiku"],
    [/大足石刻/, "dazu rock carvings dazu shike"],
    [/布达拉|布達拉/, "potala palace budala"],
    [/莫高窟|敦煌/, "mogao caves dunhuang"],
  ];
  rules.forEach(([pattern, alias]) => {
    if (pattern.test(text)) aliases.push(alias);
  });
  return aliases;
}

function roughPinyinAlias(value) {
  const map = {
    北: "bei",
    京: "jing",
    上: "shang",
    海: "hai",
    天: "tian",
    津: "jin",
    重: "chong",
    庆: "qing",
    廣: "guang",
    广: "guang",
    东: "dong",
    東: "dong",
    西: "xi",
    南: "nan",
    河: "he",
    山: "shan",
    湖: "hu",
    江: "jiang",
    浙: "zhe",
    安: "an",
    徽: "hui",
    福: "fu",
    建: "jian",
    云: "yun",
    雲: "yun",
    贵: "gui",
    貴: "gui",
    州: "zhou",
    四: "si",
    川: "chuan",
    陕: "shan",
    陝: "shan",
    甘: "gan",
    肃: "su",
    肅: "su",
    青: "qing",
    宁: "ning",
    寧: "ning",
    新: "xin",
    疆: "jiang",
    泰: "tai",
    黄: "huang",
    黃: "huang",
    华: "hua",
    華: "hua",
    衡: "heng",
    恒: "heng",
    恆: "heng",
    嵩: "song",
    长: "chang",
    長: "chang",
    城: "cheng",
    故: "gu",
    宫: "gong",
    宮: "gong",
    坛: "tan",
    壇: "tan",
    颐: "yi",
    頤: "yi",
    和: "he",
    园: "yuan",
    園: "yuan",
    孔: "kong",
    庙: "miao",
    廟: "miao",
    府: "fu",
    林: "lin",
    曲: "qu",
    阜: "fu",
    国: "guo",
    國: "guo",
    子: "zi",
    监: "jian",
    監: "jian",
    九: "jiu",
    寨: "zhai",
    沟: "gou",
    溝: "gou",
    张: "zhang",
    張: "zhang",
    家: "jia",
    界: "jie",
    龙: "long",
    龍: "long",
    门: "men",
    門: "men",
    石: "shi",
    窟: "ku",
    大: "da",
    足: "zu",
    刻: "ke",
  };
  const parts = [...String(value || "")]
    .map((char) => map[char])
    .filter(Boolean);
  return parts.length ? unique([parts.join(""), parts.join(" ")]) : [];
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
