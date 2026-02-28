'use client'

import { motion } from 'framer-motion'

const differentiators = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: 'Student-first thinking',
    description:
      'We understand the education sector deeply, building systems that serve learners, educators, and institutions effectively.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: 'Scale by design',
    description:
      'Architecture decisions are made with growth in mind. Your platform should perform at 100 users and 100,000.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: 'No-bloat engineering',
    description:
      'We write lean, maintainable code. No unnecessary dependencies, no over-engineered solutions — just clean, purposeful code.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: 'Transparent collaboration',
    description:
      'You stay informed at every stage. Regular updates, clear timelines, and honest communication throughout the project.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="section-padding"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-medium text-accent tracking-widest uppercase">
              Who we are
            </span>
            <h2
              id="about-heading"
              className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight"
            >
              Built by builders,
              <br />
              <span className="gradient-text">for builders.</span>
            </h2>

            <p className="mt-6 text-text-muted leading-relaxed text-base">
              Endow Tech is a lean software agency focused on building scalable
              digital products for startups, educational institutions, and
              growing businesses. We combine sharp design with solid engineering
              to deliver software that actually works.
            </p>

            <p className="mt-4 text-text-muted leading-relaxed text-base">
              Our roots are in education technology — we&apos;ve built portals
              and systems used by thousands of students across multiple
              institutions. That experience gives us a unique perspective on
              user-centric design and real-world software performance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.querySelector('#contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-5 py-2.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors duration-200 cursor-pointer"
              >
                Work with us
              </button>
              <button
                onClick={() => {
                  const el = document.querySelector('#portfolio')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-5 py-2.5 text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
              >
                See our work →
              </button>
            </div>
          </motion.div>

          {/* Right column — differentiators */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-4 p-5 rounded-xl bg-surface border border-white/5 group hover:border-accent/20 transition-colors duration-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
