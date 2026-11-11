import { cn } from "@/lib/utils";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "subtle" | "outline" | "accent" | "success" | "code";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "code",
  children,
  ...props
}) => {
  const variantStyles = {
    code: "inline-block px-3 py-1 bg-accent/[0.08] border border-accent/25 rounded-md text-accent font-semibold font-sans text-[11px] tracking-[0.14em] uppercase",
    subtle:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300",
    outline:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/15 text-white/70",
    accent:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-white shadow-sm shadow-accent/30",
    success:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400",
  };

  return (
    <span className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
};
