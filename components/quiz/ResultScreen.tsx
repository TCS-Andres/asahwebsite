"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { Section, Container, Button, Sunburst } from "@/components";
import { siteConfig } from "@/lib/site";
import { readQuizResult } from "./session";

export interface ResultScreenProps {
  slug: string;
}

// A no-op external store. The subscribe never fires, so the value is read once
// after hydration. This returns false during server render and the hydration
// pass, then true on the client, which lets us read sessionStorage safely.
const subscribe = () => () => {};

export function ResultScreen({ slug }: ResultScreenProps) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  // Read the computed result from sessionStorage, never from the URL.
  const data = useMemo(() => (hydrated ? readQuizResult() : null), [hydrated]);

  if (!hydrated) {
    return (
      <main className="flex-1">
        <Section background="cream">
          <Container>
            <p className="text-body text-center text-forest/70">Preparing your results.</p>
          </Container>
        </Section>
      </main>
    );
  }

  if (!data || data.slug !== slug) {
    return (
      <main className="flex-1">
        <Section background="cream">
          <Container>
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-h2 text-forest">We could not find your results</h1>
              <p className="text-body mt-4">
                Results are held in this browser session only. This can happen if the page was
                refreshed or opened directly. You can take the screening again in just a couple of
                minutes.
              </p>
              <div className="mt-6">
                <Button href={`/sleep-apnea-test/${slug}/`}>Back to the screening</Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  const { result, quizTitle, disclaimer } = data;
  const bookingHref = `${siteConfig.domain}/schedule/`;

  return (
    <main className="flex-1">
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          opacity={0.1}
          className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
        />
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
              <p className="text-eyebrow">{quizTitle}</p>
              <h1 className="text-h1 mt-3 text-forest">{result.heading}</h1>
              <p className="text-body mt-5">{result.body}</p>

              {result.notes && result.notes.length > 0
                ? result.notes.map((note, i) => (
                    <p key={i} className="text-body mt-4 font-semibold text-forest">
                      {note}
                    </p>
                  ))
                : null}

              {result.flaggedDomains && result.flaggedDomains.length > 0 ? (
                <div className="mt-8">
                  <h2 className="text-h3 text-forest">Areas worth a closer look</h2>
                  <ul className="mt-4 flex flex-col gap-4">
                    {result.flaggedDomains.map((domain) => (
                      <li
                        key={domain.domain}
                        className="rounded-2xl border-2 border-sage/20 bg-cream p-5"
                      >
                        <p className="text-small font-semibold uppercase tracking-wide text-sage">
                          {domain.domain}
                        </p>
                        <p className="text-body mt-2">{domain.explanation}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-8 rounded-2xl border-l-4 border-gold bg-cream p-5">
                <p className="text-small text-ink">{disclaimer}</p>
              </div>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href={bookingHref}>Schedule a Consultation</Button>
                <a
                  href={siteConfig.phoneHref}
                  className="text-body font-semibold text-sage underline underline-offset-4"
                >
                  Or call {siteConfig.phone}
                </a>
              </div>
            </div>

            <p className="text-small mt-8 text-center text-forest/60">
              <Link href={`/sleep-apnea-test/${slug}/`} className="text-sage underline">
                Retake this screening
              </Link>{" "}
              or{" "}
              <Link href="/sleep-apnea-test/" className="text-sage underline">
                explore other screenings
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
