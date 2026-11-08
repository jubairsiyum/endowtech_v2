"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { FlowButton } from "@/components/ui/FlowButton";
import { industriesData } from "@/data/industries";
import { cn } from "@/lib/utils";
import { IndustryItem } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface IndustriesSectionProps {
  onOpenScheduler?: () => void;
}

function IndustryCard({
  item,
  isDragging,
}: {
  item: IndustryItem;
  isDragging: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(item.image);
  const [hasError, setHasError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    const targetEl = document.querySelector("#work");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="flex-shrink-0 w-[290px] sm:w-[330px] md:w-[360px] lg:w-[380px] snap-start select-none group"
    >
      {/* ── Dark Visual Card Box (No Border) ── */}
      <div
        onClick={handleClick}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="relative h-[380px] sm:h-[420px] md:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d0c13] shadow-md  transition-all duration-500 cursor-pointer select-none [-webkit-user-drag:none]"
      >
        {/* Background Image / Tech Visual (Pointer Events Disabled To Prevent Ghost Dragging) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        >
          <Image
            src={imgSrc}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 290px, (max-width: 768px) 330px, 380px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none [-webkit-user-drag:none]"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onError={() => {
              if (!hasError && item.fallbackImage) {
                setHasError(true);
                setImgSrc(item.fallbackImage);
              }
            }}
            priority={false}
          />
        </div>

        {/* ── Editorial Gradient (Preserves natural photo clarity while ensuring text contrast at bottom) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"
        />

        {/* ── White Watermark Rising from Bottom-Right Corner on Hover (Larger Scale) ── */}
        <div
          aria-hidden="true"
          className="absolute -bottom-10 -right-10 sm:-bottom-12 sm:-right-12 w-[260px] sm:w-[310px] md:w-[340px] pointer-events-none select-none z-10 transition-all duration-700 ease-flow-smooth opacity-0 translate-x-8 translate-y-8 scale-90 group-hover:opacity-40 sm:group-hover:opacity-45 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100"
        >
          <Image
            src="/images/watermark_white.webp"
            alt=""
            width={400}
            height={468}
            className="w-full h-auto object-contain pointer-events-none select-none [-webkit-user-drag:none]"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            priority={false}
          />
        </div>

        {/* ── Just Title at Bottom Left (Smooth Translate Up on Hover) ── */}
        <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none transition-transform duration-500 ease-flow-smooth group-hover:-translate-y-2 sm:group-hover:-translate-y-2.5">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
            {item.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function IndustriesSection({
  onOpenScheduler,
}: IndustriesSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  const updateScrollButtons = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollButtons]);

  const scrollByDirection = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 380;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  /* ── Drag-to-Scroll Mouse Handlers ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    // Do not initiate container drag if clicking on interactive buttons or links
    if ((e.target as HTMLElement).closest("button, a")) return;

    // Prevent default browser ghost image dragging
    e.preventDefault();

    setIsMouseDown(true);
    setIsDragging(false);
    isDraggingRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.35;
    if (Math.abs(walk) > 6) {
      setIsDragging(true);
      isDraggingRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
    updateScrollButtons();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    // Slight timeout so click event on card is suppressed if it was a drag gesture
    setTimeout(() => {
      setIsDragging(false);
      isDraggingRef.current = false;
    }, 80);
    updateScrollButtons();
  };

  const handleCtaClick = () => {
    if (isDraggingRef.current) return;
    if (onOpenScheduler) {
      onOpenScheduler();
    } else {
      const el = document.querySelector("#contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "#contact";
      }
    }
  };

  const handleExploreClick = () => {
    const el = document.querySelector("#work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#work";
    }
  };

  return (
    <section
      id="industries"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#fafafa] overflow-hidden select-none"
      aria-labelledby="industries-heading"
    >
      {/* ── Soft Ambient Background Accents ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.025] rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/[0.02] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Section Header (No paragraph, User's Button, Rounded Square Navigation) ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left Column: Pill badge, Headline, FlowButton */}
          <FadeIn className="max-w-2xl">
            {/* Top Tag: Square icon + Industries */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-2">
                Industries
              </span>
            </div>

            <h2
              id="industries-heading"
              className="text-[clamp(26px,2.9vw,42px)] font-bold text-neutral-900 leading-[1.14] tracking-[-0.035em]"
            >
              Technology built around how your industry actually operates
            </h2>

            <div className="mt-6 sm:mt-8">
              <FlowButton
                variant="primary"
                size="md"
                href="#work"
                onClick={handleExploreClick}
              >
                Explore All Industries
              </FlowButton>
            </div>
          </FadeIn>

          {/* Right: Rounded Square Arrow Controls ([ ← ] [ → ]) */}
          <FadeIn
            delay={0.1}
            className="flex items-center gap-3 shrink-0 sm:self-end sm:mb-1"
          >
            <button
              type="button"
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              aria-label="Previous industries"
              className={cn(
                "w-12 h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border",
                canScrollLeft
                  ? "bg-accent border-accent text-white hover:bg-accent-hover shadow-sm active:scale-95 cursor-pointer"
                  : "bg-neutral-200/80 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-40",
              )}
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              aria-label="Next industries"
              className={cn(
                "w-12 h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border",
                canScrollRight
                  ? "bg-accent border-accent text-white hover:bg-accent-hover shadow-sm active:scale-95 cursor-pointer"
                  : "bg-neutral-200/80 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-40",
              )}
            >
              <ArrowRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </FadeIn>
        </div>

        {/* ── Draggable Card Carousel ── */}
        <div className="relative -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12">
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onScroll={updateScrollButtons}
            className={cn(
              "flex items-start gap-5 sm:gap-6 overflow-x-auto select-none py-2 pb-6",
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
            {/* Industry Cards */}
            {industriesData.map((industry) => (
              <IndustryCard
                key={industry.id}
                item={industry}
                isDragging={isDragging}
              />
            ))}

            {/* ── Last Card: Action Card (No Border, FlowButton) ── */}
            <div
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="flex-shrink-0 w-[290px] sm:w-[330px] md:w-[360px] lg:w-[380px] snap-start select-none"
            >
              <div
                className="relative h-[380px] sm:h-[420px] md:h-[440px] rounded-2xl sm:rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl text-white transition-all duration-300 hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(145deg, #180204 0%, #280509 45%, #7a0c16 100%)",
                }}
              >
                {/* Subtle Diagonal Lines Texture */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0.08) 1px, transparent 0, transparent 13px)",
                  }}
                />

                {/* Soft Radial Ambient Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-red-500/25 blur-3xl pointer-events-none"
                />

                {/* Content Top */}
                <div className="relative z-10">
                  <span className="text-xs sm:text-sm font-semibold text-white/80 tracking-wide block">
                    Don&apos;t see your industry?
                  </span>
                  <h3 className="text-2xl sm:text-[27px] lg:text-[29px] font-bold text-white tracking-tight leading-[1.2] mt-3">
                    Let&apos;s talk about what you&apos;re building
                  </h3>
                  <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                    Every industry works differently. Show us the challenge, and
                    we&apos;ll help shape the right technology around it.
                  </p>
                </div>

                {/* Content Bottom / Action FlowButton */}
                <div className="relative z-10 pt-4">
                  <FlowButton
                    variant="white"
                    size="md"
                    onClick={handleCtaClick}
                    className="shadow-md hover:shadow-xl"
                  >
                    Discuss Your Industry
                  </FlowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
