import { Product } from "@/types";

export const flagshipProducts: Product[] = [
  {
    id: "student-portal-ams",
    title: "Endow Global Student Portal & AMS",
    tagline: "End-to-End International Admission & Visa Pipeline Engine",
    description:
      "A comprehensive application management platform built for Endow Global Education. Powers end-to-end student admissions, credential evaluation, apostille verification, and visa milestone tracking for universities across South Korea, Finland, and global destinations.",
    category: "EdTech",
    badge: "Flagship Platform",
    accentColor: "#DC2626",
    metrics: [
      "5,000+ Students Managed",
      "45+ Partner Institutions",
      "78% Faster File Processing",
    ],
    tags: [
      "Next.js App Router",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Document Vault",
    ],
    features: [
      "Applicant Self-Service Portal with Real-Time Milestone Tracking",
      "Encrypted Document Vault with Versioning & Counselor Audit Trail",
      "Automated Visa Checklist & Embargo Deadline Alerting",
      "Multi-Role Permissions (Student, Counselor, Branch Admin, HQ Director)",
    ],
  },
  {
    id: "unimatch-ai",
    title: "UniMatch AI",
    tagline: "Intelligent University & Scholarship Matching Engine",
    description:
      "An algorithmic matching and predictive eligibility platform that evaluates student profiles (GPA, IELTS/TOPIK scores, budget, destination preference) against global university requirements to surface optimal degree programs and scholarship opportunities.",
    category: "AI & Automation",
    badge: "AI Engine",
    accentColor: "#3B82F6",
    metrics: [
      "94% Recommendation Accuracy",
      "300+ Degree Matrices",
      "< 2s Matching Latency",
    ],
    tags: [
      "Next.js 16",
      "Vector Search",
      "FastAPI",
      "Tailwind CSS",
      "Redis Cache",
    ],
    features: [
      "Dynamic Academic Profile Scoring & Deficiency Detection",
      "Country-Specific Scholarship Eligibility Prediction (GKS, Finland Grants)",
      "Side-by-Side Tuition, Living Cost & Post-Study Work Visa Comparison",
      "One-Click Export to Application Processing Pipeline",
    ],
  },
  {
    id: "leadflow-crm",
    title: "LeadFlow CRM & Workflow Hub",
    tagline: "Multi-Tenant Education Consultancy Operations Suite",
    description:
      "A purpose-built CRM and operational suite that centralizes multi-channel inquiries from WhatsApp, web portals, and walk-in seminars. Routes leads to assigned counselors, automates follow-up cadences, and tracks conversion metrics across Seoul and Dhaka branches.",
    category: "SaaS & CRM",
    badge: "Operations Suite",
    accentColor: "#10B981",
    metrics: [
      "100K+ Inquiries Processed",
      "Zero Lost Leads",
      "3.4x Faster Follow-Up Response",
    ],
    tags: ["Next.js", "Webhooks", "WhatsApp Cloud API", "PostgreSQL", "Docker"],
    features: [
      "Direct WhatsApp & Webhook Ingestion with Auto-Assignment",
      "Automated Appointment Booking & Calendar Syncing",
      "Comprehensive Funnel Analytics & Counselor KPI Dashboards",
      "Bank-Grade Role-Based Access Control and Branch Isolation",
    ],
  },
];
