"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components";

export interface LeadFields {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

export interface LeadCaptureFormProps {
  /** Called with the lead fields and the honeypot value on a valid submit. */
  onSubmit: (lead: LeadFields, honeypot: string) => void;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "text-body w-full rounded-2xl border-2 border-sage/30 bg-white px-4 py-3 text-ink focus:border-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage";

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [fields, setFields] = useState<LeadFields>({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState(false);

  const emailValid = emailPattern.test(fields.email);
  const complete =
    fields.name.trim() !== "" &&
    emailValid &&
    fields.phone.trim() !== "" &&
    fields.city.trim() !== "" &&
    fields.state.trim() !== "" &&
    consent;

  const update = (key: keyof LeadFields) => (event: { target: { value: string } }) =>
    setFields((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!complete) return;
    onSubmit(fields, honeypot);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-h3 text-forest">Where should we send your results?</h2>
      <p className="text-small mt-2 text-forest/70">
        Your results appear on the next screen right away. We also use these details to prepare your
        results and reach out with next steps.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-small font-semibold text-forest">Name</span>
          <input
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            className={`${inputBase} mt-1`}
            required
          />
        </label>

        <label className="block">
          <span className="text-small font-semibold text-forest">Email</span>
          <input
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            className={`${inputBase} mt-1`}
            required
          />
          {touched && !emailValid ? (
            <span className="text-small mt-1 block text-terracotta">
              Please enter a valid email address.
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="text-small font-semibold text-forest">Phone</span>
          <input
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={update("phone")}
            className={`${inputBase} mt-1`}
            required
          />
        </label>

        <label className="block">
          <span className="text-small font-semibold text-forest">City</span>
          <input
            type="text"
            autoComplete="address-level2"
            value={fields.city}
            onChange={update("city")}
            className={`${inputBase} mt-1`}
            required
          />
        </label>

        <label className="block">
          <span className="text-small font-semibold text-forest">State</span>
          <input
            type="text"
            autoComplete="address-level1"
            value={fields.state}
            onChange={update("state")}
            className={`${inputBase} mt-1`}
            required
          />
        </label>
      </div>

      {/* Honeypot: hidden from people, left empty. A filled value marks a bot. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-5 w-5 flex-none accent-terracotta"
          required
        />
        <span className="text-small text-ink">
          I agree to be contacted by Austin Sleep &amp; Airway Health about my results. See our{" "}
          <Link href="/privacy-policy/" className="text-sage underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/hipaa-notice-of-privacy-practices/" className="text-sage underline">
            HIPAA Notice of Privacy Practices
          </Link>
          .
        </span>
      </label>

      {touched && !consent ? (
        <p className="text-small mt-2 text-terracotta">
          Please check the box so we can share your results with you.
        </p>
      ) : null}

      <div className="mt-8">
        <Button type="submit" disabled={!complete}>
          See my results
        </Button>
      </div>
    </form>
  );
}
