import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

/*
  Contact + schedule-request handler.

  Both the contact form and the schedule-request form post here. The formType
  field distinguishes them so the notification email subject makes the source
  obvious. This route does NOT touch app/api/quiz, which another worker owns.

  Environment variables:
  - RESEND_API_KEY       : Resend API key. When unset, no email is sent.
  - PRACTICE_NOTIFY_EMAIL: inbox that receives submissions. When unset, no email is sent.

  IMPORTANT: When either env var is unset, the handler logs a warning and
  returns success WITHOUT sending. This lets the site build and the forms work
  in preview/local environments before Resend is provisioned. Wire both env
  vars in Vercel to turn on real delivery. No rebuild is required beyond the
  env change and a redeploy.

  The "from" address uses Resend's shared onboarding sender until the practice
  domain is verified in Resend. Once austinsleephealth.com is verified, swap
  the FROM_ADDRESS constant for a branded address on that domain.
*/

// Reject oversized payloads before parsing. Generous enough for a long message.
const MAX_BODY_BYTES = 20_000;

const FROM_ADDRESS = `${siteConfig.name} <onboarding@resend.dev>`;

const submissionSchema = z.object({
  formType: z.enum(["contact", "schedule-request"]).default("contact"),
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required").max(200),
  phone: z.string().trim().min(1, "Phone is required").max(40),
  message: z.string().trim().max(5000).optional(),
  preferredTime: z.string().trim().max(200).optional(),
  reason: z.string().trim().max(200).optional(),
  // Honeypot. Real users leave this empty; bots tend to fill every field.
  company: z.string().max(200).optional(),
});

type Submission = z.infer<typeof submissionSchema>;

function buildEmail(data: Submission): { subject: string; text: string } {
  const isSchedule = data.formType === "schedule-request";
  const subject = isSchedule
    ? `New schedule request from ${data.name}`
    : `New contact message from ${data.name}`;

  const lines = [
    `Form: ${isSchedule ? "Schedule request" : "Contact message"}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
  ];

  if (isSchedule) {
    lines.push(`Preferred time: ${data.preferredTime || "Not specified"}`);
    lines.push(`Reason for visit: ${data.reason || "Not specified"}`);
  } else {
    lines.push("", "Message:", data.message || "(no message provided)");
  }

  return { subject, text: lines.join("\n") };
}

export async function POST(request: Request) {
  // Size cap: read the raw body and bail out if it is too large.
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Validation failed" },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a filled "company" field means a bot. Return a success shape
  // without sending so the bot gets no useful signal.
  if (data.company && data.company.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.PRACTICE_NOTIFY_EMAIL;

  // Env not provisioned yet: log and succeed without sending (documented above).
  if (!apiKey || !notifyEmail) {
    console.warn(
      "[api/contact] RESEND_API_KEY or PRACTICE_NOTIFY_EMAIL is unset. " +
        "Submission accepted but no email was sent.",
    );
    return Response.json({ ok: true });
  }

  const { subject, text } = buildEmail(data);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: notifyEmail,
      replyTo: data.email,
      subject,
      text,
    });

    if (result.error) {
      console.error("[api/contact] Resend error:", result.error);
      return Response.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Unexpected error:", error);
    return Response.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 },
    );
  }
}
