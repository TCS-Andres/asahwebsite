import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { LocationCard } from "@/components/LocationCard";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

const mapSrc =
  "https://www.google.com/maps?q=1701+Simond+Ave+Suite+107A+Austin+TX+78723&output=embed";

/*
  Homepage contact section. Sits after the Take the First Step plan and gathers
  the three things a visitor needs to reach the practice: a message form, the
  contact details and office hours, and a map. It stacks to a single column on
  mobile and splits into two columns from the large breakpoint.
*/
export function VisitUs() {
  return (
    <Section background="white" id="contact">
      <Container>
        <div className="max-w-2xl">
          <EyebrowHeading
            eyebrow="Get in Touch"
            heading="Contact Us and Plan Your Visit"
          />
          <p className="text-body mt-6 text-ink/75">
            Have a question or ready to get started? Send us a message, give us
            a call, or stop by the office here in Austin, TX. Our friendly team
            is happy to help.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="text-h3 text-forest">Send Us a Message</h3>
            <p className="text-body mb-8 mt-3 text-ink/75">
              Fill out the form and our team will get back to you as soon as we
              can.
            </p>
            <ContactForm />
          </Reveal>

          <Reveal delayMs={90} className="space-y-8">
            <LocationCard heading="Come See Us" />
            <div className="overflow-hidden rounded-2xl border border-sage/20 shadow-soft">
              <iframe
                src={mapSrc}
                title={`Map to ${siteConfig.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-72 w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
