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
  /* Height utility for the card. Defaults to a compact height so a dense
     grid of cards stays short. Pass a taller value for a hero placement. */
  heightClass?: string;
  /* Passed to next/image so the browser downloads a sensibly sized file. */
  sizes?: string;
  className?: string;
}

/*
  Image first service card with a color reveal. The photo sits desaturated on
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
  heightClass = "h-60 sm:h-64",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block w-full overflow-hidden rounded-3xl shadow-soft transition-shadow duration-300 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 ${heightClass} ${className}`}
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
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/5 transition-opacity duration-500"
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          {number ? (
            <span className="text-eyebrow text-gold">{number}</span>
          ) : (
            <span />
          )}
          <svg
            width="26"
            height="26"
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
          {/*
            At rest the card shows only the image and the service name. The
            body copy stays collapsed and fades up into view on hover, and on
            keyboard focus of the card so it is reachable without a pointer.
            The grid rows trick animates the height smoothly, the inner wrapper
            clips the text while collapsed, and the summary stays in the DOM so
            screen readers still read it. The title brightens in unison on hover.
          */}
          <span className="block font-display text-2xl leading-[1.2] text-white transition-opacity duration-500 ease-out motion-safe:opacity-90 motion-safe:group-hover:opacity-100">
            {title}
          </span>
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-28 group-hover:opacity-100 group-focus-visible:max-h-28 group-focus-visible:opacity-100">
            <p className="text-small line-clamp-3 max-w-md pt-2 text-cream/90">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
