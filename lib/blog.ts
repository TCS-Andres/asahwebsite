/*
  Blog loader for the migrated Austin Sleep & Airway Health posts.
  This module is owned by the secondary-pages worker. It reads the .mdx
  files in content/blog, parses their frontmatter with gray-matter, and
  exposes typed helpers for the blog index and the root-level post route.

  The post body is returned as a raw markdown string (post.content) so the
  caller can render it with react-markdown. Frontmatter carries the title,
  excerpt, dates, and featured image, so the body itself starts at the
  first H2 and contains no duplicate H1.
*/
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogPost {
  /** URL slug, root level, matches the live site exactly. */
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string, for example "2025-11-25". */
  publishedAt: string;
  /** ISO date string. Equal to publishedAt where source updated dates were illogical. */
  updatedAt: string;
  /** Featured image path under /public. */
  image: string;
  /** Raw markdown body, starting at the first H2 heading. */
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/*
  Read and parse every post. Sorted newest first by publishedAt.
  Reads happen at build time during static generation.
*/
export function getAllPosts(): BlogPost[] {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug: String(data.slug),
      title: String(data.title),
      excerpt: String(data.excerpt),
      publishedAt: String(data.publishedAt),
      updatedAt: String(data.updatedAt),
      image: String(data.image),
      content,
    } satisfies BlogPost;
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** All slugs, used by generateStaticParams. */
export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/** A single post by slug, or undefined when the slug is unknown. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/*
  Format an ISO date string as a friendly US date, for example
  "November 25, 2025". Uses UTC so the displayed day never shifts by
  timezone during static generation.
*/
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
