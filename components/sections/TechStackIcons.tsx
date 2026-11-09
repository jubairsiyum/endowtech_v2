"use client";

import { cn } from "@/lib/utils";
import React, { useId, useState } from "react";

interface TechIconProps {
  name: string;
  icon?: string;
  tintRed?: boolean;
  wideIcon?: boolean;
  className?: string;
}

export function TechIcon({
  name,
  icon,
  tintRed = false,
  wideIcon = false,
  className = "w-8 h-8 sm:w-9 sm:h-9",
}: TechIconProps) {
  const [imageError, setImageError] = useState(false);
  const uid = useId().replace(/:/g, "");
  const filterId = `tech-red-tint-${uid}`;

  if (!icon || imageError) {
    return (
      <div
        aria-hidden="true"
        className="w-9 h-9 rounded-lg bg-accent/10 text-accent font-bold text-base flex items-center justify-center font-mono"
      >
        {name.charAt(0)}
      </div>
    );
  }

  // Official non-SimpleIcons SVGs (e.g. LobeHub, Devicon, theSVG) are tinted to #dc2626 via SVG filter (same pattern as TextLoop)
  if (tintRed) {
    const vbWidth = wideIcon ? 48 : 36;
    const vbHeight = wideIcon ? 32 : 36;
    return (
      <svg
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className={cn(
          className,
          wideIcon && "w-11 h-8 sm:w-12 sm:h-8",
          "overflow-visible",
        )}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodColor="#dc2626" floodOpacity="1" result="flood" />
            <feComposite in="flood" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
        <image
          href={icon}
          xlinkHref={icon}
          x="0"
          y="0"
          width={vbWidth}
          height={vbHeight}
          preserveAspectRatio="xMidYMid meet"
          filter={`url(#${filterId})`}
          onError={() => setImageError(true)}
        />
      </svg>
    );
  }

  // Official Simple Icons URLs already return native #dc2626 SVG artwork
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt=""
      width={wideIcon ? 48 : 36}
      height={wideIcon ? 32 : 36}
      loading="lazy"
      decoding="async"
      onError={() => setImageError(true)}
      className={cn(
        "object-contain",
        className,
        wideIcon && "w-11 h-8 sm:w-12 sm:h-8",
      )}
    />
  );
}
