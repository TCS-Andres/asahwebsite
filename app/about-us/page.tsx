import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import { QuizCTA } from "@/components/QuizCTA";
import { siteConfig } from "@/lib/site";

/*
  About page. Live URL is /about-us/ and is preserved here. Copy is migrated
  from content-source/about.md. The one em dash in the intro paragraph is
  removed ("we're more than a practice, we're a team..."), and the credential
  list normalizes "Dr" to "Dr." for consistency. One H1 lives in the hero.

  NOTE: A bio expansion from the Master Brain credentials section is planned
  but that document was not available to this worker. This page ships with the
  existing about.md copy; see flags_for_human in the worker output.
*/

const credentials = [
  {
    lead: "Laser-Certified Dentist",
    rest: " specializing in airway-focused dentistry.",
  },
  {
    lead: "D.ABDSM",
    rest: ": Diplomate of the American Board of Dental Sleep Medicine.",
  },
  {
    lead: "Qualified Dentist",
    rest: " with the American Academy of Dental Sleep Medicine.",
  },
  { lead: null, rest: "Breathe Institute Ambassador" },
  { lead: null, rest: "Breathe Institute Myofunctional Mastermind" },
];

const badges = [
  { src: "/images/credentials/ada-logo-400x200-m-1.webp", alt: "American Dental Association" },
  { src: "/images/credentials/texas-dental-association.webp", alt: "Texas Dental Association" },
  { src: "/images/credentials/tbi-ambassador-badge.webp", alt: "The Breathe Institute Ambassador" },
  { src: "/images/credentials/iatp-400x200-m-1.webp", alt: "International Association of Tongue-Tie Professionals" },
  { src: "/images/credentials/lightscalpel-co2-lasers-logo-ret.webp", alt: "LightScalpel CO2 Lasers" },
];

const values = [
  {
    title: "Expertise",
    body: "Ongoing education to stay at the forefront of airway health.",
  },
  {
    title: "Compassion",
    body: "Patient-centered care that focuses on your needs and concerns.",
  },
  {
    title: "Collaboration",
    body: "Working together to provide comprehensive, integrated care.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "About Dr. Kacie Culotta",
  description:
    "Meet Dr. Kacie Culotta and the Austin, TX team behind Austin Sleep and Airway Health, where airway focused care helps you breathe, sleep, and feel your best.",
  path: "/about-us/",
});

export default function AboutPage() {
  return (
    <main className="flex-1">
      <JsonLd data={personSchema()} />
      {/* Hero */}
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          opacity={0.12}
          className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <EyebrowHeading
                eyebrow="Compassionate Experts"
                heading="Meet the Faces Behind Your Care"
                as="h1"
              />
              <p className="text-body mt-6 max-w-xl text-ink">
                At Austin Sleep and Airway Health, we&rsquo;re more than a
                practice, we&rsquo;re a team dedicated to helping you breathe
                easier, sleep better, and live fully. Led by Dr. Kacie Culotta,
                we combine expertise, innovation, and genuine care to provide
                you and your family with the personalized treatment you deserve.
              </p>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl">
              <Image
                src="/images/doctor/austin-sleep-airway-health-doctor-kacie-culotta-texas.webp"
                alt="Portrait of Dr. Kacie Culotta"
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Dr. Culotta bio and credentials */}
      <Section background="white">
        <Container>
          <EyebrowHeading
            eyebrow="Passion, Expertise, and Personalized Care"
            heading="Your Dedicated Guide to Better Health"
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <p className="text-body text-ink">
                Dr. Kacie Culotta&rsquo;s journey into airway and sleep health
                began with her own family&rsquo;s needs, sparking a lifelong
                passion for helping others achieve better breathing and restful
                sleep. With over a decade of experience as a family dentist,
                lactation counselor, and myofunctional specialist, Dr. Culotta
                takes a holistic approach to patient care.
              </p>
              <p className="text-body text-ink">
                Dr. Culotta understands that airway and sleep issues can affect
                every aspect of life. Her mission is to identify the root causes
                of these challenges and create personalized treatment plans that
                empower patients of all ages to thrive. When she&rsquo;s not in
                the office, Dr. Culotta enjoys spending time with her husband and
                two daughters, exploring Austin&rsquo;s parks and trails.
              </p>
            </div>
            <div className="rounded-2xl border border-sage/20 bg-cream p-8">
              <p className="text-small font-semibold text-forest">
                Her qualifications include:
              </p>
              <ul className="mt-4 space-y-3">
                {credentials.map((item) => (
                  <li key={item.rest} className="text-body flex gap-3 text-ink">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-terracotta" />
                    <span>
                      {item.lead ? (
                        <>
                          <strong className="text-forest">{item.lead}</strong>
                          {item.rest}
                        </>
                      ) : (
                        item.rest
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Credential and affiliation badges */}
          <div className="mt-12">
            <p className="text-eyebrow mb-5 text-center">Training and Affiliations</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {badges.map((badge) => (
                <li key={badge.src} className="relative h-14 w-28">
                  <Image
                    src={badge.src}
                    alt={badge.alt}
                    fill
                    sizes="7rem"
                    className="object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section background="cream">
        <Container>
          <EyebrowHeading
            eyebrow="A Supportive Team Committed to You"
            heading="Dedicated Professionals, Unified Vision"
          />
          <p className="text-body mt-6 max-w-3xl text-ink">
            Our team at Austin Sleep and Airway Health shares Dr. Culotta&rsquo;s
            passion for improving airway health and sleep quality. Each member
            brings their unique skills and dedication to ensure you receive the
            highest level of care.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-sage/20 bg-white p-8"
              >
                <h3 className="text-h3 text-forest">{value.title}</h3>
                <p className="text-body mt-3 text-ink">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section background="forest">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-cream/90">
              Your Journey to Better Health Starts Here
            </p>
            <h2 className="text-h2 mt-3 text-cream">Ready to Begin?</h2>
            <p className="text-body mt-5 text-cream">
              Schedule a consultation with Dr. Culotta and our team today.
              Let&rsquo;s work together to improve your airway health, sleep
              quality, and overall well-being.
            </p>
            <div className="mt-8">
              <Button href={siteConfig.scheduleHref}>
                Schedule Your Appointment
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <QuizCTA />
    </main>
  );
}
