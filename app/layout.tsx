import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo/schema";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const isProd =
  process.env.VERCEL_ENV === "production" ||
  process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Endow Tech — Enterprise Software & Digital Product Studio",
    template: "%s | Endow Tech",
  },
  description:
    "Endow Tech is the technology and product engineering wing of Endow Corporation. We engineer high-performance web applications, student portal systems, and scalable SaaS platforms across Seoul and Dhaka.",
  authors: [{ name: "Endow Tech", url: siteConfig.url }],
  creator: "Endow Tech",
  publisher: "Endow Tech",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Endow Tech — Enterprise Software & Digital Product Studio",
    description:
      "The technology and product engineering studio behind global academic portals and scalable SaaS architectures.",
    siteName: "Endow Tech",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Endow Tech — Enterprise Software & Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Endow Tech — Enterprise Software & Digital Product Studio",
    description:
      "High-performance web applications, student portal systems, and scalable SaaS platforms.",
    creator: "@endowtech",
    images: [`${siteConfig.url}/opengraph-image`],
  },
  robots: {
    index: isProd,
    follow: true,
    googleBot: {
      index: isProd,
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <JsonLd schema={[organizationSchema, websiteSchema]} />
      </head>
      <body
        className="bg-background text-text-primary font-sans antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white font-medium text-sm"
        >
          Skip to content
        </a>
        <SmoothScroll>
          {children}
          <ScrollToTopButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
