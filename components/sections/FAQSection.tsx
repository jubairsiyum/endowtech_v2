'use client'

import React, { useState } from 'react'
import { faqItems } from '@/data/faq'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

/* ── Light-themed Accordion (designed for white/light bg) ── */

interface AccordionLightItem {
  id: string
  title: string
  content: string
}

function AccordionLight({ items, className }: { items: AccordionLightItem[]; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <div
            key={item.id}
            className={cn(
              'rounded-xl border transition-colors duration-200 overflow-hidden',
              isOpen
                ? 'bg-gray-50 border-gray-300'
                : 'bg-white border-gray-200 hover:border-gray-300'
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="text-base sm:text-lg font-semibold text-text-primary pr-4">
                {item.title}
              </span>
              <span
                className={cn(
                  'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-transform duration-200',
                  isOpen
                    ? 'border-accent/40 bg-accent/10 text-accent rotate-180'
                    : 'border-gray-200 bg-gray-50 text-gray-400 rotate-0'
                )}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-sm sm:text-base text-text-muted leading-relaxed border-t border-gray-200 pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ── FAQ Section (Light theme) ── */

export default function FAQSection() {
  const accordionItems = faqItems.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }))

  return (
    <section
      id="faq"
      className="section-padding bg-white relative overflow-hidden"
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
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
          >
            Everything you need to know{' '}
            <span className="gradient-text">before partnering.</span>
          </h2>
          <p className="mt-4 text-text-muted text-base leading-relaxed">
            Have questions about our engagement models, IP ownership, or development sprint cadences?
            Here are honest, transparent answers.
          </p>
        </FadeIn>

        {/* Interactive Accordion — light theme */}
        <FadeIn delay={0.15}>
          <AccordionLight items={accordionItems} />
        </FadeIn>

        {/* Still have questions prompt */}
        <FadeIn delay={0.25} className="mt-12 text-center">
          <p className="text-sm text-text-muted">
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
