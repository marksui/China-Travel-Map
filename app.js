const attractions = window.CHINA_5A_ATTRACTIONS || [];
const meta = window.CHINA_5A_META || {};

const highlightColor = "#fa8072";
const fallbackImage = {
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mutianyu_%E2%80%93_Panorama_%28Greg_Zaal_via_Poly_Haven%29.jpg/1280px-Mutianyu_%E2%80%93_Panorama_%28Greg_Zaal_via_Poly_Haven%29.jpg",
  pageUrl:
    "https://commons.wikimedia.org/wiki/File:Mutianyu_%E2%80%93_Panorama_(Greg_Zaal_via_Poly_Haven).jpg",
  caption: "图片来源：Wikimedia Commons",
};

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
  detailCoords: document.querySelector("#detailCoords"),
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

L.control.zoom({ position: "topright" }).addTo(map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
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
const imageCache = new Map();
const selectionLayer = L.layerGroup().addTo(map);
let activeImageRequest = 0;

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
            <span class="card-coord">${item.lat.toFixed(3)}, ${item.lng.toFixed(3)}</span>
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
      } 年评为 5A<br><span>${escapeHtml(item.coordinateLevel)}定位</span>`,
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
  els.detailPrecision.textContent = hasItem
    ? `${item.coordinateLevel} · ${item.coordinateLabel}`
    : "-";
  els.detailCoords.textContent = hasItem ? `${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}` : "-";
  els.focusSelected.disabled = !hasItem;
  els.filterProvince.disabled = !hasItem;

  if (!hasItem) {
    setDetailImage(fallbackImage, "景区图片");
    els.relatedCaption.textContent = "-";
    els.relatedList.innerHTML = `<div class="empty-state">暂无选择</div>`;
    return;
  }

  loadDetailImage(item);

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
  selectionLayer.clearLayers();

  markersById.forEach((marker, id) => {
    const active = id === state.selectedId;
    const attraction = attractionsById.get(id);
    if (attraction) {
      marker.setIcon(markerIcon(attraction, active));
    }
    marker.setZIndexOffset(active ? 1000 : 0);
    marker.getElement()?.classList.toggle("selected", active);
  });

  if (!item) return;

  L.circleMarker([item.lat, item.lng], {
    radius: 24,
    color: highlightColor,
    weight: 3,
    fillColor: highlightColor,
    fillOpacity: 0.18,
    interactive: false,
  }).addTo(selectionLayer);
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
    const wikipediaImage = await searchWikipediaImage(query);
    if (wikipediaImage) return wikipediaImage;
  }

  for (const query of queries) {
    const commonsImage = await searchCommonsImage(query);
    if (commonsImage) return commonsImage;
  }

  return fallbackImage;
}

function imageQueries(item) {
  const compactName = item.name
    .replace(/[（(].*?[）)]/g, "")
    .replace(/—|·|-/g, " ")
    .replace(/旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院|文化园区/g, "")
    .trim();
  return unique([
    `${item.province} ${item.name}`,
    `${item.province} ${item.coordinateLabel}`,
    item.name,
    compactName,
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
    const page = sortedPages(data).find((candidate) => candidate.thumbnail?.source);
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
    const page = sortedPages(data).find((candidate) => candidate.imageinfo?.[0]?.thumburl);
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
