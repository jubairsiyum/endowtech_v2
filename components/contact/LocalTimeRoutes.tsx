"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Moon, Phone, Sun } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import { officeRoutes } from "@/data/contact";
import { cn } from "@/lib/utils";
import type { OfficeRoute } from "@/types";

interface TimeSnapshot {
  timeStr: string;
  isDaytime: boolean;
}

function getTimeSnapshot(route: OfficeRoute, now: Date): TimeSnapshot {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: route.timeZone,
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

function CountryFlag({ code }: { code: "KR" | "BD" }) {
  if (code === "KR") {
    return (
      <svg
        width="20"
        height="14"
        viewBox="0 0 24 16"
        aria-label="South Korea flag"
        className="rounded-[2px] border border-neutral-200 shrink-0 shadow-xs"
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
      width="20"
      height="14"
      viewBox="0 0 24 16"
      aria-label="Bangladesh flag"
      className="rounded-[2px] border border-neutral-200 shrink-0 shadow-xs"
    >
      <rect width="24" height="16" fill="#006A4E" />
      <circle cx="10.8" cy="8" r="4.6" fill="#F42A41" />
    </svg>
  );
}

export function LocalTimeRoutes() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 15_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="office-routes"
      className="py-20 sm:py-24 lg:py-28 bg-[#f8f9fa] border-y border-neutral-200/70"
      aria-labelledby="local-time-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Clean Large Top-Aligned Heading Only */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={18}
            threshold={0.06}
            duration={0.62}
            ease="power2.out"
            className="lg:col-span-5 pt-1"
          >
            <h2
              id="local-time-heading"
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.06]"
            >
              Local time
              <br />
              Direct routes.
            </h2>
          </AnimatedContent>

          {/* Right Column: ONLY Seoul, South Korea & Dhaka, Bangladesh */}
          <AnimatedContent
            direction="vertical"
            distance={20}
            stagger={0.09}
            threshold={0.06}
            duration={0.62}
            ease="power3.out"
            className="lg:col-span-7 space-y-4"
          >
            {officeRoutes.map((route) => {
              const snap = now ? getTimeSnapshot(route, now) : null;
              const isDay = snap ? snap.isDaytime : true;
              const isNight = snap ? !snap.isDaytime : false;

              return (
                <div
                  key={route.id}
                  className={cn(
                    "group relative rounded-2xl border p-5 sm:p-6 transition-[border-color,box-shadow] duration-300",
                    isNight
                      ? "bg-[#0f0000] border-white/10 shadow-[0_18px_45px_-16px_rgba(15,0,0,0.45)] hover:border-accent/55"
                      : "bg-white border-neutral-200/90 shadow-sm hover:border-accent/40 hover:shadow-[0_14px_36px_-14px_rgba(220,38,38,0.14)]",
                  )}
                >
                  {/* Subtle left red highlight on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    {/* Clock + Hub Identity */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7 min-w-0">
                      {/* Live Clock Block */}
                      <div className="flex items-center gap-3 shrink-0 min-w-[140px]">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center border shrink-0",
                            isDay
                              ? "bg-red-50 border-red-200/70 text-accent"
                              : "bg-white/10 border-white/15 text-red-400",
                          )}
                          title={
                            isDay
                              ? "Daytime locally"
                              : "Evening / Night locally"
                          }
                        >
                          {isDay ? (
                            <Sun className="w-4 h-4" />
                          ) : (
                            <Moon className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div
                            className={cn(
                              "text-xl sm:text-2xl font-bold tabular-nums tracking-tight leading-none",
                              isNight ? "text-white" : "text-[#0f0000]",
                            )}
                          >
                            {snap ? snap.timeStr : "--:--"}
                          </div>
                          <div
                            className={cn(
                              "mt-1 text-[10px] font-mono uppercase tracking-wider",
                              isNight ? "text-gray-400" : "text-neutral-500",
                            )}
                          >
                            {route.utcOffset}
                          </div>
                        </div>
                      </div>

                      {/* Divider on sm+ */}
                      <div
                        aria-hidden="true"
                        className={cn(
                          "hidden sm:block h-10 w-px shrink-0",
                          isNight ? "bg-white/15" : "bg-neutral-200/80",
                        )}
                      />

                      {/* Flag, City, Hub Type & Address */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <CountryFlag code={route.countryCode} />
                          <span
                            className={cn(
                              "text-xs font-medium",
                              isNight ? "text-gray-300" : "text-neutral-500",
                            )}
                          >
                            {route.country}
                          </span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-md font-mono text-[10px] uppercase tracking-wider",
                              isNight
                                ? "bg-white/10 text-gray-200"
                                : "bg-neutral-100 text-neutral-600",
                            )}
                          >
                            {route.hubLabel}
                          </span>
                        </div>

                        <h3
                          className={cn(
                            "text-lg sm:text-xl font-bold tracking-tight mt-1",
                            isNight ? "text-white" : "text-[#0f0000]",
                          )}
                        >
                          {route.city}
                        </h3>
                        <p
                          className={cn(
                            "text-xs mt-0.5 truncate max-w-xs sm:max-w-sm",
                            isNight ? "text-gray-400" : "text-neutral-500",
                          )}
                        >
                          {route.address}
                        </p>
                      </div>
                    </div>

                    {/* Direct Phone, Email & Map Button */}
                    <div
                      className={cn(
                        "flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 shrink-0",
                        isNight ? "border-white/10" : "border-neutral-100",
                      )}
                    >
                      <div className="flex flex-col gap-1.5 text-xs">
                        <a
                          href={`tel:${route.phone.replace(/[^+\d]/g, "")}`}
                          className={cn(
                            "inline-flex items-center gap-2 font-medium transition-colors",
                            isNight
                              ? "text-gray-200 hover:text-red-400"
                              : "text-neutral-700 hover:text-accent",
                          )}
                        >
                          <Phone
                            className={cn(
                              "w-3.5 h-3.5 shrink-0",
                              isNight ? "text-red-400" : "text-accent/80",
                            )}
                          />
                          <span className="tabular-nums">{route.phone}</span>
                        </a>
                        <a
                          href={`mailto:${route.email}`}
                          className={cn(
                            "inline-flex items-center gap-2 font-medium transition-colors",
                            isNight
                              ? "text-gray-200 hover:text-red-400"
                              : "text-neutral-700 hover:text-accent",
                          )}
                        >
                          <Mail
                            className={cn(
                              "w-3.5 h-3.5 shrink-0",
                              isNight ? "text-red-400" : "text-accent/80",
                            )}
                          />
                          <span>{route.email}</span>
                        </a>
                      </div>

                      <a
                        href={route.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${route.city} office on Google Maps`}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 shrink-0",
                          isNight
                            ? "bg-white/10 border-white/15 text-white hover:bg-accent hover:text-white hover:border-accent"
                            : "bg-[#f7f7f9] border-neutral-200/90 text-[#0f0000] hover:bg-accent hover:text-white hover:border-accent",
                        )}
                      >
                        <span>Map</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}

export default LocalTimeRoutes;
