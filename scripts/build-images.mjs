import { execFile } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import vm from "node:vm";

const execFileAsync = promisify(execFile);
const outDir = path.resolve("assets/images");
const tmpDir = path.join(outDir, ".tmp");
const manifestPath = path.resolve("data/attraction-images.js");
const attributionPath = path.resolve("assets/images/SOURCES.md");
const maxItems = Number(getArg("--limit") || 0);
const fromItem = Math.max(1, Number(getArg("--from") || 1));
const toItem = Number(getArg("--to") || maxItems || 0);
const hasDownloadRange = process.argv.includes("--from") || process.argv.includes("--to");
const force = process.argv.includes("--force");
const skipWikimediaDownloads = process.argv.includes("--skip-wikimedia-downloads");
const metadataOnly = process.argv.includes("--metadata-only");
const wikiOnly = process.argv.includes("--wiki-only");
const wikiFirst = !process.argv.includes("--no-wiki-first");
const wikimediaDownloadGap = Number(getArg("--wikimedia-gap") || 4200);
const userAgent = "ChinaTravelMapImageBuilder/1.0 (local static site build)";
const lastDownloadByHost = new Map();

const fallbackSource = {
  id: "fallback",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mutianyu_%E2%80%93_Panorama_%28Greg_Zaal_via_Poly_Haven%29.jpg/1280px-Mutianyu_%E2%80%93_Panorama_%28Greg_Zaal_via_Poly_Haven%29.jpg",
  pageUrl:
    "https://commons.wikimedia.org/wiki/File:Mutianyu_%E2%80%93_Panorama_(Greg_Zaal_via_Poly_Haven).jpg",
  title: "通用景区占位图（慕田峪长城全景）",
  source: "Wikimedia Commons",
  license: "CC0",
};

const queryOverrides = {
  "北京-001": ["Forbidden City Beijing", "Palace Museum Beijing", "北京 故宫博物院"],
  "北京-002": ["Temple of Heaven Beijing", "Hall of Prayer for Good Harvests", "北京 天坛"],
  "北京-003": ["Summer Palace Beijing", "颐和园"],
  "北京-004": ["Badaling Great Wall", "八达岭长城"],
  "北京-005": ["Ming Tombs Beijing", "明十三陵"],
  "北京-006": ["Prince Gong Mansion Beijing", "Gongwangfu Beijing", "恭王府"],
  "北京-007": ["Beijing Olympic Park", "Bird's Nest Beijing", "北京奥林匹克公园"],
  "天津-008": ["Tianjin Ancient Culture Street", "天津古文化街"],
  "天津-009": ["Mount Pan Tianjin", "Panshan Tianjin"],
  "河北-010": ["Shanhaiguan Great Wall", "Shanhai Pass"],
  "河北-011": ["Baiyangdian Lake", "白洋淀"],
  "河北-012": ["Chengde Mountain Resort", "承德避暑山庄"],
  "河北-013": ["Yesanpo", "野三坡"],
  "河北-014": ["Xibaipo", "西柏坡"],
  "山西-015": ["Yungang Grottoes", "云冈石窟"],
  "山西-016": ["Mount Wutai", "Wutaishan"],
  "山西-017": ["House of Huangcheng Chancellor", "皇城相府"],
  "山西-018": ["Mianshan Shanxi", "绵山"],
  "山西-019": ["Qiao Family Compound", "乔家大院"],
  "内蒙古-020": ["Xiangshawan Desert", "响沙湾"],
  "内蒙古-021": ["Mausoleum of Genghis Khan Ordos", "成吉思汗陵"],
  "辽宁-022": ["Shenyang Botanical Garden", "沈阳植物园"],
  "辽宁-023": ["Laohutan Ocean Park Dalian", "Tiger Beach Dalian"],
  "辽宁-024": ["Jinshitan Dalian", "Golden Pebble Beach"],
  "吉林-025": ["Museum of the Imperial Palace of Manchukuo", "伪满皇宫"],
  "吉林-026": ["Changbai Mountain", "长白山"],
  "吉林-027": ["Jingyuetan Changchun", "净月潭"],
  "黑龙江-028": ["Sun Island Harbin", "太阳岛"],
  "黑龙江-029": ["Wudalianchi", "五大连池"],
  "黑龙江-030": ["Jingpo Lake", "镜泊湖"],
  "黑龙江-031": ["Tangwanghe Stone Forest", "汤旺河"],
  "上海-032": ["Oriental Pearl Tower Shanghai", "东方明珠"],
  "上海-033": ["Shanghai Wild Animal Park", "上海野生动物园"],
  "上海-034": ["Shanghai Science and Technology Museum", "上海科技馆"],
  "江苏-035": ["Sun Yat-sen Mausoleum Nanjing", "Zhongshan Ling"],
  "江苏-036": ["Wuxi Three Kingdoms City", "CCTV Wuxi Film Base"],
  "江苏-037": ["Suzhou Gardens", "Humble Administrator's Garden"],
  "江苏-038": ["Zhouzhuang Water Town", "周庄"],
  "江苏-039": ["Lingshan Grand Buddha Wuxi", "灵山大佛"],
  "江苏-040": ["Confucius Temple Qinhuai River Nanjing", "夫子庙"],
  "江苏-041": ["Slender West Lake Yangzhou", "瘦西湖"],
  "江苏-042": ["Tongli Water Town", "同里"],
  "江苏-043": ["China Dinosaurs Park Changzhou", "中华恐龙园"],
  "江苏-044": ["Qinhu Lake Wetland", "溱湖"],
  "江苏-045": ["Jinji Lake Suzhou", "金鸡湖"],
  "江苏-046": ["Hao River Nantong", "濠河"],
  "江苏-047": ["Zhenjiang Jinshan Jiaoshan Beigushan", "镇江金山"],
  "江苏-048": ["Yuantouzhu Wuxi", "Turtle Head Isle"],
  "江苏-049": ["Taihu Lake Wuzhong Suzhou", "吴中太湖"],
  "江苏-050": ["Tianmu Lake Changzhou", "天目湖"],
  "江苏-051": ["Shajiabang Yushan Shanghu", "沙家浜"],
  "江苏-052": ["Mount Mao Jurong", "茅山"],
  "浙江-053": ["West Lake Hangzhou", "杭州西湖"],
  "浙江-054": ["Yandang Mountain", "雁荡山"],
  "浙江-055": ["Mount Putuo", "普陀山"],
  "浙江-056": ["Qiandao Lake", "Thousand Island Lake China"],
  "浙江-057": ["Xikou Zhejiang", "溪口"],
  "浙江-058": ["Wuzhen Water Town", "乌镇"],
  "浙江-059": ["Hengdian World Studios", "横店影视城"],
  "浙江-060": ["South Lake Jiaxing", "Nanhu Jiaxing"],
  "浙江-061": ["Xixi Wetland Hangzhou", "西溪湿地"],
  "浙江-062": ["Lu Xun Native Place Shaoxing", "Shen Garden Shaoxing"],
  "浙江-063": ["Root Palace Buddhist Culture Park", "根宫佛国"],
  "安徽-064": ["Huangshan Mountain", "Yellow Mountain China"],
  "安徽-065": ["Mount Jiuhua", "Jiuhua Mountain"],
  "安徽-066": ["Mount Tianzhu Anhui", "Tianzhu Mountain"],
  "安徽-067": ["Xidi Hongcun", "Hongcun Village"],
  "安徽-068": ["Tiantangzhai", "天堂寨"],
  "安徽-069": ["Longchuan Jixi Anhui", "绩溪龙川"],
  "安徽-070": ["Balihe Anhui", "八里河"],
  "安徽-071": ["Ancient Huizhou", "徽州古城"],
  "福建-072": ["Gulangyu Xiamen", "鼓浪屿"],
  "福建-073": ["Mount Wuyi", "Wuyishan"],
  "福建-074": ["Fujian Tulou", "Yongding Tulou"],
  "福建-075": ["Taining Fujian", "泰宁"],
  "福建-076": ["Baishuiyang Yuanyangxi", "白水洋"],
  "福建-077": ["Qingyuan Mountain Quanzhou", "清源山"],
  "福建-078": ["Taimu Mountain", "太姥山"],
  "江西-079": ["Mount Lu Lushan", "庐山"],
  "江西-080": ["Jinggangshan", "井冈山"],
  "江西-081": ["Sanqing Mountain", "三清山"],
  "江西-082": ["Longhu Mountain Jiangxi", "龙虎山"],
  "江西-083": ["Wuyuan Jiangwan", "婺源"],
  "江西-084": ["Jingdezhen Ancient Kiln", "景德镇古窑"],
  "山东-085": ["Penglai Pavilion", "蓬莱阁"],
  "山东-086": ["Qufu Confucius Temple Cemetery Mansion", "三孔"],
  "山东-087": ["Mount Tai", "Taishan Mountain"],
  "山东-088": ["Mount Lao Qingdao", "Laoshan Qingdao"],
  "山东-089": ["Nanshan Buddha Longkou", "烟台 龙口 南山", "龙口 南山大佛"],
  "山东-090": ["Liugong Island Weihai", "刘公岛"],
  "山东-091": ["Taierzhuang Ancient Town", "台儿庄古城"],
  "山东-092": ["Baotu Spring Jinan", "Daming Lake Jinan"],
  "山东-093": ["Yimeng Mountain", "沂蒙山"],
  "河南-094": ["Shaolin Temple Songshan", "少林寺"],
  "河南-095": ["Longmen Grottoes", "龙门石窟"],
  "河南-096": ["Yuntai Mountain Henan", "云台山"],
  "河南-097": ["Millennium City Park Kaifeng", "清明上河园"],
  "河南-098": ["Baiyun Mountain Luoyang", "洛阳白云山"],
  "河南-099": ["Yinxu Anyang", "殷墟"],
  "河南-100": ["Zhongyuan Buddha Yaoshan", "中原大佛"],
  "河南-101": ["Laojun Mountain Luanchuan", "老君山"],
  "河南-102": ["Longtan Grand Canyon Luoyang", "龙潭大峡谷"],
  "河南-103": ["Xixia Dinosaur Relic Park", "伏牛山老界岭"],
  "湖南-104": ["Mount Heng Hunan", "Nanyue Hengshan"],
  "湖南-105": ["Wulingyuan Zhangjiajie", "Tianmen Mountain Zhangjiajie"],
  "湖南-106": ["Yueyang Tower", "Junshan Island"],
  "湖南-107": ["Shaoshan Hunan", "Mao Zedong hometown"],
  "湖南-108": ["Yuelu Mountain Orange Isle", "橘子洲"],
  "湖南-109": ["Huaminglou Liu Shaoqi", "花明楼"],
  "湖北-110": ["Yellow Crane Tower", "黄鹤楼"],
  "湖北-111": ["Three Gorges Dam", "三峡大坝"],
  "湖北-112": ["Wudang Mountains", "武当山"],
  "湖北-113": ["Tribe of the Three Gorges", "三峡人家"],
  "湖北-114": ["Shennong Stream", "神龙溪"],
  "湖北-115": ["Shennongjia", "神农架"],
  "湖北-116": ["Qingjiang Gallery", "清江画廊"],
  "湖北-117": ["East Lake Wuhan", "武汉东湖"],
  "湖北-118": ["Mulan Mountain Wuhan", "黄陂木兰"],
  "广东-119": ["Chimelong Guangzhou", "长隆旅游度假区"],
  "广东-120": ["Overseas Chinese Town Shenzhen", "Window of the World Shenzhen"],
  "广东-121": ["Mission Hills Shenzhen", "观澜湖"],
  "广东-122": ["Yannanfei Tea Fields", "雁南飞茶田"],
  "广东-123": ["Baiyun Mountain Guangzhou", "广州白云山"],
  "广东-124": ["Lianzhou Underground River", "连州地下河"],
  "广东-125": ["Danxia Mountain", "丹霞山"],
  "广东-126": ["Xiqiao Mountain", "西樵山"],
  "广东-127": ["Chuanlord Tourism Leisure Expo Park", "长鹿旅游休博园"],
  "广东-128": ["Luofu Mountain", "罗浮山"],
  "广西-129": ["Li River Guilin", "漓江"],
  "广西-130": ["Guilin Merryland Resort", "乐满地"],
  "广西-131": ["Duxiu Peak Jingjiang Princes City", "独秀峰王城"],
  "广西-132": ["Qingxiu Mountain Nanning", "青秀山"],
  "海南-133": ["Nanshan Temple Sanya", "Nanshan Buddhism Cultural Park"],
  "海南-134": ["Daxiao Dongtian Sanya", "大小洞天"],
  "海南-135": ["Yanoda Rainforest", "呀诺达"],
  "海南-136": ["Boundary Island Hainan", "分界洲岛"],
  "重庆-137": ["Dazu Rock Carvings", "大足石刻"],
  "重庆-138": ["Lesser Three Gorges Chongqing", "小三峡"],
  "重庆-139": ["Wulong Karst", "天生三桥"],
  "重庆-140": ["Youyang Taohuayuan", "酉阳桃花源"],
  "重庆-141": ["Black Mountain Valley Chongqing", "黑山谷"],
  "重庆-142": ["Jinfo Mountain", "金佛山"],
  "四川-143": ["Mount Qingcheng Dujiangyan", "青城山 都江堰"],
  "四川-144": ["Mount Emei", "Emeishan"],
  "四川-145": ["Jiuzhaigou", "九寨沟"],
  "四川-146": ["Leshan Giant Buddha", "乐山大佛"],
  "四川-147": ["Huanglong Sichuan", "黄龙风景区"],
  "四川-148": ["Deng Xiaoping Hometown Guang'an", "邓小平故里"],
  "四川-149": ["Langzhong Ancient Town", "阆中古城"],
  "四川-150": ["Beichuan Qiang City", "北川羌城"],
  "四川-151": ["Wenchuan Sichuan", "汶川"],
  "贵州-152": ["Huangguoshu Waterfall", "黄果树瀑布"],
  "贵州-153": ["Dragon Palace Cave Guizhou", "龙宫"],
  "贵州-154": ["Baili Dujuan", "百里杜鹃"],
  "云南-155": ["Stone Forest Shilin", "石林"],
  "云南-156": ["Jade Dragon Snow Mountain", "玉龙雪山"],
  "云南-157": ["Three Pagodas Chongsheng Temple", "崇圣寺三塔"],
  "云南-158": ["Xishuangbanna Tropical Botanical Garden", "西双版纳植物园"],
  "云南-159": ["Lijiang Old Town", "丽江古城"],
  "云南-160": ["Potatso National Park", "Pudacuo Shangri-La"],
  "西藏-161": ["Potala Palace", "布达拉宫"],
  "西藏-162": ["Jokhang Temple", "大昭寺"],
  "陕西-163": ["Terracotta Army", "秦始皇兵马俑"],
  "陕西-164": ["Huaqing Pool", "华清池"],
  "陕西-165": ["Mausoleum of the Yellow Emperor", "黄帝陵"],
  "陕西-166": ["Mount Hua", "Huashan Mountain"],
  "陕西-167": ["Giant Wild Goose Pagoda Tang Paradise", "大唐芙蓉园"],
  "陕西-168": ["Famen Temple", "法门寺"],
  "甘肃-169": ["Jiayuguan Pass", "嘉峪关"],
  "甘肃-170": ["Kongtong Mountain", "崆峒山"],
  "甘肃-171": ["Maijishan Grottoes", "麦积山石窟"],
  "青海-172": ["Qinghai Lake", "青海湖"],
  "青海-173": ["Kumbum Monastery", "Ta'er Monastery"],
  "宁夏-174": ["Shahu Lake Ningxia", "沙湖"],
  "宁夏-175": ["Shapotou", "沙坡头"],
  "宁夏-176": ["Zhenbeibao Western Film Studio", "镇北堡西部影视城"],
  "新疆-177": ["Tianchi Heavenly Lake Xinjiang", "天山天池"],
  "新疆-178": ["Grape Valley Turpan", "葡萄沟"],
  "新疆-179": ["Kanas Lake", "喀纳斯"],
  "新疆-180": ["Nalati Grassland", "那拉提"],
  "新疆-181": ["Koktokay", "可可托海"],
  "新疆-182": ["Zepu Jinhuyang Populus Euphratica", "金湖杨"],
  "新疆-183": ["Tianshan Grand Canyon Urumqi", "天山大峡谷"],
  "新疆-184": ["Bosten Lake", "博斯腾湖"],
  "台湾-185": ["National Palace Museum Taipei", "Taipei National Palace Museum", "台北故宫博物院"],
  "台湾-186": ["Taipei 101", "台北101"],
  "台湾-187": ["Chiang Kai-shek Memorial Hall", "中正纪念堂"],
  "台湾-188": ["Yangmingshan National Park", "阳明山国家公园"],
  "台湾-189": ["Yehliu Geopark", "野柳地质公园"],
  "台湾-190": ["Taroko National Park", "Taroko Gorge", "太鲁阁"],
  "台湾-191": ["Sun Moon Lake", "日月潭"],
  "台湾-192": ["Alishan National Scenic Area", "Alishan Forest Railway", "阿里山"],
  "台湾-193": ["Yushan National Park", "Jade Mountain Taiwan", "玉山国家公园"],
  "台湾-194": ["Kenting National Park", "垦丁国家公园", "墾丁國家公園"],
  "台湾-195": ["Penghu National Scenic Area", "Penghu Taiwan", "澎湖"],
  "台湾-196": ["Sanxiantai", "East Coast National Scenic Area Taiwan", "三仙台"],
  "台湾-197": ["Jiufen Old Street", "Jiufen Taiwan", "九份老街"],
  "台湾-198": ["Fo Guang Shan Buddha Museum", "佛光山佛陀纪念馆"],
  "台湾-199": ["Fort Zeelandia Taiwan", "Anping Fort", "安平古堡"],
  "台湾-200": ["Fort San Domingo Tamsui", "淡水红毛城", "紅毛城"],
  "香港-201": ["Victoria Peak Hong Kong", "The Peak Hong Kong", "太平山顶"],
  "香港-202": ["Victoria Harbour Hong Kong Avenue of Stars", "维多利亚港 星光大道"],
  "香港-203": ["Tian Tan Buddha Ngong Ping", "Big Buddha Hong Kong", "天坛大佛"],
  "香港-204": ["Hong Kong Disneyland", "香港迪士尼乐园"],
  "香港-205": ["Ocean Park Hong Kong", "香港海洋公园"],
  "香港-206": [
    "High Island Reservoir East Dam",
    "Hong Kong UNESCO Global Geopark",
    "香港地质公园",
    "香港地質公園",
  ],
  "香港-207": ["Wong Tai Sin Temple Hong Kong", "黄大仙祠", "黃大仙祠"],
  "香港-208": [
    "Hong Kong Palace Museum West Kowloon",
    "Hong Kong Palace Museum",
    "西九文化区 香港故宫文化博物馆",
    "香港故宮文化博物館",
  ],
  "澳门-209": ["Ruins of St. Paul's Senado Square Macau", "Historic Centre of Macao", "大三巴 议事亭前地"],
  "澳门-210": ["A-Ma Temple Macau", "妈阁庙"],
  "澳门-211": ["Guia Fortress Lighthouse Macau", "东望洋灯塔"],
  "澳门-212": ["Macau Tower", "澳门旅游塔"],
  "澳门-213": ["The Venetian Macao Cotai Strip", "Venetian Macao", "威尼斯人澳门 金光大道", "威尼斯人澳門"],
  "澳门-214": ["Taipa Houses Museum Macau", "龙环葡韵", "龍環葡韻住宅式博物館"],
  "澳门-215": ["Hac Sa Beach Macau", "黑沙海滩", "黑沙海灘"],
  "澳门-216": ["Macao Giant Panda Pavilion", "澳门大熊猫馆", "澳門大熊貓館"],
};

const rejectedTerms = [
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
  "医院",
  "图卷",
  "画卷",
  "藏品",
  "博物院藏",
  "文物",
  "pdf",
  "djvu",
  "svg",
  "webm",
  "video",
  "mp4",
  "ogv",
  "locator",
  "location map",
  "locator map",
  "administrative map",
  "route map",
  "map of",
  "_map",
  "-map",
  "diagram",
  "sign",
  "logo",
  "flag",
  "seal",
  "coat of arms",
  "360°",
  "360度",
  "painting",
  "drawing",
  "manuscript",
  "collection",
  "火车站",
  "railway",
  " station",
  "metro station",
  "捷运站",
  "地铁站",
  "出口",
  "exit ",
  "platform",
  "concourse",
  "mrt",
  "train station",
  "hospital",
  "australia",
  "wollongong",
  "nantian",
  "hkgeo",
];

const positiveTerms = [
  "scenic",
  "scenery",
  "temple",
  "great wall",
  "wall",
  "mount",
  "mountain",
  "lake",
  "park",
  "palace",
  "garden",
  "pagoda",
  "buddha",
  "cave",
  "grotto",
  "waterfall",
  "tower",
  "mausoleum",
  "tomb",
  "old town",
  "ancient town",
  "street",
  "river",
  "valley",
  "forest",
  "wetland",
  "古城",
  "古镇",
  "长城",
  "大佛",
  "寺",
  "山",
  "湖",
  "瀑布",
  "园",
  "宫",
  "洞",
  "楼",
  "陵",
  "城",
  "街",
  "谷",
  "河",
  "林",
  "湿地",
  "草原",
];

await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

const attractions = loadAttractions();
const selected = maxItems ? attractions.slice(0, maxItems) : attractions;
const manifest = {};
const attributionRows = [];
const previousSources = loadPreviousSources();

console.log(`Preparing ${selected.length} attraction image records...`);
const fallbackLocal = await ensureLocalImage(fallbackSource, "fallback.jpg");

for (const [index, attraction] of selected.entries()) {
  const fileName = `${String(attractions.indexOf(attraction) + 1).padStart(3, "0")}.jpg`;
  const outputPath = path.join(outDir, fileName);
  const existingFile = await fileExists(outputPath);
  const itemNumber = attractions.indexOf(attraction) + 1;
  const shouldDownload = !hasDownloadRange || (itemNumber >= fromItem && (!toItem || itemNumber <= toItem));
  const previousSource = trustedPreviousSource(previousSources.get(fileName), attraction);
  const shouldRefreshFromWiki =
    wikiFirst && !force && existingFile && previousSource && !isWikiSource(previousSource);
  const existing = !force && existingFile && Boolean(previousSource) && !shouldRefreshFromWiki;

  let source = null;
  if (!existing && shouldDownload && !metadataOnly) {
    const candidates = await findImageCandidates(attraction, {
      wikiOnly: shouldRefreshFromWiki || wikiOnly,
    });
    source = candidates.length ? await downloadFirstAvailable(candidates, fileName, attraction.name) : null;

    if ((!source || source.id === "fallback") && shouldRefreshFromWiki) {
      source = previousSource;
    } else if (!source && !wikiOnly) {
      const fallbackCandidates = await findImageCandidates(attraction);
      source = fallbackCandidates.length
        ? await downloadFirstAvailable(fallbackCandidates, fileName, attraction.name)
        : fallbackSource;
    } else if (!source) {
      source = fallbackSource;
    }
  } else if (!existing && shouldDownload && metadataOnly) {
    source = fallbackSource;
  } else if (!existing && previousSource?.id === "fallback") {
    source = fallbackSource;
  }

  const finalSource =
    source ||
    (metadataOnly && shouldDownload ? await findImage(attraction) : previousSource) ||
    (shouldDownload ? await findImage(attraction) : null) ||
    fallbackSource;
  manifest[attraction.id] = {
    url: finalSource.id === "fallback" ? fallbackLocal : `assets/images/${fileName}`,
    pageUrl: finalSource.pageUrl,
    caption: `图片来源：${finalSource.source} · ${finalSource.title}`,
  };
  attributionRows.push({
    attraction: attraction.name,
    fileName,
    ...finalSource,
    fallback: finalSource.id === "fallback",
  });

  const status = finalSource.id === "fallback" ? "fallback" : finalSource.source;
  console.log(`${index + 1}/${selected.length} ${attraction.name} -> ${fileName} (${status})`);
}

if (!manifest.fallback) {
  manifest.fallback = {
    url: fallbackLocal,
    pageUrl: fallbackSource.pageUrl,
    caption: `图片来源：${fallbackSource.source} · ${fallbackSource.title}`,
  };
}

await writeFile(
  manifestPath,
  `// Generated by scripts/build-images.mjs. Do not edit by hand.\nwindow.CHINA_5A_IMAGES = ${JSON.stringify(
    manifest,
    null,
    2,
  )};\n`,
  "utf8",
);
await writeFile(attributionPath, buildAttribution(attributionRows), "utf8");
await rm(tmpDir, { recursive: true, force: true });

const fallbackCount = attributionRows.filter((row) => row.fallback).length;
console.log(`Done. ${selected.length - fallbackCount} sourced images, ${fallbackCount} fallbacks.`);

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : "";
}

function loadAttractions() {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync("data/attractions.js", "utf8"), sandbox);
  return sandbox.window.CHINA_5A_ATTRACTIONS;
}

function loadPreviousSources() {
  const sources = new Map();
  try {
    const text = readFileSync(attributionPath, "utf8");
    for (const line of text.split("\n")) {
      const match = line.match(/^\| .*? \| `(\d+\.jpg)` \| (.*?) \| (.*?) \| \[link\]\((.*?)\) \|$/);
      if (!match) continue;
      const [, fileName, sourceAndTitle, license, pageUrl] = match;
      const separator = sourceAndTitle.indexOf(" · ");
      const source = separator >= 0 ? sourceAndTitle.slice(0, separator) : sourceAndTitle;
      const title = separator >= 0 ? sourceAndTitle.slice(separator + 3) : sourceAndTitle;
      sources.set(fileName, {
        id: pageUrl === fallbackSource.pageUrl ? "fallback" : `previous:${fileName}`,
        url: `assets/images/${fileName}`,
        pageUrl,
        title,
        source,
        license,
      });
    }
  } catch {
    // No previous attribution file yet.
  }
  return sources;
}

async function findImage(attraction) {
  return (await findImageCandidates(attraction))[0] || null;
}

async function findImageCandidates(attraction, options = {}) {
  const queries = imageQueries(attraction);
  const candidates = [];

  for (const query of queries.slice(0, 7)) {
    candidates.push(...(await searchWikipediaExact(query, attraction)));
    if (bestCandidate(candidates, attraction)?.score >= 12) break;
  }

  for (const query of queries) {
    candidates.push(...(await searchCommons(query, attraction)));
    if (bestCandidate(candidates, attraction)?.score >= 12) break;
  }

  for (const query of queries.slice(0, 4)) {
    candidates.push(...(await searchWikipedia(query, attraction)));
    if (bestCandidate(candidates, attraction)?.score >= 12) break;
  }

  if (!wikiOnly && !options.wikiOnly) {
    for (const query of queries.slice(0, 5)) {
      candidates.push(...(await searchOpenverse(query, attraction)));
      if (bestCandidate(candidates, attraction)?.score >= 12) break;
    }
  }

  return rankedCandidates(candidates, attraction).map((entry) => entry.candidate);
}

function imageQueries(attraction) {
  const compactName = cleanName(attraction.name);
  const withoutProvince = compactName.replace(new RegExp(`^${attraction.province}`), "").trim();
  return unique([
    ...(queryOverrides[attraction.id] || []),
    `${attraction.province} ${attraction.coordinateLabel}`,
    `${attraction.province} ${attraction.name}`,
    `${attraction.coordinateLabel} China`,
    `${withoutProvince} China`,
    attraction.name,
    compactName,
    withoutProvince,
    attraction.coordinateLabel,
  ].filter(Boolean));
}

function cleanName(name) {
  return name
    .replace(/[（(].*?[）)]/g, "")
    .replace(/—|·|-/g, " ")
    .replace(/旅游景区|旅游区|风景名胜区|风景区|景区|公园|博物院|博物馆|文化园区/g, "")
    .trim();
}

async function searchCommons(query, attraction) {
  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    generator: "search",
    gsrsearch: scopedQuery(query, attraction, "China"),
    gsrnamespace: "6",
    gsrlimit: "10",
    prop: "imageinfo",
    iiurlwidth: "1280",
    iiprop: "url|mime|size|extmetadata",
    format: "json",
  });
  const data = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  return sortedPages(data)
    .map((page) => {
      const info = page.imageinfo?.[0];
      if (!info?.thumburl) return null;
      const meta = info.extmetadata || {};
      const source = {
        id: `commons:${page.pageid}`,
        url: info.thumburl || info.url,
        pageUrl: info.descriptionurl,
        title: stripFilePrefix(page.title),
        source: "Wikimedia Commons",
        license: cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || ""),
        author: cleanHtml(meta.Artist?.value || meta.Attribution?.value || ""),
        width: info.width,
        height: info.height,
        text: [
          page.title,
          meta.ObjectName?.value,
          meta.ImageDescription?.value,
          meta.Categories?.value,
        ].join(" "),
      };
      return withScore(source, attraction);
    })
    .filter(Boolean);
}

async function searchWikipediaExact(query, attraction) {
  const title = String(query || "").trim();
  if (!title || title.length > 64 || /[?？/\\]/.test(title)) return [];

  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    titles: title,
    redirects: "1",
    prop: "pageimages|info",
    piprop: "thumbnail|name|original",
    pithumbsize: "1280",
    inprop: "url",
    format: "json",
  });
  const data = await fetchJson(`https://zh.wikipedia.org/w/api.php?${params}`);
  return sortedPages(data)
    .map((page) => wikipediaPageSource(page, attraction))
    .filter(Boolean);
}

async function searchWikipedia(query, attraction) {
  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    generator: "search",
    gsrsearch: scopedQuery(query, attraction, "中国"),
    gsrlimit: "6",
    prop: "pageimages|info",
    piprop: "thumbnail|name|original",
    pithumbsize: "1280",
    inprop: "url",
    format: "json",
  });
  const data = await fetchJson(`https://zh.wikipedia.org/w/api.php?${params}`);
  return sortedPages(data)
    .map((page) => wikipediaPageSource(page, attraction))
    .filter(Boolean);
}

function wikipediaPageSource(page, attraction) {
  if (!page?.thumbnail?.source) return null;
  const source = {
    id: `wikipedia:${page.pageid}`,
    url: page.thumbnail.source || page.original?.source,
    pageUrl: page.fullurl,
    title: page.title,
    source: "维基百科",
    license: "",
    author: "",
    width: page.original?.width || page.thumbnail.width,
    height: page.original?.height || page.thumbnail.height,
    text: [page.title, page.pageimage, page.fullurl].join(" "),
  };
  return withScore(source, attraction);
}

async function searchOpenverse(query, attraction) {
  const params = new URLSearchParams({
    q: scopedQuery(query, attraction, "China"),
    license_type: "commercial,modification",
    extension: "jpg,png,jpeg",
    category: "photograph",
    page_size: "8",
  });
  const data = await fetchJson(`https://api.openverse.engineering/v1/images/?${params}`, {
    followRedirects: true,
  });
  return (data.results || [])
    .filter((item) => !String(item.provider || "").toLowerCase().includes("wikimedia"))
    .map((item) => {
      const source = {
        id: `openverse:${item.id}`,
        url: item.url || item.thumbnail,
        pageUrl: item.foreign_landing_url || item.url,
        title: item.title || "Openverse image",
        source: `${item.provider || "Openverse"}`,
        license: item.license || "",
        author: item.creator || "",
        width: item.width,
        height: item.height,
        text: [item.title, item.tags?.map((tag) => tag.name).join(" "), item.provider].join(" "),
      };
      return withScore(source, attraction, { query, strict: true });
    })
    .filter(Boolean);
}

function withScore(candidate, attraction, options = {}) {
  if (!candidate.url) return null;
  if (!isAllowed(candidate)) return null;
  const score = scoreCandidate(candidate, attraction, options.query || "");
  const minimum = options.strict ? 10 : 5;
  return score >= minimum ? { candidate, score } : null;
}

function scopedQuery(query, attraction, mainlandSuffix) {
  return attraction.rating === "peer5A" ? query : `${query} ${mainlandSuffix}`;
}

function isAllowed(candidate) {
  const text = normalizeText([
    candidate.title,
    candidate.url,
    candidate.pageUrl,
    candidate.text,
  ].join(" "));
  if (rejectedTerms.some((term) => text.includes(normalizeText(term)))) return false;
  if (candidate.width && candidate.height) {
    if (candidate.width < 420 || candidate.height < 280) return false;
    const ratio = candidate.width / candidate.height;
    if (ratio < 0.75 || ratio > 2.6) return false;
  }
  return true;
}

function scoreCandidate(candidate, attraction, query = "") {
  const text = normalizeText([candidate.title, candidate.text, candidate.pageUrl].join(" "));
  const tokens = imageTokens(attraction);
  let score = 0;

  for (const token of tokens.strong) {
    if (token && text.includes(normalizeText(token))) score += token.length >= 3 ? 6 : 3;
  }
  for (const token of tokens.medium) {
    if (token && text.includes(normalizeText(token))) score += token.length >= 3 ? 3 : 1;
  }
  for (const term of positiveTerms) {
    if (text.includes(normalizeText(term))) score += 1;
  }
  for (const token of queryTokens(query)) {
    if (text.includes(token)) score += 2;
  }
  if (sourcePriority(candidate) > 1) score += 2;
  if (candidate.width && candidate.height) {
    const ratio = candidate.width / candidate.height;
    if (ratio >= 1.15 && ratio <= 1.9) score += 2;
  }
  return score;
}

function imageTokens(attraction) {
  const compact = cleanName(attraction.name);
  const withoutProvince = compact.replace(new RegExp(`^${attraction.province}`), "").trim();
  const label = attraction.coordinateLabel;
  const labelShort = label.replace(/风景区|景区|公园|博物院|博物馆|旅游区/g, "");
  const overrides = queryOverrides[attraction.id] || [];
  const overridePhrases = overrides.map((item) => String(item).trim()).filter(Boolean);
  const overrideWords = unique(overrides.flatMap((item) => queryTokens(item)));
  return {
    strong: unique([label, labelShort, withoutProvince, compact, ...overridePhrases].filter(Boolean)),
    medium: unique([attraction.name, attraction.province, ...overrideWords].filter(Boolean)),
  };
}

function trustedPreviousSource(source, attraction) {
  if (!source) return null;
  if (source.id === "fallback") return source;
  const query = (queryOverrides[attraction.id] || []).join(" ");
  const scored = withScore(source, attraction, {
    query,
    strict: sourcePriority(source) < 2,
  });
  if (!scored) return null;
  const minimum = sourcePriority(source) > 1 ? 5 : 10;
  return scored.score >= minimum ? source : null;
}

function bestCandidate(candidates, attraction) {
  return rankedCandidates(candidates, attraction)[0];
}

function rankedCandidates(candidates, attraction) {
  const seen = new Set();
  return candidates
    .map((entry) => (entry.score === undefined ? withScore(entry, attraction) : entry))
    .filter(Boolean)
    .sort((a, b) => {
      const sourceDelta = sourcePriority(b.candidate) - sourcePriority(a.candidate);
      if (sourceDelta) return sourceDelta;
      return b.score - a.score;
    })
    .filter(({ candidate }) => {
      const key = candidate.id || candidate.url;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function queryTokens(query) {
  return normalizeText(query)
    .split(/[\s,，.·\-—:：()（）]+/)
    .filter((token) => {
      const hasCjk = /[\u4e00-\u9fff]/.test(token);
      return (hasCjk ? token.length >= 2 : token.length >= 3) &&
        !["china", "scenic", "tourist"].includes(token);
    });
}

function sourcePriority(candidate) {
  return isWikiSource(candidate) ? 2 : 1;
}

function isWikiSource(candidate) {
  const text = normalizeText([candidate.source, candidate.pageUrl, candidate.url].join(" "));
  return (
    text.includes("wikimedia") ||
    text.includes("wikipedia") ||
    text.includes("维基") ||
    text.includes("維基")
  );
}

async function ensureLocalImage(source, fileName) {
  const outputPath = path.join(outDir, fileName);
  if (!force && (await fileExists(outputPath))) return `assets/images/${fileName}`;

  if (source.id === "fallback" && fileName !== "fallback.jpg") {
    return `assets/images/fallback.jpg`;
  }

  const tmpPath = path.join(tmpDir, `${fileName}.download`);
  const response = await fetchWithRetry(source.url);
  if (!response.ok) throw new Error(`Image download failed ${response.status}: ${source.url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(tmpPath, bytes);
  await execFileAsync("sips", [
    "-s",
    "format",
    "jpeg",
    "-s",
    "formatOptions",
    "76",
    "--resampleHeightWidthMax",
    "960",
    tmpPath,
    "--out",
    outputPath,
  ]);
  return `assets/images/${fileName}`;
}

async function downloadFirstAvailable(candidates, fileName, label) {
  for (const source of candidates) {
    const downloadSource =
      skipWikimediaDownloads && source.id !== "fallback" && isWikimediaUrl(source.url)
        ? proxiedWikimediaSource(source)
        : source;
    if (!downloadSource) continue;
    try {
      await ensureLocalImage(downloadSource, fileName);
      return source;
    } catch (error) {
      console.warn(`Skipping image for ${label}: ${source.title} (${error.message})`);
    }
  }
  return fallbackSource;
}

function isWikimediaUrl(url) {
  try {
    return new URL(url).hostname.includes("wikimedia.org");
  } catch {
    return false;
  }
}

function proxiedWikimediaSource(source) {
  try {
    const url = new URL(source.url);
    const upstream = `${url.hostname}${url.pathname}`;
    const proxy = new URL("https://images.weserv.nl/");
    proxy.searchParams.set("url", upstream);
    proxy.searchParams.set("w", "960");
    proxy.searchParams.set("output", "jpg");
    proxy.searchParams.set("q", "76");
    return {
      ...source,
      id: `${source.id}:proxy`,
      url: proxy.toString(),
    };
  } catch {
    return null;
  }
}

async function fetchJson(url, options = {}) {
  await sleep(180);
  try {
    const response = await fetch(url, { headers: { "User-Agent": userAgent }, redirect: "follow" });
    if (!response.ok) return {};
    return response.json();
  } catch {
    return {};
  }
}

async function fetchWithRetry(url) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await waitForDownloadSlot(url);
    await sleep(650 + attempt * 1400);
    const response = await fetch(url, { headers: { "User-Agent": userAgent }, redirect: "follow" });
    if (response.ok || response.status !== 429) return response;
    const retryAfter = Number(response.headers.get("retry-after") || 0);
    const waitMs = Math.max(retryAfter * 1000, [5000, 12000, 25000][attempt]);
    console.warn(`Rate limited while downloading image; waiting ${Math.ceil(waitMs / 1000)}s...`);
    await sleep(waitMs);
  }
  return fetch(url, { headers: { "User-Agent": userAgent }, redirect: "follow" });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDownloadSlot(url) {
  let hostname = "unknown";
  try {
    hostname = new URL(url).hostname;
  } catch {
    return;
  }

  const minimumGap = hostname.includes("wikimedia.org") ? wikimediaDownloadGap : 900;
  const now = Date.now();
  const last = lastDownloadByHost.get(hostname) || 0;
  const wait = Math.max(0, minimumGap - (now - last));
  if (wait) await sleep(wait);
  lastDownloadByHost.set(hostname, Date.now());
}

function sortedPages(data) {
  return Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
}

function unique(items) {
  return [...new Set(items)];
}

function normalizeText(value) {
  return String(value)
    .toLocaleLowerCase("zh-CN")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripFilePrefix(value) {
  return String(value).replace(/^File:/, "");
}

async function fileExists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

function buildAttribution(rows) {
  const lines = [
    "# Image Sources",
    "",
    "Generated by `scripts/build-images.mjs`. Images are resized local copies for the static map UI.",
    "",
    "| 景区 | 本地文件 | 来源 | 授权 | 原始页面 |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const row of rows) {
    const fileName = row.fallback ? "fallback.jpg" : row.fileName;
    lines.push(
      `| ${escapeMd(row.attraction)} | \`${fileName}\` | ${escapeMd(row.source)} · ${escapeMd(
        row.title,
      )} | ${escapeMd(row.license || "见来源页面")} | [link](${row.pageUrl}) |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function escapeMd(value) {
  return String(value || "").replace(/\|/g, "\\|");
}
