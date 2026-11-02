import { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "case-endow-portal",
    title: "Endow Global Admissions & Visa Pipeline",
    client: "Endow Global Education",
    category: "EdTech / Student Mobility",
    description:
      "Engineered an enterprise applicant management system replacing manual spreadsheets and fragmented emails. Consolidated student registration, credential evaluation, and visa checkpoint management for universities in South Korea and Finland.",
    impact:
      "Reduced manual administrative overhead by 78% and eliminated lost application documents.",
    metrics: [
      { value: "5,000+", label: "Applicants Processed" },
      { value: "78%", label: "Efficiency Gain" },
      { value: "99.98%", label: "Platform Uptime" },
    ],
    tags: [
      "Next.js App Router",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Document Encryption",
    ],
    accentColor: "#DC2626",
  },
  {
    id: "case-unimatch",
    title: "UniMatch AI Recommendation Engine",
    client: "Endow Corporation",
    category: "AI & Decision Support",
    description:
      "Developed a multi-criteria algorithm matching student academic records, language proficiencies, and financial limits with global university admissions criteria and national scholarship programs.",
    impact:
      "Increased student offer letter acceptance rates by 42% through tailored profile alignments.",
    metrics: [
      { value: "94%", label: "Match Accuracy" },
      { value: "42%", label: "Higher Acceptance" },
      { value: "< 2s", label: "Query Response" },
    ],
    tags: [
      "FastAPI",
      "Vector Embeddings",
      "Next.js 16",
      "Redis",
      "Tailwind CSS",
    ],
    accentColor: "#3B82F6",
  },
  {
    id: "case-leadflow",
    title: "LeadFlow CRM Multi-Tenant Operations",
    client: "Endow Group (Seoul & Dhaka)",
    category: "Operations & Workflow",
    description:
      "Created an internal CRM that unifies WhatsApp Business API leads, seminar registrations, and website inquiries with automated counselor round-robin assignment and activity logs.",
    impact:
      "Achieved an average first-response time under 4 minutes across Seoul and Dhaka branches.",
    metrics: [
      { value: "100K+", label: "Leads Ingested" },
      { value: "< 4 min", label: "Avg First Response" },
      { value: "3.4x", label: "Conversion Lift" },
    ],
    tags: ["Node.js", "WhatsApp API", "PostgreSQL", "Docker", "Webhooks"],
    accentColor: "#10B981",
  },
  {
    id: "case-fintech-hub",
    title: "Cross-Border Tuition & Payment Gateway",
    client: "Global EdTech Partner",
    category: "FinTech & Billing",
    description:
      "Engineered an international invoice and tuition settlement module compliant with cross-border banking guidelines, multi-currency conversion, and automated receipts.",
    impact:
      "Processed over $3.2M in international educational fees with zero settlement errors.",
    metrics: [
      { value: "$3.2M+", label: "Transactions Settled" },
      { value: "100%", label: "Reconciliation Match" },
      { value: "Zero", label: "Settlement Errors" },
    ],
    tags: [
      "Stripe Connect",
      "Next.js",
      "PostgreSQL",
      "Audit Trail",
      "Webhooks",
    ],
    accentColor: "#F59E0B",
  },
];
