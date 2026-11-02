"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border transition-colors duration-200 overflow-hidden",
              isOpen
                ? "bg-white/[0.06] border-white/20"
                : "bg-white/[0.03] border-white/10 hover:border-white/15",
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="text-base sm:text-lg font-semibold text-white pr-4">
                {item.title}
              </span>
              <span
                className={cn(
                  "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-transform duration-200",
                  isOpen
                    ? "border-accent/40 bg-accent/10 text-accent rotate-180"
                    : "border-white/10 bg-white/5 text-gray-400 rotate-0",
                )}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
