"use client";

import { FlowButton } from "@/components/ui/FlowButton";
import Image from "next/image";

export interface FeaturedWorkCtaProps {
  onOpenScheduler?: () => void;
  buttonVariant?: "white-red" | "white-gray" | "white";
}

export default function FeaturedWorkCta({
  onOpenScheduler,
  buttonVariant = "white-red",
}: FeaturedWorkCtaProps) {
  const handleCtaClick = () => {
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

  return (
    <section
      id="engineering-challenge"
      aria-label="Discuss Your Engineering Challenge"
      className="relative z-20 w-full bg-accent text-white overflow-hidden py-10 sm:py-12 md:py-14 lg:py-16"
    >
      {/* ── Ambient White Watermark (Right Side) ── */}
      <div
        aria-hidden="true"
        className="absolute -right-16 sm:-right-8 md:right-0 lg:right-6 xl:right-10 top-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] md:w-[560px] lg:w-[680px] xl:w-[760px] pointer-events-none select-none opacity-10 sm:opacity-15 transition-opacity duration-300"
      >
        <Image
          src="/images/watermark_white.webp"
          alt=""
          width={640}
          height={748}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* ── Left Content: Clean Headline & White Button ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-7 lg:px-10 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl md:text-[25px] lg:text-[30px] font-bold text-white tracking-tight leading-[1.25] mb-5">
            From complex architecture to seamless
            <span className="block mt-1 sm:mt-1.5 text-white">
              user experiences - Let&apos;s build
            </span>
          </h2>

          <div className="mt-5 sm:mt-6">
            <FlowButton
              variant={buttonVariant}
              size="lg"
              onClick={handleCtaClick}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              Discuss Your Engineering Challenge
            </FlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
