import React from 'react'
import { caseStudies } from '@/data/caseStudies'
import { Badge } from '@/components/ui/Badge'
import { FlowButton } from '@/components/ui/FlowButton'
import { FadeIn } from '@/components/motion/FadeIn'
import { CountUp } from '@/components/motion/CountUp'

export default function CaseStudiesSection() {
  return (
    <section
      id="work"
      className="section-padding bg-surface"
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <Badge variant="code">
              {'// Case Studies & Impact'}
            </Badge>
            <h2
              id="case-studies-heading"
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
            >
              Engineering that delivers{' '}
              <span className="gradient-text">measurable ROI.</span>
            </h2>
            <p className="mt-4 text-text-muted max-w-2xl text-base leading-relaxed">
              Explore how our bespoke software solutions and automated platforms have modernized
              operations, reduced processing time, and accelerated business growth.
            </p>
          </div>
          <div className="shrink-0">
            <FlowButton href="/case-studies" variant="primary" size="md">
              Explore All 5 Case Studies
            </FlowButton>
          </div>
        </FadeIn>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy, idx) => (
            <FadeIn key={caseStudy.id} delay={idx * 0.1}>
              <article className="h-full flex flex-col justify-between rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md hover:border-accent/40 p-8 transition-all duration-300">
                <div>
                  {/* Category & Client Header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-sans font-semibold uppercase tracking-[0.14em] text-accent">
                      {caseStudy.category}
                    </span>
                    <span className="text-xs font-medium text-text-muted bg-gray-100 px-2.5 py-1 rounded-md">
                      Client: {caseStudy.client}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-text-primary mb-3">
                    {caseStudy.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {caseStudy.description}
                  </p>

                  {/* Impact Summary Quote */}
                  <div className="p-4 rounded-xl bg-accent/[0.04] border border-accent/15 mb-6">
                    <div className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.12em] mb-1">
                      Business Outcome:
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      {caseStudy.impact}
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pt-4 border-t border-gray-100">
                    {caseStudy.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-lg sm:text-xl font-extrabold text-text-primary">
                          <CountUp value={m.value} delay={0.1} duration={1.8} />
                        </div>
                        <div className="text-[11px] text-text-muted mt-0.5 leading-tight font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-gray-50 border border-gray-200 text-text-muted font-sans font-medium"
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
