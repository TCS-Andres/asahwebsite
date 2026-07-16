import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { siteConfig } from "@/lib/site";
import heroImage from "@/public/images/general/black-woman-morning-stretching-and-wake-up-in-hom-2023-11-27-05-07-23-utc.avif";

/*
  Full bleed homepage hero. The image sits behind a forest to ink gradient so
  the copy and the transparent header both stay legible. The negative top margin
  pulls the hero up under the sticky header so the header floats over the image.
*/
export function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-[100svh] items-center overflow-hidden">
      <Image
        src={heroImage}
        alt="A woman waking and stretching in bed in soft morning light"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Contrast overlays, kept within the brand token set. */}
      <div className="absolute inset-0 bg-forest/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/40"
        aria-hidden="true"
      />

      <Container className="relative py-28">
        <div className="max-w-3xl">
          <EyebrowHeading
            as="h1"
            eyebrow="Austin Airway and Sleep Dentist"
            heading="Your Path to Better Health Starts Here"
            className="[&_h1]:text-white [&_p]:text-cream"
          />
          <p className="text-body mt-6 max-w-2xl text-cream/90">
            At Austin Sleep and Airway Health, we know that true health begins
            with breathing well and sleeping soundly. Dr. Kacie Culotta and her
            team provide personalized airway and sleep care to help you and your
            family overcome airway challenges and enjoy a healthier, thriving
            life.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={siteConfig.scheduleHref}>Schedule Appointment</Button>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-3 text-base font-semibold text-white transition duration-200 hover:bg-white hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        className="absolute inset-x-0 bottom-6 flex justify-center"
        aria-hidden="true"
      >
        <span className="flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
          Scroll
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </span>
      </div>
    </section>
  );
}
