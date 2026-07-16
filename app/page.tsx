import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import { siteConfig } from "@/lib/site";

/*
  Placeholder home page. It exercises the shared primitives so the build has
  something to render. A later worker replaces this with the real homepage.
*/
export default function Home() {
  return (
    <main className="flex-1">
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          rotation={0}
          opacity={0.12}
          className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
        />
        <Container>
          <EyebrowHeading
            eyebrow="Scaffold placeholder"
            heading={siteConfig.name}
            as="h1"
            align="center"
          />
          <p className="text-body mx-auto mt-6 max-w-2xl text-center">
            This placeholder verifies that the shared primitives render. It will
            be replaced by the real homepage in a later step of the rebuild.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={siteConfig.scheduleHref}>Schedule a visit</Button>
            <Button variant="outline" href={siteConfig.quizHubHref}>
              Take the sleep screening
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
