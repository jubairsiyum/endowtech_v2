import React from 'react'
import { siteConfig } from '@/data/siteConfig'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'
import { FlowButton } from '@/components/ui/FlowButton'

export default function GlobalPresence() {
  return (
    <section
      id="about"
      className="section-padding bg-surface"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div>
            <FadeIn>
              <Badge variant="code">
                {'// Global Footprint & Identity'}
              </Badge>
              <h2
                id="about-heading"
                className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight"
              >
                Built in Dhaka.{' '}
                <br />
                <span className="gradient-text">Headquartered in Seoul.</span>
              </h2>
              <p className="mt-6 text-text-muted text-base leading-relaxed">
                Endow Tech bridges global strategy with top-tier engineering talent.
                As the technological foundation of <strong>Endow Corporation</strong>, our systems
                serve international education pipelines connecting students with premier academic
                institutions in South Korea, Finland, and beyond.
              </p>
              <p className="mt-4 text-text-muted text-base leading-relaxed">
                We believe in <strong>purposeful engineering</strong>: no bloatware, no cutting corners on
                security, and no fragile hacks. Whether we are building internal platforms for our parent
                company or launching MVPs for startup founders, we build with long-term durability in mind.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <FlowButton
                  text="Work With Our Engineers"
                  href="#contact"
                  variant="primary"
                  size="md"
                />
                <FlowButton
                  text="Explore Our Work"
                  href="#products"
                  variant="outline"
                  size="md"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Office Hubs */}
          <div className="space-y-6">
            {siteConfig.offices.map((office, idx) => (
              <FadeIn key={office.city} delay={idx * 0.15}>
                <div className="p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans font-bold uppercase tracking-[0.12em] text-accent">
                      {office.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {office.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {office.city}, {office.country}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    {office.address}
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 text-xs font-sans font-medium tabular-nums text-text-muted">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{office.phone}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
