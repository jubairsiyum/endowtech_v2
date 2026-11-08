import { FlowButton } from "@/components/ui/FlowButton";
import { featuredProjects } from "@/data/featuredProjects";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Layers,
  MapPin,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = featuredProjects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Endow Tech",
    };
  }

  const pageUrl = `${siteConfig.url}/projects/${id}`;

  return {
    title: `${project.title} | Featured Projects`,
    description: project.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | Endow Tech Engineering Case Study`,
      description: project.description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: project.image.startsWith("http")
            ? project.image
            : `${siteConfig.url}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectIndex = featuredProjects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = featuredProjects[projectIndex];
  const prevProject =
    projectIndex > 0
      ? featuredProjects[projectIndex - 1]
      : featuredProjects[featuredProjects.length - 1];
  const nextProject =
    projectIndex < featuredProjects.length - 1
      ? featuredProjects[projectIndex + 1]
      : featuredProjects[0];

  const projectSchema = getProjectSchema(project);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Featured Projects", url: "/#featured-projects" },
    { name: project.shortTitle, url: `/projects/${project.id}` },
  ]);

  return (
    <>
      <JsonLd schema={[projectSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-[#070811] text-white pt-28 pb-24 selection:bg-accent selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-25"
          style={{ backgroundColor: project.accentColor }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 mb-8 sm:mb-12 font-mono">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link
            href="/#featured-projects"
            className="hover:text-white transition-colors"
          >
            Featured Projects
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-white truncate font-medium">
            {project.shortTitle}
          </span>
        </nav>

        {/* Hero Section */}
        <div className="mb-14 sm:mb-18">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border"
              style={{
                backgroundColor: `${project.accentColor}18`,
                borderColor: `${project.accentColor}40`,
                color: project.accentColor,
              }}
            >
              {`// PROJECT ${project.number} OF ${String(featuredProjects.length).padStart(2, "0")}`}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-gray-300 bg-white/5 border border-white/10">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-5xl">
            {project.title}
          </h1>

          <p className="mt-6 text-lg sm:text-2xl text-gray-300 font-normal leading-relaxed max-w-4xl">
            {project.tagline}
          </p>

          {/* Project Meta Bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 tracking-wider mb-1.5">
                <Building className="w-3.5 h-3.5 text-accent" />
                Client
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">
                {project.client}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                Location
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">
                {project.clientLocation}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 tracking-wider mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                Timeline
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">
                {project.year}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Role
              </div>
              <div className="text-sm sm:text-base font-semibold text-white truncate">
                {project.role}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <FlowButton
              text="Request System Walkthrough"
              href={siteConfig.contact.schedulerUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="white"
              size="lg"
            />
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/15 transition-all duration-200"
              >
                <span>Live Environment Preview</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            )}
            <Link
              href="/#featured-projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-medium text-sm transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Showcase</span>
            </Link>
          </div>
        </div>

        {/* Project Big Visual Showcase */}
        <div className="mb-20">
          <div className="group relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900/60 aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Floating Pill inside image */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 z-10">
              <div className="flex flex-wrap items-center gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="px-3.5 py-1 rounded-full bg-accent/80 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                Production Verified
              </div>
            </div>
          </div>
        </div>

        {/* Key Verified Metrics Bar */}
        <div className="mb-20">
          <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider mb-4">
            {"// Verified Performance & Business Impact"}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
                  style={{ color: project.accentColor }}
                >
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-white mt-2">
                  {metric.label}
                </div>
                {metric.change && (
                  <div className="text-xs font-mono text-gray-400 mt-1">
                    {metric.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Narrative: Challenge & Architectural Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              The Mission &amp; Architectural Challenge
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {project.challenge}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              The Engineering Solution
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mb-20">
          <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider mb-4">
            {"// Core Capabilities & Systems"}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
            Engineered for high-volume enterprise operations.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.keyFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-7 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-3.5 mb-3">
                  <CheckCircle2
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: project.accentColor }}
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed pl-8">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* System Architecture Highlights */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              System Architecture &amp; Technology Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.architectureHighlights.map((arch) => (
              <div
                key={arch.layer}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div className="text-xs font-mono uppercase text-accent font-semibold tracking-wider mb-2">
                  {arch.layer}
                </div>
                <div className="text-base font-bold text-white mb-2">
                  {arch.tech}
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {arch.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next / Prev Project Navigation */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/projects/${prevProject.id}`}
            className="group flex items-center gap-4 text-left w-full sm:w-auto p-4 sm:p-0 rounded-2xl sm:rounded-none bg-white/[0.03] sm:bg-transparent"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Previous Project
              </div>
              <div className="text-sm sm:text-base font-semibold text-white group-hover:text-accent transition-colors">
                {prevProject.shortTitle}
              </div>
            </div>
          </Link>

          <Link
            href="/#featured-projects"
            className="hidden md:inline-flex px-5 py-2.5 rounded-full text-xs font-mono text-gray-400 hover:text-white border border-white/10 hover:border-white/30 transition-all"
          >
            All {featuredProjects.length} Featured Projects
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="group flex items-center justify-end gap-4 text-right w-full sm:w-auto p-4 sm:p-0 rounded-2xl sm:rounded-none bg-white/[0.03] sm:bg-transparent"
          >
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Next Project
              </div>
              <div className="text-sm sm:text-base font-semibold text-white group-hover:text-accent transition-colors">
                {nextProject.shortTitle}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
