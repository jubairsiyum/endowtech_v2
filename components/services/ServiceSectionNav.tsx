"use client";

import { scrollToElement } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ServiceSectionNavItem {
  id: string;
  label: string;
}

export const SERVICE_PAGE_SECTIONS: ServiceSectionNavItem[] = [
  { id: "service-overview", label: "Overview" },
  { id: "service-capabilities", label: "Capabilities" },
  { id: "service-stack", label: "Tech Stack" },
  { id: "service-proof", label: "Production Proof" },
  { id: "other-services", label: "Services" },
  { id: "service-faq", label: "FAQ" },
];

export default function ServiceSectionNav({
  items = SERVICE_PAGE_SECTIONS,
  ctaLabel = "Discuss a Project",
  ctaTargetId = "service-contact",
}: {
  items?: ServiceSectionNavItem[];
  ctaLabel?: string;
  ctaTargetId?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollLockUntilRef = useRef<number>(0);
  const isNavbarVisibleRef = useRef<boolean>(true);

  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
  const [isPinned, setIsPinned] = useState<boolean>(false);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    const navEl = navRef.current;

    if (navEl) {
      const rect = navEl.getBoundingClientRect();
      const stickyThreshold = isNavbarVisibleRef.current
        ? window.innerWidth >= 640
          ? 98
          : 82
        : 2;
      setIsPinned(rect.top <= stickyThreshold);
    }

    // Preserve clicked highlight while smooth scroll glides to target section
    if (performance.now() < scrollLockUntilRef.current) {
      return;
    }

    const viewportH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    // If user reached bottom of document, highlight the last tracked nav section cleanly
    if (currentScrollY + viewportH >= docH - 60 && items.length > 0) {
      setActiveId(items[items.length - 1].id);
      return;
    }

    const triggerOffset = window.innerWidth >= 640 ? 185 : 155;
    let currentActive = items[0]?.id ?? "";

    for (let i = 0; i < items.length; i++) {
      const sectionEl = document.getElementById(items[i].id);
      if (!sectionEl) continue;
      if (sectionEl.getBoundingClientRect().top <= triggerOffset) {
        currentActive = items[i].id;
      } else {
        break;
      }
    }

    if (currentActive) {
      setActiveId(currentActive);
    }
  }, [items]);

  // Synchronize sticky offset with Navbar visibility on scroll (matches Navbar.tsx smart-header thresholds)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleFrame = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      let nextVisible = isNavbarVisibleRef.current;

      if (currentScrollY <= 40) {
        nextVisible = true;
      } else if (diff > 8) {
        nextVisible = false;
      } else if (diff < -8) {
        nextVisible = true;
      }

      if (nextVisible !== isNavbarVisibleRef.current) {
        isNavbarVisibleRef.current = nextVisible;
        setIsNavbarVisible(nextVisible);
      }

      lastScrollY = currentScrollY;
      updateScrollState();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleFrame);
        ticking = true;
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Keep active tab centered horizontally inside mobile scroller without affecting vertical scroll
  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeBtn = itemRefs.current[activeId];
    if (!scroller || !activeBtn) return;

    if (scroller.scrollWidth <= scroller.clientWidth + 4) return;

    const targetLeft =
      activeBtn.offsetLeft - scroller.clientWidth * 0.5 + activeBtn.offsetWidth * 0.5;
    scroller.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeId]);

  const navigateToSection = (sectionId: string, highlightTab = true) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (highlightTab) {
      setActiveId(sectionId);
      scrollLockUntilRef.current = performance.now() + 820;
    }

    const rectTop = target.getBoundingClientRect().top + window.scrollY;
    const scrollingUp = rectTop < window.scrollY - 12;

    // Account for Navbar visibility when jumping upward vs hidden Navbar when jumping downward
    const offset = scrollingUp
      ? window.innerWidth >= 640
        ? -154
        : -138
      : -66;

    scrollToElement(target, offset, 0.75);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Service section navigation"
      className={cn(
        "sticky z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/90 transition-[top,box-shadow] duration-300 ease-out",
        isNavbarVisible ? "top-20 sm:top-24" : "top-0",
        isPinned && "shadow-[0_12px_32px_-18px_rgba(15,0,0,0.14)]",
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 h-[52px] sm:h-[56px] flex items-center justify-between gap-6">
        {/* Scrollable horizontal section links */}
        <div
          ref={scrollerRef}
          className="flex items-center gap-5 sm:gap-7 lg:gap-8 h-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => navigateToSection(item.id, true)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative h-full inline-flex items-center text-[13px] sm:text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:text-accent",
                  isActive
                    ? "font-semibold text-accent"
                    : "font-medium text-neutral-500 hover:text-[#0f0000]",
                )}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-0 inset-x-0 h-[2px] rounded-full bg-accent transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right Action CTA — matches reference sticky nav action link */}
        <button
          type="button"
          onClick={() => navigateToSection(ctaTargetId, false)}
          className="group hidden sm:inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-semibold text-accent hover:text-accent-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:underline"
        >
          <span>{ctaLabel}</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
