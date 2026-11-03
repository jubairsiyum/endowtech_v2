'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { techCategories } from '@/data/techStack'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion/FadeIn'

function TechCard({ name, icon }: { name: string; icon?: string }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/60 hover:bg-white/[0.08] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/10 cursor-default"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Tech Icon */}
      <div className="relative mb-3.5 flex items-center justify-center w-14 h-14 rounded-xl bg-white/[0.05] border border-white/10 group-hover:border-accent/40 group-hover:bg-white/[0.1] transition-all duration-300">
        {icon && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon}
            alt={`${name} icon`}
            width={44}
            height={44}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-11 h-11 rounded-lg bg-accent/20 text-accent font-bold text-lg flex items-center justify-center font-mono">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* Tech Name */}
      <span className="relative text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-200 text-center tracking-wide">
        {name}
      </span>
    </motion.div>
  )
}

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState('frontend')

  const activeCategory =
    techCategories.find((cat) => cat.id === activeTab) || techCategories[0]

  return (
    <section
      id="tech-stack"
      className="section-padding bg-theme-dark relative overflow-hidden"
      aria-labelledby="tech-stack-heading"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="code">
            {'// Tech Stack'}
          </Badge>
          <h2
            id="tech-stack-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Battle-tested technologies,{' '}
            <span className="gradient-text">proven at scale.</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            From reactive user interfaces and resilient microservices to high-throughput data pipelines and cloud infrastructure.
          </p>
        </FadeIn>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                activeTab === category.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/30 border border-accent scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Category Grid: Only Icon and Name in Each Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
          >
            {activeCategory.techs.map((tech) => (
              <TechCard key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
