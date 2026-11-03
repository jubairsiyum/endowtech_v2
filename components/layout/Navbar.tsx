"use client";

import { siteConfig } from "@/data/siteConfig";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#services", hasChevron: true },
  { label: "Solutions", href: "#products", hasChevron: true },
  { label: "Methodology", href: "#process", hasChevron: false },
  { label: "Stack", href: "#tech-stack", hasChevron: false },
  { label: "Case Studies", href: "#work", hasChevron: false },
  { label: "FAQ", href: "#faq", hasChevron: false },
];

export default function Navbar({
  isSchedulerOpen,
  setIsSchedulerOpen,
}: {
  isSchedulerOpen: boolean;
  setIsSchedulerOpen: (open: boolean) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smart Header: hide on scroll down, show on scroll up with a smooth slider
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (diff > 8) {
        // Scrolling down -> hide navbar smoothly
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (diff < -8) {
        // Scrolling up a bit -> show navbar smoothly
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      {/* ── Fixed Full-Width Smart Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-out transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Full-width dark container with thin bottom border */}
        <div className="w-full bg-dark-red-900 backdrop-blur-md border-b border-white/[0.15]">
          {/* Outer gutter padding so left and right vertical borders are clearly visible across all viewport sizes */}
          <div className="w-full px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <nav
              className="max-w-[1380px] mx-auto h-20 sm:h-24 flex items-center justify-between border-l border-r border-white/20 px-4 sm:px-6 lg:px-8"
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
                <div className="relative h-12 w-36 sm:h-16 sm:w-56">
                  <Image
                    src="/images/logo_dark.svg"
                    alt="Endow Tech"
                    fill
                    style={{
                      objectFit: "contain",
                      objectPosition: "left center",
                    }}
                    priority
                  />
                </div>
              </a>

              {/* ── Desktop Navigation Links ── */}
              <div className="hidden lg:flex items-center gap-7 xl:gap-9">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="text-base font-medium text-white/85 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group py-1.5"
                  >
                    <span>{link.label}</span>
                    {link.hasChevron && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="opacity-70 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* ── Right Action Section: Schedule Pill Button + Mobile Toggle ── */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSchedulerOpen(true)}
                  className="bg-white hover:bg-neutral-100 text-black font-semibold text-sm sm:text-base px-5 py-2.5 sm:px-7 sm:py-3 rounded-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5 group shadow-sm active:scale-[0.98]"
                  aria-label="Schedule consultation call"
                >
                  <span>Schedule Call</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white focus:outline-none cursor-pointer"
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
          </div>
        </div>

        {/* ── Mobile Navigation Drawer ── */}
        {mobileMenuOpen && (
          <div className="w-full bg-[#070811]/98 backdrop-blur-xl border-b border-white/10 lg:hidden px-6 py-6 flex flex-col space-y-4 shadow-2xl">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-base sm:text-lg font-semibold text-white/90 hover:text-white text-left uppercase tracking-wider py-2.5 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.hasChevron && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="opacity-50"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </header>

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
