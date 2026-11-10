"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import AnimatedContent from "@/components/AnimatedContent";
import { Badge } from "@/components/ui/Badge";
import DotGridLight from "@/components/DotGridLight";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactSection({
  onOpenScheduler,
}: {
  onOpenScheduler?: () => void;
}) {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-white"
      aria-labelledby="contact-heading"
    >
      {/* Optimized pause-on-scroll background dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGridLight />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Direct Outreach & Offices */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={22}
            threshold={0.06}
            duration={0.65}
            ease="power2.out"
          >
            <Badge variant="code">{"// Initiate Collaboration"}</Badge>
            <h2
              id="contact-heading"
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight"
            >
              Let&apos;s build software <br />
              <span className="gradient-text">that powers your future.</span>
            </h2>

            <p className="mt-5 text-text-muted text-base leading-relaxed max-w-lg">
              Have a product roadmap, portal system, or SaaS platform in mind?
              Submit your brief and our executive and senior engineering leads
              will respond with a technical breakdown within 24 hours.
            </p>

            {/* Quick Contact Methods */}
            <div className="mt-8 flex flex-col gap-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group inline-flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-accent/40 transition-all max-w-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-text-muted">
                    Direct Email
                  </div>
                  <div className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                    {siteConfig.contact.email}
                  </div>
                </div>
              </a>

              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 hover:border-emerald-400 transition-all max-w-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-800">
                    WhatsApp Instant Connect
                  </div>
                  <div className="text-sm font-bold text-emerald-900">
                    {siteConfig.contact.whatsappDisplay}
                  </div>
                </div>
              </a>

              {onOpenScheduler && (
                <button
                  type="button"
                  onClick={onOpenScheduler}
                  className="group inline-flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-accent/40 transition-all text-left max-w-sm cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-text-muted">
                      Calendar Booking
                    </div>
                    <div className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                      Schedule a 30-Min Discovery Call
                    </div>
                  </div>
                </button>
              )}

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600 hover:text-accent transition-colors mt-2 w-fit"
              >
                <span>View full Contact Hub, leadership &amp; Seoul/Dhaka office hours</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </AnimatedContent>

          {/* Right Column: Reusable Contact Form */}
          <AnimatedContent
            direction="horizontal"
            distance={22}
            threshold={0.06}
            duration={0.65}
            delay={0.05}
            ease="power2.out"
          >
            <ContactForm
              idPrefix="home-contact"
              variant="bordered"
              showHeader
              showCompanyField
              showBudgetField
              submitLabel="Submit Project Inquiry"
            />
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
