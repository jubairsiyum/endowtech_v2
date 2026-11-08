"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function scrollToElement(
  target: string | HTMLElement,
  offset = -30,
  duration = 0.75
) {
  if (typeof window === "undefined") return;

  let resolvedElement: HTMLElement | null = null;

  if (typeof target === "string") {
    // Sanitize target in case a path like "/#featured-projects" was passed
    const hashIndex = target.indexOf("#");
    const cleanSelector = hashIndex !== -1 ? target.slice(hashIndex) : target;

    try {
      const el = document.querySelector(cleanSelector);
      if (el instanceof HTMLElement) {
        resolvedElement = el;
      }
    } catch {
      // In case of invalid selector, safely ignore without crashing
      return;
    }
  } else if (target instanceof HTMLElement) {
    resolvedElement = target;
  }

  if (!resolvedElement) return;

  if (window.lenis) {
    window.lenis.scrollTo(resolvedElement, { offset, duration });
  } else {
    resolvedElement.scrollIntoView({ behavior: "smooth" });
  }
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Optimized Lenis configuration:
    // - lerp: 0.14 instead of duration. Lerp applies immediate 1:1 motion on frame 1 with 0ms input delay
    // - wheelMultiplier: 1.0 for natural scroll travel
    // - syncTouch: false preserves native 120Hz hardware scrolling on touch/mobile
    const lenis = new Lenis({
      lerp: 0.14,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    window.lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smoothly handle all anchor hash clicks on the page with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      const isAnchor = href.startsWith("#") && href.length > 1;
      const isHomeAnchor =
        href.startsWith("/#") &&
        (window.location.pathname === "/" || window.location.pathname === "");

      if (isAnchor || isHomeAnchor) {
        const hash = href.slice(href.indexOf("#"));
        try {
          const el = document.querySelector(hash);
          if (el instanceof HTMLElement) {
            e.preventDefault();
            lenis.scrollTo(el, { offset: -30, duration: 0.75 });
          }
        } catch {
          // ignore invalid selector
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      delete window.lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
