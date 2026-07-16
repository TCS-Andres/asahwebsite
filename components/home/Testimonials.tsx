"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import testimonialsData from "@/content/testimonials.json";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

const testimonials = testimonialsData as Testimonial[];

/*
  Accessible testimonials carousel. Previous and next buttons plus dot controls,
  arrow key support when the region has focus, and an aria-live region that
  announces the active quote. The fade animation is gated behind
  prefers-reduced-motion so it is skipped for users who ask for less motion.
*/
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  function goTo(next: number) {
    setIndex((next + count) % count);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  const active = testimonials[index];

  return (
    <Section background="white">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .asah-testimonial-fade { animation: asahTestimonialFade 0.5s ease; }
        }
        @keyframes asahTestimonialFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Container>
        <EyebrowHeading
          eyebrow="Testimonials"
          heading="What Our Patients Say"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Patient testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative mx-auto mt-12 max-w-3xl rounded-3xl bg-cream p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage md:p-12"
        >
          <span
            aria-hidden="true"
            className="block font-display text-6xl leading-none text-sage/40"
          >
            &ldquo;
          </span>

          <div aria-live="polite">
            <blockquote key={index} className="asah-testimonial-fade">
              <p className="text-h3 font-display text-forest">{active.quote}</p>
              <footer className="mt-6">
                <span className="block text-body font-semibold text-forest">
                  {active.name}
                </span>
                <span className="text-small text-ink/60">
                  {active.location}
                </span>
              </footer>
            </blockquote>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((testimonial, dot) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-current={dot === index}
                  aria-label={`Show testimonial ${dot + 1} of ${count}`}
                  onClick={() => goTo(dot)}
                  className={`h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                    dot === index ? "w-8 bg-terracotta" : "w-2.5 bg-sage/40 hover:bg-sage"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-sage text-sage transition hover:bg-sage hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-sage text-sage transition hover:bg-sage hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
