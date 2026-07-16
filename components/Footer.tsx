import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";
import { footerMenu, services } from "./site-nav";
import logo from "@/public/images/logos/logo-2.0-png.avif";

/*
  Global site footer. Forest band with cream text. Three link and contact
  columns matching the live footer: Menu, Services, and Say Hello. Every phone,
  email, address, and hours value is read from siteConfig. No social icons for
  now, the client URLs are still pending.
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
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-5 text-small text-cream/80">
              Airway and sleep focused dental care for the whole family in
              Austin, Texas.
            </p>
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
