export type EyebrowHeadingLevel = "h1" | "h2" | "h3";
export type EyebrowHeadingAlign = "left" | "center";

const headingClasses: Record<EyebrowHeadingLevel, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

export interface EyebrowHeadingProps {
  eyebrow: string;
  heading: string;
  as?: EyebrowHeadingLevel;
  align?: EyebrowHeadingAlign;
  className?: string;
}

/*
  EyebrowHeading renders a small uppercase eyebrow label above a display
  heading. The eyebrow above heading pattern is a signature of this design.
*/
export function EyebrowHeading({
  eyebrow,
  heading,
  as = "h2",
  align = "left",
  className = "",
}: EyebrowHeadingProps) {
  const Heading = as;
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      <p className="text-eyebrow">{eyebrow}</p>
      <Heading className={`${headingClasses[as]} mt-3 text-forest`}>
        {heading}
      </Heading>
    </div>
  );
}
