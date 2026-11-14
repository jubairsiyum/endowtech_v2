import { siteConfig } from "@/data/siteConfig";

/**
 * Organization & Corporation Schema
 * Establishes Endow Tech as a recognized entity in the Knowledge Graph,
 * explicitly linking it to Endow Corporation (Seoul HQ) and its global footprint.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: "Endow Tech (Endow Corporation)",
    alternateName: [
      "Endow Technologies",
      "Endow Tech Studio",
      "Endow Product Engineering",
    ],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/logo.png`,
      caption: "Endow Tech Logo",
      width: "512",
      height: "512",
    },
    parentOrganization: {
      "@type": "Corporation",
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
    },
    address: siteConfig.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressCountry: office.country === "South Korea" ? "KR" : "BD",
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneDhaka,
        contactType: "customer service",
        email: siteConfig.contact.email,
        availableLanguage: ["English", "Bengali", "Korean"],
      },
    ],
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter,
      siteConfig.contact.whatsapp,
    ],
    knowsAbout: [
      "Enterprise Web Engineering",
      "SaaS Platforms & Multi-Tenant Systems",
      "Student Admission & Portal Architecture",
      "Next.js App Router & React 19",
      "TypeScript & High-Reliability APIs",
      "Cloud Infrastructure & Edge Caching",
      "Cross-Border Educational Technology",
    ],
  };
}

/**
 * WebSite Schema with Search & Identity
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-US",
  };
}

/**
 * FAQPage Schema
 * Highly cited by AI Search engines (Perplexity, ChatGPT Search, Google AI Overviews)
 * to answer direct conversational questions with high accuracy and source attribution.
 */
export function getFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Service Schema
 * Formatted for enterprise services provided by Endow Tech.
 */
export function getServiceSchema(service: {
  id: string;
  title: string;
  description: string;
  deliverables?: string[];
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.id}#service`,
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}/services/${service.id}`,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    serviceType: "Software Engineering & Digital Product Studio",
    areaServed: ["Worldwide", "South Korea", "Bangladesh", "Finland"],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: (service.deliverables || []).map(
        (deliverable, index) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: deliverable,
          },
          position: index + 1,
        }),
      ),
    },
  };
}

/**
 * SoftwareApplication / CreativeWork Schema
 * Detailed schema for featured engineering projects and platforms.
 */
export function getProjectSchema(project: {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  techStack?: string[];
  liveUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/projects/${project.id}#software`,
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    operatingSystem: "Cloud / Web / Modern Browsers",
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
    creator: {
      "@id": `${siteConfig.url}/#organization`,
    },
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
  };
}

/**
 * BreadcrumbList Schema
 * Clarifies route hierarchy for bots and structured navigation.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * ContactPage Schema
 * Connects Endow Tech's Seoul HQ and Dhaka Tech Hub contact routes to the Knowledge Graph.
 */
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact#webpage`,
    url: `${siteConfig.url}/contact`,
    name: "Contact Endow Tech — Seoul & Dhaka Engineering Studio",
    description:
      "Speak directly with Endow Tech's executive and principal engineering leads across Seoul, South Korea and Dhaka, Bangladesh.",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

/**
 * CollectionPage Schema for Case Studies
 * Connects Endow Tech's 5 production case studies to the Knowledge Graph.
 */
export function getCaseStudiesPageSchema(
  projects: Array<{ id: string; title: string; description: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/case-studies#webpage`,
    url: `${siteConfig.url}/case-studies`,
    name: "Case Studies — Production Software & Enterprise Platforms | Endow Tech",
    description:
      "Explore five production software case studies built by Endow Tech across EdTech CRM, restaurant accounting, local infrastructure storage, AI support ticketing, and hospitality OS.",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/projects/${project.id}`,
        name: project.title,
        description: project.description,
      })),
    },
  };
}

/**
 * WebPage Schema for Sitemap
 * Indexes the complete site hierarchy, internal routes, and platform entities.
 */
export function getSitemapPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/sitemap#webpage`,
    url: `${siteConfig.url}/sitemap`,
    name: "Sitemap — Website Directory & Architecture | Endow Tech",
    description:
      "Explore the comprehensive directory of Endow Tech: enterprise engineering services, flagship platforms, case studies, technology stack, and global office locations.",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}
