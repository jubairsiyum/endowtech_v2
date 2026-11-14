import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import { featuredProjects } from "@/data/featuredProjects";
import {
  getRelatedProjects,
  projectDetailExtensions,
} from "@/data/projectDetails";
import { siteConfig } from "@/data/siteConfig";
import { getBreadcrumbSchema, getProjectSchema } from "@/lib/seo/schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = featuredProjects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false },
    };
  }

  const pageUrl = `${siteConfig.url}/projects/${id}`;
  const encodedImage = encodeURI(project.image);

  return {
    title: `${project.title} — Case Study`,
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
          url: encodedImage.startsWith("http")
            ? encodedImage
            : `${siteConfig.url}${encodedImage}`,
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
      images: [encodedImage],
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
  const detail =
    projectDetailExtensions[project.id] ??
    Object.values(projectDetailExtensions)[0];
  const prevProject =
    projectIndex > 0
      ? featuredProjects[projectIndex - 1]
      : featuredProjects[featuredProjects.length - 1];
  const nextProject =
    projectIndex < featuredProjects.length - 1
      ? featuredProjects[projectIndex + 1]
      : featuredProjects[0];
  const relatedProjects = getRelatedProjects(project.id);

  const projectSchema = getProjectSchema(project);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: project.shortTitle, url: `/projects/${project.id}` },
  ]);

  return (
    <>
      <JsonLd schema={[projectSchema, breadcrumbSchema]} />
      <ProjectDetailClient
        project={project}
        detail={detail}
        prevProject={prevProject}
        nextProject={nextProject}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
