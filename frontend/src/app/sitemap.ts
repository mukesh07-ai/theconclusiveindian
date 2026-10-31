import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_ARTICLES } from "@/data/mockArticles";
import { MOCK_AUTHORS } from "@/data/mockAuthors";
import { getAllTags } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, "");
  const now = new Date();

  // 1. Static Core & Trust Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/latest-news`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/fact-check-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/corrections-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/advertise-with-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/grievance-redressal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ownership-and-funding`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // 2. Category Pages
  const categoryRoutes: MetadataRoute.Sitemap = SITE_CONFIG.categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // 3. News Article Pages
  const articleRoutes: MetadataRoute.Sitemap = MOCK_ARTICLES.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: "weekly",
    priority: article.isBreaking || article.isFeatured ? 0.9 : 0.8,
  }));

  // 4. Author Profiles
  const authorRoutes: MetadataRoute.Sitemap = Object.values(MOCK_AUTHORS).map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 5. Topic Tags
  const allTags = await getAllTags();
  const tagRoutes: MetadataRoute.Sitemap = allTags.map((tagItem) => ({
    url: `${baseUrl}/tag/${tagItem.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...authorRoutes,
    ...tagRoutes,
  ];
}
