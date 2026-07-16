import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import { QuizCTA } from "@/components/QuizCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedServices } from "@/components/RelatedServices";
import { JsonLd } from "@/components/JsonLd";
import { getAllServices, getServiceBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  // The frontmatter metaTitle already carries branding, so use it verbatim.
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${slug}/`,
    titleAbsolute: true,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const related = service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item !== undefined)
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      image: item.image,
      imageAlt: item.imageAlt,
    }));

  const jsonLd = [
    serviceSchema({
      title: service.title,
      summary: service.summary,
      slug: service.slug,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/" },
      { name: service.title },
    ]),
  ];

  if (service.faqs.length > 0) {
    jsonLd.push(
      faqPageSchema(service.faqs.map((faq) => ({ q: faq.q, a: faq.a }))),
    );
  }

  return (
    <main className="flex-1">
      <JsonLd data={jsonLd} />
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          opacity={0.1}
          className="pointer-events-none absolute -top-10 right-0 h-44 w-96"
        />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services/" },
              { label: service.title },
            ]}
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-eyebrow">{service.heroEyebrow}</p>
              <h1 className="text-h1 mt-3 text-forest">{service.heroHeading}</h1>
              <p className="text-body mt-6 max-w-xl">{service.summary}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={siteConfig.scheduleHref}>Schedule a visit</Button>
                <Button variant="outline" href={siteConfig.quizHubHref}>
                  Take the sleep screening
                </Button>
              </div>
            </div>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft-lg">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-headings:text-forest prose-p:text-ink prose-li:text-ink prose-strong:text-forest prose-a:text-terracotta">
            <Markdown remarkPlugins={[remarkGfm]}>{service.body}</Markdown>
          </div>
        </Container>
      </Section>

      {service.faqs.length > 0 && (
        <Section background="cream">
          <Container>
            <div className="mx-auto max-w-3xl">
              <EyebrowHeading
                eyebrow="Your Questions Answered"
                heading="Frequently Asked Questions"
              />
              <FAQAccordion
                className="mt-10"
                items={service.faqs.map((faq) => ({
                  question: faq.q,
                  answer: faq.a,
                }))}
              />
            </div>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section background="white">
          <Container>
            <RelatedServices services={related} />
          </Container>
        </Section>
      )}

      <QuizCTA />
    </main>
  );
}
