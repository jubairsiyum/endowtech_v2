'use client'

import { motion } from 'framer-motion'

interface Project {
  title: string
  description: string
  tags: string[]
  category: string
  color: string
}

const projects: Project[] = [
  {
    title: 'EduFlow LMS',
    description:
      'A full-featured learning management system supporting 5,000+ students. Real-time grade tracking, attendance, and a parent communication module.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
    category: 'Student Portal',
    color: '#3B82F6',
  },
  {
    title: 'LaunchMetrics SaaS',
    description:
      'B2B analytics dashboard with multi-tenant architecture, role-based access, and a live metrics engine processing 1M+ events per day.',
    tags: ['React', 'Node.js', 'Redis', 'AWS'],
    category: 'SaaS Platform',
    color: '#818CF8',
  },
  {
    title: 'ConnectBridge API',
    description:
      'A unified integration layer that synced CRM, payment, and ERP systems for a logistics company — reducing manual data entry by 90%.',
    tags: ['REST API', 'Webhook', 'TypeScript', 'Docker'],
    category: 'API Integration',
    color: '#34D399',
  },
  {
    title: 'ShopSphere Commerce',
    description:
      'Headless e-commerce platform for a retail brand with custom checkout flows, inventory sync, and a dynamic storefront builder.',
    tags: ['Next.js', 'Shopify API', 'Stripe', 'Sanity'],
    category: 'Web Development',
    color: '#F59E0B',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="section-padding"
      aria-labelledby="portfolio-heading"
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
            Our work
          </span>
          <h2
            id="portfolio-heading"
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            Projects we&apos;re
            <br />
            <span className="gradient-text">proud of.</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-lg text-base leading-relaxed">
            A selection of recent work across web platforms, SaaS products, and 
            education technology.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden cursor-default"
            >
              {/* Image placeholder */}
              <div
                className="relative w-full h-48 flex items-center justify-center overflow-hidden"
                style={{ background: `${project.color}10` }}
                aria-hidden="true"
              >
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${project.color}30 1px, transparent 1px),
                      linear-gradient(90deg, ${project.color}30 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Center icon */}
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-2xl font-bold"
                  style={{ background: `${project.color}20`, color: project.color }}
                >
                  {project.title.charAt(0)}
                </div>

                {/* Category badge */}
                <span
                  className="absolute top-4 right-4 px-2.5 py-1 text-xs font-medium rounded-lg"
                  style={{
                    background: `${project.color}20`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-lg bg-surface-light border border-white/5 text-text-muted font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover border accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-text-muted text-sm">
            More projects available on request.{' '}
            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-accent hover:underline cursor-pointer"
            >
              Get in touch →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
