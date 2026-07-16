import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

interface Symptom {
  label: string;
  body: string;
}

/*
  The eight symptom items. The Daytime Sleepiness copy replaces the live line,
  which used an em dash, with two sentences.
*/
const symptoms: Symptom[] = [
  {
    label: "Chronic Fatigue",
    body: "Tired of always being tired? We’ll help you get the restorative sleep your body needs.",
  },
  {
    label: "Snoring",
    body: "Our personalized treatments will reduce snoring and help you (and your partner) enjoy quieter nights.",
  },
  {
    label: "Mouth Breathing",
    body: "We’ll address the root of this issue and improve your overall breathing patterns, especially for children.",
  },
  {
    label: "Frequent Headaches",
    body: "By treating airway obstructions, we can relieve the headaches caused by poor oxygen flow.",
  },
  {
    label: "Daytime Sleepiness",
    body: "Say goodbye to constant drowsiness. Our solutions will help you feel more awake and alert during the day.",
  },
  {
    label: "Poor Focus and Memory",
    body: "With improved sleep, you’ll sharpen your focus and enhance your cognitive function.",
  },
  {
    label: "Irritability and Mood Swings",
    body: "We’ll help you restore balance in your mood by improving the quality of your sleep.",
  },
  {
    label: "Jaw Pain or TMJ Issues",
    body: "Our treatments will address breathing-related jaw issues, helping you feel more comfortable.",
  },
];

/*
  Addressing The Root Causes: intro plus a grid of the eight symptom items.
*/
export function RootCauses() {
  return (
    <Section background="white">
      <Container>
        <div className="max-w-3xl">
          <EyebrowHeading
            eyebrow="Addressing The Root Causes"
            heading="Resolve the Symptoms for a Better Life"
          />
          <p className="text-body mt-6 text-ink/75">
            At Austin Sleep and Airway Health, we understand how frustrating
            airway and sleep-related issues can be. The good news? We have the
            expertise and solutions to help you overcome these challenges and
            feel your best again. If you’re experiencing any of the following
            symptoms, we’re here to guide you to the right treatment:
          </p>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {symptoms.map((symptom) => (
            <li key={symptom.label} className="flex gap-4">
              <span
                className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p className="text-body text-ink/75">
                <strong className="font-semibold text-forest">
                  {symptom.label}:
                </strong>{" "}
                {symptom.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button href={siteConfig.scheduleHref}>Schedule An Appointment</Button>
        </div>
      </Container>
    </Section>
  );
}
