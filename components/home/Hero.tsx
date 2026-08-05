import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { HeroVideo } from "@/components/home/HeroVideo";
import { siteConfig } from "@/lib/site";

/*
  Full bleed homepage hero. An ambient background video sits behind a forest to
  ink gradient so the copy stays legible. The heading and copy are server
  rendered for a fast, stable LCP; only the video element is a client component,
  and it holds on the poster still until motion is allowed. The header is solid
  white and sits above the hero, so the hero fills the viewport below it.
*/
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-6rem)] items-center overflow-hidden">
      <HeroVideo
        src="/videos/hero-ambient.mp4"
        poster="/images/general/hero-video-poster.avif"
      />

      {/* Contrast overlays, kept within the brand token set. A forest to ink
          wash for depth, plus a left lean so the copy column stays readable. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/45 to-ink/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/15 to-transparent"
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
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-3 text-base font-semibold text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
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
