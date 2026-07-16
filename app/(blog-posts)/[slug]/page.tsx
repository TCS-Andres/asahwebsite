import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Markdown } from "@/components/Markdown";
import { QuizCTA } from "@/components/QuizCTA";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug, getPostSlugs, formatPostDate } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

/*
  Root-level blog post route. The three migrated posts live at the top level of
  the domain (no /blog/ prefix) to match the live site exactly, so this dynamic
  segment sits inside the (blog-posts) route group, which does not add a path
  segment. Static pages like /about-us/ take precedence over this dynamic
  segment; only the three generated slugs render here and everything else 404s.
*/

// Only the three known slugs are generated. Any other slug returns a 404.
export const dynamicParams = false;

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

/*
  Closing CTA target per post. The oral appliance post points to the sleep
  appliances service; the clinic guide points to the sleep screening hub; the
  silent-crisis post points to CBCT airway screenings. These service routes are
  owned by other workers.
*/
const postCta: Record<
  string,
  { href: string; label: string; heading: string; body: string }
> = {
  "what-to-expect-at-an-austin-sleep-apnea-clinic-a-complete-patient-guide": {
    href: "/sleep-apnea-test/",
    label: "Take the Sleep Screening",
    heading: "Wondering whether a sleep evaluation is right for you?",
    body: "Take our quick, educational sleep apnea screening to better understand your risk factors.",
  },
  "why-sleep-apnea-is-a-silent-health-crisis-in-austin-and-how-to-catch-it-early":
    {
      href: "/services/cbct-airway-screenings/",
      label: "Explore CBCT Airway Screenings",
      heading: "Catch airway issues early",
      body: "See how a CBCT airway screening reveals structural details a routine exam can miss.",
    },
  "how-oral-appliance-therapy-works-austins-most-comfortable-alternative-to-cpap":
    {
      href: "/services/sleep-appliances/",
      label: "Explore Sleep Appliances",
      heading: "A comfortable option worth exploring",
      body: "Learn how a custom oral appliance gently keeps the airway open during sleep.",
    },
};

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

  const cta = postCta[post.slug];

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

          <h1 className="text-h1 mt-6 text-forest">{post.title}</h1>
          <p className="text-small mt-4 text-ink/70">
            Published {formatPostDate(post.publishedAt)}
          </p>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-10">
            <Markdown>{post.content}</Markdown>
          </div>

          <p className="text-small mt-12 border-t border-sage/20 pt-6 font-semibold text-forest">
            By Austin Sleep &amp; Airway Health
          </p>
        </Container>
      </Section>

      {cta && (
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
      )}

      <QuizCTA />
    </main>
  );
}
