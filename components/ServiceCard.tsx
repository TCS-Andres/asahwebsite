import Image from "next/image";
import Link from "next/link";

export interface ServiceCardProps {
  title: string;
  summary: string;
  href: string;
  image: string;
  imageAlt: string;
  /* "01" style label shown in the top left corner. Omit to hide. */
  number?: string;
  /* Featured cards are taller, for a lead card spanning the full grid width. */
  featured?: boolean;
  /* Passed to next/image so the browser downloads a sensibly sized file. */
  sizes?: string;
  className?: string;
}

/*
  Image-first service card with a color reveal. The photo sits desaturated on
  desktop and blooms to full color on hover while it gently scales, the arrow
  rotates to point at the destination, and the Super Clarendon title rolls
  letter by letter. Everything is pure CSS driven by the group hover state:
  no animation library, no client JavaScript. On touch screens the photo is
  always in full color. All movement is gated behind motion-safe so reduced
  motion users get a static, fully readable card.
*/
export function ServiceCard({
  title,
  summary,
  href,
  image,
  imageAlt,
  number,
  featured = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block w-full overflow-hidden rounded-3xl shadow-soft transition-shadow duration-300 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 ${
        featured ? "h-72 md:h-[26rem]" : "h-72"
      } ${className}`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes={sizes}
        className="object-cover transition-all duration-500 ease-out md:saturate-0 md:group-hover:saturate-100 motion-safe:group-hover:scale-110"
      />

      {/* Legibility wash. Always present so cream text passes contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10 transition-opacity duration-500"
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          {number ? (
            <span className="text-eyebrow text-gold">{number}</span>
          ) : (
            <span />
          )}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-cream/90 transition-transform duration-500 motion-safe:group-hover:-rotate-45"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>

        <div>
          <RollingTitle title={title} featured={featured} />
          <p className="text-small mt-2 max-w-xl text-cream/90">{summary}</p>
        </div>
      </div>
    </Link>
  );
}

/*
  The rolling headline. Each letter lives in a clipped box holding two stacked
  copies; on hover the stack slides up half its height, so the letter appears
  to roll over, staggered 35ms per letter like the reference design. Letters
  are grouped inside whitespace-nowrap word wrappers so long service names
  wrap at word boundaries, never mid word. Screen readers get the plain title,
  the animated copy is decorative.
*/
function RollingTitle({ title, featured }: { title: string; featured: boolean }) {
  let letterIndex = 0;
  const sizeClass = featured
    ? "text-2xl md:text-4xl"
    : "text-2xl md:text-3xl";

  return (
    <span className={`block font-display leading-[1.25] text-white ${sizeClass}`}>
      <span className="sr-only">{title}</span>
      <span aria-hidden="true">
        {title.split(" ").map((word, wordAt) => (
          <span key={wordAt}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((letter, letterAt) => {
                const delayMs = letterIndex * 35;
                letterIndex += 1;
                return (
                  <span
                    key={letterAt}
                    className="inline-block h-[1.25em] overflow-hidden align-bottom"
                  >
                    <span
                      className="flex min-w-1 flex-col transition-transform duration-500 motion-safe:group-hover:-translate-y-1/2"
                      style={{ transitionDelay: `${delayMs}ms` }}
                    >
                      <span>{letter}</span>
                      <span>{letter}</span>
                    </span>
                  </span>
                );
              })}
            </span>{" "}
          </span>
        ))}
      </span>
    </span>
  );
}
