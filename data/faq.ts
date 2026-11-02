import { FAQItem } from "@/types";

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    category: "Engineering",
    question:
      "What makes Endow Tech different from typical freelance or marketing agencies?",
    answer:
      "We are an engineering-first digital product studio backed by Endow Corporation. Rather than handing off unoptimized WordPress templates or fragile scripts, we build enterprise-grade software using Next.js, TypeScript, and hardened databases. Our platforms are battle-tested in real operations handling thousands of applicants and high-stakes financial data daily.",
  },
  {
    id: "faq-2",
    category: "Engagement & Pricing",
    question:
      "Who owns the intellectual property (IP) and code once completed?",
    answer:
      "You maintain 100% full ownership of all source code, design assets, database schemas, and intellectual property. Upon project milestones, code is pushed directly to your organization’s private GitHub or GitLab repository with full documentation and zero vendor lock-in.",
  },
  {
    id: "faq-3",
    category: "Engineering",
    question:
      "What is your typical timeline for delivering a full-stack product or MVP?",
    answer:
      "A focused SaaS MVP, customer portal, or core web application typically ships in 6 to 10 weeks, organized into transparent 2-week agile sprints. High-volume enterprise platforms with complex third-party legacy integrations average 12 to 16 weeks.",
  },
  {
    id: "faq-4",
    category: "Engagement & Pricing",
    question: "How do you structure project pricing and collaboration models?",
    answer:
      "We offer two flexible models: (1) Fixed-Scope Milestone Pricing for projects with well-defined requirements, locking budget and deliverables; and (2) Dedicated Engineering Squad for growing startups needing continuous iteration, senior engineers, and full architectural flexibility.",
  },
  {
    id: "faq-5",
    category: "Security & SLA",
    question: "What post-launch support, maintenance, and SLAs do you provide?",
    answer:
      "Every project includes a 30-day post-launch warranty with immediate bug triage. Following launch, we offer ongoing Maintenance & Reliability Retainers covering security patches, dependency upgrades, automated backups, and 99.9% uptime monitoring.",
  },
  {
    id: "faq-6",
    category: "Engineering",
    question:
      "Can you integrate with our existing CRM, payment gateway, or legacy databases?",
    answer:
      "Yes. Seamless system integration is one of our core specialties. We routinely integrate internal systems with WhatsApp Business APIs, Stripe, PayPal, Salesforce, HubSpot, Google Workspace, and proprietary REST/GraphQL legacy endpoints.",
  },
];
