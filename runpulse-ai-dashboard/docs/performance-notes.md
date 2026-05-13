# Performance Notes｜面試複習

## 1 分鐘回答

> 我做效能優化的第一步是先測量，不是瞎猜。我用 React Profiler 找 unnecessary re-render，用 Chrome DevTools 看 Core Web Vitals。確認瓶頸後，才針對性地用 React.lazy 做 code splitting、用 useMemo 避免昂貴計算重複執行、用 TanStack Query 的 cache 減少重複 fetch。

---

## 3 分鐘回答

**測量優先**
不在沒有 profiling 的情況下盲目加 useMemo。React Profiler 可以找出哪個 component 在 re-render，為什麼 re-render。

**Core Web Vitals**
- **LCP (Largest Contentful Paint)**：最大元素進入 viewport 的時間，目標 < 2.5s。優化：route lazy loading、image preload、critical CSS inline。
- **CLS (Cumulative Layout Shift)**：版面穩定性分數，目標 < 0.1。優化：Skeleton placeholder 避免 layout shift。
- **INP (Interaction to Next Paint)**：使用者互動到畫面更新的時間，目標 < 200ms。優化：避免 main thread blocking，用 useCallback 穩定 event handler。

**React Rendering**
- `React.memo`：避免 child component 在 parent re-render 時重新渲染（前提：props 穩定）
- `useMemo`：避免昂貴計算（如 ECharts option 建立）每次 render 都重跑
- `useCallback`：穩定傳給 memoized child 的 callback reference

**Code Splitting**
- `React.lazy` + `Suspense`：route-level splitting，首次 load 只載入 dashboard chunk，detail page 按需載入

**Server State**
- TanStack Query 的 `staleTime` 避免重複 fetch 相同資料
- Optimistic update 讓 mutation 感覺即時

**Large List**
- 目前用 pagination（每頁 10 筆），production 建議改用 TanStack Virtual 做虛擬滾動

---

## 面試官追問

**Q：useMemo 有什麼 cost？**
A：useMemo 本身有記憶體和 comparison cost。如果計算本身很簡單（如加法），加 useMemo 反而更慢。只在計算成本明顯高於 comparison cost 時才用。

**Q：React.memo 會讓所有 props 不變就不 re-render？**
A：是 shallow comparison。如果 props 包含 object/array，每次 render 產生新 reference 就還是會 re-render。需要配合 useMemo / useCallback 穩定 props。

**Q：如果 LCP 很慢，你會怎麼查？**
A：用 Chrome DevTools Performance tab 看 waterfall，找是 render blocking resource 還是大圖片。用 Lighthouse 看 TBT（Total Blocking Time）是否太高。

**Q：CLS 在 SPA 容易在哪裡出現？**
A：API 回來前後的 layout shift。解法是用 Skeleton 佔位，讓 layout 不因 content 載入而跳動。
