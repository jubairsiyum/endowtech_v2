import React from 'react'
import { testimonials } from '@/data/testimonials'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-padding bg-surface"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <FadeIn className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="code">
            {'// Testimonials & Endorsements'}
          </Badge>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            Trusted by leaders{' '}
            <span className="gradient-text">building the future.</span>
          </h2>
          <p className="mt-4 text-text-muted text-base leading-relaxed">
            Here is what our corporate partners, education directors, and startup founders
            have to say about collaborating with Endow Tech.
          </p>
        </FadeIn>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <FadeIn key={t.author} delay={idx * 0.1}>
              <article className="h-full flex flex-col justify-between rounded-2xl bg-white border border-gray-200/90 p-7 shadow-sm hover:shadow-md transition-all">
                <div>
                  {/* Quote Icon */}
                  <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-sm text-text-primary leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Metadata */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-bold text-sm text-text-primary">
                    {t.author}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {t.role}
                  </div>
                  <div className="text-xs font-semibold text-accent mt-0.5">
                    {t.organization}
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
