const attractions = window.CHINA_5A_ATTRACTIONS || [];
const meta = window.CHINA_5A_META || {};
const localImages = window.CHINA_5A_IMAGES || {};

const highlightColor = "#c73f32";
const fallbackImage = localImages.fallback || {
  url: "assets/images/fallback.jpg",
  pageUrl:
    "https://commons.wikimedia.org/wiki/File:Mutianyu_%E2%80%93_Panorama_(Greg_Zaal_via_Poly_Haven).jpg",
  caption: "暂无该景点本地实景图，显示通用景区图",
};

const allRegionsValue = "全部";
const languageStorageKey = "china5a.language";
const languages = {
  "zh-CN": { htmlLang: "zh-CN" },
  "zh-TW": { htmlLang: "zh-Hant" },
  en: { htmlLang: "en" },
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
};

const chinaBounds = L.latLngBounds([18, 73], [54, 135]);
const state = {
  search: "",
  province: allRegionsValue,
  language: resolveInitialLanguage(),
  selectedId: null,
  distributionOpen: true,
  controlOpen: true,
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
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // Local storage can be unavailable in strict privacy contexts.
  }

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
      selectAttraction(item, { fly: true });
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

  if (item && options.fly) {
    focusAttraction(item, true);
  }

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
      selectAttraction(relatedItem, { fly: true });
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
        weight: 3,
        opacity: 0.95,
        fillColor: highlightColor,
        fillOpacity: 0.18,
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
    opacity: 0.92,
    fillColor: highlightColor,
    fillOpacity: 0.18,
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
  try {
    const storedLanguage = localStorage.getItem(languageStorageKey);
    if (languages[storedLanguage]) return storedLanguage;
  } catch {
    // Ignore unavailable local storage and fall back to the browser locale.
  }

  const browserLanguage = navigator.language.toLocaleLowerCase();
  if (browserLanguage.startsWith("zh-tw") || browserLanguage.startsWith("zh-hk") || browserLanguage.startsWith("zh-mo")) {
    return "zh-TW";
  }
  if (browserLanguage.startsWith("en")) return "en";
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
  return unique([region, provinceNames["zh-TW"][region], provinceNames.en[region]].filter(Boolean));
}

function osmLanguageHeader() {
  if (state.language === "en") return "en,zh-CN;q=0.8,zh;q=0.7";
  if (state.language === "zh-TW") return "zh-TW,zh-Hant;q=0.9,zh-CN;q=0.8,zh;q=0.7";
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
