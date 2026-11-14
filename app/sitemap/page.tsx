import type { Metadata } from "next";
import SitemapPageClient from "@/components/sitemap/SitemapPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { getBreadcrumbSchema, getSitemapPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Sitemap — Website Directory & Architecture | Endow Tech",
  description:
    "Explore the comprehensive HTML sitemap of Endow Tech: enterprise engineering services, flagship software platforms, case studies, technology stack, and global office locations across Seoul and Dhaka.",
  alternates: {
    canonical: `${siteConfig.url}/sitemap`,
  },
  openGraph: {
    title: "Sitemap — Website Directory & Architecture | Endow Tech",
    description:
      "Comprehensive website directory of Endow Tech: core engineering capabilities, production platforms, case studies, and corporate hubs.",
    url: `${siteConfig.url}/sitemap`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitemap — Endow Tech Website Directory",
    description:
      "Explore Endow Tech's enterprise engineering services, flagship platforms, and technical architecture.",
  },
};

export default function SitemapPage() {
  const webpageSchema = getSitemapPageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Sitemap", url: "/sitemap" },
  ]);

  return (
    <>
      <JsonLd schema={[webpageSchema, breadcrumbSchema]} />
      <SitemapPageClient />
    </>
  );
}
