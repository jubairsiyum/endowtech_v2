"use client";

import AnimatedContent from "@/components/AnimatedContent";
import { scrollToElement } from "@/components/SmoothScroll";
import { ContactForm } from "@/components/contact/ContactForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/FadeIn";
import { FlowButton } from "@/components/ui/FlowButton";
import { caseStudyDomainMeta } from "@/data/caseStudiesPage";
import type { FeaturedProject } from "@/data/featuredProjects";
import {
  resolveTechVisuals,
  type ProjectDetailExtension,
  type TechBadgeVisual,
} from "@/data/projectDetails";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  HardDrive,
  KeyRound,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Server,
  Shield,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

const CAPABILITY_ICONS = [Layers, Workflow, ShieldCheck, Activity, Database] as const;

const DECISION_ICONS = {
  shield: Shield,
  zap: Zap,
  layers: Layers,
  database: Database,
  server: Server,
} as const;

const STANDARD_ICONS = {
  shield: ShieldCheck,
  zap: Zap,
  layers: Layers,
  database: Database,
  check: CheckCircle2,
  server: Server,
} as const;

function TechStackTile({ item }: { item: TechBadgeVisual }) {
  const [imgFailed, setImgFailed] = useState(false);

  const FallbackIcon =
    item.name === "RBAC"
      ? ShieldCheck
      : item.name === "Sanctum"
        ? KeyRound
        : item.name === "FUSE"
          ? HardDrive
          : Code2;

  return (
    <div className="group flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-white shadow-[0_14px_34px_-16px_rgba(15,0,0,0.28)] hover:-translate-y-0.5 transition-all duration-300">
      <div className="w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0">
        {item.iconUrl && !imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.iconUrl}
            alt=""
            width={20}
            height={20}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-5 h-5 object-contain"
          />
        ) : (
          <FallbackIcon className="w-5 h-5 text-accent" aria-hidden="true" />
        )}
      </div>
      <span className="text-sm sm:text-[15px] font-bold text-[#0f0000] whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

function RelatedCaseStudyCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const domainInfo = caseStudyDomainMeta[project.id];
  const cardSummary = domainInfo?.cardSummary ?? project.description;
  const visibleTags = project.tags.slice(0, 2);
  const topMetrics = project.metrics.slice(0, 2);

  return (
    <FadeIn delay={index * 0.08}>
      <article className="group h-full flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 p-5 sm:p-6 shadow-sm hover:shadow-[0_22px_55px_-18px_rgba(220,38,38,0.14)] hover:border-red-200/90 transition-all duration-300">
        <div>
          <Link
            href={`/projects/${project.id}`}
            aria-label={`View ${project.title} case study`}
            className="relative block w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#0f0000] border border-neutral-200/70 aspect-[16/9]"
          >
            <Image
              src={project.image}
              alt={project.shortTitle}
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none"
            />
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

          <div className="pt-5">
            <Link href={`/projects/${project.id}`} className="block">
              <h3 className="text-lg sm:text-xl font-bold text-[#0f0000] tracking-tight leading-snug group-hover:text-accent transition-colors">
                {project.shortTitle}
              </h3>
            </Link>
            <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed line-clamp-3">
              {cardSummary}
            </p>
          </div>
        </div>

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
      </article>
    </FadeIn>
  );
}

export interface ProjectDetailClientProps {
  project: FeaturedProject;
  detail: ProjectDetailExtension;
  prevProject: FeaturedProject;
  nextProject: FeaturedProject;
  relatedProjects: FeaturedProject[];
}

export default function ProjectDetailClient({
  project,
  detail,
  prevProject,
  nextProject,
  relatedProjects,
}: ProjectDetailClientProps) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const techVisuals = resolveTechVisuals(project.techStack);
  const activeStage =
    detail.deliveryStages[activeStageIdx] ?? detail.deliveryStages[0];

  const handleScrollTo = (selector: string) => {
    scrollToElement(selector, -40, 0.75);
  };

  return (
    <>
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />

      <main className="overflow-x-clip">
        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1: LIGHT EDITORIAL HERO + FRAMED PLATFORM SHOWCASE
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="project-hero-heading"
          className="relative bg-gradient-to-b from-[#f8f9fb] via-white to-white pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 overflow-hidden"
        >
          {/* Ambient Crimson Soft Glow & Right Architectural Watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-accent/[0.045] blur-[140px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 sm:-right-10 top-24 sm:top-20 w-[340px] sm:w-[480px] lg:w-[600px] pointer-events-none select-none opacity-[0.06] sm:opacity-[0.08]"
          >
            <Image
              src="/images/watermark_red.webp"
              alt=""
              width={640}
              height={748}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            {/* Breadcrumb */}
            <AnimatedContent
              trigger="mount"
              direction="vertical"
              distance={18}
              duration={0.6}
              ease="power3.out"
            >
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-xs font-sans font-medium text-neutral-500 mb-6"
              >
                <Link
                  href="/"
                  className="hover:text-[#0f0000] transition-colors"
                >
                  Home
                </Link>
                <ChevronRight
                  className="w-3.5 h-3.5 text-neutral-400"
                  aria-hidden="true"
                />
                <Link
                  href="/case-studies"
                  className="hover:text-[#0f0000] transition-colors"
                >
                  Case Studies
                </Link>
                <ChevronRight
                  className="w-3.5 h-3.5 text-neutral-400"
                  aria-hidden="true"
                />
                <span className="text-[#0f0000] font-semibold">
                  {project.title}
                </span>
              </nav>

              {/* Editorial Header Split */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="max-w-3xl">
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-3">
                    {project.category}
                  </span>

                  <h1
                    id="project-hero-heading"
                    className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.06]"
                  >
                    {project.title}
                  </h1>

                  <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                  <FlowButton
                    variant="primary"
                    size="lg"
                    onClick={() => setIsSchedulerOpen(true)}
                  >
                    Request Walkthrough
                  </FlowButton>
                  <FlowButton
                    variant="outline"
                    size="lg"
                    onClick={() => handleScrollTo("#project-architecture")}
                  >
                    System Architecture
                  </FlowButton>
                </div>
              </div>
            </AnimatedContent>

            {/* Primary Framed Platform Visual */}
            <AnimatedContent
              trigger="mount"
              direction="vertical"
              distance={24}
              delay={0.08}
              duration={0.68}
              ease="power3.out"
            >
              <div className="mt-10 sm:mt-14 rounded-3xl bg-[#0f0000] p-2 sm:p-3.5 shadow-[0_32px_90px_-30px_rgba(15,0,0,0.28)] border border-neutral-200/80">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#120303]">
                  <Image
                    src={project.image}
                    alt={project.shortTitle}
                    fill
                    priority
                    quality={95}
                    sizes="(max-width: 1400px) 100vw, 1320px"
                    className="object-cover object-center"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none"
                  />

                  {/* Top-Right Stack Summary Pills */}
                  <div className="hidden sm:flex absolute top-4 right-4 flex-wrap justify-end gap-1.5 max-w-[65%]">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-xs font-sans font-medium text-white/95"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Bottom-Left Editorial Frame Bar */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white">
                      <span className="font-semibold">{project.client}</span>
                      <span className="text-white/40" aria-hidden="true">
                        /
                      </span>
                      <span className="text-gray-300">
                        {project.clientLocation}
                      </span>
                      <span className="text-white/40" aria-hidden="true">
                        /
                      </span>
                      <span className="font-sans font-medium tabular-nums text-gray-300">
                        {project.year}
                      </span>
                    </div>

                    <Link
                      href="/case-studies"
                      className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/70 hover:bg-black/85 backdrop-blur-md border border-white/15 text-xs font-sans font-medium text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>All Case Studies</span>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2: PROJECT OVERVIEW & 2×2 STRUCTURED METADATA DOSSIER
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="project-overview-heading"
          className="bg-white py-14 sm:py-20 lg:py-24 border-t border-neutral-100"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Section Heading */}
              <div className="lg:col-span-5">
                <FadeIn>
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    Project Overview
                  </span>
                  <h2
                    id="project-overview-heading"
                    className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                  >
                    Operational context, mandate &amp; delivery scope.
                  </h2>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#fafafa] border border-neutral-200/90 text-xs font-medium text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Right Column: Narrative + Hairline 2×2 Dossier Grid */}
              <div className="lg:col-span-7">
                <FadeIn delay={0.06}>
                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-8 bg-neutral-200/80 p-px rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-px shadow-xs">
                    <div className="bg-[#fafafa] p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        <Building2
                          className="w-3.5 h-3.5 text-accent"
                          aria-hidden="true"
                        />
                        <span>Client Organization</span>
                      </div>
                      <div className="mt-2 text-base font-bold text-[#0f0000]">
                        {project.client}
                      </div>
                    </div>

                    <div className="bg-[#fafafa] p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        <MapPin
                          className="w-3.5 h-3.5 text-accent"
                          aria-hidden="true"
                        />
                        <span>Operating Footprint</span>
                      </div>
                      <div className="mt-2 text-base font-bold text-[#0f0000]">
                        {project.clientLocation}
                      </div>
                    </div>

                    <div className="bg-[#fafafa] p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        <Layers
                          className="w-3.5 h-3.5 text-accent"
                          aria-hidden="true"
                        />
                        <span>Engineering Role</span>
                      </div>
                      <div className="mt-2 text-base font-bold text-[#0f0000] leading-snug">
                        {project.role}
                      </div>
                    </div>

                    <div className="bg-[#fafafa] p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        <Calendar
                          className="w-3.5 h-3.5 text-accent"
                          aria-hidden="true"
                        />
                        <span>Production Release</span>
                      </div>
                      <div className="mt-2 text-base font-bold text-[#0f0000]">
                        {project.year} · Active Production System
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3: DARK CHALLENGE vs. ENGINEERING SOLUTION SPLIT
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="challenge-solution-heading"
          className="relative bg-theme-dark text-white py-16 sm:py-24 overflow-hidden"
        >
          {/* Ambient Crimson Radial Glow & Right White Watermark */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 70% at 30% 45%, rgba(220,38,38,0.14) 0%, transparent 72%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 sm:-right-8 -bottom-12 w-[320px] sm:w-[440px] lg:w-[560px] pointer-events-none select-none opacity-[0.1] sm:opacity-[0.14]"
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
            <FadeIn className="max-w-2xl mb-10 sm:mb-12">
              <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                Challenge &amp; Solution
              </span>
              <h2
                id="challenge-solution-heading"
                className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-white"
              >
                What constrained operations — and what our architecture solved.
              </h2>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-5 lg:gap-4 xl:gap-6 items-stretch">
                {/* Challenge Card */}
                <div className="rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_24px_70px_-24px_rgba(0,0,0,0.5)]">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight leading-snug mb-4">
                      The Operational Challenge
                    </h3>

                    <p className="text-base sm:text-[17px] text-gray-200 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="mt-7 rounded-2xl bg-black/35 border border-white/10 p-5 sm:p-6">
                    <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-gray-400 mb-4">
                      Key Bottlenecks Addressed
                    </div>
                    <ul className="space-y-3">
                      {detail.challengePoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-gray-300 leading-snug"
                        >
                          <AlertCircle
                            className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Desktop S-Curve Connector: Challenge -> Solution */}
                <div
                  aria-hidden="true"
                  className="hidden lg:flex items-center justify-center w-14 xl:w-16 shrink-0"
                >
                  <svg
                    viewBox="0 0 80 120"
                    fill="none"
                    className="w-14 xl:w-16 h-28 overflow-visible"
                  >
                    <defs>
                      <linearGradient
                        id="challenge-solution-curve-grad"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <marker
                        id="challenge-solution-arrowhead"
                        viewBox="0 0 12 12"
                        refX="9"
                        refY="6"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto"
                      >
                        <path d="M 1 1.5 L 10 6 L 1 10.5 z" fill="#34d399" />
                      </marker>
                    </defs>
                    <path
                      d="M 4 92 C 36 92, 42 28, 72 28"
                      stroke="url(#challenge-solution-curve-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      markerEnd="url(#challenge-solution-arrowhead)"
                    />
                  </svg>
                </div>

                {/* Mobile S-Curve Connector */}
                <div
                  aria-hidden="true"
                  className="flex lg:hidden items-center justify-center -my-1"
                >
                  <svg
                    viewBox="0 0 48 56"
                    fill="none"
                    className="w-12 h-12 overflow-visible"
                  >
                    <defs>
                      <linearGradient
                        id="challenge-solution-curve-mobile"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <marker
                        id="challenge-solution-arrowhead-mobile"
                        viewBox="0 0 12 12"
                        refX="9"
                        refY="6"
                        markerWidth="6.5"
                        markerHeight="6.5"
                        orient="auto"
                      >
                        <path d="M 1 1.5 L 10 6 L 1 10.5 z" fill="#34d399" />
                      </marker>
                    </defs>
                    <path
                      d="M 16 4 C 16 24, 32 28, 32 48"
                      stroke="url(#challenge-solution-curve-mobile)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      markerEnd="url(#challenge-solution-arrowhead-mobile)"
                    />
                  </svg>
                </div>

                {/* Solution Card (Emerald / Green Tinted) */}
                <div className="rounded-3xl bg-emerald-950/35 border border-emerald-500/35 backdrop-blur-md p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_24px_70px_-28px_rgba(16,185,129,0.28)]">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-emerald-300 tracking-tight leading-snug mb-4">
                      The Engineering Solution
                    </h3>

                    <p className="text-base sm:text-[17px] text-white/95 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  <div className="mt-7 rounded-2xl bg-emerald-500/[0.09] border border-emerald-400/25 p-5 sm:p-6">
                    <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-emerald-300 mb-4">
                      Verified Architectural Outcomes
                    </div>
                    <ul className="space-y-3">
                      {detail.solutionPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-white leading-snug"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 4: CORE CAPABILITIES DELIVERED
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="capabilities-heading"
          className="bg-white py-16 sm:py-24"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <FadeIn>
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    Core Features
                  </span>
                  <h2
                    id="capabilities-heading"
                    className="text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                  >
                    Core capabilities delivered.
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Designed around actual operator workflows so teams adopt the
                    system quickly and rely on it under daily production load.
                  </p>
                </FadeIn>
              </div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {project.keyFeatures.map((feature, idx) => {
                    const Icon =
                      CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];
                    return (
                      <FadeIn key={feature.title} delay={idx * 0.05}>
                        <div className="h-full rounded-2xl bg-[#fafafa] border border-neutral-200/90 hover:bg-white hover:border-red-200 hover:shadow-[0_20px_50px_-20px_rgba(220,38,38,0.14)] p-6 sm:p-7 transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center mb-5">
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <h3 className="text-lg font-bold text-[#0f0000] tracking-tight leading-snug">
                            {feature.title}
                          </h3>
                          <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 5: SCALE, DARK IMPACT METRICS BANNER & 3-TIER ARCHITECTURE
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="project-architecture"
          aria-labelledby="scale-impact-heading"
          className="relative bg-[#fafafa] py-16 sm:py-24 overflow-hidden border-t border-neutral-200/70"
        >
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            {/* Header Row */}
            <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-2xl">
                <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                  Scale &amp; System Architecture
                </span>
                <h2
                  id="scale-impact-heading"
                  className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                >
                  {detail.impactHeadline}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md">
                {detail.impactSummary}
              </p>
            </FadeIn>

            {/* Full-Width Dark Impact Metrics Pill Bar */}
            <FadeIn delay={0.06}>
              <div className="relative rounded-3xl bg-theme-dark text-white p-7 sm:p-10 lg:py-12 overflow-hidden shadow-[0_24px_70px_-24px_rgba(15,0,0,0.35)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(220,38,38,0.14) 0%, transparent 72%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-12 top-1/2 -translate-y-1/2 w-[260px] sm:w-[360px] pointer-events-none select-none opacity-[0.1]"
                >
                  <Image
                    src="/images/watermark_white.webp"
                    alt=""
                    width={640}
                    height={748}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-0 lg:divide-x divide-white/15">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={metric.label}
                      className="flex flex-col items-center justify-center text-center px-3 sm:px-6"
                    >
                      <div className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-none tabular-nums">
                        {metric.value.startsWith("0") ||
                        metric.value.startsWith("<") ||
                        metric.value.startsWith("$") ||
                        metric.value === "Zero" ||
                        metric.value === "Real-Time" ? (
                          metric.value
                        ) : (
                          <CountUp
                            value={metric.value}
                            delay={idx * 0.1}
                            duration={1.8}
                          />
                        )}
                      </div>
                      <div className="mt-2.5 text-xs sm:text-sm font-semibold text-white">
                        {metric.label}
                      </div>
                      {metric.change && (
                        <div className="mt-1 text-[11px] sm:text-xs font-sans font-medium text-gray-300">
                          {metric.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 3-Tier Architectural Blueprint Cards */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {project.architectureHighlights.map((arch, idx) => (
                <FadeIn key={arch.layer} delay={idx * 0.07}>
                  <div className="h-full rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 hover:border-red-200 hover:shadow-[0_20px_50px_-20px_rgba(220,38,38,0.14)] p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="h-1 w-12 rounded-full bg-accent mb-5" />
                      <div className="text-xs font-sans font-bold uppercase tracking-[0.14em] text-accent">
                        {arch.layer}
                      </div>
                      <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#0f0000] tracking-tight leading-snug">
                        {arch.tech}
                      </h3>
                    </div>
                    <p className="mt-3.5 text-sm text-neutral-600 leading-relaxed">
                      {arch.purpose}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 6: LIGHT ARCHITECTURAL DECISIONS STRIP
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="architectural-decisions-heading"
          className="relative bg-[#f4f5f7] text-[#0f0000] py-16 sm:py-24 overflow-hidden border-y border-neutral-200/70"
        >
          <div
            aria-hidden="true"
            className="absolute -left-20 bottom-0 w-[300px] sm:w-[420px] pointer-events-none select-none opacity-[0.045]"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <FadeIn>
                  <h2
                    id="architectural-decisions-heading"
                    className="text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                  >
                    Decisions designed to hold up under real production traffic.
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Every technical choice across {project.title} prioritized
                    auditability, predictable latency, and clean maintainability
                    for teams operating across Seoul and Dhaka.
                  </p>

                  <div className="mt-8">
                    <FlowButton
                      variant="primary"
                      size="md"
                      onClick={() => handleScrollTo("#project-contact")}
                    >
                      Discuss Similar Architecture
                    </FlowButton>
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {detail.engineeringDecisions.map((decision, idx) => {
                  const Icon = DECISION_ICONS[decision.iconKey];
                  return (
                    <FadeIn key={decision.title} delay={idx * 0.06}>
                      <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-[0_12px_32px_-16px_rgba(15,0,0,0.08)] hover:shadow-[0_18px_42px_-16px_rgba(220,38,38,0.12)] transition-all duration-300 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-accent flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-base sm:text-lg font-bold text-[#0f0000] tracking-tight">
                              {decision.title}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[11px] font-sans font-medium text-neutral-600 whitespace-nowrap">
                              {decision.tag}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                            {decision.summary}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 7: INTERACTIVE 5-STAGE DELIVERY PIPELINE + 6-COL STANDARDS
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="delivery-blueprint-heading"
          className="bg-white py-16 sm:py-24"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <FadeIn className="max-w-3xl mb-10 sm:mb-12">
              <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                Delivery Process
              </span>
              <h2
                id="delivery-blueprint-heading"
                className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
              >
                The workflow stayed structured, transparent &amp; production-driven.
              </h2>
            </FadeIn>

            {/* Interactive Connected 5-Stage Bar */}
            <FadeIn delay={0.05}>
              <div
                role="tablist"
                aria-label="Project delivery stages"
                className="rounded-2xl border border-neutral-200/90 bg-neutral-200/70 p-px overflow-hidden grid grid-cols-1 sm:grid-cols-5 gap-px shadow-xs"
              >
                {detail.deliveryStages.map((stage, idx) => {
                  const isActive = activeStageIdx === idx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveStageIdx(idx)}
                      className={cn(
                        "group relative px-4 py-4 sm:py-5 text-left sm:text-center transition-all duration-300 cursor-pointer focus:outline-none",
                        isActive
                          ? "bg-accent text-white"
                          : "bg-[#fafafa] hover:bg-neutral-100 text-[#0f0000]",
                      )}
                    >
                      <span
                        className={cn(
                          "block text-[11px] font-sans font-semibold uppercase tracking-[0.12em] tabular-nums",
                          isActive ? "text-red-100" : "text-neutral-500",
                        )}
                      >
                        Stage {stage.step}
                      </span>
                      <span className="mt-1 block text-sm sm:text-base font-bold tracking-tight">
                        {stage.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Output Drawer */}
              <div className="mt-5 rounded-2xl sm:rounded-3xl bg-[#fafafa] border border-neutral-200/90 p-6 sm:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE_SMOOTH }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
                  >
                    <div className="lg:col-span-5">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0f0000] tracking-tight">
                        {activeStage.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {activeStage.focus}
                      </p>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeStage.deliverables.map((item) => (
                        <div
                          key={item}
                          className="rounded-xl bg-white border border-neutral-200/80 px-4 py-3.5 flex items-start gap-3"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-[#0f0000] leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </FadeIn>

            {/* 6-Column Production Standards Bar */}
            <FadeIn delay={0.1} className="mt-10 sm:mt-12">
              <div className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-4">
                System Benchmarks &amp; Engineering Guarantees
              </div>

              <div className="bg-neutral-200/80 p-px rounded-2xl overflow-hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px">
                {detail.systemStandards.map((std) => {
                  const Icon = STANDARD_ICONS[std.iconKey];
                  return (
                    <div
                      key={std.label}
                      className="bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 hover:bg-[#fffafa] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          {std.label}
                        </div>
                        <div className="mt-1 text-sm font-bold text-[#0f0000] leading-snug">
                          {std.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 8: OPERATIONAL TRANSFORMATION + PRODUCTION STACK
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="transformation-heading"
          className="bg-[#fafafa] py-16 sm:py-24 border-t border-neutral-200/70"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <FadeIn>
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    Business Impact
                  </span>
                  <h2
                    id="transformation-heading"
                    className="text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                  >
                    {detail.transformationTitle}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {detail.transformationBody}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {detail.transformationOutcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-3 text-sm sm:text-[15px] text-[#0f0000] leading-snug"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-600 shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>

              <div className="lg:col-span-6">
                <FadeIn delay={0.08}>
                  <div className="relative rounded-3xl overflow-hidden bg-[#0f0000] border border-neutral-200/90 shadow-[0_28px_75px_-28px_rgba(15,0,0,0.22)]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src="/images/contact/engineering-briefing.jpg"
                        alt="Endow Tech engineering leads across Seoul HQ and Dhaka Hub collaborating on systems architecture"
                        fill
                        sizes="(max-width: 1024px) 100vw, 640px"
                        className="object-cover object-center"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
                      />

                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-sans uppercase tracking-[0.12em] text-accent font-semibold">
                            Joint Delivery Studio
                          </div>
                          <div className="mt-0.5 text-sm sm:text-base font-bold text-white">
                            {siteConfig.offices[0]?.city} HQ ↔{" "}
                            {siteConfig.offices[1]?.city} Tech Hub
                          </div>
                        </div>
                        <div className="text-xs font-sans font-medium tabular-nums text-gray-300">
                          99.98% Production SLA Standard
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Red Technology Stack Band */}
        <section
          aria-labelledby="tech-used-heading"
          className="relative bg-accent text-white py-14 sm:py-20 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute -right-14 sm:-right-6 md:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[320px] sm:w-[440px] md:w-[540px] pointer-events-none select-none opacity-15 sm:opacity-20"
          >
            <Image
              src="/images/watermark_white.webp"
              alt=""
              width={640}
              height={748}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <FadeIn>
              <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-white/85 mb-2.5">
                Built With
              </span>
              <h2
                id="tech-used-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white"
              >
                Production Technology Stack
              </h2>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {techVisuals.map((item) => (
                  <TechStackTile key={item.name} item={item} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 9: RELATED CASE STUDIES + PREV / NEXT PROJECT NAVIGATOR
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="related-case-studies-heading"
          className="bg-white py-16 sm:py-24"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2">
                  Continue Exploring
                </span>
                <h2
                  id="related-case-studies-heading"
                  className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                >
                  Related Case Studies
                </h2>
              </div>

              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-600 hover:text-accent transition-colors"
              >
                <span>View All 5 Case Studies</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
              {relatedProjects.map((rel, idx) => (
                <RelatedCaseStudyCard
                  key={rel.id}
                  project={rel}
                  index={idx}
                />
              ))}
            </div>

            {/* Prev / Next Navigation Footer */}
            <div className="mt-12 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Link
                href={`/projects/${prevProject.id}`}
                className="group flex items-center gap-4 text-left p-4 rounded-2xl bg-[#fafafa] hover:bg-white border border-neutral-200/80 hover:border-red-200 transition-all sm:min-w-[260px]"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-sans font-semibold text-neutral-500 uppercase tracking-[0.12em]">
                    Previous Case Study
                  </div>
                  <div className="text-sm font-bold text-[#0f0000] group-hover:text-accent transition-colors truncate">
                    {prevProject.title}
                  </div>
                </div>
              </Link>

              <Link
                href="/case-studies"
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-sans font-semibold text-neutral-600 hover:text-accent border border-neutral-200 hover:border-red-200 transition-colors whitespace-nowrap"
              >
                All Case Studies
              </Link>

              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex items-center justify-between sm:justify-end gap-4 text-right p-4 rounded-2xl bg-[#fafafa] hover:bg-white border border-neutral-200/80 hover:border-red-200 transition-all sm:min-w-[260px]"
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-sans font-semibold text-neutral-500 uppercase tracking-[0.12em]">
                    Next Case Study
                  </div>
                  <div className="text-sm font-bold text-[#0f0000] group-hover:text-accent transition-colors truncate">
                    {nextProject.title}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 10: FULL-WIDTH RED WATERMARK CTA BANNER
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="project-cta-banner-heading"
          className="relative w-full bg-accent text-white py-16 sm:py-20 overflow-hidden"
        >
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
              <div className="text-xs font-sans uppercase tracking-[0.18em] text-white/85 font-semibold mb-3">
                Ready to build a similar platform?
              </div>
              <h2
                id="project-cta-banner-heading"
                className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.15]"
              >
                Put the right technical people in the room.
              </h2>
              <div className="mt-7 flex justify-center">
                <FlowButton
                  variant="white-red"
                  size="lg"
                  onClick={() => setIsSchedulerOpen(true)}
                >
                  Schedule Discovery Call
                </FlowButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 11: BOTTOM BRIEF & COLLABORATION SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="project-contact"
          aria-labelledby="project-contact-heading"
          className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #ffffff 0%, #fff9f9 48%, #fef2f2 100%)",
          }}
        >
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
              <div className="lg:col-span-5">
                <FadeIn>
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    Initiate Collaboration
                  </span>
                  <h2
                    id="project-contact-heading"
                    className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.1]"
                  >
                    Bring us what needs to change.
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md">
                    Share the system bottleneck, workflow, or platform roadmap
                    your team is planning. Our Seoul headquarters and Dhaka
                    engineering leads respond within 24 hours.
                  </p>

                  <div className="mt-8 space-y-3 max-w-sm">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-neutral-200/90 hover:border-red-200 shadow-xs transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-accent flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" aria-hidden="true" />
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
                        <MessageSquare className="w-4 h-4" aria-hidden="true" />
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
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </FadeIn>
              </div>

              <div className="lg:col-span-7">
                <FadeIn delay={0.08}>
                  <ContactForm
                    idPrefix={`project-${project.id}-brief`}
                    variant="elevated"
                    defaultService={detail.defaultServiceOption}
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
