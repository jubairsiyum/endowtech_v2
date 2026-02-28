'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  tags: string[]
}

const services: Service[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Web Development',
    description:
      'Full-stack web applications engineered with Next.js, TypeScript, and modern tooling. Pixel-perfect UIs with blazing performance.',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js'],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'SaaS Platforms',
    description:
      'End-to-end SaaS architecture from authentication and billing to dashboards. Built to handle thousands of users from day one.',
    tags: ['SaaS', 'Auth', 'Stripe', 'Prisma'],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    title: 'Student Portal Systems',
    description:
      'Custom academic portals for schools, universities, and EdTech startups. Grade management, attendance, and communication in one system.',
    tags: ['EdTech', 'Portals', 'Dashboards', 'CMS'],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="12" x2="19" y2="16" />
        <line x1="12" y1="12" x2="5" y2="16" />
        <circle cx="19" cy="19" r="3" />
        <circle cx="5" cy="19" r="3" />
      </svg>
    ),
    title: 'API & System Integration',
    description:
      'Seamlessly connect your tools and platforms. REST APIs, third-party service integration, and microservices architecture done right.',
    tags: ['REST', 'GraphQL', 'Webhooks', 'Microservices'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Services() {
  const ref = useRef(null)

  return (
    <section
      id="services"
      className="section-padding"
      aria-labelledby="services-heading"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-accent tracking-widest uppercase">
            What we do
          </span>
          <h2
            id="services-heading"
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            Services built for
            <br />
            <span className="gradient-text">modern teams.</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-lg text-base leading-relaxed">
            From concept to deployment, we handle every layer of your product — 
            design, development, and delivery.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-surface border border-white/5 rounded-2xl p-6 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div className="mb-5 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-text-primary mb-2 leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-md bg-surface-light border border-white/5 text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
