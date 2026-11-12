"use client";

import AnimatedContent from "@/components/AnimatedContent";
import { scrollToElement } from "@/components/SmoothScroll";
import { ContactForm } from "@/components/contact/ContactForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/FadeIn";
import ServiceCapabilitiesSection from "@/components/services/ServiceCapabilitiesSection";
import ServiceSectionNav from "@/components/services/ServiceSectionNav";
import ServiceStackGravitySection from "@/components/services/ServiceStackGravitySection";
import { FlowButton } from "@/components/ui/FlowButton";
import { caseStudyDomainMeta } from "@/data/caseStudiesPage";
import type { FeaturedProject } from "@/data/featuredProjects";
import type { ServiceDetailData } from "@/data/serviceDetails";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import type { Service, TechItem, Testimonial } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Gauge,
  Globe,
  GraduationCap,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Network,
  Quote,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OUTCOME_ICONS = {
  zap: Zap,
  shield: Shield,
  layers: Layers,
  globe: Globe,
  database: Database,
  cpu: Cpu,
  lock: Lock,
  gauge: Gauge,
  code: Code2,
} as const;

const SERVICE_ICONS: Record<string, typeof Code2> = {
  Code: Code2,
  Layers,
  GraduationCap,
  Network,
  Sparkles,
  ShieldCheck,
};

function shouldAnimateMetric(val: string): boolean {
  if (val.startsWith("0") || val.startsWith("<") || val.startsWith("$")) {
    return false;
  }
  return /^[^\d.]*\d+(?:,\d+)*(?:\.\d+)?[^\d]*$/.test(val);
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
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
              {project.client} · {project.clientLocation}
            </div>
            <Link href={`/projects/${project.id}`} className="block mt-1">
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

export interface ServiceDetailClientProps {
  service: Service;
  detail: ServiceDetailData;
  techItems: TechItem[];
  relatedProjects: FeaturedProject[];
  otherServices: Service[];
  testimonial: Testimonial;
}

export default function ServiceDetailClient({
  service,
  detail,
  techItems,
  relatedProjects,
  otherServices,
  testimonial,
}: ServiceDetailClientProps) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    detail.faqs[0]?.id ?? null,
  );

  const HeroServiceIcon = SERVICE_ICONS[service.iconName] ?? Code2;

  const handleScrollTo = (selector: string) => {
    scrollToElement(selector, -66, 0.75);
  };

  return (
    <>
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />

      <main className="overflow-x-clip">
        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1: LIGHT EDITORIAL HERO + ENGINEERING SCOPE SPEC CARD
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="service-hero-heading"
          className="relative bg-gradient-to-b from-[#f8f9fb] via-white to-white pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 overflow-hidden"
        >
          {/* Ambient Crimson Soft Glow & Right Architectural Watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-accent/[0.045] blur-[140px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 sm:-right-10 top-20 sm:top-16 w-[340px] sm:w-[480px] lg:w-[600px] pointer-events-none select-none opacity-[0.06] sm:opacity-[0.08]"
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
            <AnimatedContent
              trigger="mount"
              direction="vertical"
              distance={18}
              duration={0.6}
              ease="power3.out"
            >
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-xs font-sans font-medium text-neutral-500 mb-6 sm:mb-8"
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
                  href="/#services"
                  className="hover:text-[#0f0000] transition-colors"
                >
                  Services
                </Link>
                <ChevronRight
                  className="w-3.5 h-3.5 text-neutral-400"
                  aria-hidden="true"
                />
                <span className="text-[#0f0000] font-semibold">
                  {service.title}
                </span>
              </nav>

              {/* Hero Two-Column Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column: Headline, Narrative & CTAs */}
                <div className="lg:col-span-7">
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-3">
                    {detail.eyebrow}
                  </span>

                  <h1
                    id="service-hero-heading"
                    className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[60px] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.06]"
                  >
                    {detail.heroTitle}{" "}
                    <span className="gradient-text">
                      {detail.heroHighlight}
                    </span>
                  </h1>

                  <p className="mt-5 text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                    {detail.heroSummary}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <FlowButton
                      variant="primary"
                      size="lg"
                      onClick={() => setIsSchedulerOpen(true)}
                    >
                      Schedule Consultation
                    </FlowButton>
                    <FlowButton
                      variant="outline"
                      size="lg"
                      onClick={() => handleScrollTo("#service-contact")}
                    >
                      Brief the Team
                    </FlowButton>
                  </div>
                </div>

                {/* Right Column: Editorial Service Blueprint Spec Card */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_24px_70px_-24px_rgba(15,0,0,0.12),0_0_0_1px_rgba(220,38,38,0.04)] p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-100">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center shrink-0">
                          <HeroServiceIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-accent tabular-nums">
                            Capability {detail.indexNumber}
                          </div>
                          <div className="text-base font-bold text-[#0f0000] leading-snug">
                            {service.title}
                          </div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-700 whitespace-nowrap">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                          aria-hidden="true"
                        />
                        Production Ready
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-3">
                        Core Engagement Deliverables
                      </div>
                      <ul className="space-y-2.5">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-[#0f0000] font-medium leading-snug"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-accent shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-5 border-t border-neutral-100">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-[#fafafa] border border-neutral-200/90 text-xs font-sans font-medium text-neutral-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#fafafa] border border-neutral-200/80 p-3.5 text-xs">
                        <div>
                          <div className="text-neutral-500 font-medium">
                            Studio Delivery
                          </div>
                          <div className="mt-0.5 font-bold text-[#0f0000]">
                            Seoul HQ · Dhaka Hub
                          </div>
                        </div>
                        <div className="border-l border-neutral-200/80 pl-3">
                          <div className="text-neutral-500 font-medium">
                            Ownership Model
                          </div>
                          <div className="mt-0.5 font-bold text-[#0f0000]">
                            100% Client IP
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2: SOLID CRIMSON METRICS BANNER
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="Service benchmarks"
          className="relative bg-accent text-white py-12 sm:py-16 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute -right-14 sm:-right-6 md:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] md:w-[500px] pointer-events-none select-none opacity-15 sm:opacity-20"
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-0 lg:divide-x divide-white/20">
              {detail.metrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center justify-center text-center px-3 sm:px-6"
                >
                  <div className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-none tabular-nums">
                    {shouldAnimateMetric(metric.value) ? (
                      <CountUp
                        value={metric.value}
                        delay={idx * 0.1}
                        duration={1.8}
                      />
                    ) : (
                      metric.value
                    )}
                  </div>
                  <div className="mt-2.5 text-xs sm:text-sm font-semibold text-white">
                    {metric.label}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-sans font-medium text-white/80">
                    {metric.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky In-Page Section Navigation (replaces Verified Production Stack strip) */}
        <ServiceSectionNav />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3: SERVICE OVERVIEW & 2×2 OUTCOME PILLARS
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="service-overview"
          aria-labelledby="service-overview-heading"
          className="bg-[#fafafa] py-16 sm:py-20 lg:py-24 border-b border-neutral-200/70"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Section Heading & Tags */}
              <div className="lg:col-span-5">
                <FadeIn>
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    {detail.overviewEyebrow}
                  </span>
                  <h2
                    id="service-overview-heading"
                    className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                  >
                    {detail.overviewHeading}
                  </h2>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white border border-neutral-200/90 text-xs font-medium text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleScrollTo("#service-capabilities")}
                    className="group inline-flex items-center gap-2 mt-7 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-accent hover:underline cursor-pointer"
                  >
                    <span>Explore Deliverables &amp; Modules</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </FadeIn>
              </div>

              {/* Right Column: Summary + Hairline 2×2 Outcome Grid */}
              <div className="lg:col-span-7">
                <FadeIn delay={0.06}>
                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                    {detail.overviewSummary}
                  </p>

                  <div className="mt-8 bg-neutral-200/80 p-px rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-px shadow-xs">
                    {detail.outcomes.map((outcome) => {
                      const Icon = OUTCOME_ICONS[outcome.iconKey] ?? Layers;
                      return (
                        <div
                          key={outcome.title}
                          className="bg-white p-5 sm:p-6 flex flex-col justify-between hover:bg-[#fffafa] transition-colors"
                        >
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center mb-4">
                              <Icon className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#0f0000] tracking-tight leading-snug">
                              {outcome.title}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                              {outcome.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 4: DELIVERABLES & CAPABILITIES (HOMEPAGE BLUEPRINT DESIGN)
        ══════════════════════════════════════════════════════════════════════ */}
        <ServiceCapabilitiesSection
          eyebrow={detail.capabilitiesEyebrow}
          heading={detail.capabilitiesHeading}
          summary={detail.capabilitiesSummary}
          capabilities={detail.capabilities}
        />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 5: TECHNOLOGY STACK (GRAVITY SKELETON), MODELS & STANDARDS
        ══════════════════════════════════════════════════════════════════════ */}
        <ServiceStackGravitySection
          techItems={techItems}
          standards={detail.standards}
        />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 6: PRODUCTION PROOF — RELATED CASE STUDIES & ENDORSEMENT
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="service-proof"
          aria-labelledby="service-proof-heading"
          className="bg-white py-16 sm:py-24"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
              <div className="max-w-2xl">
                <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2">
                  Production Proof
                </span>
                <h2
                  id="service-proof-heading"
                  className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                >
                  Real platforms shipped with this capability.
                </h2>
              </div>

              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-600 hover:text-accent transition-colors shrink-0"
              >
                <span>View All Case Studies</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </FadeIn>

            {/* 2 Related Case Study Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
              {relatedProjects.map((project, idx) => (
                <RelatedCaseStudyCard
                  key={project.id}
                  project={project}
                  index={idx}
                />
              ))}
            </div>

            {/* Client & Partner Endorsement Card */}
            <FadeIn delay={0.1} className="mt-8 sm:mt-10">
              <div className="rounded-3xl bg-[#fafafa] border border-neutral-200/90 p-6 sm:p-8 lg:p-10 shadow-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  <div className="lg:col-span-8">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center mb-4">
                      <Quote className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-[#0f0000] leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="lg:col-span-4 lg:border-l lg:border-neutral-200/80 lg:pl-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-200/70">
                    {testimonial.badge && (
                      <span className="inline-block px-2.5 py-1 rounded-full bg-red-50 border border-red-200/80 text-[11px] font-semibold text-accent mb-3">
                        {testimonial.badge}
                      </span>
                    )}
                    <div className="text-base font-bold text-[#0f0000]">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-neutral-600 mt-0.5">
                      {testimonial.role}
                    </div>
                    <div className="text-xs font-semibold text-accent mt-1">
                      {testimonial.organization}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 7: EXPLORE OTHER ENGINEERING SERVICES (BALANCED 3×2 GRID)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="other-services"
          aria-labelledby="other-services-heading"
          className="bg-[#fafafa] py-16 sm:py-20 border-y border-neutral-200/70"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2">
                  Full Studio Capabilities
                </span>
                <h2
                  id="other-services-heading"
                  className="text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                >
                  Explore adjacent engineering services.
                </h2>
              </div>

              <Link
                href="/#services"
                className="group inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-600 hover:text-accent transition-colors shrink-0"
              >
                <span>All Core Capabilities</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherServices.map((other, idx) => {
                const OtherIcon = SERVICE_ICONS[other.iconName] ?? Code2;
                return (
                  <FadeIn key={other.id} delay={idx * 0.04}>
                    <Link
                      href={`/services/${other.id}`}
                      className="group h-full flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/90 hover:border-red-200 hover:shadow-[0_18px_45px_-20px_rgba(220,38,38,0.12)] p-6 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#fafafa] border border-neutral-200/80 text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent flex items-center justify-center transition-colors">
                            <OtherIcon className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <ArrowRight
                            className="w-4 h-4 text-neutral-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                            aria-hidden="true"
                          />
                        </div>

                        <h3 className="text-lg font-bold text-[#0f0000] tracking-tight group-hover:text-accent transition-colors">
                          {other.title}
                        </h3>
                        <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                          {other.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
                        {other.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-[#fafafa] border border-neutral-200/80 text-[11px] font-sans font-medium text-neutral-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}

              {/* 6th Balanced Tile: Multi-Service / Custom Architecture */}
              <FadeIn delay={otherServices.length * 0.04}>
                <div className="h-full flex flex-col justify-between rounded-2xl bg-theme-dark text-white p-6 border border-white/10 shadow-sm">
                  <div>
                    <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-accent mb-3">
                      Combined Roadmap
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                      Need multiple services unified under one team?
                    </h3>
                    <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                      Many platforms combine Next.js web portals, multi-tenant
                      APIs, AI workflows, and hardened cloud SRE.
                    </p>
                  </div>

                  <div className="mt-6">
                    <FlowButton
                      variant="white-red"
                      size="md"
                      fullWidth
                      onClick={() => handleScrollTo("#service-contact")}
                    >
                      Request Combined Scope
                    </FlowButton>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 8: 2-COLUMN SERVICE-SPECIFIC FAQ ACCORDION
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="service-faq"
          aria-labelledby="service-faq-heading"
          className="relative bg-white py-16 sm:py-24 border-b border-neutral-200/70"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Sticky Intro & Direct Consultation Box */}
              <div className="lg:col-span-5 lg:sticky lg:top-36">
                <FadeIn>
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    Service FAQ
                  </span>
                  <h2
                    id="service-faq-heading"
                    className="text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                  >
                    Technical answers before your first sprint.
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md">
                    Clear engineering commitments around architecture, code
                    ownership, security boundaries, and timelines for{" "}
                    <span className="font-semibold text-[#0f0000]">
                      {service.title}
                    </span>
                    .
                  </p>

                  <div className="mt-7 rounded-2xl bg-[#fafafa] border border-neutral-200/90 p-5 sm:p-6 shadow-xs max-w-md">
                    <div className="text-sm font-bold text-[#0f0000]">
                      Prefer speaking directly with an architect?
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      Book a 20-minute technical discovery session with our
                      Seoul &amp; Dhaka engineering leads.
                    </p>
                    <div className="mt-4">
                      <FlowButton
                        variant="primary"
                        size="md"
                        onClick={() => setIsSchedulerOpen(true)}
                      >
                        Schedule Discovery Call
                      </FlowButton>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column: Accessible Interactive Accordion */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                {detail.faqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  const panelId = `${faq.id}-panel`;
                  const triggerId = `${faq.id}-trigger`;

                  return (
                    <div
                      key={faq.id}
                      className={cn(
                        "rounded-2xl border transition-colors duration-200 overflow-hidden",
                        isOpen
                          ? "bg-white border-red-200/90 shadow-xs"
                          : "bg-[#fafafa] border-neutral-200/90 hover:bg-white hover:border-neutral-300",
                      )}
                    >
                      <button
                        id={triggerId}
                        type="button"
                        onClick={() =>
                          setOpenFaqId((prev) =>
                            prev === faq.id ? null : faq.id,
                          )
                        }
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span className="text-base sm:text-lg font-bold text-[#0f0000] tracking-tight leading-snug">
                          {faq.question}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-transform duration-200",
                            isOpen
                              ? "border-accent/40 bg-red-50 text-accent rotate-180"
                              : "border-neutral-200 bg-[#fafafa] text-neutral-500 rotate-0",
                          )}
                          aria-hidden="true"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-4 border-t border-neutral-100 text-sm sm:text-[15px] text-neutral-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 9: BOTTOM BRIEF & COLLABORATION SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="service-contact"
          aria-labelledby="service-contact-heading"
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
              {/* Left Column: Editorial Prompt & Direct Channels */}
              <div className="lg:col-span-5">
                <FadeIn>
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    Initiate Collaboration
                  </span>
                  <h2
                    id="service-contact-heading"
                    className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.1]"
                  >
                    Scope your {service.title.toLowerCase()} roadmap.
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md">
                    Share your goals, architecture constraints, or RFPs. Our
                    Seoul headquarters and Dhaka engineering leads respond within
                    24 hours with a concrete technical plan.
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
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="group inline-flex items-center gap-2 mt-6 text-xs font-sans font-semibold uppercase tracking-[0.12em] text-neutral-600 hover:text-accent transition-colors"
                  >
                    <span>Open full Contact Hub &amp; Seoul/Dhaka hours</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </FadeIn>
              </div>

              {/* Right Column: Pre-Selected Service ContactForm */}
              <div className="lg:col-span-7">
                <FadeIn delay={0.08}>
                  <ContactForm
                    idPrefix={`service-${service.id}-brief`}
                    variant="elevated"
                    defaultService={service.title}
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
