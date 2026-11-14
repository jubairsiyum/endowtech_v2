"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

function PartnerLogoMark({
  logoKey,
  orgShort,
}: {
  logoKey?: Testimonial["logoKey"];
  orgShort?: string;
}) {
  switch (logoKey) {
    case "endow-global":
      return (
        <div className="flex flex-col items-center justify-center leading-none">
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="1.8" />
            <ellipse
              cx="12"
              cy="12"
              rx="4.2"
              ry="9"
              stroke="#dc2626"
              strokeWidth="1.4"
            />
            <path d="M3.5 12h17" stroke="#dc2626" strokeWidth="1.4" />
          </svg>
        </div>
      );
    case "launchmetrics":
      return (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 17L9.5 11.5L13.5 15L20 7.5"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 7.5H20V12"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="4" cy="17" r="1.5" fill="#0f0000" />
        </svg>
      );
    case "horizon":
      return (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="4"
            y="5"
            width="7"
            height="14"
            rx="1.5"
            stroke="#0f0000"
            strokeWidth="1.75"
          />
          <rect
            x="13"
            y="9"
            width="7"
            height="10"
            rx="1.5"
            fill="#dc2626"
            fillOpacity="0.14"
            stroke="#dc2626"
            strokeWidth="1.75"
          />
        </svg>
      );
    case "cuisine":
      return (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 19h16M6 16V10a6 6 0 0 1 12 0v6"
            stroke="#dc2626"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="11" r="1.8" fill="#0f0000" />
        </svg>
      );
    case "desk":
      return (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H11l-4 4v-4H7.5A2.5 2.5 0 0 1 5 12.5v-6Z"
            stroke="#dc2626"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="9.5" cy="9.5" r="1" fill="#0f0000" />
          <circle cx="12" cy="9.5" r="1" fill="#dc2626" />
          <circle cx="14.5" cy="9.5" r="1" fill="#0f0000" />
        </svg>
      );
    default:
      return (
        <span className="text-sm sm:text-base font-black tracking-tight text-accent">
          {orgShort || "ET"}
        </span>
      );
  }
}

export default function TestimonialsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);

    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    const ratio = Math.min(1, Math.max(0, scrollLeft / maxScroll));
    const idx = Math.round(ratio * (testimonials.length - 1));
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState, { passive: true });
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 28 : 780;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const scrollToCard = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const containerPaddingLeft =
      Number.parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({
      left: card.offsetLeft - containerPaddingLeft,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    setIsMouseDown(true);
    isDraggingRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!isMouseDown || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    if (Math.abs(walk) > 6) {
      isDraggingRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
    updateScrollState();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
    updateScrollState();
  };

  return (
    <section
      id="testimonials"
      className="relative section-padding bg-[#fafafa] overflow-hidden border-t border-neutral-200/70"
      aria-labelledby="testimonials-heading"
    >
      {/* ── Soft Flowing Ambient Crimson Glows & Watermark Contours (Reference Inspired) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(220, 38, 38, 0.065) 0%, rgba(239, 68, 68, 0.025) 48%, transparent 74%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-24 w-[620px] h-[620px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0.025) 45%, transparent 72%)",
          }}
        />
        <div
          className="absolute -left-20 sm:-left-10 -bottom-14 w-[320px] sm:w-[460px] lg:w-[540px] opacity-[0.07] sm:opacity-[0.09]"
          style={{
            maskImage:
              "radial-gradient(ellipse 85% 85% at 45% 55%, #000 45%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 85% at 45% 55%, #000 45%, transparent 95%)",
          }}
        >
          <Image
            src="/images/watermark_red.webp"
            alt=""
            width={640}
            height={748}
            className="w-full h-auto object-contain"
          />
        </div>
        <div
          className="hidden md:block absolute -top-12 right-[12%] w-[360px] lg:w-[460px] opacity-[0.05] rotate-12"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 92%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 92%)",
          }}
        >
          <Image
            src="/images/watermark_red.webp"
            alt=""
            width={640}
            height={748}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* ── Centered Editorial Header ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <FadeIn className="text-center max-w-4xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center gap-2.5 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-4">
            <span
              className="w-2 h-2 rounded-[2px] bg-accent shrink-0"
              aria-hidden="true"
            />
            <span>Client Voices</span>
          </div>

          <h2
            id="testimonials-heading"
            className="text-[clamp(34px,4.1vw,58px)] font-bold leading-[1.08] tracking-[-0.035em] text-[#0f0000]"
          >
            What partners value{" "}
            <span className="gradient-text">once the work is live</span>
          </h2>

          <p className="mt-4 sm:mt-5 text-[clamp(15px,1.15vw,18px)] leading-relaxed text-neutral-600 max-w-2xl mx-auto">
            The strongest partnerships show their value after launch. Teams work
            with Endow Tech for technical ownership, reliable delivery, and
            systems built to perform in real operations.
          </p>
        </FadeIn>
      </div>

      {/* ── Horizontal Carousel Track (Aligns with 1400px left margin, peeks next card on right) ── */}
      <div className="relative z-10">
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onScroll={updateScrollState}
          role="region"
          aria-label="Client testimonials carousel"
          className={cn(
            "flex items-stretch gap-6 sm:gap-7 lg:gap-8 overflow-x-auto py-4 select-none",
            "pl-6 pr-6 sm:pl-8 sm:pr-8 lg:pl-[max(3rem,calc((100vw-1400px)/2+3rem))] lg:pr-12",
            "cursor-grab active:cursor-grabbing",
            isMouseDown
              ? "snap-none scroll-auto"
              : "snap-x snap-mandatory scroll-smooth",
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {testimonials.map((t) => {
            const initials =
              t.initials ??
              t.author
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

            return (
              <article
                key={t.id ?? t.author}
                className="group shrink-0 w-[90vw] max-w-[440px] sm:max-w-none sm:w-[560px] md:w-[660px] lg:w-[760px] xl:w-[820px] snap-start rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/85 p-7 sm:p-10 lg:p-12 shadow-[0_16px_44px_-22px_rgba(15,0,0,0.09)] hover:border-red-200/90 hover:shadow-[0_24px_56px_-22px_rgba(220,38,38,0.16)] transition-all duration-300 flex flex-col justify-between min-h-[350px] sm:min-h-[410px] lg:min-h-[450px]"
              >
                <div>
                  {/* Top Row: Organization Emblem + Large Bold Accent Headline */}
                  <div className="flex items-start gap-5 sm:gap-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-2xl bg-white border border-neutral-200/90 shadow-[0_6px_18px_-6px_rgba(15,0,0,0.12)] flex items-center justify-center shrink-0 group-hover:border-red-200 transition-colors">
                      <PartnerLogoMark
                        logoKey={t.logoKey}
                        orgShort={t.orgShort}
                      />
                    </div>

                    <h3 className="text-lg sm:text-[22px] lg:text-[26px] xl:text-[28px] font-bold text-accent leading-[1.28] tracking-[-0.025em] pt-0.5">
                      {t.headline ?? t.organization}
                    </h3>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="mt-6 sm:mt-8 text-[15px] sm:text-[17px] lg:text-[19px] text-neutral-600 leading-[1.68]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom Row: Author Avatar + Meta & Case Study Link */}
                <div className="mt-8 sm:mt-10 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div
                      aria-hidden="true"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#180204] via-[#7f1d1d] to-[#dc2626] text-white text-sm sm:text-base font-bold tracking-tight flex items-center justify-center shrink-0 ring-2 ring-red-100 shadow-xs"
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-base sm:text-lg text-[#0f0000] leading-snug truncate">
                        {t.author}
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-500 mt-0.5 leading-snug truncate">
                        {t.role}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={t.caseStudyHref ?? "/case-studies"}
                    onClick={(e) => {
                      if (isDraggingRef.current) e.preventDefault();
                    }}
                    className="group/cs inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0f0000] hover:text-accent transition-colors shrink-0 whitespace-nowrap"
                  >
                    <span>View Case Study</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-200 group-hover/cs:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Navigation Bar (Dots on Left, Rounded Square Arrows on Right) ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mt-8 sm:mt-10 flex items-center justify-between gap-4">
        {/* Progress Indicator Pills */}
        <div
          className="flex items-center gap-2"
          aria-label="Testimonial slides"
        >
          {testimonials.map((t, idx) => (
            <button
              key={t.id ?? t.author}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`View testimonial from ${t.author}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === activeIndex
                  ? "w-9 bg-accent"
                  : "w-2.5 bg-neutral-300/80 hover:bg-red-300",
              )}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous testimonial"
            className={cn(
              "w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl flex items-center justify-center border transition-all duration-200",
              canScrollLeft
                ? "bg-red-50 border-red-200/80 text-accent hover:bg-accent hover:text-white hover:border-accent shadow-xs active:scale-95 cursor-pointer"
                : "bg-neutral-100 border-neutral-200/80 text-neutral-400 cursor-not-allowed opacity-70",
            )}
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Next testimonial"
            className={cn(
              "w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl flex items-center justify-center border transition-all duration-200",
              canScrollRight
                ? "bg-red-50 border-red-200/80 text-accent hover:bg-accent hover:text-white hover:border-accent shadow-xs active:scale-95 cursor-pointer"
                : "bg-neutral-100 border-neutral-200/80 text-neutral-400 cursor-not-allowed opacity-70",
            )}
          >
            <ArrowRight className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
