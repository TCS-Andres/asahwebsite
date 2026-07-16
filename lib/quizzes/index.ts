/*
  Quiz registry. Keyed by slug so the routes, the shared renderer, and the
  submission handler all resolve a quiz the same way. Adding a sixth quiz means
  writing one config file and adding it to orderedQuizzes below.
*/

import type { Quiz } from "./types";
import { adultQuiz } from "./adult";
import { ages2to5Quiz } from "./ages-2-5";
import { ages6to12Quiz } from "./ages-6-12";
import { ages13to18Quiz } from "./ages-13-18";
import { tmjQuiz } from "./tmj-craniofacial-pain";

// Display order for the hub.
export const orderedQuizzes: Quiz[] = [
  adultQuiz,
  ages2to5Quiz,
  ages6to12Quiz,
  ages13to18Quiz,
  tmjQuiz,
];

export const quizzes: Record<string, Quiz> = Object.fromEntries(
  orderedQuizzes.map((quiz) => [quiz.slug, quiz]),
);

export const quizSlugs: string[] = orderedQuizzes.map((quiz) => quiz.slug);

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes[slug];
}

export * from "./types";
