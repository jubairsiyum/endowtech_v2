"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { engineeringProcess } from "@/data/process";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const STEP_ICONS = [Compass, Code2, ShieldCheck, Rocket] as const;

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const gridRef = useRef<HTMLDivElement>(null);
  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outputsCardRef = useRef<HTMLDivElement>(null);

  // Direct DOM refs for 60fps SVG connector updates without React re-renders
  const svgTopPathRef = useRef<SVGPathElement>(null);
  const svgBottomPathRef = useRef<SVGPathElement>(null);
  const svgOriginDotRef = useRef<SVGCircleElement>(null);
  const svgOriginRingRef = useRef<SVGCircleElement>(null);
  const svgTargetTopDotRef = useRef<SVGCircleElement>(null);
  const svgTargetBottomDotRef = useRef<SVGCircleElement>(null);

  const activeStep = engineeringProcess[activeIndex] ?? engineeringProcess[0];
  const ActiveIcon = STEP_ICONS[activeIndex] ?? Compass;

  const updateConnector = useCallback(() => {
    const grid = gridRef.current;
    const stepEl = stepCardRefs.current[activeIndex];
    const outputsEl = outputsCardRef.current;

    if (!grid || !stepEl || !outputsEl) return;
    if (window.innerWidth < 1024) return;

    const gridRect = grid.getBoundingClientRect();
    const stepRect = stepEl.getBoundingClientRect();
    const outRect = outputsEl.getBoundingClientRect();

    // Anchor at the right edge of the active step card's title bar (~30px from its top)
    const startX = stepRect.right - gridRect.left;
    const startY = stepRect.top + 30 - gridRect.top;

    // Anchor along the left edge of the Key Outputs panel
    const endX = outRect.left - gridRect.left;
    const outMidY = outRect.top + outRect.height * 0.5 - gridRect.top;
    const spread = Math.min(72, Math.max(40, outRect.height * 0.17));
    const endTopY = outMidY - spread;
    const endBotY = outMidY + spread;

    const gap = Math.max(20, endX - startX);
    const cp1X = startX + gap * 0.45;
    const cp2X = endX - gap * 0.35;

    const topD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${startY.toFixed(1)}, ${cp2X.toFixed(1)} ${endTopY.toFixed(1)}, ${endX.toFixed(1)} ${endTopY.toFixed(1)}`;
    const botD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${startY.toFixed(1)}, ${cp2X.toFixed(1)} ${endBotY.toFixed(1)}, ${endX.toFixed(1)} ${endBotY.toFixed(1)}`;

    svgTopPathRef.current?.setAttribute("d", topD);
    svgBottomPathRef.current?.setAttribute("d", botD);

    svgOriginDotRef.current?.setAttribute("cx", startX.toFixed(1));
    svgOriginDotRef.current?.setAttribute("cy", startY.toFixed(1));
    svgOriginRingRef.current?.setAttribute("cx", startX.toFixed(1));
    svgOriginRingRef.current?.setAttribute("cy", startY.toFixed(1));

    svgTargetTopDotRef.current?.setAttribute("cx", endX.toFixed(1));
    svgTargetTopDotRef.current?.setAttribute("cy", endTopY.toFixed(1));
    svgTargetBottomDotRef.current?.setAttribute("cx", endX.toFixed(1));
    svgTargetBottomDotRef.current?.setAttribute("cy", endBotY.toFixed(1));
  }, [activeIndex]);

  useEffect(() => {
    updateConnector();

    // Track smoothly across the 500ms accordion & badge transition
    let rafId = 0;
    const startTime = performance.now();
    const trackTransition = (now: number) => {
      updateConnector();
      if (now - startTime < 560) {
        rafId = requestAnimationFrame(trackTransition);
      }
    };
    rafId = requestAnimationFrame(trackTransition);

    const grid = gridRef.current;
    const ro =
      typeof ResizeObserver !== "undefined" && grid
        ? new ResizeObserver(() => updateConnector())
        : null;
    if (ro && grid) ro.observe(grid);

    window.addEventListener("resize", updateConnector, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener("resize", updateConnector);
    };
  }, [updateConnector]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((idx + 1) % engineeringProcess.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (idx - 1 + engineeringProcess.length) % engineeringProcess.length,
      );
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveIndex(idx);
    }
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + engineeringProcess.length) % engineeringProcess.length,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % engineeringProcess.length);
  };

  return (
    <section
      id="process"
      className="relative section-padding bg-white overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* ── Subtle Architectural Blueprint Grid & Ambient Warm Glow ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-65"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 50%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[620px] h-[620px] rounded-full bg-accent/[0.045] blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-[480px] h-[480px] rounded-full bg-red-500/[0.03] blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Section Header — matching ServicesSection title style ── */}
        <FadeIn className="text-left md:text-center md:mx-auto max-w-2xl mb-14 sm:mb-16">
          <span className="block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-2">
            Engineering Methodology
          </span>
          <h2
            id="process-heading"
            className="text-[clamp(24px,2.5vw,38px)] font-bold leading-[1.14] tracking-[-0.035em] text-[#0f0000]"
          >
            How we take products from blueprint to production.
          </h2>
          <p className="mt-2 text-[clamp(13px,0.95vw,15px)] leading-relaxed text-neutral-600 max-w-lg md:mx-auto">
            No guesswork, no missed deadlines, no technical debt. Our 4-stage
            engineering lifecycle guarantees transparency, code quality, and
            predictable milestones.
          </p>
        </FadeIn>

        {/* ── Interactive Process Split Layout ── */}
        <FadeIn delay={0.1}>
          <div
            ref={gridRef}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 xl:gap-16 items-center"
          >
            {/* ── Desktop Dynamic SVG Blueprint Connector (<) ── */}
            <svg
              aria-hidden="true"
              className="hidden lg:block pointer-events-none absolute inset-0 w-full h-full z-20 overflow-visible"
            >
              <defs>
                <linearGradient
                  id="process-connector-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.22" />
                </linearGradient>
              </defs>

              <path
                ref={svgTopPathRef}
                fill="none"
                stroke="url(#process-connector-grad)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                ref={svgBottomPathRef}
                fill="none"
                stroke="url(#process-connector-grad)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />

              {/* Origin pulse & dot on active step card edge */}
              <circle
                ref={svgOriginRingRef}
                r="8"
                fill="rgba(220, 38, 38, 0.14)"
              />
              <circle ref={svgOriginDotRef} r="3.5" fill="#dc2626" />

              {/* Target anchor dots on Key Outputs panel edge */}
              <circle
                ref={svgTargetTopDotRef}
                r="3"
                fill="#ffffff"
                stroke="#dc2626"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <circle
                ref={svgTargetBottomDotRef}
                r="3"
                fill="#ffffff"
                stroke="#dc2626"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
            </svg>

            {/* ── Left Column: Expandable Step Stack ── */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              {engineeringProcess.map((step, idx) => {
                const isActive = activeIndex === idx;
                const StepIcon = STEP_ICONS[idx] ?? Compass;

                return (
                  <div
                    key={step.number}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-controls={`process-step-panel-${idx}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="relative group cursor-pointer select-none focus:outline-none"
                  >
                    {/* Step Number Badge (1, 2, 3, 4) — red accent, docks onto active card corner */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 w-12 h-12 sm:w-[60px] sm:h-[60px] rounded-2xl flex items-center justify-center font-extrabold text-lg sm:text-xl tabular-nums transition-all duration-500 ease-flow-smooth",
                        isActive
                          ? "translate-x-2 sm:translate-x-2.5 -translate-y-1.5 sm:-translate-y-2 scale-[1.06] z-20 bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c] text-white border border-red-400/30"
                          : "translate-x-0 translate-y-0 scale-100 z-10 bg-red-50/90 text-accent border border-red-200/90 shadow-sm group-hover:bg-red-100/80 group-hover:border-red-300",
                      )}
                    >
                      {idx + 1}
                    </div>

                    {/* Expandable Title + Description Card */}
                    <div
                      ref={(el) => {
                        stepCardRefs.current[idx] = el;
                      }}
                      className={cn(
                        "relative rounded-2xl sm:rounded-3xl border transition-all duration-500 ease-flow-smooth",
                        isActive
                          ? "ml-[24px] sm:ml-[30px] bg-white border-red-200/90 shadow-[0_20px_50px_-14px_rgba(15,0,0,0.08),0_0_0_1px_rgba(220,38,38,0.1)]"
                          : "ml-[60px] sm:ml-[74px] bg-[#fafafa]/90 border-neutral-200/90 hover:bg-white hover:border-red-200/70 shadow-sm",
                      )}
                    >
                      {/* Title Bar (invariant text X coordinate across collapsed/expanded states) */}
                      <div
                        className={cn(
                          "min-h-[48px] sm:min-h-[60px] pr-4 sm:pr-6 flex items-center justify-between gap-3 transition-all duration-500 ease-flow-smooth",
                          isActive
                            ? "pl-[56px] sm:pl-[68px] py-3.5 sm:py-4"
                            : "pl-5 sm:pl-6 py-3 sm:py-3.5",
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <h3
                            className={cn(
                              "text-[15px] sm:text-lg font-bold tracking-tight leading-snug transition-colors duration-300",
                              isActive
                                ? "text-[#0f0000]"
                                : "text-neutral-800 group-hover:text-[#0f0000]",
                            )}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span
                            className={cn(
                              "hidden md:inline-block font-sans text-[11px] uppercase tracking-[0.12em] tabular-nums transition-colors duration-300",
                              isActive
                                ? "text-accent font-semibold"
                                : "text-neutral-400 font-medium",
                            )}
                          >
                            Phase 0{idx + 1}
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300",
                              isActive
                                ? "bg-red-50 text-accent rotate-90 lg:rotate-0"
                                : "bg-neutral-100 text-neutral-400 group-hover:bg-red-50 group-hover:text-accent",
                            )}
                          >
                            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                          </span>
                        </div>
                      </div>

                      {/* Smooth Accordion Body: Phase + Description (+ inline deliverables on mobile) */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            id={`process-step-panel-${idx}`}
                            key={`step-body-${step.number}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.34, ease: EASE_SMOOTH }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 lg:min-h-[126px]">
                              <div className="h-px w-full bg-gradient-to-r from-red-200/70 via-neutral-200/70 to-transparent mb-4" />

                              <div className="flex items-center gap-2 mb-2">
                                <StepIcon className="w-3.5 h-3.5 text-accent shrink-0" />
                                <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.14em] text-accent">
                                  {step.phase}
                                </span>
                              </div>

                              <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed">
                                {step.description}
                              </p>

                              {/* Inline Key Outputs for Mobile & Tablet (< lg) */}
                              <div className="lg:hidden mt-5 pt-4 border-t border-neutral-100">
                                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">
                                  Key Outputs
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {step.deliverables.map((item) => (
                                    <div
                                      key={item}
                                      className="flex items-center gap-2.5 rounded-xl bg-[#fafafa] border border-neutral-200/70 px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-neutral-800"
                                    >
                                      <span className="w-5 h-5 rounded-md bg-red-50 border border-red-200/80 text-accent flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 stroke-[2.75]" />
                                      </span>
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right Column: Synchronized Key Outputs Blueprint Panel (Desktop lg+) ── */}
            <div className="hidden lg:block lg:col-span-5">
              <div
                ref={outputsCardRef}
                className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_24px_60px_-15px_rgba(15,0,0,0.08),0_0_0_1px_rgba(220,38,38,0.08)] overflow-hidden"
              >
                {/* Soft Top-Right Ambient Blush */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-accent/[0.06] blur-3xl pointer-events-none"
                />

                {/* Panel Header */}
                <div className="relative px-7 pt-7 pb-5 border-b border-neutral-100">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-accent font-sans text-[11px] font-bold uppercase tracking-[0.12em] tabular-nums">
                      <ActiveIcon className="w-3.5 h-3.5" />
                      <span>
                        Step 0{activeIndex + 1} · {activeStep.phase}
                      </span>
                    </div>

                    {/* Interactive Step Progress Pills */}
                    <div
                      className="flex items-center gap-1.5"
                      aria-label="Process stage progress"
                    >
                      {engineeringProcess.map((s, i) => (
                        <button
                          key={s.number}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          aria-label={`Inspect step ${i + 1}: ${s.title}`}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                            i === activeIndex
                              ? "w-6 bg-accent"
                              : i < activeIndex
                                ? "w-2.5 bg-red-200 hover:bg-red-300"
                                : "w-2 bg-neutral-200 hover:bg-neutral-300",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`header-${activeStep.number}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: EASE_SMOOTH }}
                    >
                      <h4 className="text-lg font-bold text-[#0f0000] tracking-tight leading-snug">
                        {activeStep.title}
                      </h4>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Key Outputs List */}
                <div className="relative p-7">
                  <div className="flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-neutral-500 mb-4">
                    <span className="w-2 h-2 rounded-md bg-accent" />
                    <span>Key Outputs:</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={`outputs-${activeStep.number}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24, ease: EASE_SMOOTH }}
                      className="space-y-3"
                    >
                      {activeStep.deliverables.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: i * 0.045,
                            ease: EASE_SMOOTH,
                          }}
                          className="group/out flex items-center gap-3.5 rounded-2xl bg-[#fafafa] hover:bg-red-50/40 border border-neutral-200/75 hover:border-red-200/80 px-4 py-3.5 transition-colors duration-200"
                        >
                          <span className="w-7 h-7 rounded-xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center shrink-0 group-hover/out:bg-accent group-hover/out:text-white group-hover/out:border-accent transition-colors duration-200">
                            <Check className="w-3.5 h-3.5 stroke-[2.75]" />
                          </span>
                          <span className="text-sm font-medium text-neutral-800 leading-snug">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>

                {/* Panel Footer with Step Controls */}
                <div className="px-7 py-4 bg-[#fafafa] border-t border-neutral-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-sans font-medium tabular-nums text-neutral-500">
                    Stage{" "}
                    <strong className="text-[#0f0000]">
                      0{activeIndex + 1}
                    </strong>{" "}
                    / 0{engineeringProcess.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous engineering stage"
                      className="w-8 h-8 rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:border-accent hover:text-accent hover:bg-red-50/40 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next engineering stage"
                      className="w-8 h-8 rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:border-accent hover:text-accent hover:bg-red-50/40 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
