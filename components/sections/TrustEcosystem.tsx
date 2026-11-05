"use client";

import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/FadeIn";
import TextLoop from "@/components/TextLoop";
import { FlowButton } from "@/components/ui/FlowButton";
import { siteConfig } from "@/data/siteConfig";
import { Building2, Cpu, Globe2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const ECOSYSTEM_TICKER = [
  "Endow Global Education",
  "EduFlow LMS",
  "UniMatch AI",
  "LeadFlow CRM",
  "Seoul Tech Hub",
  "Finland Student Desk",
  "LaunchMetrics",
  "ConnectBridge API",
  "Global Tuition Settlement",
  "Dhaka Engineering Ops",
].join(" ✦ ");

export default function TrustEcosystem() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative bg-white pt-12 sm:pt-16 pb-0 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
          {/* Left description */}
          <div className="max-w-2xl">
            <FadeIn>
              {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/[0.08] border border-accent/25 text-accent font-mono text-xs font-semibold uppercase tracking-wider mb-5">
                {"// Corporate Ecosystem"}
              </div> */}
              <span className="hidden md:block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-5">
                Corporate Ecosystem
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-900 tracking-tight leading-[1.15]">
                An international technology wing backed by{" "}
                <span className="text-accent underline decoration-accent/30 decoration-wavy underline-offset-4">
                  {siteConfig.parentCompany.name}
                </span>
                .
              </h2>

              <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed">
                Headquartered in Seoul, South Korea, with regional engineering
                operations in Dhaka, Endow Corporation operates across higher
                education consultancy, international mobility, and enterprise
                digital systems. Endow Tech delivers the mission-critical
                software powering this global ecosystem.
              </p>

              {/* Action FlowButtons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <FlowButton
                  text="Connect With Leadership"
                  href="#contact"
                  variant="primary"
                  size="md"
                />
                <FlowButton
                  text="Explore Flagship Platforms"
                  href="#products"
                  variant="outline"
                  size="md"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right badges & stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-[580px] shrink-0">
            <FadeIn delay={0.1}>
              <div className="h-full p-6 rounded-2xl bg-neutral-50/70 hover:bg-white border border-gray-200/80 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">
                  Corporate HQ
                </div>
                <div className="text-xl font-bold text-gray-900 mt-1.5">
                  Seoul, South Korea
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Teheran-ro, Gangnam · Global Strategy &amp; Governance
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="h-full p-6 rounded-2xl bg-neutral-50/70 hover:bg-white border border-gray-200/80 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">
                  Tech &amp; Ops Hub
                </div>
                <div className="text-xl font-bold text-gray-900 mt-1.5">
                  Dhaka, Bangladesh
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Shyamoli Square · High-Velocity Engineering Studio
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="h-full p-6 rounded-2xl bg-neutral-50/70 hover:bg-white border border-gray-200/80 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">
                  Specializations
                </div>
                <div className="text-xl font-bold text-gray-900 mt-1.5">
                  South Korea &amp; Finland
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Cross-Border Higher Education &amp; Visa Automation
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="h-full p-6 rounded-2xl bg-neutral-50/70 hover:bg-white border border-gray-200/80 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider">
                  Engineering SLA
                </div>
                <div className="text-xl font-bold text-gray-900 mt-1.5">
                  <CountUp value="99.98%" duration={2} /> Uptime SLA
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Zero-Downtime Deployment &amp; Resilient Cloud Ops
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── TEXTLOOP: WAVE SEPARATOR WITH CORPORATE ECOSYSTEM TEXT ── */}
      <div className="relative z-30 w-full pointer-events-none overflow-hidden -my-2 sm:-my-3">
        <div className="pointer-events-auto w-full">
          <TextLoop
            text={ECOSYSTEM_TICKER}
            separator="✦"
            shape="wave"
            speed={45}
            direction="forward"
            curviness={0}
            tilt={-5}
            ribbon
            ribbonColor="#dc2626"
            ribbonWidth={isMobile ? 110 : 54}
            fontSize={isMobile ? 40 : 21}
            fontWeight={800}
            letterSpacing={2}
            uppercase
            color="#ffffff"
            edgeFade={0}
            cross={false}
            draggable={true}
            scrollBoost={0}
            pauseOnHover={true}
            expandOnScroll={true}
            expandDirection="right-to-left"
            expandFinishTopRatio={0.3}
          />
        </div>
      </div>
    </section>
  );
}
