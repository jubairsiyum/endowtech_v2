import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo/schema";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://endowtech.net"),
  title: {
    default: "Endow Tech — Enterprise Software & Digital Product Studio",
    template: "%s | Endow Tech",
  },
  description:
    "Endow Tech is the technology and product engineering wing of Endow Corporation. We engineer high-performance web applications, student portal systems, and scalable SaaS platforms across Seoul and Dhaka.",
  keywords: [
    "Endow Tech",
    "Endow Corporation",
    "Endow Global Education",
    "student portals",
    "admission management system",
    "SaaS platforms",
    "enterprise web development",
    "Next.js product studio",
    "TypeScript engineering",
    "Seoul tech studio",
    "Dhaka software agency",
    "AI-driven education evaluation",
    "cross-border visa pipeline software",
  ],
  authors: [{ name: "Endow Tech", url: "https://endowtech.net" }],
  creator: "Endow Tech",
  publisher: "Endow Tech",
  alternates: {
    canonical: "https://endowtech.net",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://endowtech.net",
    title: "Endow Tech — Enterprise Software & Digital Product Studio",
    description:
      "The technology and product engineering studio behind global academic portals and scalable SaaS architectures.",
    siteName: "Endow Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Endow Tech — Enterprise Software & Digital Product Studio",
    description:
      "High-performance web applications, student portal systems, and scalable SaaS platforms.",
    creator: "@endowtech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd schema={[organizationSchema, websiteSchema]} />
      </head>
      <body
        className="bg-background text-text-primary antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
