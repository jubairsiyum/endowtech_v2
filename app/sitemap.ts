import { featuredProjects } from "@/data/featuredProjects";
import { coreServices } from "@/data/services";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://endowtech.net";
  const now = new Date();

  // Primary Landing Page
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Dynamic Project Detail Pages
  const projectRoutes: MetadataRoute.Sitemap = featuredProjects.map(
    (project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  // Dynamic Service Detail Pages
  const serviceRoutes: MetadataRoute.Sitemap = coreServices.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
