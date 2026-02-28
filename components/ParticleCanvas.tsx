'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  alpha: number
  color: string
  pulseOffset: number
  pulseSpeed: number
}

const COLORS = [
  'rgba(220,38,38,',   // accent red
  'rgba(239,68,68,',   // red-500
  'rgba(248,113,113,', // red-400
  'rgba(185,28,28,',   // red-700
  'rgba(150,150,160,', // neutral
]

function initParticles(width: number, height: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.5 + 1,
      baseRadius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      color,
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }
  })
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false })
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)

    const count = Math.floor((w * h) / 8000)
    particlesRef.current = initParticles(w, h, Math.min(count, 130))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside: true,
      }
    }
    const onMouseLeave = () => { mouseRef.current.inside = false }
    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        inside: true,
      }
    }

    // Click burst: scatter nearby particles
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      particlesRef.current.forEach((p) => {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          const force = (180 - dist) / 180
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * 6
          p.vy += Math.sin(angle) * force * 6
        }
      })
    }

    canvas.addEventListener('mousemove', onMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('click', onClick)

    const CONNECT_DIST = 120
    const MOUSE_ATTRACT_DIST = 200
    const ATTRACT_FORCE = 0.018
    const MAX_SPEED = 3.5
    const FRICTION = 0.96

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      timeRef.current += 1

      ctx.clearRect(0, 0, w, h)

      const mouse = mouseRef.current
      const particles = particlesRef.current

      // ── cursor glow spotlight ──────────────────────────────
      if (mouse.inside) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
        grd.addColorStop(0, 'rgba(220,38,38,0.10)')
        grd.addColorStop(0.5, 'rgba(220,38,38,0.04)')
        grd.addColorStop(1, 'rgba(220,38,38,0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── update + draw particles ────────────────────────────
      particles.forEach((p) => {
        // Mouse attraction / repulsion
        if (mouse.inside) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_ATTRACT_DIST && dist > 1) {
            const force = ATTRACT_FORCE * (1 - dist / MOUSE_ATTRACT_DIST)
            p.vx += (dx / dist) * force * 12
            p.vy += (dy / dist) * force * 12
          }
        }

        // Speed cap + friction
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }
        p.vx *= FRICTION
        p.vy *= FRICTION

        // Position
        p.x += p.vx
        p.y += p.vy

        // Wall bounce with gentle nudge back
        if (p.x < 0) { p.x = 0; p.vx *= -0.7 }
        if (p.x > w) { p.x = w; p.vx *= -0.7 }
        if (p.y < 0) { p.y = 0; p.vy *= -0.7 }
        if (p.y > h) { p.y = h; p.vy *= -0.7 }

        // Pulse radius
        const pulse = Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset)
        p.radius = p.baseRadius + pulse * 0.6

        // Draw particle with inner glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
        grd.addColorStop(0, p.color + (p.alpha + 0.3) + ')')
        grd.addColorStop(0.5, p.color + p.alpha + ')')
        grd.addColorStop(1, p.color + '0)')

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color + (p.alpha + 0.4) + ')'
        ctx.fill()
      })

      // ── draw connection lines ──────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]

        // Line from mouse to nearby particles
        if (mouse.inside) {
          const mdx = mouse.x - a.x
          const mdy = mouse.y - a.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < MOUSE_ATTRACT_DIST) {
            const alpha = (1 - mdist / MOUSE_ATTRACT_DIST) * 0.35
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(220,38,38,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Lines between particles
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(180,30,30,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // ── cursor dot ────────────────────────────────────────
      if (mouse.inside) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(220,38,38,0.85)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(220,38,38,0.35)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('click', onClick)
    }
  }, [resize])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'none' }}
      aria-hidden="true"
    />
  )
}
