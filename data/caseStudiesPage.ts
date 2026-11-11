import { featuredProjects, type FeaturedProject } from "@/data/featuredProjects";

export type CaseStudyDomainId =
  | "all"
  | "edtech-crm"
  | "fintech-ops"
  | "infrastructure"
  | "ai-support"
  | "hospitality";

export interface CaseStudyFilterOption {
  id: CaseStudyDomainId;
  label: string;
}

export interface CaseStudyHeroStat {
  value: string;
  label: string;
  desc: string;
}

export interface CaseStudyImpactMetric {
  value: string;
  label: string;
  sublabel: string;
}

export interface CaseStudyEntry extends FeaturedProject {
  domainId: Exclude<CaseStudyDomainId, "all">;
  domainLabel: string;
  cardSummary: string;
}

export const caseStudyDomainMeta: Record<
  string,
  {
    domainId: Exclude<CaseStudyDomainId, "all">;
    domainLabel: string;
    cardSummary: string;
  }
> = {
  "endow-connect": {
    domainId: "edtech-crm",
    domainLabel: "EdTech & CRM",
    cardSummary:
      "Centralizes the student journey from first inquiry to enrollment across campuses — replacing scattered spreadsheets with unified counselor workflows and funnel telemetry.",
  },
  "endow-cuisine": {
    domainId: "fintech-ops",
    domainLabel: "FinTech & Accounting",
    cardSummary:
      "Shift-based financial accounting structured around how restaurants earn and spend — daily sales, vendor invoices, inventory costs, and real-time profit/loss visibility.",
  },
  "endow-cloud": {
    domainId: "infrastructure",
    domainLabel: "Local Infrastructure",
    cardSummary:
      "Brings Google Drive-style file organization and sharing to a business's own local hardware with Rust + FUSE — delivering LAN speeds and 100% data sovereignty.",
  },
  "endow-desk": {
    domainId: "ai-support",
    domainLabel: "AI & Support",
    cardSummary:
      "Combines automated ticket routing, real-time Svelte live chat, and a self-service knowledge base enhanced with AI response drafting for sub-2-minute first replies.",
  },
  zendos: {
    domainId: "hospitality",
    domainLabel: "Hospitality OS",
    cardSummary:
      "Unifies reservations, front desk operations, housekeeping turnover sync, and multi-department hotel workflows inside one connected property operating system.",
  },
};

export const caseStudyProjects: CaseStudyEntry[] = featuredProjects.map(
  (project) => {
    const meta = caseStudyDomainMeta[project.id] ?? {
      domainId: "edtech-crm" as const,
      domainLabel: project.category,
      cardSummary: project.description,
    };

    return {
      ...project,
      ...meta,
    };
  },
);

export const caseStudyFilters: CaseStudyFilterOption[] = [
  { id: "all", label: "All Projects" },
  { id: "edtech-crm", label: "EdTech & CRM" },
  { id: "fintech-ops", label: "FinTech & Ops" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "ai-support", label: "AI & Support" },
  { id: "hospitality", label: "Hospitality OS" },
];

export const caseStudiesHeroStats: CaseStudyHeroStat[] = [
  {
    value: "05",
    label: "Shipped Platforms",
    desc: "Production Systems in Active Use",
  },
  {
    value: "5,000+",
    label: "Active End Users",
    desc: "Students, Staff & Operators",
  },
  {
    value: "99.98%",
    label: "Production Uptime",
    desc: "Enterprise Cloud & On-Prem SLA",
  },
  {
    value: "2 Hubs",
    label: "Seoul & Dhaka",
    desc: "3-Hour Overlap Delivery",
  },
];

export const caseStudiesTechLogos = [
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis" },
  { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
  { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux" },
];

export const caseStudiesImpactMetrics: CaseStudyImpactMetric[] = [
  {
    value: "5,000+",
    label: "Users & Students Served",
    sublabel: "Across Admissions & Portals",
  },
  {
    value: "85%",
    label: "Reconciliation Saved",
    sublabel: "Automated Shift Bookkeeping",
  },
  {
    value: "10x",
    label: "LAN Transfer Speed",
    sublabel: "Rust & FUSE Local Storage",
  },
  {
    value: "99.98%",
    label: "Production Uptime",
    sublabel: "Enterprise SLA Standard",
  },
];

export const caseStudiesPageContent = {
  hero: {
    eyebrow: "Case Studies · Production Proof",
    titleLine1: "Systems built to carry",
    titleHighlight: "real operations.",
    subtitle:
      "From multi-campus EdTech CRMs and shift-based restaurant accounting to sovereign local cloud storage, AI support ticketing, and hospitality OS platforms — built and operated across Seoul and Dhaka.",
    primaryCta: "Explore Case Studies",
    secondaryCta: "Discuss Your Challenge",
  },
  featured: {
    eyebrow: "Featured Engineering",
    title: "Built for scale. Proven in production.",
    sideDescription:
      "We measure enterprise engineering by what the system has to handle, how critical it becomes, and what changes for the business after it ships.",
    projectId: "endow-connect",
    pillars: [
      {
        heading: "Pipeline Consolidation",
        description:
          "Replaced disconnected spreadsheets across offices with one unified enrollment workflow.",
        metricValue: "100%",
        metricLabel: "Unified Student Journey",
      },
      {
        heading: "Counselor Velocity",
        description:
          "Task routing, live status updates, and leadership conversion telemetry in real time.",
        metricValue: "3x",
        metricLabel: "Team Coordination Speed",
      },
    ],
  },
  grid: {
    eyebrow: "Case Studies · Production Systems",
    title: "Find the proof that matters.",
  },
  ctaBanner: {
    eyebrow: "Have a complex engineering challenge?",
    title: "Put the right technical people in the room.",
    buttonLabel: "Schedule Discovery Call",
  },
  contact: {
    eyebrow: "Initiate Collaboration",
    title: "Bring us what needs to change.",
    subtitle:
      "Share the workflow, portal, or scale bottleneck your team is navigating. Our Seoul headquarters and Dhaka engineering leads respond within 24 hours.",
  },
} as const;
