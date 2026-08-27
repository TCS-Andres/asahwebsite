import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";
import { footerMenu, services } from "./site-nav";
import logo from "@/public/images/logos/logo-2.0-png.avif";

/*
  Global site footer. Forest band with cream text. Three link and contact
  columns matching the live footer: Menu, Services, and Say Hello. Every phone,
  email, address, and hours value is read from siteConfig. The Instagram icon
  links to Dr. Culotta's account and only renders when the URL is set; the
  Facebook URL is still pending.
*/
export function Footer() {
  const year = new Date().getFullYear();
  const { address } = siteConfig;

  return (
    <footer className="bg-forest text-cream">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-6">
            <Image
              src={logo}
              alt="Austin Sleep & Airway Health"
              className="h-20 w-auto brightness-0 invert md:h-24"
            />
            <p className="mt-5 text-small text-cream/80">
              Airway and sleep focused dental care for the whole family in
              Austin, Texas.
            </p>
            {siteConfig.social.instagram ? (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Dr. Kacie Culotta on Instagram"
                className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:bg-cream hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            ) : null}
          </div>

          {/* Menu */}
          <nav aria-label="Footer menu">
            <p className="text-eyebrow text-cream">Menu</p>
            <ul className="mt-5 space-y-3">
              {footerMenu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-cream/85 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <p className="text-eyebrow text-cream">Services</p>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-small text-cream/85 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Say Hello */}
          <div>
            <p className="text-eyebrow text-cream">Say Hello</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 block text-small font-semibold text-cream transition hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              {siteConfig.email}
            </a>

            <address className="mt-5 not-italic text-small text-cream/85">
              <span className="block font-semibold text-cream">
                {siteConfig.name}
              </span>
              <span className="block">{address.street}</span>
              <span className="block">{address.suite}</span>
              <span className="block">
                {address.city}, {address.state} {address.zip}
              </span>
              <a
                href={siteConfig.phoneHref}
                className="mt-2 inline-block transition hover:text-white focus-visible:outline-none focus-visible:text-white"
              >
                {siteConfig.phone}
              </a>
            </address>

            <div className="mt-6">
              <p className="text-eyebrow text-cream">Office Hours</p>
              <ul className="mt-3 space-y-1.5 text-small text-cream/85">
                {siteConfig.hours.map((entry) => (
                  <li key={entry.day} className="flex justify-between gap-4">
                    <span>{entry.day}</span>
                    <span className="text-cream/70">
                      {entry.open ? `${entry.open} to ${entry.close}` : "Closed"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-6">
          <p className="text-small text-cream/70">
            {siteConfig.name} {String.fromCharCode(169)} {year}. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
