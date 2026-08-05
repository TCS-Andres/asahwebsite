import Script from "next/script";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";

/*
  Google reviews, rendered by the Elfsight widget. Elfsight platform.js scans
  the DOM for the app div and injects the reviews UI. It is a third party
  script, so this component stays on marketing pages only and never on a quiz
  route, per the HIPAA tracking rules in the build spec. The widget's own
  colors and layout are set in the Elfsight dashboard. This frames it on brand:
  the eyebrow heading, cream band, sunburst accent, and centered column.
*/
export function GoogleReviews() {
  return (
    <Section background="cream" className="relative overflow-hidden">
      <Sunburst
        opacity={0.1}
        className="pointer-events-none absolute -top-10 left-0 h-40 w-80"
      />
      <Container className="relative">
        <Reveal>
          <EyebrowHeading
            eyebrow="Patient Reviews"
            heading="What Our Patients Say"
            align="center"
            className="mx-auto max-w-2xl"
          />
          <p className="text-body mx-auto mt-5 max-w-xl text-center text-ink/70">
            Real stories from patients across Austin, straight from our Google
            profile.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-5xl">
          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="lazyOnload"
          />
          <div
            className="elfsight-app-cdc9ac2b-6878-43d8-947c-46badfef3ebc"
            data-elfsight-app-lazy
          />
        </div>
      </Container>
    </Section>
  );
}
