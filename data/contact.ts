import { siteConfig } from "@/data/siteConfig";
import type {
  ContactNextStep,
  LeadershipProfile,
  OfficeRoute,
} from "@/types";

export const contactPageContent = {
  hero: {
    eyebrow: "Contact",
    titleLine1: "Tell us what you're",
    titleHighlight: "building.",
    subtitle:
      "You'll speak directly with the executive and engineering leaders closest to the work — from architecture review to launch.",
  },
  directStrip: {
    title: "Let's Build Your Digital Product",
    subtitle:
      "Connect with the engineering team powering 5,000+ student journeys, AI matching engines, and 99.98% uptime enterprise SaaS across Seoul and Dhaka.",
    emailLabel: "Inquire via email",
    whatsappLabel: "WhatsApp & Direct Desk",
    schedulerLabel: "Discovery Session",
    schedulerValue: "Book a 30-Min Call",
  },
  whatHappensNext: {
    eyebrow: "What happens next",
    title: "Your brief goes straight to the work.",
    subtitle:
      "We review your architectural context first, bring in the right technical lead, and define a clear next move.",
    image: "/images/contact/engineering-briefing.jpg",
    imageAlt:
      "Endow Tech senior engineers and technical architects reviewing a client system blueprint",
    imageCaption: "Seoul HQ ↔ Dhaka Engineering Hub · Direct Technical Triage",
  },
  localTime: {
    eyebrow: "Local time · Two hubs",
    title: "Local time. Direct routes.",
    subtitle:
      "Our Seoul corporate headquarters (KST, UTC+9) and Dhaka engineering studio (BST, UTC+6) operate on a tight 3-hour window — giving you real-time same-day engineering alignment.",
  },
  bottomCta: {
    eyebrow: "Ready to start",
    title: "Put the right technical people in the room.",
    subtitle: "Share the challenge. We'll route the conversation from there.",
    primaryAction: "Start a conversation",
    secondaryAction: "Schedule Discovery Call",
  },
} as const;

export const leadershipContacts: LeadershipProfile[] = [
  {
    id: "ceo",
    name: "ABDULLAH AL FARUQ",
    role: "CEO",
    hub: "",
    initials: "AF",
    image: "/images/contact/Faruq CEO Endow.jpg",
    variant: "ceo",
  },
  {
    id: "tech-lead",
    name: "JUBAIR AMIN SIYUM",
    role: "TECH LEAD",
    hub: "",
    initials: "JS",
    image: "/images/contact/Siyum Endow.png",
    variant: "tech-lead",
  },
];

export const contactNextSteps: ContactNextStep[] = [
  {
    number: "01",
    title: "We review your brief",
    description:
      "The engineering lead closest to your domain reads your technical context, stack constraints, and timeline before the first call.",
    iconName: "file-search",
  },
  {
    number: "02",
    title: "You meet the right lead",
    description:
      "Speak directly with our CEO and systems lead across web architecture, SaaS multi-tenancy, EdTech portals, or AI automation.",
    iconName: "users",
  },
  {
    number: "03",
    title: "We define the next move",
    description:
      "Leave with a concrete path forward: technical discovery, architecture blueprint, milestone proposal, or a direct recommendation on fit.",
    iconName: "compass",
  },
];

export const officeRoutes: OfficeRoute[] = [
  {
    id: "seoul",
    city: "Seoul",
    country: "South Korea",
    countryCode: "KR",
    timeZone: "Asia/Seoul",
    utcOffset: "KST · UTC+9",
    hubLabel: "Corporate HQ",
    address: "Gangnam-daero, Seocho-gu, Seoul",
    phone: siteConfig.offices[0]?.phone ?? "+82 2-555-0199",
    email: siteConfig.contact.email,
    mapUrl:
      "https://maps.google.com/?q=Gangnam-daero,+Seocho-gu,+Seoul,+South+Korea",
    workHoursStart: 9,
    workHoursEnd: 18,
  },
  {
    id: "dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
    timeZone: "Asia/Dhaka",
    utcOffset: "BST · UTC+6",
    hubLabel: "Tech & Ops Hub",
    address: "Level 8, Shyamoli Square, Mirpur Rd, Dhaka-1207",
    phone: siteConfig.offices[1]?.phone ?? "+880 1901-463209",
    email: siteConfig.contact.email,
    mapUrl:
      "https://maps.google.com/?q=Shyamoli+Square,+Mirpur+Road,+Dhaka+1207,+Bangladesh",
    workHoursStart: 10,
    workHoursEnd: 19,
  },
];

export const contactServiceOptions: string[] = [
  "Enterprise Web Applications",
  "SaaS & Multi-Tenant Platforms",
  "Student & Academic Portals",
  "API & Systems Integration",
  "AI Workflows & Matching Engines",
  "Cloud DevOps & Site Reliability",
  "Technical Discovery & Audit",
];

export const contactBudgetOptions: string[] = [
  "< $5,000",
  "$5,000 - $15,000",
  "$15,000 - $35,000",
  "$35,000+",
];
