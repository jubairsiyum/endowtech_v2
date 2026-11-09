import { TechCategory, TechItem, TechPillar } from "@/types";

export const techPillars: TechPillar[] = [
  {
    id: "web",
    index: "01",
    title: "Web Technologies",
    subgroups: [
      {
        id: "frontend",
        label: "Frontend",
        layout: "grid-3",
        techs: [
          {
            id: "nextjs",
            name: "Next.js",
            icon: "https://cdn.simpleicons.org/nextdotjs/dc2626",
            role: "Frontend",
            isCore: true,
            description:
              "Primary React meta-framework powering our SEO-critical enterprise portals, App Router SSR, and edge-cached web products.",
          },
          {
            id: "react",
            name: "React",
            icon: "https://cdn.simpleicons.org/react/dc2626",
            role: "Frontend",
            isCore: true,
            description:
              "Component-driven UI engineering for interactive SaaS cockpits, real-time analytics dashboards, and design systems.",
          },
          {
            id: "vuejs",
            name: "Vue.js",
            icon: "https://cdn.simpleicons.org/vuedotjs/dc2626",
            role: "Frontend",
            isCore: true,
            description:
              "Reactive client layer driving Endow Connect CRM, Endow Desk agent workspaces, and ZendOS hospitality consoles.",
          },
          {
            id: "typescript",
            name: "TypeScript",
            icon: "https://cdn.simpleicons.org/typescript/dc2626",
            role: "Frontend",
            isCore: true,
            description:
              "Strict end-to-end static typing across API contracts, UI components, and shared domain validation schemas.",
          },
          {
            id: "angular",
            name: "Angular",
            icon: "https://cdn.simpleicons.org/angular/dc2626",
            role: "Frontend",
            isCore: false,
            description:
              "Enterprise-grade structured web architecture for large organizational portals and long-lifecycle client teams.",
          },
          {
            id: "tailwind",
            name: "Tailwind CSS",
            icon: "https://cdn.simpleicons.org/tailwindcss/dc2626",
            role: "Frontend",
            isCore: true,
            description:
              "Tokenized utility design system enabling rapid, accessible, and pixel-consistent responsive interfaces.",
          },
        ],
      },
      {
        id: "backend",
        label: "Backend",
        layout: "grid-3",
        techs: [
          {
            id: "nodejs",
            name: "Node.js",
            icon: "https://cdn.simpleicons.org/nodedotjs/dc2626",
            role: "Backend",
            isCore: true,
            description:
              "High-concurrency API services, webhook ingestion pipelines, and real-time WebSocket event brokers.",
          },
          {
            id: "laravel",
            name: "Laravel",
            icon: "https://cdn.simpleicons.org/laravel/dc2626",
            role: "Backend",
            isCore: true,
            description:
              "Battle-tested MVC core powering multi-tenant CRMs, double-entry accounting workflows, and Sanctum RBAC platforms.",
          },
          {
            id: "python",
            name: "Python",
            icon: "https://cdn.simpleicons.org/python/dc2626",
            role: "Backend",
            isCore: true,
            description:
              "FastAPI microservices, document OCR pipelines, RAG matching engines, and automated data orchestration.",
          },
          {
            id: "dotnet",
            name: ".NET",
            icon: "https://cdn.simpleicons.org/dotnet/dc2626",
            role: "Backend",
            isCore: false,
            description:
              "High-throughput enterprise APIs and regulated corporate integrations for Microsoft-native engineering teams.",
          },
          {
            id: "java",
            name: "Java",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg",
            tintRed: true,
            role: "Backend",
            isCore: false,
            description:
              "Resilient Spring Boot microservices and mission-critical financial settlement backends built for strict SLAs.",
          },
          {
            id: "rust",
            name: "Rust",
            icon: "https://cdn.simpleicons.org/rust/dc2626",
            role: "Backend",
            isCore: true,
            description:
              "Memory-safe systems core and FUSE virtual filesystem engineering powering Endow Cloud on-premise storage.",
          },
        ],
      },
    ],
  },
  {
    id: "mobile",
    index: "02",
    title: "Mobile Technologies",
    subgroups: [
      {
        id: "cross-platform",
        label: "Cross Platform",
        layout: "grid-3",
        techs: [
          {
            id: "flutter",
            name: "Flutter",
            icon: "https://cdn.simpleicons.org/flutter/dc2626",
            role: "Cross Platform",
            isCore: true,
            description:
              "Unified Dart codebase delivering 60fps native iOS and Android experiences with custom brand motion.",
          },
          {
            id: "react-native",
            name: "React Native",
            icon: "https://cdn.simpleicons.org/react/dc2626",
            role: "Cross Platform",
            isCore: true,
            description:
              "Shared TypeScript business logic and native bridge modules for rapid cross-platform mobile product delivery.",
          },
          {
            id: "expo",
            name: "Expo",
            icon: "https://cdn.simpleicons.org/expo/dc2626",
            role: "Cross Platform",
            isCore: true,
            description:
              "Over-the-air updates, EAS build pipelines, and streamlined native hardware capability integration.",
          },
        ],
      },
      {
        id: "native-mobile",
        label: "Native Platforms",
        layout: "split-2",
        techs: [
          {
            id: "swift",
            name: "Swift",
            icon: "https://cdn.simpleicons.org/swift/dc2626",
            category: "iOS",
            role: "iOS Native",
            isCore: false,
            description:
              "Native Swift & SwiftUI engineering for biometric security, Apple Pay, and hardware-accelerated iOS workflows.",
          },
          {
            id: "kotlin",
            name: "Kotlin",
            icon: "https://cdn.simpleicons.org/kotlin/dc2626",
            category: "Android",
            role: "Android Native",
            isCore: false,
            description:
              "Modern Jetpack Compose and coroutine-driven Android apps optimized for reliability across device tiers.",
          },
        ],
      },
      {
        id: "mobile-sync",
        label: "Mobile Sync & Local Core",
        layout: "grid-3",
        techs: [
          {
            id: "firebase",
            name: "Firebase",
            icon: "https://cdn.simpleicons.org/firebase/dc2626",
            role: "Mobile Sync",
            isCore: true,
            description:
              "Real-time push notifications, Crashlytics telemetry, and mobile edge authentication pipelines.",
          },
          {
            id: "supabase",
            name: "Supabase",
            icon: "https://cdn.simpleicons.org/supabase/dc2626",
            role: "Mobile Sync",
            isCore: true,
            description:
              "Postgres-backed realtime subscriptions, row-level security, and instant mobile storage sync.",
          },
          {
            id: "sqlite",
            name: "SQLite",
            icon: "https://cdn.simpleicons.org/sqlite/dc2626",
            role: "Local Storage",
            isCore: true,
            description:
              "Zero-latency embedded local persistence for offline-first mobile apps and local file indexing.",
          },
        ],
      },
    ],
  },
  {
    id: "ai",
    index: "03",
    title: "AI-native stack",
    subgroups: [
      {
        id: "ai-coding-tools",
        label: "AI coding tools",
        layout: "grid-3",
        techs: [
          {
            id: "claude-code",
            name: "Claude Code",
            icon: "https://cdn.simpleicons.org/claude/dc2626",
            role: "AI Coding Tool",
            isCore: true,
            isAiNative: true,
            description:
              "Terminal-native agentic coding partner accelerating architectural refactors, test suites, and code audits.",
          },
          {
            id: "codex",
            name: "Codex",
            icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/codex.svg",
            tintRed: true,
            role: "AI Coding Tool",
            isCore: false,
            isAiNative: true,
            description:
              "Automated task execution, repository-wide reasoning, and parallel PR verification workflows.",
          },
          {
            id: "github-copilot",
            name: "GitHub Copilot",
            icon: "https://cdn.simpleicons.org/githubcopilot/dc2626",
            role: "AI Coding Tool",
            isCore: true,
            isAiNative: true,
            description:
              "Inline pair programming and pull-request review acceleration integrated directly into CI workflows.",
          },
        ],
      },
      {
        id: "ai-native-ides",
        label: "AI-native IDEs",
        layout: "grid-3",
        techs: [
          {
            id: "cursor",
            name: "Cursor",
            icon: "https://cdn.simpleicons.org/cursor/dc2626",
            role: "AI-Native IDE",
            isCore: true,
            isAiNative: true,
            description:
              "Context-aware codebase indexing and multi-file editing workflow used daily across our engineering squads.",
          },
          {
            id: "antigravity",
            name: "Antigravity",
            icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/antigravity.svg",
            tintRed: true,
            role: "AI-Native IDE",
            isCore: true,
            isAiNative: true,
            description:
              "Agentic development environment orchestrating planning, implementation, and live browser verification.",
          },
          {
            id: "windsurf",
            name: "Windsurf",
            icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/windsurf.svg",
            tintRed: true,
            role: "AI-Native IDE",
            isCore: false,
            isAiNative: true,
            description:
              "Deep contextual Cascade flows for rapid full-stack prototyping and legacy module modernization.",
          },
        ],
      },
      {
        id: "ai-app-builders",
        label: "AI App Builders",
        layout: "grid-3",
        techs: [
          {
            id: "lovable",
            name: "Lovable",
            icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/lovable.svg",
            tintRed: true,
            role: "AI App Builder",
            isCore: false,
            isAiNative: true,
            description:
              "Rapid interactive MVP validation and early stakeholder UI exploration before production hardening.",
          },
          {
            id: "bolt",
            name: "Bolt",
            icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/bolt/light.svg",
            tintRed: true,
            wideIcon: true,
            role: "AI App Builder",
            isCore: false,
            isAiNative: true,
            description:
              "Browser-native full-stack sandbox prototyping to test product flows with founders in hours.",
          },
          {
            id: "v0",
            name: "v0",
            icon: "https://cdn.simpleicons.org/v0/dc2626",
            role: "AI App Builder",
            isCore: true,
            isAiNative: true,
            description:
              "Generative UI component scaffolding refined into accessible, production-grade React & Tailwind systems.",
          },
        ],
      },
      {
        id: "ai-models-rag",
        label: "Models & RAG Engines",
        layout: "grid-3",
        techs: [
          {
            id: "gemini",
            name: "Gemini",
            icon: "https://cdn.simpleicons.org/googlegemini/dc2626",
            role: "AI Model",
            isCore: true,
            isAiNative: true,
            description:
              "Multimodal document verification, structured extraction, and high-context academic & enterprise reasoning.",
          },
          {
            id: "claude",
            name: "Claude",
            icon: "https://cdn.simpleicons.org/anthropic/dc2626",
            role: "AI Model",
            isCore: true,
            isAiNative: true,
            description:
              "High-precision synthesis, automated support reply drafting in Endow Desk, and compliance-safe workflows.",
          },
          {
            id: "openai",
            name: "OpenAI",
            icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg",
            tintRed: true,
            role: "AI Model",
            isCore: true,
            isAiNative: true,
            description:
              "Vector embeddings, semantic search pipelines, and structured tool-calling agents in production apps.",
          },
        ],
      },
    ],
  },
];

export const infrastructureStack: TechItem[] = [
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "https://cdn.simpleicons.org/postgresql/dc2626",
    role: "Data & Cloud",
    isCore: true,
    description:
      "ACID-compliant relational storage & pgvector indexing powering financial ledgers and enterprise portals.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb/dc2626",
    role: "Data & Cloud",
    isCore: false,
    description:
      "Flexible document schemas for high-velocity event ingestion and unstructured metadata catalogs.",
  },
  {
    id: "redis",
    name: "Redis",
    icon: "https://cdn.simpleicons.org/redis/dc2626",
    role: "Data & Cloud",
    isCore: true,
    description:
      "Sub-millisecond caching, session locking, and background job queues across high-traffic applications.",
  },
  {
    id: "prisma",
    name: "Prisma",
    icon: "https://cdn.simpleicons.org/prisma/dc2626",
    role: "Data & Cloud",
    isCore: true,
    description:
      "Type-safe database modeling, zero-drift migrations, and clean multi-tenant query abstractions.",
  },
  {
    id: "docker",
    name: "Docker",
    icon: "https://cdn.simpleicons.org/docker/dc2626",
    role: "Data & Cloud",
    isCore: true,
    description:
      "Deterministic containerization ensuring parity across local engineering, staging, and production clusters.",
  },
  {
    id: "aws",
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/aws.svg",
    tintRed: true,
    role: "Data & Cloud",
    isCore: true,
    description:
      "Multi-region VPCs, ECS/EC2 compute, S3 encrypted document vaults, and automated RDS snapshots.",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: "https://cdn.simpleicons.org/kubernetes/dc2626",
    role: "Data & Cloud",
    isCore: false,
    description:
      "Self-healing container orchestration and horizontal autoscaling for high-concurrency enterprise workloads.",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    icon: "https://cdn.simpleicons.org/cloudflare/dc2626",
    role: "Data & Cloud",
    isCore: true,
    description:
      "Global edge DNS, DDoS mitigation, WAF rules, and R2 object storage delivering low-latency access worldwide.",
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    icon: "https://cdn.simpleicons.org/githubactions/dc2626",
    role: "Data & Cloud",
    isCore: true,
    description:
      "Automated typechecking, E2E verification, security scanning, and zero-downtime blue/green deployments.",
  },
  {
    id: "nginx",
    name: "Nginx",
    icon: "https://cdn.simpleicons.org/nginx/dc2626",
    role: "Data & Cloud",
    isCore: true,
    description:
      "High-throughput reverse proxying, TLS termination, and LAN chunked file streaming for on-premise deployments.",
  },
];

// Preserved legacy export derived from pillars + infrastructure for compatibility
export const techCategories: TechCategory[] = [
  ...techPillars.map((pillar) => ({
    id: pillar.id,
    label: pillar.title,
    techs: pillar.subgroups.flatMap((group) => group.techs),
  })),
  {
    id: "cloud",
    label: "Data, Cloud & DevOps",
    techs: infrastructureStack,
  },
];
