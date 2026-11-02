import { ProcessStep } from "@/types";

export const engineeringProcess: ProcessStep[] = [
  {
    number: "01",
    phase: "Architecture & Discovery",
    title: "De-Risking Architecture Before Code",
    description:
      "We analyze business logic, user journeys, security requirements, and data relationships upfront. We draft clear entity diagrams, database schemas, and API contracts so building proceeds without roadblocks.",
    deliverables: [
      "Technical Architecture Blueprint",
      "Database Schema & Data Flow Diagrams",
      "API Contract & Third-Party Integration Map",
      "Milestone Timeline & Cost Lock",
    ],
  },
  {
    number: "02",
    phase: "Agile Sprint Engineering",
    title: "Iterative, Production-Quality Sprints",
    description:
      "We build in 2-week agile sprints. You receive live preview staging deployments at the end of each sprint with continuous test coverage, accessible UI components, and complete code transparency.",
    deliverables: [
      "Weekly Staging Preview Builds",
      "Clean TypeScript & Reusable Component System",
      "Continuous Git Commits & Code Reviews",
      "Interactive Feedback Cycles",
    ],
  },
  {
    number: "03",
    phase: "Security, Performance & QA",
    title: "Hardening & Performance Profiling",
    description:
      "Before launch, our systems undergo rigorous load testing, cross-browser validation, accessibility (a11y) checks, and security audits (SQL injection, XSS, RBAC authorization checks).",
    deliverables: [
      "Core Web Vitals 95+ Certification",
      "Automated End-to-End Test Suite",
      "OWASP Security Audit & Vulnerability Scan",
      "Database Indexing & Query Profiling",
    ],
  },
  {
    number: "04",
    phase: "Cloud Deployment & SLA",
    title: "Zero-Downtime Launch & Continuous Care",
    description:
      "We deploy to high-availability cloud environments with automated CI/CD pipelines, SSL provisioning, automated database backups, and 24/7 telemetry monitoring.",
    deliverables: [
      "Zero-Downtime Production Deployment",
      "Automated Daily Backups & Disaster Recovery",
      "Centralized Error Logging & Uptime Monitoring",
      "Ongoing Maintenance & SLA Support",
    ],
  },
];
