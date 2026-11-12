import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/seo/JsonLd";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/data/siteConfig";
import { getFaqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Endow Tech — Enterprise Software & Digital Product Studio",
  description:
    "Endow Tech engineers high-performance web applications, student portal systems, and scalable SaaS platforms backed by Endow Corporation across Seoul and Dhaka.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Endow Tech — Enterprise Software & Digital Product Studio",
    description:
      "Enterprise engineering studio behind mission-critical admissions platforms and scalable cloud architectures.",
    url: siteConfig.url,
  },
};

export default function HomePage() {
  const faqSchema = getFaqSchema(faqItems);

  return (
    <>
      <JsonLd schema={faqSchema} />
      <HomeClient />
    </>
  );
}
