import { EyebrowHeading } from "./EyebrowHeading";
import { ServiceCard } from "./ServiceCard";

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
      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            summary={service.summary}
            href={`/services/${service.slug}/`}
            image={service.image}
            imageAlt={service.imageAlt}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ))}
      </div>
    </div>
  );
}
