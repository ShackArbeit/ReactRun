# CI/CD Notes｜面試複習

## 1 分鐘回答

> 我用 GitHub Actions 做 CI/CD。PR 時自動跑 lint、typecheck、test、build 和 docker build check。push 到 main 後自動部署靜態 dist 到 GitHub Pages。Docker 我用 multi-stage build，但它的角色是驗證 production build 可以被 Nginx 正常 serve，不是部署到 GitHub Pages。

---

## 3 分鐘回答

**CI 流程 (PR & push)**
1. `npm ci` — 乾淨安裝，確保 lock file 一致
2. `npm run lint` — ESLint 確保 code style
3. `npm run typecheck` — TypeScript 靜態型別檢查
4. `npm run test -- --run` — Vitest 單元測試
5. `npm run build` — Vite 生產 build
6. `docker build` — 驗證 Docker image 可以成功建立

**CD 流程 (main only)**
7. Upload dist 到 GitHub Pages artifact
8. Deploy 到 GitHub Pages

**為什麼 GitHub Pages 部署 static dist？**
GitHub Pages 只支援靜態網頁。Vite build 出來的 dist 就是 HTML/CSS/JS，MSW 在 browser 攔截 fetch 模擬 API，不需要真實後端。

**Docker 的角色**
Docker 不是用來部署到 GitHub Pages，而是讓我在本機驗證「Nginx serve dist 會不會有問題」，例如 SPA routing 的 fallback 是否正確設定。面試時可以示範：
```bash
docker build -t runpulse-ai-dashboard .
docker run -p 8080:80 runpulse-ai-dashboard
# → open http://localhost:8080
```

**CI/CD 如何提升前端品質**
- 防止 type error 進 main
- 防止 lint violation 進 main
- 防止 build 失敗的 PR merge
- 確保每次 commit 都是可部署狀態

---

## 如果被問「Docker 沒有真的部署」

> 對。這個 MVP 的部署目標是 GitHub Pages，所以 Docker 的角色是 production build 驗證工具，不是部署基礎設施。如果這個產品要上真實伺服器（比如 AWS ECS 或 GCP Cloud Run），Docker image 就可以直接用。這裡我刻意說清楚 Docker 的角色邊界，因為混淆 CI 驗證和部署目標是常見的架構誤解。

---

## 如果被問「為什麼不用雲端主機」

> 因為這個 MVP 是靜態網頁，GitHub Pages 完全夠用，不需要付費的雲端主機。如果功能需要真實後端（比如 auth、DB、SSE），我會選 Railway、Render 或 AWS ECS + Fargate。選雲端服務的決策應該根據產品需求，而不是因為「看起來更專業」。
