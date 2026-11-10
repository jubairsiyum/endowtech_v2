export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  parentCompany: {
    name: string;
    url: string;
    hq: string;
  };
  contact: {
    email: string;
    phoneDhaka: string;
    whatsapp: string;
    whatsappDisplay: string;
    schedulerUrl: string;
  };
  offices: OfficeLocation[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface OfficeLocation {
  city: string;
  country: string;
  type: "Corporate HQ" | "Regional Operations & Tech Hub";
  address: string;
  phone: string;
  status: "Active";
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "EdTech" | "AI & Automation" | "SaaS & CRM";
  badge: string;
  metrics: string[];
  tags: string[];
  accentColor: string;
  features: string[];
  liveUrl?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  fallbackImage?: string;
  badge?: string;
  accentColor?: string;
  link?: string;
  relatedProject?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
  tags: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  impact: string;
  metrics: Array<{ value: string; label: string }>;
  tags: string[];
  accentColor: string;
}

export interface TechItem {
  id?: string;
  name: string;
  icon?: string;
  iconKey?: string;
  tintRed?: boolean;
  wideIcon?: boolean;
  category?: string;
  role?: string;
  highlight?: boolean;
  isCore?: boolean;
  isAiNative?: boolean;
  description?: string;
}

export interface TechSubgroup {
  id: string;
  label: string;
  layout?: "grid-3" | "split-2";
  techs: TechItem[];
}

export interface TechPillar {
  id: string;
  index: string;
  title: string;
  subgroups: TechSubgroup[];
}

export interface TechCategory {
  id: string;
  label: string;
  techs: TechItem[];
}

export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ComparisonItem {
  feature: string;
  others: string | boolean;
  endowTech: string | boolean;
  highlight?: boolean;
  whyItMatters: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Engineering" | "Engagement & Pricing" | "Security & SLA";
}

export interface LeadershipProfile {
  id: string;
  name: string;
  role: string;
  hub: string;
  initials: string;
  image?: string;
  badge?: string;
  variant: "ceo" | "tech-lead";
}

export interface ContactNextStep {
  number: string;
  title: string;
  description: string;
  iconName: "file-search" | "users" | "compass";
}

export interface OfficeRoute {
  id: string;
  city: string;
  country: string;
  countryCode: "KR" | "BD";
  timeZone: "Asia/Seoul" | "Asia/Dhaka";
  utcOffset: string;
  hubLabel: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  workHoursStart: number;
  workHoursEnd: number;
}

export type { FeaturedProject, FeaturedProjectMetric } from "@/data/featuredProjects";

