"use client";

import AnimatedContent from "@/components/AnimatedContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { FlowButton } from "@/components/ui/FlowButton";
import { sitemapSections } from "@/data/sitemapData";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITEMAP TYPOGRAPHY & SIZE TOKENS
 * Modify these tokens in one place to easily adjust font sizes & styles
 * across the entire sitemap page!
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const SITEMAP_TYPOGRAPHY = {
  // 1. Black Category Section Header (e.g. "Engineering Services", "Flagship Systems")
  categoryTitle:
    "text-2xl sm:text-3xl lg:text-[30px] font-bold text-[#0f0000] ",
  categoryTitleMargin: "mb-7 sm:mb-9",

  // 2. Red Uppercase Subheading (e.g. "CORE CAPABILITIES", "PRODUCTION PLATFORMS")
  redSubheading:
    "text-base sm:text-lg lg:text-[20px] font-sans font-bold uppercase tracking-[0.10em] text-accent",
  redSubheadingMargin: "mb-3.5 sm:mb-4",

  // 3. Main Links (e.g. "Enterprise Web Applications", "Endow Connect")
  linkLabel:
    "text-base sm:text-md lg:text-[18px] font-medium text-neutral-500 group-hover:text-accent transition-colors duration-150 leading-snug",
  linkArrow:
    "text-base sm:text-lg font-sans text-neutral-400 group-hover:text-accent transition-all duration-150 group-hover:translate-x-1 shrink-0",
  linkPadding: "py-1.5 sm:py-2",
  linkGap: "space-y-2.5 sm:space-y-3",
  groupGap: "space-y-9 sm:space-y-11",
} as const;

export default function SitemapPageClient() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <>
      {/* ── Fixed Navbar ── */}
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />

      <main className="overflow-x-clip bg-white">
        {/* ══════════════════════════════════════════════════════════════════════
            HERO SECTION: DAFFODIL VARSITY REFERENCE (COVER BANNER + OVERLAY)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="sitemap-hero-heading"
          className="relative min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-16 text-white overflow-hidden flex flex-col justify-end"
        >
          {/* Background Photograph */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/south-korea-cover2.jpg"
              alt="Seoul, South Korea skyline"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_48%] brightness-90"
            />
            {/* Rich Dark Gradient & Crimson Vignette */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0f0000] via-[#0f0000]/80 to-black/75"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 sm:px-8 lg:px-12">
            <AnimatedContent
              trigger="mount"
              direction="vertical"
              distance={18}
              duration={0.55}
              ease="power3.out"
            >
              {/* Breadcrumb Navigation */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-white/70 mb-3 sm:mb-4"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight
                  className="w-3.5 h-3.5 text-white/40"
                  aria-hidden="true"
                />
                <span className="text-white font-semibold">Sitemap</span>
              </nav>

              {/* Big Clean Title */}
              <h1
                id="sitemap-hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.035em] leading-[1.08]"
              >
                Sitemap
              </h1>

              {/* Subtitle Description */}
              <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl leading-relaxed">
                Explore the comprehensive sitemap of Endow Tech to easily
                navigate through our engineering services, flagship platforms,
                case studies, and corporate hubs.
              </p>
            </AnimatedContent>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            MAIN SITEMAP DIRECTORY (CLEAN UNBOXED COLUMNS - SKELETON LAYOUT)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="Website directory listings"
          className="relative py-16 sm:py-20 lg:py-24 bg-white"
        >
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            {/* Clean, unboxed multi-column editorial grid (no card borders/backgrounds) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-14 lg:gap-y-18 items-start">
              {sitemapSections.map((section, sectionIdx) => (
                <FadeIn
                  key={section.id}
                  delay={sectionIdx * 0.03}
                  className="flex flex-col"
                >
                  {/* Big Category Title (Controlled by SITEMAP_TYPOGRAPHY token) */}
                  <h2
                    className={`${SITEMAP_TYPOGRAPHY.categoryTitle} ${SITEMAP_TYPOGRAPHY.categoryTitleMargin}`}
                  >
                    {section.title}
                  </h2>

                  {/* Groups and Link Lists */}
                  <div className={SITEMAP_TYPOGRAPHY.groupGap}>
                    {section.groups.map((group) => (
                      <div key={group.subheading}>
                        {/* Red Uppercase Eyebrow / Subheading (Controlled by SITEMAP_TYPOGRAPHY token) */}
                        <h3
                          className={`${SITEMAP_TYPOGRAPHY.redSubheading} ${SITEMAP_TYPOGRAPHY.redSubheadingMargin}`}
                        >
                          {group.subheading}
                        </h3>

                        {/* Clean Link List: Controlled by SITEMAP_TYPOGRAPHY token */}
                        <ul className={SITEMAP_TYPOGRAPHY.linkGap}>
                          {group.links.map((link) => {
                            const isExt =
                              link.isExternal ||
                              link.href.startsWith("http") ||
                              link.href.startsWith("mailto:") ||
                              link.href.startsWith("tel:");
                            const isAnchor = link.href.startsWith("#");

                            if (isAnchor && link.href === "#schedule") {
                              return (
                                <li key={link.label}>
                                  <button
                                    onClick={() => setIsSchedulerOpen(true)}
                                    className={`group w-full text-left flex items-center justify-between gap-4 cursor-pointer ${SITEMAP_TYPOGRAPHY.linkPadding}`}
                                  >
                                    <span
                                      className={SITEMAP_TYPOGRAPHY.linkLabel}
                                    >
                                      {link.label}
                                    </span>
                                    <span
                                      className={SITEMAP_TYPOGRAPHY.linkArrow}
                                      aria-hidden="true"
                                    >
                                      -&gt;
                                    </span>
                                  </button>
                                </li>
                              );
                            }

                            if (isExt) {
                              return (
                                <li key={link.label}>
                                  <a
                                    href={link.href}
                                    target={
                                      link.href.startsWith("mailto:") ||
                                      link.href.startsWith("tel:")
                                        ? undefined
                                        : "_blank"
                                    }
                                    rel={
                                      link.href.startsWith("mailto:") ||
                                      link.href.startsWith("tel:")
                                        ? undefined
                                        : "noopener noreferrer"
                                    }
                                    className={`group flex items-center justify-between gap-4 ${SITEMAP_TYPOGRAPHY.linkPadding}`}
                                  >
                                    <span
                                      className={SITEMAP_TYPOGRAPHY.linkLabel}
                                    >
                                      {link.label}
                                    </span>
                                    <span
                                      className={SITEMAP_TYPOGRAPHY.linkArrow}
                                      aria-hidden="true"
                                    >
                                      -&gt;
                                    </span>
                                  </a>
                                </li>
                              );
                            }

                            return (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  className={`group flex items-center justify-between gap-4 ${SITEMAP_TYPOGRAPHY.linkPadding}`}
                                >
                                  <span
                                    className={SITEMAP_TYPOGRAPHY.linkLabel}
                                  >
                                    {link.label}
                                  </span>
                                  <span
                                    className={SITEMAP_TYPOGRAPHY.linkArrow}
                                    aria-hidden="true"
                                  >
                                    -&gt;
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            BOTTOM BANNER: FULL-WIDTH RED WATERMARK CTA (TOP OF FOOTER)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="Direct engagement action"
          className="relative w-full bg-accent text-white py-16 sm:py-20 lg:py-24 overflow-hidden"
        >
          {/* Signature Endow Tech White Watermark */}
          <div
            aria-hidden="true"
            className="absolute -right-14 sm:-right-6 md:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] md:w-[580px] lg:w-[680px] pointer-events-none select-none opacity-15 sm:opacity-20"
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-2xl">
                <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80 mb-2.5">
                  Direct Engineering Channel
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.15]">
                  Need a Custom Enterprise Architecture or Technical RFP?
                </h2>
                <p className="mt-3.5 text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                  Connect with our principal engineering team across Seoul and
                  Dhaka to evaluate your system requirements, performance
                  benchmarks, and delivery roadmap.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
                <FlowButton
                  variant="white-red"
                  size="lg"
                  onClick={() => setIsSchedulerOpen(true)}
                >
                  Schedule Consultation
                </FlowButton>
                <FlowButton href="/contact" variant="secondary" size="lg">
                  Start a Project Brief
                </FlowButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Site Footer ── */}
      <Footer />

      {/* ── WhatsApp Floating Action ── */}
      <WhatsAppButton />
    </>
  );
}
