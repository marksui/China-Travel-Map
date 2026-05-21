const attractions = window.CHINA_5A_ATTRACTIONS || [];
const meta = window.CHINA_5A_META || {};
const localImages = window.CHINA_5A_IMAGES || {};

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
    documentTitle: "中国 5A 与对标景点互动地图",
    siteNav: "站点导航",
    brand: "中国 5A 景点地图",
    searchPlaceholder: "搜索景点或地区",
    clearSearch: "清空搜索",
    mapTools: "地图工具",
    collapseFilters: "收起筛选",
    openFilters: "打开筛选",
    fitResults: "定位结果",
    mapGuide: "地图说明",
    language: "语言",
    mapAria: "中国 5A 与对标景点地图",
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
    heroLine1: "欢迎使用中国 5A 景点",
    heroLine2: "在线地图",
    intro: "覆盖中国大陆官方 5A 景区，并加入中华民国（台湾）、香港、澳门的对标 5A 景点。",
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
    officialBasis: "文化和旅游部国家 AAAAA 级旅游景区",
    peerBasis: "台港澳官方旅游体系中的代表性景点，对标大陆 5A 展示",
    osmBoundary: "OSM 面边界",
    imageSourcePrefix: "图片来源：",
    fallbackImageCaption: "通用景区占位图（慕田峪长城全景）",
    sourceNote:
      '大陆 5A 数据来自用户提供的 <span>China-5A-tourist-attraction.md</span>；台港澳为对标 5A 手动补充；可用面边界来自 OpenStreetMap；地图底图 © OpenStreetMap。',
  },
  "zh-TW": {
    documentTitle: "中國 5A 與對標景點互動地圖",
    siteNav: "站點導覽",
    brand: "中國 5A 景點地圖",
    searchPlaceholder: "搜尋景點或地區",
    clearSearch: "清除搜尋",
    mapTools: "地圖工具",
    collapseFilters: "收起篩選",
    openFilters: "打開篩選",
    fitResults: "定位結果",
    mapGuide: "地圖說明",
    language: "語言",
    mapAria: "中國 5A 與對標景點地圖",
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
    heroLine1: "歡迎使用中國 5A 景點",
    heroLine2: "線上地圖",
    intro: "覆蓋中國大陸官方 5A 景區，並加入中華民國（臺灣）、香港、澳門的對標 5A 景點。",
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
    officialBasis: "文化和旅遊部國家 AAAAA 級旅遊景區",
    peerBasis: "臺港澳官方旅遊體系中的代表性景點，對標大陸 5A 展示",
    osmBoundary: "OSM 面邊界",
    imageSourcePrefix: "圖片來源：",
    fallbackImageCaption: "通用景區占位圖（慕田峪長城全景）",
    sourceNote:
      '大陸 5A 資料來自使用者提供的 <span>China-5A-tourist-attraction.md</span>；臺港澳為對標 5A 手動補充；可用面邊界來自 OpenStreetMap；地圖底圖 © OpenStreetMap。',
  },
  en: {
    documentTitle: "China 5A & Peer Attractions Interactive Map",
    siteNav: "Site navigation",
    brand: "China 5A Attractions Map",
    searchPlaceholder: "Search attractions or regions",
    clearSearch: "Clear search",
    mapTools: "Map tools",
    collapseFilters: "Hide filters",
    openFilters: "Show filters",
    fitResults: "Fit results",
    mapGuide: "Map guide",
    language: "Language",
    mapAria: "Map of China 5A and peer attractions",
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
    heroLine1: "China 5A Attractions",
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
    officialBasis: "Ministry of Culture and Tourism national AAAAA tourist attraction",
    peerBasis: "Representative sites from Taiwan, Hong Kong, and Macao tourism systems, shown as 5A peers",
    osmBoundary: "OSM polygon",
    imageSourcePrefix: "Image source: ",
    fallbackImageCaption: "generic scenic placeholder (Mutianyu Great Wall panorama)",
    sourceNote:
      'Mainland 5A data comes from the user-provided <span>China-5A-tourist-attraction.md</span>; Taiwan, Hong Kong, and Macao peer sites were added manually; available polygons come from OpenStreetMap; basemap © OpenStreetMap.',
  },
  ko: {
    documentTitle: "중국 5A 및 준 5A 명소 인터랙티브 지도",
    siteNav: "사이트 내비게이션",
    brand: "중국 5A 명소 지도",
    searchPlaceholder: "명소 또는 지역 검색",
    clearSearch: "검색 지우기",
    mapTools: "지도 도구",
    collapseFilters: "필터 접기",
    openFilters: "필터 열기",
    fitResults: "결과 보기",
    mapGuide: "지도 안내",
    language: "언어",
    mapAria: "중국 5A 및 준 5A 명소 지도",
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
    heroLine1: "중국 5A 명소",
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
    officialBasis: "문화여유부 국가 AAAAA급 관광지",
    peerBasis: "대만, 홍콩, 마카오 관광 체계의 대표 명소를 본토 5A와 비교해 표시",
    osmBoundary: "OSM 면 경계",
    imageSourcePrefix: "이미지 출처: ",
    fallbackImageCaption: "공통 명소 대체 이미지(무톈위 만리장성 전경)",
    sourceNote:
      '중국 본토 5A 데이터는 사용자가 제공한 <span>China-5A-tourist-attraction.md</span>에서 가져왔습니다. 대만, 홍콩, 마카오 준 5A 명소는 수동으로 보완했으며, 사용 가능한 면 경계는 OpenStreetMap, 배경 지도는 © OpenStreetMap입니다.',
  },
  ja: {
    documentTitle: "中国 5A と準 5A 観光地インタラクティブ地図",
    siteNav: "サイトナビゲーション",
    brand: "中国 5A 観光地マップ",
    searchPlaceholder: "観光地または地域を検索",
    clearSearch: "検索をクリア",
    mapTools: "地図ツール",
    collapseFilters: "フィルターを閉じる",
    openFilters: "フィルターを開く",
    fitResults: "結果に合わせる",
    mapGuide: "地図ガイド",
    language: "言語",
    mapAria: "中国 5A と準 5A 観光地の地図",
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
    heroLine1: "中国 5A 観光地",
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
    officialBasis: "文化観光部 国家 AAAAA 級観光地",
    peerBasis: "台湾、香港、マカオの観光体系における代表的観光地を本土 5A 相当として表示",
    osmBoundary: "OSM 面境界",
    imageSourcePrefix: "画像出典: ",
    fallbackImageCaption: "共通の観光地プレースホルダー（慕田峪長城の全景）",
    sourceNote:
      '中国本土 5A データはユーザー提供の <span>China-5A-tourist-attraction.md</span> に基づきます。台湾、香港、マカオの準 5A は手動で追加しました。利用可能な面境界は OpenStreetMap、背景地図は © OpenStreetMap です。',
  },
  th: {
    documentTitle: "แผนที่โต้ตอบแหล่งท่องเที่ยว 5A และเทียบเท่าในจีน",
    siteNav: "การนำทางไซต์",
    brand: "แผนที่แหล่งท่องเที่ยว 5A ของจีน",
    searchPlaceholder: "ค้นหาแหล่งท่องเที่ยวหรือภูมิภาค",
    clearSearch: "ล้างการค้นหา",
    mapTools: "เครื่องมือแผนที่",
    collapseFilters: "ซ่อนตัวกรอง",
    openFilters: "เปิดตัวกรอง",
    fitResults: "ดูผลลัพธ์",
    mapGuide: "คำอธิบายแผนที่",
    language: "ภาษา",
    mapAria: "แผนที่แหล่งท่องเที่ยว 5A และเทียบเท่าในจีน",
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
    heroLine1: "แหล่งท่องเที่ยว 5A ของจีน",
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
    officialBasis: "แหล่งท่องเที่ยวระดับ AAAAA แห่งชาติของกระทรวงวัฒนธรรมและการท่องเที่ยว",
    peerBasis: "แหล่งเด่นในระบบท่องเที่ยวของไต้หวัน ฮ่องกง และมาเก๊า แสดงเป็นแหล่งเทียบเท่า 5A",
    osmBoundary: "ขอบเขตพื้นที่ OSM",
    imageSourcePrefix: "ที่มาภาพ: ",
    fallbackImageCaption: "ภาพตัวอย่างทั่วไป (พาโนรามากำแพงเมืองจีนมู่เถียนยวี่)",
    sourceNote:
      'ข้อมูล 5A ของจีนแผ่นดินใหญ่มาจากไฟล์ <span>China-5A-tourist-attraction.md</span> ที่ผู้ใช้ให้มา; แหล่งเทียบเท่าในไต้หวัน ฮ่องกง และมาเก๊าเพิ่มด้วยตนเอง; ขอบเขตพื้นที่ที่มีมาจาก OpenStreetMap; แผนที่พื้นฐาน © OpenStreetMap.',
  },
  es: {
    documentTitle: "Mapa interactivo de atracciones 5A y equivalentes de China",
    siteNav: "Navegación del sitio",
    brand: "Mapa de atracciones 5A de China",
    searchPlaceholder: "Buscar atracciones o regiones",
    clearSearch: "Borrar búsqueda",
    mapTools: "Herramientas del mapa",
    collapseFilters: "Ocultar filtros",
    openFilters: "Mostrar filtros",
    fitResults: "Ver resultados",
    mapGuide: "Guía del mapa",
    language: "Idioma",
    mapAria: "Mapa de atracciones 5A y equivalentes de China",
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
    heroLine1: "Atracciones 5A de China",
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
    officialBasis: "Atracción turística nacional AAAAA del Ministerio de Cultura y Turismo",
    peerBasis: "Sitios representativos de los sistemas turísticos de Taiwán, Hong Kong y Macao, mostrados como equivalentes 5A",
    osmBoundary: "Polígono OSM",
    imageSourcePrefix: "Fuente de imagen: ",
    fallbackImageCaption: "marcador visual genérico (panorama de la Gran Muralla de Mutianyu)",
    sourceNote:
      'Los datos 5A de China continental provienen del archivo <span>China-5A-tourist-attraction.md</span> proporcionado por el usuario; los sitios equivalentes de Taiwán, Hong Kong y Macao se añadieron manualmente; los polígonos disponibles provienen de OpenStreetMap; mapa base © OpenStreetMap.',
  },
  ru: {
    documentTitle: "Интерактивная карта достопримечательностей 5A и аналогов в Китае",
    siteNav: "Навигация по сайту",
    brand: "Карта достопримечательностей 5A Китая",
    searchPlaceholder: "Поиск достопримечательностей или регионов",
    clearSearch: "Очистить поиск",
    mapTools: "Инструменты карты",
    collapseFilters: "Скрыть фильтры",
    openFilters: "Открыть фильтры",
    fitResults: "Показать результаты",
    mapGuide: "Описание карты",
    language: "Язык",
    mapAria: "Карта достопримечательностей 5A и аналогов в Китае",
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
    heroLine1: "Достопримечательности 5A Китая",
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
    officialBasis: "Национальная туристическая зона AAAAA Министерства культуры и туризма",
    peerBasis: "Представительные места туристических систем Тайваня, Гонконга и Макао, показанные как аналоги 5A",
    osmBoundary: "Полигон OSM",
    imageSourcePrefix: "Источник изображения: ",
    fallbackImageCaption: "универсальное изображение-заглушка (панорама Великой Китайской стены Мутяньюй)",
    sourceNote:
      'Данные 5A материкового Китая взяты из файла <span>China-5A-tourist-attraction.md</span>, предоставленного пользователем; аналоги Тайваня, Гонконга и Макао добавлены вручную; доступные полигоны взяты из OpenStreetMap; базовая карта © OpenStreetMap.',
  },
};

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
    "中华民国（台湾）": "中華民國（臺灣）",
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
    "中华民国（台湾）": "Taiwan",
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
    "中华民国（台湾）": "타이완",
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
    "中华民国（台湾）": "台湾",
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
    "中华民国（台湾）": "ไต้หวัน",
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
    "中华民国（台湾）": "Taiwán",
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
    "中华民国（台湾）": "Тайвань",
    香港: "Гонконг",
    澳门: "Макао",
  },
};

const chinaBounds = L.latLngBounds([18, 73], [54, 135]);
const state = {
  search: "",
  province: allRegionsValue,
  language: resolveInitialLanguage(),
  selectedId: null,
  distributionOpen: false,
  controlOpen: false,
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
  detailImage: document.querySelector("#detailImage"),
  detailImageLink: document.querySelector("#detailImageLink"),
  detailYear: document.querySelector("#detailYear"),
  detailBasis: document.querySelector("#detailBasis"),
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

  els.detailImage.addEventListener("error", () => {
    if (els.detailImage.dataset.fallback !== "true") {
      setDetailImage(fallbackImage, t("scenicImageAlt"));
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
      if (getSelected()) {
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
        item.province,
        ...regionSearchNames(item.province),
        item.coordinateLabel,
        item.coordinateLevel,
        item.ratingLabel || "",
        item.basis || "",
        ratingMeta(item),
        ratingDetail(item),
        basisText(item),
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
                <span class="card-name">${escapeHtml(item.name)}</span>
                <span class="card-meta">${escapeHtml(regionName(item.province))} · ${escapeHtml(ratingMeta(item))}</span>
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
      title: item.name,
    });

    marker.bindPopup(
      `<strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(regionName(item.province))} · ${escapeHtml(
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
  els.detailProvince.textContent = hasItem ? regionName(item.province) : t("chooseAttraction");
  els.detailName.textContent = hasItem ? item.name : t("noSelectionTitle");
  els.detailYear.textContent = hasItem ? ratingDetail(item) : "-";
  els.detailBasis.textContent = hasItem ? basisText(item) : "-";
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
              <strong>${escapeHtml(candidate.name)}</strong>
              <span>${escapeHtml(regionName(candidate.province))} · ${escapeHtml(ratingMeta(candidate))}</span>
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

function basisText(item) {
  return isPeerAttraction(item) ? t("peerBasis") : t("officialBasis");
}

function loadDetailImage(item) {
  setDetailImage(localImages[item.id] || fallbackImage, item.name);
}

function setDetailImage(image, alt) {
  const safeImage = image || fallbackImage;
  els.detailImage.dataset.fallback = safeImage.url === fallbackImage.url ? "true" : "false";
  els.detailImage.src = safeImage.url;
  els.detailImage.alt = alt;
  els.detailImageLink.href = safeImage.pageUrl || fallbackImage.pageUrl;
  els.detailImageLink.textContent = localizeImageCaption(safeImage.caption || fallbackImage.caption);
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
