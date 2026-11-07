# Fishing Party 3D v2.1

延續 v2.0 的 Three.js 第三人稱湖畔、WASD、Socket.IO 房間、180 秒比賽與排行榜，新增多人同步的拋竿、浮標、魚線、水波紋、咬鉤、揚竿與張力收線遊戲。

## Windows 本機啟動

1. 安裝 Node.js LTS。
2. 解壓縮 ZIP，開啟本資料夾，在檔案總管網址列輸入 `cmd`。
3. 執行 `npm install`，接著 `npm start`。
4. 打開 http://localhost:3000 。兩個瀏覽器分頁可測試多人。

## 操作

- WASD 移動，Shift 加速，滑鼠拖曳旋轉攝影機，滾輪縮放。
- 房主開始比賽後，角色站在湖邊**面向湖心**（拋竿方向以角色面向方向為準）。
- **按住「拋竿」按鈕**蓄力，放開拋竿。蓄力越久距離越遠；必須讓浮標落在湖面。
- 等待魚咬鉤（約 2.5–6 秒），在 2.1 秒內按 **Space** 揚竿。
- **按住 R** 或畫面上的「按住收線」按鈕收線；放開讓張力下降。張力到 100% 會斷線，24 秒未完成魚會逃走。
- 釣到魚顯示魚種、稀有度、重量與分數。其他玩家可看到釣竿、魚線、浮標及咬鉤狀態。

## 更新 GitHub + Render

**先在本機測試，再更新公開站。** 將本資料夾內所有檔案與 `public/` 子目錄的內容，覆蓋上傳至**原本** GitHub `fishing-party-3d` 專案的相同路徑（不要上傳 ZIP 或 node_modules）。

Render → 原本 Web Service → Manual Deploy → Deploy latest commit。原有 Build Command `npm install`，Start Command `npm start`，無需新增 Render 服務或更換網址。

如果 GitHub 網頁無法覆蓋同名檔案，可使用 GitHub Desktop clone 儲存庫，將新版檔案複製覆蓋，再 commit/push。

## 設計限制

- 房間、分數存在伺服器記憶體；Render 服務重啟會清空。
- 此版釣魚動畫是簡單幾何模型，不是完整人物骨骼動畫。
- 3D 模型採 Three.js CDN，首次載入需要網路。
- 伺服器驗證魚種、得分、釣魚狀態、浮標位置；客戶端傳送蓄力與收線按壓狀態。
