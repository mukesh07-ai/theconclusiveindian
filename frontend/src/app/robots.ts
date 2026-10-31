import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/search",
          "/api/",
          "/_next/",
          "/admin/",
        ],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-News",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
        disallow: ["/search", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Cohere-ai",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/search", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
