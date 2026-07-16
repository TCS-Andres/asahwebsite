import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import { siteConfig } from "@/lib/site";

interface Step {
  title: string;
  body: string;
}

/*
  The three step process. The live titles linked to leftover theme demo pages,
  so they are plain text now. One scheduling CTA closes the section.
*/
const steps: Step[] = [
  {
    title: "Book A Consultation",
    body: "Schedule your initial airway evaluation with Dr. Culotta. This is where we take the time to understand your unique health challenges and concerns.",
  },
  {
    title: "Receive Your Personalized Plan",
    body: "Based on your evaluation, Dr. Culotta will design a treatment plan specifically for you. We make sure it’s realistic, manageable, and effective.",
  },
  {
    title: "Breathe Better, Live Better",
    body: "With your custom plan in place, you’ll begin your journey to better health, improved sleep, and more energy. Follow your steps and get back to living your healthiest lives.",
  },
];

/*
  Take the First Step: the simple three step path to care.
*/
export function TakeTheFirstStep() {
  return (
    <Section background="cream" className="relative overflow-hidden">
      <Sunburst
        opacity={0.12}
        rotation={180}
        className="pointer-events-none absolute -bottom-10 left-0 h-40 w-80"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <EyebrowHeading
            eyebrow="Take the First Step"
            heading="A Simple Path to Better Sleep and Airway Health"
          />
          <p className="text-body mt-6 text-ink/75">
            Ready to improve your health and start feeling better? Here’s how to
            begin
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-white p-8">
              <span className="font-display text-4xl text-sage">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 mt-4 text-forest">{step.title}</h3>
              <p className="text-body mt-3 text-ink/75">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Button href={siteConfig.scheduleHref}>Schedule An Appointment</Button>
        </div>
      </Container>
    </Section>
  );
}
