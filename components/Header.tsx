"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "./Button";
import { MobileNav } from "./MobileNav";
import { siteConfig } from "@/lib/site";
import { primaryNav, services } from "./site-nav";
import logo from "@/public/images/logos/logo-2.0-png.avif";

/*
  Global site header. It is sticky. On the homepage it starts transparent over
  the hero and turns solid white with a soft shadow once the page scrolls. On
  every other route it is solid from the start, so a page without a dark hero
  never gets unreadable white on white nav. The Services dropdown and the mobile
  panel are both keyboard accessible.
*/
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const servicesMenuId = useId();
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesWrapperRef = useRef<HTMLDivElement>(null);
  const firstServiceRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMobileOpen = useRef(false);

  const solid = !isHome || scrolled;

  // Track scroll position to toggle the solid state.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Return focus to the hamburger after the mobile panel closes.
  useEffect(() => {
    if (wasMobileOpen.current && !mobileOpen) {
      menuButtonRef.current?.focus();
    }
    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  const closeServices = useCallback(() => setServicesOpen(false), []);

  // Close the dropdown when focus leaves the trigger plus menu wrapper.
  function onServicesBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!servicesWrapperRef.current?.contains(event.relatedTarget as Node)) {
      setServicesOpen(false);
    }
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setServicesOpen(true);
      requestAnimationFrame(() => firstServiceRef.current?.focus());
    } else if (event.key === "Escape") {
      setServicesOpen(false);
    }
  }

  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setServicesOpen(false);
      servicesTriggerRef.current?.focus();
    }
  }

  const navLinkClass = solid
    ? "text-forest hover:text-terracotta"
    : "text-white hover:text-white/75";

  const phonePillClass = solid
    ? "border-sage text-sage hover:bg-sage hover:text-white"
    : "border-white text-white hover:bg-white hover:text-forest";

  const iconColorClass = solid ? "text-forest" : "text-white";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        solid
          ? "bg-white shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Austin Sleep and Airway Health home"
          className="flex shrink-0 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <Image
            src={logo}
            alt="Austin Sleep & Airway Health"
            priority
            className={`h-11 w-auto ${solid ? "" : "brightness-0 invert"}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <div
            ref={servicesWrapperRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={onServicesBlur}
          >
            <button
              ref={servicesTriggerRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((value) => !value)}
              onKeyDown={onTriggerKeyDown}
              className={`inline-flex items-center gap-1 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded ${navLinkClass}`}
            >
              Services
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              id={servicesMenuId}
              role="menu"
              aria-label="Services"
              onKeyDown={onMenuKeyDown}
              className={`absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-ink/5 bg-white p-2 shadow-xl transition duration-200 ${
                servicesOpen
                  ? "visible opacity-100 translate-y-0"
                  : "invisible opacity-0 -translate-y-1"
              }`}
            >
              {services.map((service, index) => (
                <Link
                  key={service.href}
                  href={service.href}
                  role="menuitem"
                  ref={index === 0 ? firstServiceRef : undefined}
                  onClick={closeServices}
                  className="block rounded-xl px-4 py-2.5 text-small font-medium text-forest transition hover:bg-cream hover:text-terracotta focus-visible:outline-none focus-visible:bg-cream focus-visible:text-terracotta"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-semibold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage ${navLinkClass}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className={`inline-flex items-center justify-center rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage ${phonePillClass}`}
          >
            {siteConfig.phone}
          </a>
          <Button href={siteConfig.scheduleHref}>Schedule Appointment</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage lg:hidden ${iconColorClass}`}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
