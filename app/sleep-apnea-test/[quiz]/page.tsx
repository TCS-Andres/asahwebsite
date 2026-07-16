import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { quizSlugs, getQuiz } from "@/lib/quizzes";
import { buildMetadata } from "@/lib/seo";

// Only the five known slugs are valid. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return quizSlugs.map((slug) => ({ quiz: slug }));
}

/*
  SEO copy per screening. Framing is strictly educational: these are screenings
  that help our team understand a visitor, never diagnostic tests.
*/
const quizSeo: Record<string, { title: string; description: string }> = {
  adult: {
    title: "Adult Sleep Apnea Screening",
    description:
      "Answer a few questions in this free, educational adult sleep screening from Austin Sleep and Airway Health in Austin, TX to understand your risk factors.",
  },
  "ages-2-5": {
    title: "Sleep Screening: Ages 2 to 5",
    description:
      "A free, educational sleep screening for children ages 2 to 5 from Austin Sleep and Airway Health in Austin, TX, helping parents understand early risk factors.",
  },
  "ages-6-12": {
    title: "Sleep Screening: Ages 6 to 12",
    description:
      "A free, educational sleep screening for children ages 6 to 12 from Austin Sleep and Airway Health in Austin, TX that helps parents understand their child.",
  },
  "ages-13-18": {
    title: "Teen Sleep Screening: 13 to 18",
    description:
      "A free, educational sleep screening for teens ages 13 to 18 from Austin Sleep and Airway Health in Austin, TX, helping families understand sleep patterns.",
  },
  "tmj-craniofacial-pain": {
    title: "TMJ & Craniofacial Pain Screening",
    description:
      "A free, educational TMJ and craniofacial pain screening from Austin Sleep and Airway Health in Austin, TX, helping you understand jaw pain and tension.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ quiz: string }>;
}): Promise<Metadata> {
  const { quiz } = await params;
  const seo = quizSeo[quiz];
  if (!seo) return {};

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/sleep-apnea-test/${quiz}/`,
  });
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quiz: string }>;
}) {
  const { quiz } = await params;
  if (!getQuiz(quiz)) notFound();
  return <QuizFlow slug={quiz} />;
}
