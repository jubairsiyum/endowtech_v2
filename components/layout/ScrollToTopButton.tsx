"use client";

import SlingButton from "@/components/SlingButton";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const keepAliveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const launchingRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      if (launchingRef.current) return;
      const threshold = Math.min(480, window.innerHeight * 0.65);
      setVisible(window.scrollY > threshold);
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

    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    keepAliveTimer.current = setTimeout(() => {
      launchingRef.current = false;
      const threshold = Math.min(480, window.innerHeight * 0.65);
      setVisible(window.scrollY > threshold);
    }, 450);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-to-top-sling"
          initial={{ opacity: 0, scale: 0.72, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.72, y: 16 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="fixed right-5 bottom-5 sm:right-7 sm:bottom-7 z-40 drop-shadow-[0_10px_22px_rgba(15,0,0,0.32)]"
        >
          <SlingButton
            onSend={handleScrollToTop}
            padColor="#dc2626"
            iconColor="#ffffff"
            accentColor="#ef4444"
            wellColor="#ffffff30"
            bandColor="#b91c1c"
            size={45}
            strokeWidth={3}
            armAt={34}
            maxPull={110}
            flight={100}
            ariaLabel="Scroll to top"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
