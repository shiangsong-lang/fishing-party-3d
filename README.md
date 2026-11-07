# Fishing Party 3D v2.0 — 湖畔多人移動版

## 啟動
安裝 Node.js 18+，在專案資料夾執行：

```bash
npm install
npm start
```

瀏覽器開啟 http://localhost:3000。建立房間，另一個瀏覽器輸入房號加入。

## 操作
- WASD / 方向鍵：移動
- Shift：加速
- 按住滑鼠在 3D 畫面左右拖曳：旋轉第三人稱鏡頭
- 滑鼠滾輪：縮放
- 房主按「開始比賽」後可使用原本的「拋竿釣魚」按鈕

## v2.0 新增
- 湖邊自由移動，禁止走入湖中央
- 第三人稱跟隨攝影機
- Socket.IO 即時同步玩家位置與朝向；伺服器基本速度與範圍檢查
- 保留房間、釣魚計分、倒數、排行榜及重新比賽

## Render 更新部署
1. 在 GitHub 的同一個 `fishing-party-3d` repository 上傳此專案內容，覆蓋同名檔案（不要上傳 zip 或 node_modules）。
2. Render 既有 Web Service → Manual Deploy → Deploy latest commit（若已自動部署則不必）。
3. 設定維持 Build Command: `npm install`、Start Command: `npm start`、Root Directory 留空（package.json 位於根目錄時）。
4. Render 顯示 Live 後重新整理原本網址，兩個瀏覽器加入同房測試。

## 注意
- 使用 Three.js CDN，玩家瀏覽器需能存取 jsDelivr。
- 房間及比分儲存在伺服器記憶體，Render 重新啟動會清空。
- 移動為客戶端預測與伺服器基本驗證，非防作弊競技架構。
- 此版保留原有按鈕式釣魚，3D 拋竿動畫是後續階段。
