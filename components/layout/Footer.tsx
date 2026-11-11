import { siteConfig } from "@/data/siteConfig";
import Image from "next/image";
import Link from "next/link";

const PLATFORM_LINKS = [
  { label: "Endow Student Portal (AMS)", href: "/#work" },
  { label: "UniMatch AI Recommendation", href: "/#work" },
  { label: "LeadFlow CRM & Workflow", href: "/#work" },
  { label: "Tuition Settlement Engine", href: "/#work" },
];

const CAPABILITY_LINKS = [
  { label: "Next.js Web Applications", href: "/#services" },
  { label: "SaaS Multi-Tenant Engines", href: "/#services" },
  { label: "API & System Integration", href: "/#services" },
  { label: "Security & Audit Profiling", href: "/#process" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-theme-footer border-t border-white/10 text-gray-400 overflow-hidden"
      aria-label="Site footer"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 pt-14 pb-24 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr] gap-5 xl:gap-6 items-stretch">
          {/* Brand Column (Unboxed, Left Anchor) */}
          <div className="flex flex-col justify-between py-1 lg:pr-2 xl:pr-4">
            <div>
              <Link
                href="/"
                className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Endow Tech home"
              >
                <div className="relative h-9 w-[205px] overflow-hidden">
                  <Image
                    src="/images/logo_dark.svg"
                    alt="Endow Tech"
                    width={230}
                    height={116}
                    className="max-w-none w-[230px] h-[116px] -ml-[14px] -mt-[41px]"
                  />
                </div>
              </Link>

              <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-[300px]">
                The technology and product engineering wing of{" "}
                <strong className="font-semibold text-gray-200">
                  Endow Corporation
                </strong>
                . Architecting student admission portals, AI matching platforms,
                and enterprise web solutions.
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.07] flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/[0.12] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="GitHub profile"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.07] flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/[0.12] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="LinkedIn page"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.07] flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/[0.12] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="X (Twitter) account"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Card 1: Flagship Platforms */}
          <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-7 lg:p-6 xl:p-7 flex flex-col transition-colors duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]">
            <h3 className="text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.14em] text-white mb-5">
              Flagship Platforms
            </h3>
            <nav aria-label="Flagship platforms">
              <ul className="space-y-3.5 text-sm">
                {PLATFORM_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 mt-[3px] transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Card 2: Capabilities */}
          <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-7 lg:p-6 xl:p-7 flex flex-col transition-colors duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]">
            <h3 className="text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.14em] text-white mb-5">
              Capabilities
            </h3>
            <nav aria-label="Capabilities">
              <ul className="space-y-3.5 text-sm">
                {CAPABILITY_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 mt-[3px] transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Card 3: Global Offices */}
          <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-7 lg:p-6 xl:p-7 flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]">
            <div>
              <h3 className="text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.14em] text-white mb-5">
                Global Offices
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm xl:text-[15px] font-medium text-gray-200">
                    Seoul, South Korea
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    Gangnam-daero, Seocho-gu
                  </div>
                </div>
                <div>
                  <div className="text-sm xl:text-[15px] font-medium text-gray-200">
                    Dhaka, Bangladesh
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    Level 8, Shyamoli Square, Mirpur Rd
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-white/[0.07] flex items-center justify-between gap-3 flex-wrap">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-xs sm:text-[13px] font-sans font-medium text-accent hover:text-red-400 hover:underline transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <Link
                href="/contact"
                className="text-xs font-sans font-semibold uppercase tracking-[0.12em] text-gray-300 hover:text-white transition-colors"
              >
                Contact Page →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width South Korea Cover Banner with Red Gradient & ENDOWTECH Cutout */}
        <div className="group relative mt-6 sm:mt-8 lg:mt-10 w-full aspect-[16/6] sm:aspect-[21/6] rounded-3xl overflow-hidden border border-white/[0.08] select-none">
          {/* Clear South Korea Background Photograph */}
          <Image
            src="/images/south-korea-cover2.jpg"
            alt="Seoul, South Korea skyline"
            fill
            sizes="(max-width: 1400px) 100vw, 1304px"
            className="object-cover object-[center_58%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Red Gradient Overlay with ENDOWTECH Cutout Mask */}
          <svg
            viewBox="0 0 1400 400"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="endowtech-footer-red-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#000000" stopOpacity="0.80" />
                <stop offset="48%" stopColor="#000000" stopOpacity="0.60" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
              </linearGradient>
              <mask id="endowtech-footer-text-mask">
                <rect x="0" y="0" width="1400" height="400" fill="white" />
                <text
                  x="700"
                  y="380"
                  textAnchor="middle"
                  fill="black"
                  fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="215"
                  letterSpacing="-7"
                >
                  ENDOWTECH
                </text>
              </mask>
            </defs>

            <rect
              x="0"
              y="0"
              width="1400"
              height="400"
              fill="url(#endowtech-footer-red-grad)"
              mask="url(#endowtech-footer-text-mask)"
            />
          </svg>

          <span className="sr-only">ENDOWTECH</span>
        </div>

        {/*  Copyright */}
        <div className=" mt-8 pt-6 border-t border-white/10 text-xs text-gray-500 text-center sm:text-left">
          &copy; {currentYear} Endow Tech. All rights reserved. A subsidiary of
          Endow Corporation.
        </div>
      </div>
    </footer>
  );
}
