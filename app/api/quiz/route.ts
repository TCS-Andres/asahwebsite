/*
  Quiz submission handler.

  1. Validate with zod. The score and band are recomputed on the server from the
     answers for integrity, so a tampered client cannot change what the practice
     receives.
  2. There is no database in this interim. Each destination lives behind an
     adapter in destinations.ts and skips cleanly when unconfigured.
  3. A hidden honeypot field and a payload size cap guard against abuse.

  The route never throws at the user. It returns success when validation passes
  and the internal email is sent or skipped for missing configuration.
*/

import { z } from "zod";
import { getQuiz } from "@/lib/quizzes";
import type { Answers } from "@/lib/quizzes/types";
import {
  hashEmail,
  sendInternalNotification,
  sendPatientCopy,
  postMarketingWebhook,
  sendGa4Event,
  sendMetaEvent,
  type Lead,
} from "./destinations";

// Roughly 20 KB is far more than a real submission needs.
const MAX_BODY_BYTES = 20_000;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const answerValue = z.union([
  z.number(),
  z.boolean(),
  z.string(),
  z.array(z.string()),
]);

const bodySchema = z.object({
  quiz: z.string().min(1),
  answers: z.record(z.string(), answerValue),
  result: z
    .object({ band: z.string().optional(), score: z.number().optional() })
    .optional(),
  lead: z.object({
    name: z.string().min(1).max(200),
    email: z.string().max(320).regex(emailPattern),
    phone: z.string().min(1).max(50),
    city: z.string().min(1).max(120),
    state: z.string().min(1).max(120),
  }),
  consent: z.literal(true),
  // Honeypot. Real people never see this field, so it must be empty.
  website: z.string().optional(),
});

export async function POST(request: Request): Promise<Response> {
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return Response.json({ ok: false, error: "unreadable" }, { status: 400 });
  }

  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "payload too large" }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid submission" }, { status: 400 });
  }

  const body = parsed.data;

  // Honeypot filled means a bot. Accept quietly and do nothing.
  if (body.website && body.website.trim() !== "") {
    console.warn("[quiz] honeypot triggered, submission dropped");
    return Response.json({ ok: true });
  }

  const quiz = getQuiz(body.quiz);
  if (!quiz) {
    return Response.json({ ok: false, error: "unknown quiz" }, { status: 400 });
  }

  // Recompute the result on the server from the answers for integrity.
  const answers = body.answers as Answers;
  const result = quiz.scoring(answers);
  const lead: Lead = body.lead;

  const submission = { quiz, answers, result, lead };
  const hashedEmail = hashEmail(lead.email);

  // The Web3Forms lead is submitted client side from the quiz flow, since the
  // Web3Forms free plan only accepts browser submissions. This server route
  // handles the integrity recompute, the optional Resend internal notification
  // with full answers for a BAA covered inbox, and the server side analytics
  // events. Every destination is best effort and skips cleanly when unset.
  await Promise.allSettled([
    sendInternalNotification(submission),
    sendPatientCopy(submission),
    postMarketingWebhook(submission),
    sendGa4Event(quiz.slug, hashedEmail),
    sendMetaEvent(quiz.slug, hashedEmail),
  ]);

  return Response.json({ ok: true });
}
