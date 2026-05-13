# Claude Code Prompt 06｜Docker + GitHub Actions + GitHub Pages

## 任務目標

建立 Docker 與 CI/CD 流程。

重點要能在面試中說清楚：

- GitHub Pages 部署的是 Vite build 後的 static dist
- Docker 不是拿來部署到 GitHub Pages
- Docker 是用來驗證 production build 能被 Nginx serve
- GitHub Actions 負責 lint / typecheck / test / build / docker build check / deploy

---

## 可直接貼給 Claude Code 的 Prompt

```text
你是一位 DevOps-minded Frontend Engineer。請幫我為 RunPulse AI Dashboard 加入 Docker 與 GitHub Actions CI/CD。

請建立 Dockerfile：

要求：

1. 使用 multi-stage build
2. 第一階段使用 Node image build Vite app
3. 第二階段使用 nginx image serve dist
4. production image 只包含 dist 與 Nginx 需要的檔案
5. expose 80
6. 可以用 docker build 與 docker run 本機驗證

請建立 .dockerignore：

至少排除：

- node_modules
- dist
- .git
- .github
- coverage
- .env
- npm-debug.log

請建立 .github/workflows/ci-deploy.yml：

流程要求：

1. on push main
2. on pull_request main
3. checkout
4. setup node
5. npm ci
6. npm run lint
7. npm run typecheck
8. npm run test -- --run
9. npm run build
10. docker build check
11. main branch 才部署到 GitHub Pages
12. 使用官方 GitHub Pages actions：
    - actions/configure-pages
    - actions/upload-pages-artifact
    - actions/deploy-pages

請確認 package.json scripts 包含：

- dev
- build
- preview
- lint
- typecheck
- test

請注意 Vite + GitHub Pages 的 base path：

- 如果 repository 不是 username.github.io，而是一般 repo，請提供設定方式：
  base: '/repo-name/'
- 請在 README 說明如何調整 vite.config.ts 的 base

請在 README 新增「Docker and CI/CD Strategy」章節，說明：

1. local development command
2. production build command
3. Docker build command
4. Docker run command
5. GitHub Pages deploy setup
6. 為什麼 GitHub Pages 部署 static dist
7. 為什麼 Docker 只是 production serve verification
8. CI/CD 如何提升前端品質

請另外建立 docs/ci-cd-notes.md，內容包含：

1. 面試 1 分鐘回答
2. 面試 3 分鐘回答
3. 如果被問「Docker 沒有真的部署」要怎麼回答
4. 如果被問「為什麼不用雲端主機」要怎麼回答
```

---

## 驗收標準

完成後你應該能做到：

```bash
npm run lint
npm run typecheck
npm run test -- --run
npm run build
docker build -t runpulse-ai-dashboard .
docker run -p 8080:80 runpulse-ai-dashboard
```

GitHub Actions 應該會：

- PR 時檢查 lint/typecheck/test/build/docker build
- main branch push 後部署到 GitHub Pages
