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
    "Explore five production case studies engineered by Endow Tech: Endow Connect, Endow Cuisine, Endow Cloud, Endow Desk, and ZendOS.",
  alternates: {
    canonical: `${siteConfig.url}/case-studies`,
  },
  openGraph: {
    title: "Case Studies — Systems Built to Carry Real Operations | Endow Tech",
    description:
      "Five production software platforms spanning EdTech CRM, restaurant accounting, on-premise local cloud storage, AI support ticketing, and hospitality OS.",
    url: `${siteConfig.url}/case-studies`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Endow Tech Production Systems",
    description:
      "Explore Endow Connect, Endow Cuisine, Endow Cloud, Endow Desk, and ZendOS.",
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
