import React from 'react'
import { siteConfig } from '@/data/siteConfig'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'

export default function TrustEcosystem() {
  return (
    <section className="bg-surface py-16 sm:py-20 border-b border-gray-200/80">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left description */}
          <div className="max-w-2xl">
            <FadeIn>
              <Badge variant="code">
                {'// Corporate Ecosystem'}
              </Badge>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                An international technology wing backed by{' '}
                <span className="text-accent">{siteConfig.parentCompany.name}</span>.
              </h2>
              <p className="mt-3 text-text-muted text-sm sm:text-base leading-relaxed">
                Headquartered in Seoul, South Korea, with regional operations in Dhaka,
                Endow Corporation operates across higher education consultancy, international mobility,
                and digital systems. Endow Tech delivers the mission-critical software powering this global ecosystem.
              </p>
            </FadeIn>
          </div>

          {/* Right badges & stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
            <FadeIn delay={0.1} className="p-5 rounded-xl bg-white border border-gray-200/70 shadow-sm">
              <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">Corporate HQ</div>
              <div className="text-lg font-bold text-text-primary mt-1">Seoul, South Korea</div>
              <div className="text-xs text-text-muted mt-0.5">Strategy & Global Partnerships</div>
            </FadeIn>

            <FadeIn delay={0.2} className="p-5 rounded-xl bg-white border border-gray-200/70 shadow-sm">
              <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">Tech & Ops Hub</div>
              <div className="text-lg font-bold text-text-primary mt-1">Dhaka, Bangladesh</div>
              <div className="text-xs text-text-muted mt-0.5">Shyamoli Square · Engineering Hub</div>
            </FadeIn>

            <FadeIn delay={0.3} className="p-5 rounded-xl bg-white border border-gray-200/70 shadow-sm">
              <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">Specializations</div>
              <div className="text-lg font-bold text-text-primary mt-1">South Korea &amp; Finland</div>
              <div className="text-xs text-text-muted mt-0.5">Higher Education &amp; Visa Systems</div>
            </FadeIn>

            <FadeIn delay={0.4} className="p-5 rounded-xl bg-white border border-gray-200/70 shadow-sm">
              <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">Engineering SLA</div>
              <div className="text-lg font-bold text-text-primary mt-1">99.9% Uptime Guarantee</div>
              <div className="text-xs text-text-muted mt-0.5">Enterprise Cloud Availability</div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
