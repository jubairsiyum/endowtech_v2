# Endow Tech Architecture & System Design Documentation

**Project:** Endow Tech v2 (`endowtech_v2`)  
**Parent Ecosystem:** [Endow Corporation](https://endowcorp.com) (Seoul, South Korea HQ) & [Endow Global Education](https://endowglobaledu.com/)  
**Technology Wing:** Digital Products, Admissions Management Systems (AMS), AI Matchers, Enterprise SaaS  
**Primary Stack:** Next.js 16 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lenis  

---

## 1. System Overview & Mission

Endow Tech is the product engineering and enterprise software division of **Endow Corporation** (Seoul Corporate Headquarters, Gangnam-daero) with an operational engineering hub located in Shyamoli Square, Dhaka, Bangladesh.

The studio is responsible for architecting and operating the mission-critical international admissions platforms, visa tracking portals, and AI university program matchers for **Endow Global Education** (specializing in higher education pathways to South Korea and Finland), as well as building high-performance digital products for external global clients.

---

## 2. Architectural Blueprint & Directory Hierarchy

The application adopts a **Layered Architecture** featuring decoupled domain data, atomic UI components, thin client motion islands, and React Server Components (RSC) by default.

```
endowtech_v2/
├── app/                                # Next.js 16 App Router (RSC Roots)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts               # Validated contact & lead generation endpoint
│   ├── globals.css                    # Design tokens, @import Google Fonts, keyframes
│   ├── layout.tsx                     # Root Layout (SEO metadata, Viewport, Lenis scroll)
│   ├── page.tsx                       # Production Landing Page composition
│   ├── loading.tsx                    # Route fallback skeleton
│   ├── not-found.tsx                  # Custom 404 error handler
│   ├── icon.svg                       # Self-hosted SVG favicon (Endow emblem)
│   └── opengraph-image.tsx            # Dynamic Edge OpenGraph card (1200x630)
│
├── components/                        # Component Library
│   ├── layout/                        # Global persistent chrome
│   │   ├── Navbar.tsx                 # Zero layout-thrashing theme-aware navigation
│   │   ├── Footer.tsx                 # Enterprise mega-footer with Seoul & Dhaka hubs
│   │   └── WhatsAppButton.tsx         # Floating direct lead conversion CTA
│   │
│   ├── motion/                        # Thin Client Motion Islands
│   │   └── FadeIn.tsx                 # Scroll-triggered viewport reveals
│   │
│   ├── sections/                      # Feature Page Sections
│   │   ├── HeroSection.tsx            # Value proposition, live metrics, direct-DOM glow
│   │   ├── TrustEcosystem.tsx         # Endow Corp & Global Education affiliation
│   │   ├── FlagshipProducts.tsx       # Global Student Portal, UniMatch AI, LeadFlow CRM
│   │   ├── ServicesSection.tsx        # 6 core digital engineering capabilities
│   │   ├── ProcessSection.tsx         # 4-stage engineering lifecycle
│   │   ├── TechStackSection.tsx       # Filterable tech grid with clean icon+name cards
│   │   ├── CaseStudiesSection.tsx     # Quantifiable business impact studies
│   │   ├── ComparisonSection.tsx      # Endow Tech vs. traditional agency matrix
│   │   ├── GlobalPresence.tsx         # Seoul HQ & Dhaka Operations Hub
│   │   ├── TestimonialsSection.tsx    # Partner & stakeholder endorsements
│   │   ├── FAQSection.tsx             # Interactive accordion
│   │   └── ContactSection.tsx         # Validated inquiry form & scheduler modal
│   │
│   ├── ui/                            # Atomic Design System (Primitives)
│   │   ├── Accordion.tsx              # Animated expand/collapse for FAQ
│   │   ├── Badge.tsx                  # Pill tags & status chips
│   │   ├── Button.tsx                 # Accessible button variants (primary, glow, etc.)
│   │   └── Card.tsx                   # Glassmorphic border-gradient containers
│   │
│   ├── DotGrid.tsx                    # Hero background (culling + idle optimization)
│   ├── DotGridLight.tsx               # Contact background (culling + idle optimization)
│   └── SmoothScroll.tsx               # Lenis smooth-scrolling wrapper
│
├── data/                              # Single Source of Truth (Pure Data Layer)
│   ├── caseStudies.ts                 # Metrics, tags, and architectural summaries
│   ├── comparison.ts                  # Capability comparison matrix
│   ├── faq.ts                         # Client FAQ items
│   ├── process.ts                     # Engineering workflow milestones
│   ├── products.ts                    # Flagship platforms (AMS, UniMatch, LeadFlow)
│   ├── services.ts                    # Scoped service capabilities
│   ├── siteConfig.ts                  # Global metadata, offices, socials, navigation
│   ├── techStack.ts                   # Categorized technologies & icon definitions
│   └── testimonials.ts                # Client & partner quotes
│
├── lib/                               # Business Logic & Infrastructure
│   ├── utils.ts                       # ClassName helper (clsx + twMerge)
│   └── validations.ts                 # Sanitization & validation for contact leads
│
├── types/                             # Centralized Domain Models
│   └── index.ts                       # Shared interfaces
│
└── public/                            # Static Assets
    └── images/                        # Optimized logos (3.8 KB each, 99% reduction)
        ├── logo.png
        ├── logo_dark.svg
        └── logo_light.svg
```

---

## 3. Performance Engineering & Critical Fixes

### 3.1 Canvas Loop Optimization (`DotGrid.tsx` & `DotGridLight.tsx`)
- **Off-Screen Culling:** Wrapped in `IntersectionObserver` to halt `requestAnimationFrame` entirely when the section is not scrolled into the viewport.
- **Save/Restore Elimination:** Removed `ctx.save()` and `ctx.restore()` from inside inner dot iteration loops (previously causing ~450,000 state mutations per second). Uses single-state batched `beginPath()`.
- **Idle Sleeping:** When cursor physics reach rest velocity, the canvas enters a sleep state and ceases redrawing until the next mouse or touch event.

### 3.2 Elimination of Scroll Layout Thrashing (`Navbar.tsx`)
- Previously executed `document.elementFromPoint()` and `getComputedStyle()` on every scroll event, forcing repeated synchronous reflows.
- Replaced with an `IntersectionObserver` observing section markers to trigger light/dark theme shifts with zero layout recalculation overhead.

### 3.3 Direct-DOM Cursor Glow (`HeroSection.tsx`)
- Replaced React state updates (`useState(mousePos)`) on every mouse movement with direct CSS custom property updates (`--mouse-x`, `--mouse-y`) and direct DOM element translation. This prevents continuous re-renders of the Hero JSX tree.

### 3.4 Vector Asset Sanitization
- Stripped ~420 KB of uncompressed Adobe Illustrator private binary PGF data (`#adobe_illustrator_pgf`) from `public/images/logo_dark.svg` and `public/images/logo_light.svg`.
- File size dropped from **424 KB to 3.8 KB** (a **99% reduction**), eliminating LCP render delays.

### 3.5 Robust Build Pipeline
- Next.js Webpack bundler (`next build --webpack`) configured in `package.json` to avoid Windows sandbox IPC socket timeouts associated with Turbopack child processes.
- Font loading via `@import` in `globals.css` avoids offline/sandboxed build failures when Google Fonts cannot be queried at compile-time.

---

## 4. Domain Data Layer Guidelines

All website copy, product specifications, metrics, offices, and FAQs are strictly decoupled into `@/data/*`.

**When modifying content:**
- **DO NOT** hardcode content inside `components/sections/*.tsx`.
- **DO** update or extend the appropriate file in `data/`.
- Ensure new data matches the domain schemas declared in [`types/index.ts`](file:///d:/Rakib/Projects/endowtech_v2/types/index.ts).

---

## 5. Build, Lint & Quality Verification Commands

| Task | Command | Standard |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts Next.js development server on port 3000 |
| **Type Check** | `npm run typecheck` | Strict `tsc --noEmit` check (ES2022) |
| **Linting** | `npm run lint` | Standard ESLint (`eslint . --ext .ts,.tsx`) with zero warnings |
| **Production Build** | `npm run build` | Compiles static pages and dynamic route handlers |


---

## 6. Strategic Positioning & Competitor Benchmark (Nagorik Tech Analysis)

### 6.1 Benchmark Insights from Nagorik Technologies (`nagorik.tech`)
Nagorik is positioned as an "AI-native enterprise software engineering" firm headquartered in Dubai with a massive delivery center in Dhaka (200+ engineers). Key strengths identified from their architecture:
1. **Product Owner DNA:** They emphasize that they build and operate their own internal consumer/enterprise tech platforms, eliminating the fear that they are merely an outsourced agency that leaves unmaintainable code.
2. **Explicit Engagement Models:** They offer dedicated squads, fixed-scope turnkey delivery, and legacy modernization, removing procurement ambiguity for enterprise buyers.
3. **Core Operating Principles:** A clear 4-pillar engineering manifesto (Reliability, Ownership, Scale, People).

### 6.2 Endow Tech Moat: The South Korea $\times$ Global Reach
Endow Tech holds a distinctive competitive moat centered on **South Korea**:
- **Seoul Corporate Headquarters (Gangnam-daero):** Legal accountability, Korean executive alignment, direct access to Korean universities and corporate partnerships.
- **KST $\leftrightarrow$ BST Timezone Advantage:** Korea Standard Time (UTC+9) is only 3 hours ahead of Dhaka (UTC+6). This enables true same-day agile iteration, live KakaoTalk/Slack sync, and zero offshore timezone lag compared to US/European outsourcing.
- **Real Academic & EdTech Product Ownership:** Unlike theoretical portfolios, Endow Tech engineered and maintains the live mission-critical platforms powering **Endow Global Education** (specializing in university admissions and visa logistics for South Korea and Finland).
- **Tri-Market Delivery:**
  1. *Korean Projects:* Enterprise web apps, Seoul startup MVPs, Korean university admissions portals, PIPA data compliance.
  2. *International Projects:* Global student portals, overseas academic workflows, international B2B SaaS.
  3. *Regional/Local Projects:* High-growth scalable web systems, admissions infrastructure.
