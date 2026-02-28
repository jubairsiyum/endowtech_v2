'use client'

import { motion } from 'framer-motion'

// ─── easing ───────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// Reusable fade-up helper
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: EASE, delay },
  }
}

// ─── data ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '20+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '3+', label: 'Years Experience' },
]

const CLIENTS = [
  'EduFlow', 'LaunchMetrics', 'ConnectBridge', 'ShopSphere',
  'Novalab', 'Stackwise', 'Meridian', 'Folio', 'Cruxly',
  'Opengate', 'Helixr', 'Synapse', 'Basecamp', 'Luminary',
  'VoxLab', 'Traxer', 'PivotHQ', 'Formcast', 'Gridsync',
]

// triple so translateX(-33.33%) CSS loop is always seamless
const TICKER = [...CLIENTS, ...CLIENTS, ...CLIENTS]

// ─── component ────────────────────────────────────────────────────────
export default function Hero() {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col bg-[#080809] overflow-hidden"
      aria-label="Hero section"
    >
      {/* ══ BACKGROUND LAYERS ══ */}

      {/* 1 – dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.065) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2 – radial vignette softens edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 45%, transparent 30%, #080809 100%)',
        }}
      />

      {/* 3 – aurora blob top-center */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          width: 900,
          height: 580,
          top: '-18%',
          left: '50%',
          translateX: '-50%',
          filter: 'blur(120px)',
          background:
            'radial-gradient(ellipse, rgba(220,38,38,0.28) 0%, rgba(185,28,28,0.10) 55%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.06, 0.97, 1], y: [0, -28, 18, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 4 – aurora blob bottom-right */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          width: 480,
          height: 480,
          bottom: '8%',
          right: '8%',
          filter: 'blur(90px)',
          background:
            'radial-gradient(ellipse, rgba(220,38,38,0.18) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 0.95, 1], x: [0, -38, 18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* 5 – noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.038]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* ══ MAIN CONTENT ══ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-12 pt-32 pb-10">

          {/* eyebrow pill */}
          <motion.div className="flex justify-center mb-10" {...fadeUp(0.05)}>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.09] bg-white/[0.04] text-[11px] font-semibold tracking-[0.22em] uppercase text-white/50 select-none">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              Available for new projects
            </span>
          </motion.div>

          {/* headline – each line slides up through overflow:hidden clip */}
          <h1 className="text-center" aria-label="Building Software That Scales">

            <div className="overflow-hidden">
              <motion.div
                className="text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-white uppercase"
                initial={{ y: '108%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.0, ease: EASE, delay: 0.22 }}
              >
                Building Software
              </motion.div>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.div
                className="text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.95] tracking-[-0.04em] uppercase"
                style={{
                  background: 'linear-gradient(105deg, #ff4d4d 0%, #DC2626 32%, #f0f0f0 78%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                initial={{ y: '108%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.0, ease: EASE, delay: 0.40 }}
              >
                That Scales.
              </motion.div>
            </div>
          </h1>

          {/* sub-headline */}
          <motion.p
            className="text-center text-base sm:text-[1.05rem] leading-relaxed max-w-md mx-auto mb-12"
            style={{ color: 'rgba(255,255,255,0.40)' }}
            {...fadeUp(0.70)}
          >
            Endow Tech engineers modern web apps, SaaS platforms, and student
            portal systems — built for performance and growth.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
            {...fadeUp(0.86)}
          >
            <button
              onClick={() => scroll('#contact')}
              className="group relative w-full sm:w-auto px-9 py-4 text-sm font-bold text-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_0_40px_rgba(220,38,38,0.38)] hover:brightness-110 active:scale-[0.97]"
              style={{ background: '#DC2626' }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                aria-hidden="true"
              />
              <span className="relative flex items-center justify-center gap-2">
                Start a Project
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9m0 0L8 3.5M11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </span>
            </button>

            <button
              onClick={() => scroll('#portfolio')}
              className="w-full sm:w-auto px-9 py-4 text-sm font-bold rounded-xl border border-white/[0.10] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.20] text-white/55 hover:text-white/90 active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              View Our Work
            </button>
          </motion.div>

          {/* stats row */}
          <motion.div
            className="flex flex-wrap items-start justify-center"
            {...fadeUp(1.04)}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center px-10 sm:px-14 py-2 text-center"
                style={{
                  borderRight:
                    i < STATS.length - 1
                      ? '1px solid rgba(255,255,255,0.08)'
                      : 'none',
                }}
              >
                <span className="text-[2.6rem] font-black text-white leading-none tabular-nums">
                  {s.value}
                </span>
                <span
                  className="text-[10px] mt-1.5 font-semibold uppercase tracking-[0.20em]"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ══ CLIENT TICKER ══ */}
      <motion.div
        className="relative z-10 w-full pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1.1 }}
        aria-hidden="true"
      >
        {/* top hairline */}
        <div
          className="h-px w-full mb-6"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)',
          }}
        />

        <p
          className="text-center text-[10px] font-bold tracking-[0.28em] uppercase mb-6"
          style={{ color: 'rgba(255,255,255,0.30)' }}
        >
          Trusted by teams at
        </p>

        <div className="relative overflow-hidden">
          {/* left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #080809 0%, transparent 100%)' }}
          />
          {/* right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #080809 0%, transparent 100%)' }}
          />

          <div className="hero-ticker flex whitespace-nowrap w-max py-1">
            {TICKER.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-6 text-[13px] font-semibold tracking-[0.12em] uppercase select-none"
                style={{ color: 'rgba(255,255,255,0.50)' }}
              >
                {name}
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(220,38,38,0.70)' }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* bottom hairline — clean section boundary */}
        <div
          className="h-px w-full mt-6"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)',
          }}
        />
      </motion.div>

    </section>
  )
}
