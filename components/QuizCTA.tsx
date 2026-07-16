import { Button } from "./Button";
import { Container } from "./Container";
import { Sunburst } from "./Sunburst";
import { siteConfig } from "@/lib/site";

export interface QuizCTAProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  buttonLabel?: string;
  className?: string;
}

/*
  The repeating sage quiz banner. It appears on the homepage, at the bottom
  of every service page, and anywhere else a page needs the quiz push.
  Owned by the scaffold layer: import it, do not fork or restyle it.
*/
export function QuizCTA({
  eyebrow = "Free Sleep Apnea Quiz",
  heading = "Do You Have Sleep Apnea? Find Out Now",
  body = "Snoring, fatigue, and restless nights could be signs of sleep apnea, a condition that affects your health more than you might realize. Take our quick, easy Sleep Apnea Quiz to uncover potential risk factors and determine if it’s time to seek expert care. In just a few minutes, you’ll gain valuable insights into your sleep health and take the first step toward better breathing, restful nights, and a healthier life. Don’t wait. Your journey to better sleep starts here!",
  buttonLabel = "Take Free Quiz",
  className = "",
}: QuizCTAProps) {
  return (
    <section className={`relative overflow-hidden bg-sage py-16 md:py-20 ${className}`}>
      <Sunburst
        color="var(--color-cream)"
        opacity={0.1}
        className="pointer-events-none absolute -top-8 right-0 h-48 w-96"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-cream/90">{eyebrow}</p>
          <h2 className="text-h2 mt-3 text-white">{heading}</h2>
          <p className="text-body mt-5 text-cream">{body}</p>
          <div className="mt-8">
            <Button href={siteConfig.quizHubHref}>{buttonLabel}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
