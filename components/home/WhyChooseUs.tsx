import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { ReactNode } from "react";

interface Reason {
  title: string;
  body: string;
  icon: ReactNode;
}

const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const reasons: Reason[] = [
  {
    title: "Functional Approach",
    body: "We don’t just treat the symptoms; we address the root cause of your airway and sleep issues to enhance your overall health and well-being.",
    icon: (
      <svg {...iconProps}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
  },
  {
    title: "Personalized Care",
    body: "No two patients are alike. We create tailored treatment plans that focus on your unique needs to ensure you get the best care possible.",
    icon: (
      <svg {...iconProps}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    title: "Expert Guidance",
    body: "With over a decade of experience, our team combines medical expertise with a deep understanding of airway health, ensuring you receive the highest level of care.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
      </svg>
    ),
  },
];

/*
  Why Choose Us: the three reason cards on a white band.
*/
export function WhyChooseUs() {
  return (
    <Section background="white">
      <Container>
        <EyebrowHeading
          eyebrow="Why Choose Us"
          heading="Breathe Better, Sleep Deeper, Live Healthier"
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} className="h-full" delayMs={index * 90}>
              <div className="group h-full rounded-3xl bg-cream p-8 shadow-soft transition duration-200 ease-out hover:-translate-y-1.5 hover:shadow-soft-lg">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sage text-white transition-transform duration-200 ease-out group-hover:scale-105">
                  {reason.icon}
                </span>
                <h3 className="text-h3 mt-6 text-forest">{reason.title}</h3>
                <p className="text-body mt-3 text-ink/75">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
