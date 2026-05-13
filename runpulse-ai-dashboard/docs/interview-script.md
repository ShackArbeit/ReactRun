# Interview Script｜面試講稿

## 1 分鐘介紹

> 我針對這份 JD 做了一個小型 MVP，主題是 RunPulse AI Dashboard，一個 AI 跑者訓練分析儀表板。  
> 我用 React + TypeScript + Vite 做前端，搭配 TanStack Query 管 server state、Zustand 管 global UI state、MSW 模擬 RESTful API。  
> 整個專案刻意對應 JD 的幾個核心要求：前端架構設計、效能優化、API 串接、Docker + GitHub Actions CI/CD，以及善用 AI 工具。  
> 我用 Claude Code 加速開發，但架構決策、資料流設計和驗收條件都是我自己定義的。

---

## 3 分鐘技術亮點

### 架構
採用 feature-based architecture，分成 `app/`、`features/`、`shared/`、`mocks/`。  
`shared` 不依賴 `features`，`features` 可以依賴 `shared`，這樣可以防止 circular dependency，也讓各 feature 可以獨立維護。

### API
用 MSW 在 browser 攔截 fetch，模擬真實 RESTful API（GET/POST/PATCH/DELETE）。  
UI component 不直接 fetch URL，所有 request 都經過 `shared/api/httpClient.ts`，再透過 `shared/api/endpoints.ts` 提供 typed API functions。  
這樣的好處是切換成真實後端只需要改 `endpoints.ts`，不用動 component。

### 狀態管理
- Server state：TanStack Query，負責 fetch、cache、retry、loading/error state
- Global UI state：Zustand，負責 theme、filter、compact mode 等純 UI 狀態
- Component state：useState，只在 component 內用
- 不把 server state 塞進 Zustand，不用 Redux，因為 TanStack Query 已經解決大部分 server state 問題

### 效能
- Route-level code splitting：`React.lazy` + `Suspense`
- Memoized chart data：`useMemo` 避免 ECharts option 每次 render 重建
- Optimistic update：delete session 時立刻從 UI 移除，失敗時 rollback
- Skeleton loading：避免 CLS（Cumulative Layout Shift）
- Pagination：sessions > 10 筆時分頁，production 可換成 TanStack Virtual

### CI/CD
GitHub Actions：push/PR 自動跑 lint、typecheck、test、build、docker build check。  
push main 後自動部署 dist 到 GitHub Pages。  
Docker 是 multi-stage build（Node build → Nginx serve），用來驗證 production build，不是部署到 GitHub Pages。

### AI 工具使用方式
我用 Claude Code 幫我快速生成 boilerplate、API handler、component 架構，但每個生成結果我都會 review，確認符合架構原則和 TypeScript type safety。這讓我可以在 3 天內做出可展示的 MVP，但不犧牲架構品質。

---

## 常見追問與回答

**Q1：這只是 mock API，不是真的後端，怎麼證明你會串 API？**  
A：Mock API 不是「假裝會後端」，而是前後端分離開發的標準做法。MSW 讓我定義 API contract（endpoint、request schema、response schema），這正是前端與後端協作的介面。切換成真實後端只需要把 MSW worker 關掉，`endpoints.ts` 的 URL 改成真實 server 就好，component 完全不用動。

**Q2：Docker 沒有真的部署，有意義嗎？**  
A：有。Docker 的角色是驗證「Vite build 出來的 dist 可以被 Nginx 正確 serve」，包含 SPA routing fallback、cache header、gzip。如果這個產品要部署到 AWS ECS 或 GCP Cloud Run，這個 Docker image 可以直接用。我刻意說清楚 Docker 在這個 MVP 的角色邊界。

**Q3：為什麼不用 Redux？**  
A：TanStack Query 已經解決 server state 的 fetch、cache、sync 問題，Zustand 夠用來管 UI state。Redux 的複雜度（action/reducer/selector）在這個規模的應用沒有必要，而且 React ecosystem 近年已有更輕量的替代方案。如果需要 time-travel debugging 或複雜的 state machine，我才會考慮 Redux Toolkit。

**Q4：你怎麼做頁面效能優化？**  
A：先測量再優化。用 React Profiler 找 unnecessary re-render，用 Chrome DevTools 看 Core Web Vitals（LCP/CLS/INP）。在這個 MVP 我做了：route-level code splitting（React.lazy）、memoized chart data（useMemo）、Skeleton loading 避免 CLS、optimistic update 讓 mutation 感覺即時、query cache 避免重複 fetch。

**Q5：你如何使用 Claude Code / Codex？**  
A：Claude Code 幫我生成 boilerplate 和 API handler，但架構決策（分層、資料流、type 設計）是我自己定義的。每個生成結果我都會 review，確認符合原則。用 AI 工具不是讓 AI 替我思考，而是讓我把時間花在真正的技術判斷上。

**Q6：如果進公司後既有專案架構很亂，你會怎麼改善？**  
A：先理解再動手。讀 git history、問同事為什麼這樣設計，可能有歷史背景。然後識別最痛的問題點（比如 circular dependency、邏輯散落各處），用 incremental refactoring 逐步改善，每次改動都要有測試覆蓋，不做大爆炸式 rewrite。

**Q7：你跟後端 API schema 意見不同時怎麼處理？**  
A：先理解後端的 constraint，可能是 DB schema 或 performance 考量。然後提出具體的替代方案（帶上前端的 UX 需求），用資料說話。如果有分歧，找雙方都接受的 contract，透過 API versioning 或 BFF layer 解決。避免直接說「你的設計不好」。
