'use client'

import { motion } from 'framer-motion'

interface Industry {
  name: string
  value: number
}

const industries: Industry[] = [
  { name: 'FinTech',          value: 95},
  { name: 'SaaS / B2B',       value: 92},
  { name: 'E-commerce',       value: 88},
  { name: 'Healthcare',       value: 82},
  { name: 'Logistics',        value: 85},
  { name: 'EdTech',           value: 90},
  { name: 'Gaming',           value: 78},
  { name: 'Enterprise',       value: 80},
  { name: 'PropTech',         value: 75},
  { name: 'Gov / Public',     value: 70},
]

export default function IndustryCoverage() {
  const numAxes = industries.length
  const angleStep = (2 * Math.PI) / numAxes
  const radius = 135
  const centerX = 200
  const centerY = 200
  const labelDistance = radius + 48   // slightly tighter

  const points = industries.map((industry, i) => {
    const angle = i * angleStep - Math.PI / 2
    const dist = (industry.value / 100) * radius
    const x = centerX + dist * Math.cos(angle)
    const y = centerY + dist * Math.sin(angle)
    return `${x},${y}`
  }).join(' ')

  const gridLevels = [20, 40, 60, 80, 100]

  return (
    <section
      id="industry-coverage"
      className="section-padding bg-surface"
      aria-labelledby="industry-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-subtitle text-xs tracking-widest uppercase text-accent/80">
            Backend Expertise
          </span>
          <h2
            id="industry-heading"
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            Industries we empower
            <br />
            <span className="gradient-text">with scalable backends</span>
          </h2>
          <p className="mt-5 text-text-muted max-w-3xl mx-auto text-base leading-relaxed">
            Proven expertise in building secure, high-performance APIs, microservices, and data systems across demanding sectors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <div className="relative w-[500px] h-[500px] sm:w-[580px] sm:h-[580px] md:w-[640px] md:h-[640px]">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              aria-label="Industry expertise radar chart"
            >
              {/* Grid – kept subtle */}
              {gridLevels.map((level) => (
                <circle
                  key={level}
                  cx={centerX}
                  cy={centerY}
                  r={(level / 100) * radius}
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-700/30 dark:text-gray-600/30"
                  strokeWidth="1.2"
                />
              ))}

              {industries.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2
                const x = centerX + radius * Math.cos(angle)
                const y = centerY + radius * Math.sin(angle)
                return (
                  <line
                    key={i}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    className="text-gray-700/30 dark:text-gray-600/30"
                    strokeWidth="1.2"
                  />
                )
              })}

              {/* Solid polygon with thinner red border */}
              <defs>
                <radialGradient id="polygonGradient" cx="50%" cy="50%" r="100%">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.10" />
                </radialGradient>
              </defs>

              <motion.polygon
                points={points}
                fill="url(#polygonGradient)"
                stroke="#DC2626"
                strokeWidth="2"                    // ← thinner border
                strokeOpacity="0.9"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 3px 10px rgba(220,38,38,0.18))' }}
              />

              {/* Data points – slightly smaller */}
              {industries.map((industry, i) => {
                const angle = i * angleStep - Math.PI / 2
                const x = centerX + (industry.value / 100) * radius * Math.cos(angle)
                const y = centerY + (industry.value / 100) * radius * Math.sin(angle)
                return (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4.5"
                    fill="#DC2626"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.07 }}
                  />
                )
              })}

              {/* Smaller text sizes */}
              {industries.map((industry, i) => {
                const angle = i * angleStep - Math.PI / 2
                const x = centerX + labelDistance * Math.cos(angle)
                const y = centerY + labelDistance * Math.sin(angle)

                const rotation = (angle * 180 / Math.PI) + 90
                const textRotation = rotation > 90 && rotation < 270 ? rotation + 180 : rotation
                const textAnchor = rotation > 90 && rotation < 270 ? 'end' : 'start'

                return (
                  <g key={i}>
                    {/* Smaller icon */}
                    <text
                      x={x}
                      y={y - 14}
                      textAnchor="middle"
                      className="text-base fill-gray-500/70"   // ↓ from text-lg to text-base
                    >
                      {industry.icon}
                    </text>

                    {/* Industry name – smaller & lighter */}
                    <text
                      x={x}
                      y={y + 1}
                      textAnchor={textAnchor as any}
                      dominantBaseline="middle"
                      className="text-xs font-medium fill-text-primary"   // ↓ text-sm → text-xs
                      transform={`rotate(${textRotation}, ${x}, ${y})`}
                    >
                      {industry.name}
                    </text>

                    {/* Percentage – smaller */}
                    <text
                      x={x}
                      y={y + 16}
                      textAnchor={textAnchor as any}
                      className="text-xs font-semibold fill-[#DC2626]/95"   // ↓ text-sm → text-xs
                      transform={`rotate(${textRotation}, ${x}, ${y})`}
                    >
                      {industry.value}%
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}