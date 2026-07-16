import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { QuizCTA } from "@/components/QuizCTA";
import { LocationCard } from "@/components/LocationCard";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

/*
  Contact page. Live URL is /contact-us/ and is preserved here. Intro copy is
  migrated from content-source/contact.md. The NAP block, embedded map, contact
  form, and an "Areas We Serve" section make up the body.

  FLAG: the "Areas We Serve" list is a placeholder judgment call. It should be
  confirmed against the keyword strategy before launch. See flags_for_human.
*/

const areasServed = [
  "Mueller",
  "Cherrywood",
  "Hyde Park",
  "North Loop",
  "Windsor Park",
  "East Austin",
  "Round Rock",
  "Pflugerville",
  "Cedar Park",
];

const mapSrc =
  "https://www.google.com/maps?q=1701+Simond+Ave+Suite+107A+Austin+TX+78723&output=embed";

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <Section background="cream">
        <Container>
          <div className="max-w-2xl">
            <EyebrowHeading
              eyebrow="Let’s Connect"
              heading="Take the First Step to Better Health"
              as="h1"
            />
            <p className="text-body mt-6 text-ink">
              Whether you have questions, need to schedule an appointment, or
              want to learn more about our services, we&rsquo;re here to help.
              Reach out to us today and let&rsquo;s start your journey to better
              breathing, sleep, and overall well-being.
            </p>
          </div>
        </Container>
      </Section>

      {/* Form + location */}
      <Section background="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-h2 text-forest">Send Us a Message</h2>
              <p className="text-body mt-3 mb-8 text-ink">
                Fill out the form and our friendly team will get back to you as
                soon as possible.
              </p>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <LocationCard heading="Come See Us" />
              <div className="overflow-hidden rounded-2xl border border-sage/20">
                <iframe
                  src={mapSrc}
                  title={`Map to ${siteConfig.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-72 w-full border-0"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Areas we serve */}
      <Section background="cream">
        <Container>
          <EyebrowHeading
            eyebrow="Conveniently Located in Austin"
            heading="Areas We Serve"
          />
          <p className="text-body mt-6 max-w-3xl text-ink">
            Our office sits in the Mueller district of Austin, welcoming
            patients and families from across Central Texas. We are proud to
            care for neighbors throughout the area, including these nearby
            communities.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {areasServed.map((area) => (
              <li
                key={area}
                className="rounded-full border border-sage/30 bg-white px-5 py-2 text-small font-medium text-forest"
              >
                {area}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <QuizCTA />
    </main>
  );
}
