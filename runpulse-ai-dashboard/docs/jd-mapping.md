# JD Mapping

| JD Requirement | MVP Implementation | Interview Explanation |
|---|---|---|
| 使用 React + TypeScript 開發前端應用 | React 19 + TypeScript，strict mode，no `any` | 整個 codebase 用 TypeScript，props/response/store 都有明確 type |
| 維護並優化頁面效能 | React.lazy、useMemo、useCallback、Skeleton、pagination | 先測量（React Profiler/DevTools），再針對 LCP/CLS/INP 優化 |
| 前端架構設計：模組化、狀態管理、資料流 | Feature-based architecture、TanStack Query、Zustand | shared 不依賴 features，server state 與 UI state 明確分工 |
| RESTful API 串接與後端協作 | MSW 模擬 6 個 REST endpoints，typed API client | API contract 先行，切換真實後端只改 endpoints.ts |
| 熟悉 Git flow | GitHub Actions CI on PR/push | PR 時自動驗證，main merge 後自動部署 |
| 加分：資料視覺化 | ECharts dual-axis chart（distance bar + load line） | useMemo 避免 option 重建，ResizeObserver 做 responsive resize |
| 加分：前端架構規劃 | Feature-based arch、dependency rule、state分層 | 面試時可以畫出資料流：UI → hook → API client → MSW → cache → UI |
| 善用 AI 工具 | Claude Code 加速開發，架構決策由自己定義 | AI 工具提升效率，不替代技術判斷 |
