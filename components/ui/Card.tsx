import { cn } from "@/lib/utils";
import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  glow = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300",
        glow && "hover:border-accent/40 hover:bg-white/[0.07]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
