"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { TechIcon } from "@/components/sections/TechStackIcons";
import { infrastructureStack, techPillars } from "@/data/techStack";
import { cn } from "@/lib/utils";
import { TechItem } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

type LensMode = "all" | "core" | "ai";
type MobileSectionFilter = "all" | "web" | "mobile" | "ai" | "infra";

const LENS_OPTIONS: Array<{ id: LensMode; label: string }> = [
  { id: "all", label: "All Stack" },
  { id: "core", label: "Endow Core" },
  { id: "ai", label: "AI-Native" },
];

const MOBILE_PILLAR_FILTERS: Array<{ id: MobileSectionFilter; label: string }> =
  [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "ai", label: "AI-Native" },
    { id: "infra", label: "Cloud & Data" },
  ];

interface TechTileProps {
  item: TechItem;
  lens: LensMode;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (item: TechItem) => void;
  onHover: (item: TechItem | null) => void;
  compact?: boolean;
}

function TechTile({
  item,
  lens,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  compact = false,
}: TechTileProps) {
  const isHighlightedByLens =
    lens === "all" ||
    (lens === "core" && Boolean(item.isCore)) ||
    (lens === "ai" && Boolean(item.isAiNative));

  const isActive = isSelected || isHovered;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onHover(item);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onHover(null);
      }}
      onFocus={() => onHover(item)}
      onBlur={() => onHover(null)}
      aria-pressed={isSelected}
      aria-label={`${item.name}${item.description ? `: ${item.description}` : ""}`}
      className={cn(
        "group w-full flex flex-col items-center text-center focus:outline-none cursor-pointer transition-all duration-300",
        !isHighlightedByLens && "opacity-25 scale-[0.96]",
      )}
    >
      <div
        className={cn(
          "relative w-full aspect-square rounded-2xl bg-white border flex items-center justify-center transition-all duration-300 ease-flow-smooth",
          compact ? "max-w-[76px]" : "max-w-[86px]",
          isActive
            ? "border-accent/60 ring-2 ring-accent/20 -translate-y-1 shadow-[0_14px_28px_-10px_rgba(220,38,38,0.2)]"
            : lens !== "all" && isHighlightedByLens
              ? "border-red-200/90 shadow-[0_6px_18px_-6px_rgba(220,38,38,0.14)] group-hover:-translate-y-1"
              : "border-neutral-200/80 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.06)] group-hover:-translate-y-1 group-hover:border-red-200 group-hover:shadow-[0_14px_28px_-10px_rgba(220,38,38,0.16)]",
        )}
      >
        <TechIcon
          name={item.name}
          icon={item.icon}
          tintRed={item.tintRed}
          wideIcon={item.wideIcon}
          className={cn(
            "text-accent transition-transform duration-300 ease-flow-smooth group-hover:scale-110",
            compact ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-9 sm:h-9",
            isActive && "scale-110",
          )}
        />
      </div>

      <span
        className={cn(
          "mt-2 sm:mt-2.5 tracking-tight leading-snug break-words transition-colors duration-200",
          compact ? "text-[11px] xl:text-xs" : "text-[11px] sm:text-xs",
          isActive
            ? "text-[#0f0000] font-semibold"
            : "text-neutral-600 font-medium group-hover:text-[#0f0000]",
        )}
      >
        {item.name}
      </span>
    </button>
  );
}

export default function TechStackSection() {
  const [lens, setLens] = useState<LensMode>("all");
  const [mobileFilter, setMobileFilter] = useState<MobileSectionFilter>("all");
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<TechItem | null>(null);

  const activeItem = hoveredItem ?? selectedItem;

  const totalCount = useMemo(() => {
    const pillarCount = techPillars.reduce(
      (acc, pillar) =>
        acc +
        pillar.subgroups.reduce((subAcc, sub) => subAcc + sub.techs.length, 0),
      0,
    );
    return pillarCount + infrastructureStack.length;
  }, []);

  const handleSelect = (item: TechItem) => {
    setSelectedItem((prev) => (prev?.name === item.name ? null : item));
  };

  return (
    <section
      id="tech-stack"
      className="relative py-14 sm:py-20 lg:py-24 xl:py-28 bg-white overflow-hidden"
      aria-labelledby="tech-stack-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <FadeIn>
          {/* ── Rounded Architectural Surface Container ── */}
          <div className="relative rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] bg-gradient-to-br from-[#fafafd] via-[#f7f7fa] to-[#f4eff2] border border-neutral-200/90 ring-1 ring-inset ring-white/80 p-5 sm:p-8 lg:p-11 xl:p-14 overflow-hidden shadow-[0_24px_70px_-32px_rgba(15,0,0,0.08)]">
            {/* Subtle Architectural Grid Texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(220, 38, 38, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.025) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse 90% 80% at 50% 40%, #000 35%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 80% at 50% 40%, #000 35%, transparent 100%)",
              }}
            />

            {/* Soft Crimson Ambient Blushes */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-accent/[0.045] blur-[120px] pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-accent/[0.03] blur-[110px] pointer-events-none"
            />

            <div className="relative z-10">
              {/* ── Header Area ── */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 sm:mb-11 lg:mb-14">
                <div className="max-w-2xl">
                  <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                    Technology Stack
                  </span>
                  <h2
                    id="tech-stack-heading"
                    className="text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
                  >
                    Your architecture comes first.
                  </h2>
                  <p className="mt-3 text-[clamp(14px,1vw,15.5px)] leading-relaxed text-neutral-600 max-w-xl">
                    We work with your teams to pick proven web, mobile, and
                    cloud stacks — using AI-native workflows where they add real
                    value.
                  </p>
                </div>

                {/* Interactive Stack Lens Toggle */}
                <div className="flex items-center self-start lg:self-end max-w-full">
                  <div
                    role="group"
                    aria-label="Highlight technology lens"
                    className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 rounded-2xl bg-white border border-neutral-200/90 shadow-sm max-w-full"
                  >
                    {LENS_OPTIONS.map((option) => {
                      const active = lens === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setLens(option.id)}
                          aria-pressed={active}
                          className={cn(
                            "relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer",
                            active
                              ? "text-white"
                              : "text-neutral-600 hover:text-[#0f0000]",
                          )}
                        >
                          {active && (
                            <motion.span
                              layoutId="tech-lens-pill"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 32,
                              }}
                              className="absolute inset-0 rounded-xl bg-[#0f0000] shadow-sm"
                            />
                          )}
                          <span className="relative z-10">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Mobile Pillar Quick Filter (< lg) ── */}
              <div className="flex lg:hidden flex-wrap gap-1.5 sm:gap-2 mb-7 sm:mb-8">
                {MOBILE_PILLAR_FILTERS.map((filter) => {
                  const isActive = mobileFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setMobileFilter(filter.id)}
                      className={cn(
                        "px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer",
                        isActive
                          ? "bg-accent text-white border-accent shadow-sm"
                          : "bg-white text-neutral-600 border-neutral-200/90 hover:border-red-200 hover:text-[#0f0000]",
                      )}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              {/* ── Stack Icons Region (with Centered Red Brand Watermark) ── */}
              <div className="relative overflow-hidden -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-11 lg:px-11 xl:-mx-14 xl:px-14 pt-6 pb-8 -mt-6 -mb-8">
                {/* Large Ambient Crimson Brand Watermark Behind Stack Icons Only */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none select-none z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] sm:w-[88%] md:w-[78%] lg:w-[66%] xl:w-[62%] max-w-[760px] opacity-[0.05] sm:opacity-[0.08] lg:opacity-[0.10]"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 90% 84% at 50% 50%, #000 58%, rgba(0, 0, 0, 0.4) 85%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 90% 84% at 50% 50%, #000 58%, rgba(0, 0, 0, 0.4) 85%, transparent 100%)",
                  }}
                >
                  <Image
                    src="/images/watermark_red.webp"
                    alt=""
                    width={640}
                    height={748}
                    className="w-full h-auto object-contain pointer-events-none select-none [-webkit-user-drag:none]"
                    draggable={false}
                  />
                </div>

                {/* ── Main 3-Column Architectural Grid ── */}
                <div
                  className={cn(
                    "relative z-10 grid gap-9 lg:gap-9 xl:gap-12 items-start",
                    mobileFilter === "all"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 lg:grid-cols-3",
                  )}
                >
                  {techPillars.map((pillar) => {
                    const isHiddenOnMobile =
                      mobileFilter !== "all" && mobileFilter !== pillar.id;
                    const useTwoColSubgroupsOnTablet =
                      (pillar.id === "ai" && mobileFilter === "all") ||
                      mobileFilter !== "all";

                    return (
                      <div
                        key={pillar.id}
                        className={cn(
                          "flex flex-col min-w-0",
                          pillar.id === "ai" &&
                            mobileFilter === "all" &&
                            "sm:col-span-2 lg:col-span-1",
                          isHiddenOnMobile && "hidden lg:flex",
                        )}
                      >
                        {/* Column Heading with Hairline Divider */}
                        <div className="flex items-center justify-between pb-3 sm:pb-3.5 mb-5 sm:mb-6 border-b border-neutral-200/90">
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0f0000]">
                            {pillar.title}
                          </h3>
                          <span className="font-sans text-[11px] font-semibold tabular-nums text-neutral-400 tracking-[0.1em]">
                            {pillar.index}
                          </span>
                        </div>

                        {/* Subgroups */}
                        <div
                          className={cn(
                            "gap-7",
                            useTwoColSubgroupsOnTablet
                              ? "grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col sm:gap-x-8 sm:gap-y-7"
                              : "flex flex-col",
                          )}
                        >
                          {pillar.subgroups.map((subgroup) => {
                            if (subgroup.layout === "split-2") {
                              return (
                                <div
                                  key={subgroup.id}
                                  className="grid grid-cols-3 gap-3 sm:gap-4 max-w-[290px]"
                                >
                                  {subgroup.techs.map((tech) => (
                                    <div
                                      key={tech.name}
                                      className="flex flex-col min-w-0"
                                    >
                                      <h4 className="text-[13px] font-medium text-neutral-600 mb-3 sm:mb-3.5">
                                        {tech.category}
                                      </h4>
                                      <TechTile
                                        item={tech}
                                        lens={lens}
                                        isSelected={
                                          selectedItem?.name === tech.name
                                        }
                                        isHovered={
                                          hoveredItem?.name === tech.name
                                        }
                                        onSelect={handleSelect}
                                        onHover={setHoveredItem}
                                      />
                                    </div>
                                  ))}
                                </div>
                              );
                            }

                            return (
                              <div key={subgroup.id} className="min-w-0">
                                <h4 className="text-[13px] font-medium text-neutral-600 mb-3 sm:mb-3.5">
                                  {subgroup.label}
                                </h4>
                                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-[290px]">
                                  {subgroup.techs.map((tech) => (
                                    <TechTile
                                      key={tech.name}
                                      item={tech}
                                      lens={lens}
                                      isSelected={
                                        selectedItem?.name === tech.name
                                      }
                                      isHovered={
                                        hoveredItem?.name === tech.name
                                      }
                                      onSelect={handleSelect}
                                      onHover={setHoveredItem}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── Data, Cloud & DevOps Foundation Strip ── */}
                <div
                  className={cn(
                    "relative z-10 mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-neutral-200/85",
                    mobileFilter !== "all" &&
                      mobileFilter !== "infra" &&
                      "hidden lg:block",
                  )}
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0f0000]">
                      Data, Cloud &amp; DevOps Infrastructure
                    </h3>
                    <span className="font-sans text-[11px] font-semibold tabular-nums text-neutral-400 tracking-[0.1em]">
                      04
                    </span>
                  </div>

                  <div className="grid grid-cols-3 max-w-[290px] sm:max-w-none sm:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4 lg:gap-2.5 xl:gap-4">
                    {infrastructureStack.map((tech) => (
                      <TechTile
                        key={tech.name}
                        item={tech}
                        lens={lens}
                        isSelected={selectedItem?.name === tech.name}
                        isHovered={hoveredItem?.name === tech.name}
                        onSelect={handleSelect}
                        onHover={setHoveredItem}
                        compact
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Live Stack Architecture Inspector Strip ── */}
              <div className="mt-8 sm:mt-10">
                <div className="rounded-2xl bg-white border border-neutral-200/90 px-4 sm:px-6 py-3.5 sm:py-4 shadow-[0_6px_20px_-10px_rgba(15,0,0,0.06)] min-h-[60px] flex items-center justify-between gap-4">
                  <AnimatePresence mode="wait">
                    {activeItem ? (
                      <motion.div
                        key={activeItem.name}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 lg:gap-4 w-full"
                      >
                        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap sm:items-center gap-1.5 sm:gap-2.5 min-w-0">
                          <div className="inline-flex items-center gap-2 shrink-0">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-50 border border-red-200/80 text-accent font-sans text-[11px] font-bold uppercase tracking-[0.12em] shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {activeItem.role ||
                                activeItem.category ||
                                "Stack"}
                            </span>
                            <span className="text-sm font-bold text-[#0f0000]">
                              {activeItem.name}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
                            {activeItem.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                          {activeItem.isCore && (
                            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-sans text-[10px] font-semibold uppercase tracking-[0.1em]">
                              Endow Core
                            </span>
                          )}
                          {selectedItem && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedItem(null);
                                setHoveredItem(null);
                              }}
                              className="text-xs font-sans font-medium text-neutral-400 hover:text-accent transition-colors cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inspector-default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full"
                      >
                        <div className="flex flex-wrap lg:flex-nowrap items-center gap-x-2.5 gap-y-1 min-w-0">
                          <span className="text-xs sm:text-sm font-semibold text-[#0f0000] shrink-0">
                            Architecture-First Stack
                          </span>
                          <span className="text-xs sm:text-sm text-neutral-500 leading-snug">
                            <span className="hidden lg:inline">— </span>
                            Hover or tap any technology above to inspect how
                            Endow Tech deploys it in production.
                          </span>
                        </div>

                        <span className="font-sans font-medium tabular-nums text-[11px] text-neutral-400 shrink-0">
                          {totalCount} Verified Tools
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
