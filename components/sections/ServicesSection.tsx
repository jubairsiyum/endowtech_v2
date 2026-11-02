import React from 'react'
import { coreServices } from '@/data/services'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding bg-surface"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <FadeIn className="mb-16">
          <Badge variant="code">
            {'// Core Capabilities'}
          </Badge>
          <h2
            id="services-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            Full-stack engineering built for{' '}
            <br />
            <span className="gradient-text">scale, speed &amp; reliability.</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl text-base leading-relaxed">
            From greenfield architecture to high-concurrency production platforms,
            we handle every layer of your software product — design, engineering, and continuous SLA delivery.
          </p>
        </FadeIn>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreServices.map((service, idx) => (
            <FadeIn key={service.id} delay={idx * 0.08}>
              <article className="group h-full flex flex-col justify-between rounded-2xl bg-white border border-gray-200/80 p-7 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300">
                <div>
                  {/* Category icon container */}
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-105 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/80 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-gray-50 border border-gray-200 text-text-muted font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
