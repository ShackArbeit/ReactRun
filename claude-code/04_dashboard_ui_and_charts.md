# Claude Code Prompt 04｜Dashboard UI + ECharts Visualization

## 任務目標

完成有質感的 RunPulse AI Dashboard 主畫面，讓它看起來像可以展示給面試官看的作品。

---

## 可直接貼給 Claude Code 的 Prompt

```text
你是一位 Senior Frontend Engineer + UI Engineer。請幫我完成 RunPulse AI Dashboard 的主畫面 UI 與資料視覺化。

設計風格：

- 深色科技感
- glassmorphism cards
- subtle gradient background
- clean spacing
- dashboard 專業感
- responsive layout
- desktop 與 mobile 都要好看
- 不要像純範例或 demo toy project

請建立或完善以下 components：

src/features/dashboard/components/
- SummaryCards.tsx
- TrainingTrendChart.tsx
- SessionTable.tsx
- SessionFilter.tsx
- PerformancePanel.tsx
- AiSuggestionCard.tsx
- WeeklyLoadIndicator.tsx

功能要求：

1. SummaryCards 顯示：
   - totalDistanceKm
   - weeklyLoad
   - avgPace
   - recoveryScore

2. TrainingTrendChart 使用 ECharts：
   - 顯示 distanceKm 趨勢
   - 顯示 trainingLoad 趨勢
   - tooltip
   - responsive resize
   - dark theme friendly

3. SessionFilter：
   - selected week
   - type filter
   - keyword search
   - sort by date / distance / training load

4. SessionTable：
   - 顯示 date, type, distance, duration, avgPace, heartRate, trainingLoad
   - 支援 sort
   - mobile 時變成 card list 或可讀性良好的 layout

5. PerformancePanel：
   - 顯示 mock Core Web Vitals:
     - LCP
     - CLS
     - INP
   - 顯示目前採用的效能策略：
     - lazy loading
     - memoized chart data
     - query cache
     - pagination / virtualization strategy

6. AiSuggestionCard：
   - 顯示 summary.aiSuggestion
   - 用面試時可以解釋的方式呈現「AI 賦能」概念

技術要求：

- Chart data 請使用 useMemo
- Event handlers 若傳給 memoized child component，請使用 useCallback
- 不要濫用 useMemo / useCallback
- 大型元件請拆分
- 不要把所有 UI 與資料處理塞在 DashboardPage
- 使用 TypeScript 明確定義 props
- Tailwind class 可讀性要好，必要時拆成小元件

請在 README 新增「UI and Visualization」章節，說明：

1. 為什麼選 dashboard 主題
2. ECharts 在此 MVP 的用途
3. RWD 設計策略
4. 面試時如何說明這不是只做畫面，而是有資料流與架構設計
```

---

## 驗收標準

完成後你應該看到：

- 首頁看起來有作品集質感
- 有圖表、有卡片、有表格、有篩選
- Mobile 版不會爆版
- Chart data 有 memoization
- README 能說明 UI 與資料視覺化設計
