"use client";

import { useId, useState } from "react";

export interface FAQAccordionItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQAccordionItem[];
  className?: string;
}

/*
  FAQAccordion is an accessible disclosure list. Each question is a real button
  that toggles its answer panel, with aria-expanded and aria-controls wiring the
  two together. Native buttons give keyboard support (Enter and Space) for free.
  One panel is open at a time; clicking an open question closes it.
*/
export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`divide-y divide-sage/20 border-y border-sage/20 ${className}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={buttonId}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
              >
                <span className="text-body font-semibold text-forest">
                  {item.question}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={`h-5 w-5 flex-shrink-0 text-sage transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 7.5 10 12.5 15 7.5" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="text-body text-ink">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
