import type { Summary } from '@/features/dashboard/types'
import type { Session, SessionType } from '@/features/sessions/types'

export const mockSummary: Summary = {
  totalDistanceKm: 1843.7,
  weeklyLoad: 512,
  avgPace: '5:31',
  recoveryScore: 71,
  fatigueLevel: 'medium',
  aiSuggestion:
    'LLM inference (200 sessions): Reduce weekly load by 10% next week. Prioritize 1 interval + 1 tempo + 1 long run. Insert recovery runs between quality sessions to improve adaptation.',
}

// ---------- generator ----------

type TypeConfig = {
  distRange: [number, number]
  paceRange: [number, number]
  hrRange: [number, number]
  loadRange: [number, number]
  notes: string[]
}

const TYPE_CONFIG: Record<SessionType, TypeConfig> = {
  easy: {
    distRange: [5, 13],
    paceRange: [5.5, 6.5],
    hrRange: [125, 145],
    loadRange: [40, 90],
    notes: [
      'Easy run, steady rhythm and relaxed breathing.',
      'Morning easy run with full warm-up.',
      'Flat route, consistent effort throughout.',
      'Legs felt light, good overall control.',
      'Evening run, conservative and aerobic.',
      'Easy conversational pace, focus on cadence.',
    ],
  },
  tempo: {
    distRange: [8, 15],
    paceRange: [4.8, 5.3],
    hrRange: [160, 178],
    loadRange: [100, 160],
    notes: [
      'Tempo blocks near threshold effort.',
      'Progressive tempo with faster finish.',
      '4 x 2km tempo, stable pacing throughout.',
      'Threshold run, strong final kilometer.',
      'Sustained effort, good form and breathing.',
      '3 x 3km tempo with recovery jogs in between.',
    ],
  },
  interval: {
    distRange: [6, 12],
    paceRange: [4.4, 5.0],
    hrRange: [170, 185],
    loadRange: [120, 165],
    notes: [
      '8 x 400m, finished with one strong closing rep.',
      '6 x 800m with full recovery between reps.',
      '10 x 400m, clear pacing structure maintained.',
      '5 x 1km at race pace, solid execution.',
      '12 x 200m, speed focus with controlled form.',
      '4 x 1.5km, well-controlled effort throughout.',
    ],
  },
  long: {
    distRange: [16, 32],
    paceRange: [5.5, 6.3],
    hrRange: [140, 158],
    loadRange: [150, 250],
    notes: [
      'Long run with fueling every 30 minutes.',
      'Endurance day, held pace well in the second half.',
      'Marathon pace block integrated in final 8km.',
      'Hilly long run, good aerobic adaptation.',
      'Easy long run, fully aerobic and conversational.',
      'Long run with late fueling stress test.',
    ],
  },
  recovery: {
    distRange: [3, 7],
    paceRange: [6.5, 7.5],
    hrRange: [110, 130],
    loadRange: [20, 50],
    notes: [
      'Recovery jog, light and easy throughout.',
      'Treadmill recovery run, focus on easy turnover.',
      'Easy walk-jog, active recovery session.',
      'Light recovery before next quality session.',
      'Active recovery, cadence and breathing focus.',
      'Short recovery run, fully relaxed effort.',
    ],
  },
}

// Deterministic pseudo-random: avoids Math.random() so data is stable across reloads
function seededFloat(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function toPaceStr(paceDecimal: number): string {
  const min = Math.floor(paceDecimal)
  const sec = Math.round((paceDecimal - min) * 60)
  return `${min}:${String(sec).padStart(2, '0')}`
}

function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0]
}

function generateSessions(): Session[] {
  const sessions: Session[] = []

  // ~8.5 years: 2018-01-01 → 2026-05-12
  // Guarantees 2000+ total sessions and 300+ per type
  const start = new Date('2018-01-01T00:00:00Z')
  const end = new Date('2026-05-12T00:00:00Z')

  // Day-of-week default type (null = rest)
  const DOW_TYPE: (SessionType | null)[] = [
    'recovery', // Sun 0
    'easy',     // Mon 1
    'interval', // Tue 2
    'easy',     // Wed 3
    null,       // Thu 3 — decided per-seed below
    'tempo',    // Fri 5
    'long',     // Sat 6
  ]

  let idCounter = 100
  const cur = new Date(start)

  while (cur <= end) {
    const dow = cur.getUTCDay()
    const s0 = seededFloat(idCounter * 17 + dow)
    const s1 = seededFloat(idCounter * 7 + 1)
    const s2 = seededFloat(idCounter * 13 + 2)
    const s3 = seededFloat(idCounter * 19 + 3)
    const s4 = seededFloat(idCounter * 23 + 4)
    const s5 = seededFloat(idCounter * 29 + 5)

    let sessionType: SessionType | null = DOW_TYPE[dow]

    // Thu: 40 % chance of recovery run, otherwise rest
    if (dow === 4) sessionType = s0 < 0.4 ? 'recovery' : null
    // Sun: 25 % rest, otherwise recovery
    if (dow === 0) sessionType = s0 < 0.25 ? null : 'recovery'
    // Tue: alternate interval / tempo
    if (dow === 2) sessionType = idCounter % 3 === 0 ? 'tempo' : 'interval'
    // Fri: alternate tempo / interval
    if (dow === 5) sessionType = idCounter % 3 === 1 ? 'interval' : 'tempo'

    if (sessionType) {
      const cfg = TYPE_CONFIG[sessionType]

      const dist = +lerp(cfg.distRange[0], cfg.distRange[1], s1).toFixed(1)
      const pace = +lerp(cfg.paceRange[0], cfg.paceRange[1], s2).toFixed(2)
      const hr   = Math.round(lerp(cfg.hrRange[0], cfg.hrRange[1], s3))
      const load = Math.round(lerp(cfg.loadRange[0], cfg.loadRange[1], s4))
      const durationMin = Math.round(dist * pace)
      const note = cfg.notes[Math.floor(s5 * cfg.notes.length)]

      const dateStr = toDateStr(cur)
      const startHour = sessionType === 'long' ? 6 : sessionType === 'interval' ? 18 : 7
      const createdAt = new Date(`${dateStr}T${String(startHour).padStart(2, '0')}:00:00Z`).toISOString()
      const updatedAt = new Date(
        new Date(createdAt).getTime() + durationMin * 60 * 1000
      ).toISOString()

      sessions.push({
        id: String(idCounter),
        date: dateStr,
        type: sessionType,
        distanceKm: dist,
        durationMin,
        avgPace: toPaceStr(pace),
        heartRate: hr,
        trainingLoad: load,
        note,
        createdAt,
        updatedAt,
      })

      idCounter++
    }

    cur.setUTCDate(cur.getUTCDate() + 1)
  }

  // Most recent first
  return sessions.reverse()
}

export const mockSessions: Session[] = generateSessions()
