import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import { LocationCard } from "@/components/LocationCard";
import { ScheduleForm } from "@/components/ScheduleForm";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Schedule a Visit",
  description:
    "Schedule your visit with Austin Sleep and Airway Health in Austin, TX. Call our team or request an appointment to start toward better breathing and sleep.",
  path: "/schedule/",
});

/*
  Schedule page. This replaces the old site's broken "Book Now" target, which
  404'd. It is phone-first: the practice phone number is the primary call to
  action, shown large as a tel: link. A request form posts to /api/contact with
  formType "schedule-request" so the practice can follow up. No quiz banner
  here, the page stays focused on getting the visit booked.
*/

export default function SchedulePage() {
  return (
    <main className="flex-1">
      {/* Phone-first hero */}
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          opacity={0.12}
          className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <EyebrowHeading
              eyebrow="Get Started"
              heading="Schedule Your Visit"
              as="h1"
              align="center"
            />
            <p className="text-body mt-6 text-ink">
              The fastest way to book is to give us a call. Reach our team during
              office hours, Monday, Tuesday, and Friday from 8:00 AM to 3:30 PM,
              and we will find a time that works for you.
            </p>

            <div className="mt-8">
              <a
                href={siteConfig.phoneHref}
                className="text-display font-display text-terracotta hover:brightness-95"
              >
                {siteConfig.phone}
              </a>
              <p className="text-small mt-3 text-ink/70">
                Tap or click to call on your phone.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" href={siteConfig.phoneHref}>
                Call {siteConfig.phone}
              </Button>
              {/*
                Book Online appears only when NEXT_PUBLIC_BOOKING_URL is set in
                the environment. Once the client provides an online booking link,
                set that env var and redeploy. No code change is needed.
              */}
              {siteConfig.bookingUrl && (
                <Button
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Online
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Request form + location */}
      <Section background="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-h2 text-forest">Request an Appointment</h2>
              <p className="text-body mt-3 mb-8 text-ink">
                Prefer to have us reach out? Share a few details and our team
                will contact you to confirm your visit. This is a request, not a
                confirmed booking.
              </p>
              <ScheduleForm />
            </div>

            <div>
              <LocationCard heading="Where to Find Us" />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
