# RunPulse AI Dashboard｜面試 MVP Prompt 檔案索引

這包 prompt 是為了協助你在三天內完成一個可展示的前端 MVP，用於準備「前端工程師 Frontend Engineer【AI 賦能研發工程師】」線上面試。

## MVP 主題

**RunPulse AI Dashboard｜AI 跑者訓練分析儀表板**

這個 MVP 會刻意展示以下 JD 需求：

1. 優化頁面效能
2. 模組化、狀態管理、資料流設計
3. RESTful API 串接
4. 前端架構規劃
5. Docker 與 CI/CD
6. 善用 AI 工具：Claude Code 開發 + Codex 審查

---

## 使用順序

### Claude Code 開發階段

請依照以下順序逐步丟給 Claude Code：

1. `claude-code/01_project_bootstrap.md`
2. `claude-code/02_mock_rest_api_and_api_client.md`
3. `claude-code/03_state_management_and_data_flow.md`
4. `claude-code/04_dashboard_ui_and_charts.md`
5. `claude-code/05_performance_optimization_demo.md`
6. `claude-code/06_docker_github_actions_pages.md`
7. `claude-code/07_readme_and_interview_script.md`

### Codex 審查階段

Claude Code 完成後，請依序使用以下 prompt 讓 Codex 做檢查：

1. `codex-review/01_architecture_review.md`
2. `codex-review/02_performance_review.md`
3. `codex-review/03_ci_cd_review.md`
4. `codex-review/04_final_interview_audit.md`

---

## 三天實作建議

### Day 1

完成：

- 專案初始化
- 架構分層
- Mock REST API
- API client
- Dashboard 初版畫面

對應 prompt：

- `01_project_bootstrap.md`
- `02_mock_rest_api_and_api_client.md`

### Day 2

完成：

- TanStack Query
- Zustand
- ECharts
- Filter / sort / search
- 效能優化 demo

對應 prompt：

- `03_state_management_and_data_flow.md`
- `04_dashboard_ui_and_charts.md`
- `05_performance_optimization_demo.md`

### Day 3

完成：

- Dockerfile
- GitHub Actions
- GitHub Pages
- README
- 面試 demo script
- Codex review

對應 prompt：

- `06_docker_github_actions_pages.md`
- `07_readme_and_interview_script.md`
- 全部 `codex-review/` prompts

---

## 面試展示主軸

面試時請用這個角度介紹：

> 我針對這份 JD 做了一個小型 MVP，主題是 RunPulse AI Dashboard。它是一個 React + TypeScript 靜態儀表板，刻意展示效能優化、模組化架構、狀態管理、RESTful API 串接，以及 Docker + GitHub Actions + GitHub Pages 的 CI/CD 流程。  
> 我使用 Claude Code 協助開發，但由我定義架構、資料流與驗收條件；完成後再用 Codex 做架構、效能與 CI/CD 審查。

---

## 技術棧

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

---

## 注意事項

這個 MVP 是靜態網頁，但會透過 MSW 模擬 RESTful API，所以可以展示真實 API 串接流程。

GitHub Pages 只部署 `dist` 靜態檔。Docker 的角色是驗證 production build 可以被 Nginx serve，不是用來部署到 GitHub Pages。
