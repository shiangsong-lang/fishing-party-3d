# Fishing Party 3D — 多人釣魚大賽

## Windows 啟動
1. 安裝 Node.js 18 或更新版本（建議 LTS）。
2. 在本專案資料夾開啟 PowerShell / Windows 終端機。
3. 執行 `npm install`。
4. 執行 `npm start`。
5. 在瀏覽器開啟 http://localhost:3000 。

## 多人連線
- 同一台電腦可以開兩個瀏覽器分頁測試。
- 同一個 Wi-Fi / 區域網路的朋友可使用 `http://主機的區域網路IP:3000` 連線（Windows 防火牆需允許連入 3000 埠）。
- 不同網路的朋友需要把此 Node.js 服務部署至可公開存取的主機；單純 localhost 無法跨網路連線。
- 需要連上網路才能從 CDN 載入 Three.js。

## 遊戲規則
房主建立房間後分享五碼房號，朋友加入。房主開始 180 秒比賽，所有玩家按「拋竿釣魚」等待 2.5～7 秒隨機釣到魚，依魚種獲得 10～500 分，分數最高者獲勝。

## 備註
第一版是簡易 3D 場景 + 即時多人房間與排行榜；釣魚採按鈕操作，尚未加入自由移動、魚線動畫、音效與資料庫存檔。所有房間與分數只存於伺服器記憶體，重啟會清除。

## 公開部署（Render）
1. 建立 GitHub repository，將 `fishing-party-3d` 資料夾**裡面**的 `server.js`、`package.json`、`public/`、`render.yaml` 等檔案放在 repository 根目錄。
2. 在 Render 選擇 New > Web Service，連結 GitHub repository。
3. 設定 Runtime: Node；Build Command: `npm install`；Start Command: `npm start`；Instance Type: Free（如可用）。
4. 部署成功後開啟 Render 顯示的 `https://...onrender.com` 網址。
5. 朋友使用相同網址與房號即可加入；不用下載遊戲。

注意：免費服務可能閒置休眠；重新部署或重啟會清除房間與分數。此版本只適合小型朋友測試，尚無登入驗證與永久排行榜。
