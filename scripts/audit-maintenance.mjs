import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILES = [
  "data/attractions.js",
  "data/attractions-4a.js",
  "data/attraction-images.js",
  "data/attraction-images-4a.js",
  "data/source-index.js",
  "data/image-review-decisions.js",
  "data/maintenance-overrides.js",
];
const DEFAULT_LIMIT = 12;

const args = parseArgs(process.argv.slice(2));
const context = loadDataContext();
const report = buildReport(context, args.limit);

if (args.out) {
  fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
  fs.writeFileSync(path.resolve(args.out), `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

if (args.csvDir) {
  const written = writeQueueCsvFiles(report.queueRows, args.csvDir);
  if (!args.json) {
    console.log(`CSV queues: ${written.length} files -> ${path.resolve(args.csvDir)}`);
  }
}

if (args.json) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  printSummary(report);
}

function parseArgs(argv) {
  const parsed = {
    json: false,
    out: "",
    csvDir: "",
    limit: DEFAULT_LIMIT,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") parsed.json = true;
    else if (arg === "--out") parsed.out = argv[++index] || "";
    else if (arg.startsWith("--out=")) parsed.out = arg.slice("--out=".length);
    else if (arg === "--csv-dir") parsed.csvDir = argv[++index] || "";
    else if (arg.startsWith("--csv-dir=")) parsed.csvDir = arg.slice("--csv-dir=".length);
    else if (arg === "--limit") parsed.limit = Number(argv[++index] || DEFAULT_LIMIT);
    else if (arg.startsWith("--limit=")) parsed.limit = Number(arg.slice("--limit=".length));
    else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }
  if (!Number.isFinite(parsed.limit) || parsed.limit < 1) parsed.limit = DEFAULT_LIMIT;
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/audit-maintenance.mjs [--json] [--out report.json] [--csv-dir queues] [--limit 12]

Audits static China Travel Map data for maintenance queues:
missing images, suspicious images, coordinate precision, source coverage,
review decisions, and maintenance overrides.`);
}

function loadDataContext() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of DATA_FILES) {
    const absolute = path.join(ROOT, file);
    if (!fs.existsSync(absolute)) continue;
    vm.runInContext(fs.readFileSync(absolute, "utf8"), sandbox, { filename: file });
  }
  return sandbox.window;
}

function buildReport(windowData, limit) {
  const fiveA = windowData.CHINA_5A_ATTRACTIONS || [];
  const fourA = windowData.CHINA_4A_ATTRACTIONS || [];
  const attractions = [...fiveA, ...fourA].map((item) => applyMaintenanceOverride(item, windowData.CHINA_MAINTENANCE_OVERRIDES?.[item.id]));
  const images = { ...(windowData.CHINA_5A_IMAGES || {}), ...(windowData.CHINA_4A_IMAGES || {}) };
  const sourceIndex = windowData.CHINA_TRAVEL_SOURCE_INDEX || {};
  const reviewDecisions = windowData.CHINA_IMAGE_REVIEW_DECISIONS || {};
  const maintenanceOverrides = windowData.CHINA_MAINTENANCE_OVERRIDES || {};

  const rows = attractions.map((item) => {
    const image = effectiveAttractionImage(item, images[item.id], reviewDecisions[item.id]);
    const hasImage = isReliableImage(image);
    const imageFileExists = hasImage ? fs.existsSync(path.join(ROOT, image.url)) : false;
    const suspicious = isSuspiciousImage(item, image);
    const sourceKey = attractionSourceKey(item);
    return {
      item,
      image,
      hasImage,
      imageFileExists,
      suspicious,
      sourceKey,
      hasKnownSource: Boolean(sourceIndex.sources?.[sourceKey]),
      hasReviewDecision: Boolean(reviewDecisions[item.id]),
      hasMaintenanceOverride: Boolean(maintenanceOverrides[item.id]),
    };
  });

  const missingImages = rows.filter((row) => !row.hasImage);
  const missingImageFiles = rows.filter((row) => row.hasImage && !row.imageFileExists);
  const suspiciousImages = rows.filter((row) => row.suspicious);
  const cityCoordinates = rows.filter((row) => row.item.coordinateLevel === "城市");
  const districtCoordinates = rows.filter((row) => row.item.coordinateLevel === "区县");
  const unknownSources = rows.filter((row) => !row.hasKnownSource);
  const maintenanceRows = rows.filter((row) => row.hasMaintenanceOverride);
  const queueRows = {
    missingImages,
    missingImageFiles,
    suspiciousImages,
    cityCoordinates,
    districtCoordinates,
    unknownSources,
    maintenanceOverrides: maintenanceRows,
  };
  const sourceCounts = countBy(rows, (row) => row.sourceKey);
  const coordinateCounts = countBy(rows, (row) => row.item.coordinateLevel || "unknown");
  const ratingCounts = countBy(rows, (row) => row.item.rating || "unknown");
  const reviewCounts = countBy(Object.values(reviewDecisions), (row) => row.action || "unknown");
  const counts = {
    attractions: attractions.length,
    ...prefixKeys(ratingCounts, "rating."),
    exactCoordinates: coordinateCounts["景区"] || 0,
    districtCoordinates: coordinateCounts["区县"] || 0,
    cityCoordinates: coordinateCounts["城市"] || 0,
    reliableImages: rows.filter((row) => row.hasImage).length,
    missingImages: missingImages.length,
    missingImageFiles: missingImageFiles.length,
    suspiciousImages: suspiciousImages.length,
    reviewDecisions: Object.keys(reviewDecisions).length,
    maintenanceOverrides: Object.keys(maintenanceOverrides).length,
    unknownSources: unknownSources.length,
  };

  const report = {
    generatedAt: new Date().toISOString(),
    datasetVersion: sourceIndex.datasetVersion || "",
    updatedAt: sourceIndex.updatedAt || "",
    counts,
    quality: buildQualityMetrics(counts),
    coordinateLevels: coordinateCounts,
    sources: sourceCounts,
    reviewActions: reviewCounts,
    provinceWorkload: provinceWorkload(rows).slice(0, limit),
    queues: {
      missingImages: sampleRows(missingImages, limit),
      missingImageFiles: sampleRows(missingImageFiles, limit),
      suspiciousImages: sampleRows(suspiciousImages, limit),
      cityCoordinates: sampleRows(cityCoordinates, limit),
      districtCoordinates: sampleRows(districtCoordinates, limit),
      unknownSources: sampleRows(unknownSources, limit),
      maintenanceOverrides: sampleRows(maintenanceRows, limit),
    },
  };
  Object.defineProperty(report, "queueRows", {
    value: queueRows,
    enumerable: false,
  });
  return report;
}

function applyMaintenanceOverride(item, override) {
  const copy = { ...item };
  if (!override) return copy;
  if (Number.isFinite(Number(override.lat)) && Number.isFinite(Number(override.lng))) {
    copy.lat = Number(override.lat);
    copy.lng = Number(override.lng);
  }
  for (const key of ["coordinateLevel", "coordinateLabel", "sourceKey", "dataUpdated", "categoryOverride"]) {
    if (override[key]) copy[key] = override[key];
  }
  return copy;
}

function effectiveAttractionImage(item, image, decision) {
  if (decision?.action === "missing" || decision?.action === "delete") return null;
  if (decision?.action === "replace" && isLocalImageUrl(decision.replacementUrl)) {
    return {
      url: decision.replacementUrl,
      pageUrl: decision.pageUrl || "",
      caption: decision.note || image?.caption || "",
    };
  }
  return isReliableImage(image) ? image : null;
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

function isSuspiciousImage(item, image) {
  if (!isReliableImage(image)) return false;
  const text = normalize([image.url, image.pageUrl, image.caption].filter(Boolean).join(" "));
  const suspiciousTerms = ["panoramio", "selfie", "collage", "montage", "logo", "map", "diagram", "包含", "拼图", "合成", "自拍"];
  if (suspiciousTerms.some((term) => text.includes(normalize(term)))) return true;
  const tokens = imageMatchTokens(item);
  return tokens.length > 0 && !tokens.some((token) => text.includes(token));
}

function imageMatchTokens(item) {
  const cleanName = String(item.name || "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院|博物馆|文化园区|度假区|示范区|保护区/g, " ")
    .replace(/[·•,，、\s-]+/g, " ")
    .trim();
  return unique([cleanName, item.coordinateLabel, ...cleanName.split(/\s+/)])
    .map((value) => normalize(value))
    .filter((value) => value.length >= 2);
}

function attractionSourceKey(item) {
  if (item.sourceKey) return item.sourceKey;
  const annualSourceKey = `mct-${item.year}-announcements`;
  if (item.rating === "official5A" && [2020, 2021, 2022, 2024].includes(Number(item.year))) return annualSourceKey;
  if (item.rating === "official4A") return "open-4a-list";
  if (item.rating === "peer5A") return "peer-curated";
  if (Number(item.year) >= 2024) return "mct-2024-announcements";
  return "mct-official-5a";
}

function provinceWorkload(rows) {
  const grouped = new Map();
  for (const row of rows) {
    const province = row.item.province || "unknown";
    const entry =
      grouped.get(province) ||
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
    entry.workload = entry.missingImages + entry.suspiciousImages + entry.cityCoordinates + entry.districtCoordinates + entry.unknownSources;
    grouped.set(province, entry);
  }
  return [...grouped.values()].sort((a, b) => b.workload - a.workload || a.province.localeCompare(b.province, "zh-CN"));
}

function sampleRows(rows, limit) {
  return rows.slice(0, limit).map(({ item, image, sourceKey, hasImage, imageFileExists, suspicious, hasReviewDecision, hasMaintenanceOverride }) => ({
    id: item.id,
    name: item.name,
    province: item.province,
    city: item.city || "",
    rating: item.rating,
    lat: item.lat,
    lng: item.lng,
    coordinateLevel: item.coordinateLevel || "",
    coordinateLabel: item.coordinateLabel || "",
    sourceKey,
    sourceUrl: item.sourceUrl || "",
    imageUrl: image?.url || "",
    imagePageUrl: image?.pageUrl || "",
    imageCaption: image?.caption || "",
    hasImage,
    imageFileExists,
    suspicious,
    hasReviewDecision,
    hasMaintenanceOverride,
    newLat: "",
    newLng: "",
    newCoordinateLevel: "",
    newCoordinateLabel: "",
    newCategory: "",
    newThemes: "",
    newSeasons: "",
    newSourceKey: "",
    newDataUpdated: "",
    reviewAction: "",
    replacementUrl: "",
    note: "",
  }));
}

function writeQueueCsvFiles(queueRows, csvDir) {
  const targetDir = path.resolve(csvDir);
  fs.mkdirSync(targetDir, { recursive: true });
  const queueEntries = Object.entries(queueRows || {});
  const written = [];
  writeCsvFile(
    path.join(targetDir, "queue-summary.csv"),
    queueEntries.map(([queue, rows]) => ({ queue, count: rows.length })),
    ["queue", "count"],
  );
  written.push("queue-summary.csv");
  for (const [queue, rows] of queueEntries) {
    const fileName = `${queue}.csv`;
    writeCsvFile(path.join(targetDir, fileName), sampleRows(rows, rows.length));
    written.push(fileName);
  }
  return written;
}

function writeCsvFile(filePath, rows, columns = csvColumns(rows)) {
  const lines = [columns.join(","), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))];
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function csvColumns(rows) {
  return rows.length
    ? Object.keys(rows[0])
    : [
        "id",
        "name",
        "province",
        "city",
        "rating",
        "lat",
        "lng",
        "coordinateLevel",
        "coordinateLabel",
        "sourceKey",
        "sourceUrl",
        "imageUrl",
        "imagePageUrl",
        "imageCaption",
        "hasImage",
        "imageFileExists",
        "suspicious",
        "hasReviewDecision",
        "hasMaintenanceOverride",
        "newLat",
        "newLng",
        "newCoordinateLevel",
        "newCoordinateLabel",
        "newCategory",
        "newThemes",
        "newSeasons",
        "newSourceKey",
        "newDataUpdated",
        "reviewAction",
        "replacementUrl",
        "note",
      ];
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN")));
}

function prefixKeys(object, prefix) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [`${prefix}${key}`, value]));
}

function buildQualityMetrics(counts) {
  const total = counts.attractions || 0;
  return {
    coordinateExactRate: precisePercent(counts.exactCoordinates, total),
    imageCoverageRate: precisePercent(counts.reliableImages, total),
    sourceCoverageRate: precisePercent(total - counts.unknownSources, total),
    reviewCoverageRate: precisePercent(counts.reviewDecisions, total),
  };
}

function precisePercent(count, total) {
  return total ? Number(((count / total) * 100).toFixed(1)) : 0;
}

function normalize(value) {
  return String(value || "").toLocaleLowerCase("zh-CN").replace(/\s+/g, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function printSummary(report) {
  const c = report.counts;
  console.log(`China Travel Map maintenance audit (${report.datasetVersion || "unknown version"})`);
  console.log(`Generated: ${report.generatedAt}`);
  console.log("");
  console.log(`Attractions: ${c.attractions}`);
  console.log(`Coordinates: exact=${c.exactCoordinates}, district=${c.districtCoordinates}, city=${c.cityCoordinates}`);
  console.log(`Images: reliable=${c.reliableImages}, missing=${c.missingImages}, missing files=${c.missingImageFiles}, suspicious=${c.suspiciousImages}`);
  console.log(`Records: image reviews=${c.reviewDecisions}, maintenance overrides=${c.maintenanceOverrides}, unknown sources=${c.unknownSources}`);
  if (report.quality) {
    const q = report.quality;
    console.log(
      `Quality: exact coordinates=${q.coordinateExactRate}%, local images=${q.imageCoverageRate}%, known sources=${q.sourceCoverageRate}%, reviewed=${q.reviewCoverageRate}%`,
    );
  }
  console.log("");
  console.log("Top province workload:");
  for (const row of report.provinceWorkload.slice(0, 8)) {
    console.log(
      `- ${row.province}: workload=${row.workload}, missingImages=${row.missingImages}, cityCoordinates=${row.cityCoordinates}, districtCoordinates=${row.districtCoordinates}, suspiciousImages=${row.suspiciousImages}`,
    );
  }
  console.log("");
  console.log("Use --json or --out report.json for full queue samples.");
}
