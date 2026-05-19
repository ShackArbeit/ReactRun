# 3 分鐘口語版面試說明

我這個專案的重點，不只是把跑步資料畫出來，而是把「前端怎麼模擬一個像 LLM API 的資料流」跟「前端怎麼做效能優化」一起做完整。

我先從資料流開始設計。前端不是直接寫死假資料，而是統一走 API layer。像 [`src/shared/api/httpClient.ts`](./src/shared/api/httpClient.ts) 負責包 `fetch` 和錯誤處理，[`src/shared/api/endpoints.ts`](./src/shared/api/endpoints.ts) 則把 `/api/summary`、`/api/sessions` 這些 endpoint 集中管理。這樣 UI 完全不用知道底層是 mock 還是真實後端，未來如果換成真的 LLM API，只要改這一層就好。

接著我用 MSW 來模擬 API。`src/main.tsx` 會先啟動 mock worker，再 render React；`src/mocks/browser.ts` 是 worker 的入口；`src/mocks/handlers.ts` 則定義所有 REST API，包含 summary、sessions、CRUD，而且我有刻意加延遲，去模擬 LLM inference 會有的等待時間。這樣我在前端就可以真的測 loading state、skeleton、spinner，確認使用者體感是不是順的。測試環境也共用同一套 handler，像 [`src/tests/msw-server.ts`](./src/tests/msw-server.ts) 和 [`src/tests/setup.ts`](./src/tests/setup.ts) 就是在測試時把同一個 API contract 接起來。

在效能上，我主要做了幾件事。第一個是 React Query。[`src/app/providers.tsx`](./src/app/providers.tsx) 建好 QueryClient，[`src/features/dashboard/hooks/useSummaryQuery.ts`](./src/features/dashboard/hooks/useSummaryQuery.ts) 和 [`src/features/sessions/hooks/useSessionsQuery.ts`](./src/features/sessions/hooks/useSessionsQuery.ts) 負責 server state，像快取、重抓、optimistic update 都交給它處理。這樣我刪除或更新資料時，畫面可以先立刻反應，不用等 API 回來才變。

第二個是列表虛擬化。大量 sessions 是用 [`src/features/dashboard/components/SessionTable.tsx`](./src/features/dashboard/components/SessionTable.tsx) 的 `react-window` 來 render，這樣不是一次畫幾千列，而是只畫視窗內看得到的列。我還加了 `useIsScrolling`、逐批載入、loading placeholder、底部 spinner，讓使用者在捲動時會覺得資料是「正在持續補進來」，不是卡住。

第三個是路由和 bundle 拆分。[`src/app/router.tsx`](./src/app/router.tsx) 用 `React.lazy()` 和 `Suspense` 做 route-level code splitting，首屏不會一次把所有頁面都載入；[`vite.config.ts`](./vite.config.ts) 也用 `manualChunks` 把 React、TanStack Query、ECharts 拆開，避免主 bundle 太大。圖表本身則是 [`src/features/dashboard/components/TrainingTrendChart.tsx`](./src/features/dashboard/components/TrainingTrendChart.tsx) 用 `echarts/core` 和按需註冊模組，不是整包 ECharts 全載。

最後 UI state 我是用 Zustand。[`src/shared/store/uiStore.ts`](./src/shared/store/uiStore.ts) 管 theme、filter 這類跨頁但不屬於 server state 的資料，這樣跟 React Query 分工清楚，不會混在一起。

如果我要濃縮成一句話，我會說：這個專案不是單純做 dashboard，而是把 mock LLM API、server state 快取、列表虛擬化、路由分割、bundle 拆分這些前端效能策略整合在一起，讓使用者即使面對大量資料和延遲回應，畫面還是能保持順、穩、可預期。
