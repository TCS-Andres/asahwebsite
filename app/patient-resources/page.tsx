import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { QuizCTA } from "@/components/QuizCTA";

/*
  Patient Resources page. The source page (content-source/patient-resources.md)
  is minimal: three downloadable resource cards, each with a title, an image,
  and a Download link. The underlying document URLs were not available to this
  worker, so each Download link points to RESOURCE_PLACEHOLDER for now.

  FLAG: replace RESOURCE_PLACEHOLDER on each card with the migrated asset URL
  (the New Patient Forms PDF, the Impact of Disorderly Breathing document, and
  the Nearby Lodging guide). See flags_for_human.
*/

const RESOURCE_PLACEHOLDER = "#";

const resources = [
  {
    title: "New Patient Forms",
    image: "/images/services/new-patient-forms-texas.avif",
    alt: "New patient forms for Austin Sleep & Airway Health",
    href: RESOURCE_PLACEHOLDER,
  },
  {
    title: "Impact of Disorderly Breathing",
    image: "/images/general/pexels-olly-3768582.avif",
    alt: "Restful sleep after addressing disordered breathing",
    href: RESOURCE_PLACEHOLDER,
  },
  {
    title: "Nearby Lodging",
    image:
      "/images/services/austin-tx-travel-and-local-guide-for-visitors-austin-sleep-and-airway-health-1.webp",
    alt: "Austin travel and local guide for visiting patients",
    href: RESOURCE_PLACEHOLDER,
  },
];

export default function PatientResourcesPage() {
  return (
    <main className="flex-1">
      <Section background="cream">
        <Container>
          <EyebrowHeading
            eyebrow="For Our Patients"
            heading="Patient Resources"
            as="h1"
          />
          <p className="text-body mt-6 max-w-2xl text-ink">
            Helpful documents to prepare for your visit and make the most of your
            care. Download the resources below, or reach out to our team if you
            have any questions.
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <ul className="grid gap-8 md:grid-cols-3">
            {resources.map((resource) => (
              <li
                key={resource.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-sage/20 bg-cream"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={resource.image}
                    alt={resource.alt}
                    fill
                    sizes="(min-width: 768px) 20rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start gap-5 p-6">
                  <h2 className="text-h3 text-forest">{resource.title}</h2>
                  <div className="mt-auto">
                    <Button variant="outline" href={resource.href}>
                      Download
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <QuizCTA />
    </main>
  );
}
