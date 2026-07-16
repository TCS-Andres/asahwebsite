import { notFound } from "next/navigation";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { quizSlugs, getQuiz } from "@/lib/quizzes";

// Only the five known slugs are valid. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return quizSlugs.map((slug) => ({ quiz: slug }));
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
