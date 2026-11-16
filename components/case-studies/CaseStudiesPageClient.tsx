"use client";

import AnimatedContent from "@/components/AnimatedContent";
import { scrollToElement } from "@/components/SmoothScroll";
import TextLoop from "@/components/TextLoop";
import { ContactForm } from "@/components/contact/ContactForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/FadeIn";
import { FlowButton } from "@/components/ui/FlowButton";
import {
  SectionMeta,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/SectionHeader";
import {
  caseStudiesHeroStats,
  caseStudiesImpactMetrics,
  caseStudiesPageContent,
  caseStudiesTechLogos,
  caseStudyFilters,
  caseStudyProjects,
  type CaseStudyDomainId,
  type CaseStudyEntry,
  type CaseStudyHeroStat,
} from "@/data/caseStudiesPage";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Mail,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

function HeroStatParallelogramCard({
  stat,
  index,
}: {
  stat: CaseStudyHeroStat;
  index: number;
}) {
  return (
    <div className="group relative flex flex-col justify-center min-h-[148px] sm:min-h-[164px] -skew-x-[11deg] rounded-2xl bg-white/[0.06] hover:bg-white/[0.11] backdrop-blur-md border border-white/15 hover:border-accent/65 px-6 sm:px-7 py-6 sm:py-7 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5">
      {/* Un-skewed inner typography for crisp legibility */}
      <div className="skew-x-[11deg]">
        <div className="text-[26px] sm:text-3xl xl:text-[34px] font-black text-white tracking-tight leading-none tabular-nums">
          {stat.value.startsWith("0") ? (
            stat.value
          ) : (
            <CountUp value={stat.value} delay={index * 0.1} duration={1.8} />
          )}
        </div>
        <div className="mt-2 text-xs sm:text-[13px] font-semibold text-white leading-snug">
          {stat.label}
        </div>
        <div className="mt-1 text-[11px] text-gray-300 leading-snug">
          {stat.desc}
        </div>
      </div>
    </div>
  );
}

interface CaseStudyCardProps {
  project: CaseStudyEntry;
  variant?: "wide" | "compact";
  index?: number;
}

function CaseStudyCard({
  project,
  variant = "compact",
  index = 0,
}: CaseStudyCardProps) {
  const isWide = variant === "wide";
  const visibleTags = project.tags.slice(0, isWide ? 3 : 2);
  const topMetrics = project.metrics.slice(0, 2);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: EASE_SMOOTH }}
      className="group h-full flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 p-5 sm:p-6 shadow-sm hover:shadow-[0_22px_55px_-18px_rgba(220,38,38,0.14)] hover:border-red-200/90 transition-all duration-300"
    >
      <div>
        {/* Top Visual Showcase */}
        <Link
          href={`/projects/${project.id}`}
          aria-label={`View ${project.title} case study`}
          className={cn(
            "relative block w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#0f0000] border border-neutral-200/70",
            isWide ? "aspect-[16/9]" : "aspect-[16/10]",
          )}
        >
          <Image
            src={project.image}
            alt={project.shortTitle}
            fill
            quality={95}
            sizes={
              isWide
                ? "(max-width: 1024px) 100vw, 620px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 410px"
            }
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Contrast Gradient for Overlay Badges */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/20 pointer-events-none"
          />

          {/* Top-Right Tag Pills */}
          <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 max-w-[85%]">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white/95 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>

        {/* Card Copy */}
        <div className="pt-5">
          <Link href={`/projects/${project.id}`} className="block">
            <h3 className="text-lg sm:text-xl font-bold text-[#0f0000] tracking-tight leading-snug group-hover:text-accent transition-colors">
              {project.shortTitle}
            </h3>
          </Link>

          <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed line-clamp-3">
            {project.cardSummary}
          </p>
        </div>
      </div>

      {/* Bottom Metrics + Full-Width Action */}
      <div>
        <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-4 divide-x divide-neutral-100">
          {topMetrics.map((metric, mIdx) => (
            <div key={metric.label} className={mIdx === 1 ? "pl-4" : ""}>
              <div className="text-xl sm:text-2xl font-extrabold text-accent tracking-tight leading-none tabular-nums">
                {metric.value}
              </div>
              <div className="text-xs text-neutral-500 font-medium mt-1.5 leading-snug">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <FlowButton
            href={`/projects/${project.id}`}
            variant="primary"
            size="md"
            fullWidth
          >
            Explore Case Study
          </FlowButton>
        </div>
      </div>
    </motion.article>
  );
}

const PROJECTS_PER_PAGE = 5;

export default function CaseStudiesPageClient() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CaseStudyDomainId>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const featuredProject = useMemo(
    () =>
      caseStudyProjects.find(
        (p) => p.id === caseStudiesPageContent.featured.projectId,
      ) ?? caseStudyProjects[0],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return caseStudyProjects;
    return caseStudyProjects.filter((p) => p.domainId === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;

  const currentProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, startIndex]);

  const topRowProjects = useMemo(
    () => (activeFilter === "all" ? currentProjects.slice(0, 2) : []),
    [activeFilter, currentProjects],
  );

  const bottomRowProjects = useMemo(
    () => (activeFilter === "all" ? currentProjects.slice(2, 5) : []),
    [activeFilter, currentProjects],
  );

  const handleFilterChange = (filterId: CaseStudyDomainId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToElement("#case-studies-grid", -20, 0.6);
  };

  const handleScrollTo = (selector: string) => {
    scrollToElement(selector, -40, 0.75);
  };

  return (
    <>
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />

      <main id="main" className="overflow-x-clip">
        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1: DARK HERO + 2×2 NOTCHED PARALLELOGRAM STAT CARDS
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="case-studies-hero-heading"
          className="relative bg-theme-dark text-white pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-12 lg:pb-14 overflow-hidden"
        >
          {/* Ambient Crimson Top Glow + Vignette (No dots) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 75% 45%, rgba(220,38,38,0.14) 0%, transparent 70%), radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, var(--dark-bg) 88%)",
            }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
              {/* Left Column: Editorial Headline & CTAs */}
              <div className="lg:col-span-6 xl:col-span-7">
                <AnimatedContent
                  trigger="mount"
                  direction="vertical"
                  distance={20}
                  duration={0.65}
                  ease="power3.out"
                >
                  <SectionMeta className="mb-3">
                    {caseStudiesPageContent.hero.eyebrow}
                  </SectionMeta>

                  <SectionTitle
                    as="h1"
                    id="case-studies-hero-heading"
                    className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[60px] text-white leading-[1.06] max-w-2xl"
                  >
                    {caseStudiesPageContent.hero.titleLine1}{" "}
                    <span className="gradient-text">
                      {caseStudiesPageContent.hero.titleHighlight}
                    </span>
                  </SectionTitle>

                  <SectionDescription className="mt-5 text-base sm:text-lg text-gray-300 max-w-xl">
                    {caseStudiesPageContent.hero.subtitle}
                  </SectionDescription>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <FlowButton
                      variant="primary"
                      size="lg"
                      onClick={() => handleScrollTo("#case-studies-grid")}
                    >
                      {caseStudiesPageContent.hero.primaryCta}
                    </FlowButton>
                    <FlowButton
                      variant="secondary"
                      size="lg"
                      onClick={() => handleScrollTo("#case-studies-contact")}
                    >
                      {caseStudiesPageContent.hero.secondaryCta}
                    </FlowButton>
                  </div>
                </AnimatedContent>
              </div>

              {/* Right Column: 2×2 Smooth Rounded Parallelogram Stat Cards */}
              <div className="lg:col-span-6 xl:col-span-5">
                <AnimatedContent
                  trigger="mount"
                  direction="vertical"
                  distance={20}
                  delay={0.08}
                  duration={0.68}
                  ease="power3.out"
                >
                  <div className="px-4 sm:px-5 lg:px-3 xl:px-4">
                    <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-4 sm:gap-5">
                      {caseStudiesHeroStats.map((stat, idx) => (
                        <HeroStatParallelogramCard
                          key={stat.label}
                          stat={stat}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2: TEXTLOOP WITH PRODUCTION STACK LOGOS
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="Production stack logos"
          className="relative z-20 w-full bg-theme-dark pointer-events-none overflow-hidden -mt-1 -mb-1"
        >
          <div className="pointer-events-auto w-full">
            <TextLoop
              logos={caseStudiesTechLogos}
              reddishGray
              logoSize={isMobile ? 70 : 28}
              logoSpacing={isMobile ? 120 : 64}
              shape="wave"
              speed={45}
              direction="forward"
              curviness={0}
              tilt={0}
              ribbon
              ribbonColor="#ffffff"
              ribbonWidth={isMobile ? 120 : 50}
              edgeFade={0}
              cross={false}
              crossAngle={0}
              draggable={true}
              scrollBoost={0.9}
              pauseOnHover={true}
              bottomColor="#f1f2f5"
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3: FEATURED ENGINEERING SPOTLIGHT
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="featured-spotlight-heading"
          className="relative bg-gradient-to-b from-[#f1f2f5] via-white to-white pt-16 sm:pt-20 pb-20 sm:pb-24 lg:pb-28 overflow-hidden"
        >
          {/* Soft Ambient Crimson Glow & Subtle Red Watermark */}
          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-0 w-[520px] h-[520px] rounded-full bg-accent/[0.045] blur-[140px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 sm:-right-10 bottom-6 w-[320px] sm:w-[440px] lg:w-[540px] pointer-events-none select-none opacity-[0.06] sm:opacity-[0.08]"
          >
            <Image
              src="/images/watermark_red.webp"
              alt=""
              width={640}
              height={748}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section Title Row (User's Red Section Title Style) */}
            <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-xl">
                <SectionMeta>
                  {caseStudiesPageContent.featured.eyebrow}
                </SectionMeta>
                <SectionTitle
                  id="featured-spotlight-heading"
                  className="text-[clamp(26px,2.8vw,42px)]"
                >
                  {caseStudiesPageContent.featured.title}
                </SectionTitle>
              </div>

              <SectionDescription className="mt-0 max-w-md">
                {caseStudiesPageContent.featured.sideDescription}
              </SectionDescription>
            </FadeIn>

            {/* Spotlight Card */}
            <FadeIn delay={0.08}>
              <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_24px_70px_-24px_rgba(15,0,0,0.1)] p-6 sm:p-8 lg:p-10 overflow-hidden">
                {/* Soft Crimson Inner Corner Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/[0.06] blur-[90px] pointer-events-none"
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left: Project Breakdown */}
                  <div className="lg:col-span-6">
                    <div className="inline-flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-accent">
                          {featuredProject.category}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium">
                          {featuredProject.client} ·{" "}
                          {featuredProject.clientLocation}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0f0000] tracking-tight">
                      {featuredProject.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {featuredProject.description}
                    </p>

                    {/* 2-Column Highlight Metrics */}
                    <div className="mt-7 pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {caseStudiesPageContent.featured.pillars.map((pillar) => (
                        <div key={pillar.heading}>
                          <div className="text-xs font-sans font-bold uppercase tracking-[0.12em] text-[#0f0000]">
                            {pillar.heading}
                          </div>
                          <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">
                            {pillar.description}
                          </p>
                          <div className="mt-3 text-2xl sm:text-3xl font-black text-accent tracking-tight leading-none tabular-nums">
                            {pillar.metricValue}
                          </div>
                          <div className="mt-1 text-xs font-medium text-neutral-600">
                            {pillar.metricLabel}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <FlowButton
                        href={`/projects/${featuredProject.id}`}
                        variant="primary"
                        size="md"
                      >
                        View Case Study
                      </FlowButton>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {featuredProject.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-[#fafafa] border border-neutral-200/80 font-sans font-medium text-[11px] text-neutral-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Visual Frame */}
                  <div className="lg:col-span-6">
                    <Link
                      href={`/projects/${featuredProject.id}`}
                      className="group relative block rounded-2xl overflow-hidden bg-[#120303] border border-neutral-200/80 aspect-[16/11] shadow-md"
                    >
                      <Image
                        src={featuredProject.image}
                        alt={featuredProject.shortTitle}
                        fill
                        quality={95}
                        priority
                        sizes="(max-width: 1024px) 100vw, 620px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 4: FULL-WIDTH DARK IMPACT STATS BANNER
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="Verified platform impact metrics"
          className="relative w-full bg-theme-dark text-white py-14 sm:py-16 lg:py-20 overflow-hidden"
        >
          {/* Ambient Crimson Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 80% at 50% 50%, rgba(220,38,38,0.13) 0%, transparent 72%)",
            }}
          />

          {/* Ambient White Watermark */}
          <div
            aria-hidden="true"
            className="absolute -right-14 sm:-right-6 md:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] md:w-[540px] lg:w-[640px] pointer-events-none select-none opacity-[0.1] sm:opacity-[0.14]"
          >
            <Image
              src="/images/watermark_white.webp"
              alt=""
              width={640}
              height={748}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-0 lg:divide-x divide-white/15">
              {caseStudiesImpactMetrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center justify-center text-center px-3 sm:px-6"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-none tabular-nums">
                    <CountUp
                      value={metric.value}
                      delay={idx * 0.1}
                      duration={1.9}
                    />
                  </div>
                  <div className="mt-2.5 text-xs sm:text-sm md:text-base font-semibold text-white">
                    {metric.label}
                  </div>
                  <div className="mt-0.5 text-[11px] sm:text-xs text-gray-300 font-medium">
                    {metric.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 5: FILTERABLE 5-PROJECT CASE STUDIES SHOWCASE (2 + 3 BENTO)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="case-studies-grid"
          aria-labelledby="case-studies-grid-heading"
          className="relative bg-[#fafafa] py-20 sm:py-24 lg:py-28 overflow-hidden"
        >
          {/* Subtle Architectural Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-55"
            style={{
              backgroundImage:
                "linear-gradient(rgba(220, 38, 38, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 85% 75% at 50% 45%, #000 35%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 75% at 50% 45%, #000 35%, transparent 100%)",
            }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section Title (User's Red Section Title Style) */}
            <FadeIn className="mb-8 sm:mb-10">
              <SectionMeta>
                {caseStudiesPageContent.grid.eyebrow}
              </SectionMeta>
              <SectionTitle
                id="case-studies-grid-heading"
                className="text-[clamp(26px,2.8vw,42px)]"
              >
                {caseStudiesPageContent.grid.title}
              </SectionTitle>
            </FadeIn>

            {/* Filter Pills & Live Counter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-neutral-200/80">
              <div
                role="group"
                aria-label="Filter case studies by domain"
                className="flex flex-wrap items-center gap-1.5 sm:gap-2"
              >
                {caseStudyFilters.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => handleFilterChange(filter.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "relative px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap",
                        isActive
                          ? "text-white"
                          : "bg-white border border-neutral-200/90 text-neutral-600 hover:text-[#0f0000] hover:border-red-200",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="case-study-filter-pill"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-xl bg-accent shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{filter.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 text-xs font-sans font-medium text-neutral-500 tabular-nums">
                <span>
                  Showing{" "}
                  <strong className="text-[#0f0000]">
                    {Math.min(startIndex + 1, filteredProjects.length)}–
                    {Math.min(startIndex + currentProjects.length, filteredProjects.length)}
                  </strong>{" "}
                  of {filteredProjects.length} case studies
                </span>
                {activeFilter !== "all" && (
                  <button
                    type="button"
                    onClick={() => handleFilterChange("all")}
                    className="inline-flex items-center gap-1.5 text-accent font-semibold hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset filter</span>
                  </button>
                )}
              </div>
            </div>

            {/* 5-Project Bento Showcase (2 wide top + 3 bottom on All; clean grid when filtered) */}
            <AnimatePresence mode="wait">
              {activeFilter === "all" ? (
                <motion.div
                  key={`bento-all-${currentPage}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Row 1: 2 Wide Featured Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
                    {topRowProjects.map((project, idx) => (
                      <CaseStudyCard
                        key={project.id}
                        project={project}
                        variant="wide"
                        index={idx}
                      />
                    ))}
                  </div>

                  {/* Row 2: 3 Cards */}
                  {bottomRowProjects.length > 0 && (
                    <div className="mt-6 lg:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                      {bottomRowProjects.map((project, idx) => (
                        <CaseStudyCard
                          key={project.id}
                          project={project}
                          variant="compact"
                          index={idx + 2}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`filtered-${activeFilter}-${currentPage}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7"
                >
                  {currentProjects.map((project, idx) => (
                    <CaseStudyCard
                      key={project.id}
                      project={project}
                      variant="wide"
                      index={idx}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 sm:mt-14 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm font-medium text-neutral-500 tabular-nums">
                  Page <strong className="text-[#0f0000]">{currentPage}</strong> of{" "}
                  <strong className="text-[#0f0000]">{totalPages}</strong> (
                  {filteredProjects.length} total platforms)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold border transition-all duration-200",
                      currentPage === 1
                        ? "bg-neutral-100/70 text-neutral-400 border-neutral-200/60 cursor-not-allowed"
                        : "bg-white text-neutral-700 border-neutral-200/90 hover:border-red-200 hover:text-accent shadow-sm cursor-pointer",
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 flex items-center justify-center cursor-pointer",
                            isActive
                              ? "bg-accent text-white shadow-md shadow-red-500/25"
                              : "bg-white text-neutral-700 border border-neutral-200/90 hover:border-red-200 hover:text-accent shadow-sm",
                          )}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold border transition-all duration-200",
                      currentPage === totalPages
                        ? "bg-neutral-100/70 text-neutral-400 border-neutral-200/60 cursor-not-allowed"
                        : "bg-white text-neutral-700 border-neutral-200/90 hover:border-red-200 hover:text-accent shadow-sm cursor-pointer",
                    )}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 6: FULL-WIDTH RED WATERMARK CTA BANNER
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="case-studies-banner-heading"
          className="relative w-full bg-accent text-white py-16 sm:py-20 overflow-hidden"
        >
          {/* Ambient White Watermark */}
          <div
            aria-hidden="true"
            className="absolute -right-14 sm:-right-6 md:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[660px] pointer-events-none select-none opacity-15 sm:opacity-20"
          >
            <Image
              src="/images/watermark_white.webp"
              alt=""
              width={640}
              height={748}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <FadeIn className="max-w-2xl mx-auto">
              <SectionMeta className="text-xs text-white/85 tracking-[0.18em] mb-3">
                {caseStudiesPageContent.ctaBanner.eyebrow}
              </SectionMeta>
              <SectionTitle
                id="case-studies-banner-heading"
                className="text-2xl sm:text-3xl lg:text-[42px] text-white tracking-tight leading-[1.15]"
              >
                {caseStudiesPageContent.ctaBanner.title}
              </SectionTitle>
              <div className="mt-7 flex justify-center">
                <FlowButton
                  variant="white-red"
                  size="lg"
                  onClick={() => setIsSchedulerOpen(true)}
                >
                  {caseStudiesPageContent.ctaBanner.buttonLabel}
                </FlowButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 7: BOTTOM BRIEF & COLLABORATION SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="case-studies-contact"
          ref={contactRef}
          aria-labelledby="case-studies-contact-heading"
          className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #ffffff 0%, #fff9f9 48%, #fef2f2 100%)",
          }}
        >
          {/* Ambient Crimson Glow + Bottom-Left Watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-[460px] h-[460px] rounded-full bg-accent/[0.05] blur-[130px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -left-24 sm:-left-10 -bottom-16 w-[300px] sm:w-[420px] lg:w-[520px] pointer-events-none select-none opacity-[0.09] sm:opacity-[0.12]"
          >
            <Image
              src="/images/watermark_red.webp"
              alt=""
              width={640}
              height={748}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Editorial Prompt & Direct Routes */}
              <div className="lg:col-span-5">
                <FadeIn>
                  <SectionMeta>
                    {caseStudiesPageContent.contact.eyebrow}
                  </SectionMeta>
                  <SectionTitle
                    id="case-studies-contact-heading"
                    className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.1]"
                  >
                    {caseStudiesPageContent.contact.title}
                  </SectionTitle>
                  <SectionDescription className="mt-4 text-sm sm:text-base max-w-md">
                    {caseStudiesPageContent.contact.subtitle}
                  </SectionDescription>

                  {/* Quick Direct Channels */}
                  <div className="mt-8 space-y-3 max-w-sm">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-neutral-200/90 hover:border-red-200 shadow-xs transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-accent flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Direct Email
                        </div>
                        <div className="text-sm font-bold text-[#0f0000] group-hover:text-accent transition-colors truncate">
                          {siteConfig.contact.email}
                        </div>
                      </div>
                    </a>

                    <a
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3.5 p-4 rounded-2xl bg-emerald-50/75 border border-emerald-200/80 hover:border-emerald-400 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-emerald-800">
                          WhatsApp Direct
                        </div>
                        <div className="text-sm font-bold text-emerald-950 truncate">
                          {siteConfig.contact.whatsappDisplay}
                        </div>
                      </div>
                    </a>
                  </div>

                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 mt-6 text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-600 hover:text-accent transition-colors"
                  >
                    <span>View full Contact Hub &amp; Seoul/Dhaka hours</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </FadeIn>
              </div>

              {/* Right Column: Reused Contact Form */}
              <div className="lg:col-span-7">
                <FadeIn delay={0.08}>
                  <ContactForm
                    idPrefix="case-studies-brief"
                    variant="elevated"
                    showHeader
                    showCompanyField
                    showBudgetField
                    showDocumentField
                    submitLabel="Start the conversation"
                  />
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}
