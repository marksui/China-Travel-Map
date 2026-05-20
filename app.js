const attractions = window.CHINA_5A_ATTRACTIONS || [];
const meta = window.CHINA_5A_META || {};

const colorsByYear = {
  2007: "#08756f",
  2010: "#3b6ea8",
  2011: "#d75a49",
  2012: "#8a63a6",
  2013: "#b07d1c",
  2014: "#3f7f45",
};

const chinaBounds = L.latLngBounds([18, 73], [54, 135]);
const state = {
  search: "",
  province: "全部",
  year: "全部",
  selectedId: null,
  distributionOpen: true,
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  clearSearch: document.querySelector("#clearSearch"),
  provinceSelect: document.querySelector("#provinceSelect"),
  yearTabs: document.querySelector("#yearTabs"),
  attractionList: document.querySelector("#attractionList"),
  resultCount: document.querySelector("#resultCount"),
  filterSubtitle: document.querySelector("#filterSubtitle"),
  totalStat: document.querySelector("#totalStat"),
  provinceStat: document.querySelector("#provinceStat"),
  yearStat: document.querySelector("#yearStat"),
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

function init() {
  renderBaseStats();
  populateProvinceSelect();
  populateYearTabs();
  bindEvents();
  render();
  fitTo(attractions);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderBaseStats() {
  const years = meta.years || sortedYears();
  const provinces = unique(attractions.map((item) => item.province));
  els.totalStat.textContent = String(meta.count || attractions.length);
  els.provinceStat.textContent = String(meta.provinces || provinces.length);
  els.yearStat.textContent = `${years.at(0)}-${years.at(-1)}`;
  els.dataCountPill.textContent = String(meta.count || attractions.length);
}

function populateProvinceSelect() {
  const provinces = unique(attractions.map((item) => item.province));
  els.provinceSelect.innerHTML = [
    `<option value="全部">全部省份</option>`,
    ...provinces.map((province) => `<option value="${escapeHtml(province)}">${province}</option>`),
  ].join("");
}

function populateYearTabs() {
  const years = sortedYears();
  const buttons = [
    `<button class="active" type="button" role="tab" aria-selected="true" data-year="全部">全部</button>`,
    ...years.map(
      (year) =>
        `<button type="button" role="tab" aria-selected="false" data-year="${year}">${year}</button>`,
    ),
  ];
  els.yearTabs.innerHTML = buttons.join("");
}

function bindEvents() {
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

  els.yearTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-year]");
    if (!button) return;
    state.year = button.dataset.year;
    updateYearTabs();
    render();
    fitTo(getFilteredAttractions());
  });

  els.resetFilters.addEventListener("click", () => {
    state.search = "";
    state.province = "全部";
    state.year = "全部";
    els.searchInput.value = "";
    els.provinceSelect.value = "全部";
    updateYearTabs();
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
    const matchesYear = state.year === "全部" || String(item.year) === state.year;
    const searchable = normalize(
      `${item.name} ${item.province} ${item.year} ${item.coordinateLabel} ${item.coordinateLevel}`,
    );
    const matchesSearch = !query || searchable.includes(query);
    return matchesProvince && matchesYear && matchesSearch;
  });
}

function updateSummary(filtered) {
  els.visibleStat.textContent = String(filtered.length);
  els.resultCount.textContent = `${filtered.length} 个结果`;
  const provinceText = state.province === "全部" ? "全国" : state.province;
  const yearText = state.year === "全部" ? "全部年份" : `${state.year} 年`;
  els.filterSubtitle.textContent = `${provinceText} · ${yearText}`;
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
          <button class="attraction-card${active}" style="--marker-color: ${colorForYear(
            item.year,
          )}" type="button" data-id="${item.id}">
            <span class="card-main">
              <span>
                <span class="card-name">${escapeHtml(item.name)}</span>
                <span class="card-meta">${escapeHtml(item.province)} · ${item.year} · ${escapeHtml(
                  item.coordinateLevel,
                )}</span>
              </span>
              <span class="year-badge">${item.year}</span>
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
      }<br><span>${escapeHtml(item.coordinateLevel)}定位</span>`,
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
  els.detailYear.textContent = hasItem ? item.year : "-";
  els.detailPrecision.textContent = hasItem
    ? `${item.coordinateLevel} · ${item.coordinateLabel}`
    : "-";
  els.detailCoords.textContent = hasItem ? `${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}` : "-";
  els.focusSelected.disabled = !hasItem;
  els.filterProvince.disabled = !hasItem;

  if (!hasItem) {
    els.relatedCaption.textContent = "-";
    els.relatedList.innerHTML = `<div class="empty-state">暂无选择</div>`;
    return;
  }

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
              <span>${candidate.year} · ${escapeHtml(candidate.coordinateLevel)}</span>
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

function focusAttraction(item, openPopup = false) {
  map.flyTo([item.lat, item.lng], Math.max(map.getZoom(), 9), {
    animate: true,
    duration: 0.8,
  });

  const marker = markersById.get(item.id);
  if (marker && openPopup) {
    if (typeof markerLayer.zoomToShowLayer === "function") {
      markerLayer.zoomToShowLayer(marker, () => marker.openPopup());
    } else {
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

function updateYearTabs() {
  els.yearTabs.querySelectorAll("button[data-year]").forEach((button) => {
    const active = button.dataset.year === state.year;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function markerIcon(item) {
  return L.divIcon({
    className: "map-marker-shell",
    html: `<div class="map-marker" style="--marker-color: ${colorForYear(
      item.year,
    )}"><span>${String(item.year).slice(2)}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 33],
    popupAnchor: [0, -28],
  });
}

function colorForYear(year) {
  return colorsByYear[year] || "#08756f";
}

function getSelected() {
  return attractions.find((item) => item.id === state.selectedId) || null;
}

function sortedYears() {
  return unique(attractions.map((item) => item.year)).sort((a, b) => a - b);
}

function unique(items) {
  return [...new Set(items)];
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
