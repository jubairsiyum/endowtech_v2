"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { scrollToElement } from "@/components/SmoothScroll";
import { FlowButton } from "@/components/ui/FlowButton";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FAQSection({
  onOpenScheduler,
}: {
  onOpenScheduler?: () => void;
}) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    faqItems[0]?.id ?? null,
  );

  const handleScheduleClick = () => {
    if (onOpenScheduler) {
      onOpenScheduler();
    } else {
      scrollToElement("#contact", -40, 0.75);
    }
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-white py-16 sm:py-24 border-y border-neutral-200/70 overflow-x-clip"
    >
      {/* ── Creative Layered Brand Watermark Backdrop (Preserves Sticky Left Column) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      >
        {/* Soft Radial Crimson Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(220, 38, 38, 0.045) 0%, rgba(239, 68, 68, 0.015) 48%, transparent 74%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Intro & Dark Watermarked Direct Consultation Box */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <FadeIn>
              <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-2.5">
                Frequently Asked Questions
              </span>
              <h2
                id="faq-heading"
                className="text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0f0000]"
              >
                Everything you need to know before partnering.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md">
                Clear engineering commitments around intellectual property,
                sprint cadences, integration boundaries, and post-launch SLAs
                across our Seoul &amp; Dhaka teams.
              </p>

              {/* Signature Dark Crimson Card with Rising White Watermark */}
              <div
                className="group relative mt-7 rounded-2xl sm:rounded-3xl p-6 sm:p-7 max-w-md overflow-hidden text-white shadow-[0_22px_50px_-20px_rgba(127,29,29,0.48)] border border-red-900/40"
                style={{
                  background:
                    "linear-gradient(145deg, #180204 0%, #2a0509 52%, #7a0c16 100%)",
                }}
              >
                {/* Rising White Watermark in Corner */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-10 -right-10 w-[220px] sm:w-[250px] pointer-events-none select-none opacity-20 group-hover:opacity-35 group-hover:scale-105 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-700 ease-flow-smooth"
                >
                  <Image
                    src="/images/watermark_white.webp"
                    alt=""
                    width={400}
                    height={468}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-red-200/90 mb-2">
                    Direct Engineering Desk
                  </span>
                  <div className="text-base sm:text-lg font-bold text-white leading-snug">
                    Prefer speaking directly with an architect?
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                    Book a 20-minute technical discovery session with our Seoul
                    &amp; Dhaka engineering leads.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <FlowButton
                      variant="white"
                      size="md"
                      onClick={handleScheduleClick}
                    >
                      Schedule Discovery Call
                    </FlowButton>
                    <FlowButton
                      variant="secondary"
                      size="md"
                      onClick={() => scrollToElement("#contact", -40, 0.75)}
                    >
                      Reach Out Directly
                    </FlowButton>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Accessible Interactive Accordion with Subtle Active Corner Watermark */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              const panelId = `${faq.id}-panel`;
              const triggerId = `${faq.id}-trigger`;
              const indexLabel = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={faq.id}
                  className={cn(
                    "relative rounded-2xl border transition-all duration-200 overflow-hidden",
                    isOpen
                      ? "bg-white border-red-200/90 shadow-[0_16px_40px_-20px_rgba(220,38,38,0.16)]"
                      : "bg-[#fafafa]/95 border-neutral-200/90 hover:bg-white hover:border-neutral-300",
                  )}
                >
                  {/* Subtle Crimson Watermark Peeking Inside Active Expanded Card */}
                  {isOpen && (
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-12 -right-8 w-[190px] sm:w-[220px] pointer-events-none select-none opacity-[0.065]"
                    >
                      <Image
                        src="/images/watermark_red.webp"
                        alt=""
                        width={320}
                        height={374}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}

                  <button
                    id={triggerId}
                    type="button"
                    onClick={() =>
                      setOpenFaqId((prev) => (prev === faq.id ? null : faq.id))
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="relative z-10 w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <span
                        className={cn(
                          "shrink-0 w-7 h-7 rounded-lg text-[11px] font-bold tabular-nums flex items-center justify-center border transition-colors duration-200 mt-0.5 sm:mt-0",
                          isOpen
                            ? "bg-accent text-white border-accent"
                            : "bg-white text-neutral-500 border-neutral-200/90",
                        )}
                      >
                        {indexLabel}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#0f0000] tracking-tight leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-transform duration-200",
                        isOpen
                          ? "border-accent/40 bg-red-50 text-accent rotate-180"
                          : "border-neutral-200 bg-white text-neutral-500 rotate-0",
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
                        className="relative z-10 overflow-hidden"
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
  );
}
