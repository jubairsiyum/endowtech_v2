import React from 'react'
import { flagshipProducts } from '@/data/products'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'

export default function FlagshipProducts() {
  return (
    <section
      id="products"
      className="section-padding bg-[#0A0A0B] relative overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="code">
            {'// Flagship Platforms'}
          </Badge>
          <h2
            id="products-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Real products powering{' '}
            <span className="gradient-text">thousands of journeys.</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
            We don’t just write software for clients — we engineer, launch, and operate
            high-volume production platforms that streamline international admissions,
            automate decision logic, and manage global student operations.
          </p>
        </FadeIn>

        {/* Product Cards Stack */}
        <div className="flex flex-col gap-10">
          {flagshipProducts.map((product, idx) => (
            <FadeIn key={product.id} delay={idx * 0.1}>
              <article className="group relative rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 backdrop-blur-md p-7 sm:p-10 transition-all duration-300 overflow-hidden">
                {/* Accent glow corner */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: product.accentColor }}
                />

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between">
                  {/* Left Column: Info & Features */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase"
                        style={{
                          backgroundColor: `${product.accentColor}18`,
                          color: product.accentColor,
                          border: `1px solid ${product.accentColor}40`,
                        }}
                      >
                        {product.badge}
                      </span>
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        Category: {product.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                      {product.title}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-accent mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Feature bullet points */}
                    <div className="space-y-2.5 mb-6">
                      {product.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                          <svg
                            className="w-4 h-4 mt-0.5 shrink-0"
                            style={{ color: product.accentColor }}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-400 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Metrics & Stats Box */}
                  <div className="lg:w-80 shrink-0 flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-white/[0.03] border border-white/10">
                    <div>
                      <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                        Verified Impact Metrics
                      </div>
                      <div className="space-y-4">
                        {product.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: product.accentColor }}
                            />
                            <span className="text-sm font-semibold text-white">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <a
                        href="#contact"
                        className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <span>Request System Demo</span>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7h9m0 0L8 3.5M11.5 7 8 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
