/*
  sessionStorage bridge between the quiz flow and the result screen. The
  computed result is stored here after the last question so the result screen
  can render instantly, without the score or answers ever appearing in the URL.
*/

import type { QuizResult } from "@/lib/quizzes/types";

export const QUIZ_RESULT_STORAGE_KEY = "asah-quiz-result";

export interface StoredQuizResult {
  slug: string;
  quizTitle: string;
  result: QuizResult;
  disclaimer: string;
  savedAt: number;
}

export function storeQuizResult(payload: StoredQuizResult): void {
  try {
    sessionStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can be unavailable in private modes. The POST still delivers the
    // result to the practice, so we fail quietly here.
  }
}

export function readQuizResult(): StoredQuizResult | null {
  try {
    const raw = sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredQuizResult;
  } catch {
    return null;
  }
}
