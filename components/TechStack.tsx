'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Tech {
  name: string
  icon?: string
}

interface TechCategory {
  id: string
  label: string
  techs: Tech[]
}

const techCategories: TechCategory[] = [
    {
        id: 'backend',
        label: 'Backend',
        techs: [
          { name: 'PHP',         icon: 'https://skillicons.dev/icons?i=php' },
          { name: 'Laravel',     icon: 'https://skillicons.dev/icons?i=laravel' },
          { name: 'Node.js',     icon: 'https://skillicons.dev/icons?i=nodejs' },
          { name: 'Express.js',  icon: 'https://skillicons.dev/icons?i=express' },
          { name: 'NestJS',      icon: 'https://skillicons.dev/icons?i=nestjs' },
          { name: 'Python',      icon: 'https://skillicons.dev/icons?i=python' },
          { name: 'Django',      icon: 'https://skillicons.dev/icons?i=django' },
          { name: 'FastAPI',     icon: 'https://skillicons.dev/icons?i=fastapi' },
          { name: 'GraphQL',     icon: 'https://skillicons.dev/icons?i=graphql' },
          { name: 'Go',          icon: 'https://skillicons.dev/icons?i=go' },
          { name: 'Spring Boot', icon: 'https://skillicons.dev/icons?i=spring' }, 
        ],
      },
    {
      id: 'frontend',
      label: 'Frontend',
      techs: [
        { name: 'React',          icon: 'https://skillicons.dev/icons?i=react' },
        { name: 'Next.js',        icon: 'https://skillicons.dev/icons?i=nextjs' },
        { name: 'Vue.js',         icon: 'https://skillicons.dev/icons?i=vue' },          // emphasized as you mentioned Vue
        { name: 'TypeScript',     icon: 'https://skillicons.dev/icons?i=ts' },
        { name: 'JavaScript',     icon: 'https://skillicons.dev/icons?i=js' },
        { name: 'Tailwind CSS',   icon: 'https://skillicons.dev/icons?i=tailwind' },
        { name: 'Redux',          icon: 'https://skillicons.dev/icons?i=redux' },
        { name: 'Framer Motion',  icon: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg' },
        // Hot 2026 additions (rising/gaining traction)
        { name: 'Svelte',         icon: 'https://skillicons.dev/icons?i=svelte' },       // lightweight, performant – very hot now
        { name: 'Astro',          icon: 'https://skillicons.dev/icons?i=astro' },        // content/marketing sites
      ],
    },
    
    {
      id: 'database',
      label: 'Database',
      techs: [
        { name: 'PostgreSQL',  icon: 'https://skillicons.dev/icons?i=postgresql' },
        { name: 'MongoDB',     icon: 'https://skillicons.dev/icons?i=mongodb' },
        { name: 'MySQL',       icon: 'https://skillicons.dev/icons?i=mysql' },
        { name: 'Redis',       icon: 'https://skillicons.dev/icons?i=redis' },
        { name: 'Prisma',      icon: 'https://skillicons.dev/icons?i=prisma' },
        { name: 'Supabase',    icon: 'https://skillicons.dev/icons?i=supabase' },
      ],
    },
    {
      id: 'cloud',
      label: 'Cloud & DevOps',
      techs: [
        { name: 'AWS',             icon: 'https://skillicons.dev/icons?i=aws' },
        { name: 'Azure',           icon: 'https://skillicons.dev/icons?i=azure' },          // added as requested
        { name: 'Digital Ocean',   icon: 'https://www.vectorlogo.zone/logos/digitalocean/digitalocean-tile.svg' },   // added – developer-friendly cloud
        { name: 'Vercel',          icon: 'https://skillicons.dev/icons?i=vercel' },
        { name: 'Docker',          icon: 'https://skillicons.dev/icons?i=docker' },
        { name: 'Kubernetes',      icon: 'https://skillicons.dev/icons?i=kubernetes' },
        { name: 'GitHub Actions',  icon: 'https://skillicons.dev/icons?i=githubactions' },
        { name: 'Terraform',       icon: 'https://skillicons.dev/icons?i=terraform' },
        { name: 'Jenkins',         icon: 'https://skillicons.dev/icons?i=jenkins' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools & Design',
      techs: [
        { name: 'Git',       icon: 'https://skillicons.dev/icons?i=git' },
        { name: 'Jest',      icon: 'https://skillicons.dev/icons?i=jest' },
        { name: 'Cypress',   icon: 'https://skillicons.dev/icons?i=cypress' },
        { name: 'Postman',   icon: 'https://skillicons.dev/icons?i=postman' },
        { name: 'Figma',     icon: 'https://skillicons.dev/icons?i=figma' },
        { name: 'VS Code',   icon: 'https://skillicons.dev/icons?i=vscode' },
        // New CMS/page builder additions you requested (common in portfolios)
        { name: 'WordPress', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg' },
        { name: 'Elementor', icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/elementor-icon.svg' },   // note: skillicons has limited, fallback ok
        { name: 'Divi',      icon: 'https://schoolswp.com/wp-content/uploads/2020/11/logo_divi.png' },        // may not have exact, but close enough or custom
      ],
    },
  ];





const TechIcon = ({ name, icon }: { name: string; icon?: string }) => {
  if (icon) {
    return (
      <img
        src={icon}
        alt={`${name} icon`}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
      />
    )
  }
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-sm sm:text-base font-bold text-white">
      {name.charAt(0)}
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('frontend')

  const activeCategory = techCategories.find((cat) => cat.id === activeTab)

  return (
    <section
      id="tech-stack"
      className="section-padding bg-[#0A0A0B] relative overflow-hidden"
      aria-labelledby="tech-stack-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="section-subtitle text-xs tracking-widest uppercase">
            // tech stack
          </span>
          <h2
            id="tech-stack-heading"
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Modern tech stack,
            <br />
            <span className="gradient-text">battle-tested tools.</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            We build with proven technologies that scale. From frontend to backend,
            our stack is designed for performance, maintainability, and speed.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {techCategories.map((category) => (
            <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === category.id
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 border border-red-600'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {category.label}
          </button>
          ))}
        </motion.div>

        {/* Tech grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {activeCategory?.techs.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-default overflow-hidden hover:border-accent/60 hover:bg-white/10 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative flex flex-col items-center gap-3 text-center">
                  <TechIcon name={tech.name} icon={tech.icon} />
                  <h3 className="text-sm font-semibold text-white group-hover:text-accent transition-colors duration-300">
                    {tech.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
