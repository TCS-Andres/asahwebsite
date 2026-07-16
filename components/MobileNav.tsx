"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./Button";
import { siteConfig } from "@/lib/site";
import { primaryNav, services } from "./site-nav";

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/*
  Slide out mobile navigation panel. Opens from the right with an overlay.
  It is a dialog: focus moves into the panel on open, Tab is trapped inside,
  Escape closes it, and body scroll is locked while it is open. There are no
  social icons here on purpose, the client URLs are still pending.
*/
export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesPanelId = useId();

  // Lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Move focus to the close button when the panel opens.
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  // Escape closes, Tab is trapped within the panel.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={open ? undefined : true}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <span className="text-eyebrow text-sage">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col px-6 py-6">
          {/* Services disclosure */}
          <button
            type="button"
            aria-expanded={servicesOpen}
            aria-controls={servicesPanelId}
            onClick={() => setServicesOpen((value) => !value)}
            className="flex items-center justify-between py-3 text-left font-display text-lg text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            Services
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform duration-200 ${
                servicesOpen ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <ul
            id={servicesPanelId}
            className={`${servicesOpen ? "block" : "hidden"} mb-2 space-y-1 border-l-2 border-cream pl-4`}
          >
            {services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  onClick={onClose}
                  className="block py-2 text-body text-ink/80 transition hover:text-terracotta focus-visible:outline-none focus-visible:text-terracotta"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="border-t border-cream py-3 font-display text-lg text-forest transition hover:text-terracotta focus-visible:outline-none focus-visible:text-terracotta"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8 rounded-3xl bg-cream p-6">
            <p className="text-eyebrow text-sage">Have Questions?</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 block text-body font-semibold text-forest underline decoration-sage/40 underline-offset-4 transition hover:text-terracotta"
            >
              {siteConfig.email}
            </a>
            <p className="mt-4 text-small text-ink/70">Need an appointment?</p>
            <div className="mt-3">
              <Button href={siteConfig.scheduleHref} onClick={onClose} className="w-full">
                Book Now
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
