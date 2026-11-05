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
  if (typeof window !== "undefined" && window.lenis) {
    window.lenis.scrollTo(target, { offset, duration });
  } else if (typeof window !== "undefined") {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
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
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -30, duration: 0.75 });
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
