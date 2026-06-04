import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarRange, BellRing, Users } from 'lucide-react'
import { Eyebrow } from './ui.jsx'

/* ------------------------------------------------------------------ Card 1
   Schedule Shuffler — a stack of schedule templates that cycles every 3s. */
const SCHEDULES = [
  { name: 'School Day', time: 'Mon–Fri · 9:00–15:00', tint: 'var(--info)' },
  { name: 'Weekend', time: 'Sat–Sun · 10:00–20:00', tint: 'var(--pass)' },
  { name: 'Vacation', time: 'All day · 8:00–21:00', tint: 'var(--accent-ink)' },
  { name: 'Bedtime', time: 'Every night · 20:30', tint: 'var(--downtime)' },
]

function ScheduleShuffler() {
  const [order, setOrder] = useState([0, 1, 2, 3])
  useEffect(() => {
    const id = setInterval(() => {
      setOrder((o) => {
        const next = [...o]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44">
      {order.map((s, pos) => {
        const sched = SCHEDULES[s]
        return (
          <motion.div
            key={s}
            className="absolute inset-x-0 rounded-2xl border border-line bg-bg px-4 py-3.5 shadow-card"
            animate={{
              top: pos * 14,
              scale: 1 - pos * 0.04,
              opacity: pos > 2 ? 0 : 1 - pos * 0.18,
              zIndex: 10 - pos,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-9 w-1.5 rounded-full" style={{ background: sched.tint }} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-hi">{sched.name}</p>
                <p className="truncate font-mono text-xs text-mid">{sched.time}</p>
              </div>
              <span className="ml-auto rounded-full bg-card-hover px-2 py-0.5 font-mono text-[0.65rem] text-mid">
                active
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ Card 2
   Pass Request feed — typed live, blinking cursor, parent approves. */
const FEED = [
  { who: 'Sam', text: 'Can I get 15 more min for Roblox?', status: 'Approved', ok: true },
  { who: 'Mia', text: 'Homework done — unlock YouTube?', status: 'Approved', ok: true },
  { who: 'Leo', text: 'One more episode before dinner?', status: 'Denied', ok: false },
]

function PassFeed() {
  const [line, setLine] = useState(0)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const msg = FEED[line].text
    setTyped('')
    setDone(false)
    let i = 0
    const typer = setInterval(() => {
      i++
      setTyped(msg.slice(0, i))
      if (i >= msg.length) {
        clearInterval(typer)
        setTimeout(() => setDone(true), 350)
        setTimeout(() => setLine((l) => (l + 1) % FEED.length), 2600)
      }
    }, 42)
    return () => clearInterval(typer)
  }, [line])

  const cur = FEED[line]
  return (
    <div className="flex h-44 flex-col rounded-2xl border border-line bg-bg p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-deny opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-deny" />
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-mid">Live · Pass Requests</span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[0.7rem] font-bold text-[#1c1c1e]">
            {cur.who[0]}
          </span>
          <p className="font-mono text-sm leading-snug text-hi">
            <span className="text-mid">{cur.who}: </span>
            {typed}
            {!done && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent-ink" />}
          </p>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="ml-8 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold"
              style={{
                color: cur.ok ? 'var(--approve)' : 'var(--deny)',
                background: cur.ok ? 'rgba(21,128,61,0.12)' : 'rgba(185,28,28,0.12)',
              }}
            >
              {cur.ok ? '✓' : '✕'} {cur.status} by you
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ Card 3
   Weekly scheduler with an animated cursor selecting days then Save. */
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const TARGET = [1, 2, 3, 4, 5] // weekdays

function WeekScheduler() {
  const [selected, setSelected] = useState([])
  const [cursor, setCursor] = useState({ x: 12, y: 8 })
  const [pressing, setPressing] = useState(false)
  const [saved, setSaved] = useState(false)
  const cells = useRef([])
  const saveBtn = useRef(null)
  const wrap = useRef(null)

  useEffect(() => {
    let timers = []
    const point = () => {
      setSelected([])
      setSaved(false)
      const box = wrap.current?.getBoundingClientRect()
      if (!box) return

      TARGET.forEach((day, i) => {
        timers.push(
          setTimeout(() => {
            const el = cells.current[day]
            const r = el.getBoundingClientRect()
            setCursor({ x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 })
            timers.push(setTimeout(() => setPressing(true), 260))
            timers.push(
              setTimeout(() => {
                setPressing(false)
                setSelected((s) => [...s, day])
              }, 380),
            )
          }, 500 + i * 620),
        )
      })

      // move to Save
      timers.push(
        setTimeout(() => {
          const r = saveBtn.current.getBoundingClientRect()
          setCursor({ x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 })
          timers.push(setTimeout(() => setPressing(true), 280))
          timers.push(
            setTimeout(() => {
              setPressing(false)
              setSaved(true)
            }, 420),
          )
        }, 500 + TARGET.length * 620 + 200),
      )

      // restart
      timers.push(setTimeout(point, 500 + TARGET.length * 620 + 2600))
    }
    timers.push(setTimeout(point, 400))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div ref={wrap} className="relative h-44 rounded-2xl border border-line bg-bg p-4">
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-widest text-mid">Repeat on</p>
      <div className="flex justify-between gap-1.5">
        {DAYS.map((d, i) => {
          const on = selected.includes(i)
          return (
            <div
              key={i}
              ref={(el) => (cells.current[i] = el)}
              className="flex h-9 flex-1 items-center justify-center rounded-xl border text-sm font-semibold transition-colors duration-200"
              style={{
                background: on ? 'var(--accent)' : 'var(--bg-card)',
                color: on ? '#1c1c1e' : 'var(--text-lo)',
                borderColor: on ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {d}
            </div>
          )
        })}
      </div>

      <button
        ref={saveBtn}
        className="mt-4 flex w-full items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-colors duration-300"
        style={{
          background: saved ? 'var(--pass)' : 'var(--bg-card-hover)',
          color: saved ? '#fff' : 'var(--text-mid)',
        }}
      >
        {saved ? 'Saved ✓' : 'Save schedule'}
      </button>

      {/* faux cursor */}
      <motion.svg
        className="pointer-events-none absolute z-20 drop-shadow"
        width="22" height="22" viewBox="0 0 24 24"
        animate={{ left: cursor.x, top: cursor.y, scale: pressing ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{ position: 'absolute' }}
      >
        <path d="M5 3l14 7-6 1.5L10 19 5 3z" fill="#1c1c1e" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </motion.svg>
    </div>
  )
}

/* ------------------------------------------------------------------ Section */
const CARDS = [
  {
    icon: CalendarRange,
    title: 'Schedules that fit real life',
    body: 'Not one rigid downtime — set School Day, Weekend, Vacation and Bedtime, each with its own apps and hours.',
    demo: <ScheduleShuffler />,
  },
  {
    icon: BellRing,
    title: 'Kids earn more with a Pass',
    body: 'When they want extra time, kids send a Pass Request. You approve or deny right from the notification.',
    demo: <PassFeed />,
  },
  {
    icon: Users,
    title: 'Every kid, their own rules',
    body: 'Independent profiles per child with reusable schedule templates — set the week in a couple of taps.',
    demo: <WeekScheduler />,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">What ScreenPass does</Eyebrow>
        <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-hi sm:text-[2.7rem]">
          Built for negotiation, <span className="font-play text-accent-ink">not lockdown.</span>
        </h2>
        <p className="mt-4 text-balance text-mid">
          The three things parents kept asking for — flexible time, a way to say “yes” fast, and rules per kid.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 }}
            className="group flex flex-col rounded-[2rem] border border-line bg-card p-5 shadow-card transition-colors hover:bg-card-hover"
          >
            {c.demo}
            <div className="mt-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                <c.icon className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <h3 className="font-sans text-lg font-bold tracking-tight text-hi">{c.title}</h3>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-mid">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
