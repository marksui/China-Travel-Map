# 中国 5A 与对标景点互动地图

一个静态前端地图应用，展示中国大陆官方 5A 景区，并加入中华民国（台湾）、香港、澳门的对标 5A 景点。
界面参考地理数据类在线地图站点，提供轻量底图、景点列表、选中占地范围高亮和景点图片详情。
界面支持简体中文、繁体中文和 English 切换；景点名称保留数据源原始中文名称。

## 本地运行

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 数据

- 大陆官方 5A 清单来自 `/Users/mark/Downloads/China-5A-tourist-attraction.md`
- 中华民国（台湾）、香港、澳门景点为手动补充的“对标 5A”地标，不作为大陆官方 5A 授牌数据
- 台港澳对标依据参考台湾观光署国家风景区/国家公园、香港旅发局重点景点与香港 UNESCO Global Geopark、澳门政府旅游局/澳门世界遗产片区等官方旅游体系
- `data/attractions.js` 由 `scripts/build-attractions.mjs` 生成
- `data/attraction-images.js` 和 `assets/images/*.jpg` 由 `scripts/build-images.mjs` 生成，本地图片统一压缩到最大边 960px
- 图片来源记录在 `assets/images/SOURCES.md`
- 坐标为景点、城市或地区级近似定位；点击景点时会优先使用 OpenStreetMap 可用面边界高亮占地范围，并把选中点校准到可用面边界中心

## 重新生成图片

```bash
node scripts/build-images.mjs --force
```

图片脚本优先使用 Wikimedia Commons / 维基百科图片源；旧图若来自非 Wiki 来源，会先尝试用 Wiki 图片替换，找不到可靠 Wiki 图时才保留其他可复用来源或占位图。
