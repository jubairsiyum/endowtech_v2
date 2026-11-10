"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const HERO_EASE = [0.16, 1, 0.3, 1] as const;

export interface HeroGlassLogoProps {
  /** Optional container ref (e.g. sticky hero viewport) for subtle whole-hero parallax tracking */
  trackingContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function HeroGlassLogo({
  trackingContainerRef,
  className = "",
}: HeroGlassLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const [isHovered, setIsHovered] = useState(false);
  const [pulseId, setPulseId] = useState(0);

  // Raw motion values (updated directly without React re-renders)
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawShiftX = useMotionValue(0);
  const rawShiftY = useMotionValue(0);
  const rawGlowX = useMotionValue(50);
  const rawGlowY = useMotionValue(45);

  // Smooth spring physics for organic glass mass
  const rotateX = useSpring(rawRotateX, {
    stiffness: 130,
    damping: 18,
    mass: 0.75,
  });
  const rotateY = useSpring(rawRotateY, {
    stiffness: 130,
    damping: 18,
    mass: 0.75,
  });
  const shiftX = useSpring(rawShiftX, {
    stiffness: 110,
    damping: 20,
    mass: 0.8,
  });
  const shiftY = useSpring(rawShiftY, {
    stiffness: 110,
    damping: 20,
    mass: 0.8,
  });
  const glowX = useSpring(rawGlowX, { stiffness: 120, damping: 22 });
  const glowY = useSpring(rawGlowY, { stiffness: 120, damping: 22 });

  // Dynamic specular studio highlight following pointer orientation (closest-side prevents box-edge clipping at any viewport size)
  const specularGradient = useMotionTemplate`radial-gradient(closest-side at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 210, 210, 0.08) 42%, transparent 96%)`;

  // Ambient hero-wide parallax tracking (desktop fine pointers only)
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (
      typeof window === "undefined" ||
      !window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches
    ) {
      return;
    }

    const container = trackingContainerRef?.current;
    if (!container) return;

    let rect = container.getBoundingClientRect();
    const updateRect = () => {
      rect = container.getBoundingClientRect();
    };

    const handleHeroMove = (e: MouseEvent) => {
      if (isHoveredRef.current || rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, ny));

      rawRotateY.set(clampedX * 5.5);
      rawRotateX.set(-clampedY * 4.5);
      rawShiftX.set(clampedX * 8);
      rawShiftY.set(clampedY * 6);
      rawGlowX.set(50 + clampedX * 18);
      rawGlowY.set(45 + clampedY * 18);
    };

    const handleHeroLeave = () => {
      if (isHoveredRef.current) return;
      rawRotateX.set(0);
      rawRotateY.set(0);
      rawShiftX.set(0);
      rawShiftY.set(0);
      rawGlowX.set(50);
      rawGlowY.set(45);
    };

    container.addEventListener("mousemove", handleHeroMove, { passive: true });
    container.addEventListener("mouseleave", handleHeroLeave);
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleHeroMove);
      container.removeEventListener("mouseleave", handleHeroLeave);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [
    prefersReducedMotion,
    trackingContainerRef,
    rawGlowX,
    rawGlowY,
    rawRotateX,
    rawRotateY,
    rawShiftX,
    rawShiftY,
  ]);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType !== "mouse") return;
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType !== "mouse") return;
    const el = stageRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;

    const lx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ly = ((e.clientY - r.top) / r.height - 0.5) * 2;
    const clampedX = Math.max(-1, Math.min(1, lx));
    const clampedY = Math.max(-1, Math.min(1, ly));

    rawRotateY.set(clampedX * 12);
    rawRotateX.set(-clampedY * 10);
    rawShiftX.set(clampedX * 11);
    rawShiftY.set(clampedY * 9);
    rawGlowX.set(50 + clampedX * 18);
    rawGlowY.set(48 + clampedY * 18);
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawShiftX.set(0);
    rawShiftY.set(0);
    rawGlowX.set(50);
    rawGlowY.set(45);
  };

  const handlePointerDown = () => {
    if (prefersReducedMotion) return;
    setPulseId((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.88, y: 24, rotate: -4 }
      }
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.25 : 0.95,
        delay: prefersReducedMotion ? 0 : 0.22,
        ease: HERO_EASE,
      }}
      className={`relative w-full aspect-[1200/1084] flex items-center justify-center ${className}`}
      style={{ perspective: 1100 }}
    >
      {/* ── Layer 1: Dual-Tone Breathing Backlight Glow ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-12%] rounded-full pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 54% 56%, rgba(220, 38, 38, 0.38) 0%, rgba(185, 28, 28, 0.16) 44%, transparent 72%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: isHovered ? 1.09 : [0.94, 1.06, 0.94],
                opacity: isHovered ? 0.95 : [0.62, 0.92, 0.62],
              }
        }
        transition={
          isHovered
            ? { duration: 0.35, ease: "easeOut" }
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Crisp upper-left luminous highlight behind the translucent frosted white wing */}
      <div
        aria-hidden="true"
        className="absolute -top-[4%] -left-[4%] w-[74%] h-[74%] rounded-full pointer-events-none blur-2xl opacity-85"
        style={{
          background:
            "radial-gradient(circle at 46% 46%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.06) 46%, transparent 72%)",
        }}
      />

      {/* ── Layer 2: Expanding Crimson Shock-Ring on Click/Tap ── */}
      <AnimatePresence>
        {pulseId > 0 && !prefersReducedMotion && (
          <motion.div
            key={pulseId}
            aria-hidden="true"
            initial={{ scale: 0.5, opacity: 0.75 }}
            animate={{ scale: 1.38, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: HERO_EASE }}
            className="absolute inset-4 rounded-full border border-red-500/60 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ── Layer 3: Interactive 3D Magnetic Tilt & Levitation Stage ── */}
      <motion.div
        ref={stageRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.965 }}
        animate={
          prefersReducedMotion ? undefined : { scale: isHovered ? 1.035 : 1 }
        }
        transition={{
          scale: { type: "spring", stiffness: 250, damping: 20 },
        }}
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                x: shiftX,
                y: shiftY,
                transformStyle: "preserve-3d",
              }
        }
        className="relative z-10 w-full h-full cursor-pointer select-none will-change-transform"
      >
        {/* Continuous weightless levitation */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [-7, 7, -7],
                  rotateZ: [-1.1, 1.1, -1.1],
                }
          }
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center will-change-transform opacity-70"
        >
          <Image
            src="/images/logo-glass-1200.png"
            alt="Endow Tech 3D glass emblem"
            width={1200}
            height={1084}
            priority
            quality={95}
            draggable={false}
            sizes="(max-width: 640px) 270px, (max-width: 1024px) 360px, (max-width: 1280px) 320px, 440px"
            className="w-full h-full object-contain select-none pointer-events-none"
            style={{
              filter:
                "drop-shadow(0 24px 36px rgba(0, 0, 0, 0.72)) drop-shadow(0 0 28px rgba(220, 38, 38, 0.28)) brightness(1.12) contrast(1.06)",
            }}
          />

          {/* Soft pointer-tracked studio specular sheen (fades smoothly to transparent before edge) */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none rounded-full mix-blend-screen transition-opacity duration-300"
              style={{
                background: specularGradient,
                opacity: isHovered ? 0.85 : 0.25,
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HeroGlassLogo;
