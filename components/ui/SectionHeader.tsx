import { cn } from "@/lib/utils";
import React from "react";

export function SectionMeta({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "block font-semibold text-sm md:text-base uppercase tracking-[0.15em] text-accent mb-2",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  as: Component = "h2",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}) {
  return (
    <Component
      className={cn(
        "text-[clamp(30px,2.5vw,48px)] font-bold leading-[1.14] tracking-[-0.035em] text-[#0f0000]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function SectionDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mt-2 text-[clamp(13px,0.95vw,15px)] leading-relaxed text-neutral-700",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
