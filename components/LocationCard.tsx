import { siteConfig } from "@/lib/site";

export interface LocationCardProps {
  /** Appended to the outer card wrapper. */
  className?: string;
  /** Heading text above the details. Defaults to the practice name. */
  heading?: string;
}

/*
  LocationCard is the reusable NAP block (name, address, phone) with office
  hours. Every value comes from siteConfig, so there is no hardcoded contact
  data here. Used on the contact page and the schedule page. Hours are listed
  Monday first with open ranges written "8:00 AM to 3:00 PM" and closed days
  shown as "Closed".
*/
export function LocationCard({
  className = "",
  heading = siteConfig.name,
}: LocationCardProps) {
  const { address, phone, phoneHref, email, hours } = siteConfig;

  return (
    <div
      className={`rounded-3xl border border-sage/15 bg-cream p-8 shadow-soft ${className}`.trim()}
    >
      <h3 className="text-h3 text-forest">{heading}</h3>

      <address className="mt-6 space-y-5 not-italic">
        <div>
          <p className="text-eyebrow mb-2">Visit Us</p>
          <p className="text-body text-ink">
            {address.street}, {address.suite}
            <br />
            {address.city}, {address.state} {address.zip}
          </p>
        </div>

        <div>
          <p className="text-eyebrow mb-2">Call Us</p>
          <a
            href={phoneHref}
            className="text-body font-semibold text-terracotta hover:brightness-95"
          >
            {phone}
          </a>
        </div>

        <div>
          <p className="text-eyebrow mb-2">Email Us</p>
          <a
            href={`mailto:${email}`}
            className="text-body font-semibold text-terracotta hover:brightness-95 break-words"
          >
            {email}
          </a>
        </div>
      </address>

      <div className="mt-6">
        <p className="text-eyebrow mb-2">Office Hours</p>
        <ul className="text-body text-ink">
          {hours.map((entry) => (
            <li
              key={entry.day}
              className="flex justify-between gap-6 border-b border-sage/15 py-1.5 last:border-0"
            >
              <span>{entry.day}</span>
              <span className={entry.open ? "text-forest" : "text-sage"}>
                {entry.open ? `${entry.open} to ${entry.close}` : "Closed"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
