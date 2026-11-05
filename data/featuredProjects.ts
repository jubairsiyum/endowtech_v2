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
    id: "endow-portal",
    number: "01",
    title: "Endow Global Admissions & Visa Pipeline",
    shortTitle: "Endow Global – Admissions & Visa Pipeline",
    category: "EdTech & Cross-Border Mobility",
    client: "Endow Global Education",
    clientLocation: "Seoul · Helsinki · Dhaka",
    year: "2025 – 2026",
    role: "Full-Stack Enterprise Architecture & Engineering",
    tagline:
      "End-to-end applicant tracking, credential verification, and visa checkpoint engine.",
    description:
      "A mission-critical applicant management platform engineered to replace fragmented email exchanges and manual spreadsheets. Consolidates student registration, apostille verification, document evaluation, and embassy visa milestone tracking across universities in South Korea and Finland.",
    challenge:
      "Managing thousands of cross-border applicant dossiers with sensitive passports, academic transcripts, and apostille certifications across changing embassy requirements in Seoul and Helsinki without data loss or processing delays.",
    solution:
      "Built a high-security Next.js App Router and PostgreSQL architecture with client-side document encryption, automated OCR validation, counselor round-robin workflows, and embassy milestone countdown notifications.",
    accentColor: "#DC2626",
    image: "/images/projects/endow-portal.png",
    techStack: [
      "Next.js App Router",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Tailwind CSS",
      "Document Encryption",
    ],
    tags: ["EdTech", "Mobility Engine", "Next.js", "PostgreSQL"],
    metrics: [
      { value: "5,000+", label: "Applicants Processed", change: "+140% YoY" },
      {
        value: "78%",
        label: "File Processing Speedup",
        change: "From 14d to 3d",
      },
      {
        value: "99.98%",
        label: "Platform Uptime SLA",
        change: "Zero Downtime",
      },
      { value: "0", label: "Lost Documents", change: "100% Audit Tracked" },
    ],
    keyFeatures: [
      {
        title: "Applicant Self-Service Portal",
        description:
          "Real-time visual milestone timeline allowing students to track embassy file submission, apostille status, and visa interview readiness.",
      },
      {
        title: "AES-256 Encrypted Document Vault",
        description:
          "Immutable document storage with versioning, cryptographic checksums, and granular counselor access audit logs.",
      },
      {
        title: "Automated Embargo & Deadline Alerting",
        description:
          "Intelligent cron scheduling watching university application deadlines and embassy interview intake windows with instant WhatsApp notifications.",
      },
      {
        title: "Multi-Tier Role Isolation",
        description:
          "Strict RBAC granting isolated workspaces for Students, Educational Counselors, Branch Directors, and Global HQ Executives.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Frontend & UI",
        tech: "Next.js 16 (Turbopack), Tailwind CSS, Framer Motion",
        purpose:
          "Sub-second page navigation and responsive mobile-first portal",
      },
      {
        layer: "Data & Storage",
        tech: "PostgreSQL, Prisma, AWS S3 with SSE-KMS",
        purpose:
          "ACID transactions for student records and encrypted file storage",
      },
      {
        layer: "Security & Auth",
        tech: "Auth.js, JWT with Rotational Refresh Tokens, Webhooks",
        purpose: "Zero-trust session validation across branch IP ranges",
      },
    ],
    liveUrl: "https://endowglobal.dev",
    demoAvailable: true,
  },
  {
    id: "unimatch-ai",
    number: "02",
    title: "UniMatch AI Recommendation Engine",
    shortTitle: "UniMatch – AI University Matching Engine",
    category: "AI & Algorithmic Decision Support",
    client: "Endow Corporation",
    clientLocation: "Gangnam, Seoul",
    year: "2025",
    role: "Vector Search, ML Pipeline & Web Platform",
    tagline:
      "Algorithmic admissions matching and predictive scholarship scoring.",
    description:
      "A vector-powered recommendation system that evaluates candidate academic profiles (GPA, IELTS/TOPIK scores, research publications, budget limits) against global university admissions matrices and national scholarship criteria (GKS Korea, Finland Government Grants).",
    challenge:
      "Matching prospective students with over 300 international degree programs where entrance thresholds and financial aid quotas fluctuate each semester, requiring instant multi-parameter scoring.",
    solution:
      "Designed a vector embedding and semantic scoring engine leveraging FastAPI and Redis caching. Delivers multi-criteria ranking in under 2 seconds with explanation rationales for counseling advisors.",
    accentColor: "#2563EB",
    image: "/images/projects/unimatch-ai.png",
    techStack: [
      "FastAPI",
      "Vector Embeddings",
      "Next.js 16",
      "Redis Cache",
      "Tailwind CSS",
      "Python",
    ],
    tags: ["AI Search", "Vector Embeddings", "FastAPI", "Next.js 16"],
    metrics: [
      {
        value: "94%",
        label: "Admissions Match Accuracy",
        change: "Empirical validation",
      },
      {
        value: "42%",
        label: "Higher Acceptance Rate",
        change: "Vs. manual matching",
      },
      {
        value: "< 1.8s",
        label: "Average Query Latency",
        change: "P95 response time",
      },
      {
        value: "300+",
        label: "Degree Matrices Tracked",
        change: "Seoul & Nordic",
      },
    ],
    keyFeatures: [
      {
        title: "Dynamic Profile Deficiency Detection",
        description:
          "Instantly identifies missing prerequisites, insufficient test scores, or financial gaps, suggesting targeted remedial actions.",
      },
      {
        title: "Scholarship Probability Matrix",
        description:
          "Calculates probability percentiles for GKS Korean Government Scholarship and Finnish tuition waivers based on historical student acceptances.",
      },
      {
        title: "Comparative Living & Tuition Ledger",
        description:
          "Side-by-side cost breakdown modeling semester tuition, dormitory fees, insurance, and post-study work visa rights.",
      },
      {
        title: "One-Click Dossier Pipeline Export",
        description:
          "Seamlessly transitions approved recommendations directly into the Endow Admissions Pipeline for immediate processing.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Inference Engine",
        tech: "Python, FastAPI, SentenceTransformers, FAISS",
        purpose:
          "Dense vector representations of student CVs and university requirements",
      },
      {
        layer: "Caching Layer",
        tech: "Redis Enterprise In-Memory",
        purpose:
          "Sub-millisecond retrieval of pre-computed university matrix lookups",
      },
      {
        layer: "Web Interface",
        tech: "Next.js, TypeScript, Tailwind CSS, Lucide",
        purpose:
          "Interactive radar charts and dynamic scholarship comparison tables",
      },
    ],
    liveUrl: "https://unimatch.endowtech.dev",
    demoAvailable: true,
  },
  {
    id: "leadflow-crm",
    number: "03",
    title: "LeadFlow CRM & Workflow Hub",
    shortTitle: "LeadFlow – Multi-Tenant Operations Suite",
    category: "Enterprise Operations & SaaS",
    client: "Endow Group Operations",
    clientLocation: "Seoul & Dhaka Studios",
    year: "2025",
    role: "Full-Lifecycle CRM Product Architecture",
    tagline:
      "Omnichannel inquiry ingestion and automated counselor assignment suite.",
    description:
      "A purpose-built multi-tenant CRM that unifies high-velocity leads from official WhatsApp Business APIs, student seminar check-ins, and website inquiry forms with automated round-robin routing and real-time conversion telemetry.",
    challenge:
      "Counselors were losing lead momentum across disparate personal messaging apps and manual registers, resulting in delayed first responses and zero accountability between Seoul and Dhaka teams.",
    solution:
      "Constructed a unified messaging backend integrating the official Meta WhatsApp Cloud API with webhook event brokers, automated round-robin routing, and SLA escalation alerts.",
    accentColor: "#059669",
    image: "/images/projects/leadflow-crm.png",
    techStack: [
      "Node.js",
      "WhatsApp Cloud API",
      "PostgreSQL",
      "Docker",
      "Webhooks",
      "Tailwind CSS",
    ],
    tags: ["Operations", "WhatsApp API", "Node.js", "Docker"],
    metrics: [
      { value: "100K+", label: "Leads Ingested & Routed", change: "Zero loss" },
      {
        value: "< 4 min",
        label: "Average First Response",
        change: "Down from 3.5 hrs",
      },
      {
        value: "3.4x",
        label: "Consultation Conversion",
        change: "Qualified appointments",
      },
      {
        value: "48",
        label: "Active Counselors Managed",
        change: "Across 2 countries",
      },
    ],
    keyFeatures: [
      {
        title: "Native WhatsApp Cloud Ingestion",
        description:
          "Two-way synchronized inbox supporting audio notes, document previews, template broadcasts, and quick reply triggers.",
      },
      {
        title: "Automated Round-Robin Counselor Dispatch",
        description:
          "Distributes incoming inquiries according to language capability, target destination, and counselor real-time workload capacity.",
      },
      {
        title: "Intelligent SLA Breach Warning",
        description:
          "Escalates unattended inquiries to senior branch supervisors if an uncontacted lead exceeds the 10-minute response threshold.",
      },
      {
        title: "Multi-Branch Executive Telemetry",
        description:
          "Provides management in Seoul with real-time conversion funnels, call completion logs, and counselor closing rates across Dhaka.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Event Pipeline",
        tech: "Node.js, Express, Redis Pub/Sub, Webhook Ingestion",
        purpose:
          "Zero-loss buffering of high-frequency WhatsApp message webhooks",
      },
      {
        layer: "Container Infrastructure",
        tech: "Docker, Traefik Reverse Proxy, Linux Alpine",
        purpose:
          "Multi-tenant isolation and predictable deployment environments",
      },
      {
        layer: "Database",
        tech: "PostgreSQL with Row-Level Security (RLS)",
        purpose:
          "Strict multi-branch data segregation preventing cross-branch lead leakage",
      },
    ],
    liveUrl: "https://leadflow.endowtech.dev",
    demoAvailable: true,
  },
  {
    id: "fintech-gateway",
    number: "04",
    title: "Cross-Border Tuition & Payment Gateway",
    shortTitle: "FinTech Hub – Cross-Border Settlement",
    category: "FinTech & Banking Infrastructure",
    client: "Global Higher Education Partners",
    clientLocation: "Seoul · Frankfurt · London",
    year: "2024 – 2025",
    role: "Financial Engineering & Security Hardening",
    tagline:
      "Cross-border educational fee reconciliation and multi-currency billing gateway.",
    description:
      "A banking-grade tuition settlement module engineered to handle multi-currency payments, international student escrow agreements, automated invoicing, and foreign exchange compliance for universities in South Korea and the EU.",
    challenge:
      "International wire transfers suffer from opaque bank fees, currency depreciation risks, and manual cross-referencing delays that frequently cause missed university tuition enrollment deadlines.",
    solution:
      "Engineered an automated multi-currency checkout engine integrated with Stripe Connect and SWIFT transaction reconciliation hooks, providing students with fixed locked-in exchange rates and instant receipt generation.",
    accentColor: "#D97706",
    image: "/images/projects/fintech-gateway.png",
    techStack: [
      "Stripe Connect",
      "Next.js App Router",
      "PostgreSQL",
      "Audit Trail",
      "Webhooks",
      "Tailwind CSS",
    ],
    tags: ["FinTech", "Stripe Connect", "Banking SLA", "Next.js"],
    metrics: [
      {
        value: "$3.2M+",
        label: "International Tuition Settled",
        change: "Zero loss",
      },
      {
        value: "100%",
        label: "Bank Reconciliation Match",
        change: "Zero human error",
      },
      {
        value: "Zero",
        label: "Settlement Disputes",
        change: "Guaranteed audit",
      },
      {
        value: "14",
        label: "Supported Currencies",
        change: "KRW, EUR, USD, BDT",
      },
    ],
    keyFeatures: [
      {
        title: "Real-Time FX Rate Freezing",
        description:
          "Locks international currency exchange rates for a 60-minute window, protecting students and parents against mid-transaction slippage.",
      },
      {
        title: "Automated University Receipt Issuance",
        description:
          "Generates tamper-proof PDF settlement certificates accepted by immigration authorities and university registrar offices.",
      },
      {
        title: "Regulatory Anti-Money Laundering (AML) Checks",
        description:
          "Automated sanction list screening and compliance verification before fund dispatching to university clearing accounts.",
      },
      {
        title: "Double-Entry Cryptographic Ledger",
        description:
          "Immutable accounting ledger ensuring balance continuity across multiple fiat accounts and partner clearing houses.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Payment Processing",
        tech: "Stripe Connect Custom Accounts, SWIFT MT103 Parsers",
        purpose:
          "Direct institutional bank routing with automated settlement confirmations",
      },
      {
        layer: "Security & Auditing",
        tech: "HMAC Signature Verification, TLS 1.3, Vault Secret Management",
        purpose: "PCI-DSS Level 1 compliant financial data processing",
      },
      {
        layer: "Accounting Engine",
        tech: "PostgreSQL Append-Only Ledger Tables with Trigger Constraints",
        purpose:
          "Strict mathematical audit guarantees with zero state overwrites",
      },
    ],
    liveUrl: "https://payments.endowtech.dev",
    demoAvailable: true,
  },
  {
    id: "connectbridge-api",
    number: "05",
    title: "ConnectBridge University Integration API",
    shortTitle: "ConnectBridge – University API Gateway",
    category: "Enterprise System Integration",
    client: "International University Consortium",
    clientLocation: "Nordics & East Asia",
    year: "2025",
    role: "API Gateway Architecture & Integration",
    tagline:
      "High-throughput API gateway synchronizing international student dossiers.",
    description:
      "A high-throughput, low-latency API gateway that bridges proprietary university student information systems (SIS) with international recruitment desks, enabling automated application status synchronization and biometric file validation.",
    challenge:
      "Legacy university registrar systems rely on antiquated SOAP protocols, batch CSV exports, and restrictive rate limits that prevented real-time applicant status updates.",
    solution:
      "Engineered an event-driven middleware layer with protocol translation, circuit breaker resilience, and asynchronous job queues that normalize legacy university data into standardized JSON payloads.",
    accentColor: "#E11D48",
    image: "/images/projects/connectbridge-api.png",
    techStack: [
      "Go / Node.js",
      "GraphQL / REST",
      "Kafka / BullMQ",
      "Redis",
      "Docker",
      "OpenAPI 3.1",
    ],
    tags: ["API Gateway", "Middleware", "Kafka", "Low-Latency"],
    metrics: [
      {
        value: "1.2M+",
        label: "Monthly API Invocations",
        change: "99.99% success",
      },
      {
        value: "< 45ms",
        label: "Gateway Mediation Overhead",
        change: "Ultra low latency",
      },
      {
        value: "45+",
        label: "Partner Institutions Integrated",
        change: "Growing monthly",
      },
      {
        value: "100%",
        label: "Schema Validation Rate",
        change: "Zero payload drift",
      },
    ],
    keyFeatures: [
      {
        title: "Bidirectional Registrar Synchronization",
        description:
          "Real-time status propagation between campus SIS databases and student applicant portals without manual counselor intervention.",
      },
      {
        title: "Intelligent Circuit Breaker & Backoff",
        description:
          "Prevents downstream legacy university servers from degradation during sudden surges in application submission deadlines.",
      },
      {
        title: "Developer Portal with Interactive Sandbox",
        description:
          "Complete interactive documentation and test mock environments allowing partner institutions to integrate in under 48 hours.",
      },
      {
        title: "Biometric & Document Hash Validation",
        description:
          "Validates document SHA-256 hashes against original issuing authorities to prevent forged educational credentials.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Gateway Core",
        tech: "Go & Node.js Microservices, Envoy Proxy",
        purpose:
          "High-concurrency reverse proxy handling TLS termination and rate limiting",
      },
      {
        layer: "Message Queue",
        tech: "BullMQ on Redis Enterprise Cluster",
        purpose:
          "Guaranteed at-least-once delivery for mission-critical registrar webhooks",
      },
      {
        layer: "Observability",
        tech: "OpenTelemetry, Prometheus, Grafana Dashboards",
        purpose:
          "Real-time latency histograms and anomaly detection on external endpoints",
      },
    ],
    liveUrl: "https://api.endowtech.dev",
    demoAvailable: true,
  },
  {
    id: "launchmetrics-bi",
    number: "06",
    title: "LaunchMetrics Executive Analytics & BI",
    shortTitle: "LaunchMetrics – Global Intelligence BI",
    category: "Executive Telemetry & Big Data",
    client: "Endow Corporation Board",
    clientLocation: "Seoul HQ",
    year: "2025 – 2026",
    role: "Data Engineering & Interactive Dashboard UI",
    tagline:
      "Real-time admissions telemetry, predictive intake yields, and counselor KPI cockpit.",
    description:
      "A real-time executive dashboard cockpit engineered for C-suite leadership in Seoul. Aggregates live student intake velocity, visa approval trends, country-specific attrition bottlenecks, and counselor conversion efficiency across multiple global territories.",
    challenge:
      "Executive decision-makers lacked unified visibility across international branches, relying on delayed monthly reports that masked emerging visa rejection anomalies and marketing campaign underperformance.",
    solution:
      "Created an interactive WebGL and SVG analytical cockpit delivering sub-minute admissions telemetry, interactive cohort Sankey diagrams, and predictive enrollment forecasting.",
    accentColor: "#7C3AED",
    image: "/images/projects/launchmetrics-bi.png",
    techStack: [
      "Next.js App Router",
      "ClickHouse / PostgreSQL",
      "Apache ECharts",
      "Tailwind CSS",
      "TypeScript",
    ],
    tags: ["BI Analytics", "Data Telemetry", "ClickHouse", "Next.js"],
    metrics: [
      {
        value: "100%",
        label: "Real-Time Data Freshness",
        change: "< 30s pipeline",
      },
      {
        value: "32%",
        label: "Yield Forecasting Improvement",
        change: "Vs. quarterly models",
      },
      {
        value: "6",
        label: "Executive Territorials Monitored",
        change: "Unified cockpit",
      },
      {
        value: "4.8/5",
        label: "Executive Leadership Adoption",
        change: "Daily active use",
      },
    ],
    keyFeatures: [
      {
        title: "Interactive Visa Funnel Sankey Diagrams",
        description:
          "Visualizes the journey of applicants from initial WhatsApp inquiry through embassy visa issuance to identify conversion leaks.",
      },
      {
        title: "Predictive University Intake Yields",
        description:
          "Machine learning trend extrapolation calculating expected autumn/spring semester enrollment figures based on active offer letters.",
      },
      {
        title: "Real-Time Branch Performance Telemetry",
        description:
          "Compares counselor consultation velocity, first-response SLAs, and enrollment close rates between Seoul, Dhaka, and partner offices.",
      },
      {
        title: "Automated Executive Briefing PDFs",
        description:
          "Scheduled Monday morning high-resolution summaries dispatched automatically to the Board of Directors.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Analytical Datastore",
        tech: "ClickHouse Columnar Database",
        purpose:
          "Instant aggregation across millions of historical events and admissions records",
      },
      {
        layer: "Visualization Engine",
        tech: "Apache ECharts, Canvas API, Tailwind CSS",
        purpose:
          "Smooth 60fps interactive charts, geo maps, and cohort heatmaps",
      },
      {
        layer: "Security & Governance",
        tech: "Hardware-Backed 2FA, IP Whitelisting, Dynamic Watermarking",
        purpose:
          "Strict confidentiality enforcement for high-level corporate metrics",
      },
    ],
    liveUrl: "https://bi.endowtech.dev",
    demoAvailable: true,
  },
];
