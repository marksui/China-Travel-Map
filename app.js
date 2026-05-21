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

const chinaBounds = L.latLngBounds([18, 73], [54, 135]);
const state = {
  search: "",
  province: "全部",
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
const selectionLayer = L.layerGroup().addTo(map);
let activeFootprintRequest = 0;

function init() {
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
    `<option value="全部">全部地区</option>`,
    ...provinces.map((province) => `<option value="${escapeHtml(province)}">${province}</option>`),
  ].join("");
}

function bindEvents() {
  els.detailImage.addEventListener("error", () => {
    if (els.detailImage.dataset.fallback !== "true") {
      setDetailImage(fallbackImage, "景点图片");
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
    label.textContent = state.controlOpen ? "收起筛选" : "打开筛选";
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
    const matchesProvince = state.province === "全部" || item.province === state.province;
    const searchable = normalize(
      `${item.name} ${item.province} ${item.coordinateLabel} ${item.coordinateLevel} ${item.ratingLabel || ""} ${
        item.basis || ""
      }`,
    );
    const matchesSearch = !query || searchable.includes(query);
    return matchesProvince && matchesSearch;
  });
}

function updateSummary(filtered) {
  els.visibleStat.textContent = String(filtered.length);
  els.resultCount.textContent = `${filtered.length} 个景点`;
  const provinceText = state.province === "全部" ? "全国" : state.province;
  els.filterSubtitle.textContent = `${provinceText} · 国家5A + 对标景点`;
}

function renderList(items) {
  if (!items.length) {
    els.attractionList.innerHTML = `<li class="empty-state">没有匹配的景点</li>`;
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
                <span class="card-meta">${escapeHtml(item.province)} · ${escapeHtml(ratingMeta(item))}</span>
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
    const marker = L.marker([item.lat, item.lng], {
      icon: markerIcon(item),
      title: item.name,
    });

    marker.bindPopup(
      `<strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(item.province)} · ${escapeHtml(
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
  const regionText = state.province === "全部" ? "全国" : state.province;
  const officialCount = items.filter((item) => !isPeerAttraction(item)).length;
  const peerCount = items.length - officialCount;
  els.distributionCaption.textContent = `${regionText} · ${items.length} 个景点`;
  els.legendOfficialStat.textContent = String(officialCount);
  els.legendPeerStat.textContent = String(peerCount);
  els.legendRegionStat.textContent = String(counts.length);

  if (!counts.length) {
    els.provinceBars.innerHTML = `<div class="empty-state">暂无数据</div>`;
    return;
  }

  els.provinceBars.innerHTML = counts
    .slice(0, 8)
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
  els.detailProvince.textContent = hasItem ? item.province : "选择景点";
  els.detailName.textContent = hasItem ? item.name : "在地图或列表中选择一个景点";
  els.detailYear.textContent = hasItem ? ratingDetail(item) : "-";
  els.detailBasis.textContent = hasItem ? item.basis || ratingMeta(item) : "-";
  setFootprintDetail(null);
  els.focusSelected.disabled = !hasItem;
  els.filterProvince.disabled = !hasItem;

  if (!hasItem) {
    setDetailImage(fallbackImage, "景点图片");
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
              <span>${escapeHtml(ratingMeta(candidate))}</span>
            </button>
          `,
        )
        .join("")
    : `<div class="empty-state">没有其他同地区景点</div>`;

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
  const category = feature.properties?.category;
  const typeName = feature.properties?.type;
  if (category === "boundary" && typeName === "administrative") return false;

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
    setFootprintDetail(footprint.label);
    fitFootprintBounds(layer, fit);
    return;
  }

  L.circleMarker([item.lat, item.lng], {
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
  map.flyTo([item.lat, item.lng], targetZoom, {
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

  const bounds = L.latLngBounds(items.map((item) => [item.lat, item.lng]));
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

function unique(items) {
  return [...new Set(items)];
}

function isPeerAttraction(item) {
  return item.rating === "peer5A";
}

function ratingBadge(item) {
  return isPeerAttraction(item) ? "对标" : "5A";
}

function ratingMeta(item) {
  return isPeerAttraction(item) ? "对标大陆 5A" : `${item.year} 年评为 5A`;
}

function ratingDetail(item) {
  return isPeerAttraction(item)
    ? `${item.ratingLabel || "对标5A"}（非大陆官方评级）`
    : `${item.year} 年`;
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
  els.detailImageLink.textContent = safeImage.caption || fallbackImage.caption;
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
