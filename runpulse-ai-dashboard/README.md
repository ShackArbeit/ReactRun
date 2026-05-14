# RunPulse AI Dashboard

RunPulse AI Dashboard 是一個以 React + TypeScript + Vite 製作的跑步訓練儀表板 MVP。

## 特色

- 訓練摘要與趨勢圖
- 可篩選、搜尋、排序的訓練紀錄列表
- 訓練明細頁
- MSW 模擬 REST API
- Zustand 全域狀態管理
- TanStack Query 資料快取
- ECharts 圖表
- 淡色 / 深色主題切換

## 技術棧

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- TanStack Query
- Zustand
- MSW
- ECharts
- Vitest

## 開發

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

## API

- `GET /api/summary`
- `GET /api/sessions`
- `GET /api/sessions/:id`
- `POST /api/sessions`
- `PATCH /api/sessions/:id`
- `DELETE /api/sessions/:id`
