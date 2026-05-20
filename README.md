# 中国 5A 景区互动地图

一个静态前端地图应用，展示用户提供的 184 个中国国家 AAAAA 级旅游景区。
界面参考地理数据类在线地图站点，提供地图点位、景区列表、选中高亮和景区图片详情。

## 本地运行

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 数据

- 景区清单来自 `/Users/mark/Downloads/China-5A-tourist-attraction.md`
- `data/attractions.js` 由 `scripts/build-attractions.mjs` 生成
- 坐标为景区、城市或省级近似定位，用于交互地图展示
