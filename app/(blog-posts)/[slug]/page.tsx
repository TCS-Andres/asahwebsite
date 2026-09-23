import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Markdown } from "@/components/Markdown";
import { QuizCTA } from "@/components/QuizCTA";
import { JsonLd } from "@/components/JsonLd";
import {
  getPostBySlug,
  getPostSlugs,
  getPostFaqs,
  getRelatedPosts,
  formatPostDate,
} from "@/lib/blog";
import { resolveBlogCta } from "@/lib/blog-cta";
import { buildMetadata } from "@/lib/seo";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/schema";

/*
  Root-level blog post route. Posts live at the top level of the domain (no
  /blog/ prefix) to match the live site, so this dynamic segment sits inside
  the (blog-posts) route group, which does not add a path segment. Static pages
  like /about-us/ take precedence over this dynamic segment.

  Scheduling: generateStaticParams prerenders the posts that are already
  published. A scheduled post is not prerendered; once its date arrives, the
  first request renders it on demand and it is cached from then on. Anything
  that is not a published post, whether an unknown slug or a post whose date
  has not arrived, calls notFound(), so arbitrary root slugs never render
  content. The hourly revalidate lets a cached 404 for a scheduled slug flip to
  the live post on its publish date.
*/
export const revalidate = 3600;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/${slug}/`,
    ogType: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const cta = resolveBlogCta(post);
  const faqs = getPostFaqs(post);
  const related = getRelatedPosts(post.slug, 3);
  // The sage quiz banner repeats the screening push, so skip it when the
  // post's own CTA already points to a screening.
  const showQuizBanner = !cta.href.startsWith("/sleep-apnea-test/");

  return (
    <main className="flex-1">
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            image: post.image,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog/" },
            { name: post.title },
          ]),
          ...(faqs.length > 0 ? [faqPageSchema(faqs)] : []),
        ]}
      />
      <Section background="white">
        <Container className="max-w-3xl">
          <Link
            href="/blog/"
            className="text-small font-semibold text-sage hover:text-forest"
          >
            &larr; Back to Blog
          </Link>

          <p className="text-eyebrow mt-8">{post.category}</p>
          <h1 className="text-h1 mt-3 text-forest">{post.title}</h1>
          <p className="text-small mt-4 text-ink/70">
            Published{" "}
            <time dateTime={post.publishedAt}>
              {formatPostDate(post.publishedAt)}
            </time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
          </p>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-cream">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-10">
            <Markdown>{post.content}</Markdown>
          </div>

          <div className="mt-12 border-t border-sage/20 pt-6">
            <p className="text-small font-semibold text-forest">
              By Austin Sleep &amp; Airway Health
            </p>
            <p className="text-small mt-2 text-ink/70">
              This article is for general education. It is not a diagnosis and
              does not replace an evaluation with a qualified provider.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="forest">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2 text-cream">{cta.heading}</h2>
            <p className="text-body mt-4 text-cream">{cta.body}</p>
            <div className="mt-8">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section background="cream">
          <Container>
            <p className="text-eyebrow">Keep Reading</p>
            <h2 className="text-h2 mt-3 text-forest">Related articles</h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <BlogCard
                    headingAs="h3"
                    post={{
                      slug: item.slug,
                      title: item.title,
                      excerpt: item.excerpt,
                      publishedAt: item.publishedAt,
                      displayDate: formatPostDate(item.publishedAt),
                      image: item.image,
                      imageAlt: item.imageAlt,
                      category: item.category,
                      readingMinutes: item.readingMinutes,
                    }}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {showQuizBanner && <QuizCTA />}
    </main>
  );
}
