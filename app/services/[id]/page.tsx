import { coreServices } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlowButton } from "@/components/ui/FlowButton";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = coreServices.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found | Endow Tech",
    };
  }

  const pageUrl = `${siteConfig.url}/services/${id}`;

  return {
    title: `${service.title} | Services`,
    description: service.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.title} | Endow Tech Services`,
      description: service.description,
      url: pageUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
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

  const serviceSchema = getServiceSchema(service);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/#services" },
    { name: service.title, url: `/services/${service.id}` },
  ]);

  return (
    <>
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-[#070811] text-white pt-28 pb-20">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-accent/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-8 sm:mb-12">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/#services"
            className="hover:text-white transition-colors"
          >
            Services
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{service.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-sans font-semibold text-xs uppercase tracking-[0.14em] mb-5">
            <span>Enterprise Service</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="mt-6 text-base sm:text-xl text-gray-300 leading-relaxed">
            {service.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <FlowButton
              text="Schedule Architecture Consultation"
              href={siteConfig.contact.schedulerUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="white"
              size="lg"
            />
            <FlowButton
              text="All Services"
              href="/#services"
              variant="secondary"
              size="lg"
            />
          </div>
        </div>

        {/* Deliverables & Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Key Deliverables &amp; Capabilities
            </h2>
            <ul className="space-y-4">
              {service.deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base text-gray-300"
                >
                  <div className="mt-1 h-5 w-5 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Technology Stack &amp; Standards
              </h2>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 font-sans font-medium text-xs sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-accent/10 border border-accent/20">
              <div className="text-sm font-semibold text-white">
                Production Guarantee
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Engineered with 99.98% uptime SLA standards, automated testing
                suites, and continuous delivery workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
