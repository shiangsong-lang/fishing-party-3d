# Fishing Party 3D v2.2 — 多人湖畔釣魚

## 功能
保留 v2.1 的 WASD 角色移動、第三人稱鏡頭、Socket.IO 多人同步、房間、三分鐘比賽、蓄力拋竿、浮標、魚咬鉤、Space 揚竿、R 收線和排行榜。

新增：三種場景色彩主題（森林湖泊、海邊碼頭、神秘島嶼）；每張地圖十種魚，共 30 種；金幣、背包、圖鑑、釣竿購買和裝備；45 秒多人合作巨魚事件；PostgreSQL 持久化玩家資料。

## 本機啟動
1. 安裝 Node.js 22 LTS 或更新版本。
2. 在專案資料夾開 CMD，執行 `npm install`，接著 `npm start`。
3. 開啟 http://localhost:3000 。
4. 本機未設定 `DATABASE_URL` 時，資料會儲存於 `local-profiles.json`，只適合本機開發。

## Render 部署（重要）
1. **先建立外部 PostgreSQL 資料庫**（例如 Neon 的免費 PostgreSQL 方案，依服務商當前限制）。
2. 複製資料庫提供的完整 PostgreSQL connection string，格式為 `postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require`。**不要貼到 GitHub 或公開聊天室。**
3. Render Dashboard → 你的 `fishing-party-3d` Web Service → Environment → Add Environment Variable：Key `DATABASE_URL`，Value 貼上連線字串；儲存並重新部署。
4. 更新 GitHub 的 `server.js`、`package.json`、`public/`、`README.md`、`.gitignore` 等檔案。不要上傳 `node_modules`、`.env` 或 `local-profiles.json`。
5. Render → Manual Deploy → Deploy latest commit；保留 `npm install` 和 `npm start`，Root Directory 仍應指向包含 package.json 的目錄。
6. 等待 Live，再以 Ctrl+Shift+R 重新整理原網址 https://fishing-party-3d.onrender.com/ 。

**務必先設定 DATABASE_URL 再上線。** Render 免費服務的本機檔案系統不保證持久，不能用來保存玩家進度。PostgreSQL 服務的免費方案可能有休眠、容量及到期限制，請查看提供者條款並定期備份。

## 身分與資料安全
此版本以瀏覽器 localStorage 中的隨機密鑰識別玩家，伺服器只保存密鑰 SHA-256 雜湊，不依暱稱識別。使用同一瀏覽器重新進入可保留進度；清除網站資料、換瀏覽器、無痕模式或換裝置，將無法自動找回原進度。這是測試版身份系統，不是完整帳號登入系統。請不要將瀏覽器密鑰傳給別人。

## 操作與測試
- WASD 移動、Shift 快跑、滑鼠拖曳轉鏡頭。
- 房主在大廳選地圖後開始比賽；所有玩家應看到相同的地圖配色。
- 湖邊按住拋竿蓄力、放開拋竿；咬鉤後 Space 揚竿；按住 R 收線，放開降低張力。
- 成功釣魚後檢查背包、圖鑑和分數；點「賣出背包全部魚」獲得金幣，再買釣竿並裝備。
- 房主在比賽中按「房主召喚巨魚」，多人按「協力拉魚」，參與擊敗者獲得傳說魚和分數。
- **持久化測試**：賣魚獲得金幣、購買釣竿後，關閉瀏覽器再開同一網站，應保留金幣、釣竿、圖鑑；重新部署 Render 後再驗證一次。

## 已知限制
- 地圖是共用湖畔場景的三種視覺主題，尚非三張獨立 3D 地形模型。
- 合作巨魚目前使用 UI 協力按鈕，尚未製作 3D 巨魚模型與動畫。
- 玩家資料以單一瀏覽器密鑰識別，尚無跨裝置帳號綁定。
- 背包最多保留最近 150 條魚；魚類圖鑑持續累計。
- 沒有經過完整多人實機負載測試，請先在本機測試再部署公開網站。
