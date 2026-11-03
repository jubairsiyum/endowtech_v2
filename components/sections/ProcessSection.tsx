import React from 'react'
import { engineeringProcess } from '@/data/process'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="section-padding bg-theme-dark relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="code">
            {'// Engineering Methodology'}
          </Badge>
          <h2
            id="process-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            How we take products from{' '}
            <span className="gradient-text">blueprint to production.</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            No guesswork, no missed deadlines, no technical debt. Our 4-stage engineering
            lifecycle guarantees transparency, code quality, and predictable milestones.
          </p>
        </FadeIn>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringProcess.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.1}>
              <div className="relative h-full flex flex-col justify-between rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300">
                <div>
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black font-mono text-accent">
                      {step.number}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
                    {step.phase}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Box */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-2">
                    Key Outputs:
                  </div>
                  {step.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-300">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
