'use client'

import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stats = [
  { value: '20+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '3+', label: 'Years Experience' },
]

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      aria-label="Hero section"
    >
      {/* ── Particle canvas ── */}
      <ParticleCanvas />

      {/* ── Subtle radial vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(255,255,255,0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Decorative brackets ── */}
      <div className="absolute top-24 left-8 md:left-16 hidden lg:block" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M16 8 L8 8 L8 40 L16 40" stroke="rgba(220,38,38,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="absolute top-24 right-8 md:right-16 hidden lg:block" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M32 8 L40 8 L40 40 L32 40" stroke="rgba(220,38,38,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-accent/20 text-accent select-none"
              style={{ background: 'rgba(220,38,38,0.06)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[1.04] tracking-[-0.03em] text-text-primary mb-6"
          >
            We craft software
            <br />
            <span className="relative inline-block">
              <span className="gradient-text">that scales.</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="6"
                viewBox="0 0 300 6"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 3 Q37.5 0 75 3 Q112.5 6 150 3 Q187.5 0 225 3 Q262.5 6 300 3"
                  stroke="#DC2626"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.5"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed mb-10"
          >
            Endow Tech designs and engineers modern web applications, SaaS
            platforms, and student portal systems — built for performance,
            built to grow.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 mb-16"
          >
            <button
              onClick={() => handleScroll('#contact')}
              className="group relative px-8 py-4 text-sm font-bold text-white bg-accent rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.97]"
            >
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                aria-hidden="true"
              />
              <span className="relative flex items-center gap-2">
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9m0 0L8 3.5M11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            <button
              onClick={() => handleScroll('#portfolio')}
              className="px-8 py-4 text-sm font-bold text-text-primary bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:border-accent/40 hover:bg-white active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              View Work
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center divide-x divide-gray-100"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 py-2 text-center first:pl-0 last:pr-0">
                <p className="text-3xl font-black text-text-primary tracking-tight">{stat.value}</p>
                <p className="text-xs text-text-muted mt-0.5 font-medium uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold text-text-muted/60 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div className="w-5 h-8 rounded-full border border-gray-200 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* ── Bottom fade to white ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
        aria-hidden="true"
      />
    </section>
  )
}
