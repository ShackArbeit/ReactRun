# Claude Code Prompt 05｜Performance Optimization Demo

## 任務目標

針對 JD 的「維護並優化頁面效能，提供使用者更好的操作體驗」做可展示的 demo。

核心不是堆滿 useMemo，而是展示你知道：

- 要先測量再優化
- Core Web Vitals：LCP / CLS / INP
- React rendering performance
- code splitting
- server state caching
- large list strategy

---

## 可直接貼給 Claude Code 的 Prompt

```text
你是一位 Senior React Performance Engineer。請幫我針對 RunPulse AI Dashboard 加入可展示、可在面試中說明的前端效能優化。

請實作以下內容：

1. Route-level lazy loading

- 使用 React.lazy 與 Suspense
- DashboardPage lazy load
- SessionDetailPage lazy load
- loading fallback 使用 Skeleton

2. Memoized chart data

- TrainingTrendChart 的資料轉換請使用 useMemo
- 請在註解中說明：
  「這裡的資料轉換與 ECharts option 建立成本較高，因此使用 useMemo 避免 filter 未變更時重算」

3. React.memo

- 對渲染成本較高且 props 穩定的 child component 使用 React.memo
- 不要對所有 component 都使用 React.memo
- 請用註解說明使用原因

4. useCallback

- 只有當 callback 傳入 memoized child component 或會造成不必要 render 時才使用
- 不要濫用

5. Large list strategy

- 如果 sessions 超過 100 筆，請加入簡易 pagination
- 或建立可替換成 virtualization 的結構
- README 中說明 production 可使用 TanStack Virtual 或類似方案

6. PerformancePanel

請建立一個可在畫面上展示的 PerformancePanel，包含：

- Mock Core Web Vitals:
  - LCP
  - CLS
  - INP
- render count demo
- route lazy loading status
- query cache 說明
- memoization 說明

7. Web Vitals 思維

請在 README 新增「Performance Strategy」章節，內容包含：

- 先測量再優化
- Core Web Vitals: LCP / CLS / INP
- LCP：最大內容載入時間
- CLS：版面穩定性
- INP：互動反應速度
- React Profiler 可用來找 unnecessary re-render
- useMemo / useCallback 是效能優化工具，不是修正邏輯的工具
- route-level code splitting
- server state caching
- large list pagination / virtualization

請同時建立 docs/performance-notes.md，內容要能讓我面試前快速複習，包含：

1. 1 分鐘效能優化回答
2. 3 分鐘效能優化回答
3. 面試官可能追問
4. 對應回答
```

---

## 驗收標準

完成後你應該能展示：

- Route lazy loading
- Skeleton loading
- PerformancePanel
- Core Web Vitals 字樣：LCP / CLS / INP
- Chart data memoization
- Pagination 或 large list strategy
- README 有一段可以直接背的效能回答
