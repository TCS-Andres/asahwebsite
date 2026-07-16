import Image from "next/image";
import Link from "next/link";
import { EyebrowHeading } from "./EyebrowHeading";

export interface RelatedServiceCard {
  title: string;
  slug: string;
  summary: string;
  image: string;
  imageAlt: string;
}

export interface RelatedServicesProps {
  services: RelatedServiceCard[];
  eyebrow?: string;
  heading?: string;
  className?: string;
}

/*
  RelatedServices renders a short strip of service cards, introduced by the
  signature eyebrow heading. It is inner content: wrap it in a Section and
  Container at the page level. Renders nothing when passed no services.
*/
export function RelatedServices({
  services,
  eyebrow = "Keep Exploring",
  heading = "Related Services",
  className = "",
}: RelatedServicesProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <EyebrowHeading eyebrow={eyebrow} heading={heading} />
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}/`}
            className="group block overflow-hidden rounded-3xl border border-sage/15 bg-white shadow-soft transition duration-200 ease-out hover:-translate-y-1.5 hover:border-sage/30 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover transition duration-300 ease-out group-hover:scale-105"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-h3 text-forest">{service.title}</h3>
              <p className="text-small mt-3 text-ink/80">{service.summary}</p>
              <span className="text-eyebrow mt-4 inline-block text-terracotta">
                Learn more
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
