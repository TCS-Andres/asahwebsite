import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogIndex } from "@/components/BlogIndex";
import type { BlogCardPost } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import { QuizCTA } from "@/components/QuizCTA";
import {
  BLOG_CATEGORIES,
  getAllPosts,
  formatPostDate,
  type BlogPost,
} from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sleep & Airway Blog",
  description:
    "Read sleep and airway health insights from Austin Sleep and Airway Health in Austin, TX, with guidance on sleep apnea, breathing, and comfortable care.",
  path: "/blog/",
});

// Re-render hourly so scheduled posts appear on their publish date.
export const revalidate = 3600;

function toCard(post: BlogPost): BlogCardPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    displayDate: formatPostDate(post.publishedAt),
    image: post.image,
    imageAlt: post.imageAlt,
    category: post.category,
    readingMinutes: post.readingMinutes,
  };
}

/*
  Blog index. The newest published post is featured at the top, and every
  other post sits in a topic-filterable grid that reveals twelve at a time.
  Each card links to the post at its root-level URL (/slug/). Data comes from
  lib/blog.ts, which hides scheduled posts until their date.
*/
export default function BlogPage() {
  const posts = getAllPosts().map(toCard);
  const [featured, ...rest] = posts;

  return (
    <main className="flex-1">
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          color="var(--color-sage)"
          opacity={0.12}
          className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
        />
        <Container className="relative">
          <EyebrowHeading
            eyebrow="Sleep and Airway Insights"
            heading="Blog"
            as="h1"
          />
          <p className="text-body mt-6 max-w-2xl text-ink">
            Clear, practical guidance on sleep apnea, snoring, children&rsquo;s
            sleep and breathing, tongue ties, TMJ, and airway-focused care from
            the team at Austin Sleep &amp; Airway Health.
          </p>

          {featured && (
            <Link
              href={`/${featured.slug}/`}
              className="group mt-12 grid overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-soft transition duration-200 ease-out hover:-translate-y-1 hover:border-sage/40 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 lg:grid-cols-2"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-cream lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="object-cover transition duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-eyebrow">
                  Latest <span aria-hidden="true">·</span> {featured.category}
                </p>
                <h2 className="text-h2 mt-3 text-forest transition-colors duration-200 ease-out group-hover:text-sage">
                  {featured.title}
                </h2>
                <p className="text-body mt-4 text-ink">{featured.excerpt}</p>
                <p className="text-small mt-6 text-ink/60">
                  <time dateTime={featured.publishedAt}>
                    {featured.displayDate}
                  </time>
                  <span aria-hidden="true"> · </span>
                  {featured.readingMinutes} min read
                </p>
                <span className="text-small mt-4 font-semibold text-terracotta">
                  Read the article
                </span>
              </div>
            </Link>
          )}
        </Container>
      </Section>

      {rest.length > 0 && (
        <Section background="white">
          <Container>
            <h2 className="text-h2 text-forest">Browse by topic</h2>
            <div className="mt-8">
              <BlogIndex posts={rest} categories={BLOG_CATEGORIES} />
            </div>
          </Container>
        </Section>
      )}

      <QuizCTA />
    </main>
  );
}
