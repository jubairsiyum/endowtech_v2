"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "glow" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, icon, ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-red-900/20 border border-accent",
      secondary:
        "bg-white/10 text-white hover:bg-white/15 border border-white/15 backdrop-blur-sm",
      outline:
        "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
      glow: "relative bg-accent text-white border border-accent hover:bg-accent-hover shadow-lg shadow-accent/30 hover:shadow-accent/50",
      ghost:
        "bg-transparent text-text-muted hover:text-white hover:bg-white/5 border border-transparent",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
