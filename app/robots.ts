/*
  robots.txt. Everything is crawlable except the API routes and the private quiz
  results routes. The "*" wildcard in the results path matches any quiz slug, for
  example /sleep-apnea-test/adult/results/.
*/
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/sleep-apnea-test/*/results/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
