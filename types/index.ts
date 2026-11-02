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
  name: string;
  icon?: string;
  category?: string;
  highlight?: boolean;
  description?: string;
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
