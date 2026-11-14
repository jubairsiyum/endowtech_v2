import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import {
  getBreadcrumbSchema,
  getContactPageSchema,
  getLocalBusinessSchema,
} from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact Us — Seoul & Dhaka Engineering Studio",
  description:
    "Connect directly with Endow Tech's CEO and principal engineering leads across Seoul, South Korea and Dhaka, Bangladesh. Submit a project brief or schedule a discovery call.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Endow Tech — Tell Us What You're Building",
    description:
      "Speak directly with our senior engineering and leadership team across Seoul HQ and Dhaka Tech Hub.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Endow Tech — Seoul & Dhaka Studio",
    description:
      "Brief our engineering team or book a consultation across KST and BST hubs.",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const contactSchema = getContactPageSchema();
  const localBusinessSchemas = getLocalBusinessSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <JsonLd
        schema={[contactSchema, breadcrumbSchema, ...localBusinessSchemas]}
      />
      <ContactPageClient initialService={service} />
    </>
  );
}
