import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import { QuizCTA } from "@/components/QuizCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getAllServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Explore airway and sleep services at Austin Sleep and Airway Health in Austin, TX, from CBCT screenings to oral appliances and myofunctional collaboration.",
  path: "/services/",
});

export default function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <main className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services" },
        ])}
      />
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          opacity={0.1}
          className="pointer-events-none absolute -top-10 right-0 h-44 w-96"
        />
        <Container className="relative">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          />
          <div className="mt-10 max-w-3xl">
            <EyebrowHeading
              eyebrow="Our Services"
              heading="Personalized Treatments for a Healthier You"
              as="h1"
            />
            <p className="text-body mt-6">
              Every treatment at Austin Sleep and Airway Health starts with your
              airway. Explore the ways Dr. Culotta helps patients in Austin, TX
              breathe easier, sleep more soundly, and feel better, with care
              shaped around your needs at every stage of life.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sage/15 bg-white transition duration-200 hover:border-sage/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-eyebrow text-gold">
                      {String(service.order).padStart(2, "0")}
                    </p>
                    <h2 className="text-h3 mt-2 text-forest">{service.title}</h2>
                    <p className="text-small mt-3 text-ink/80">
                      {service.summary}
                    </p>
                    <span className="text-eyebrow mt-5 inline-block text-terracotta">
                      Learn more
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <QuizCTA />
    </main>
  );
}
