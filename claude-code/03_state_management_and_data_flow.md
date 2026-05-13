# Claude Code Prompt 03｜State Management + Data Flow

## 任務目標

建立清楚的資料流與狀態管理策略：

- TanStack Query 管 server state
- Zustand 管 global UI state
- local state 留在 component
- 可分享狀態可放 URL query string

---

## 可直接貼給 Claude Code 的 Prompt

```text
你是一位 Senior Frontend Architect。請幫我設計 RunPulse AI Dashboard 的資料流與狀態管理。

請依照以下原則：

1. Server state 使用 TanStack Query
2. Global UI state 使用 Zustand
3. Component-only state 使用 useState / useReducer
4. 可分享、可重新整理保存的狀態，盡量使用 URL query string
5. 不要把 server state 塞進 Zustand
6. 不要為了小型 local state 使用 global store

請建立 TanStack Query hooks：

Dashboard:
- useSummaryQuery()

Sessions:
- useSessionsQuery(params)
- useSessionDetailQuery(id)
- useCreateSessionMutation()
- useUpdateSessionMutation()
- useDeleteSessionMutation()

Mutation 要求：

1. create / update / delete 成功後 invalidate 相關 query
2. 至少做一個 optimistic update 範例，例如更新 session note 或刪除 session
3. mutation 失敗時需要 rollback
4. UI 需要能展示 loading、error、empty state

Zustand store 要求：

src/shared/store/uiStore.ts

請管理以下 global UI state：

- themeMode: dark | light
- selectedWeek
- sessionTypeFilter
- dashboardCompactMode
- toggleTheme()
- setSelectedWeek()
- setSessionTypeFilter()
- toggleCompactMode()

請在 DashboardPage 實作：

1. 從 useSummaryQuery 取得 summary
2. 從 useSessionsQuery 取得 sessions
3. 從 Zustand 取得 selectedWeek 與 sessionTypeFilter
4. filter 改變時重新查詢 sessions
5. loading 時顯示 Skeleton
6. error 時顯示 ErrorState
7. 沒資料時顯示 EmptyState

請在 README 新增「State Management Strategy」章節，說明：

1. local state
2. global UI state
3. server state
4. URL state
5. 為什麼不用單一 global store 管全部資料
6. 資料流：
   UI -> hook -> API client -> MSW REST API -> Query cache -> UI
```

---

## 驗收標準

完成後你應該能展示：

- TanStack Query devtools 或程式碼中能看出 query / mutation
- Zustand 只管理 UI state
- Mutation 成功後資料會更新
- Filter 改變後 sessions 會重新查詢
- README 可以拿來當面試回答稿
