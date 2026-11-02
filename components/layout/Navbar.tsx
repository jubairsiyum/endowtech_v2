"use client";

import { siteConfig } from "@/data/siteConfig";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar({
  isSchedulerOpen,
  setIsSchedulerOpen,
}: {
  isSchedulerOpen: boolean;
  setIsSchedulerOpen: (open: boolean) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSurface, setIsDarkSurface] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Non-blocking IntersectionObserver for dark vs light section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Observe dark sections cleanly without elementFromPoint layout thrashing
    const darkSectionIds = [
      "hero",
      "products",
      "process",
      "tech-stack",
      "comparison",
      "faq",
    ];
    const observers: IntersectionObserver[] = [];

    if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setIsDarkSurface(true);
            } else if (
              !entry.isIntersecting &&
              ["services", "work", "about", "testimonials", "contact"].some(
                (id) => {
                  const el = document.getElementById(id);
                  if (!el) return false;
                  const rect = el.getBoundingClientRect();
                  return rect.top <= 80 && rect.bottom >= 80;
                },
              )
            ) {
              setIsDarkSurface(false);
            }
          });
        },
        { threshold: [0.1, 0.3, 0.6] },
      );

      darkSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });

      observers.push(io);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock background scroll when scheduler modal is open
  useEffect(() => {
    if (!isSchedulerOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSchedulerOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSchedulerOpen, setIsSchedulerOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto mt-3 sm:mt-4 px-5 sm:px-8 flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled
              ? "w-full max-w-6xl h-14 sm:h-16 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 shadow-xl"
              : "w-full max-w-[1400px] h-16 sm:h-20 bg-transparent rounded-none border border-transparent"
          }`}
          aria-label="Main navigation"
        >
          {/* ── Brand Logo ── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            aria-label="Endow Tech homepage"
          >
            <div className="relative h-9 w-32 sm:h-11 sm:w-40">
              <Image
                src={
                  isDarkSurface
                    ? "/images/logo_dark.svg"
                    : "/images/logo_light.svg"
                }
                alt="Endow Tech"
                fill
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>
          </a>

          {/* ── Desktop Navigation Links ── */}
          <div className="hidden md:flex items-center gap-7">
            <button
              onClick={() => scrollTo("#products")}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isDarkSurface
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isDarkSurface
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => scrollTo("#process")}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isDarkSurface
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Methodology
            </button>
            <button
              onClick={() => scrollTo("#tech-stack")}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isDarkSurface
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Stack
            </button>
            <button
              onClick={() => scrollTo("#work")}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isDarkSurface
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollTo("#faq")}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isDarkSurface
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              FAQ
            </button>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSchedulerOpen(true)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer hidden sm:inline-flex items-center gap-2 ${
                isDarkSurface
                  ? "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
              }`}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Schedule Call</span>
            </button>

            <button
              onClick={() => scrollTo("#contact")}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover shadow-sm shadow-accent/40 active:scale-[0.98] transition-all cursor-pointer"
            >
              Start Project
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 space-y-6">
          <button
            onClick={() => scrollTo("#products")}
            className="text-xl font-bold text-white text-left uppercase tracking-wider"
          >
            Flagship Products
          </button>
          <button
            onClick={() => scrollTo("#services")}
            className="text-xl font-bold text-white text-left uppercase tracking-wider"
          >
            Capabilities &amp; Services
          </button>
          <button
            onClick={() => scrollTo("#process")}
            className="text-xl font-bold text-white text-left uppercase tracking-wider"
          >
            Engineering Process
          </button>
          <button
            onClick={() => scrollTo("#tech-stack")}
            className="text-xl font-bold text-white text-left uppercase tracking-wider"
          >
            Architecture &amp; Stack
          </button>
          <button
            onClick={() => scrollTo("#work")}
            className="text-xl font-bold text-white text-left uppercase tracking-wider"
          >
            Case Studies
          </button>
          <button
            onClick={() => scrollTo("#about")}
            className="text-xl font-bold text-white text-left uppercase tracking-wider"
          >
            Global Presence (Seoul &amp; Dhaka)
          </button>
          <button
            onClick={() => scrollTo("#faq")}
            className="text-xl font-bold text-white text-left uppercase tracking-wider"
          >
            FAQ
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSchedulerOpen(true);
            }}
            className="text-xl font-bold text-accent text-left uppercase tracking-wider pt-4 border-t border-white/10"
          >
            Book a 30-Min Call
          </button>
        </div>
      )}

      {/* ── Google Calendar Scheduling Modal ── */}
      {isSchedulerOpen && (
        <div
          className="fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-md px-4 py-6 sm:px-6 md:px-10 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Book a consultation call"
          onClick={() => setIsSchedulerOpen(false)}
        >
          <div
            className="h-[88vh] w-full max-w-5xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Schedule an Engineering Consultation
                </h2>
                <p className="text-xs text-slate-500">
                  Select a date and time with the Endow Tech senior engineering
                  squad.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSchedulerOpen(false)}
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close scheduling modal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 min-h-0 bg-white">
              <iframe
                src={siteConfig.contact.schedulerUrl}
                title="Google Calendar appointment scheduling"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
