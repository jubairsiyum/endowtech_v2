"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { FlowButton } from "@/components/ui/FlowButton";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Globe2,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

interface HubMeta {
  countryCode: "KR" | "BD";
  timeZone: "Asia/Seoul" | "Asia/Dhaka";
  utcOffset: string;
  focus: string;
  mapUrl: string;
}

const HUB_META: Record<string, HubMeta> = {
  Seoul: {
    countryCode: "KR",
    timeZone: "Asia/Seoul",
    utcOffset: "KST · UTC+9",
    focus: "Corporate Strategy, Governance & Global Client Partnerships",
    mapUrl:
      "https://maps.google.com/?q=Gangnam-daero,+Seocho-gu,+Seoul,+South+Korea",
  },
  Dhaka: {
    countryCode: "BD",
    timeZone: "Asia/Dhaka",
    utcOffset: "BST · UTC+6",
    focus: "Full-Stack Product Engineering, AI Systems & Cloud Operations",
    mapUrl:
      "https://maps.google.com/?q=Shyamoli+Square,+Mirpur+Road,+Dhaka+1207,+Bangladesh",
  },
};

function CountryFlag({ code }: { code: "KR" | "BD" }) {
  if (code === "KR") {
    return (
      <svg
        width="22"
        height="15"
        viewBox="0 0 24 16"
        aria-label="South Korea flag"
        className="rounded-[3px] border border-neutral-200 shrink-0 shadow-xs"
      >
        <rect width="24" height="16" fill="#FFFFFF" />
        <g transform="translate(12,8)">
          <circle r="3.6" fill="#CD2E3A" />
          <path
            d="M -3.6 0 A 3.6 3.6 0 0 0 3.6 0 A 1.8 1.8 0 0 1 0 0 A 1.8 1.8 0 0 0 -3.6 0 Z"
            fill="#0047A0"
          />
        </g>
        <g stroke="#111827" strokeWidth="0.9" strokeLinecap="butt">
          <line x1="4.2" y1="3.4" x2="6.6" y2="5.2" />
          <line x1="3.4" y1="4.5" x2="5.8" y2="6.3" />
          <line x1="17.4" y1="5.2" x2="19.8" y2="3.4" />
          <line x1="18.2" y1="6.3" x2="20.6" y2="4.5" />
          <line x1="4.2" y1="12.6" x2="6.6" y2="10.8" />
          <line x1="3.4" y1="11.5" x2="5.8" y2="9.7" />
          <line x1="17.4" y1="10.8" x2="19.8" y2="12.6" />
          <line x1="18.2" y1="9.7" x2="20.6" y2="11.5" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 24 16"
      aria-label="Bangladesh flag"
      className="rounded-[3px] border border-neutral-200 shrink-0 shadow-xs"
    >
      <rect width="24" height="16" fill="#006A4E" />
      <circle cx="10.8" cy="8" r="4.6" fill="#F42A41" />
    </svg>
  );
}

interface TimeSnapshot {
  timeStr: string;
  isDaytime: boolean;
}

function getTimeSnapshot(
  timeZone: "Asia/Seoul" | "Asia/Dhaka",
  now: Date,
): TimeSnapshot {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minuteStr = parts.find((p) => p.type === "minute")?.value ?? "00";
  const hour24 = Number.parseInt(hourStr, 10) % 24;
  const isDaytime = hour24 >= 6 && hour24 < 19;

  return {
    timeStr: `${String(hour24).padStart(2, "0")}:${minuteStr}`,
    isDaytime,
  };
}

export default function GlobalPresence() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="about"
      className="relative section-padding bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* ── Clean Soft Radial Crimson Glows (Zero Grid) ── */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 translate-x-1/4 w-[620px] sm:w-[780px] aspect-square rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, rgba(239, 68, 68, 0.03) 42%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-36 -left-24 w-[520px] aspect-square rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.055) 0%, rgba(239, 68, 68, 0.02) 45%, transparent 72%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left Column: Editorial Story & Philosophy ── */}
          <div className="lg:col-span-6">
            <FadeIn>
              <span className="block font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-3">
                Global Footprint &amp; Identity
              </span>

              <h2
                id="about-heading"
                className="text-[clamp(28px,3.1vw,46px)] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.1]"
              >
                Built in Dhaka. <br />
                <span className="gradient-text">Headquartered in Seoul.</span>
              </h2>

              <p className="mt-5 text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Endow Tech bridges global strategy with top-tier engineering
                talent. As the technological foundation of{" "}
                <strong className="font-semibold text-[#0f0000]">
                  Endow Corporation
                </strong>
                , our systems serve international education pipelines connecting
                students with premier academic institutions in South Korea,
                Finland, and beyond.
              </p>

              <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
                We believe in{" "}
                <strong className="font-semibold text-[#0f0000]">
                  purposeful engineering
                </strong>
                : no bloatware, no cutting corners on security, and no fragile
                hacks. Whether we are building internal platforms for our parent
                company or launching MVPs for startup founders, we engineer for
                long-term durability.
              </p>

              {/* Architectural Corridor Strip */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                <div className="rounded-2xl bg-[#fafafa] border border-neutral-200/80 px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                    <Globe2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Corridor</span>
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#0f0000]">
                    Seoul ↔ Dhaka
                  </div>
                </div>

                <div className="rounded-2xl bg-[#fafafa] border border-neutral-200/80 px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Sync Window
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#0f0000] tabular-nums">
                    KST · BST (+3h)
                  </div>
                </div>

                <div className="rounded-2xl bg-[#fafafa] border border-neutral-200/80 px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    <ShieldCheck
                      className="w-3.5 h-3.5 text-accent"
                      aria-hidden="true"
                    />
                    <span>Standard</span>
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#0f0000]">
                    100% IP Ownership
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <FlowButton
                  text="Work With Our Engineers"
                  href="#contact"
                  variant="primary"
                  size="md"
                />
                <FlowButton
                  text="Explore Our Work"
                  href="#featured-projects"
                  variant="outline"
                  size="md"
                />
              </div>
            </FadeIn>
          </div>

          {/* ── Right Column: Connected Dual Hub Architectural Cards ── */}
          <div className="lg:col-span-6 relative">
            {/* Subtle Vertical Bridge Line Connecting Seoul HQ & Dhaka Tech Hub */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute left-9 top-16 bottom-16 w-px bg-gradient-to-b from-accent/40 via-red-200 to-accent/40 pointer-events-none"
            />

            <div className="space-y-5 relative">
              {siteConfig.offices.map((office, idx) => {
                const meta = HUB_META[office.city] ?? HUB_META.Seoul;
                const snap = now ? getTimeSnapshot(meta.timeZone, now) : null;
                const isDay = snap ? snap.isDaytime : true;
                const isNight = snap ? !snap.isDaytime : false;
                const liveTime = snap ? snap.timeStr : "--:--";

                return (
                  <FadeIn key={office.city} delay={idx * 0.12}>
                    <article
                      className={cn(
                        "group relative rounded-2xl sm:rounded-3xl border p-6 sm:p-7 transition-all duration-300",
                        isNight
                          ? "bg-[#0f0000] border-white/10 text-white shadow-[0_24px_55px_-20px_rgba(15,0,0,0.45)] hover:border-accent/60"
                          : "bg-[#fafafa] border-neutral-200/90 text-[#0f0000] shadow-[0_14px_38px_-20px_rgba(15,0,0,0.08)] hover:bg-white hover:border-accent/45 hover:shadow-[0_20px_48px_-20px_rgba(220,38,38,0.14)]",
                      )}
                    >
                      {/* Subtle Left Crimson Edge Bar on Hover */}
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />

                      {/* Top Row: Hub Type Badge + Live Local Time & Active Status */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="inline-flex items-center gap-2.5">
                          <CountryFlag code={meta.countryCode} />
                          <span
                            className={cn(
                              "text-[11px] font-sans font-bold uppercase tracking-[0.14em]",
                              isNight ? "text-red-400" : "text-accent",
                            )}
                          >
                            {office.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold tabular-nums border",
                              isNight
                                ? "bg-white/[0.06] border-white/10 text-gray-200"
                                : "bg-white border-neutral-200/90 text-neutral-700",
                            )}
                            title={
                              isDay
                                ? `${office.city}: Daytime locally`
                                : `${office.city}: Evening / Night locally`
                            }
                          >
                            {isDay ? (
                              <Sun
                                className="w-3.5 h-3.5 text-amber-500 shrink-0"
                                aria-hidden="true"
                              />
                            ) : (
                              <Moon
                                className="w-3.5 h-3.5 text-red-400 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            <span>{liveTime}</span>
                            <span
                              className={cn(
                                "text-[10px]",
                                isNight ? "text-gray-400" : "text-neutral-400",
                              )}
                            >
                              {meta.utcOffset}
                            </span>
                          </span>

                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border",
                              isNight
                                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200",
                            )}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {office.status}
                          </span>
                        </div>
                      </div>

                      {/* City & Country */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3
                            className={cn(
                              "text-xl sm:text-2xl font-bold tracking-tight",
                              isNight ? "text-white" : "text-[#0f0000]",
                            )}
                          >
                            {office.city}, {office.country}
                          </h3>
                          <p
                            className={cn(
                              "mt-1 text-xs sm:text-sm font-medium",
                              isNight ? "text-red-200/80" : "text-neutral-600",
                            )}
                          >
                            {meta.focus}
                          </p>
                        </div>

                        <a
                          href={meta.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${office.city} office on Google Maps`}
                          className={cn(
                            "shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200",
                            isNight
                              ? "bg-white/[0.07] border-white/15 text-white hover:bg-accent hover:border-accent"
                              : "bg-white border-neutral-200 text-neutral-700 hover:bg-accent hover:text-white hover:border-accent",
                          )}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Address & Phone Footer */}
                      <div
                        className={cn(
                          "mt-5 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs",
                          isNight
                            ? "border-white/10 text-gray-300"
                            : "border-neutral-200/80 text-neutral-600",
                        )}
                      >
                        <div className="flex items-start sm:items-center gap-2 min-w-0">
                          <MapPin
                            className={cn(
                              "w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0",
                              isNight ? "text-red-400" : "text-accent",
                            )}
                            aria-hidden="true"
                          />
                          <span className="leading-snug">{office.address}</span>
                        </div>

                        <a
                          href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                          className={cn(
                            "inline-flex items-center gap-1.5 font-semibold tabular-nums shrink-0 transition-colors",
                            isNight
                              ? "text-white hover:text-red-300"
                              : "text-[#0f0000] hover:text-accent",
                          )}
                        >
                          <Phone
                            className={cn(
                              "w-3.5 h-3.5 shrink-0",
                              isNight ? "text-red-400" : "text-accent",
                            )}
                            aria-hidden="true"
                          />
                          <span>{office.phone}</span>
                        </a>
                      </div>
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
