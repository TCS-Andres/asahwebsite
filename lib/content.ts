/*
  Content model for the seven service pages.
  Service copy lives in MDX files under content/services/ as YAML frontmatter
  plus a plain markdown body. This module validates that frontmatter with Zod
  and exposes typed loaders the routes use at build time.
*/
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const servicesDirectory = path.join(process.cwd(), "content", "services");

/* A single question and answer. drafted marks answers written by the rebuild
   team from existing page copy, versus answers lifted from the source page. */
export const serviceFaqSchema = z.object({
  q: z.string(),
  a: z.string(),
  drafted: z.boolean(),
});

/* Frontmatter contract shared by every service MDX file. */
export const serviceFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  order: z.number(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  heroEyebrow: z.string(),
  heroHeading: z.string(),
  summary: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  faqs: z.array(serviceFaqSchema),
  relatedServices: z.array(z.string()),
});

export type ServiceFaq = z.infer<typeof serviceFaqSchema>;
export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;

/* A fully loaded service: validated frontmatter plus its markdown body. */
export interface Service extends ServiceFrontmatter {
  body: string;
}

function readService(fileName: string): Service {
  const fullPath = path.join(servicesDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const frontmatter = serviceFrontmatterSchema.parse(parsed.data);
  return { ...frontmatter, body: parsed.content.trim() };
}

/* Every service, ordered by the frontmatter "order" field, 1 through 7. */
export function getAllServices(): Service[] {
  const files = fs
    .readdirSync(servicesDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));

  return files
    .map(readService)
    .sort((a, b) => a.order - b.order);
}

/* One service by slug, or undefined when no file matches. */
export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find((service) => service.slug === slug);
}
