/*
  Submission destinations, each behind a small adapter so the practice can turn
  one on by setting one environment variable. No database is wired up in this
  interim. Every destination skips with a console.warn when its configuration is
  missing and logs, but never rethrows, on failure. This keeps the submission
  handler resilient and keeps protected health information off tools that should
  never see it.

  What leaves the server, and to where:
  - Internal email (Resend): the full result including per question answers, to
    the practice inbox only.
  - Patient email (Resend): the patient's own band result, the disclaimer, a
    booking link, and the phone number, to the patient.
  - Marketing webhook: contact fields plus quiz slug and score band only. Never
    raw answers, since that tool has no BAA.
  - GA4 and Meta events: only the quiz slug and a SHA-256 hashed email. No score,
    no band, no answers, no health data.
*/

import { createHash, randomUUID } from "node:crypto";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import type { Answers, Question, Quiz, QuizResult } from "@/lib/quizzes/types";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

export interface SubmissionData {
  quiz: Quiz;
  answers: Answers;
  result: QuizResult;
  lead: Lead;
}

export type DestinationStatus = "sent" | "skipped" | "failed";

const FROM = `Austin Sleep & Airway Health <${siteConfig.email}>`;

export function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAnswer(question: Question, value: Answers[string] | undefined): string {
  if (value === undefined) return "No answer";
  switch (question.type) {
    case "yesno":
      return value === true || value === "yes" || value === "true" ? "Yes" : "No";
    case "scale": {
      const num = typeof value === "number" ? value : Number(value);
      const option = question.options?.find((o) => (o.score ?? Number(o.value)) === num);
      return option ? `${num} (${option.label})` : String(num);
    }
    case "multi": {
      const list = Array.isArray(value) ? value : [];
      if (list.length === 0) return "None selected";
      return list
        .map((v) => question.options?.find((o) => o.value === v)?.label ?? v)
        .join(", ");
    }
    default:
      return typeof value === "string" && value.trim() !== "" ? value : "No answer";
  }
}

function buildAnswerLines(quiz: Quiz, answers: Answers): Array<{ prompt: string; answer: string }> {
  return quiz.questions.map((question) => ({
    prompt: question.prompt,
    answer: formatAnswer(question, answers[question.id]),
  }));
}

function resendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/* Internal notification with the full result and per question answers. */
export async function sendInternalNotification(data: SubmissionData): Promise<DestinationStatus> {
  const to = process.env.PRACTICE_NOTIFY_EMAIL;
  const client = resendClient();

  if (!client) {
    console.warn("[quiz] internal notification skipped: RESEND_API_KEY not set");
    return "skipped";
  }
  if (!to) {
    console.warn("[quiz] internal notification skipped: PRACTICE_NOTIFY_EMAIL not set");
    return "skipped";
  }

  const { quiz, answers, result, lead } = data;
  const lines = buildAnswerLines(quiz, answers);
  const scoreLine =
    result.score !== undefined ? `Score: ${result.score}${result.maxScore ? ` of ${result.maxScore}` : ""}` : "";
  const flagged = result.flaggedDomains?.map((d) => d.domain).join(", ");

  const textParts = [
    `New ${quiz.title} submission`,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `City: ${lead.city}`,
    `State: ${lead.state}`,
    "",
    `Result band: ${result.band}`,
    scoreLine,
    result.elevated ? "Result elevated by a witnessed apnea answer." : "",
    flagged ? `Flagged areas: ${flagged}` : "",
    "",
    "Answers:",
    ...lines.map((l) => `- ${l.prompt}\n  ${l.answer}`),
  ].filter((part) => part !== "");
  const text = textParts.join("\n");

  const html = [
    `<h2>New ${escapeHtml(quiz.title)} submission</h2>`,
    "<h3>Contact</h3>",
    "<ul>",
    `<li><strong>Name:</strong> ${escapeHtml(lead.name)}</li>`,
    `<li><strong>Email:</strong> ${escapeHtml(lead.email)}</li>`,
    `<li><strong>Phone:</strong> ${escapeHtml(lead.phone)}</li>`,
    `<li><strong>City:</strong> ${escapeHtml(lead.city)}</li>`,
    `<li><strong>State:</strong> ${escapeHtml(lead.state)}</li>`,
    "</ul>",
    "<h3>Result</h3>",
    "<ul>",
    `<li><strong>Band:</strong> ${escapeHtml(result.band)}</li>`,
    scoreLine ? `<li><strong>${escapeHtml(scoreLine)}</strong></li>` : "",
    result.elevated ? "<li>Result elevated by a witnessed apnea answer.</li>" : "",
    flagged ? `<li><strong>Flagged areas:</strong> ${escapeHtml(flagged)}</li>` : "",
    "</ul>",
    "<h3>Answers</h3>",
    "<ol>",
    ...lines.map(
      (l) => `<li><strong>${escapeHtml(l.prompt)}</strong><br>${escapeHtml(l.answer)}</li>`,
    ),
    "</ol>",
  ]
    .filter((part) => part !== "")
    .join("");

  try {
    const { error } = await client.emails.send({
      from: FROM,
      to,
      replyTo: lead.email,
      subject: `New quiz submission: ${quiz.title}`,
      text,
      html,
    });
    if (error) {
      console.error("[quiz] internal notification failed:", error);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[quiz] internal notification threw:", err);
    return "failed";
  }
}

/* Patient copy with their band result, the disclaimer, a booking link, and the phone number. */
export async function sendPatientCopy(data: SubmissionData): Promise<DestinationStatus> {
  const client = resendClient();
  if (!client) {
    console.warn("[quiz] patient copy skipped: RESEND_API_KEY not set");
    return "skipped";
  }

  const { quiz, result, lead } = data;
  const bookingLink = `${siteConfig.domain}/schedule/`;

  const text = [
    `Hi ${lead.name},`,
    "",
    `Here are your ${quiz.title} results.`,
    "",
    result.heading,
    result.body,
    ...(result.notes ?? []),
    "",
    quiz.disclaimer,
    "",
    `Schedule a consultation: ${bookingLink}`,
    `Or call us: ${siteConfig.phone}`,
  ].join("\n");

  const html = [
    `<p>Hi ${escapeHtml(lead.name)},</p>`,
    `<p>Here are your ${escapeHtml(quiz.title)} results.</p>`,
    `<h2>${escapeHtml(result.heading)}</h2>`,
    `<p>${escapeHtml(result.body)}</p>`,
    ...(result.notes ?? []).map((n) => `<p><strong>${escapeHtml(n)}</strong></p>`),
    `<p style="background:#f5f5f0;border-left:4px solid #cca257;padding:12px;">${escapeHtml(
      quiz.disclaimer,
    )}</p>`,
    `<p><a href="${bookingLink}">Schedule a consultation</a></p>`,
    `<p>Or call us: ${escapeHtml(siteConfig.phone)}</p>`,
  ].join("");

  try {
    const { error } = await client.emails.send({
      from: FROM,
      to: lead.email,
      replyTo: siteConfig.email,
      subject: `Your ${quiz.title} results`,
      text,
      html,
    });
    if (error) {
      console.error("[quiz] patient copy failed:", error);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[quiz] patient copy threw:", err);
    return "failed";
  }
}

/* Marketing webhook. Contact fields plus quiz slug and band only, never raw answers. */
export async function postMarketingWebhook(data: SubmissionData): Promise<DestinationStatus> {
  const url = process.env.MARKETING_WEBHOOK_URL;
  if (!url) {
    console.warn("[quiz] marketing webhook skipped: MARKETING_WEBHOOK_URL not set");
    return "skipped";
  }

  const { quiz, result, lead } = data;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        city: lead.city,
        state: lead.state,
        quiz: quiz.slug,
        band: result.band,
      }),
    });
    if (!res.ok) {
      console.error(`[quiz] marketing webhook failed: ${res.status}`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[quiz] marketing webhook threw:", err);
    return "failed";
  }
}

/* GA4 Measurement Protocol QuizComplete event. Quiz slug and hashed email only. */
export async function sendGa4Event(quizSlug: string, hashedEmail: string): Promise<DestinationStatus> {
  const measurementId = process.env.NEXT_PUBLIC_GA4_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) {
    console.warn("[quiz] GA4 event skipped: NEXT_PUBLIC_GA4_ID or GA4_API_SECRET not set");
    return "skipped";
  }

  const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
    measurementId,
  )}&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: randomUUID(),
        events: [
          {
            name: "QuizComplete",
            params: { quiz_slug: quizSlug, hashed_email: hashedEmail },
          },
        ],
      }),
    });
    if (!res.ok) {
      console.error(`[quiz] GA4 event failed: ${res.status}`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[quiz] GA4 event threw:", err);
    return "failed";
  }
}

/* Meta Conversions API QuizComplete event. Quiz slug and hashed email only. */
export async function sendMetaEvent(quizSlug: string, hashedEmail: string): Promise<DestinationStatus> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    console.warn("[quiz] Meta event skipped: META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set");
    return "skipped";
  }

  const endpoint = `https://graph.facebook.com/v19.0/${encodeURIComponent(
    pixelId,
  )}/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: "QuizComplete",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            user_data: { em: [hashedEmail] },
            custom_data: { quiz_slug: quizSlug },
          },
        ],
      }),
    });
    if (!res.ok) {
      console.error(`[quiz] Meta event failed: ${res.status}`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[quiz] Meta event threw:", err);
    return "failed";
  }
}
