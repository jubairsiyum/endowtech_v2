import { siteConfig } from "@/data/siteConfig";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  const isProd =
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production";

  if (!isProd) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow all leading AI Search Engines and Knowledge Crawlers
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Bytespider",
          "CCBot",
          "cohere-ai",
          "FacebookBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
