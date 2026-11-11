"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { comparisons } from "@/data/comparison";
import { cn } from "@/lib/utils";
import {
  Activity,
  Award,
  Check,
  Gauge,
  KeyRound,
  Layers,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const CRITERIA_ICONS = [
  Layers,
  KeyRound,
  Gauge,
  Award,
  ShieldCheck,
  MessageSquare,
  Activity,
] as const;

interface ArrowCoords {
  x1a: number;
  y1a: number;
  x1b: number;
  y1b: number;
  x2a: number;
  y2a: number;
  x2b: number;
  y2b: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpCoords(a: ArrowCoords, b: ArrowCoords, t: number): ArrowCoords {
  return {
    x1a: lerp(a.x1a, b.x1a, t),
    y1a: lerp(a.y1a, b.y1a, t),
    x1b: lerp(a.x1b, b.x1b, t),
    y1b: lerp(a.y1b, b.y1b, t),
    x2a: lerp(a.x2a, b.x2a, t),
    y2a: lerp(a.y2a, b.y2a, t),
    x2b: lerp(a.x2b, b.x2b, t),
    y2b: lerp(a.y2b, b.y2b, t),
  };
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function ComparisonSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex ?? focusedIndex ?? tappedIndex;

  const gridRef = useRef<HTMLDivElement>(null);
  const col1Refs = useRef<(HTMLButtonElement | null)[]>([]);
  const col2Refs = useRef<(HTMLDivElement | null)[]>([]);
  const col3Refs = useRef<(HTMLDivElement | null)[]>([]);

  // Direct DOM refs for 60fps SVG S-curve arrows without React re-renders
  const svgGroupRef = useRef<SVGGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const head1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const head2Ref = useRef<SVGPathElement>(null);

  const rowCoordsCacheRef = useRef<(ArrowCoords | null)[]>([]);
  const currentCoordsRef = useRef<ArrowCoords | null>(null);
  const activeIndexRef = useRef<number | null>(activeIndex);
  activeIndexRef.current = activeIndex;
  const rafRef = useRef<number>(0);
  const lastPointerTypeRef = useRef<string>("mouse");
  const hadPointerDownRef = useRef<boolean>(false);

  const measureAllRows = useCallback(() => {
    const grid = gridRef.current;
    if (!grid || typeof window === "undefined" || window.innerWidth < 1024) {
      rowCoordsCacheRef.current = [];
      return;
    }

    const g = grid.getBoundingClientRect();
    rowCoordsCacheRef.current = comparisons.map((_, idx) => {
      const el1 = col1Refs.current[idx];
      const el2 = col2Refs.current[idx];
      const el3 = col3Refs.current[idx];
      if (!el1 || !el2 || !el3) return null;

      const r1 = el1.getBoundingClientRect();
      const r2 = el2.getBoundingClientRect();
      const r3 = el3.getBoundingClientRect();

      return {
        x1a: r1.right - g.left,
        y1a: r1.top + r1.height * 0.36 - g.top,
        x1b: r2.left - g.left,
        y1b: r2.top + r2.height * 0.64 - g.top,
        x2a: r2.right - g.left,
        y2a: r2.top + r2.height * 0.64 - g.top,
        x2b: r3.left - g.left,
        y2b: r3.top + r3.height * 0.36 - g.top,
      };
    });
  }, []);

  const applyArrowDOM = useCallback((c: ArrowCoords) => {
    const gap1 = Math.max(16, c.x1b - c.x1a);
    const tip1X = c.x1b - 2.5;
    const cp1X = c.x1a + gap1 * 0.54;
    const cp2X = tip1X - gap1 * 0.54;
    const d1 = `M ${c.x1a.toFixed(1)} ${c.y1a.toFixed(1)} C ${cp1X.toFixed(1)} ${c.y1a.toFixed(1)}, ${cp2X.toFixed(1)} ${c.y1b.toFixed(1)}, ${tip1X.toFixed(1)} ${c.y1b.toFixed(1)}`;
    const h1 = `M ${(tip1X - 7.5).toFixed(1)} ${(c.y1b - 4.6).toFixed(1)} L ${tip1X.toFixed(1)} ${c.y1b.toFixed(1)} L ${(tip1X - 7.5).toFixed(1)} ${(c.y1b + 4.6).toFixed(1)}`;

    const gap2 = Math.max(16, c.x2b - c.x2a);
    const tip2X = c.x2b - 2.5;
    const cp3X = c.x2a + gap2 * 0.54;
    const cp4X = tip2X - gap2 * 0.54;
    const d2 = `M ${c.x2a.toFixed(1)} ${c.y2a.toFixed(1)} C ${cp3X.toFixed(1)} ${c.y2a.toFixed(1)}, ${cp4X.toFixed(1)} ${c.y2b.toFixed(1)}, ${tip2X.toFixed(1)} ${c.y2b.toFixed(1)}`;
    const h2 = `M ${(tip2X - 7.5).toFixed(1)} ${(c.y2b - 4.6).toFixed(1)} L ${tip2X.toFixed(1)} ${c.y2b.toFixed(1)} L ${(tip2X - 7.5).toFixed(1)} ${(c.y2b + 4.6).toFixed(1)}`;

    path1Ref.current?.setAttribute("d", d1);
    head1Ref.current?.setAttribute("d", h1);
    path2Ref.current?.setAttribute("d", d2);
    head2Ref.current?.setAttribute("d", h2);
  }, []);

  // Populate cached row geometry on mount, font load, and resize
  useEffect(() => {
    measureAllRows();

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measureAllRows).catch(() => {});
    }

    const syncOnResize = () => {
      measureAllRows();
      const idx = activeIndexRef.current;
      if (idx === null) return;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      const measured = rowCoordsCacheRef.current[idx];
      if (measured) {
        currentCoordsRef.current = measured;
        applyArrowDOM(measured);
      } else if (svgGroupRef.current) {
        svgGroupRef.current.style.opacity = "0";
      }
    };

    const grid = gridRef.current;
    const ro =
      typeof ResizeObserver !== "undefined" && grid
        ? new ResizeObserver(syncOnResize)
        : null;
    if (ro && grid) ro.observe(grid);

    window.addEventListener("resize", syncOnResize, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", syncOnResize);
    };
  }, [applyArrowDOM, measureAllRows]);

  // Smoothly draw in from rest and glide between rows (zero per-frame layout reads)
  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    const group = svgGroupRef.current;
    const p1 = path1Ref.current;
    const p2 = path2Ref.current;
    const h1 = head1Ref.current;
    const h2 = head2Ref.current;

    if (activeIndex === null) {
      if (group) group.style.opacity = "0";
      currentCoordsRef.current = null;
      return;
    }

    let target = rowCoordsCacheRef.current[activeIndex] ?? null;
    if (!target) {
      measureAllRows();
      target = rowCoordsCacheRef.current[activeIndex] ?? null;
    }
    if (!target || !group || !p1 || !p2 || !h1 || !h2) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      currentCoordsRef.current = target;
      applyArrowDOM(target);
      p1.style.strokeDasharray = "none";
      p1.style.strokeDashoffset = "0";
      p2.style.strokeDasharray = "none";
      p2.style.strokeDashoffset = "0";
      h1.style.opacity = "1";
      h2.style.opacity = "1";
      group.style.opacity = "1";
      return;
    }

    const from = currentCoordsRef.current;

    if (!from) {
      // Fresh entry from resting state: draw left -> right
      currentCoordsRef.current = target;
      applyArrowDOM(target);

      const len1 = p1.getTotalLength() || 80;
      const len2 = p2.getTotalLength() || 80;

      p1.style.strokeDasharray = `${len1}`;
      p1.style.strokeDashoffset = `${len1}`;
      p2.style.strokeDasharray = `${len2}`;
      p2.style.strokeDashoffset = `${len2}`;
      h1.style.opacity = "0";
      h2.style.opacity = "0";
      group.style.opacity = "1";

      const startTime = performance.now();
      const duration = 360;

      const animateDraw = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const draw1 = easeOutCubic(Math.min(1, t / 0.62));
        const draw2 = easeOutCubic(Math.max(0, Math.min(1, (t - 0.24) / 0.76)));

        p1.style.strokeDashoffset = `${len1 * (1 - draw1)}`;
        p2.style.strokeDashoffset = `${len2 * (1 - draw2)}`;
        h1.style.opacity = `${Math.max(0, Math.min(1, (draw1 - 0.72) / 0.28))}`;
        h2.style.opacity = `${Math.max(0, Math.min(1, (draw2 - 0.72) / 0.28))}`;

        if (t < 1) {
          rafRef.current = requestAnimationFrame(animateDraw);
        } else {
          p1.style.strokeDasharray = "none";
          p1.style.strokeDashoffset = "0";
          p2.style.strokeDasharray = "none";
          p2.style.strokeDashoffset = "0";
          h1.style.opacity = "1";
          h2.style.opacity = "1";
          rafRef.current = 0;
        }
      };

      rafRef.current = requestAnimationFrame(animateDraw);
    } else {
      // Moving from one hovered row to another: glide arrows smoothly across rows
      p1.style.strokeDasharray = "none";
      p1.style.strokeDashoffset = "0";
      p2.style.strokeDasharray = "none";
      p2.style.strokeDashoffset = "0";
      h1.style.opacity = "1";
      h2.style.opacity = "1";
      group.style.opacity = "1";

      const startCoords = { ...from };
      const finalTarget = target;
      const startTime = performance.now();
      const duration = 280;

      const animateGlide = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = easeOutCubic(t);

        const next = lerpCoords(startCoords, finalTarget, eased);
        currentCoordsRef.current = next;
        applyArrowDOM(next);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(animateGlide);
        } else {
          currentCoordsRef.current = finalTarget;
          applyArrowDOM(finalTarget);
          rafRef.current = 0;
        }
      };

      rafRef.current = requestAnimationFrame(animateGlide);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [activeIndex, applyArrowDOM, measureAllRows]);

  const handleRowPointerEnter = (
    idx: number,
    e: React.PointerEvent<HTMLElement>,
  ) => {
    lastPointerTypeRef.current = e.pointerType;
    if (e.pointerType === "mouse") {
      setHoveredIndex(idx);
    }
  };

  const handleRowPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    lastPointerTypeRef.current = e.pointerType;
    hadPointerDownRef.current = true;
    setTimeout(() => {
      hadPointerDownRef.current = false;
    }, 0);
  };

  const handleRowClick = (idx: number) => {
    if (lastPointerTypeRef.current !== "mouse") {
      setTappedIndex((prev) => (prev === idx ? null : idx));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % comparisons.length;
      col1Refs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + comparisons.length) % comparisons.length;
      col1Refs.current[prev]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setFocusedIndex(null);
      setHoveredIndex(null);
      setTappedIndex(null);
      col1Refs.current[idx]?.blur();
    }
  };

  return (
    <section
      id="comparison"
      className="relative section-padding overflow-hidden bg-[#fff9f9] border-y border-neutral-200/80"
      aria-labelledby="comparison-heading"
    >
      {/* ── Matching Circular Soft Blurry Red Gradients (Top-Right & Bottom-Left Corners — pure radial gradient for zero scroll lag) ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[560px] sm:w-[780px] lg:w-[980px] aspect-square rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.22) 0%, rgba(239, 68, 68, 0.15) 22%, rgba(248, 113, 113, 0.08) 42%, rgba(254, 202, 202, 0.035) 58%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[560px] sm:w-[780px] lg:w-[980px] aspect-square rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.22) 0%, rgba(239, 68, 68, 0.15) 22%, rgba(248, 113, 113, 0.08) 42%, rgba(254, 202, 202, 0.035) 58%, transparent 72%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Section Header ── */}
        <FadeIn className="text-left md:text-center md:mx-auto max-w-2xl mb-12 sm:mb-16">
          <span className="block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-2">
            Competitive Advantage
          </span>
          <h2
            id="comparison-heading"
            className="text-[clamp(26px,2.8vw,42px)] font-bold leading-[1.12] tracking-[-0.03em] text-[#0f0000]"
          >
            Where traditional agencies stop,{" "}
            <span className="gradient-text">our engineering begins.</span>
          </h2>
          <p className="mt-2.5 text-[clamp(13px,0.95vw,15px)] leading-relaxed text-neutral-700 max-w-lg md:mx-auto">
            We don&apos;t just hand off templates and disappear. We engineer
            mission-critical systems, transfer 100% intellectual property, and
            back our platforms with enterprise SLAs.
          </p>
        </FadeIn>

        {/* ── Desktop 3-Column Connected White List Cards (lg+) ── */}
        <div className="hidden lg:block">
          {/* Column Headings with Gray Underline */}
          <div className="grid grid-cols-[minmax(0,1.18fr)_minmax(0,0.94fr)_minmax(0,1.12fr)] gap-x-10 xl:gap-x-16 mb-5">
            <div className="px-1 pb-3 border-b border-neutral-300/80">
              <h3 className="text-lg xl:text-xl font-bold tracking-tight text-[#0f0000]">
                Evaluation Criteria
              </h3>
            </div>

            <div className="px-1 pb-3 border-b border-neutral-300/80">
              <h3 className="text-lg xl:text-xl font-bold tracking-tight text-neutral-700">
                Standard Freelancer / Agency
              </h3>
            </div>

            <div className="px-1 pb-3 border-b border-neutral-300/80">
              <h3 className="text-lg xl:text-xl font-bold tracking-tight text-accent">
                Endow Tech Standard
              </h3>
            </div>
          </div>

          {/* 3-Column Card Grid with Dynamic Gliding SVG Curved Arrows */}
          <div
            ref={gridRef}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setHoveredIndex(null);
            }}
            className="relative grid grid-cols-[minmax(0,1.18fr)_minmax(0,0.94fr)_minmax(0,1.12fr)] gap-x-10 xl:gap-x-16 gap-y-3.5 items-stretch"
          >
            {/* Dynamic SVG Curved Arrow Overlay (no white pulse, no dots, smooth glide) */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-visible"
            >
              <g
                ref={svgGroupRef}
                style={{ opacity: 0, transition: "opacity 160ms ease" }}
              >
                <path
                  ref={path1Ref}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  ref={head1Ref}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  ref={path2Ref}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  ref={head2Ref}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            {comparisons.map((row, idx) => {
              const isActive = activeIndex === idx;
              const isDimmed = activeIndex !== null && activeIndex !== idx;
              const Icon = CRITERIA_ICONS[idx % CRITERIA_ICONS.length];

              return (
                <React.Fragment key={row.feature}>
                  {/* Column 1: Evaluation Criteria White Card (No Border Initially) */}
                  <button
                    ref={(el) => {
                      col1Refs.current[idx] = el;
                    }}
                    type="button"
                    onPointerEnter={(e) => handleRowPointerEnter(idx, e)}
                    onPointerDown={handleRowPointerDown}
                    onFocus={() => {
                      if (!hadPointerDownRef.current) setFocusedIndex(idx);
                    }}
                    onBlur={() =>
                      setFocusedIndex((prev) => (prev === idx ? null : prev))
                    }
                    onClick={() => handleRowClick(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative text-left rounded-2xl bg-white px-5 py-4 flex items-start gap-3.5 border cursor-pointer select-none focus:outline-none transition-[opacity,border-color] duration-200",
                      isActive
                        ? "border-accent/75 shadow-[0_14px_30px_-14px_rgba(220,38,38,0.22)] z-10"
                        : isDimmed
                          ? "border-transparent opacity-[0.44] shadow-none"
                          : "border-transparent shadow-[0_6px_20px_-10px_rgba(15,0,0,0.06)]",
                    )}
                  >
                    <span
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200",
                        isActive
                          ? "bg-accent text-white"
                          : "bg-red-50 text-accent",
                      )}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-bold text-[#0f0000] tracking-tight leading-snug">
                          {row.feature}
                        </span>
                        {row.highlight && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-sans font-bold uppercase tracking-normal bg-red-50 text-accent">
                            Crucial
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                        {row.whyItMatters}
                      </p>
                    </div>
                  </button>

                  {/* Column 2: Standard Freelancer / Agency White Card (No Border Initially) */}
                  <div
                    ref={(el) => {
                      col2Refs.current[idx] = el;
                    }}
                    onPointerEnter={(e) => handleRowPointerEnter(idx, e)}
                    onPointerDown={handleRowPointerDown}
                    onClick={() => handleRowClick(idx)}
                    className={cn(
                      "relative rounded-2xl bg-white px-5 py-4 flex items-center gap-3 border cursor-pointer transition-[opacity,border-color] duration-200",
                      isActive
                        ? "border-red-300 shadow-[0_14px_30px_-14px_rgba(220,38,38,0.16)] z-10"
                        : isDimmed
                          ? "border-transparent opacity-[0.44] shadow-none"
                          : "border-transparent shadow-[0_6px_20px_-10px_rgba(15,0,0,0.06)]",
                    )}
                  >
                    <span
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200",
                        isActive
                          ? "bg-red-50 text-red-500"
                          : "bg-neutral-100 text-neutral-400",
                      )}
                    >
                      <X
                        className="w-3.5 h-3.5 stroke-[2.3]"
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={cn(
                        "text-sm leading-snug font-medium transition-colors duration-200",
                        isActive ? "text-neutral-800" : "text-neutral-600",
                      )}
                    >
                      {String(row.others)}
                    </span>
                  </div>

                  {/* Column 3: Endow Tech Standard White Card (No Border Initially) */}
                  <div
                    ref={(el) => {
                      col3Refs.current[idx] = el;
                    }}
                    onPointerEnter={(e) => handleRowPointerEnter(idx, e)}
                    onPointerDown={handleRowPointerDown}
                    onClick={() => handleRowClick(idx)}
                    className={cn(
                      "relative rounded-2xl bg-white px-5 py-4 flex items-center gap-3.5 border cursor-pointer transition-[opacity,border-color] duration-200",
                      isActive
                        ? "border-accent/80 shadow-[0_14px_30px_-14px_rgba(220,38,38,0.24)] z-10"
                        : isDimmed
                          ? "border-transparent opacity-[0.44] shadow-none"
                          : "border-transparent shadow-[0_6px_20px_-10px_rgba(15,0,0,0.06)]",
                    )}
                  >
                    <span
                      className={cn(
                        "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                        isActive
                          ? "bg-accent text-white"
                          : "bg-red-50 text-accent",
                      )}
                    >
                      <Check
                        className="w-3.5 h-3.5 stroke-[2.75]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm font-semibold text-[#0f0000] leading-snug">
                      {String(row.endowTech)}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ── Mobile & Tablet Interactive List (< lg) ── */}
        <div className="lg:hidden space-y-3.5">
          {comparisons.map((row, idx) => {
            const isActive = activeIndex === idx;
            const isDimmed = activeIndex !== null && activeIndex !== idx;
            const Icon = CRITERIA_ICONS[idx % CRITERIA_ICONS.length];

            return (
              <div
                key={row.feature}
                className={cn(
                  "transition-opacity duration-200",
                  isDimmed && "opacity-[0.44]",
                )}
              >
                {/* White Criteria Card (No Border Initially) */}
                <button
                  type="button"
                  onClick={() =>
                    setTappedIndex((prev) => (prev === idx ? null : idx))
                  }
                  aria-expanded={isActive}
                  className={cn(
                    "w-full text-left rounded-2xl bg-white p-4 sm:p-5 border transition-[border-color] duration-200 cursor-pointer",
                    isActive
                      ? "border-accent/75 shadow-[0_14px_30px_-14px_rgba(220,38,38,0.22)]"
                      : "border-transparent shadow-[0_6px_20px_-10px_rgba(15,0,0,0.06)]",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                        isActive
                          ? "bg-accent text-white"
                          : "bg-red-50 text-accent",
                      )}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-bold text-[#0f0000] tracking-tight">
                          {row.feature}
                        </span>
                        {row.highlight && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-sans font-bold uppercase tracking-normal bg-red-50 text-accent">
                            Crucial
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                        {row.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* Compact Comparison Strip */}
                  <div className="mt-3.5 pt-3 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="rounded-xl bg-[#fafafa] px-3 py-2.5 flex items-start gap-2.5">
                      <X
                        className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5 stroke-[2.2]"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-[11px] font-sans font-bold tracking-tight text-neutral-500 mb-0.5">
                          Standard Agency
                        </div>
                        <div className="text-xs text-neutral-600 font-medium leading-snug">
                          {String(row.others)}
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "rounded-xl px-3 py-2.5 flex items-start gap-2.5 transition-colors duration-200",
                        isActive ? "bg-red-50/75" : "bg-red-50/40",
                      )}
                    >
                      <span className="w-4 h-4 rounded-md bg-accent text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check
                          className="w-2.5 h-2.5 stroke-[3]"
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <div className="text-[11px] font-sans font-bold tracking-tight text-accent mb-0.5">
                          Endow Tech Standard
                        </div>
                        <div className="text-xs text-[#0f0000] font-semibold leading-snug">
                          {String(row.endowTech)}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Mobile Curved Arrow Indicator When Active */}
                {isActive && (
                  <div className="pt-2 px-2 flex items-center justify-center gap-2 text-[11px] font-sans font-semibold text-accent">
                    <svg
                      viewBox="0 0 36 16"
                      fill="none"
                      className="w-8 h-4 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M 2 4 C 12 4, 18 12, 32 10"
                        stroke="#dc2626"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 27 6.5 L 33 10 L 27.5 13.5"
                        stroke="#dc2626"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>
                      Directly eliminates &ldquo;{String(row.others)}&rdquo;
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
