'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\(([^)]+)\)/i)
  if (!match) return null

  const parts = match[1].split(',').map((p) => p.trim())
  if (parts.length < 3) return null

  const r = Number(parts[0])
  const g = Number(parts[1])
  const b = Number(parts[2])

  if ([r, g, b].some((n) => Number.isNaN(n))) return null
  return [r, g, b]
}

function getEffectiveBgColor(start: Element | null): string {
  let current: Element | null = start

  while (current && current instanceof HTMLElement) {
    const bg = window.getComputedStyle(current).backgroundColor
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') return bg
    current = current.parentElement
  }

  return window.getComputedStyle(document.body).backgroundColor || 'rgb(255, 255, 255)'
}

function isDarkColor(color: string): boolean {
  const rgb = parseRgb(color)
  if (!rgb) return false

  const [r, g, b] = rgb
  // Relative luminance approximation. Lower value means darker background.
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance < 0.52
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkSurface, setIsDarkSurface] = useState(true)

  useEffect(() => {
    const updateNavbarTheme = () => {
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)

      // Sample beneath navbar center to infer the currently visible section tone.
      const probeX = Math.round(window.innerWidth / 2)
      const probeY = scrolled ? 84 : 104
      const el = document.elementFromPoint(probeX, probeY)
      let darkSurface: boolean | null = null

      // Keep hero behavior stable until the probe point truly leaves hero bounds.
      const hero = document.getElementById('hero')
      if (hero) {
        const heroRect = hero.getBoundingClientRect()
        if (heroRect.top <= probeY && heroRect.bottom >= probeY) {
          darkSurface = true
        }
      }

      // Prefer explicit section IDs where available.
      if (darkSurface === null) {
        const section = el?.closest('section[id]') as HTMLElement | null
        const sectionId = section?.id || ''
        const darkSections = new Set(['hero', 'tech-stack', 'portfolio', 'comparison'])
        if (sectionId) darkSurface = darkSections.has(sectionId)
      }

      // Fallback to computed color when section metadata is unavailable.
      if (darkSurface === null) {
        const effectiveBg = getEffectiveBgColor(el)
        darkSurface = isDarkColor(effectiveBg)
      }

      setIsDarkSurface(darkSurface)
    }

    updateNavbarTheme()
    window.addEventListener('scroll', updateNavbarTheme, { passive: true })
    window.addEventListener('resize', updateNavbarTheme)

    return () => {
      window.removeEventListener('scroll', updateNavbarTheme)
      window.removeEventListener('resize', updateNavbarTheme)
    }
  }, [])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 lg:px-0 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto mt-3 sm:mt-4 px-6 sm:px-10 lg:px-12 flex items-center justify-between transition-all duration-500 ease-out ${
          isScrolled
            ? 'w-[92%] sm:w-[82%] lg:w-[70%] xl:w-[66%] h-14 sm:h-16 md:h-16 rounded-2xl bg-white/12 backdrop-blur-2xl border border-white/35 shadow-[0_10px_34px_rgba(15,23,42,0.22)]'
            : 'w-full max-w-7xl bg-transparent h-20 sm:h-22 lg:h-24 xl:h-24 rounded-none shadow-none border border-transparent'
        }`}
        aria-label="Main navigation"
      >

        {/* ── Logo ── */}
        <a
          href="#"
          className="relative flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
          aria-label="Endow Tech — back to top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          {/* dark logo for dark backgrounds */}
          <span
            className="block transition-opacity duration-500"
            style={{ opacity: isDarkSurface ? 1 : 0, position: isDarkSurface ? 'relative' : 'absolute', inset: 0 }}
            aria-hidden={!isDarkSurface}
          >
            <div className="relative h-10 w-32 sm:h-11 sm:w-36 md:h-12 md:w-40 lg:h-[3.8rem] lg:w-48 xl:h-[4.2rem] xl:w-56">
              <Image
                src="/images/logo_dark.svg"
                alt="Endow Tech"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </div>
          </span>

          {/* light logo for light backgrounds */}
          <span
            className="block transition-opacity duration-500"
            style={{ opacity: isDarkSurface ? 0 : 1, position: isDarkSurface ? 'absolute' : 'relative', inset: 0 }}
            aria-hidden={isDarkSurface}
          >
            <div className="relative h-10 w-32 sm:h-11 sm:w-36 md:h-12 md:w-40 lg:h-[3.8rem] lg:w-48 xl:h-[4.2rem] xl:w-56">
              <Image
                src="/images/logo_light.svg"
                alt="Endow Tech"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </div>
          </span>
        </a>

        {/* ── CTA ── */}
        <button
          onClick={() => scrollTo('#contact')}
          className={`
            inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold
            cursor-pointer select-none transition-all duration-300 active:scale-[0.97]
            ${isDarkSurface
              ? 'border border-white/25 text-white/90 bg-white/[0.06] hover:bg-white/[0.11] hover:border-white/40'
              : 'bg-[#DC2626] text-white border border-[#DC2626] hover:bg-[#b91c1c] hover:border-[#b91c1c] shadow-sm shadow-red-200'
            }
          `}
        >
          <svg
            width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>Start a Project</span>
        </button>

      </nav>
    </header>
  )
}
