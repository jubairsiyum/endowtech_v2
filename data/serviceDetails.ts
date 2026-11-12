import { featuredProjects, type FeaturedProject } from "@/data/featuredProjects";
import { industriesData } from "@/data/industries";
import { coreServices } from "@/data/services";
import { infrastructureStack, techPillars } from "@/data/techStack";
import type { IndustryItem, Service, TechItem } from "@/types";

export interface ServiceStat {
  value: string;
  label: string;
  sublabel: string;
}

export interface ServiceOutcomePillar {
  title: string;
  description: string;
  iconKey:
    | "zap"
    | "shield"
    | "layers"
    | "globe"
    | "database"
    | "cpu"
    | "lock"
    | "gauge"
    | "code";
}

export interface ServiceCapabilityModule {
  number: string;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
}

export interface ServiceExecutionStage {
  step: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServiceEngineeringStandard {
  label: string;
  value: string;
  detail: string;
  iconKey: "code" | "shield" | "clock" | "check";
}

export interface ServiceFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceDetailData {
  id: string;
  indexNumber: string;
  eyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroSummary: string;
  metrics: ServiceStat[];
  overviewEyebrow: string;
  overviewHeading: string;
  overviewSummary: string;
  outcomes: ServiceOutcomePillar[];
  capabilitiesEyebrow: string;
  capabilitiesHeading: string;
  capabilitiesSummary: string;
  capabilities: ServiceCapabilityModule[];
  executionHeading: string;
  executionSummary: string;
  executionStages: ServiceExecutionStage[];
  techIds: string[];
  architectureNote: string;
  standards: ServiceEngineeringStandard[];
  relatedProjectIds: string[];
  relatedIndustryIds: string[];
  testimonialIndex: number;
  faqs: ServiceFaqItem[];
}

export const serviceDetailsMap: Record<string, ServiceDetailData> = {
  "web-engineering": {
    id: "web-engineering",
    indexNumber: "01",
    eyebrow: "Service 01 · Web Engineering",
    heroTitle: "Enterprise Web Applications",
    heroHighlight: "built for speed & scale.",
    heroSummary:
      "We engineer full-stack web platforms using Next.js App Router, React, and strict TypeScript — delivering sub-second page transitions, accessible interfaces, and production-grade reliability.",
    metrics: [
      {
        value: "95+",
        label: "Core Web Vitals",
        sublabel: "Audit-certified performance",
      },
      {
        value: "99.98%",
        label: "Production Uptime",
        sublabel: "Enterprise SLA standard",
      },
      {
        value: "2 Weeks",
        label: "Sprint Cadence",
        sublabel: "Live staging builds",
      },
      {
        value: "100%",
        label: "Client IP Ownership",
        sublabel: "Private Git repository",
      },
    ],
    overviewEyebrow: "Operational Scope",
    overviewHeading: "Clean React & Next.js architecture without template bloat.",
    overviewSummary:
      "Rather than assembling brittle marketing templates or bloated CMS plugins, our Seoul and Dhaka engineering teams architect custom web applications around your exact operational workflows, search visibility goals, and security boundaries.",
    outcomes: [
      {
        title: "Sub-Second App Router Performance",
        description:
          "React Server Components, streaming SSR, and edge caching keep Time to First Byte minimal across global regions.",
        iconKey: "zap",
      },
      {
        title: "Strict End-to-End Type Safety",
        description:
          "Shared TypeScript contracts from database schema to UI components catch regressions before code ships.",
        iconKey: "layers",
      },
      {
        title: "Technical SEO & Structured Data",
        description:
          "Semantic HTML, automated canonical metadata, dynamic sitemaps, and JSON-LD schema engineered into every route.",
        iconKey: "globe",
      },
      {
        title: "Accessible, Tokenized UI Systems",
        description:
          "WCAG-conscious responsive interfaces built with Tailwind CSS design tokens and keyboard-navigable interactions.",
        iconKey: "shield",
      },
    ],
    capabilitiesEyebrow: "Deliverables & Capabilities",
    capabilitiesHeading: "Everything engineered from blueprint to production.",
    capabilitiesSummary:
      "Each web application engagement covers system architecture, responsive design systems, backend data contracts, and hardened cloud deployment.",
    capabilities: [
      {
        number: "01",
        title: "Next.js App Router & RSC Architecture",
        tag: "Core Frontend",
        description:
          "Structured server-first layouts, route-level streaming, and optimistic UI flows built to handle complex business state cleanly.",
        highlights: [
          "Server & Client Component boundary design",
          "Edge & CDN cache invalidation strategies",
          "Zero-layout-shift font & media loading",
        ],
      },
      {
        number: "02",
        title: "Design Systems & Component Libraries",
        tag: "UI / UX Engineering",
        description:
          "Reusable, brand-aligned React component libraries styled with Tailwind CSS so internal teams can iterate without UI drift.",
        highlights: [
          "Responsive mobile-first breakpoints",
          "Accessible forms, dialogs & keyboard focus",
          "Consistent typography & spacing tokens",
        ],
      },
      {
        number: "03",
        title: "Type-Safe APIs & Relational Persistence",
        tag: "Full-Stack Core",
        description:
          "Robust server endpoints backed by PostgreSQL or MySQL, Prisma or Drizzle ORM, and Redis caching for fast operational queries.",
        highlights: [
          "tRPC / REST API contract validation",
          "Indexed SQL queries & connection pooling",
          "Role-scoped authorization middleware",
        ],
      },
      {
        number: "04",
        title: "SEO, Analytics & Core Web Vitals",
        tag: "Growth & Speed",
        description:
          "Production hardening focused on search crawlability, image optimization, and measurable real-world Lighthouse metrics.",
        highlights: [
          "Automated OpenGraph & JSON-LD schemas",
          "Bundle splitting & tree-shaking audits",
          "Clean URL routing & redirect governance",
        ],
      },
    ],
    executionHeading: "From architectural blueprint to live production sprints.",
    executionSummary:
      "Our Seoul headquarters and Dhaka engineering studio work in tight 3-hour overlap, giving you daily code transparency and weekly staging previews.",
    executionStages: [
      {
        step: "01",
        phase: "Discovery & Schema",
        title: "Entity, Route & Performance Blueprint",
        description:
          "We map user journeys, data relationships, authentication rules, and SEO structures before writing production code.",
        deliverables: [
          "App Router route & layout map",
          "Database schema & API contract",
          "Milestone timeline & scope lock",
        ],
      },
      {
        step: "02",
        phase: "Agile Sprint Build",
        title: "2-Week Sprints with Live Staging",
        description:
          "Every sprint produces verifiable TypeScript code pushed to your repository and deployed to preview environments.",
        deliverables: [
          "Reusable UI component system",
          "Server Actions & API integration",
          "Weekly stakeholder demo builds",
        ],
      },
      {
        step: "03",
        phase: "Hardening & QA",
        title: "Security, Accessibility & Load Checks",
        description:
          "Before release, every route passes TypeScript strict checks, OWASP input validation, and cross-device QA.",
        deliverables: [
          "Core Web Vitals 95+ profiling",
          "RBAC & input sanitization audit",
          "Cross-browser responsive checks",
        ],
      },
      {
        step: "04",
        phase: "Launch & SLA",
        title: "Zero-Downtime Release & Care",
        description:
          "Automated CI/CD deployment, telemetry monitoring, and a 30-day post-launch warranty ensure uninterrupted operations.",
        deliverables: [
          "GitHub Actions CI/CD pipeline",
          "Error tracking & uptime alerts",
          "Full repo & documentation handoff",
        ],
      },
    ],
    techIds: [
      "nextjs",
      "react",
      "typescript",
      "tailwind",
      "trpc",
      "postgresql",
      "prisma",
      "vercel",
    ],
    architectureNote:
      "Proven in production across multi-portal applications like Endow Global Education (73 routes, 48 tables) and enterprise dashboards.",
    standards: [
      {
        label: "Code Ownership",
        value: "100% Client IP",
        detail: "Direct commits to your private GitHub or GitLab repository.",
        iconKey: "code",
      },
      {
        label: "Performance Target",
        value: "95+ Web Vitals",
        detail: "Fast LCP, zero layout shift, and lean JavaScript bundles.",
        iconKey: "clock",
      },
      {
        label: "Security Baseline",
        value: "OWASP & RBAC",
        detail: "Validated payloads, strict headers, and role isolation.",
        iconKey: "shield",
      },
      {
        label: "Post-Launch",
        value: "30-Day Warranty",
        detail: "Immediate triage plus optional ongoing SLA retainers.",
        iconKey: "check",
      },
    ],
    relatedProjectIds: ["endow-global", "endow-connect"],
    relatedIndustryIds: [
      "education-edtech",
      "cross-border-fintech",
      "hospitality-property",
    ],
    testimonialIndex: 1,
    faqs: [
      {
        id: "web-faq-1",
        question: "Why build with Next.js & TypeScript instead of a CMS template?",
        answer:
          "Templates introduce heavy plugin bloat, security vulnerabilities, and rigid data models. Custom Next.js App Router applications give you sub-second loading, strict TypeScript safety, tailored workflows, and full control over SEO and scaling.",
      },
      {
        id: "web-faq-2",
        question: "How long does a typical enterprise web application take?",
        answer:
          "A focused web product or customer portal typically ships in 6 to 10 weeks across 2-week agile sprints. Larger multi-portal platforms with complex integrations average 12 to 16 weeks.",
      },
      {
        id: "web-faq-3",
        question: "Can you integrate with our existing backend or Laravel/Python APIs?",
        answer:
          "Yes. We routinely build Next.js frontends that communicate cleanly with existing REST, GraphQL, Laravel, or Python backends using typed contracts and token authentication.",
      },
      {
        id: "web-faq-4",
        question: "Do we own the full source code once the project ships?",
        answer:
          "Yes — 100%. All source code, design tokens, database migrations, and documentation belong exclusively to your organization with zero vendor lock-in.",
      },
    ],
  },

  "saas-platforms": {
    id: "saas-platforms",
    indexNumber: "02",
    eyebrow: "Service 02 · SaaS Architecture",
    heroTitle: "SaaS & Multi-Tenant Platforms",
    heroHighlight: "engineered to scale.",
    heroSummary:
      "Turnkey software-as-a-service platforms built from MVP to multi-tenant enterprise scale — complete with tenant isolation, role-based access control, billing gateways, and operational telemetry.",
    metrics: [
      {
        value: "100%",
        label: "Tenant Isolation",
        sublabel: "Scoped DB & RBAC policies",
      },
      {
        value: "6-10 Wks",
        label: "MVP Delivery",
        sublabel: "2-week sprint milestones",
      },
      {
        value: "99.98%",
        label: "Uptime Standard",
        sublabel: "Resilient cloud architecture",
      },
      {
        value: "25+",
        label: "RBAC Modules",
        sublabel: "Granular permission guards",
      },
    ],
    overviewEyebrow: "Multi-Tenant Foundations",
    overviewHeading: "Built for real operational rhythm, not fragile prototypes.",
    overviewSummary:
      "From shift-based restaurant accounting in Endow Cuisine to multi-property hospitality operations in ZendOS, we architect SaaS products with clean database boundaries, predictable billing hooks, and fast daily operator UX.",
    outcomes: [
      {
        title: "Strict Tenant & Role Isolation",
        description:
          "Database-level scoping and multi-layer RBAC policies ensure each organization sees only authorized records.",
        iconKey: "lock",
      },
      {
        title: "Subscription & Payment Ready",
        description:
          "Stripe, webhook idempotency, usage metering, and multi-currency settlement flows engineered for recurring revenue.",
        iconKey: "database",
      },
      {
        title: "Operator-First Dashboards",
        description:
          "Low-latency tables, shift workflows, and real-time analytics designed for staff using the software every day.",
        iconKey: "gauge",
      },
      {
        title: "Modular Expansion Paths",
        description:
          "Clean domain boundaries let you add mobile apps, partner APIs, or AI modules without rewriting core logic.",
        iconKey: "layers",
      },
    ],
    capabilitiesEyebrow: "Platform Engineering",
    capabilitiesHeading: "Every SaaS layer designed for long-term maintainability.",
    capabilitiesSummary:
      "We structure authentication, database migrations, billing state machines, and admin consoles so your product grows cleanly as customers onboard.",
    capabilities: [
      {
        number: "01",
        title: "Multi-Tenant Data Modeling & RBAC",
        tag: "Security Core",
        description:
          "Normalized PostgreSQL or MySQL schemas paired with organization switching, invitation flows, and granular role permissions.",
        highlights: [
          "Row & workspace scoping across endpoints",
          "Audit trails for sensitive actions",
          "OAuth, OTP & SSO authentication support",
        ],
      },
      {
        number: "02",
        title: "Billing, Subscriptions & Financial Ledgers",
        tag: "Monetization",
        description:
          "Reliable Stripe subscription management, tier entitlements, invoicing, and double-entry financial precision where required.",
        highlights: [
          "Idempotent Stripe webhook handlers",
          "Plan upgrades, trials & seat gating",
          "ACID-safe transaction & invoice logs",
        ],
      },
      {
        number: "03",
        title: "Real-Time Telemetry & Admin Consoles",
        tag: "Operations UI",
        description:
          "Dedicated tenant workspaces and internal super-admin command centers with live filtering, exports, and health metrics.",
        highlights: [
          "Sub-second Redis-cached reporting views",
          "Role-specific onboarding checklists",
          "Bulk actions & CSV/PDF reporting",
        ],
      },
      {
        number: "04",
        title: "Automated Onboarding & Background Jobs",
        tag: "Scalability",
        description:
          "Queue-backed email notifications, tenant provisioning, and scheduled sync jobs that keep user interactions snappy.",
        highlights: [
          "Redis queues & retry policies",
          "Transactional email & notification hooks",
          "Zero-downtime schema migration safety",
        ],
      },
    ],
    executionHeading: "De-risking multi-tenant architecture before Sprint 01.",
    executionSummary:
      "Getting tenant boundaries and billing state right upfront prevents expensive rewrites later. We lock the architecture before scaling feature velocity.",
    executionStages: [
      {
        step: "01",
        phase: "Domain Modeling",
        title: "Tenant Boundaries & Billing Spec",
        description:
          "Define workspace hierarchy, RBAC permission matrices, subscription tiers, and core relational entities.",
        deliverables: [
          "Multi-tenant ER diagram",
          "RBAC & entitlement matrix",
          "MVP vs Phase-2 roadmap",
        ],
      },
      {
        step: "02",
        phase: "Core Platform",
        title: "Auth, Tenant Onboarding & Core Flows",
        description:
          "Build authentication, organization provisioning, billing webhooks, and primary customer workflows in 2-week sprints.",
        deliverables: [
          "Tenant signup & invite system",
          "Stripe / gateway billing integration",
          "Core product workspace UI",
        ],
      },
      {
        step: "03",
        phase: "Verification",
        title: "Isolation Audits & Ledger Testing",
        description:
          "Automated tests verify cross-tenant access denial, webhook replay safety, and concurrency under load.",
        deliverables: [
          "Cross-tenant authorization tests",
          "Query indexing & N+1 audit",
          "Staging load & edge-case QA",
        ],
      },
      {
        step: "04",
        phase: "Scale & SLA",
        title: "Production Launch & Continuous Iteration",
        description:
          "Deploy with automated backups, error telemetry, and optional dedicated squad support for post-launch roadmap velocity.",
        deliverables: [
          "Automated daily DB snapshots",
          "Production uptime monitoring",
          "Clean engineering docs & handoff",
        ],
      },
    ],
    techIds: [
      "nextjs",
      "typescript",
      "laravel",
      "postgresql",
      "prisma",
      "redis",
      "stripe",
      "docker",
    ],
    architectureNote:
      "Powering vertical SaaS platforms including Endow Cuisine (double-entry restaurant accounting) and ZendOS (hospitality property OS).",
    standards: [
      {
        label: "Tenant Safety",
        value: "Zero Cross-Leak",
        detail: "Middleware and query-level tenant isolation on every route.",
        iconKey: "shield",
      },
      {
        label: "Source Ownership",
        value: "100% Yours",
        detail: "Full repository, schema, and infrastructure ownership.",
        iconKey: "code",
      },
      {
        label: "Delivery Model",
        value: "Fixed or Squad",
        detail: "Milestone MVP lock or dedicated senior engineering team.",
        iconKey: "clock",
      },
      {
        label: "Reliability",
        value: "99.98% SLA",
        detail: "Automated backups, container parity, and 30-day warranty.",
        iconKey: "check",
      },
    ],
    relatedProjectIds: ["endow-cuisine", "zendos"],
    relatedIndustryIds: [
      "restaurant-foodservice",
      "hospitality-property",
      "education-edtech",
    ],
    testimonialIndex: 1,
    faqs: [
      {
        id: "saas-faq-1",
        question: "How do you choose between Next.js/Prisma and Laravel for a SaaS?",
        answer:
          "We select based on your product domain and team needs: Next.js + TypeScript + PostgreSQL/Prisma excels for unified React web apps and edge performance, while Laravel + Livewire/Vue is exceptionally productive for heavy back-office CRMs and financial ledgers.",
      },
      {
        id: "saas-faq-2",
        question: "Can we start with a lean MVP and expand to enterprise tiers later?",
        answer:
          "Yes. We design clean multi-tenant schemas and role guards from day one so adding enterprise SSO, custom reporting, or team permissions later doesn't require rebuilding your core database.",
      },
      {
        id: "saas-faq-3",
        question: "What engagement models do you offer for SaaS founders?",
        answer:
          "You can engage us on Fixed-Scope Milestone Pricing for a well-defined MVP launch, or as a Dedicated Engineering Squad for continuous post-launch product iteration.",
      },
      {
        id: "saas-faq-4",
        question: "How are payments and subscription webhooks secured?",
        answer:
          "Every Stripe or payment gateway webhook uses cryptographic signature verification, idempotency keys, and transactional database updates so billing states never drift.",
      },
    ],
  },

  "student-portals": {
    id: "student-portals",
    indexNumber: "03",
    eyebrow: "Service 03 · EdTech & Portals",
    heroTitle: "Student & Academic Portals",
    heroHighlight: "built for global admissions.",
    heroSummary:
      "End-to-end educational platforms connecting applicants, counselors, partner universities, and leadership — unifying inquiry intake, encrypted document vaults, and multi-campus admissions tracking.",
    metrics: [
      {
        value: "5,000+",
        label: "Students Supported",
        sublabel: "Active global mobility flows",
      },
      {
        value: "80%",
        label: "Faster Processing",
        sublabel: "Reduced manual file handling",
      },
      {
        value: "3x",
        label: "Counselor Velocity",
        sublabel: "Zero inquiry slippage",
      },
      {
        value: "100%",
        label: "Journey Visibility",
        sublabel: "Inquiry to visa arrival",
      },
    ],
    overviewEyebrow: "Proven EdTech Pedigree",
    overviewHeading: "Engineered from real cross-border admissions operations.",
    overviewSummary:
      "Backed by Endow Corporation's international education operations across Seoul and Dhaka, our team understands degree checklists, intake calendars, counselor handoffs, and high-stakes visa document accuracy firsthand.",
    outcomes: [
      {
        title: "Unified Applicant Self-Service",
        description:
          "Students track application milestones, intake deadlines, and missing documents in one transparent dashboard.",
        iconKey: "globe",
      },
      {
        title: "Encrypted Document Vaults",
        description:
          "Context-aware mandatory & optional checklists for transcripts, passports, IELTS/TOPIK scores, and financial proofs.",
        iconKey: "lock",
      },
      {
        title: "Counselor & Branch Coordination",
        description:
          "Automated lead assignment, follow-up task queues, and zero-slippage handoffs across regional branches.",
        iconKey: "layers",
      },
      {
        title: "Executive Funnel Analytics",
        description:
          "Real-time visibility into conversion rates by intake, university partner, program tier, and counseling team.",
        iconKey: "gauge",
      },
    ],
    capabilitiesEyebrow: "Portal Capabilities",
    capabilitiesHeading: "Purpose-built modules for education & mobility teams.",
    capabilitiesSummary:
      "Every module eliminates scattered spreadsheets and chat threads, giving students clarity and staff complete operational accountability.",
    capabilities: [
      {
        number: "01",
        title: "Multi-Portal RBAC (Student, Counselor & Admin)",
        tag: "Role Architecture",
        description:
          "Cleanly separated experiences for prospective applicants, assigned counselors, branch managers, and super-admins under unified authentication.",
        highlights: [
          "Email/OTP & Google OAuth onboarding",
          "Branch-scoped counselor permissions",
          "Complete action & status audit logs",
        ],
      },
      {
        number: "02",
        title: "Dynamic Intake & Document Checklists",
        tag: "Admissions Engine",
        description:
          "Automated validation rules adapting required documents by destination country, degree level, and university intake cycle.",
        highlights: [
          "GPA/CGPA & language test normalization",
          "Secure S3/R2 encrypted file storage",
          "Instant re-submission & verification flags",
        ],
      },
      {
        number: "03",
        title: "Inquiry-to-Application Auto-Sync & CRM",
        tag: "Lead Velocity",
        description:
          "Campaign leads and consultation inquiries convert seamlessly into structured student profiles with deduplication.",
        highlights: [
          "Phone & email lead deduplication",
          "Automated counselor task routing",
          "Bi-directional sync with internal CRMs",
        ],
      },
      {
        number: "04",
        title: "University Discovery & Intake Search",
        tag: "Applicant Experience",
        description:
          "Sub-second program filtering by tuition budget, scholarship availability, language track, and Spring/Fall intake windows.",
        highlights: [
          "Typesense full-text program search",
          "Budget-aligned course recommendations",
          "Real-time notice & deadline badges",
        ],
      },
    ],
    executionHeading: "Software hardened for peak university intake seasons.",
    executionSummary:
      "Admissions portals cannot slow down during application deadlines. We build for concurrent uploads, mobile applicants, and multi-branch teams.",
    executionStages: [
      {
        step: "01",
        phase: "Workflow Audit",
        title: "Admissions Funnel & Checklist Mapping",
        description:
          "Map your intake cycles, country rules, counselor handoffs, and document compliance steps before designing schemas.",
        deliverables: [
          "Applicant-to-visa journey map",
          "Degree & country checklist rules",
          "Branch RBAC permission spec",
        ],
      },
      {
        step: "02",
        phase: "Portal Engineering",
        title: "Student Workspace & Counselor Desk",
        description:
          "Build mobile-friendly student portals, counselor review queues, and encrypted upload pipelines in 2-week sprints.",
        deliverables: [
          "Self-service applicant dashboard",
          "Encrypted document verification vault",
          "Counselor task & status console",
        ],
      },
      {
        step: "03",
        phase: "CRM & Search Sync",
        title: "Lead Deduplication & Reporting Feeds",
        description:
          "Connect marketing funnels, WhatsApp/email alerts, and executive conversion dashboards with zero orphaned leads.",
        deliverables: [
          "1:1 inquiry-to-application sync",
          "Executive yield & branch reports",
          "Automated status notifications",
        ],
      },
      {
        step: "04",
        phase: "Rollout & Care",
        title: "Zero-Downtime Branch Onboarding",
        description:
          "Migrate legacy spreadsheets cleanly, train branch leads, and support live admissions cycles under SLA.",
        deliverables: [
          "Legacy lead & student data import",
          "Peak intake load verification",
          "Continuous feature & SLA support",
        ],
      },
    ],
    techIds: [
      "nextjs",
      "typescript",
      "laravel",
      "vuejs",
      "postgresql",
      "redis",
      "cloudflare",
      "docker",
    ],
    architectureNote:
      "Battle-tested across Endow Connect CRM and Endow Global Education — serving 5,000+ student journeys across Seoul and Dhaka.",
    standards: [
      {
        label: "Data Privacy",
        value: "Encrypted Vault",
        detail: "Scoped access and secure storage for passports and transcripts.",
        iconKey: "shield",
      },
      {
        label: "Auditability",
        value: "Full Trail",
        detail: "Every counselor review, status change, and upload logged.",
        iconKey: "check",
      },
      {
        label: "Mobile UX",
        value: "Applicant Ready",
        detail: "Fast mobile uploads even over constrained regional networks.",
        iconKey: "clock",
      },
      {
        label: "Ownership",
        value: "100% Custom IP",
        detail: "No per-student SaaS seat taxes as your agency grows.",
        iconKey: "code",
      },
    ],
    relatedProjectIds: ["endow-global", "endow-connect"],
    relatedIndustryIds: ["education-edtech", "cross-border-fintech"],
    testimonialIndex: 0,
    faqs: [
      {
        id: "portal-faq-1",
        question: "Can the portal sync with our existing CRM or spreadsheets?",
        answer:
          "Yes. We build clean REST/webhook sync bridges (as we engineered between Endow Global and Endow Connect) and handle structured migration from legacy Excel or Google Sheets.",
      },
      {
        id: "portal-faq-2",
        question: "How do you protect sensitive student passports and transcripts?",
        answer:
          "Files are stored in private, encrypted object storage accessed only via short-lived signed URLs after strict role-based authorization checks.",
      },
      {
        id: "portal-faq-3",
        question: "Can we support multiple regional branches and university partners?",
        answer:
          "Yes. Branch-level RBAC scoping allows regional counselors to manage their assigned cohorts while head office leadership views unified global analytics.",
      },
      {
        id: "portal-faq-4",
        question: "Does the portal support AI course matching or WhatsApp notifications?",
        answer:
          "Yes. We can integrate semantic university matching (OpenAI + vector embeddings) and automated WhatsApp/email milestone alerts directly into the applicant workflow.",
      },
    ],
  },

  "api-integration": {
    id: "api-integration",
    indexNumber: "04",
    eyebrow: "Service 04 · Systems Integration",
    heroTitle: "API & Systems Integration",
    heroHighlight: "with zero data drift.",
    heroSummary:
      "Connect internal portals, payment gateways, CRMs, and legacy databases through high-throughput REST, tRPC, and GraphQL APIs backed by idempotent webhooks and resilient message queues.",
    metrics: [
      {
        value: "100%",
        label: "Sync Accuracy",
        sublabel: "Zero orphaned records",
      },
      {
        value: "36+",
        label: "Production Endpoints",
        sublabel: "tRPC + REST service feeds",
      },
      {
        value: "99.98%",
        label: "Gateway Uptime",
        sublabel: "Retries & dead-letter queues",
      },
      {
        value: "24/7",
        label: "Audit Telemetry",
        sublabel: "Structured request logging",
      },
    ],
    overviewEyebrow: "Integration Architecture",
    overviewHeading: "Eliminate manual CSV exports and brittle glue scripts.",
    overviewSummary:
      "Disconnected tools create operational blind spots. We architect unified API gateways, typed service contracts, and automated sync engines so data flows reliably between your web portals, CRMs, payment processors, and legacy software.",
    outcomes: [
      {
        title: "Idempotent Webhook Pipelines",
        description:
          "Cryptographic signature verification, deduplication keys, and retry queues ensure events never double-process.",
        iconKey: "shield",
      },
      {
        title: "Bi-Directional CRM & ERP Sync",
        description:
          "Real-time synchronization between customer portals, Salesforce/HubSpot, Endow Connect, and accounting ledgers.",
        iconKey: "layers",
      },
      {
        title: "Typed API Contracts & Docs",
        description:
          "Strict Zod/TypeScript schemas and OpenAPI documentation make partner and mobile integrations predictable.",
        iconKey: "code",
      },
      {
        title: "Legacy System Modernization",
        description:
          "Wrap aging databases or monolithic backends behind clean, rate-limited API facades without disrupting operations.",
        iconKey: "database",
      },
    ],
    capabilitiesEyebrow: "Integration Services",
    capabilitiesHeading: "Resilient data flow across every system boundary.",
    capabilitiesSummary:
      "From payment reconciliation and WhatsApp Business APIs to multi-portal REST sync feeds, we engineer integrations that recover gracefully from third-party downtime.",
    capabilities: [
      {
        number: "01",
        title: "High-Throughput REST, tRPC & GraphQL APIs",
        tag: "API Core",
        description:
          "Cleanly versioned endpoints with schema validation, cursor pagination, and Redis rate limiting for web and mobile clients.",
        highlights: [
          "End-to-end typed tRPC & REST contracts",
          "Upstash / Redis rate limiting & caching",
          "Bearer token & OAuth2 scoping",
        ],
      },
      {
        number: "02",
        title: "Webhook Ingestion & Distributed Queues",
        tag: "Event Reliability",
        description:
          "Asynchronous worker pipelines handling payment events, CRM updates, and third-party callbacks with exponential backoff.",
        highlights: [
          "Signature verification & replay protection",
          "Dead-letter inspection & retry replay",
          "Zero dropped events under traffic spikes",
        ],
      },
      {
        number: "03",
        title: "Payment, Messaging & SaaS Connectors",
        tag: "Ecosystem Links",
        description:
          "Production integrations with Stripe, PayPal, WhatsApp Business API, Google Workspace, HubSpot, Salesforce, and regional gateways.",
        highlights: [
          "Automated invoice & tuition settlement",
          "Phone & email normalization pipelines",
          "Two-way contact & ticket syncing",
        ],
      },
      {
        number: "04",
        title: "Legacy Bridge & Zero-Downtime Cutover",
        tag: "Modernization",
        description:
          "Strangler-fig API adapters and incremental data sync scripts allowing gradual migration off older software safely.",
        highlights: [
          "Dual-write & reconciliation verification",
          "SQL schema normalization layers",
          "Full audit trail across sync runs",
        ],
      },
    ],
    executionHeading: "Engineered for observability, retries, and clean contracts.",
    executionSummary:
      "Integrations fail silently when built casually. Every pipeline we ship includes structured error logs, health alerts, and replay safeguards.",
    executionStages: [
      {
        step: "01",
        phase: "System Mapping",
        title: "Contract Audit & Failure Mode Design",
        description:
          "Audit source/target schemas, rate limits, auth methods, and edge-case conflict rules before coding adapters.",
        deliverables: [
          "Field mapping & normalization spec",
          "Idempotency & conflict strategy",
          "Auth & key rotation design",
        ],
      },
      {
        step: "02",
        phase: "API & Queue Build",
        title: "Typed Gateways & Worker Pipelines",
        description:
          "Implement endpoints, signature checks, queue workers, and automated payload validation in 2-week sprints.",
        deliverables: [
          "Typed REST / tRPC / GraphQL layer",
          "Queue-backed webhook consumers",
          "Rate limiting & token guards",
        ],
      },
      {
        step: "03",
        phase: "Chaos & Load QA",
        title: "Retry, Timeout & Duplicate Testing",
        description:
          "Simulate duplicate webhooks, slow upstream APIs, and partial network failures to confirm data consistency.",
        deliverables: [
          "Idempotency & replay test suite",
          "Latency & throughput profiling",
          "Payload sanitization verification",
        ],
      },
      {
        step: "04",
        phase: "Live Telemetry",
        title: "Monitored Production Rollout",
        description:
          "Launch with structured sync dashboards and automated alerting so your team never discovers stale data from customers.",
        deliverables: [
          "Dead-letter & sync health alerts",
          "OpenAPI / developer handoff docs",
          "30-day warranty & SLA support",
        ],
      },
    ],
    techIds: [
      "nodejs",
      "typescript",
      "trpc",
      "graphql",
      "laravel",
      "redis",
      "postgresql",
      "stripe",
    ],
    architectureNote:
      "Verified across Endow Global's 18 tRPC routers + 18 Bearer-secured REST sync feeds connecting live admissions with Endow Connect CRM.",
    standards: [
      {
        label: "Event Safety",
        value: "Idempotent",
        detail: "Guaranteed deduplication against duplicate webhook deliveries.",
        iconKey: "shield",
      },
      {
        label: "Type Safety",
        value: "Schema Validated",
        detail: "Runtime payload validation + static TypeScript contracts.",
        iconKey: "code",
      },
      {
        label: "Observability",
        value: "Full Sync Logs",
        detail: "Traceable request IDs, latency metrics, and retry alerts.",
        iconKey: "clock",
      },
      {
        label: "Handoff",
        value: "Clean Docs",
        detail: "Complete API specifications and private Git ownership.",
        iconKey: "check",
      },
    ],
    relatedProjectIds: ["endow-global", "endow-desk"],
    relatedIndustryIds: [
      "cross-border-fintech",
      "education-edtech",
      "ai-support-ops",
    ],
    testimonialIndex: 2,
    faqs: [
      {
        id: "api-faq-1",
        question: "Can you integrate with proprietary or poorly documented legacy APIs?",
        answer:
          "Yes. We reverse-engineer or audit existing database and endpoint behaviors, build defensive adapter layers with schema validation, and isolate legacy quirks from your modern apps.",
      },
      {
        id: "api-faq-2",
        question: "How do you prevent duplicate records when syncing between platforms?",
        answer:
          "We enforce deterministic deduplication keys (such as normalized E.164 phone numbers or external IDs), database unique constraints, and idempotent upsert transactions.",
      },
      {
        id: "api-faq-3",
        question: "What happens if a third-party API goes down during a sync?",
        answer:
          "Events enter persistent Redis/queue workers with exponential backoff retries and dead-letter alerts, ensuring zero data loss until the external service recovers.",
      },
      {
        id: "api-faq-4",
        question: "Which payment and messaging APIs do you regularly integrate?",
        answer:
          "We routinely integrate Stripe, PayPal, WhatsApp Business API, Twilio, Google Workspace, HubSpot, Salesforce, and custom bank or tuition settlement feeds.",
      },
    ],
  },

  "ai-automation": {
    id: "ai-automation",
    indexNumber: "05",
    eyebrow: "Service 05 · Applied AI Systems",
    heroTitle: "AI Workflows & Matching Engines",
    heroHighlight: "built for real operations.",
    heroSummary:
      "Integrate production-grade AI where it measurably accelerates teams — semantic vector search, RAG knowledge assistants, document OCR validation, and intelligent support triage.",
    metrics: [
      {
        value: "70%",
        label: "Less Manual Work",
        sublabel: "Automated drafting & triage",
      },
      {
        value: "< 2 min",
        label: "First Response",
        sublabel: "AI-assisted support velocity",
      },
      {
        value: "100%",
        label: "Source Grounded",
        sublabel: "RAG verified knowledge base",
      },
      {
        value: "24/7",
        label: "Automated Triage",
        sublabel: "Instant matching & intake",
      },
    ],
    overviewEyebrow: "Practical AI Engineering",
    overviewHeading: "Grounded, predictable AI integrated into your workflows.",
    overviewSummary:
      "We skip AI hype and engineer reliable systems backed by vector databases, structured outputs, and human-in-the-loop guardrails — like Endow Desk's support drafting layer and Endow Global's Pinecone course matching.",
    outcomes: [
      {
        title: "Vector Search & RAG Grounding",
        description:
          "Retrieve verified company documents, course catalogs, or policies before generating answers to minimize hallucinations.",
        iconKey: "database",
      },
      {
        title: "Algorithmic Profile Matching",
        description:
          "Pair structured rules (GPA, budget, eligibility) with semantic embeddings for accurate recommendations.",
        iconKey: "cpu",
      },
      {
        title: "Automated Document OCR & Parsing",
        description:
          "Extract structured fields from academic transcripts, invoices, and PDFs into validated database records.",
        iconKey: "layers",
      },
      {
        title: "Human-in-the-Loop Guardrails",
        description:
          "Agent-reviewed reply suggestions, confidence thresholds, and strict PII controls keep operations compliant.",
        iconKey: "shield",
      },
    ],
    capabilitiesEyebrow: "AI Modules",
    capabilitiesHeading: "Production AI patterns built for measurable ROI.",
    capabilitiesSummary:
      "Every AI feature ships with latency budgets, prompt versioning, fallback handling, and clear evaluation benchmarks.",
    capabilities: [
      {
        number: "01",
        title: "RAG Knowledge Assistants & Support Drafting",
        tag: "Grounded LLMs",
        description:
          "Surface verified knowledge-base articles and draft accurate agent responses directly inside support tickets or internal portals.",
        highlights: [
          "Hybrid keyword + vector retrieval",
          "Citation links to source documentation",
          "One-click human agent review & send",
        ],
      },
      {
        number: "02",
        title: "Semantic Matching & Recommendation Engines",
        tag: "Vector Search",
        description:
          "Match candidates, students, or customers against thousands of structured offerings using OpenAI, Gemini, and Pinecone or pgvector.",
        highlights: [
          "Hard-filter eligibility + vector ranking",
          "Sub-second Typesense & Pinecone queries",
          "Explainable match scoring for staff",
        ],
      },
      {
        number: "03",
        title: "Multimodal Document Extraction & Triage",
        tag: "OCR & Validation",
        description:
          "Parse uploaded PDFs and images into strict JSON schemas, flagging missing signatures or mismatched criteria automatically.",
        highlights: [
          "Structured JSON schema enforcement",
          "Confidence scoring & exception queues",
          "Direct integration into portal checklists",
        ],
      },
      {
        number: "04",
        title: "WhatsApp & Multi-Channel Qualification Bots",
        tag: "Conversational Ops",
        description:
          "Qualify inbound leads, answer routine FAQs 24/7, and hand off hot conversations cleanly into your CRM with full context.",
        highlights: [
          "WhatsApp Business & web widget sync",
          "Automatic CRM lead creation",
          "Seamless human escalation triggers",
        ],
      },
    ],
    executionHeading: "Reliable AI engineering with strict evals and cost controls.",
    executionSummary:
      "Production AI requires clean data pipelines, caching, and clear accuracy benchmarks — not raw API prompts wired straight to your UI.",
    executionStages: [
      {
        step: "01",
        phase: "Use-Case Audit",
        title: "Workflow Selection & Ground-Truth Dataset",
        description:
          "Identify high-leverage automation bottlenecks, define accuracy metrics, and prepare clean knowledge chunks.",
        deliverables: [
          "ROI & latency target benchmark",
          "Document chunking & metadata spec",
          "PII & safety guardrail policy",
        ],
      },
      {
        step: "02",
        phase: "Retrieval & Pipelines",
        title: "Vector Indexing & Structured Orchestration",
        description:
          "Build embedding pipelines, hybrid search, structured tool-calling, and Redis response caching.",
        deliverables: [
          "Pinecone / pgvector indexing pipeline",
          "Structured JSON extraction prompts",
          "Fallback & rate-limit resilience",
        ],
      },
      {
        step: "03",
        phase: "Eval & Integration",
        title: "Accuracy Testing & Cockpit UX",
        description:
          "Test outputs against real edge cases, tune retrieval thresholds, and embed suggestions cleanly into staff workflows.",
        deliverables: [
          "Golden test-set evaluation suite",
          "Human-in-the-loop review UI",
          "Token cost & latency profiling",
        ],
      },
      {
        step: "04",
        phase: "Production Ops",
        title: "Live Telemetry & Continuous Tuning",
        description:
          "Monitor hallucination rates, acceptance metrics, and token spend while syncing newly published knowledge automatically.",
        deliverables: [
          "Auto-reindexing on content updates",
          "Usage & quality audit dashboards",
          "30-day warranty & optimization care",
        ],
      },
    ],
    techIds: [
      "openai",
      "gemini",
      "claude",
      "python",
      "nextjs",
      "postgresql",
      "redis",
      "typescript",
    ],
    architectureNote:
      "Deployed in Endow Desk (70% less manual typing, <2 min replies) and Endow Global (GPT-4o RAG + Pinecone course matching).",
    standards: [
      {
        label: "Accuracy",
        value: "Grounded RAG",
        detail: "Responses anchored strictly to your verified documents.",
        iconKey: "check",
      },
      {
        label: "Data Control",
        value: "Zero Model Training",
        detail: "Enterprise API boundaries keeping proprietary data private.",
        iconKey: "shield",
      },
      {
        label: "Response Speed",
        value: "Streaming & Cached",
        detail: "Fast semantic lookups paired with Redis query caching.",
        iconKey: "clock",
      },
      {
        label: "Ownership",
        value: "100% Owned Code",
        detail: "You own every prompt, pipeline, and vector index schema.",
        iconKey: "code",
      },
    ],
    relatedProjectIds: ["endow-desk", "endow-global"],
    relatedIndustryIds: ["ai-support-ops", "education-edtech"],
    testimonialIndex: 0,
    faqs: [
      {
        id: "ai-faq-1",
        question: "How do you prevent AI hallucinations on customer-facing workflows?",
        answer:
          "We combine strict RAG grounding (answering only from indexed knowledge), deterministic rule filters for eligibility/pricing, structured schema outputs, and human-in-the-loop review where stakes are high.",
      },
      {
        id: "ai-faq-2",
        question: "Which AI models and vector databases do you support?",
        answer:
          "We work across OpenAI, Google Gemini, and Anthropic Claude depending on latency, multimodality, and cost targets — paired with Pinecone, PostgreSQL pgvector, or Typesense.",
      },
      {
        id: "ai-faq-3",
        question: "Is our company data used to train public AI models?",
        answer:
          "No. We integrate enterprise API tiers with zero-data-retention / no-training guarantees and strip unnecessary PII before external model calls.",
      },
      {
        id: "ai-faq-4",
        question: "Can AI automation plug into our existing CRM or helpdesk?",
        answer:
          "Yes. Whether we build a custom platform or enhance your current system, we integrate via clean REST/webhook pipelines with fallback protection.",
      },
    ],
  },

  "cloud-devops": {
    id: "cloud-devops",
    indexNumber: "06",
    eyebrow: "Service 06 · Infrastructure & SRE",
    heroTitle: "Cloud DevOps & Site Reliability",
    heroHighlight: "built for 99.98% uptime.",
    heroSummary:
      "Containerized cloud deployments, zero-downtime CI/CD pipelines, automated encrypted backups, and sovereign on-premise server systems engineered for enterprise reliability.",
    metrics: [
      {
        value: "99.98%",
        label: "Uptime SLA",
        sublabel: "Proactive 24/7 monitoring",
      },
      {
        value: "10x",
        label: "LAN Throughput",
        sublabel: "On-prem systems engineering",
      },
      {
        value: "Zero",
        label: "Deploy Downtime",
        sublabel: "Automated blue/green CI/CD",
      },
      {
        value: "100%",
        label: "Data Sovereignty",
        sublabel: "Cloud or owned hardware",
      },
    ],
    overviewEyebrow: "Infrastructure Engineering",
    overviewHeading: "Resilient infrastructure across AWS, Edge, and local servers.",
    overviewSummary:
      "Whether your platform scales across multi-region AWS clusters and Cloudflare edge networks, or runs air-gapped on owned local office hardware like Endow Cloud, we eliminate deployment fragility and recovery guesswork.",
    outcomes: [
      {
        title: "Deterministic Docker Environments",
        description:
          "Identical containerized parity across developer machines, staging previews, and production nodes.",
        iconKey: "layers",
      },
      {
        title: "Zero-Downtime CI/CD Releases",
        description:
          "Automated typechecks, test suites, build verification, and rolling deployments via GitHub Actions.",
        iconKey: "zap",
      },
      {
        title: "Automated Backups & Recovery",
        description:
          "Encrypted scheduled database snapshots, point-in-time recovery drills, and off-site redundancy.",
        iconKey: "database",
      },
      {
        title: "Cloud or Sovereign On-Premises",
        description:
          "Full flexibility across AWS, Vercel, Kubernetes, or private on-premise Rust/Nginx storage servers.",
        iconKey: "lock",
      },
    ],
    capabilitiesEyebrow: "SRE & DevOps Scope",
    capabilitiesHeading: "Predictable releases, security hardening, and continuous uptime.",
    capabilitiesSummary:
      "We take over infrastructure chaos — automating builds, tightening WAF & TLS boundaries, and instrumenting real-time alerting.",
    capabilities: [
      {
        number: "01",
        title: "Docker, Kubernetes & Cloud Provisioning",
        tag: "Infrastructure Core",
        description:
          "Clean container architectures on AWS ECS/EC2, Kubernetes, or Vercel with private VPC networking and TLS termination.",
        highlights: [
          "Multi-stage minimal Docker builds",
          "AWS VPC, RDS & S3 encrypted storage",
          "Autoscaling & resource limit tuning",
        ],
      },
      {
        number: "02",
        title: "Automated GitHub Actions CI/CD",
        tag: "Release Velocity",
        description:
          "Every pull request runs automated lint, typecheck, and E2E verification before blue/green production promotion.",
        highlights: [
          "Zero-downtime rolling deployments",
          "Instant rollback capability",
          "Environment secret & key governance",
        ],
      },
      {
        number: "03",
        title: "On-Premise & Sovereign Local Systems",
        tag: "Private Iron",
        description:
          "Self-hosted office servers and local storage infrastructure using Nginx, Rust/FUSE, and local backup mirrors with zero cloud lock-in.",
        highlights: [
          "Full gigabit LAN file streaming",
          "Offline-ready ISP independence",
          "Zero recurring per-seat storage bills",
        ],
      },
      {
        number: "04",
        title: "24/7 Telemetry, WAF & Disaster Recovery",
        tag: "Site Reliability",
        description:
          "Cloudflare edge DDoS mitigation, centralized log aggregation, uptime probes, and tested backup restoration workflows.",
        highlights: [
          "Cloudflare DNS, WAF & edge caching",
          "Automated database snapshot verification",
          "Real-time incident & error alerting",
        ],
      },
    ],
    executionHeading: "Infrastructure hardened before traffic hits production.",
    executionSummary:
      "We audit single points of failure, automate recovery paths, and document every operational runbook so your team is never locked out of its own servers.",
    executionStages: [
      {
        step: "01",
        phase: "Infra Audit",
        title: "Topology, Security & Bottleneck Review",
        description:
          "Audit existing servers, DNS, database backup posture, deployment scripts, and monthly cloud spend.",
        deliverables: [
          "Architecture & risk assessment",
          "Cost & right-sizing blueprint",
          "Backup & RTO/RPO targets",
        ],
      },
      {
        step: "02",
        phase: "Container & CI/CD",
        title: "Dockerization & Automated Pipelines",
        description:
          "Standardize builds into reproducible containers and wire automated staging/production CI/CD workflows.",
        deliverables: [
          "Production Docker & Nginx configs",
          "GitHub Actions test & deploy gates",
          "Secret management hardening",
        ],
      },
      {
        step: "03",
        phase: "Resilience QA",
        title: "Failover, Backup & Load Testing",
        description:
          "Rehearse database restores, verify SSL renewals, validate WAF rules, and benchmark traffic spikes.",
        deliverables: [
          "Verified snapshot restore drill",
          "Cloudflare WAF & DDoS rules",
          "Zero-downtime cutover rehearsal",
        ],
      },
      {
        step: "04",
        phase: "24/7 Care",
        title: "Monitoring, Alerts & SLA Support",
        description:
          "Runbooks, centralized logs, uptime telemetry, and ongoing SRE maintenance keep systems healthy year-round.",
        deliverables: [
          "Centralized error & uptime alerts",
          "Infrastructure-as-Code handoff",
          "Ongoing reliability retainers",
        ],
      },
    ],
    techIds: [
      "docker",
      "aws",
      "kubernetes",
      "cloudflare",
      "github-actions",
      "nginx",
      "postgresql",
      "rust",
    ],
    architectureNote:
      "Powering both high-availability cloud deployments (99.98% SLA) and sovereign on-premise infrastructure like Endow Cloud.",
    standards: [
      {
        label: "Availability",
        value: "99.98% SLA",
        detail: "Proactive health checks and zero-downtime deployment patterns.",
        iconKey: "clock",
      },
      {
        label: "Backups",
        value: "Daily Verified",
        detail: "Encrypted automated snapshots with rehearsed recovery.",
        iconKey: "shield",
      },
      {
        label: "Access Control",
        value: "100% Client Owned",
        detail: "Deployed inside your own AWS, Cloudflare, or local hardware.",
        iconKey: "code",
      },
      {
        label: "Security",
        value: "Edge & TLS",
        detail: "WAF rules, private VPC isolation, and least-privilege IAM.",
        iconKey: "check",
      },
    ],
    relatedProjectIds: ["endow-cloud", "endow-connect"],
    relatedIndustryIds: [
      "data-infrastructure",
      "ai-support-ops",
      "education-edtech",
    ],
    testimonialIndex: 2,
    faqs: [
      {
        id: "devops-faq-1",
        question: "Do you deploy into our AWS/Cloudflare accounts or your own?",
        answer:
          "Always into your own accounts or on-premise hardware. You retain root ownership, billing transparency, and full infrastructure-as-code scripts with zero agency lock-in.",
      },
      {
        id: "devops-faq-2",
        question: "Can you help reduce high AWS bills or slow deployments?",
        answer:
          "Yes. Our infrastructure audits routinely eliminate over-provisioned instances, optimize database queries and Redis caching, and shift static assets onto Cloudflare edge caching.",
      },
      {
        id: "devops-faq-3",
        question: "Do you support on-premise / local office server setups?",
        answer:
          "Yes. As demonstrated with Endow Cloud, we build and harden local Linux/Nginx/Docker deployments for organizations requiring strict data sovereignty or offline resilience.",
      },
      {
        id: "devops-faq-4",
        question: "What ongoing SLA & maintenance options do you offer?",
        answer:
          "Every launch includes a 30-day warranty, followed by optional monthly reliability retainers covering OS/dependency patching, backup audits, and 24/7 uptime response.",
      },
    ],
  },
};

const EXTRA_TECH_ITEMS: Record<string, TechItem> = {
  trpc: {
    id: "trpc",
    name: "tRPC",
    icon: "https://cdn.simpleicons.org/trpc/dc2626",
    role: "Type-Safe API",
    isCore: true,
    description:
      "End-to-end type-safe APIs sharing server router contracts directly with React & Next.js clients.",
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    icon: "https://cdn.simpleicons.org/stripe/dc2626",
    role: "Billing & Payments",
    isCore: true,
    description:
      "Subscription entitlements, checkout flows, and idempotent payment webhooks for SaaS and tuition platforms.",
  },
  graphql: {
    id: "graphql",
    name: "GraphQL",
    icon: "https://cdn.simpleicons.org/graphql/dc2626",
    role: "API Layer",
    isCore: false,
    description:
      "Typed schema federation and flexible client querying for complex partner and mobile ecosystems.",
  },
  vercel: {
    id: "vercel",
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel/dc2626",
    role: "Edge Hosting",
    isCore: true,
    description:
      "Global edge network, preview deployments per pull request, and instant Next.js SSR scaling.",
  },
};

const ALL_TECH_ITEMS: TechItem[] = [
  ...techPillars.flatMap((pillar) =>
    pillar.subgroups.flatMap((group) => group.techs),
  ),
  ...infrastructureStack,
];

export function resolveServiceTechItems(techIds: string[]): TechItem[] {
  return techIds
    .map((id) => {
      const fromStack = ALL_TECH_ITEMS.find(
        (t) =>
          t.id?.toLowerCase() === id.toLowerCase() ||
          t.name.toLowerCase() === id.toLowerCase(),
      );
      if (fromStack) return fromStack;
      return EXTRA_TECH_ITEMS[id.toLowerCase()];
    })
    .filter((item): item is TechItem => Boolean(item));
}

export function getRelatedProjectsForService(
  projectIds: string[],
): FeaturedProject[] {
  const matched = projectIds
    .map((id) => featuredProjects.find((p) => p.id === id))
    .filter((p): p is FeaturedProject => Boolean(p));

  if (matched.length >= 2) return matched.slice(0, 2);
  return featuredProjects.slice(0, 2);
}

export function getRelatedIndustriesForService(
  industryIds: string[],
): IndustryItem[] {
  return industryIds
    .map((id) => industriesData.find((ind) => ind.id === id))
    .filter((ind): ind is IndustryItem => Boolean(ind));
}

export function getOtherServices(currentId: string): Service[] {
  return coreServices.filter((s) => s.id !== currentId);
}
