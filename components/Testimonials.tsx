'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Endow Tech transformed our legacy student portal into a modern, responsive platform. The attention to detail and clean code made future updates effortless.",
    author: 'Rajesh Kumar',
    role: 'IT Director',
    company: 'Vidyalaya Institute',
  },
  {
    quote:
      "Working with Endow Tech felt like having an extension of our team. They delivered a SaaS MVP in 8 weeks that our investors loved.",
    author: 'Sarah Chen',
    role: 'Founder & CEO',
    company: 'LaunchMetrics',
  },
  {
    quote:
      "The team's expertise in education technology is unmatched. They understood our workflows immediately and built exactly what we needed.",
    author: 'Michael Thompson',
    role: 'Principal',
    company: 'Horizon Academy',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding bg-surface"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-medium text-accent tracking-widest uppercase">
            Client feedback
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            Trusted by teams
            <br />
            <span className="gradient-text">building the future.</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto text-base leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our clients 
            have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.author}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white border border-gray-100 rounded-2xl p-7 cursor-default shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Content */}
              <div className="relative">
                {/* Quote icon */}
                <div className="mb-5 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>

                {/* Quote */}
                <blockquote className="mb-6">
                  <p className="text-text-primary leading-relaxed text-sm">
                    {testimonial.quote}
                  </p>
                </blockquote>

                {/* Author */}
                <div className="border-t border-gray-100 pt-4">
                  <cite className="not-italic">
                    <div className="font-semibold text-text-primary text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-accent mt-0.5 font-medium">
                      {testimonial.company}
                    </div>
                  </cite>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
