import type { Metadata } from "next";
import CaseStudiesPageClient from "@/components/case-studies/CaseStudiesPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { featuredProjects } from "@/data/featuredProjects";
import { siteConfig } from "@/data/siteConfig";
import {
  getBreadcrumbSchema,
  getCaseStudiesPageSchema,
} from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Case Studies — Production Software & Enterprise Systems",
  description:
    "Explore production case studies engineered by Endow Tech spanning EdTech CRM, global admissions, travel booking, automated document generation, enterprise AI, and cloud infrastructure.",
  alternates: {
    canonical: `${siteConfig.url}/case-studies`,
  },
  openGraph: {
    title: "Case Studies — Systems Built to Carry Real Operations | Endow Tech",
    description:
      "Explore production software platforms spanning EdTech CRM, global admissions, travel booking, automated document generation, enterprise AI, and hospitality OS.",
    url: `${siteConfig.url}/case-studies`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Endow Tech Production Systems",
    description:
      "Explore Endow Tech production systems across EdTech, FinTech, AI, Travel, and Enterprise Infrastructure.",
  },
};

export default function CaseStudiesPage() {
  const collectionSchema = getCaseStudiesPageSchema(featuredProjects);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
  ]);

  return (
    <>
      <JsonLd schema={[collectionSchema, breadcrumbSchema]} />
      <CaseStudiesPageClient />
    </>
  );
}
