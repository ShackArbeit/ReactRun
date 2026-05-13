# Claude Code Prompt 07｜README + Interview Demo Script

## 任務目標

把專案整理成「面試官看得懂、你也能照著講」的版本。

這一階段很重要，因為 MVP 不只是要做出來，還要能在面試中清楚講出你的技術判斷。

---

## 可直接貼給 Claude Code 的 Prompt

```text
你是一位 Senior Frontend Engineer 與 Technical Interview Coach。請幫我把 RunPulse AI Dashboard 的 README 與面試講稿整理到可以直接用於線上面試的程度。

請重寫 README.md，包含以下章節：

1. Project Overview

說明這個 MVP 是什麼，以及為什麼適合前端工程師面試展示。

2. Why I Built This MVP for the JD

請對應以下 JD 重點：

- 使用 React + TypeScript 開發前端應用
- 維護並優化頁面效能
- 前端架構設計：模組化、狀態管理、資料流設計
- RESTful API 串接與後端協作
- 熟悉 Git flow
- 加分：Docker、Nginx、資料視覺化、前端架構規劃
- 善用 AI 工具

3. Tech Stack

列出：

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
- GitHub Actions
- GitHub Pages
- Docker
- Nginx

4. Architecture Overview

請說明：

- feature-based architecture
- app / features / shared / mocks 分層
- shared 不依賴 features
- UI component 不直接 fetch API
- API client 與 hooks 解耦

5. Folder Structure

用 tree 格式列出主要資料夾。

6. RESTful API Design

列出 endpoints：

- GET /api/summary
- GET /api/sessions
- GET /api/sessions/:id
- POST /api/sessions
- PATCH /api/sessions/:id
- DELETE /api/sessions/:id

請說明 MSW 的角色是模擬 API contract，而不是取代後端。

7. State Management Strategy

請說明：

- local state
- global UI state
- server state
- URL state
- TanStack Query 與 Zustand 的分工

8. Performance Optimization Strategy

請說明：

- Core Web Vitals: LCP / CLS / INP
- lazy loading
- memoized chart data
- avoiding unnecessary re-render
- query cache
- large list strategy
- 先測量再優化

9. Docker & CI/CD Strategy

請說明：

- GitHub Pages deploy static dist
- Docker multi-stage build
- Nginx serve dist
- GitHub Actions 檢查 lint / typecheck / test / build / docker build
- main branch deploy

10. How to Run Locally

請列出 commands。

11. How to Deploy to GitHub Pages

請列出操作步驟。

12. Interview Talking Points

請整理成條列：

- 1 分鐘 demo 開場
- 3 分鐘技術亮點
- 可能被問的問題
- 建議回答

請另外建立 docs/interview-script.md，包含：

1. 1 分鐘介紹

請用第一人稱寫：

「我針對這份 JD 做了一個小型 MVP...」

2. 3 分鐘技術亮點介紹

請分成：

- 架構
- API
- 狀態管理
- 效能
- CI/CD
- AI 工具使用方式

3. 常見追問與回答

請包含：

Q1：這只是 mock API，不是真的後端，怎麼證明你會串 API？
Q2：Docker 沒有真的部署，有意義嗎？
Q3：為什麼不用 Redux？
Q4：你怎麼做頁面效能優化？
Q5：你如何使用 Claude Code / Codex？
Q6：如果進公司後既有專案架構很亂，你會怎麼改善？
Q7：你跟後端 API schema 意見不同時怎麼處理？

4. 最後請建立 docs/jd-mapping.md

用表格對應：

JD requirement | MVP implementation | Interview explanation
```

---

## 驗收標準

完成後你應該有：

- README.md
- docs/interview-script.md
- docs/jd-mapping.md
- docs/performance-notes.md
- docs/ci-cd-notes.md

而且這些文件可以直接幫你準備面試。
