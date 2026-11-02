import React from 'react'
import { faqItems } from '@/data/faq'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { FadeIn } from '@/components/motion/FadeIn'

export default function FAQSection() {
  const accordionItems = faqItems.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }))

  return (
    <section
      id="faq"
      className="section-padding bg-[#0A0A0B] relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-14">
          <Badge variant="code">
            {'// Frequently Asked Questions'}
          </Badge>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Everything you need to know{' '}
            <span className="gradient-text">before partnering.</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Have questions about our engagement models, IP ownership, or development sprint cadences?
            Here are honest, transparent answers.
          </p>
        </FadeIn>

        {/* Interactive Accordion */}
        <FadeIn delay={0.15}>
          <Accordion items={accordionItems} />
        </FadeIn>

        {/* Still have questions prompt */}
        <FadeIn delay={0.25} className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Have a custom requirement or technical question?{' '}
            <a
              href="#contact"
              className="text-accent font-semibold hover:underline cursor-pointer"
            >
              Reach out directly →
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
