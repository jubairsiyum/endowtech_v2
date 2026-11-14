"use client";

import SlingButton, { type SlingAction } from "@/components/SlingButton";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 180;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const keepAliveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const launchingRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      if (launchingRef.current) return;
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });

    return () => {
      clearTimeout(keepAliveTimer.current);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const handleScrollToTop = useCallback(() => {
    launchingRef.current = true;
    clearTimeout(keepAliveTimer.current);

    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (window.lenis && !isTouch) {
      window.lenis.scrollTo(0, { duration: 1.1 });
    } else if (window.lenis) {
      try {
        window.lenis.scrollTo(0, { duration: 1.1 });
      } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    keepAliveTimer.current = setTimeout(() => {
      launchingRef.current = false;
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }, 1150);
  }, []);

  const handleScrollToBottom = useCallback(() => {
    launchingRef.current = true;
    clearTimeout(keepAliveTimer.current);

    const targetY = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      document.body.scrollHeight - window.innerHeight,
      0
    );

    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (window.lenis && !isTouch) {
      window.lenis.scrollTo("bottom", { duration: 1.2 });
    } else if (window.lenis) {
      try {
        window.lenis.scrollTo(targetY, { duration: 1.2 });
      } catch {}
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }

    keepAliveTimer.current = setTimeout(() => {
      launchingRef.current = false;
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }, 1250);
  }, []);

  const handleSend = useCallback(
    (action: SlingAction) => {
      if (action === "down") {
        handleScrollToBottom();
      } else {
        // "tap", "up" or any fallback strictly scrolls to top
        handleScrollToTop();
      }
    },
    [handleScrollToBottom, handleScrollToTop]
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-to-top-sling"
          initial={{ opacity: 0, scale: 0.72, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.72, y: 16 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="fixed right-5 bottom-5 sm:right-7 sm:bottom-7 z-40 touch-none select-none drop-shadow-[0_10px_22px_rgba(15,0,0,0.32)]"
          title="Click to scroll to top · Pull and sling to navigate"
        >
          <SlingButton
            onSend={handleSend}
            padColor="#dc2626"
            iconColor="#ffffff"
            accentColor="#ef4444"
            wellColor="#ffffff30"
            bandColor="#b91c1c"
            size={45}
            strokeWidth={3}
            armAt={28}
            maxPull={100}
            flight={100}
            axis="vertical"
            ariaLabel="Scroll navigation slingshot"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
