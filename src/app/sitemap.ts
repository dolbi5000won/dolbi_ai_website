import type { MetadataRoute } from "next";
import { COURSES } from "@/lib/content/academy";
import { INSIGHTS } from "@/lib/content/insights";
import { absoluteUrl, getSiteUrl, PUBLIC_ROUTES } from "@/lib/seo";

/**
 * Sitemap entries are emitted only when NEXT_PUBLIC_SITE_URL is set.
 * Do not invent a production domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!getSiteUrl()) {
    return [];
  }

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path)!,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const courseEntries: MetadataRoute.Sitemap = COURSES.map((course) => ({
    url: absoluteUrl(`/academy/${course.slug}`)!,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const insightEntries: MetadataRoute.Sitemap = INSIGHTS.map((insight) => ({
    url: absoluteUrl(`/insight/${insight.slug}`)!,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...courseEntries, ...insightEntries];
}
