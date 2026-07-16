import type { ReactNode } from "react";

export type SectionBackground = "white" | "cream" | "forest";

const backgrounds: Record<SectionBackground, string> = {
  white: "bg-white text-ink",
  cream: "bg-cream text-ink",
  forest: "bg-forest text-cream",
};

export interface SectionProps {
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  /** Optional id for in page anchor navigation. */
  id?: string;
}

/*
  Section is the vertical rhythm wrapper for a page band.
  It applies consistent vertical padding and a brand background.
  The forest background switches text to a light tone.
*/
export function Section({
  background = "white",
  className = "",
  children,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${backgrounds[background]} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
