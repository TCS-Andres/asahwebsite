"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  /** Appended to the wrapper. Pass layout classes such as h-full here. */
  className?: string;
  /** Stagger delay in milliseconds, applied to the reveal transition. */
  delayMs?: number;
}

/*
  Reveal is the single scroll animation primitive for the site. It wraps content
  in a div that fades and lifts into place the first time it enters the viewport.

  The animation is intentionally conservative:
  - Without JavaScript the data-reveal attribute is never added, so the content
    is always visible. Progressive enhancement, never a blank page.
  - Under prefers-reduced-motion the hidden and transition styles in globals.css
    do not apply, and the effect reveals immediately, so there is no movement.
  - Otherwise an IntersectionObserver reveals the element once, then disconnects.

  There are no animation libraries here, only a small observer and two CSS rules.
*/
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Switching active on enables the animated styles for JS users only.
    setActive(true);

    const node = ref.current;
    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={active ? "" : undefined}
      data-visible={visible ? "true" : undefined}
      className={className}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
