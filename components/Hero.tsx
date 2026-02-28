'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// ─── constants ────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.80, ease: EASE, delay },
  }
}

const CLIENTS = [
  'EduFlow', 'LaunchMetrics', 'ConnectBridge', 'ShopSphere',
  'Novalab', 'Stackwise', 'Meridian', 'Folio', 'Cruxly',
  'Opengate', 'Helixr', 'Synapse', 'Basecamp', 'Luminary',
  'VoxLab', 'Traxer', 'PivotHQ', 'Formcast', 'Gridsync',
]
const TICKER = [...CLIENTS, ...CLIENTS, ...CLIENTS]

// ─── component ────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mouse, setMouse] = useState({ x: -9999, y: -9999, active: false })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      setMouse({ x: e.clientX - r.left, y: e.clientY - r.top, active: true })
    }
    const onLeave = () => setMouse({ x: -9999, y: -9999, active: false })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col bg-[#0A0A0B] overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── BG layer 1: extremely faint base grid — gives dark bg texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── BG layer 2: vivid grid revealed ONLY under mouse via CSS mask ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: mouse.active ? 1 : 0,
          transition: 'opacity 0.4s ease',
          WebkitMaskImage: `radial-gradient(circle 260px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 260px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* ── BG layer 3: red tint glow that follows cursor ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: mouse.active ? 1 : 0,
          transition: 'opacity 0.4s ease',
          background: `radial-gradient(circle 320px at ${mouse.x}px ${mouse.y}px,
            rgba(220,38,38,0.10) 0%,
            rgba(220,38,38,0.04) 55%,
            transparent 100%)`,
        }}
      />

      {/* ── BG layer 4: vignette — darkens grid at all edges always ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 20%, #0A0A0B 100%)',
        }}
      />

      {/* ── BG layer 5: soft red ambient blob ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          width: 600, height: 420,
          top: '-12%', left: '5%',
          filter: 'blur(100px)',
          background: 'radial-gradient(ellipse, rgba(220,38,38,0.14) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.07, 0.98, 1], y: [0, -18, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-28 pb-8">

          <div>

            {/* ── CONTENT ── */}
            <div className="max-w-3xl">

              {/* eyebrow — bracketed label */}
              <motion.div className="mb-7" {...fadeUp(0.05)}>
                <span
                  className="text-[11px] font-bold tracking-[0.25em] uppercase select-none"
                  style={{ color: 'rgba(220,38,38,0.85)' }}
                >
                  [ Web · SaaS · Student Portals ]
                </span>
              </motion.div>

              {/* headline — line-clip reveal */}
              <h1 className="mb-8" aria-label="Building Software That Scales">
                <div className="overflow-hidden">
                  <motion.div
                    className="text-[clamp(2.8rem,7vw,6.2rem)] font-black leading-[0.94] tracking-[-0.03em] text-white uppercase"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.18 }}
                  >
                    Building software
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    className="text-[clamp(2.8rem,7vw,6.2rem)] font-black leading-[0.94] tracking-[-0.03em] uppercase"
                    style={{
                      background: 'linear-gradient(100deg, #ff5555 0%, #DC2626 35%, #ececec 72%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.32 }}
                  >
                    that scales.
                  </motion.div>
                </div>
              </h1>

              {/* CTA */}
              <motion.div className="mb-12" {...fadeUp(0.58)}>
                <button
                  onClick={() => scroll('#contact')}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-sm font-bold text-white border border-white/20 rounded-lg overflow-hidden hover:border-white/40 active:scale-[0.97] transition-all duration-200 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                    aria-hidden="true"
                  />
                  {/* phone icon */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span className="relative">Start a Project</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2.5 7h9m0 0L8 3.5M11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.span>
                </button>
              </motion.div>

              {/* two-column descriptor */}
              <motion.div
                className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/[0.07]"
                {...fadeUp(0.72)}
              >
                {/* col 1 — audience */}
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    We build for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Startups', 'Agencies', 'Enterprise'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[12px] font-semibold tracking-wide rounded-full border border-white/[0.12] text-white/60 hover:border-white/25 hover:text-white/80 transition-colors duration-150 select-none cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* col 2 — description */}
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    Our approach
                  </p>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Clean architecture, modern tooling, and pixel-perfect
                    UI — delivered fast.
                  </p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

      {/* ══ CLIENT TICKER ══ */}
      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.0 }}
        aria-hidden="true"
      >
        {/* top border */}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.10) 15%, rgba(255,255,255,0.10) 85%, transparent)',
          }}
        />

        <div className="relative overflow-hidden py-4">
          {/* left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0A0A0B, transparent)' }}
          />
          {/* right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0A0A0B, transparent)' }}
          />

          <div className="hero-ticker flex whitespace-nowrap w-max">
            {TICKER.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-7 px-7 text-[12px] font-semibold tracking-[0.14em] uppercase select-none"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {name}
                <span
                  className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ background: 'rgba(220,38,38,0.65)' }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* bottom border */}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 15%, rgba(255,255,255,0.07) 85%, transparent)',
          }}
        />
      </motion.div>

    </section>
  )
}
