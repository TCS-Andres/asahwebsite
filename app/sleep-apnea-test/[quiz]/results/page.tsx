import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultScreen } from "@/components/quiz/ResultScreen";
import { quizSlugs, getQuiz } from "@/lib/quizzes";

// Result screens are private to the visitor and must never be indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return quizSlugs.map((slug) => ({ quiz: slug }));
}

export default async function QuizResultsPage({
  params,
}: {
  params: Promise<{ quiz: string }>;
}) {
  const { quiz } = await params;
  if (!getQuiz(quiz)) notFound();
  return <ResultScreen slug={quiz} />;
}
