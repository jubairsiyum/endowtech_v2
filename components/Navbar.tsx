'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  // true  = hero is visible  → transparent navbar, dark-bg logo
  // false = scrolled past hero → white navbar, light-bg logo
  const [onHero, setOnHero] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      // trigger as soon as the hero starts leaving the top edge
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        onHero
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_24px_rgba(0,0,0,0.06)]'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-[72px] flex items-center justify-between"
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
          {/* logo for dark hero bg */}
          <span
            className="block transition-opacity duration-500"
            style={{ opacity: onHero ? 1 : 0, position: onHero ? 'relative' : 'absolute', inset: 0 }}
            aria-hidden={!onHero}
          >
            <Image
              src="/images/logo_dark.png"
              alt="Endow Tech"
              width={148}
              height={48}
              style={{ objectFit: 'contain', height: '38px', width: 'auto' }}
              priority
            />
          </span>

          {/* logo for white scrolled bg */}
          <span
            className="block transition-opacity duration-500"
            style={{ opacity: onHero ? 0 : 1, position: onHero ? 'absolute' : 'relative', inset: 0 }}
            aria-hidden={onHero}
          >
            <Image
              src="/images/logo_light.png"
              alt="Endow Tech"
              width={148}
              height={48}
              style={{ objectFit: 'contain', height: '38px', width: 'auto' }}
              priority
            />
          </span>
        </a>

        {/* ── CTA ── */}
        <button
          onClick={() => scrollTo('#contact')}
          className={`
            inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold
            cursor-pointer select-none transition-all duration-300 active:scale-[0.97]
            ${onHero
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
