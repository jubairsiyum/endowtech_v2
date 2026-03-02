'use client'

import { motion } from 'framer-motion'

interface ComparisonRow {
  feature: string
  others: boolean | string
  us: boolean | string
  highlight?: boolean
}

const comparisons: ComparisonRow[] = [
  {
    feature: 'Custom Software Development',
    others: true,
    us: true,
  },
  {
    feature: 'Ongoing Maintenance & Support',
    others: 'Limited',
    us: true,
    highlight: true,
  },
  {
    feature: 'Cloud Infrastructure Management',
    others: false,
    us: true,
    highlight: true,
  },
  {
    feature: 'Performance Optimization',
    others: 'Basic',
    us: 'Advanced',
    highlight: true,
  },
  {
    feature: 'Security Audits & Compliance',
    others: false,
    us: true,
    highlight: true,
  },
  {
    feature: 'Real-time Monitoring & Analytics',
    others: false,
    us: true,
    highlight: true,
  },
  {
    feature: 'Scalability Planning',
    others: 'Basic',
    us: 'Enterprise-grade',
    highlight: true,
  },
  {
    feature: 'Technology Consulting',
    others: true,
    us: true,
  },
  {
    feature: 'Dedicated Account Manager',
    others: false,
    us: true,
    highlight: true,
  },
  {
    feature: 'Post-Launch Growth Strategy',
    others: false,
    us: true,
    highlight: true,
  },
]

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
    <path
      d="M8 12.5l2.5 2.5L16 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CrossIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
    <path
      d="M9 9l6 6M15 9l-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export default function ComparisonTable() {
  return (
    <section
      id="comparison"
      className="section-padding bg-[#0A0A0B] relative overflow-hidden"
      aria-labelledby="comparison-heading"
    >
      {/* Ambient decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="section-subtitle text-xs tracking-widest uppercase">
            Why choose us
          </span>
          <h2
            id="comparison-heading"
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Where Others Stop,
            <br />
            <span className="gradient-text">We Continue.</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            We don't just build your product — we ensure it thrives long after launch.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">
                    Other Agencies
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-accent bg-accent/5">
                    Endow Tech
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      row.highlight ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        {row.feature}
                        {row.highlight && (
                          <span className="px-2 py-0.5 text-xs font-medium text-accent bg-accent/10 rounded-full">
                            Key
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.others === 'boolean' ? (
                        row.others ? (
                          <div className="flex justify-center text-green-500">
                            <CheckIcon />
                          </div>
                        ) : (
                          <div className="flex justify-center text-gray-600">
                            <CrossIcon />
                          </div>
                        )
                      ) : (
                        <span className="text-sm text-gray-400">{row.others}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center bg-accent/[0.02]">
                      {typeof row.us === 'boolean' ? (
                        row.us ? (
                          <div className="flex justify-center text-accent">
                            <CheckIcon />
                          </div>
                        ) : (
                          <div className="flex justify-center text-gray-600">
                            <CrossIcon />
                          </div>
                        )
                      ) : (
                        <span className="text-sm font-medium text-white">{row.us}</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
          >
            Get Started Today
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
