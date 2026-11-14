export interface SitemapLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  isExternal?: boolean;
}

export interface SitemapGroup {
  subheading: string;
  links: SitemapLink[];
}

export interface SitemapSection {
  id: string;
  title: string;
  description?: string;
  category: "services" | "projects" | "case-studies" | "architecture" | "company" | "resources";
  groups: SitemapGroup[];
}

export const sitemapCategories = [
  { id: "all", label: "All Sections" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Flagship Systems" },
  { id: "case-studies", label: "Case Studies" },
  { id: "architecture", label: "Architecture & Stack" },
  { id: "company", label: "Company & Offices" },
] as const;

export type SitemapCategoryId = (typeof sitemapCategories)[number]["id"];

export const sitemapSections: SitemapSection[] = [
  // ── 1. Services & Capabilities ──
  {
    id: "services-section",
    title: "Engineering Services",
    description: "Core digital engineering capabilities & specialized solutions",
    category: "services",
    groups: [
      {
        subheading: "Core Capabilities",
        links: [
          {
            label: "Enterprise Web Applications",
            href: "/services/web-engineering",
            description: "Next.js App Router, SSR, Edge Caching & Core Web Vitals",
            badge: "Next.js 15",
          },
          {
            label: "SaaS & Multi-Tenant Platforms",
            href: "/services/saas-platforms",
            description: "Multi-tenant DB isolation, Stripe billing & analytics",
            badge: "SaaS",
          },
          {
            label: "Student & Academic Portals",
            href: "/services/student-portals",
            description: "Applicant self-service & encrypted document vault",
            badge: "EdTech",
          },
          {
            label: "API & Systems Integration",
            href: "/services/api-integration",
            description: "High-throughput REST/GraphQL APIs & webhooks",
            badge: "APIs",
          },
          {
            label: "AI Workflows & Matching Engines",
            href: "/services/ai-automation",
            description: "Vector search RAG, document OCR & WhatsApp bots",
            badge: "AI/LLM",
          },
          {
            label: "Cloud DevOps & Site Reliability",
            href: "/services/cloud-devops",
            description: "Docker, AWS, zero-downtime CI/CD & 24/7 telemetry",
            badge: "AWS/DevOps",
          },
        ],
      },
      {
        subheading: "Architectural Deliverables",
        links: [
          {
            label: "Next.js App Router & Server Components",
            href: "/services/web-engineering",
            description: "Sub-second initial loads with streaming SSR",
          },
          {
            label: "RBAC & Multi-Tenant Isolation",
            href: "/services/saas-platforms",
            description: "Fine-grained permission matrices & row-level security",
          },
          {
            label: "Encrypted Document Upload Vault",
            href: "/services/student-portals",
            description: "Academic verification & counselor audit logging",
          },
          {
            label: "Vector Search & Retrieval-Augmented Gen",
            href: "/services/ai-automation",
            description: "Pinecone + OpenAI embeddings with sub-second lookups",
          },
        ],
      },
    ],
  },

  // ── 2. Flagship Systems ──
  {
    id: "flagship-systems-section",
    title: "Flagship Systems",
    description: "Production platforms architected & actively deployed by Endow Tech",
    category: "projects",
    groups: [
      {
        subheading: "Production Platforms",
        links: [
          {
            label: "Endow Connect",
            href: "/projects/endow-connect",
            description: "Education CRM & Student Journey Management Platform",
            badge: "Live · Seoul / Dhaka",
          },
          {
            label: "Endow Global Education",
            href: "/projects/endow-global",
            description: "Study Abroad Admissions & AI Course-Matching Monorepo",
            badge: "73 Routes · Next.js",
          },
          {
            label: "Endow Cuisine",
            href: "/projects/endow-cuisine",
            description: "Shift-based restaurant accounting & ACID ledger system",
            badge: "FoodTech",
          },
          {
            label: "Endow Cloud",
            href: "/projects/endow-cloud",
            description: "Local infrastructure on-premise file storage & sharing",
            badge: "Rust / FUSE",
          },
          {
            label: "Endow Desk",
            href: "/projects/endow-desk",
            description: "AI-powered customer support ticketing & live chat engine",
            badge: "AI Helpdesk",
          },
          {
            label: "ZendOS",
            href: "/projects/zendos",
            description: "Connected hospitality operating system & hotel PMS",
            badge: "Hospitality OS",
          },
        ],
      },
      {
        subheading: "Key Architecture Stacks",
        links: [
          {
            label: "Endow Connect: Laravel + Vue.js Core",
            href: "/projects/endow-connect",
            description: "Livewire, Sanctum token auth & Redis caching",
          },
          {
            label: "Endow Global: Next.js 14 + tRPC + Drizzle",
            href: "/projects/endow-global",
            description: "48 normalized tables & 25 RBAC permission modules",
          },
          {
            label: "Endow Cloud: Rust Virtual Filesystem",
            href: "/projects/endow-cloud",
            description: "Linux inotify kernel watchers & SQLite metadata",
          },
        ],
      },
    ],
  },

  // ── 3. Case Studies & Verification ──
  {
    id: "case-studies-section",
    title: "Case Studies & Proof",
    description: "Deep dive case studies carrying real-world operations & telemetry",
    category: "case-studies",
    groups: [
      {
        subheading: "Production Systems",
        links: [
          {
            label: "All Case Studies Index",
            href: "/case-studies",
            description: "Explore all 5 production engineering case studies",
            badge: "Index Hub",
          },
          {
            label: "Case Study: Endow Connect",
            href: "/projects/endow-connect",
            description: "100% unified student journey & 3x coordination speed",
          },
          {
            label: "Case Study: Endow Global Education",
            href: "/projects/endow-global",
            description: "4-portal architecture with zero orphaned inquiries",
          },
          {
            label: "Case Study: Endow Cuisine",
            href: "/projects/endow-cuisine",
            description: "85% reduction in end-of-day bookkeeping reconciliation",
          },
          {
            label: "Case Study: Endow Cloud",
            href: "/projects/endow-cloud",
            description: "10x LAN file transfer boost with zero cloud costs",
          },
          {
            label: "Case Study: Endow Desk",
            href: "/projects/endow-desk",
            description: "< 2 min response times with AI-assisted drafting",
          },
          {
            label: "Case Study: ZendOS",
            href: "/projects/zendos",
            description: "45% check-in & shift acceleration across hotel floors",
          },
        ],
      },
      {
        subheading: "Domain Solutions",
        links: [
          {
            label: "EdTech & University Portals",
            href: "/case-studies",
            description: "Admissions CRM, document vaults & counselor hubs",
          },
          {
            label: "ERP & Shift Accounting",
            href: "/case-studies",
            description: "Transaction-isolated ledgers & drawer reconciliation",
          },
          {
            label: "On-Premises Data Sovereignty",
            href: "/case-studies",
            description: "Local storage immune to ISP outages & cloud fees",
          },
        ],
      },
    ],
  },

  // ── 4. Technology Stack & Frameworks ──
  {
    id: "tech-stack-section",
    title: "Technology Stack",
    description: "Battle-tested enterprise frameworks, runtimes, and databases",
    category: "architecture",
    groups: [
      {
        subheading: "Frontend Engineering",
        links: [
          {
            label: "Next.js 14 / 15 (App Router)",
            href: "/#tech-stack",
            description: "Server Components, dynamic streaming & edge runtime",
          },
          {
            label: "React 19 & TypeScript",
            href: "/#tech-stack",
            description: "Strict static typing, concurrent hooks & optimal DOM",
          },
          {
            label: "Tailwind CSS & Framer Motion",
            href: "/#tech-stack",
            description: "Design systems, fluid responsiveness & GPU animation",
          },
        ],
      },
      {
        subheading: "Backend, Core & Systems",
        links: [
          {
            label: "Laravel 11 & Livewire",
            href: "/#tech-stack",
            description: "Robust MVC architecture, queue workers & scheduling",
          },
          {
            label: "Node.js & tRPC v11",
            href: "/#tech-stack",
            description: "End-to-end type-safe client-server contract",
          },
          {
            label: "Rust & Systems Programming",
            href: "/#tech-stack",
            description: "Memory safety, FUSE filesystem drivers & fast daemons",
          },
        ],
      },
      {
        subheading: "Databases, AI & Infrastructure",
        links: [
          {
            label: "PostgreSQL, MySQL & Drizzle ORM",
            href: "/#tech-stack",
            description: "ACID compliance, schema migrations & connection pooling",
          },
          {
            label: "Redis & Upstash Key-Value",
            href: "/#tech-stack",
            description: "Microsecond caching, rate-limiting & session locks",
          },
          {
            label: "OpenAI GPT-4o & Pinecone Vector DB",
            href: "/#tech-stack",
            description: "RAG retrieval pipelines & high-dimensional embeddings",
          },
          {
            label: "Docker, AWS & CI/CD Pipelines",
            href: "/#tech-stack",
            description: "Container orchestration & zero-downtime blue/green builds",
          },
        ],
      },
    ],
  },

  // ── 5. Studio Process & Architecture ──
  {
    id: "process-section",
    title: "Engineering Lifecycle",
    description: "Methodologies, enterprise guarantees, and system governance",
    category: "architecture",
    groups: [
      {
        subheading: "4-Stage Delivery Framework",
        links: [
          {
            label: "Stage 01: Systems Discovery & Specs",
            href: "/#process",
            description: "Requirements decomposition, schema modeling & SLAs",
          },
          {
            label: "Stage 02: Architectural Blueprint",
            href: "/#process",
            description: "Component hierarchy, database ERD & security gates",
          },
          {
            label: "Stage 03: High-Velocity Sprint Engineering",
            href: "/#process",
            description: "Milestone-driven code commits with end-to-end tests",
          },
          {
            label: "Stage 04: Hardening, Telemetry & Launch",
            href: "/#process",
            description: "Load testing, penetration auditing & production rollout",
          },
        ],
      },
      {
        subheading: "Enterprise Benchmarks",
        links: [
          {
            label: "Endow Tech vs Generic Studios",
            href: "/#comparison",
            description: "Sub-second benchmarks, full IP ownership & dedicated leads",
          },
          {
            label: "Trust Ecosystem & Heritage",
            href: "/#trust",
            description: "Backing of Endow Corporation & cross-border presence",
          },
          {
            label: "Verified Client Reviews",
            href: "/#testimonials",
            description: "Executive testimonials from Seoul, Dhaka, and Singapore",
          },
          {
            label: "Engineering FAQ",
            href: "/#faq",
            description: "Direct answers on code ownership, pricing, and timelines",
          },
        ],
      },
    ],
  },

  // ── 6. Company, Offices & Global Presence ──
  {
    id: "company-section",
    title: "Company & Global Hubs",
    description: "Corporate footprint, dual-hub operations, and direct contact channels",
    category: "company",
    groups: [
      {
        subheading: "Corporate Entity",
        links: [
          {
            label: "About Endow Tech",
            href: "/",
            description: "Digital engineering wing of Endow Corporation",
          },
          {
            label: "Endow Corporation Parent HQ",
            href: "https://endowglobaledu.com",
            description: "Seoul, South Korea multinational educational group",
            isExternal: true,
          },
          {
            label: "Executive Leadership & Tech Leads",
            href: "/contact",
            description: "MD & Senior Engineering Squad across Seoul and Dhaka",
          },
        ],
      },
      {
        subheading: "Global Office Hubs",
        links: [
          {
            label: "Seoul Corporate Headquarters",
            href: "/contact",
            description: "Gangnam-daero, Seocho-gu, Seoul, Republic of Korea",
            badge: "Seoul HQ",
          },
          {
            label: "Dhaka Regional Tech Hub",
            href: "/contact",
            description: "Level 8, Shyamoli Square, Mirpur Road, Dhaka-1207",
            badge: "Dhaka Hub",
          },
          {
            label: "Dual-Timezone Engineering Schedule",
            href: "/contact",
            description: "Live real-time operational coverage: KST (UTC+9) & BST (UTC+6)",
          },
        ],
      },
      {
        subheading: "Inquiries & Consultation",
        links: [
          {
            label: "Schedule Consultation Call",
            href: "#schedule",
            description: "Direct video session with Principal Engineering squad",
            badge: "Calendar",
          },
          {
            label: "Start a Project Brief",
            href: "/contact",
            description: "Submit project specifications & requirements document",
          },
          {
            label: "Direct Inquiries Email",
            href: "mailto:hello@endowtech.net",
            description: "hello@endowtech.net for RFPs and partnerships",
          },
          {
            label: "Official WhatsApp Support Desk",
            href: "https://wa.me/8801901463209",
            description: "+880 1901-463209 for fast-track engineering chat",
            isExternal: true,
          },
        ],
      },
    ],
  },

  // ── 7. Useful Links & Developer Protocols ──
  {
    id: "resources-section",
    title: "Useful Links & Protocols",
    description: "Search crawler directives, public repositories, and official social handles",
    category: "resources",
    groups: [
      {
        subheading: "Crawler & Search Protocols",
        links: [
          {
            label: "XML Sitemap Feed (sitemap.xml)",
            href: "/sitemap.xml",
            description: "Machine-readable XML urlset for Googlebot, Bingbot & AI scrapers",
            badge: "XML",
            isExternal: true,
          },
          {
            label: "Robots Directive (robots.txt)",
            href: "/robots.txt",
            description: "Standard crawler permissions and endpoint allowances",
            badge: "TXT",
            isExternal: true,
          },
          {
            label: "HTML Sitemap (This Page)",
            href: "/sitemap",
            description: "Human-navigable directory of all public routes and platforms",
            badge: "Active",
          },
        ],
      },
      {
        subheading: "Connect With Us",
        links: [
          {
            label: "GitHub Organization",
            href: "https://github.com/endowtech",
            description: "Public repositories, open-source tools & code architectures",
            isExternal: true,
          },
          {
            label: "LinkedIn Company Page",
            href: "https://linkedin.com/company/endowtech",
            description: "Official corporate news, hiring announcements & insights",
            isExternal: true,
          },
          {
            label: "X (Twitter) Official",
            href: "https://x.com/endowtech",
            description: "@endowtech engineering threads & product dispatches",
            isExternal: true,
          },
          {
            label: "Official Phone (Dhaka Hub)",
            href: "tel:+8801901463209",
            description: "+880 1901-463209",
            isExternal: true,
          },
        ],
      },
    ],
  },
];
