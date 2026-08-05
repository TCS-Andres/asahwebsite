"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { submitToWeb3Forms, WEB3FORMS_CONTACT_KEY } from "@/lib/web3forms";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-lg border border-sage/30 bg-white px-4 py-3 text-body text-ink " +
  "placeholder:text-ink/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/40";

const labelClasses = "text-small font-semibold text-forest";

const reasons = [
  "Adult sleep concern",
  "Child sleep concern",
  "Tongue or lip tie",
  "TMJ or jaw pain",
  "Other",
];

/*
  ScheduleForm is the client-side appointment request form. It posts JSON to
  /api/contact with formType "schedule-request" so the notification email
  subject distinguishes it from a general contact message. This is a request,
  not a confirmed booking: the practice follows up by phone. The hidden
  honeypot ("company") stays empty for real users.
*/
export function ScheduleForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const preferredTime = String(data.get("preferredTime") ?? "");
    const reason = String(data.get("reason") ?? "");
    const honeypot = String(data.get("company") ?? "");

    // Honeypot: a filled field means a bot. Show success without submitting.
    if (honeypot.trim() !== "") {
      setStatus("success");
      form.reset();
      return;
    }

    // Primary: Web3Forms client side. Falls back to the server route when the
    // Web3Forms key is not configured yet, so the form never hard fails.
    let ok = await submitToWeb3Forms(
      WEB3FORMS_CONTACT_KEY,
      `New schedule request from ${name}`,
      {
        from_name: name,
        name,
        email,
        phone,
        preferred_time: preferredTime,
        reason,
        form: "Schedule request",
        replyto: email,
      },
    );

    if (!ok) {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType: "schedule-request",
            name,
            email,
            phone,
            preferredTime,
            reason,
          }),
        });
        ok = res.ok;
      } catch {
        ok = false;
      }
    }

    if (ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-sage/30 bg-cream p-8 text-center"
      >
        <h3 className="text-h3 text-forest">Request received</h3>
        <p className="text-body mt-3 text-ink">
          Thank you. Our team will reach out to confirm a time that works for
          you. For the fastest response, feel free to call us during office
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="schedule-name" className={labelClasses}>
          Name
        </label>
        <input
          id="schedule-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={`mt-2 ${fieldClasses}`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="schedule-email" className={labelClasses}>
            Email
          </label>
          <input
            id="schedule-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${fieldClasses}`}
          />
        </div>
        <div>
          <label htmlFor="schedule-phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="schedule-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={`mt-2 ${fieldClasses}`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="schedule-time" className={labelClasses}>
            Preferred time
          </label>
          <input
            id="schedule-time"
            name="preferredTime"
            type="text"
            placeholder="For example, weekday mornings"
            className={`mt-2 ${fieldClasses}`}
          />
        </div>
        <div>
          <label htmlFor="schedule-reason" className={labelClasses}>
            Reason for visit
          </label>
          <select
            id="schedule-reason"
            name="reason"
            required
            defaultValue=""
            className={`mt-2 ${fieldClasses}`}
          >
            <option value="" disabled>
              Select a reason
            </option>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot: hidden from users, must stay empty. Bots that fill it are rejected. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="schedule-company">Company</label>
        <input
          id="schedule-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Request Appointment"}
        </Button>
        {status === "error" && (
          <p role="alert" aria-live="assertive" className="text-small text-terracotta">
            Something went wrong sending your request. Please try again or call
            us during office hours.
          </p>
        )}
      </div>
    </form>
  );
}
