"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Check,
  Compass,
  Copy,
  FileSearch,
  Mail,
  MessageSquare,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AnimatedContent from "@/components/AnimatedContent";
import { FlowButton } from "@/components/ui/FlowButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { LeadershipCards } from "@/components/contact/LeadershipCards";
import { LocalTimeRoutes } from "@/components/contact/LocalTimeRoutes";
import {
  contactNextSteps,
  contactPageContent,
  contactServiceOptions,
} from "@/data/contact";
import { siteConfig } from "@/data/siteConfig";

const STEP_ICONS = {
  "file-search": FileSearch,
  users: Users,
  compass: Compass,
} as const;

export function ContactPageClient({
  initialService,
}: {
  initialService?: string;
}) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const resolvedDefaultService =
    initialService && contactServiceOptions.includes(initialService)
      ? initialService
      : contactServiceOptions[0];

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.contact.email}`;
    }
  };

  const scrollToBriefForm = () => {
    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 550);
  };

  return (
    <>
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />

      <main className="overflow-x-clip">
        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1: SPLIT HERO + LEADERSHIP CARDS + REUSABLE BRIEF FORM (NO GRID)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="contact-hero-heading"
          className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #ffffff 0%, #fff9f9 48%, #fef2f2 100%)",
          }}
        >
          {/* Soft Ambient Red Glows */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-accent/[0.06] blur-[130px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-0 w-[560px] h-[560px] rounded-full bg-red-500/[0.08] blur-[150px] pointer-events-none"
          />

          {/* Endow Tech Signature Red Watermark Behind Right Column */}
          <div
            aria-hidden="true"
            className="absolute -right-24 sm:-right-12 lg:right-0 -bottom-16 sm:-bottom-12 w-[340px] sm:w-[480px] lg:w-[600px] xl:w-[680px] pointer-events-none select-none opacity-[0.14] sm:opacity-[0.18]"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-stretch">
              {/* Left Column: Editorial Headline + Dual Leadership Cards */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-10">
                <AnimatedContent
                  trigger="mount"
                  direction="vertical"
                  distance={22}
                  duration={0.65}
                  ease="power3.out"
                >
                  {/* Red Section Title Style Matching ServicesSection */}
                  <span className="block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-3">
                    {contactPageContent.hero.eyebrow}
                  </span>

                  <h1
                    id="contact-hero-heading"
                    className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.05] max-w-xl"
                  >
                    {contactPageContent.hero.titleLine1}{" "}
                    <span className="gradient-text">
                      {contactPageContent.hero.titleHighlight}
                    </span>
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg">
                    {contactPageContent.hero.subtitle}
                  </p>
                </AnimatedContent>

                {/* CEO Card + Smaller Left-Aligned Tech Lead Card */}
                <LeadershipCards />
              </div>

              {/* Right Column: Reusable Contact Form */}
              <div
                id="contact-brief-form"
                ref={formSectionRef}
                className="lg:col-span-6 flex items-center"
              >
                <AnimatedContent
                  trigger="mount"
                  direction="vertical"
                  distance={0}
                  scale={0.96}
                  duration={0.68}
                  delay={0.04}
                  ease="power3.out"
                  className="w-full"
                >
                  <ContactForm
                    idPrefix="contact-page"
                    defaultService={resolvedDefaultService}
                    showCompanyField
                    showBudgetField={false}
                    nameInputRef={nameInputRef}
                    className="w-full"
                  />
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2: DARK DIRECT-CONNECT STRIP (LARGER, WHITE ICON BOX, LIGHT BORDERLESS CARDS)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="direct-connect-heading"
          className="relative bg-[#0f0000] text-white py-24 sm:py-28 lg:py-36 overflow-hidden"
        >
          {/* Subtle Ambient Glow + White Watermark */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[340px] rounded-full bg-accent/18 blur-[150px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] pointer-events-none select-none opacity-[0.06]"
          >
            <Image
              src="/images/watermark_white.webp"
              alt=""
              width={640}
              height={748}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <AnimatedContent
              direction="vertical"
              reverse
              distance={16}
              threshold={0.06}
              duration={0.58}
              ease="power2.out"
            >
              <h2
                id="direct-connect-heading"
                className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-tight"
              >
                {contactPageContent.directStrip.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {contactPageContent.directStrip.subtitle}
              </p>
            </AnimatedContent>

            {/* Direct Channel Pills: Larger Cards, Lighter Surface, Zero Border, White Icon Button */}
            <AnimatedContent
              direction="vertical"
              distance={20}
              scale={0.97}
              stagger={0.08}
              staggerFrom="center"
              threshold={0.06}
              duration={0.62}
              ease="power3.out"
              className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto"
            >
              {/* Email Card with quick copy */}
              <div className="group flex items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/[0.11] hover:bg-white/[0.16] backdrop-blur-md transition-colors duration-200 text-left">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#0f0000] group-hover:text-accent flex items-center justify-center transition-colors duration-200 shrink-0 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-300">
                      {contactPageContent.directStrip.emailLabel}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white truncate mt-1">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title={emailCopied ? "Copied!" : "Copy email"}
                  className="w-10 h-10 rounded-xl bg-white text-[#0f0000] hover:bg-red-50 hover:text-accent flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-sm"
                >
                  {emailCopied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* WhatsApp / Direct Phone */}
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 sm:gap-5 p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/[0.11] hover:bg-white/[0.16] backdrop-blur-md transition-colors duration-200 text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-[#0f0000] group-hover:text-accent flex items-center justify-center transition-colors duration-200 shrink-0 shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-300">
                    {contactPageContent.directStrip.whatsappLabel}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white tabular-nums truncate mt-1">
                    {siteConfig.contact.whatsappDisplay}
                  </div>
                </div>
              </a>

              {/* Discovery Calendar Call */}
              <button
                type="button"
                onClick={() => setIsSchedulerOpen(true)}
                className="group sm:col-span-2 lg:col-span-1 flex items-center gap-4 sm:gap-5 p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/[0.11] hover:bg-white/[0.16] backdrop-blur-md transition-colors duration-200 text-left cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-[#0f0000] group-hover:text-accent flex items-center justify-center transition-colors duration-200 shrink-0 shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-300">
                    {contactPageContent.directStrip.schedulerLabel}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white truncate mt-1">
                    {contactPageContent.directStrip.schedulerValue} →
                  </div>
                </div>
              </button>
            </AnimatedContent>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3: "WHAT HAPPENS NEXT" VISUAL + 3-STEP WORKFLOW CARDS
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="what-happens-next-heading"
          className="py-20 sm:py-24 lg:py-28 bg-white"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section Header (Red Title Style Matching ServicesSection) */}
            <AnimatedContent
              direction="vertical"
              distance={16}
              threshold={0.06}
              duration={0.55}
              ease="power2.out"
              className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
            >
              <span className="block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-2">
                {contactPageContent.whatHappensNext.eyebrow}
              </span>
              <h2
                id="what-happens-next-heading"
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0f0000] tracking-tight leading-[1.12]"
              >
                {contactPageContent.whatHappensNext.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {contactPageContent.whatHappensNext.subtitle}
              </p>
            </AnimatedContent>

            {/* Editorial Studio Team Visual */}
            <AnimatedContent
              wipe="center"
              distance={0}
              scale={0.985}
              threshold={0.06}
              duration={0.78}
              ease="power2.out"
            >
              <div className="group relative rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_24px_65px_-20px_rgba(15,0,0,0.14)] aspect-[16/9] sm:aspect-[16/8] bg-[#0f0000]">
                <Image
                  src={contactPageContent.whatHappensNext.image}
                  alt={contactPageContent.whatHappensNext.imageAlt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1104px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                    {contactPageContent.whatHappensNext.imageCaption}
                  </span>
                </div>
              </div>
            </AnimatedContent>

            {/* 3-Step Workflow Cards */}
            <AnimatedContent
              direction="horizontal"
              reverse
              distance={22}
              stagger={0.08}
              threshold={0.06}
              duration={0.6}
              ease="power2.out"
              className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
            >
              {contactNextSteps.map((step) => {
                const Icon = STEP_ICONS[step.iconName];
                return (
                  <div
                    key={step.number}
                    className="group relative h-full rounded-2xl bg-[#fafafa] hover:bg-white border border-neutral-200/90 hover:border-red-200 p-6 sm:p-7 transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-[0_18px_45px_-16px_rgba(220,38,38,0.12)] overflow-hidden"
                  >
                    {/* Soft signature blush glow in bottom-left */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-accent/[0.06] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/90 text-accent flex items-center justify-center shadow-xs group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-200">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-accent transition-colors">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#0f0000] tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </AnimatedContent>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 4: LOCAL TIME & DIRECT ROUTES (ONLY SEOUL & DHAKA)
        ══════════════════════════════════════════════════════════════════════ */}
        <LocalTimeRoutes />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 5: BOTTOM FULL-WIDTH RED WATERMARK CTA BANNER
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="bottom-cta-heading"
          className="relative w-full bg-accent text-white py-14 sm:py-16 lg:py-20 overflow-hidden"
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
            <AnimatedContent
              direction="vertical"
              distance={0}
              scale={0.98}
              threshold={0.05}
              duration={0.62}
              ease="power2.out"
              className="max-w-2xl"
            >
              <div className="text-xs font-mono uppercase tracking-[0.16em] text-white/80 font-semibold mb-3">
                {contactPageContent.bottomCta.eyebrow}
              </div>
              <h2
                id="bottom-cta-heading"
                className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.15]"
              >
                {contactPageContent.bottomCta.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed max-w-lg">
                {contactPageContent.bottomCta.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <FlowButton
                  variant="white-red"
                  size="lg"
                  onClick={scrollToBriefForm}
                >
                  {contactPageContent.bottomCta.primaryAction}
                </FlowButton>
                <FlowButton
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsSchedulerOpen(true)}
                >
                  {contactPageContent.bottomCta.secondaryAction}
                </FlowButton>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default ContactPageClient;
