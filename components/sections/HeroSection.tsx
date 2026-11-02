"use client";

import DotGrid from "@/components/DotGrid";
import { siteConfig } from "@/data/siteConfig";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const TICKER_CLIENTS = [
  "Endow Global Education",
  "EduFlow LMS",
  "UniMatch AI",
  "LeadFlow CRM",
  "Seoul Tech Hub",
  "Finland Student Desk",
  "LaunchMetrics",
  "ConnectBridge API",
  "Global Tuition Settlement",
];
const TICKER_ITEMS = [...TICKER_CLIENTS, ...TICKER_CLIENTS, ...TICKER_CLIENTS];

export default function HeroSection({
  onOpenScheduler,
}: {
  onOpenScheduler?: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Direct DOM style updates for cursor glow: ZERO React re-renders!
  useEffect(() => {
    const el = sectionRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      glow.style.opacity = "1";
      glow.style.background = `radial-gradient(circle 380px at ${x}px ${y}px, rgba(220,38,38,0.14) 0%, rgba(220,38,38,0.03) 60%, transparent 100%)`;
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const scroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col bg-[#0A0A0B] overflow-hidden min-h-[92vh] justify-between pt-24 sm:pt-28"
      aria-label="Hero section"
    >
      {/* ── Layer 1: Optimized Hardware-Accelerated Dot Grid Canvas ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <DotGrid
          dotSize={3}
          gap={18}
          baseColor="#222224"
          activeColor="#DC2626"
          proximity={140}
          speedTrigger={80}
          shockRadius={220}
          shockStrength={4}
          maxSpeed={4000}
          resistance={800}
          returnDuration={1.8}
        />
      </div>

      {/* ── Layer 2: Fast CSS Radial Cursor Glow (No React re-renders) ── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0"
        aria-hidden="true"
      />

      {/* ── Layer 3: Edge Vignettes ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 25%, #0A0A0B 80%), linear-gradient(to bottom, #0A0A0B 0%, transparent 12%, transparent 88%, #0A0A0B 100%)",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-12 my-auto">
        <div className="max-w-5xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/[0.08] border border-accent/30 text-accent font-mono text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {siteConfig.parentCompany.name} Venture
            </span>
            <span className="text-gray-400 text-xs font-medium hidden sm:inline">
              Seoul HQ · Dhaka Tech Hub
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mb-6 font-black leading-[0.95] tracking-tight text-white uppercase text-[clamp(2.5rem,6.5vw,5.5rem)]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
              >
                Building Software
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2">
              <motion.span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, #ff6b6b 0%, #DC2626 40%, #ffffff 85%)",
                }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.22 }}
              >
                That Scales Real Impact.
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-10"
          >
            We are the software and product engineering studio behind global
            academic portals, automated admissions pipelines, and
            mission-critical SaaS architectures. Engineered with modern Next.js,
            TypeScript, and clean cloud systems.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <button
              onClick={() => scroll("#contact")}
              className="px-8 py-3.5 text-sm font-bold text-white bg-accent rounded-xl hover:bg-accent-hover shadow-lg shadow-red-950/40 hover:shadow-accent/40 active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5"
            >
              <span>Start a Project</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7h9m0 0L8 3.5M11.5 7 8 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => scroll("#products")}
              className="px-6 py-3.5 text-sm font-semibold text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Flagship Products</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {onOpenScheduler && (
              <button
                onClick={onOpenScheduler}
                className="px-5 py-3.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Book a Call</span>
              </button>
            )}
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                5,000+
              </div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                Students & Users Served
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                99.98%
              </div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                Production Uptime
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-accent">
                2-Week
              </div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                Agile Sprint Cadence
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CLIENT / PRODUCT MARQUEE TICKER ── */}
      <div className="relative z-10 w-full border-t border-b border-white/[0.08] bg-[#0A0A0B]/80 backdrop-blur-sm overflow-hidden py-3.5">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0A0A0B] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0A0A0B] to-transparent" />

        <div className="hero-ticker flex whitespace-nowrap w-max">
          {TICKER_ITEMS.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-6 px-6 text-xs font-semibold tracking-widest uppercase text-white/50 select-none"
            >
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
