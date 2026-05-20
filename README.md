# 中国 5A 景区互动地图

一个静态前端地图应用，展示用户提供的 184 个中国国家 AAAAA 级旅游景区。
界面参考地理数据类在线地图站点，提供轻量底图、景区列表、选中占地范围高亮和景区图片详情。

## 本地运行

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 数据

- 景区清单来自 `/Users/mark/Downloads/China-5A-tourist-attraction.md`
- `data/attractions.js` 由 `scripts/build-attractions.mjs` 生成
- 坐标为景区、城市或省级近似定位；点击景区时会优先使用 OpenStreetMap 可用面边界高亮占地范围
