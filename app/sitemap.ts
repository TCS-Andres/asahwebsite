/*
  Sitemap for every indexable route, each with a trailing slash to match the
  trailingSlash: true config. Service, quiz, and blog routes are derived from
  the same loaders the pages use, so the sitemap stays in sync with content.

  Excluded on purpose: the /api/ routes and the private quiz results routes
  under each screening (the results segment), which are noindex.
*/
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getAllServices } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";
import { quizSlugs } from "@/lib/quizzes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about-us/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact-us/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/schedule/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/patient-resources/"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/services/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/sleep-apnea-test/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog/"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const serviceEntries: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: absoluteUrl(`/services/${service.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const quizEntries: MetadataRoute.Sitemap = quizSlugs.map((slug) => ({
    url: absoluteUrl(`/sleep-apnea-test/${slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/${post.slug}/`),
    lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Legal pages: indexable, but kept at low priority so they never take
  // prominence over care pages.
  const legalEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/privacy-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms-and-conditions/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/hipaa-notice-of-privacy-practices/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...staticEntries,
    ...serviceEntries,
    ...quizEntries,
    ...blogEntries,
    ...legalEntries,
  ];
}
