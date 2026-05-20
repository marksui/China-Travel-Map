const attractions = window.CHINA_5A_ATTRACTIONS || [];
const meta = window.CHINA_5A_META || {};

const highlightColor = "#fa8072";
const fallbackImage = {
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mutianyu_%E2%80%93_Panorama_%28Greg_Zaal_via_Poly_Haven%29.jpg/1280px-Mutianyu_%E2%80%93_Panorama_%28Greg_Zaal_via_Poly_Haven%29.jpg",
  pageUrl:
    "https://commons.wikimedia.org/wiki/File:Mutianyu_%E2%80%93_Panorama_(Greg_Zaal_via_Poly_Haven).jpg",
  caption: "图片来源：Wikimedia Commons",
};
const imageQueryOverrides = {
  "山东-089": ["Nanshan Buddha Longkou", "烟台 龙口 南山", "龙口 南山大佛"],
};
const rejectedImageTerms = [
  "地图",
  "半岛",
  "行政区",
  "区划",
  "位置图",
  "标识牌",
  "指示牌",
  "示意图",
  "分布图",
  "路线图",
  "政区",
  "pdf",
  "djvu",
  "svg",
  "map",
  "locator",
  "location",
  "diagram",
  "sign",
  "logo",
  "flag",
  "seal",
  "coat of arms",
  "360°",
  "360度",
  "panorama",
  "全景",
  "图卷",
  "画卷",
  "藏品",
  "博物院藏",
  "文物",
  "painting",
  "drawing",
  "manuscript",
  "collection",
];

const chinaBounds = L.latLngBounds([18, 73], [54, 135]);
const state = {
  search: "",
  province: "全部",
  selectedId: null,
  distributionOpen: true,
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
  resetFilters: document.querySelector("#resetFilters"),
  fitFiltered: document.querySelector("#fitFiltered"),
  toggleDistribution: document.querySelector("#toggleDistribution"),
  distributionPanel: document.querySelector("#distributionPanel"),
  provinceBars: document.querySelector("#provinceBars"),
  distributionCaption: document.querySelector("#distributionCaption"),
  detailPanel: document.querySelector("#detailPanel"),
  closeDetail: document.querySelector("#closeDetail"),
  detailProvince: document.querySelector("#detailProvince"),
  detailName: document.querySelector("#detailName"),
  detailImage: document.querySelector("#detailImage"),
  detailImageLink: document.querySelector("#detailImageLink"),
  detailYear: document.querySelector("#detailYear"),
  detailPrecision: document.querySelector("#detailPrecision"),
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
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
  maxZoom: 16,
  subdomains: "abcd",
  updateWhenIdle: true,
  updateWhenZooming: false,
  keepBuffer: 1,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
const imageCache = new Map();
const footprintCache = new Map();
const selectionLayer = L.layerGroup().addTo(map);
let activeImageRequest = 0;
let activeFootprintRequest = 0;

function init() {
  renderBaseStats();
  populateProvinceSelect();
  bindEvents();
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
    `<option value="全部">全部省份</option>`,
    ...provinces.map((province) => `<option value="${escapeHtml(province)}">${province}</option>`),
  ].join("");
}

function bindEvents() {
  els.detailImage.addEventListener("error", () => {
    if (els.detailImage.src !== fallbackImage.url) {
      setDetailImage(fallbackImage, "景区图片");
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
    state.province = "全部";
    els.searchInput.value = "";
    els.provinceSelect.value = "全部";
    render();
    fitTo(attractions);
  });

  els.fitFiltered.addEventListener("click", () => fitTo(getFilteredAttractions()));

  els.toggleDistribution.addEventListener("click", () => {
    state.distributionOpen = !state.distributionOpen;
    els.distributionPanel.classList.toggle("collapsed", !state.distributionOpen);
    els.toggleDistribution.setAttribute("aria-expanded", String(state.distributionOpen));
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
      selectAttraction(null);
    }
  });
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
    const matchesProvince = state.province === "全部" || item.province === state.province;
    const searchable = normalize(
      `${item.name} ${item.province} ${item.coordinateLabel} ${item.coordinateLevel}`,
    );
    const matchesSearch = !query || searchable.includes(query);
    return matchesProvince && matchesSearch;
  });
}

function updateSummary(filtered) {
  els.visibleStat.textContent = String(filtered.length);
  els.resultCount.textContent = `${filtered.length} 个结果`;
  const provinceText = state.province === "全部" ? "全国" : state.province;
  els.filterSubtitle.textContent = `${provinceText} · 5A 景区`;
}

function renderList(items) {
  if (!items.length) {
    els.attractionList.innerHTML = `<li class="empty-state">没有匹配的景区</li>`;
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
                <span class="card-meta">${escapeHtml(item.province)} · ${item.year} 年评为 5A</span>
              </span>
              <span class="year-badge">5A</span>
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
    const marker = L.marker([item.lat, item.lng], {
      icon: markerIcon(item),
      title: item.name,
    });

    marker.bindPopup(
      `<strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(item.province)} · ${
        item.year
      } 年评为 5A`,
    );

    marker.on("click", () => selectAttraction(item));
    markersById.set(item.id, marker);
    markerLayer.addLayer(marker);
  });
}

function renderDistribution(items) {
  const counts = countBy(items, (item) => item.province).sort((a, b) => b.count - a.count);
  const max = Math.max(1, ...counts.map((item) => item.count));
  els.distributionCaption.textContent = `${items.length} 个景区`;

  if (!counts.length) {
    els.provinceBars.innerHTML = `<div class="empty-state">暂无数据</div>`;
    return;
  }

  els.provinceBars.innerHTML = counts
    .map(
      (item) => `
        <button class="province-bar related-item" type="button" data-province="${escapeHtml(
          item.key,
        )}">
          <span>${escapeHtml(item.key)}</span>
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
  els.detailProvince.textContent = hasItem ? item.province : "选择景区";
  els.detailName.textContent = hasItem ? item.name : "在地图或列表中选择一个景区";
  els.detailYear.textContent = hasItem ? `${item.year} 年` : "-";
  els.detailPrecision.textContent = hasItem ? "正在查找 OSM 面边界..." : "-";
  els.focusSelected.disabled = !hasItem;
  els.filterProvince.disabled = !hasItem;

  if (!hasItem) {
    setDetailImage(fallbackImage, "景区图片");
    clearFootprint();
    els.relatedCaption.textContent = "-";
    els.relatedList.innerHTML = `<div class="empty-state">暂无选择</div>`;
    return;
  }

  loadDetailImage(item);
  loadAttractionFootprint(item);

  const related = attractions
    .filter((candidate) => candidate.province === item.province && candidate.id !== item.id)
    .slice(0, 8);

  els.relatedCaption.textContent = `${item.province} · ${related.length} 个`;
  els.relatedList.innerHTML = related.length
    ? related
        .map(
          (candidate) => `
            <button class="related-item" type="button" data-id="${candidate.id}">
              <strong>${escapeHtml(candidate.name)}</strong>
              <span>${candidate.year} 年评为 5A</span>
            </button>
          `,
        )
        .join("")
    : `<div class="empty-state">没有其他同省景区</div>`;

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
  renderApproximateFootprint(item, "正在查找 OSM 面边界...");

  const cached = footprintCache.get(item.id);
  if (cached) {
    renderFootprint(cached, item);
    return;
  }

  const footprint = await findAttractionFootprint(item);
  if (requestId !== activeFootprintRequest || state.selectedId !== item.id) return;

  footprintCache.set(item.id, footprint);
  renderFootprint(footprint, item);
}

async function findAttractionFootprint(item) {
  for (const query of footprintQueries(item)) {
    const footprint = await searchNominatimFootprint(query, item);
    if (footprint) return footprint;
  }

  return {
    kind: "approximate",
    label: "未找到可用面边界，暂用中心点近似范围",
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
    countrycodes: "cn",
    q: query,
  });

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { "Accept-Language": "zh-CN,zh;q=0.9" },
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
      label: `OSM 面边界 · ${best.properties?.name || item.coordinateLabel}`,
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
  if (text.includes("省") && !text.includes(item.coordinateLabel.toLocaleLowerCase("zh-CN"))) {
    const category = feature.properties?.category;
    const typeName = feature.properties?.type;
    if (category === "boundary" && typeName === "administrative") return false;
  }

  return true;
}

function scoreFootprintCandidate(feature, item) {
  const text = footprintCandidateText(feature);
  const category = feature.properties?.category || "";
  const type = feature.properties?.type || "";
  const center = featureCenter(feature);
  let score = 0;

  for (const token of footprintTokens(item)) {
    if (token && text.includes(token.toLocaleLowerCase("zh-CN"))) score += token.length >= 3 ? 3 : 1;
  }

  if (category === "tourism" || category === "leisure" || category === "historic") score += 4;
  if (category === "natural" || category === "boundary") score += 2;
  if (type === "administrative") score -= 1;

  if (center) {
    const distance = haversineKm([item.lat, item.lng], center);
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
    item.province,
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

function renderApproximateFootprint(item, label) {
  renderFootprint(
    {
      kind: "approximate",
      label,
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
    els.detailPrecision.textContent = footprint.label;
    fitFootprintBounds(layer, fit);
    return;
  }

  const circle = L.circle([item.lat, item.lng], {
    pane: "footprintPane",
    radius: footprint.radius || estimateFootprintRadius(item),
    color: highlightColor,
    weight: 2,
    opacity: 0.92,
    dashArray: "6 6",
    fillColor: highlightColor,
    fillOpacity: 0.1,
    interactive: false,
  }).addTo(selectionLayer);
  els.detailPrecision.textContent = footprint.label;
  fitFootprintBounds(circle, fit);
}

function fitFootprintBounds(layer, fit) {
  if (!fit) return;
  const bounds = layer.getBounds?.();
  if (bounds?.isValid()) {
    map.fitBounds(bounds.pad(0.22), {
      paddingTopLeft: [390, 70],
      paddingBottomRight: [370, 40],
      maxZoom: 14,
    });
  }
}

function clearFootprint() {
  activeFootprintRequest += 1;
  selectionLayer.clearLayers();
}

function estimateFootprintRadius(item) {
  if (item.coordinateLevel === "景区") return 1200;
  if (item.coordinateLevel === "城市") return 6000;
  return 18000;
}

function focusAttraction(item, openPopup = false) {
  map.flyTo([item.lat, item.lng], Math.max(map.getZoom(), 9), {
    animate: true,
    duration: 0.8,
  });

  const marker = markersById.get(item.id);
  if (marker && openPopup) {
    if (typeof markerLayer.zoomToShowLayer === "function") {
      markerLayer.zoomToShowLayer(marker, () => {
        syncActiveMapMarker(item);
        marker.openPopup();
      });
    } else {
      syncActiveMapMarker(item);
      marker.openPopup();
    }
  }
}

function fitTo(items) {
  if (!items.length) {
    map.fitBounds(chinaBounds, { padding: [24, 24] });
    return;
  }

  const bounds = L.latLngBounds(items.map((item) => [item.lat, item.lng]));
  if (bounds.isValid()) {
    map.fitBounds(bounds.pad(0.08), {
      paddingTopLeft: [390, 70],
      paddingBottomRight: [40, 40],
      maxZoom: 9,
    });
  }
}

function markerIcon(item, active = item.id === state.selectedId) {
  return L.divIcon({
    className: `map-marker-shell${active ? " selected" : ""}`,
    html: `<div class="map-marker"><span>5A</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 33],
    popupAnchor: [0, -28],
  });
}

function getSelected() {
  return attractions.find((item) => item.id === state.selectedId) || null;
}

function unique(items) {
  return [...new Set(items)];
}

async function loadDetailImage(item) {
  const requestId = ++activeImageRequest;
  setDetailImage({ ...fallbackImage, caption: "正在查找景区图片..." }, item.name);

  const cached = imageCache.get(item.id);
  if (cached) {
    setDetailImage(cached, item.name);
    return;
  }

  const image = await findAttractionImage(item);
  if (requestId !== activeImageRequest || state.selectedId !== item.id) return;

  imageCache.set(item.id, image);
  setDetailImage(image, item.name);
}

async function findAttractionImage(item) {
  const queries = imageQueries(item);

  for (const query of queries) {
    const commonsImage = await searchCommonsImage(query);
    if (commonsImage) return commonsImage;
  }

  for (const query of queries) {
    const wikipediaImage = await searchWikipediaImage(query);
    if (wikipediaImage) return wikipediaImage;
  }

  return fallbackImage;
}

function imageQueries(item) {
  const compactName = item.name
    .replace(/[（(].*?[）)]/g, "")
    .replace(/—|·|-/g, " ")
    .replace(/旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院|文化园区/g, "")
    .trim();
  const withoutProvince = compactName.replace(new RegExp(`^${item.province}`), "").trim();
  return unique([
    ...(imageQueryOverrides[item.id] || []),
    `${item.province} ${item.name}`,
    `${item.province} ${item.coordinateLabel}`,
    item.name,
    compactName,
    withoutProvince,
    item.coordinateLabel,
    `${item.coordinateLabel} ${item.province}`,
  ].filter(Boolean));
}

async function searchWikipediaImage(query) {
  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    generator: "search",
    gsrsearch: `${query} 中国`,
    gsrlimit: "4",
    prop: "pageimages|info",
    piprop: "thumbnail|name|original",
    pithumbsize: "720",
    inprop: "url",
    format: "json",
  });

  try {
    const response = await fetch(`https://zh.wikipedia.org/w/api.php?${params}`);
    const data = await response.json();
    const page = sortedPages(data).find(
      (candidate) => candidate.thumbnail?.source && isAllowedImageCandidate(candidate),
    );
    if (!page) return null;

    return {
      url: page.thumbnail.source,
      pageUrl: page.fullurl || "https://zh.wikipedia.org/",
      caption: `图片来源：维基百科 · ${page.title}`,
    };
  } catch {
    return null;
  }
}

async function searchCommonsImage(query) {
  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    generator: "search",
    gsrsearch: `${query} China`,
    gsrnamespace: "6",
    gsrlimit: "4",
    prop: "imageinfo",
    iiurlwidth: "720",
    iiprop: "url",
    format: "json",
  });

  try {
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
    const data = await response.json();
    const page = sortedPages(data).find(
      (candidate) => candidate.imageinfo?.[0]?.thumburl && isAllowedImageCandidate(candidate),
    );
    if (!page) return null;

    return {
      url: page.imageinfo[0].thumburl,
      pageUrl: page.imageinfo[0].descriptionurl || "https://commons.wikimedia.org/",
      caption: `图片来源：Wikimedia Commons · ${page.title.replace(/^File:/, "")}`,
    };
  } catch {
    return null;
  }
}

function sortedPages(data) {
  return Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
}

function isAllowedImageCandidate(candidate) {
  const info = candidate.imageinfo?.[0] || {};
  const metadata = info.extmetadata || {};
  const text = [
    candidate.title,
    candidate.pageimage,
    candidate.fullurl,
    info.url,
    info.thumburl,
    metadata.ObjectName?.value,
    metadata.ImageDescription?.value,
    metadata.Categories?.value,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("zh-CN")
    .replace(/<[^>]*>/g, " ");

  return !rejectedImageTerms.some((term) => text.includes(term));
}

function setDetailImage(image, alt) {
  els.detailImage.src = image.url;
  els.detailImage.alt = alt;
  els.detailImageLink.href = image.pageUrl;
  els.detailImageLink.textContent = image.caption;
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
  return String(value).trim().toLocaleLowerCase("zh-CN");
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
