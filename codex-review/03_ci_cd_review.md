# Codex Review Prompt 03｜Docker + CI/CD Review

## 任務目標

讓 Codex 從 DevOps-minded Frontend Engineer 角度檢查：

- Dockerfile 是否合理
- GitHub Actions 是否正確
- GitHub Pages deploy 是否可行
- workflow permissions 是否適當
- 面試時是否講得通

---

## 可直接貼給 Codex 的 Prompt

```text
請你以 DevOps-minded Frontend Engineer 的角度審查此專案的 Dockerfile、GitHub Actions 與 GitHub Pages 部署設定。

專案背景：

這是一個 Vite + React + TypeScript 靜態 MVP，最後要部署到 GitHub Pages。  
Docker 不用來部署到 GitHub Pages，而是用來驗證 production build 能被 Nginx serve。  
GitHub Actions 需要負責：

1. lint
2. typecheck
3. test
4. build
5. docker build check
6. deploy dist to GitHub Pages

請檢查以下項目：

1. Dockerfile

請檢查：

- 是否使用 multi-stage build
- builder stage 是否合理
- runtime stage 是否只包含 dist 與 nginx
- 是否有不必要檔案進 image
- 是否需要 nginx config
- EXPOSE 與 CMD 是否正確
- 是否支援本機 docker run 測試

2. .dockerignore

請檢查是否排除：

- node_modules
- dist
- .git
- .github
- coverage
- .env
- npm-debug.log
- local cache

3. GitHub Actions

請檢查：

- on push / pull_request 是否合理
- setup-node 是否設定 node version
- npm cache 是否設定
- npm ci 是否正確
- lint / typecheck / test / build 是否都會跑
- docker build check 是否位置合理
- deploy 是否只在 main branch
- permissions 是否足夠但不過度
- 是否使用官方 Pages actions
- artifact path 是否為 ./dist

4. GitHub Pages + Vite

請檢查：

- vite.config.ts 的 base 是否需要調整
- 如果 repo 不是 username.github.io，是否需要 base: '/repo-name/'
- README 是否有寫清楚
- 是否有 SPA route refresh 404 問題
- 如果有 React Router，是否需要 HashRouter 或 fallback 策略

5. 面試說法

請檢查 README / docs 是否說清楚：

- GitHub Pages 部署 static dist
- Docker 是 production serve verification
- CI/CD 如何提升品質
- 為什麼這樣設計符合小型 MVP 成本限制

請輸出格式：

# Docker and CI/CD Review

## Overall Verdict

請給一句總評，分數 1-10。

## Must Fix

列出必須修正項目，包含：

- 問題
- 影響
- 修改建議
- code patch

## Should Improve

列出建議改善項目。

## Security and Maintainability Notes

請檢查是否有安全性或維護性問題。

## Corrected Dockerfile

如果需要，請提供完整修正版 Dockerfile。

## Corrected GitHub Actions Workflow

如果需要，請提供完整修正版 ci-deploy.yml。

## Interview Explanation

請幫我整理面試時如何解釋這套 CI/CD 流程。
```

---

## 驗收標準

Codex 回覆後，你要確認：

- 有檢查 Vite base path
- 有檢查 GitHub Pages + React Router 問題
- 有檢查 Docker multi-stage
- 有完整修正版 YAML / Dockerfile，若需要
