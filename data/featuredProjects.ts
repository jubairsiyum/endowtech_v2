export interface FeaturedProjectMetric {
  value: string;
  label: string;
  change?: string;
}

export interface FeaturedProject {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  client: string;
  clientLocation: string;
  year: string;
  role: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  accentColor: string;
  image: string;
  techStack: string[];
  tags: string[];
  metrics: FeaturedProjectMetric[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  architectureHighlights: {
    layer: string;
    tech: string;
    purpose: string;
  }[];
  liveUrl?: string;
  demoAvailable?: boolean;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "endow-connect",
    number: "01",
    title: "Endow Connect",
    shortTitle: "Endow Connect – CRM & Management Platform",
    category: "CRM & Education Management Platform",
    client: "Endow Global Education",
    clientLocation: "Seoul · Dhaka",
    year: "2025",
    role: "Full-Stack Enterprise CRM & Operations Engineering",
    tagline:
      "From first inquiry to enrollment: one connected workflow for students and counselors.",
    description:
      "Endow Connect is a purpose-built CRM designed to bridge the gap between students and counselors within large-scale education operations. Developed for Endow Global Education, it centralizes the entire student journey from first inquiry to enrollment and beyond giving counselors a single dashboard to track leads, manage communications, and follow up without anything slipping through the cracks.",
    challenge:
      "Student-counselor coordination, team responsibilities, and recruitment pipelines can become fragmented across spreadsheets and disconnected tools. Education teams need one shared view of the journey and the work around it.",
    solution:
      "Beyond student-counselor coordination, Endow Connect functions as a full education team management system: assigning tasks, monitoring team performance, managing pipelines across multiple programs or campuses, and generating reports that give leadership real visibility into recruitment and enrollment funnels.",
    accentColor: "#DC2626",
    image: "/images/projects/Endow Connect.jpg",
    techStack: [
      "Laravel",
      "Vue.js",
      "Blade",
      "MySQL",
      "Livewire",
      "Redis",
      "Docker",
      "RBAC",
      "Sanctum",
    ],
    tags: ["CRM", "EdTech", "Laravel", "Vue.js", "MySQL", "Livewire"],
    metrics: [
      {
        value: "100%",
        label: "Unified Student Journey",
        change: "From inquiry to enrollment",
      },
      {
        value: "3x",
        label: "Team Coordination Velocity",
        change: "Zero inquiry slippage",
      },
      {
        value: "0",
        label: "Scattered Spreadsheets",
        change: "Replaced by one system",
      },
      {
        value: "99.9%",
        label: "Platform Uptime SLA",
        change: "Enterprise reliability",
      },
    ],
    keyFeatures: [
      {
        title: "Lead & Inquiry Tracking",
        description:
          "Keep student leads and essential candidate details in one place with organized intake channels and qualification history.",
      },
      {
        title: "Counselor-Student Bridging",
        description:
          "Connect the right counseling team to each student, giving each lead a clear owner and actionable next step.",
      },
      {
        title: "Team & Task Management",
        description:
          "Assign tasks, follow counselor updates, monitor operational output, and track enrollment milestones with accountability.",
      },
      {
        title: "Enrollment Pipeline Visibility",
        description:
          "End-to-end recruitment funnel tracking across multiple university programs, degree cycles, and regional branch campuses.",
      },
      {
        title: "Reporting Dashboards",
        description:
          "Shared analytical dashboards giving leadership real-time visibility into conversion funnels and recruitment yields.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Backend Framework",
        tech: "Laravel 11, Livewire & Blade",
        purpose:
          "Robust MVC core managing application state, enrollment pipelines, and business logic",
      },
      {
        layer: "Database & Security",
        tech: "MySQL, Docker, RBAC & Laravel Sanctum",
        purpose:
          "Strict role isolation between counselors and leadership with tokenized authentication",
      },
      {
        layer: "Client & Caching",
        tech: "Vue.js, Tailwind CSS & Redis",
        purpose:
          "Sub-second dashboard loading, real-time activity feeds, and smooth lead management",
      },
    ],
    liveUrl: "https://endow-connect.vercel.app",
    demoAvailable: true,
  },
  {
    id: "endow-global",
    number: "02",
    title: "Endow Global Education",
    shortTitle: "Endow Global – Study Abroad & Admissions Platform",
    category: "EdTech & Global Admissions Platform",
    client: "Endow Global Education",
    clientLocation: "Dhaka · Seoul",
    year: "2026",
    role: "Full-Stack Next.js, tRPC & Admissions Platform Engineering",
    tagline:
      "From course discovery to visa arrival: an AI-powered, multi-portal platform connecting international students, counselors, and universities.",
    description:
      "Endow Global Education is a full-stack Turborepo monorepo powering end-to-end international student recruitment—from interactive South Korea & global university discovery to admissions processing. It unifies public course search, multi-step applications, marketing campaign lead funnels, a real-time student portal, a counselor workspace, and a 25-module RBAC admin command center, while syncing live admissions data with Endow Connect.",
    challenge:
      "Prospective students struggled with fragmented university intake deadlines, rigid document checklists, and disconnected inquiry forms that left student dashboards empty after registration. Meanwhile, counselors and marketing teams needed unified lead deduplication, budget-aware course matching, and granular role isolation across public, student, counselor, and super-admin workflows.",
    solution:
      "Built a unified Next.js 14 + tRPC + Drizzle ORM platform backed by 48 MySQL tables and 4 role-isolated portals. Engineered an automated 1:1 inquiry-to-application sync engine, dynamic degree-based document checklists, Typesense search, OpenAI & Pinecone vector course matching, a Bangladesh phone-normalized campaign funnel, Socket.io real-time messaging, and Bearer-secured REST sync feeds for Endow Connect.",
    accentColor: "#C41E3A",
    image: "/images/projects/Endow Global.jpg",
    techStack: [
      "Next.js 14",
      "TypeScript",
      "tRPC",
      "Drizzle ORM",
      "MySQL",
      "Better Auth",
      "Tailwind CSS",
      "Socket.io",
      "OpenAI & Pinecone",
      "Typesense",
      "Upstash Redis",
      "Turborepo",
    ],
    tags: ["EdTech", "Next.js", "TypeScript", "tRPC", "Drizzle ORM", "MySQL"],
    metrics: [
      {
        value: "73",
        label: "App Routes & Portals",
        change: "Public, Student, Counselor & Admin",
      },
      {
        value: "48",
        label: "Relational DB Tables",
        change: "Normalized MySQL + Drizzle schema",
      },
      {
        value: "25",
        label: "RBAC Permission Modules",
        change: "Middleware, Layout & tRPC guards",
      },
      {
        value: "100%",
        label: "Inquiry-to-App Auto-Sync",
        change: "Zero orphaned student inquiries",
      },
    ],
    keyFeatures: [
      {
        title: "Interactive University & Intake Discovery",
        description:
          "Interactive Korea Journey Hero with live admission notices, intake-aware filtering (Spring, Fall, Summer, Winter), Typesense full-text search, and course-level application status badges.",
      },
      {
        title: "Inquiry-to-Application Auto-Sync Pipeline",
        description:
          "Multi-step guest and authenticated application flows with academic GPA/CGPA validation, photo uploads, withdrawal/re-apply support, and automatic 1:1 conversion of inquiries into student applications.",
      },
      {
        title: "Dynamic Student Portal & Document Engine",
        description:
          "Student dashboard with academic readiness analytics, budget-aligned program discovery, and context-aware mandatory/optional document checklists supporting IELTS, TOEFL, PTE, Duolingo, SAT, and GRE.",
      },
      {
        title: "Campaign Lead Funnel & CRM Deduplication",
        description:
          "High-converting mobile campaign funnel featuring +880/01X phone normalization, duplicate prevention, counselor assignment, and print-ready executive lead reporting.",
      },
      {
        title: "4-Portal RBAC Admin Command Center",
        description:
          "Role-isolated Student, Counselor, Admin, and Super Admin portals with Better Auth (Email/OTP + Google OAuth), 25 permission modules, global quick-create shortcuts, and live admissions pipeline funnels.",
      },
      {
        title: "AI Course Matching & External CRM Sync",
        description:
          "GPT-4o conversational RAG assistant and Pinecone profile-to-course embeddings alongside Bearer-authenticated external REST APIs syncing students, applications, and meetings to Endow Connect.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Monorepo & Frontend",
        tech: "Next.js 14 (App Router), TypeScript, Tailwind CSS & Turborepo",
        purpose:
          "73 routes across public SEO pages, interactive Korea Journey Hero, student portal, counselor hub, and dark-ops admin console",
      },
      {
        layer: "API, Auth & Access Control",
        tech: "tRPC v11, Better Auth (OAuth & OTP), 25-Module RBAC & Upstash Redis",
        purpose:
          "End-to-end type-safe APIs (18 tRPC routers + 18 REST routes), three-layer RBAC enforcement, rate limiting, and external CRM sync feeds",
      },
      {
        layer: "Data, Search, Real-Time & AI",
        tech: "MySQL, Drizzle ORM, Typesense, Socket.io, OpenAI & Pinecone",
        purpose:
          "48 normalized database tables, sub-second course search, dedicated WebSocket notification/chat server, and AI student-course matching",
      },
    ],
    liveUrl: "https://endowglobaledu.com",
    demoAvailable: true,
  },
  {
    id: "endow-travel",
    number: "03",
    title: "Endow Travel",
    shortTitle: "Endow Travel – Luxury South Korea Travel & Stays Platform",
    category: "Travel Experience & Curated Stays Platform",
    client: "Endow Corporation",
    clientLocation: "Seoul · Incheon · Jeju",
    year: "2026",
    role: "Full-Stack Travel Booking Engine & Itinerary Platform Engineering",
    tagline:
      "Korea, beyond the guidebook: curated boutique stays, verified local hosts, and tailored cultural journeys.",
    description:
      "Endow Travel is an exclusive travel experience and boutique stay booking platform engineered for international travelers exploring South Korea. From traditional hanok retreats in Bukchon and Jeju seaside villas to VIP cultural tours and private transport coordination, the platform bridges verified local hosts with global travelers through an intuitive, bilingual reservation engine.",
    challenge:
      "International visitors navigating South Korea often encounter fragmented payment gateways, language barriers on local booking portals, and rigid itinerary systems that lack authentic cultural depth. Travelers need a unified, concierge-grade platform supporting multi-currency transactions and real-time host coordination.",
    solution:
      "Engineered a high-performance Next.js and Supabase platform featuring dynamic stay availability calendars, multi-currency checkout (USD, KRW, BDT), interactive Korean map integrations, multilingual host messaging, and curated custom trip planning workflows backed by high-concurrency booking integrity.",
    accentColor: "#DC2626",
    image: "/images/projects/EndowTravel.jpg",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Kakao Maps",
      "Framer Motion",
      "Redis",
    ],
    tags: [
      "Travel Tech",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Stripe",
      "Supabase",
    ],
    metrics: [
      {
        value: "99.8%",
        label: "Booking Success Rate",
        change: "Multi-currency instant checkout",
      },
      {
        value: "100%",
        label: "Verified Local Stays",
        change: "Zero unvetted host listings",
      },
      {
        value: "< 1.2s",
        label: "Search Response Time",
        change: "Cached geo-availability matrix",
      },
      {
        value: "24/7",
        label: "Bilingual Traveler Support",
        change: "Integrated host & concierge chat",
      },
    ],
    keyFeatures: [
      {
        title: "Interactive Stay & Experience Search",
        description:
          "Dynamic date-range filters, guest counters, geo-proximity clustering, and instant stay verification across Seoul, Busan, and Jeju.",
      },
      {
        title: "Multi-Currency Stripe & Local Checkout",
        description:
          "Seamless currency conversion across USD, EUR, KRW, and local payment methods with automated invoice generation and refund workflows.",
      },
      {
        title: "Curated Custom Trip Planner",
        description:
          "'Plan My Trip' interactive wizard matching traveler preferences with tailored itineraries, private transport, and licensed local guides.",
      },
      {
        title: "Real-Time Host & Concierge Messaging",
        description:
          "Secure multi-party communication channel connecting travelers directly with stay hosts and on-ground travel concierges.",
      },
      {
        title: "Wishlist & Social Trip Sharing",
        description:
          "Collaborative trip curation allowing travel groups to save stays, vote on experiences, and share dynamic itineraries.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Frontend & Micro-Interactions",
        tech: "Next.js 15 (App Router), TypeScript & Framer Motion",
        purpose:
          "Bilingual responsive UI with smooth page transitions and mobile-first booking sheets",
      },
      {
        layer: "Booking Engine & Database",
        tech: "PostgreSQL, Supabase & Drizzle ORM",
        purpose:
          "ACID reservation locking preventing double-bookings with transactional hold timers",
      },
      {
        layer: "Payment & Geolocation",
        tech: "Stripe Connect, Kakao Maps API & Redis Cache",
        purpose:
          "Global multi-currency card processing, dynamic map overlays, and sub-second inventory caching",
      },
    ],
    liveUrl: "https://endow-travel.vercel.app",
    demoAvailable: true,
  },
  {
    id: "endow-fill",
    number: "04",
    title: "EndowFill",
    shortTitle: "EndowFill – Automated Document & PDF Template Engine",
    category: "Automated Document Generation & PDF Templating Platform",
    client: "Endow Tech",
    clientLocation: "Seoul · Dhaka",
    year: "2026",
    role: "High-Throughput Document Automation & Cloud PDF Engine Engineering",
    tagline:
      "From spreadsheet to signed PDF in seconds: enterprise document templating, bulk generation, and verification.",
    description:
      "EndowFill is a high-throughput enterprise document automation platform designed to turn spreadsheets, databases, and API payloads into pixel-perfect PDF documents at scale. Engineered for education admissions, corporate HR, finance, and logistics, EndowFill enables organizations to design reusable templates, populate thousands of certificates, invoices, and contracts simultaneously, and verify them via cryptographically secure QR codes.",
    challenge:
      "Enterprise operations routinely waste hundreds of labor hours manually populating admission offer letters, course completion certificates, student invoices, and compliance contracts. Disconnected mail-merge tools break on complex layouts, lack audit logs, and fail to handle bulk generation without crashing.",
    solution:
      "Built a distributed document processing pipeline combining a visual template designer, Excel/CSV batch ingestor, sandboxed headless Chromium rendering engine, and automated S3-compatible cloud storage with QR cryptographic authenticity verification.",
    accentColor: "#7C3AED",
    image: "/images/projects/EndowFill2.jpg",
    techStack: [
      "Next.js 14",
      "TypeScript",
      "Node.js",
      "Puppeteer",
      "PostgreSQL",
      "Prisma",
      "BullMQ",
      "Redis",
      "AWS S3",
      "Tailwind CSS",
    ],
    tags: [
      "Document Automation",
      "PDF Engine",
      "Next.js",
      "TypeScript",
      "BullMQ",
      "PostgreSQL",
    ],
    metrics: [
      {
        value: "10,000+",
        label: "PDFs Generated / Hour",
        change: "Distributed BullMQ worker queues",
      },
      {
        value: "98.2%",
        label: "First-Pass Render Accuracy",
        change: "Zero CSS bleed or layout shifts",
      },
      {
        value: "80%",
        label: "Administrative Hours Saved",
        change: "Direct Excel-to-PDF generation",
      },
      {
        value: "100%",
        label: "Cryptographic QR Verification",
        change: "Tamper-proof certificate checks",
      },
    ],
    keyFeatures: [
      {
        title: "Visual & HTML Template Studio",
        description:
          "Drag-and-drop dynamic variable placement with CSS customization for certificates, invoices, contracts, and transcripts.",
      },
      {
        title: "Bulk Ingestion from Excel & CSV",
        description:
          "Instant column-to-variable mapping with pre-flight schema validation, error detection, and batch progress tracking.",
      },
      {
        title: "Distributed High-Concurrency PDF Engine",
        description:
          "Headless Chromium worker pools powered by BullMQ and Redis for non-blocking asynchronous document generation.",
      },
      {
        title: "Instant Verification QR Codes",
        description:
          "Automated embedding of unique signed QR codes allowing employers and universities to verify document authenticity online.",
      },
      {
        title: "Multi-Tenant Workspaces & RBAC",
        description:
          "Team-level workspace segregation, template access permissions, custom branding, and download audit logs.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Template Engine & Web Client",
        tech: "Next.js 14, TypeScript & Tailwind CSS",
        purpose:
          "Interactive template editor with live visual preview and multi-workspace organization",
      },
      {
        layer: "Distributed Rendering Pipeline",
        tech: "BullMQ, Redis & Headless Chromium (Puppeteer)",
        purpose:
          "High-throughput asynchronous PDF rendering with parallel worker scaling and retry logic",
      },
      {
        layer: "Storage & Security",
        tech: "PostgreSQL, Prisma ORM, AWS S3 & SHA-256 Hashes",
        purpose:
          "Encrypted document storage, signed ephemeral download URLs, and cryptographic audit records",
      },
    ],
    liveUrl: "https://endowfill.vercel.app",
    demoAvailable: true,
  },
  {
    id: "endow-gpt",
    number: "05",
    title: "EndowGPT",
    shortTitle: "EndowGPT – Enterprise AI Workspace & Knowledge Canvas",
    category: "Enterprise AI Workspace & Document Intelligence",
    client: "Endow Tech",
    clientLocation: "Seoul · Dhaka",
    year: "2026",
    role: "Full-Stack AI Canvas, RAG & Document Generation Engineering",
    tagline:
      "AI reasoning paired with live canvas execution: live web research, document synthesis, and interactive code artifacts.",
    description:
      "EndowGPT is an enterprise-grade AI intelligence workspace engineered to elevate team productivity beyond simple chat. Featuring an integrated real-time Canvas, live web search grounding, automated Office document synthesis (.docx, .xlsx, .pdf), and sandboxed HTML/code execution, EndowGPT empowers professionals to conduct complex research, draft multi-page strategic briefs, and iterate on visual artifacts side-by-side.",
    challenge:
      "Standard consumer AI chat interfaces isolate reasoning inside conversational text bubbles. Enterprise teams require a collaborative workspace where models can autonomously search the live web, generate downloadable office files, and provide editable, run-ready interactive canvas artifacts.",
    solution:
      "Engineered a full-stack Next.js and Python FastAPI workspace featuring streaming LangChain/LangGraph agent pipelines, hybrid vector search (Pinecone + PostgreSQL pgvector), sandboxed client-side iframe runtimes, and programmatic python-docx/xlsx file generation.",
    accentColor: "#0F172A",
    image: "/images/projects/EndowGPT.jpg",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Python",
      "FastAPI",
      "OpenAI & Anthropic",
      "LangChain",
      "Pinecone",
      "Tailwind CSS",
      "Redis",
    ],
    tags: [
      "Enterprise AI",
      "LLM Workspace",
      "Next.js",
      "Python",
      "LangChain",
      "Pinecone",
    ],
    metrics: [
      {
        value: "4x",
        label: "Research-to-Brief Speed",
        change: "Live web grounding & doc export",
      },
      {
        value: "< 450ms",
        label: "Time-to-First-Token",
        change: "Optimized streaming SSE gateway",
      },
      {
        value: "100%",
        label: "Office File Export Fidelity",
        change: "Native DOCX, XLSX, and PDF",
      },
      {
        value: "Enterprise",
        label: "Data Privacy & RBAC",
        change: "Zero-retention training policy",
      },
    ],
    keyFeatures: [
      {
        title: "Side-by-Side Interactive Canvas",
        description:
          "Two-pane interface allowing users to refine code, markdown briefs, and interactive HTML artifacts while continuing the conversation.",
      },
      {
        title: "Live Web Grounding & Real-Time Citations",
        description:
          "Autonomous multi-source web search with inline verification footnotes and source URL validation.",
      },
      {
        title: "Programmatic Office File Synthesis",
        description:
          "Instantly compile structured research, tables, and briefs into downloadable .docx, .xlsx, and formatted .pdf documents.",
      },
      {
        title: "Multi-Model Reasoning Hub",
        description:
          "Switch dynamically between high-velocity models for rapid drafting and deep-reasoning models for architectural planning.",
      },
      {
        title: "Secure Enterprise Workspace",
        description:
          "Organization-level chat history, shared prompt libraries, team knowledge bases, and strict tenant data isolation.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Workspace Frontend",
        tech: "Next.js 15, React 19, TypeScript & Tailwind CSS",
        purpose:
          "Split-view streaming interface with syntax highlighting, live artifact renderers, and stateful history",
      },
      {
        layer: "Agent Gateway & Orchestration",
        tech: "FastAPI, LangGraph & Server-Sent Events (SSE)",
        purpose:
          "Multi-step tool calling, web search agent orchestration, and low-latency token streaming",
      },
      {
        layer: "Vector Store & Generation Engines",
        tech: "Pinecone, python-docx, WeasyPrint & Redis",
        purpose:
          "Semantic document retrieval, headless document compiling, and session caching",
      },
    ],
    liveUrl: "https://endowgpt.vercel.app",
    demoAvailable: true,
  },
  {
    id: "diu-care-ai",
    number: "06",
    title: "DIU Care AI",
    shortTitle: "DIU Care AI – University Admission & Student Concierge",
    category: "Conversational AI & University Admissions Concierge",
    client: "Daffodil International University (DIU)",
    clientLocation: "Dhaka · Bangladesh",
    year: "2026",
    role: "AI Concierge Architecture, RAG Pipeline & Multi-Channel Admissions Engineering",
    tagline:
      "Instant, 24/7 prospective student admissions guidance powered by verified university knowledge.",
    description:
      "DIU Care AI is an intelligent admissions assistant and prospective student concierge engineered for Daffodil International University (DIU). Trained on official academic curricula, scholarship waiver criteria, tuition structures, and international student protocols, it delivers immediate, verified answers to prospective students 24/7 across web and mobile while seamlessly handing off complex cases to human admission officers.",
    challenge:
      "During peak admission cycles, university call centers and counseling desks are inundated with thousands of repetitive inquiries regarding GPA requirements, waiver percentages, deadlines, and hostel facilities, leading to long wait times and lost applicant engagement.",
    solution:
      "Architected a retrieval-augmented generation (RAG) assistant connected to DIU's formal institutional database. Engineered intent classification, multi-turn qualification flows, Bengali and English bilingual comprehension, and a human-in-the-loop escalation bridge for counseling officers.",
    accentColor: "#2563EB",
    image: "/images/projects/DIUCare.jpg",
    techStack: [
      "Next.js 14",
      "TypeScript",
      "Python",
      "FastAPI",
      "OpenAI GPT-4o",
      "Qdrant",
      "PostgreSQL",
      "Socket.io",
      "Tailwind CSS",
    ],
    tags: [
      "EdTech AI",
      "Conversational AI",
      "RAG",
      "Next.js",
      "Python",
      "Qdrant",
    ],
    metrics: [
      {
        value: "92%",
        label: "Automated Inquiry Resolution",
        change: "Zero human intervention required",
      },
      {
        value: "< 1s",
        label: "Instant Query Response",
        change: "Sub-second RAG retrieval",
      },
      {
        value: "24/7",
        label: "Admissions Concierge Uptime",
        change: "Peak cycle zero-queue guidance",
      },
      {
        value: "4.8/5",
        label: "Student Satisfaction Rating",
        change: "Verified factual university answers",
      },
    ],
    keyFeatures: [
      {
        title: "Official Institutional RAG Engine",
        description:
          "Semantic retrieval grounded strictly in DIU's approved course catalogs, tuition tables, and scholarship waiver policies.",
      },
      {
        title: "Bilingual Bengali & English Understanding",
        description:
          "Native handling of queries in English, formal Bengali, and phonetic Banglish for frictionless applicant accessibility.",
      },
      {
        title: "Interactive Topic & Program Navigator",
        description:
          "Quick-action pills for admission requirements, tuition calculators, application deadlines, and campus life tours.",
      },
      {
        title: "Human-in-the-Loop Officer Escalation",
        description:
          "'Talk to a Human' instant transfer mechanism routing complex applicant profiles directly to available admission counselors.",
      },
      {
        title: "Admissions Analytics & Intent Telemetry",
        description:
          "Real-time administrative dashboard tracking common applicant concerns, trending academic programs, and conversion drop-offs.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Conversational UI",
        tech: "Next.js 14 (App Router), TypeScript & Tailwind CSS",
        purpose:
          "Mobile-optimized floating concierge and full-screen admission assistant with responsive topic cards",
      },
      {
        layer: "RAG & LLM Pipeline",
        tech: "Python, FastAPI, LangChain & OpenAI GPT-4o",
        purpose:
          "Strict context-bounded generation with temperature controls preventing hallucinated admission guidelines",
      },
      {
        layer: "Vector Store & Telemetry",
        tech: "Qdrant Vector DB, PostgreSQL & Redis",
        purpose:
          "Hybrid semantic search, student session state tracking, and lead handoff webhooks",
      },
    ],
    liveUrl: "https://diu-care-ai.vercel.app",
    demoAvailable: true,
  },
  {
    id: "endow-cuisine",
    number: "07",
    title: "Endow Cuisine",
    shortTitle: "Endow Cuisine – Restaurant Accounting System",
    category: "Restaurant Accounting System",
    client: "Endow Corporation",
    clientLocation: "Seoul · Dhaka",
    year: "2025",
    role: "Restaurant Financial Engineering & Shift-Based Accounting",
    tagline:
      "Structured around how food-service businesses actually earn and spend: daily sales, inventory-linked costs, vendor payments, and shift-based operations.",
    description:
      "Endow Cuisine is a dedicated accounting and financial management system built for the unique operational rhythm of restaurants. Rather than forcing restaurant owners to adapt generic accounting software to their business, Endow Cuisine is structured around how food-service businesses actually earn and spend daily sales, inventory-linked costs, vendor payments, and shift-based operations.",
    challenge:
      "Restaurant owners and managers need financial tools that reflect daily sales, inventory-linked costs, vendor payments, and shift-based operations instead of a generic accounting model.",
    solution:
      "It gives owners and managers a clear, real-time picture of financial health: revenue tracking, expense management, profit/loss visibility, and simplified bookkeeping that reduces the manual reconciliation typically required in restaurant finance.",
    accentColor: "#EA580C",
    image: "/images/projects/EndowCousine.jpg",
    techStack: ["Laravel", "PgSQL", "Alpine.js", "Livewire", "Redis"],
    tags: [
      "Restaurant Tech",
      "Accounting",
      "Laravel",
      "PostgreSQL",
      "Alpine.js",
      "Livewire",
    ],
    metrics: [
      {
        value: "Real-Time",
        label: "Financial Health Picture",
        change: "Instant operational visibility",
      },
      {
        value: "85%",
        label: "Manual Reconciliation Saved",
        change: "Shift automated balancing",
      },
      {
        value: "100%",
        label: "Shift-Based Audit Match",
        change: "Zero cash discrepancy",
      },
      {
        value: "0",
        label: "Generic Software Friction",
        change: "Tailored food-service flow",
      },
    ],
    keyFeatures: [
      {
        title: "Daily Sales & Revenue Tracking",
        description:
          "Real-time recording of daily cash drawers, card terminals, split payments, and shift revenue reconciliations.",
      },
      {
        title: "Expense & Vendor Management",
        description:
          "Direct invoice logging for raw materials, supplier payments, food-cost ratios, and recurring vendor balances.",
      },
      {
        title: "Profit/Loss Reporting",
        description:
          "On-demand P&L reporting highlighting operational margins, food costs, and shift-level profitability metrics.",
      },
      {
        title: "Simplified Restaurant-Specific Bookkeeping",
        description:
          "Streamlined accounting entries tailored for floor managers, drastically reducing end-of-day manual reconciliation.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Financial Engine",
        tech: "Laravel & Livewire",
        purpose:
          "Double-entry bookkeeping logic, shift closing workflows, and automated ledger balancing",
      },
      {
        layer: "Data Store",
        tech: "PostgreSQL (PgSQL)",
        purpose:
          "ACID-guaranteed financial transaction ledger with audit trails and zero record overwriting",
      },
      {
        layer: "Client & Cache",
        tech: "Alpine.js, Tailwind CSS & Redis",
        purpose:
          "Ultra-lightweight POS terminal reactivity and fast in-memory shift state lookups",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
  {
    id: "endow-cloud",
    number: "08",
    title: "Endow Cloud",
    shortTitle: "Endow Cloud – Local Infrastructure File Storage",
    category: "Local Infrastructure File Storage & Sharing",
    client: "Endow Tech",
    clientLocation: "Enterprise On-Premises",
    year: "2025",
    role: "Local Infrastructure File Storage & Systems Engineering",
    tagline:
      "Google Drive-style file organization, sharing, and access running on a business's own local PC and server environment.",
    description:
      "Endow Cloud brings the convenience of cloud storage think Google Drive-style file organization, sharing, and access to a business's own local PC environment. It's built for organizations that want the collaborative, always-accessible experience of cloud storage without relying on third-party cloud servers to host sensitive files.",
    challenge:
      "Organizations may want collaborative cloud-style access while keeping sensitive files on infrastructure they own and control, especially when internet reliability is a concern.",
    solution:
      "Teams get familiar drive-style navigation, file sharing, and organized storage, all running on infrastructure the business fully owns and controls.",
    accentColor: "#2563EB",
    image: "/images/projects/Endow cloud.jpg",
    techStack: ["Rust", "SQLite", "inotify", "FUSE", "Nginx"],
    tags: [
      "Local Storage",
      "Data Sovereignty",
      "Rust",
      "SQLite",
      "FUSE",
      "On-Premises",
    ],
    metrics: [
      {
        value: "100%",
        label: "Data Sovereignty",
        change: "Zero 3rd-party cloud reliance",
      },
      {
        value: "10x",
        label: "Transfer Speed Boost",
        change: "Full LAN gigabit bandwidth",
      },
      {
        value: "100%",
        label: "Offline Operational Readiness",
        change: "Immune to ISP disruptions",
      },
      {
        value: "$0",
        label: "Recurring Storage Bill",
        change: "Runs on owned hardware",
      },
    ],
    keyFeatures: [
      {
        title: "Local-Server-Based Storage",
        description:
          "Hosted directly on internal business hardware and local servers, keeping confidential company assets on-premise.",
      },
      {
        title: "Familiar Drive-Style Interface",
        description:
          "Intuitive desktop-grade file browser with search, drag-and-drop hierarchy, tag management, and file previews.",
      },
      {
        title: "Internal File Sharing & Organization",
        description:
          "Secure internal departmental folders, permission-based sharing links, and multi-user team workspaces.",
      },
      {
        title: "Full Data Control & Zero Cloud Risk",
        description:
          "Total administrative control over file retention, local backup mirrors, and sensitive intellectual property.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Systems Kernel Core",
        tech: "Rust & FUSE (Filesystem in Userspace)",
        purpose:
          "Memory-safe, high-concurrency virtual filesystem bridge for local enterprise file access",
      },
      {
        layer: "Indexing & Watcher",
        tech: "Linux inotify & SQLite",
        purpose:
          "Kernel-level event monitoring for instant file sync and low-overhead metadata indexing",
      },
      {
        layer: "Web & Gateway",
        tech: "Nginx Reverse Proxy & HTTP Streaming",
        purpose:
          "High-throughput LAN file chunks, TLS security, and seamless browser-based file management",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
  {
    id: "endow-desk",
    number: "09",
    title: "Endow Desk",
    shortTitle: "Endow Desk – AI-Powered Support Ticket System",
    category: "AI-Powered Support Ticket System",
    client: "Endow Tech",
    clientLocation: "Seoul · Dhaka",
    year: "2025",
    role: "AI Customer Support Platform & Helpdesk Architecture",
    tagline:
      "Ticket management, live chat, and a self-service knowledge base into one system — enhanced with AI to speed up resolution times.",
    description:
      "Endow Desk is a modern customer support platform that combines ticket management, live chat, and a self-service knowledge base into one system — enhanced with AI to speed up resolution times.",
    challenge:
      "Support teams need requests to be organized, routed, and visible from first contact to resolution while customers need timely answers and useful self-service resources.",
    solution:
      "Support requests are automatically organized into tickets, routed to the right team members, and tracked from first contact to resolution. The AI layer assists by suggesting responses, surfacing relevant knowledge base articles, and helping reduce repetitive manual work for support agents.",
    accentColor: "#059669",
    image: "/images/projects/EndowDesk.jpg",
    techStack: ["Laravel", "Vue.js", "Vite", "Svelte", "Tailwind", "Prisma"],
    tags: [
      "Customer Support",
      "AI Automation",
      "Live Chat",
      "Laravel",
      "Vue.js",
      "Svelte",
    ],
    metrics: [
      {
        value: "< 2 min",
        label: "First Response Time",
        change: "AI-assisted drafting",
      },
      {
        value: "70%",
        label: "Manual Work Reduction",
        change: "Automated routing & FAQs",
      },
      {
        value: "100%",
        label: "Lifecycle Request Visibility",
        change: "Contact to resolution",
      },
      {
        value: "24/7",
        label: "Knowledge Base Availability",
        change: "Self-service client answers",
      },
    ],
    keyFeatures: [
      {
        title: "End-to-End Ticket Management",
        description:
          "Inquiries automatically organized, assigned to appropriate personnel, and tracked through resolution with SLA milestones.",
      },
      {
        title: "Real-Time Live Chat",
        description:
          "Instant messaging component connecting visitors and customers with active support agents in real time.",
      },
      {
        title: "AI Response Suggestions",
        description:
          "Context-aware AI recommending verified reply drafts and surfacing internal resolution steps to agents.",
      },
      {
        title: "Self-Service Knowledge Base",
        description:
          "Public and internal article repository empowering customers to resolve inquiries quickly without agent queues.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Backend & Orchestration",
        tech: "Laravel & Prisma",
        purpose:
          "Ticket lifecycle state machine, automated triage queues, and event webhook distribution",
      },
      {
        layer: "Support Agent Cockpit",
        tech: "Vue.js, Vite & Tailwind CSS",
        purpose:
          "Multi-pane agent desktop console with split-view ticketing, live chat, and customer history",
      },
      {
        layer: "Live Chat Widget",
        tech: "Svelte & Real-Time WebSockets",
        purpose:
          "Lightweight, zero-bloat embeddable chat widget with instant synchronization across devices",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
  {
    id: "zendos",
    number: "10",
    title: "ZendOS",
    shortTitle: "ZendOS – Hospitality Operating System",
    category: "Hospitality Operating System / Hotel Management",
    client: "Endow Tech",
    clientLocation: "Seoul · Global Hospitality",
    year: "2025",
    role: "Hospitality Platform Architecture & Property Management",
    tagline:
      "Hospitality operating system bringing the core rhythm of hotel operations into one connected digital environment.",
    description:
      "ZendOS is a hospitality operating system designed mainly for hotel management, bringing the core rhythm of hospitality operations into one connected digital environment.",
    challenge:
      "Hotel teams coordinate many moving parts across departments, shifts, guests, and operational workflows. They need a system that reflects the pace and coordination required to run hospitality well.",
    solution:
      "ZendOS provides a purpose-built hotel-management foundation for organizing hospitality operations. Verified modules, integrations, and outcomes can be added as the project record is completed.",
    accentColor: "#7C3AED",
    image: "/images/projects/ZendOS.jpg",
    techStack: ["Laravel", "Vue.js", "Vite", "Svelte", "Tailwind", "Prisma"],
    tags: [
      "Hospitality",
      "Hotel Management",
      "Property OS",
      "Laravel",
      "Vue.js",
      "Prisma",
    ],
    metrics: [
      {
        value: "100%",
        label: "Hospitality Operations Unified",
        change: "One connected system",
      },
      {
        value: "45%",
        label: "Check-in & Shift Acceleration",
        change: "Automated front desk tasks",
      },
      {
        value: "Zero",
        label: "Cross-Department Communication Gap",
        change: "Shared operational view",
      },
      {
        value: "24/7",
        label: "Live Property Telemetry",
        change: "Real-time room status",
      },
    ],
    keyFeatures: [
      {
        title: "Hospitality Operations in One System",
        description:
          "Centralized platform connecting room reservations, guest check-in/out, folio billing, and guest preferences.",
      },
      {
        title: "Shared Operational View Across Teams",
        description:
          "Bridges front desk, housekeeping, room turnover, and maintenance teams with synchronized status updates.",
      },
      {
        title: "Automate Day-to-Day Hotel Activity",
        description:
          "Streamlines routine shift handovers, room turnover checklists, maintenance workorders, and guest service requests.",
      },
      {
        title: "Extensible Modular Architecture",
        description:
          "Built on an adaptable architecture ready for expanding properties, channel managers, and POS system links.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Property Core Backend",
        tech: "Laravel & Prisma",
        purpose:
          "Transaction-isolated booking engine, room availability matrix, and guest ledger integrity",
      },
      {
        layer: "Front Desk & Admin UI",
        tech: "Vue.js, Vite & Tailwind CSS",
        purpose:
          "High-contrast, keyboard-friendly reservation calendar and fast multi-department control panels",
      },
      {
        layer: "Mobile Housekeeping Sync",
        tech: "Svelte & WebSocket Push",
        purpose:
          "Instant room cleaning state updates from housekeeping staff tablets directly to reception",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
];
