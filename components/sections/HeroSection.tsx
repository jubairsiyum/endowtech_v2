"use client";

import DotGrid from "@/components/DotGrid";
import TechText from "@/components/TechText";
import TextLoop from "@/components/TextLoop";
import { siteConfig } from "@/data/siteConfig";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

const LOOP_TEXT = TICKER_CLIENTS.join(" ✦ ");

const TRUST_SCORES = [
  {
    value: "5,000+",
    label: "Students & Users Served",
    desc: "Global Academic & Mobility Portals",
  },
  {
    value: "99.98%",
    label: "Production Uptime",
    desc: "Enterprise Cloud Systems",
  },
  {
    value: "2-Week",
    label: "Agile Sprint Cadence",
    desc: "Rapid Continuous Delivery",
  },
  {
    value: "99.9%",
    label: "Enterprise SLA Guarantee",
    desc: "Mission-Critical Systems SLA",
  },
];

export default function HeroSection({
  onOpenScheduler,
}: {
  onOpenScheduler?: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Parallax scroll transforms: hero stays pinned while stats scroll up, text scales down to 0.94 and opacity to 50%
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.98]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);

  // Direct DOM style updates for cursor glow: ZERO React re-renders!
  useEffect(() => {
    const el = stickyRef.current;
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
      className="relative bg-theme-dark"
      aria-label="Hero section"
    >
      {/* ── STICKY HERO VIEWPORT (Hero section won't scroll) ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 z-10 w-full flex flex-col justify-between pt-24 sm:pt-28 overflow-hidden"
      >
        {/* ── Layer 1: Optimized Hardware-Accelerated Dot Grid Canvas ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <DotGrid
            dotSize={3}
            gap={18}
            baseColor="#5C1010"
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
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 25%, var(--dark-bg) 80%), linear-gradient(to bottom, var(--dark-bg) 0%, transparent 12%, transparent 88%, var(--dark-bg) 100%)",
          }}
        />

        {/* ── MAIN CONTENT (HERO TEXT SCALES DOWN & OPACITY DECREASES TO 50%, POSITION PRESERVED) ── */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-6 sm:py-6 mt-20">
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              transformOrigin: "left center",
            }}
            className="max-w-5xl"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-3 sm:mb-4 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/[0.08] border border-accent/30 text-accent font-mono text-xs font-semibold uppercase tracking-wider">
                {siteConfig.parentCompany.name} Venture
              </span>
              <span className="text-gray-400 text-xs font-medium hidden sm:inline">
                Seoul HQ · Dhaka Tech Hub
              </span>
            </motion.div>

            {/* Headline - Interactive TechText Blueprint Canvas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
              className="mb-3 sm:mb-4 max-w-5xl select-none"
            >
              <h1 className="sr-only">
                Building Software That Scales Real Impact.
              </h1>
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <div className="h-12 sm:h-16 md:h-20 lg:h-[70px] w-full">
                  <TechText
                    text="BUILDING SOFTWARE"
                    fontWeight={700}
                    fontSize={150}
                    reveal="letter"
                    dashLength={4}
                    dashGap={2}
                    specks={15}
                    intro="assemble"
                    introDuration={2}
                    clickKick
                    guides={false}
                    fontFamily=""
                    letterSpacing={0}
                    accentColor="#ef4444"
                    reach={200}
                    softness={0.7}
                    lineStyle="dashed"
                    strokeWidth={1.5}
                    speed={1}
                    bounce={0.4}
                    selection
                    labels
                    color="#ffff"
                    align="left"
                    draggable
                    sweep={false}
                  />
                </div>
                <div className="h-12 sm:h-16 md:h-20 lg:h-[70px] w-full pt-4">
                  <TechText
                    text="THAT SCALES REAL IMPACT."
                    fontWeight={700}
                    fontSize={150}
                    reveal="letter"
                    dashLength={4}
                    dashGap={2}
                    specks={15}
                    intro="metrics"
                    introDuration={2}
                    clickKick
                    guides={false}
                    fontFamily=""
                    letterSpacing={0}
                    accentColor="#fff"
                    reach={200}
                    softness={0.7}
                    lineStyle="dashed"
                    strokeWidth={1.5}
                    speed={1}
                    bounce={0.4}
                    selection
                    labels
                    color="#ef4444"
                    align="left"
                    draggable
                    sweep={false}
                  />
                </div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-6 sm:mb-8"
            >
              We are the software and product engineering studio behind global
              academic portals, automated admissions pipelines, and
              mission-critical SaaS architectures. Engineered with modern
              Next.js, TypeScript, and clean cloud systems.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 mb-4 sm:mb-6"
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLLING OVERLAY: TEXTLOOP WAVE SEPARATOR + TRUST SCORE SECTION ── */}
      <div className="relative z-20 w-full">
        {/* ── TEXT LOOP (WAVE SEPARATOR: CURVE UP = HERO, CURVE DOWN = TRUST SCORE) ── */}
        <div className="relative z-30 w-full pointer-events-none overflow-hidden -mb-1">
          <div className="pointer-events-auto w-full">
            <TextLoop
              text={LOOP_TEXT}
              shape="wave"
              speed={50}
              direction="forward"
              separator="✦"
              curviness={0}
              tilt={-5}
              fontSize={isMobile ? 50 : 12}
              fontWeight={800}
              letterSpacing={isMobile ? 1.5 : 1}
              uppercase
              ribbon
              ribbonColor="#ffff"
              ribbonWidth={isMobile ? 100 : 50}
              edgeFade={0}
              cross={false}
              crossAngle={0}
              draggable={false}
              scrollBoost={0.8}
              outline={false}
              pauseOnHover={false}
              outlineWidth={1.5}
              color="#000000"
              bottomColor="#dc2626"
            />
          </div>
        </div>

        {/* ── TRUST SCORE SECTION (BOTTOM OF HERO SECTION, BG PRIMARY RED, TEXT WHITE, TALL & PROMINENT) ── */}
        <div
          id="trust-score"
          className="relative z-10 w-full bg-accent text-white pt-3 sm:pt-4 pb-12 sm:pb-18 lg:pb-22"
        >
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
            {/* Header block for extra height and architectural weight */}
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-14">
              <h5 className="mt-2 sm:mt-3 text-base sm:text-xl md:text-2xl text-white tracking-tight">
                Trusted by enterprises and technology leaders
              </h5>
            </div>

            {/* Colossal numbers & metrics grid: 2 per row on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10 lg:gap-0 lg:divide-x divide-white/25">
              {TRUST_SCORES.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center text-center px-2 sm:px-6 py-2 lg:py-2"
                >
                  <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-base font-semibold text-white tracking-wide mt-2 sm:mt-3">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/85 font-medium mt-1 max-w-[180px] sm:max-w-[220px]">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
