import { Service } from "@/types";

export const coreServices: Service[] = [
  {
    id: "web-engineering",
    title: "Enterprise Web Applications",
    description:
      "High-performance full-stack web applications engineered with Next.js, React, and TypeScript. Optimized for sub-second page loads, accessible UI design, and maximum Core Web Vitals.",
    deliverables: [
      "Next.js App Router Architecture",
      "Pixel-Perfect Responsive UI/UX",
      "Server-Side Rendering & Edge Caching",
      "Comprehensive SEO & Structured Data",
    ],
    iconName: "Code",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "saas-platforms",
    title: "SaaS & Multi-Tenant Platforms",
    description:
      "Turnkey SaaS architecture built to scale from MVP to enterprise tiers. We engineer authentication, multi-tenant database isolation, billing subscriptions, and administrative analytics.",
    deliverables: [
      "Multi-Tenant Data Isolation & RBAC",
      "Stripe & International Payment Gateways",
      "Real-Time Dashboards & Telemetry",
      "Automated Onboarding Workflows",
    ],
    iconName: "Layers",
    tags: ["SaaS", "Stripe", "Prisma", "PostgreSQL"],
  },
  {
    id: "student-portals",
    title: "Student & Academic Portals",
    description:
      "Custom educational portals for universities, study-abroad consultancies, and EdTech startups. Document verification, progress tracking, and parent/counselor communication modules.",
    deliverables: [
      "Applicant Self-Service Portals",
      "Encrypted Document Upload Vault",
      "Milestone Tracking & Notifications",
      "Counselor Activity & Audit Logs",
    ],
    iconName: "GraduationCap",
    tags: ["EdTech", "Document Vault", "Portals", "Audit Logs"],
  },
  {
    id: "api-integration",
    title: "API & Systems Integration",
    description:
      "Connect internal tools, payment gateways, and third-party SaaS services with robust REST/GraphQL APIs, distributed message queues, and bulletproof webhooks.",
    deliverables: [
      "High-Throughput REST & GraphQL APIs",
      "Webhook Ingestion & Idempotency",
      "Legacy System Modernization",
      "Third-Party CRM & ERP Connectors",
    ],
    iconName: "Network",
    tags: ["REST", "GraphQL", "Webhooks", "Microservices"],
  },
  {
    id: "ai-automation",
    title: "AI Workflows & Matching Engines",
    description:
      "Integrate modern AI capabilities into your business workflows. Semantic search, document parsing, automated qualification scoring, and customer service bots.",
    deliverables: [
      "Vector Search & RAG Implementations",
      "Automated Document OCR & Validation",
      "Algorithmic Profile Matching",
      "Intelligent WhatsApp Conversational Bots",
    ],
    iconName: "Sparkles",
    tags: ["AI/LLM", "Vector DB", "Automation", "Python"],
  },
  {
    id: "cloud-devops",
    title: "Cloud DevOps & Site Reliability",
    description:
      "Containerized infrastructure, zero-downtime CI/CD pipelines, automated backups, and 24/7 monitoring to guarantee 99.9% uptime and enterprise compliance.",
    deliverables: [
      "Docker & Container Orchestration",
      "Automated GitHub Actions CI/CD",
      "Zero-Downtime Blue/Green Deploys",
      "Proactive Monitoring & Error Tracking",
    ],
    iconName: "ShieldCheck",
    tags: ["AWS", "Docker", "Vercel", "CI/CD"],
  },
];
