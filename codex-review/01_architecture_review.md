# Codex Review Prompt 01｜Architecture Review

## 任務目標

讓 Codex 以 Senior Frontend Architect 角度檢查整個專案架構，尤其是：

- feature-based architecture 是否清楚
- shared / features 依賴是否乾淨
- component 是否過大
- API client 是否與 UI 解耦
- TypeScript 是否健康
- 是否過度工程化

---

## 可直接貼給 Codex 的 Prompt

```text
請你以 Senior Frontend Architect 的角度審查這個 React + TypeScript + Vite 專案。

專案背景：

這是一個為前端工程師面試準備的 MVP，主題是 RunPulse AI Dashboard。  
目標是展示：

1. 優化頁面效能
2. 模組化、狀態管理、資料流設計
3. RESTful API 串接
4. 前端架構規劃
5. Docker & CI/CD
6. 使用 Claude Code 開發，並用 Codex 做審查

請檢查以下項目：

1. Feature-based architecture 是否清楚

請檢查：

- src/app 是否只放 app-level setup
- src/features 是否依照功能切分
- src/shared 是否只放跨功能共用資源
- shared 是否錯誤依賴 features
- features 之間是否有過度耦合

2. Component structure

請檢查：

- DashboardPage 是否過大
- component 是否有明確職責
- container / presentational component 是否有適度分離
- props type 是否清楚
- 是否有重複 UI pattern 可以抽成 shared component

3. API layer

請檢查：

- component 是否直接 fetch API
- API client 是否集中管理 request / response / error
- endpoints 是否集中管理
- 是否容易從 MSW 切換到真實後端
- error schema 是否一致

4. State management

請檢查：

- TanStack Query 是否只處理 server state
- Zustand 是否只處理 global UI state
- 是否把 server state 錯誤塞進 Zustand
- local state 是否被過度提升
- URL state 是否處理合理

5. TypeScript quality

請檢查：

- 是否有 any 濫用
- 是否有不必要的 type assertion
- request / response type 是否清楚
- component props 是否清楚
- 是否有重複 type 可以整理

6. Maintainability

請檢查：

- 命名是否清楚
- folder structure 是否可擴充
- 是否過度工程化
- 是否有 hidden coupling
- README 是否正確反映架構

請輸出格式：

# Architecture Review

## Overall Verdict

請給一句總評，分數 1-10。

## Must Fix

列出必須修正的問題，請包含：

- 問題
- 影響
- 建議修改方式
- 如可行，提供 code patch

## Should Improve

列出建議改善的問題。

## Nice to Have

列出可以加分但非必要的項目。

## Interview Strengths

請指出這個專案在面試中可以強調的架構亮點。

## Interview Risks

請指出面試官可能質疑的地方，以及我該如何回答。

## Suggested Patch

如果有需要修改的地方，請提供可直接套用的 patch 或具體檔案修改建議。
```

---

## 驗收標準

Codex 回覆後，你要確認：

- 有指出具體檔案
- 有附檔案路徑與行號
- 不是只講抽象建議
- 有分 Must Fix / Should Improve / Nice to Have
- 有幫你整理面試可強調點
