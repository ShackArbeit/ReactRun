# RunPulse AI Dashboard

**AI 跑者訓練分析儀表板** — 為前端工程師面試準備的 MVP，對應「前端工程師【AI 賦能研發工程師】」職缺。

---

## Project Overview

RunPulse AI Dashboard 是一個深色科技風格的跑步訓練儀表板，展示跑者的訓練摘要、趨勢圖表、session 管理，以及 AI 教練建議。雖然是靜態網頁，但透過 MSW 模擬 RESTful API，完整展示前端 API 串接流程。

---

## Why I Built This MVP for the JD

| JD Requirement | Implementation |
|---|---|
| React + TypeScript | 全 TypeScript，no `any`，strict mode |
| 優化頁面效能 | React.lazy、useMemo、Skeleton、TanStack Query cache |
| 模組化、狀態管理、資料流 | Feature-based arch、TanStack Query + Zustand |
| RESTful API 串接 | MSW 6 endpoints、typed API client |
| 熟悉 Git flow | GitHub Actions CI/CD on PR + main |
| Docker + Nginx | Multi-stage build，SPA fallback |
| 資料視覺化 | ECharts dual-axis chart |
| 善用 AI 工具 | Claude Code 加速開發，架構由人決定 |

---

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — utility-first, dark theme
- **React Router v7** — SPA routing
- **TanStack Query v5** — server state, cache, mutations
- **Zustand v5** — global UI state
- **MSW v2** — mock REST API in browser/Node
- **ECharts v5** — training trend chart
- **Vitest** + **Testing Library** — unit tests
- **GitHub Actions** — CI/CD
- **GitHub Pages** — static hosting
- **Docker + Nginx** — production build verification

---

## Architecture Overview

```
feature-based architecture

src/
  app/          → router, providers, layout
  features/     → dashboard, sessions (each owns pages, components, hooks, types)
  shared/       → api client, UI components, store, utils
  mocks/        → MSW handlers, mock data, browser worker
  tests/        → setup, test utilities
```

**Dependency rule**
- `shared` → no dependency on `features`
- `features` → can import from `shared`
- `components` → never fetch URLs directly

**Data flow**
```
UI → hook (TanStack Query) → API client → MSW → response → Query cache → UI
```

---

## Folder Structure

```
src/
├── app/
│   ├── App.tsx
│   ├── AppLayout.tsx
│   ├── providers.tsx
│   └── router.tsx
├── features/
│   ├── dashboard/
│   │   ├── components/   SummaryCards, TrainingTrendChart, SessionFilter, SessionTable,
│   │   │                 PerformancePanel, AiSuggestionCard, WeeklyLoadIndicator
│   │   ├── hooks/        useSummaryQuery
│   │   ├── pages/        DashboardPage
│   │   └── types.ts
│   └── sessions/
│       ├── hooks/        useSessionsQuery (+ mutations)
│       ├── pages/        SessionDetailPage
│       └── types.ts
├── shared/
│   ├── api/              httpClient, endpoints, apiError
│   ├── components/       Card, Button, Skeleton, ErrorState, EmptyState
│   └── store/            uiStore (Zustand)
├── mocks/
│   ├── browser.ts        MSW browser worker
│   ├── handlers.ts       REST endpoint handlers
│   └── data.ts           mock data
└── tests/
    ├── setup.ts
    ├── msw-server.ts
    └── endpoints.test.ts
```

---

## RESTful API Design

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/summary` | Training summary + AI suggestion |
| GET | `/api/sessions?week=&type=&keyword=&sort=` | Filtered session list |
| GET | `/api/sessions/:id` | Session detail |
| POST | `/api/sessions` | Create session |
| PATCH | `/api/sessions/:id` | Update session |
| DELETE | `/api/sessions/:id` | Delete session |

**MSW 的角色**：模擬 API contract，讓前端可以在無後端環境下開發和測試。切換成真實後端只需修改 `src/shared/api/endpoints.ts` 的 URL，component 和 hooks 不用改動。

**為什麼 component 不直接 fetch**：UI component 只負責渲染，不負責 HTTP 細節。隔離讓 component 更容易測試、更容易換 API layer。

---

## State Management Strategy

| Type | Tool | What it manages |
|------|------|----------------|
| Server state | TanStack Query | API data, loading, error, cache, retry |
| Global UI state | Zustand | theme, filter, compact mode |
| Component state | useState | local form inputs, local toggles |
| URL state | Query string | 可分享的 filter（可擴充）|

**為什麼不用單一 global store**：Server state 和 UI state 的生命週期完全不同。把兩者混在一起會讓 store 越來越複雜，也讓 server data 的 freshness 難以管理。

---

## Performance Optimization Strategy

**先測量，再優化** — React Profiler + Chrome DevTools Performance

**Core Web Vitals**
- **LCP (< 2.5s)**：route-level code splitting，Skeleton 避免 layout block
- **CLS (< 0.1)**：Skeleton placeholder 讓 layout 在資料載入前後保持穩定
- **INP (< 200ms)**：useCallback 穩定 event handler

**React Rendering**
- `React.memo`：用於渲染成本高且 props 穩定的 component
- `useMemo`：用於 ECharts option 建立
- `useCallback`：用於傳給 memoized child 的 callback

**Code Splitting**：`React.lazy` + `Suspense`，route-level

**Large List**：目前 pagination（每頁 10 筆），production 可換 TanStack Virtual

---

## Docker & CI/CD Strategy

**GitHub Pages** 部署 Vite build 的 static `dist/`，MSW 在 browser 模擬 API，不需要後端。

**Docker** 驗證 production build 可以被 Nginx 正確 serve（SPA routing fallback、gzip、cache headers）。

**GitHub Actions** 流程：
```
push/PR → lint → typecheck → test → build → docker build check → (main only) deploy
```

---

## How to Run Locally

```bash
npm install
npm run dev        # dev server with MSW
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run test       # Vitest
npm run build      # production build
npm run preview    # preview production build
```

---

## How to Deploy to GitHub Pages

1. 設定 `vite.config.ts`：`base: '/your-repo-name/'`
2. GitHub repository → Settings → Pages → Source: **GitHub Actions**
3. Push to `main`

---

## Docker Commands

```bash
docker build -t runpulse-ai-dashboard .
docker run -p 8080:80 runpulse-ai-dashboard
# → http://localhost:8080
```

---

## Interview Talking Points

請參考 `docs/interview-script.md` 和 `docs/jd-mapping.md`
