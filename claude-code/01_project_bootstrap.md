# Claude Code Prompt 01｜Project Bootstrap + Feature-based Architecture

## 任務目標

請 Claude Code 建立 RunPulse AI Dashboard 的專案骨架，重點是：

- React + TypeScript + Vite
- Feature-based architecture
- Tailwind 深色質感 UI
- 可擴充的資料夾結構
- 為後續 REST API、狀態管理、效能優化、CI/CD 預留位置

---

## 可直接貼給 Claude Code 的 Prompt

```text
你是一位 Senior Frontend Engineer。請幫我建立一個 React + TypeScript + Vite 的 MVP 專案，主題是：

RunPulse AI Dashboard｜AI 跑者訓練分析儀表板

這個 MVP 是為了準備前端工程師面試，必須展示以下 JD 能力：

1. 優化頁面效能
2. 模組化、狀態管理、資料流設計
3. RESTful API 串接
4. 前端架構規劃
5. Docker & CI/CD
6. 善用 AI 工具輔助開發

請使用以下技術：

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Zustand
- MSW
- ECharts
- Vitest
- ESLint

請採用 feature-based architecture，不要把所有元件都平鋪在 components 資料夾。

請建立以下資料夾結構：

src/
  app/
    App.tsx
    router.tsx
    providers.tsx

  features/
    dashboard/
      pages/
      components/
      hooks/
      types.ts

    sessions/
      pages/
      components/
      hooks/
      types.ts

  shared/
    api/
    components/
    store/
    utils/

  mocks/
    browser.ts
    handlers.ts
    data.ts

  tests/

請先完成以下項目：

1. 建立 Vite + React + TypeScript 專案設定
2. 設定 Tailwind CSS
3. 建立 React Router 基本路由
4. 建立 app/providers.tsx，預留 QueryClientProvider 與其他 provider
5. 建立 DashboardPage 初版
6. 建立共用 UI 元件：
   - Card
   - Button
   - Skeleton
   - ErrorState
   - EmptyState
7. 建立深色科技感 dashboard layout：
   - gradient background
   - glassmorphism card
   - responsive grid
   - top header
8. 建立 README 初版，說明此專案為何對應前端工程師 JD

限制條件：

- 請使用 TypeScript，不要使用 any，除非有清楚理由
- 請把 component 拆小，不要把所有內容塞在 App.tsx 或 DashboardPage.tsx
- shared 不可以依賴 features
- features 可以依賴 shared
- 請在 README 補上 folder structure 說明
```

---

## 驗收標準

完成後你應該看到：

- 專案可以 `npm run dev`
- 首頁有質感 dashboard 雛形
- `src/app`、`src/features`、`src/shared` 結構清楚
- README 有說明專案目標與架構
- 沒有所有邏輯塞在單一檔案
