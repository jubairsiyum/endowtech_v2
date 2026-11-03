import React from 'react'
import { comparisons } from '@/data/comparison'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'

export default function ComparisonSection() {
  return (
    <section
      id="comparison"
      className="section-padding bg-theme-dark relative overflow-hidden"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="code">
            {'// Competitive Advantage'}
          </Badge>
          <h2
            id="comparison-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Where traditional agencies stop,{' '}
            <br />
            <span className="gradient-text">our engineering begins.</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            We don&apos;t just hand off templates and disappear. We engineer mission-critical systems,
            transfer 100% intellectual property, and back our platforms with enterprise SLAs.
          </p>
        </FadeIn>

        {/* Comparison Table Card */}
        <FadeIn delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-gray-300">
                      Evaluation Criteria
                    </th>
                    <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                      Standard Freelancer / Agency
                    </th>
                    <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-accent bg-accent/[0.06]">
                      Endow Tech Standard
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisons.map((row) => (
                    <tr
                      key={row.feature}
                      className={`hover:bg-white/[0.02] transition-colors ${
                        row.highlight ? 'bg-white/[0.01]' : ''
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-sm text-white flex items-center gap-2">
                          <span>{row.feature}</span>
                          {row.highlight && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-accent/20 text-accent border border-accent/30">
                              Crucial
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {row.whyItMatters}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {String(row.others)}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-white bg-accent/[0.02]">
                        <span className="inline-flex items-center gap-2 text-accent">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{String(row.endowTech)}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
