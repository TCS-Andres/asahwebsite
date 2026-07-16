import Link from "next/link";
import { Section, Container, EyebrowHeading, Sunburst } from "@/components";
import { orderedQuizzes } from "@/lib/quizzes";

/*
  Screening hub. Intro plus one card per quiz, each with its audience label and
  time estimate. Metadata for this route is owned by the SEO worker.
*/
export default function SleepApneaTestHubPage() {
  return (
    <main className="flex-1">
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          opacity={0.12}
          className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
        />
        <Container>
          <EyebrowHeading
            eyebrow="Free Sleep and Airway Screenings"
            heading="Find the screening that fits"
            as="h1"
            align="center"
          />
          <p className="text-body mx-auto mt-6 max-w-2xl text-center">
            Each screening takes just a few minutes and gives you private results right away. These
            screenings are educational and are not a diagnosis. They help our team understand how we
            can help.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {orderedQuizzes.map((quiz) => (
              <Link
                key={quiz.slug}
                href={`/sleep-apnea-test/${quiz.slug}/`}
                className="group flex flex-col rounded-3xl border-2 border-sage/20 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-sage hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
              >
                <p className="text-eyebrow">{quiz.audience}</p>
                <h2 className="text-h3 mt-2 text-forest">{quiz.title}</h2>
                <p className="text-small mt-3 flex-1 text-ink/80">{quiz.summary}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-sage/10 px-3 py-1 text-small font-semibold text-forest">
                    {quiz.intro.timeEstimate}
                  </span>
                  <span className="text-small font-semibold text-terracotta group-hover:underline">
                    Start
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
