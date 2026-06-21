import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const maxImageSide = 900;

const files = {
  fiveAAttractions: ["data/attractions.js", "window.CHINA_5A_ATTRACTIONS = "],
  fourAAttractions: ["data/attractions-4a.js", "window.CHINA_4A_ATTRACTIONS = ", ";\nwindow.CHINA_4A_META"],
  fiveAImages: ["data/attraction-images.js", "window.CHINA_5A_IMAGES = "],
  fourAImages: ["data/attraction-images-4a.js", "window.CHINA_4A_IMAGES = "],
};

const dangerPattern =
  /\.pdf|\.webm|\.mp4|\.ogv|city page|scan|document|book|selfie|portrait|collage|montage|plaque|signboard|satellite|landsat|sentinel|nasa|iss image|from space|aerial map|south korea|republic of korea|seoul|busan|tokyo|\u5305\u542b|\u5f20\u7167\u7247|\u5f20\u56fe\u7247|\u56fe\u96c6|\u76f8\u518c|\u65c5\u6e38\u653b\u7565|\u56fe\u7247\u5927\u5168|\u7cbe\u5f69\u56fe\u96c6|\u666f\u70b9\u7167\u7247|\u724c\u533e|\u6587\u7269\u4fdd\u62a4\u5355\u4f4d|\u53e4\u7c4d|\u4e66\u9875|\u6587\u6863|\u626b\u63cf|\u89c6\u9891|\u81ea\u62cd|\u62fc\u56fe|\u5408\u6210/i;

function readJsValue(file, marker, endMarker = null) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  const start = text.indexOf(marker);
  if (start < 0) {
    throw new Error(`Missing marker ${marker} in ${file}`);
  }
  const valueStart = start + marker.length;
  let valueEnd = endMarker ? text.indexOf(endMarker, valueStart) : text.indexOf(";\n", valueStart);
  if (valueEnd < 0) valueEnd = text.lastIndexOf(";");
  if (valueEnd < valueStart) {
    throw new Error(`Cannot locate JS value end in ${file}`);
  }
  return JSON.parse(text.slice(valueStart, valueEnd).trim().replace(/;$/, ""));
}

function readAll() {
  return Object.fromEntries(
    Object.entries(files).map(([key, args]) => [key, readJsValue(...args)]),
  );
}

function relativeImagePath(record) {
  const value = record?.url || record?.src || record?.local || "";
  return value.startsWith("assets/") ? value : "";
}

function fileHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function auditImageSet(label, attractions, images) {
  const attractionIds = new Set(attractions.map((item) => item.id));
  const imageEntries = Object.entries(images).filter(([id]) => id !== "fallback");
  const imageIds = new Set(imageEntries.map(([id]) => id));
  const missingImages = [...attractionIds].filter((id) => !imageIds.has(id));
  const extraImages = [...imageIds].filter((id) => !attractionIds.has(id));
  const missingFiles = [];
  const dangerous = [];
  const nonJpegs = [];
  const oversized = [];
  const hashes = new Map();

  for (const [id, image] of imageEntries) {
    const rel = relativeImagePath(image);
    const serialized = JSON.stringify(image);
    if (dangerPattern.test(serialized)) {
      dangerous.push({ id, url: image.url || "", pageUrl: image.pageUrl || "" });
    }
    if (!rel) continue;
    const absolutePath = path.join(root, rel);
    if (!fs.existsSync(absolutePath)) {
      missingFiles.push({ id, url: rel });
      continue;
    }
    const content = fs.readFileSync(absolutePath);
    if (!isJpeg(content)) {
      nonJpegs.push({ id, url: rel });
    } else {
      const size = jpegSize(content);
      if (size && Math.max(size.width, size.height) > maxImageSide) {
        oversized.push({ id, url: rel, ...size });
      }
    }
    const hash = fileHash(absolutePath);
    const bucket = hashes.get(hash) || [];
    bucket.push({ id, url: rel });
    hashes.set(hash, bucket);
  }

  const duplicateFiles = [...hashes.values()]
    .filter((bucket) => bucket.length > 1)
    .map((bucket) => bucket.map(({ id, url }) => ({ id, url })));

  return {
    label,
    total: attractions.length,
    imageCount: imageEntries.length,
    missingImageCount: missingImages.length,
    extraImageCount: extraImages.length,
    missingFileCount: missingFiles.length,
    dangerousCount: dangerous.length,
    nonJpegCount: nonJpegs.length,
    oversizedCount: oversized.length,
    duplicateFileCount: duplicateFiles.length,
    missingFiles,
    dangerous,
    nonJpegs,
    oversized,
    duplicateFiles,
  };
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

const data = readAll();
const reports = [
  auditImageSet("5A", data.fiveAAttractions, data.fiveAImages),
  auditImageSet("4A", data.fourAAttractions, data.fourAImages),
];

console.log(JSON.stringify(reports, null, 2));

const failed = reports.some(
  (report) =>
    report.extraImageCount > 0 ||
    report.missingFileCount > 0 ||
    report.dangerousCount > 0 ||
    report.nonJpegCount > 0 ||
    report.oversizedCount > 0 ||
    report.duplicateFileCount > 0,
);

if (failed) {
  process.exitCode = 1;
}
