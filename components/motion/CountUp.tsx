"use client";

import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export interface CountUpProps {
  value: string | number;
  duration?: number; // duration in seconds
  delay?: number; // delay in seconds before counting begins
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function CountUp({
  value,
  duration = 2,
  delay = 0,
  className = "",
  prefix: customPrefix,
  suffix: customSuffix,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const rawString = String(value);

  // Parse raw value to extract prefix, number, decimals, commas, and suffix
  const { prefix, target, suffix, decimals, hasCommas } = useMemo(() => {
    if (typeof value === "number") {
      return {
        prefix: customPrefix || "",
        target: value,
        suffix: customSuffix || "",
        decimals: Number.isInteger(value) ? 0 : 2,
        hasCommas: false,
      };
    }

    // Match prefix (like '< ' or '$'), numeric part with optional commas and decimals, and suffix (like '+', '%', '-Week')
    const match = rawString.match(/^([^\d.]*?)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) {
      return {
        prefix: customPrefix || "",
        target: 0,
        suffix: customSuffix || rawString,
        decimals: 0,
        hasCommas: false,
      };
    }

    const p = customPrefix !== undefined ? customPrefix : match[1];
    const numStr = match[2];
    const s = customSuffix !== undefined ? customSuffix : match[3];
    const commas = numStr.includes(",");
    const cleanNum = parseFloat(numStr.replace(/,/g, ""));
    const decimalParts = numStr.split(".");
    const dec = decimalParts.length > 1 ? decimalParts[1].length : 0;

    return {
      prefix: p,
      target: isNaN(cleanNum) ? 0 : cleanNum,
      suffix: s,
      decimals: dec,
      hasCommas: commas,
    };
  }, [value, customPrefix, customSuffix, rawString]);

  // Initial placeholder before viewport entrance
  const initialPlaceholder = useMemo(() => {
    const zeroStr = decimals > 0 ? `0.${"0".repeat(decimals)}` : "0";
    return `${prefix}${zeroStr}${suffix}`;
  }, [prefix, decimals, suffix]);

  const [displayValue, setDisplayValue] = useState<string>(initialPlaceholder);

  useEffect(() => {
    if (!isInView) return;

    // Check for prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    ) {
      const formatted = hasCommas
        ? target.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : target.toFixed(decimals);
      setDisplayValue(`${prefix}${formatted}${suffix}`);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    // Smooth easeOutExpo for natural count-up deceleration
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * target;

      const formattedNum = hasCommas
        ? Math.round(current).toLocaleString("en-US")
        : current.toFixed(decimals);

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Pin to exact target format on completion
        const finalFormatted = hasCommas
          ? target.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : target.toFixed(decimals);
        setDisplayValue(`${prefix}${finalFormatted}${suffix}`);
      }
    };

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(step);
      }, delay * 1000);
    } else {
      animationFrameId = requestAnimationFrame(step);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration, delay, decimals, hasCommas, prefix, suffix]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {isInView ? displayValue : initialPlaceholder}
    </span>
  );
}

export default CountUp;
