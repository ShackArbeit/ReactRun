# Claude Code Prompt 02｜Mock REST API + Typed API Client

## 任務目標

建立 MSW mock REST API，並且設計一層 typed API client。  
重點是讓 MVP 雖然是靜態網頁，但仍能展示真實前端 API 串接流程。

---

## 可直接貼給 Claude Code 的 Prompt

```text
你是一位 Senior Frontend Engineer。請幫我為 RunPulse AI Dashboard 實作 RESTful API mock layer 與 typed API client。

背景：

這個 MVP 是靜態網站，最後會部署到 GitHub Pages，因此不能依賴真實後端服務。但面試時我需要展示 RESTful API 串接、loading/error state、mutation、資料更新等前端能力。

請使用 MSW 模擬 RESTful API。

請建立 mock data：

summary:
- totalDistanceKm
- weeklyLoad
- avgPace
- recoveryScore
- fatigueLevel
- aiSuggestion

sessions:
- id
- date
- type: easy | tempo | interval | long | recovery
- distanceKm
- durationMin
- avgPace
- heartRate
- trainingLoad
- note
- createdAt
- updatedAt

請建立以下 RESTful endpoints：

1. GET /api/summary
2. GET /api/sessions?week=&type=&keyword=&sort=
3. GET /api/sessions/:id
4. POST /api/sessions
5. PATCH /api/sessions/:id
6. DELETE /api/sessions/:id

請同時建立：

src/shared/api/httpClient.ts
src/shared/api/endpoints.ts
src/shared/api/apiError.ts
src/features/dashboard/types.ts
src/features/sessions/types.ts
src/mocks/data.ts
src/mocks/handlers.ts
src/mocks/browser.ts

API client 設計要求：

1. React component 不可以直接 fetch URL
2. 所有 request 必須經過 shared/api/httpClient.ts
3. httpClient 需要支援：
   - GET
   - POST
   - PATCH
   - DELETE
   - JSON parsing
   - HTTP status error handling
   - typed response
4. API error 格式請統一為：
   {
     code: string;
     message: string;
     details?: unknown;
   }
5. 請提供 typed functions：
   - getSummary()
   - getSessions(params)
   - getSessionById(id)
   - createSession(payload)
   - updateSession(id, payload)
   - deleteSession(id)

請在 README 補上：

1. RESTful API Design
2. API client pattern
3. 為什麼 component 不直接 fetch
4. 如何從 MSW 切換成真實後端 API
```

---

## 驗收標準

完成後你應該能確認：

- Browser devtools network 可看到 `/api/summary`、`/api/sessions`
- UI component 沒有直接出現 `fetch('/api/...')`
- API error 格式一致
- TypeScript 可以檢查 request / response type
- README 說得出「mock API 不是假裝會後端，而是前端與後端 API contract 的開發方式」
