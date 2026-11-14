import JsonLd from "@/components/seo/JsonLd";
import ServiceDetailClient from "@/components/services/ServiceDetailClient";
import {
  getOtherServices,
  getRelatedProjectsForService,
  resolveServiceTechItems,
  serviceDetailsMap,
} from "@/data/serviceDetails";
import { coreServices } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { testimonials } from "@/data/testimonials";
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getServiceSchema,
} from "@/lib/seo/schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return coreServices.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = coreServices.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: { index: false },
    };
  }

  const detail = serviceDetailsMap[service.id];
  const pageUrl = `${siteConfig.url}/services/${id}`;
  const description = detail?.heroSummary ?? service.description;

  return {
    title: `${service.title} — Engineering Services`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.title} | Endow Tech Services`,
      description,
      url: pageUrl,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${service.title} — Endow Tech`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Endow Tech`,
      description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = coreServices.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const detail =
    serviceDetailsMap[service.id] ?? Object.values(serviceDetailsMap)[0];
  const techItems = resolveServiceTechItems(detail.techIds);
  const relatedProjects = getRelatedProjectsForService(detail.relatedProjectIds);
  const otherServices = getOtherServices(service.id);
  const testimonial = testimonials[detail.testimonialIndex] ?? testimonials[0];

  const serviceSchema = getServiceSchema(service);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/#services" },
    { name: service.title, url: `/services/${service.id}` },
  ]);
  const faqSchema = getFaqSchema(
    detail.faqs.map(({ question, answer }) => ({ question, answer })),
  );

  return (
    <>
      <JsonLd schema={[serviceSchema, breadcrumbSchema, faqSchema]} />
      <ServiceDetailClient
        service={service}
        detail={detail}
        techItems={techItems}
        relatedProjects={relatedProjects}
        otherServices={otherServices}
        testimonial={testimonial}
      />
    </>
  );
}
