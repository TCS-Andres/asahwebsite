/*
  Blog loader for Austin Sleep & Airway Health posts.
  It reads the .mdx files in content/blog, parses their frontmatter with
  gray-matter, and exposes typed helpers for the blog index, the root-level post
  route, and the sitemap.

  Scheduling: a post is published once its publishedAt date has arrived in
  Austin (America/Chicago). Future-dated posts stay hidden everywhere: the blog
  index, related posts, the sitemap, and direct URLs (404). The pages that read
  from here revalidate hourly, so a scheduled post goes live on its date without
  a new deploy. next.config.ts traces content/blog into the server bundle so
  those hourly re-renders can read the files at runtime.

  The post body is returned as a raw markdown string (post.content) so the
  caller can render it with react-markdown. Frontmatter carries the title,
  excerpt, dates, and featured image, so the body itself starts at the
  first H2 and contains no duplicate H1.
*/
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/* Topic filters shown on the blog index, in display order. */
export const BLOG_CATEGORIES = [
  "Sleep Apnea & Snoring",
  "Evaluation & Treatment",
  "Kids & Teens",
  "Breathing & Airway",
  "Tongue Ties & Myofunctional Therapy",
  "TMJ, Jaw & Grinding",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/* The three migrated posts predate categories; they are all sleep apnea posts. */
const DEFAULT_CATEGORY: BlogCategory = "Sleep Apnea & Snoring";

export interface BlogPost {
  /** URL slug, root level, matches the live site exactly. */
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string, for example "2025-11-25". Also the go-live date. */
  publishedAt: string;
  /** ISO date string. Equal to publishedAt where source updated dates were illogical. */
  updatedAt: string;
  /** Featured image path under /public. */
  image: string;
  /** Alt text for the featured image. Falls back to the title. */
  imageAlt: string;
  category: BlogCategory;
  /** Optional closing CTA preset key, see lib/blog-cta.ts. */
  cta?: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  /** Raw markdown body, starting at the first H2 heading. */
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function toCategory(value: unknown): BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(String(value))
    ? (value as BlogCategory)
    : DEFAULT_CATEGORY;
}

let cache: BlogPost[] | null = null;

/*
  Read and parse every post file, published or scheduled, sorted newest first.
  Files never change inside a running production server, so the parse is
  memoized there. In development it rereads so new drafts show up.
*/
function readAllPosts(): BlogPost[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const wordCount = content.split(/\s+/).filter(Boolean).length;

    return {
      slug: String(data.slug),
      title: String(data.title),
      excerpt: String(data.excerpt),
      publishedAt: String(data.publishedAt),
      updatedAt: String(data.updatedAt ?? data.publishedAt),
      image: String(data.image),
      imageAlt: String(data.imageAlt ?? data.title),
      category: toCategory(data.category),
      cta: data.cta ? String(data.cta) : undefined,
      readingMinutes: Math.max(1, Math.round(wordCount / 230)),
      content,
    } satisfies BlogPost;
  });

  cache = posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return cache;
}

/* Today's date (YYYY-MM-DD) in the practice's timezone. */
export function todayInAustin(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
  }).format(new Date());
}

function isPublished(post: BlogPost, today = todayInAustin()): boolean {
  return post.publishedAt <= today;
}

/* Every published post, newest first. Scheduled posts are excluded. */
export function getAllPosts(): BlogPost[] {
  const today = todayInAustin();
  return readAllPosts().filter((post) => isPublished(post, today));
}

/* Published slugs, used by generateStaticParams. */
export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/*
  A single published post by slug. Unknown slugs and scheduled posts both
  return undefined, so the route 404s until the post's date arrives.
*/
export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = readAllPosts().find((entry) => entry.slug === slug);
  return post && isPublished(post) ? post : undefined;
}

/* Related posts: same category first, then the most recent, excluding the current post. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((post) => post.slug !== slug);
  const current = readAllPosts().find((post) => post.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameCategory = all.filter((post) => post.category === current.category);
  const others = all.filter((post) => post.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

/*
  Question and answer pairs from the post's "Frequently Asked Questions"
  section, used for FAQPage structured data. Answers are flattened to plain
  text, with markdown links reduced to their anchor text.
*/
export function getPostFaqs(post: BlogPost): Array<{ q: string; a: string }> {
  const start = post.content.indexOf("## Frequently Asked Questions");
  if (start === -1) return [];
  const section = post.content
    .slice(start + "## Frequently Asked Questions".length)
    .split(/^## /m)[0];

  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split("\n");
      const answer = rest
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      return { q: question.trim(), a: answer };
    })
    .filter((faq) => faq.q && faq.a);
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
