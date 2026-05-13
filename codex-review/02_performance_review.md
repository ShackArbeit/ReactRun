# Codex Review Prompt 02｜React Performance Review

## 任務目標

讓 Codex 從 React 效能角度檢查專案，避免你面試時被問倒：

- 是否真的有優化
- 是否濫用 useMemo / useCallback
- 是否有 unnecessary re-render
- 是否符合 Core Web Vitals 思維
- 是否有清楚 demo 點

---

## 可直接貼給 Codex 的 Prompt

```text
請你以 Senior React Performance Engineer 的角度審查這個 RunPulse AI Dashboard 專案。

專案背景：

這個 MVP 是為前端工程師面試準備，目標是展示：

1. 頁面效能優化
2. React rendering optimization
3. Core Web Vitals 思維
4. route-level lazy loading
5. chart data memoization
6. large list strategy
7. TanStack Query caching

請檢查以下項目：

1. React rendering performance

請檢查：

- 是否有 unnecessary re-render
- DashboardPage 是否每次 filter 改變就重算太多資料
- props reference 是否穩定
- expensive child component 是否適合 React.memo
- React.memo 是否濫用

2. useMemo / useCallback

請檢查：

- useMemo 是否用在真正昂貴或 reference-sensitive 的計算
- useCallback 是否只有在必要時使用
- 是否有為了「看起來有優化」而濫用 memoization
- 是否有 memoization 反而讓程式更難讀

3. Chart performance

請檢查：

- ECharts options 是否每次 render 都重建
- chart data transformation 是否 memoized
- chart resize / cleanup 是否正確
- 是否有 memory leak 風險

4. Route-level lazy loading

請檢查：

- React.lazy / Suspense 是否正確
- fallback UI 是否合理
- lazy loading 是否真的在 route level
- 是否有可能造成 UX 閃爍

5. Large list strategy

請檢查：

- sessions list 如果超過 100 筆是否有 pagination 或 virtualization 策略
- key 是否穩定
- sort / filter 是否會造成過度計算
- mobile list 是否仍可用

6. Core Web Vitals 思維

請檢查：

- README 是否正確說明 LCP / CLS / INP
- PerformancePanel 是否有教育性與面試展示價值
- 是否避免過度承諾，例如沒有真實量測卻宣稱已達標
- 是否提到「先測量再優化」

7. TanStack Query performance

請檢查：

- staleTime / gcTime 是否合理
- query key 是否設計正確
- mutation 後 invalidate 是否精準
- 是否有不必要 refetch

請輸出格式：

# Performance Review

## Overall Verdict

請給一句總評，分數 1-10。

## Must Fix

列出必須修正的問題，包含：

- 問題
- 影響
- 建議修改
- code patch

## Should Improve

列出建議改善項目。

## Over-Optimization Warnings

請指出是否有過度優化或濫用 memoization。

## Interview Demo Points

請列出我在面試中可以展示的效能點。

## Interview Q&A

請列出面試官可能追問的 5 題問題與建議回答。

## Suggested Patch

如果有需要，請提供具體修改 patch。
```

---

## 驗收標準

Codex 回覆後，你要確認：

- 有檢查 useMemo / useCallback 是否濫用
- 有檢查 chart performance
- 有指出面試可以展示什麼
- 有提醒不要亂宣稱真實 Web Vitals 成績
