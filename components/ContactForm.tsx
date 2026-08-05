"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { submitToWeb3Forms, WEB3FORMS_CONTACT_KEY } from "@/lib/web3forms";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-lg border border-sage/30 bg-white px-4 py-3 text-body text-ink " +
  "placeholder:text-ink/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/40";

const labelClasses = "text-small font-semibold text-forest";

/*
  ContactForm is the client-side contact form. It posts JSON to /api/contact
  with formType "contact" and renders inline success and error states. The
  hidden honeypot field ("company") stays empty for real users; bots that fill
  it are rejected server side. No health or symptom data is sent to any third
  party tracker: this form only reaches the practice notification inbox.
*/
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
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
      `New contact message from ${name}`,
      {
        from_name: name,
        name,
        email,
        phone,
        message,
        replyto: email,
      },
    );

    if (!ok) {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formType: "contact", name, email, phone, message }),
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
        <h3 className="text-h3 text-forest">Thank you for reaching out</h3>
        <p className="text-body mt-3 text-ink">
          Your message is on its way to our team. We will get back to you as
          soon as we can. If your need is time sensitive, please call us during
          office hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className={labelClasses}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={`mt-2 ${fieldClasses}`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${fieldClasses}`}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={`mt-2 ${fieldClasses}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`mt-2 ${fieldClasses}`}
        />
      </div>

      {/* Honeypot: hidden from users, must stay empty. Bots that fill it are rejected. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
        {status === "error" && (
          <p role="alert" aria-live="assertive" className="text-small text-terracotta">
            Something went wrong sending your message. Please try again or call
            us during office hours.
          </p>
        )}
      </div>
    </form>
  );
}
