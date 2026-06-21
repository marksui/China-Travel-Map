import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = parseArgs(process.argv.slice(2));

const manifests = [
  {
    label: "5A",
    attractionsFile: "data/attractions.js",
    attractionsMarker: "window.CHINA_5A_ATTRACTIONS = ",
    imagesFile: "data/attraction-images.js",
    imagesMarker: "window.CHINA_5A_IMAGES = ",
  },
  {
    label: "4A",
    attractionsFile: "data/attractions-4a.js",
    attractionsMarker: "window.CHINA_4A_ATTRACTIONS = ",
    attractionsEndMarker: ";\nwindow.CHINA_4A_META",
    imagesFile: "data/attraction-images-4a.js",
    imagesMarker: "window.CHINA_4A_IMAGES = ",
  },
];

const suspiciousTextTerms = [
  "selfie",
  "portrait",
  "han qinhu",
  "han_qinhu",
  "han-qinhu",
  "\u97e9\u64d2\u864e",
  "\u97d3\u64d2\u864e",
  "group photo",
  "collage",
  "montage",
  "poster",
  "logo",
  "map",
  "diagram",
  "chart",
  "graph",
  "scan",
  "document",
  "book",
  "\u5305\u542b",
  "\u5f20\u7167\u7247",
  "\u5f20\u56fe\u7247",
  "\u56fe\u96c6",
  "\u76f8\u518c",
  "\u65c5\u6e38\u653b\u7565",
  "\u56fe\u7247\u5927\u5168",
  "\u62fc\u56fe",
  "\u5408\u6210",
  "\u81ea\u62cd",
  "\u5730\u56fe",
  "\u56fe\u8868",
];

function parseArgs(values) {
  const result = { json: false, limit: 0, writeJs: "" };
  for (let index = 0; index < values.length; index += 1) {
    const key = values[index];
    if (key === "--json") {
      result.json = true;
      continue;
    }
    if (key === "--write-js") {
      result.writeJs = values[index + 1] || "data/image-quality-flags.js";
      index += 1;
      continue;
    }
    if (key === "--limit") {
      result.limit = Number(values[index + 1] || 0);
      index += 1;
    }
  }
  return result;
}

function readJsValue(file, marker, endMarker = null) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Missing marker ${marker} in ${file}`);
  const valueStart = start + marker.length;
  let valueEnd = endMarker ? text.indexOf(endMarker, valueStart) : text.indexOf(";\n", valueStart);
  if (valueEnd < 0) valueEnd = text.lastIndexOf(";");
  return JSON.parse(text.slice(valueStart, valueEnd).trim().replace(/;$/, ""));
}

function relativeImagePath(entry) {
  const value = entry?.url || entry?.src || entry?.local || "";
  return value.startsWith("assets/images/") ? value : "";
}

function isJpeg(content) {
  return content[0] === 0xff && content[1] === 0xd8 && content[2] === 0xff;
}

function jpegSize(content) {
  let offset = 2;
  while (offset < content.length) {
    if (content[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = content[offset + 1];
    if (offset + 4 > content.length) break;
    const length = content.readUInt16BE(offset + 2);
    if (length < 2) break;
    if (
      marker === 0xc0 ||
      marker === 0xc1 ||
      marker === 0xc2 ||
      marker === 0xc3 ||
      marker === 0xc5 ||
      marker === 0xc6 ||
      marker === 0xc7 ||
      marker === 0xc9 ||
      marker === 0xca ||
      marker === 0xcb ||
      marker === 0xcd ||
      marker === 0xce ||
      marker === 0xcf
    ) {
      return {
        height: content.readUInt16BE(offset + 5),
        width: content.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  return null;
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, "");
}

function imageTokens(attraction) {
  const genericSuffixes =
    /\u65c5\u6e38\u666f\u533a|\u65c5\u6e38\u533a|\u98ce\u666f\u540d\u80dc\u533a|\u98ce\u666f\u533a|\u666f\u533a|\u516c\u56ed|\u535a\u7269\u9662|\u535a\u7269\u9986|\u6587\u5316\u65c5\u6e38\u533a|\u65c5\u6e38\u5ea6\u5047\u533a|\u5ea6\u5047\u533a|\u793a\u8303\u533a/g;
  const cleanName = String(attraction.name || "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(genericSuffixes, " ")
    .replace(/[·•、,，-]/g, " ");
  return [...new Set([cleanName, ...cleanName.split(/\s+/), attraction.coordinateLabel, attraction.city, attraction.province])]
    .map(normalize)
    .filter((token) => token.length >= 2);
}

function suspiciousReasons(attraction, entry, fileInfo) {
  const reasons = [];
  const rawText = [entry.url, entry.pageUrl, entry.caption].filter(Boolean).join(" ");
  const serialized = normalize(rawText);
  for (const term of suspiciousTextTerms) {
    if (hasSuspiciousTerm(rawText, serialized, term)) {
      reasons.push(`text:${term}`);
    }
  }

  const tokens = imageTokens(attraction);
  if (tokens.length && !tokens.some((token) => serialized.includes(token))) {
    reasons.push("weak-name-match");
  }

  if (fileInfo?.size) {
    const { width, height } = fileInfo.size;
    const shortest = Math.min(width, height);
    const longest = Math.max(width, height);
    if (shortest < 360) reasons.push(`small-side:${shortest}`);
    if (longest < 640) reasons.push(`small-long-side:${longest}`);
    if (longest / shortest > 2.35) reasons.push(`extreme-aspect:${width}x${height}`);
  }

  if (fileInfo?.bytes && fileInfo.bytes < 25000) {
    reasons.push(`tiny-file:${fileInfo.bytes}`);
  }

  return reasons;
}

function hasSuspiciousTerm(rawText, normalizedText, term) {
  if (/^[\x00-\x7f]+$/.test(term)) {
    const pattern = new RegExp(`(^|[^a-z])${escapeRegExp(term.toLowerCase()).replace(/\\ /g, "\\s+")}([^a-z]|$)`);
    return pattern.test(rawText.toLowerCase());
  }
  return normalizedText.includes(normalize(term));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scanSet(config) {
  const attractions = readJsValue(config.attractionsFile, config.attractionsMarker, config.attractionsEndMarker);
  const attractionById = new Map(attractions.map((item) => [item.id, item]));
  const images = readJsValue(config.imagesFile, config.imagesMarker);
  const findings = [];

  for (const [id, entry] of Object.entries(images)) {
    if (id === "fallback") continue;
    const attraction = attractionById.get(id);
    if (!attraction) continue;
    const rel = relativeImagePath(entry);
    const fileInfo = {};
    if (rel) {
      const absolutePath = path.join(root, rel);
      if (fs.existsSync(absolutePath)) {
        const content = fs.readFileSync(absolutePath);
        fileInfo.bytes = content.length;
        fileInfo.size = isJpeg(content) ? jpegSize(content) : null;
      }
    }
    const reasons = suspiciousReasons(attraction, entry, fileInfo);
    if (reasons.length) {
      findings.push({
        rating: config.label,
        id,
        province: attraction.province,
        city: attraction.city,
        name: attraction.name,
        url: entry.url || "",
        pageUrl: entry.pageUrl || "",
        reasons,
      });
    }
  }
  return findings;
}

const findings = manifests.flatMap(scanSet);
const limited = args.limit ? findings.slice(0, args.limit) : findings;

if (args.writeJs) {
  writeJsFlags(args.writeJs, findings);
}

if (args.json) {
  console.log(JSON.stringify({ count: findings.length, findings: limited }, null, 2));
} else {
  console.log(`Suspicious images: ${findings.length}`);
  for (const item of limited) {
    console.log(`${item.rating} ${item.id} ${item.province} ${item.name} :: ${item.reasons.join(", ")} :: ${item.url}`);
  }
}

function writeJsFlags(outputPath, items) {
  const flags = Object.fromEntries(
    items.map((item) => [
      item.id,
      {
        rating: item.rating,
        url: item.url,
        reasons: item.reasons,
      },
    ]),
  );
  const absolutePath = path.resolve(root, outputPath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(
    absolutePath,
    `// Generated by scripts/find-suspicious-images.mjs. Do not edit by hand.\nwindow.CHINA_IMAGE_QUALITY_FLAGS = ${JSON.stringify(
      flags,
      null,
      2,
    )};\n`,
    "utf8",
  );
}
