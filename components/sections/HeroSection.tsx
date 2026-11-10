"use client";

import DotGrid from "@/components/DotGrid";
import { scrollToElement } from "@/components/SmoothScroll";
import TechText from "@/components/TechText";
import TextLoop from "@/components/TextLoop";
import { CountUp } from "@/components/motion/CountUp";
import { HeroGlassLogo } from "@/components/motion/HeroGlassLogo";
import { FlowButton } from "@/components/ui/FlowButton";
import { siteConfig } from "@/data/siteConfig";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── PREVIOUS TEXT TICKER (KEPT IN COMMENT FOR LATER USE) ──
// const TICKER_CLIENTS = [
//   "Endow Global Education",
//   "EduFlow LMS",
//   "UniMatch AI",
//   "LeadFlow CRM",
//   "Seoul Tech Hub",
//   "Finland Student Desk",
//   "LaunchMetrics",
//   "ConnectBridge API",
//   "Global Tuition Settlement",
// ];
// const LOOP_TEXT = TICKER_CLIENTS.join(" ✦ ");

// ── TECH STACK LOGOS FOR RIBBON TICKER (PURE VECTOR ICONS, NO BACKGROUND) ──
// Easily customize, reorder, add, or remove logos here
export const TECH_STACK_LOGOS = [
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes" },
  // { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis" },
  { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
  { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux" },
];

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
  const logoScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.92]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.08]);
  const logoScrollY = useTransform(scrollYProgress, [0, 0.75], [0, -28]);

  // Direct DOM style updates for cursor glow: cached rect avoids layout thrashing
  useEffect(() => {
    const el = stickyRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    let r = el.getBoundingClientRect();
    const updateRect = () => {
      r = el.getBoundingClientRect();
    };

    const onMove = (e: MouseEvent) => {
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
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  const scroll = (id: string) => {
    scrollToElement(id, -40, 0.75);
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

        {/* ── MAIN CONTENT (RESPONSIVE: GLASS LOGO BEHIND TEXT | DESKTOP: TWO-COLUMN RIGHT SIDE) ── */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-10 sm:pt-6 sm:pb-12 lg:py-10 mt-6 sm:mt-10 lg:mt-14 xl:mt-16">
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-8 xl:gap-12">
            {/* Left / Foreground Column: Hero Copy & CTAs */}
            <motion.div
              style={{
                scale: heroScale,
                opacity: heroOpacity,
                transformOrigin: "left center",
              }}
              className="relative z-10 w-full lg:flex-1 lg:min-w-0 max-w-4xl"
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
                className="mb-3 sm:mb-4 w-full select-none"
              >
                <h1 className="sr-only">
                  Building Software That Scales Real Impact.
                </h1>
                <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 max-w-2xl">
                  <div className="relative z-10 hover:z-20 h-11 sm:h-14 md:h-16 lg:h-[58px] xl:h-[68px] 2xl:h-[76px] w-full">
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
                  <div className="relative z-10 hover:z-20 h-11 sm:h-14 md:h-16 lg:h-[58px] xl:h-[68px] 2xl:h-[76px] w-full">
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
                className="text-base sm:text-md text-gray-300 max-w-2xl leading-relaxed mb-6 sm:mb-8"
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
                className="flex flex-wrap items-center gap-4 mb-2 sm:mb-4 lg:mb-0"
              >
                <FlowButton
                  variant="primary"
                  size="lg"
                  onClick={() => scroll("#contact")}
                >
                  Start a Project
                </FlowButton>

                <FlowButton
                  variant="secondary"
                  size="lg"
                  onClick={() => scroll("#products")}
                >
                  Explore Products
                </FlowButton>
              </motion.div>
            </motion.div>

            {/* Glass Logo: Behind hero texts on responsive (< lg), right side centerpiece on desktop (lg+) */}
            <motion.div
              style={{
                scale: logoScale,
                opacity: logoOpacity,
                y: logoScrollY,
                transformOrigin: "center center",
              }}
              className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none lg:static lg:inset-auto lg:z-10 lg:pointer-events-auto lg:w-[320px] xl:w-[390px] 2xl:w-[440px] lg:shrink-0"
            >
              <div className="w-full max-w-[270px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-none opacity-[0.38] sm:opacity-[0.42] lg:opacity-100">
                <HeroGlassLogo trackingContainerRef={stickyRef} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── SCROLLING OVERLAY: TEXTLOOP WAVE SEPARATOR + TRUST SCORE SECTION ── */}
      <div className="relative z-20 w-full">
        {/* ── TEXT LOOP (WAVE SEPARATOR: TECH STACK LOGOS RIBBON) ── */}
        <div className="relative z-30 w-full pointer-events-none overflow-hidden -mb-1">
          <div className="pointer-events-auto w-full">
            <TextLoop
              logos={TECH_STACK_LOGOS}
              reddishGray
              logoSize={isMobile ? 70 : 28}
              logoSpacing={isMobile ? 120 : 64}
              shape="wave"
              speed={45}
              direction="forward"
              curviness={0}
              tilt={-5}
              ribbon
              ribbonColor="#ffff"
              ribbonWidth={isMobile ? 120 : 50}
              edgeFade={0}
              cross={false}
              crossAngle={0}
              draggable={true}
              scrollBoost={0.9}
              pauseOnHover={true}
              bottomColor="#dc2626"
            />
          </div>
        </div>

        {/* ── TRUST SCORE SECTION (BOTTOM OF HERO SECTION, BG PRIMARY RED, TEXT WHITE, TALL & PROMINENT) ── */}
        <div
          id="trust-score"
          className="relative z-10 w-full bg-accent text-white pt-4 sm:pt-6 pb-14 sm:pb-20 lg:pb-24 overflow-hidden"
        >
          {/* Ambient Right Watermark Branding */}
          <div className="absolute right-[-20px] sm:right-0 lg:right-6 xl:right-10 top-6 sm:top-10 md:top-12 lg:top-16 w-[300px] sm:w-[420px] md:w-[540px] lg:w-[650px] xl:w-[740px] 2xl:w-[800px] pointer-events-none select-none opacity-30 sm:opacity-35 xl:opacity-40 transition-opacity duration-300">
            <Image
              src="/images/watermark_white.webp"
              alt=""
              width={640}
              height={748}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
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
                    <CountUp
                      value={stat.value}
                      delay={idx * 0.12}
                      duration={2}
                    />
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
