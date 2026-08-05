import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Sunburst } from "@/components/Sunburst";
import { getAllServices } from "@/lib/content";

/*
  Our Services: the section intro plus the seven services as image first
  color reveal cards, mirroring the services index structure: a featured
  full width lead card, then the remaining six in pairs. The content layer
  returns services in the homepage order (the frontmatter order field), and
  each card carries its 01 to 07 corner number, so the numbered concept of
  the original list survives inside the card treatment.
*/
export function OurServices() {
  const services = getAllServices();

  return (
    <Section background="cream" className="relative overflow-hidden">
      <Sunburst
        opacity={0.12}
        className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <EyebrowHeading
            eyebrow="Our Services"
            heading="Personalized Treatments for a Healthier You"
          />
          <p className="text-body mt-6 text-ink/75">
            At Austin Sleep and Airway Health, we offer a range of services
            designed to help you breathe better and sleep soundly. From
            detailed airway evaluations and sleep studies to myofunctional
            therapy and non-invasive treatment options, we ensure that every
            patient, whether child or adult, receives individualized care. Dr.
            Kacie Culotta works closely with each patient to develop a plan
            that fits your lifestyle, helping you improve your sleep and
            overall health.
          </p>
        </div>

        {/*
          Bento grid on desktop: a top row of three wider cards, then a bottom
          row of four narrower cards, on a 12 column track (3 x col-span-4,
          then 4 x col-span-3). It keeps the section short and reads as columns
          rather than one large hero over stacked pairs.
        */}
        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className={index < 3 ? "lg:col-span-4" : "lg:col-span-3"}
            >
              <Reveal delayMs={(index % 4) * 70}>
                <ServiceCard
                  title={service.title}
                  summary={service.summary}
                  href={`/services/${service.slug}/`}
                  image={service.image}
                  imageAlt={service.imageAlt}
                  number={String(service.order).padStart(2, "0")}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                />
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
