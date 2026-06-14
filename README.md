# 中国 5A 与对标景点互动地图

这是一张可交互的中国 5A 景点地图，收录中国大陆官方 5A 景区，并加入台湾、香港、澳门的对标景点。

你可以在地图上搜索景点或地区，点击景点查看图片、评级年份和可用的景区范围高亮。页面默认简体中文，也支持繁体中文、English、韩文、日文、泰文、西班牙语和俄语切换。

景点图片优先使用维基媒体/维基百科来源，并已保存到本地以保证打开稳定。

## 维护命令

生成当前数据质量报告：

```bash
node scripts/audit-maintenance.mjs --out maintenance-audit.json
```

导出完整待处理队列表格：
```bash
node scripts/audit-maintenance.mjs --csv-dir maintenance-queues
```

在 CSV 里只填写需要变更的列：`newLat`、`newLng`、`newCoordinateLevel`、`newCoordinateLabel`、`newCategory`、`newThemes`、`newSeasons`、`newSourceKey`、`newDataUpdated`、`reviewAction`、`replacementUrl`、`note`。不要直接改原始 `lat/lng/imageUrl` 列，原始列用于对照。

把填好的 CSV 转成维护包：
```bash
python scripts/maintenance-csv-to-package.py maintenance-queues --out china-travel-map-maintenance.json
```

先 dry-run 检查维护包：
```bash
python scripts/apply-maintenance-package.py china-travel-map-maintenance.json --dry-run
```

报告会同时输出 `quality.coordinateExactRate`、`quality.imageCoverageRate`、`quality.sourceCoverageRate`、`quality.reviewCoverageRate`，方便跟踪坐标、图片、来源和审核覆盖率。

也可以在页面维护面板里点击“导出审计”下载同类报告。
右下角“可信度概览”的进度条可直接跳到缺图、坐标、来源或未审核图片队列。

应用前端导出的维护包，同时写入图片审核记录和维护覆盖：

```bash
python scripts/apply-maintenance-package.py china-travel-map-maintenance.json
```
