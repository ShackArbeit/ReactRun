# Codex Review Prompt 04｜Final Interview Audit

## 任務目標

這是最後總審查。  
讓 Codex 以「面試官 + Senior Frontend Engineer」角度檢查整個 MVP 是否足以支撐你的面試。

---

## 可直接貼給 Codex 的 Prompt

```text
請你以「前端工程師面試官 + Senior Frontend Engineer」的角度，對這個 RunPulse AI Dashboard MVP 做最後總審查。

背景：

我的面試日期是：{{INTERVIEW_DATE}}。如果我沒有提供日期，請先忽略時間推導，不要自行使用「下週三 / 明天 / 下個月」這種相對日期。JD 重點包含：

1. React + TypeScript
2. 頁面效能優化
3. 模組化
4. 狀態管理
5. 資料流設計
6. RESTful API 串接
7. 前端架構規劃
8. 加分：Docker、Nginx、Linux、資料視覺化、Design Patterns
9. 善用 AI 工具

這個 MVP 的目的不是做大型產品，而是在三天內做出一個能在面試中展示核心概念的小型作品。

請你檢查以下項目：

1. JD 對應度

請建立表格：

JD Requirement | MVP Evidence | Is it convincing? | Risk | Suggested talking point

2. 面試展示力

請檢查：

- 1 分鐘介紹是否清楚
- 3 分鐘技術亮點是否有說服力
- 是否能讓面試官感覺我不只是會切版
- 是否能展示前端工程思維
- 是否能展示 AI 工具使用能力

3. 技術深度

請評估以下面向是否足夠：

- React component design
- TypeScript type design
- API layer
- State management
- Data flow
- Performance
- CI/CD
- Documentation

4. 風險檢查

請指出面試官可能質疑的地方，例如：

- 這只是 mock API
- Docker 沒有真的部署
- MVP 規模太小
- Claude Code 幫你寫太多
- 你是否真的理解程式
- 效能數據是否只是 mock

每個風險請提供：

- 面試官可能怎麼問
- 最佳回答
- 不該回答什麼

5. 最後修正清單

請依照優先級列出：

- 面試前必修
- 有時間再修
- 可以不修但要會解釋

6. Demo script

請幫我整理一份 5 分鐘 demo 流程：

第 0:00 - 1:00：專案介紹
第 1:00 - 2:00：架構與資料流
第 2:00 - 3:00：API 與狀態管理
第 3:00 - 4:00：效能優化
第 4:00 - 5:00：CI/CD 與 AI 工具使用

7. 最終面試話術

請給我：

- 30 秒版本
- 1 分鐘版本
- 3 分鐘版本

8. 證據要求

請你所有結論都盡量引用實際檔案證據，至少包含：

- 檔案路徑
- 必要時的行號
- 哪些是實作已存在
- 哪些只是 README / docs 聲稱，但程式碼未必真的做到

請用自然、有自信但不誇大的語氣。
```

---

## 驗收標準

Codex 回覆後，你要確認：

- 有把 JD 與 MVP 對應起來
- 有指出風險
- 有提供 demo 流程
- 有 30 秒 / 1 分鐘 / 3 分鐘版本話術
- 你看完後可以直接練習面試
- 有引用實際檔案證據，而不是只給抽象建議
- 沒有使用會過期的相對日期
