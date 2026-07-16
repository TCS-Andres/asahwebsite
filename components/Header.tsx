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
  const closeTimerRef = useRef<number | null>(null);
  const openedByHoverRef = useRef(false);

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

  /*
    Hover intent handling. Opening is immediate. Closing waits 180ms so a
    pointer that briefly slips off the trigger or the menu edge does not
    slam the menu shut mid travel.
  */
  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openServicesByHover = useCallback(() => {
    cancelScheduledClose();
    openedByHoverRef.current = true;
    setServicesOpen(true);
  }, [cancelScheduledClose]);

  const scheduleServicesClose = useCallback(() => {
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setServicesOpen(false);
    }, 180);
  }, [cancelScheduledClose]);

  useEffect(() => cancelScheduledClose, [cancelScheduledClose]);

  /*
    A click on the trigger right after hover already opened the menu must not
    toggle it shut, that reads as the menu refusing to open. The first click
    after a hover open is absorbed; any later click toggles normally. Touch
    devices fire a synthetic mouseenter before click, so the first tap opens
    and holds, and a second tap closes.
  */
  function onTriggerClick() {
    if (servicesOpen && openedByHoverRef.current) {
      openedByHoverRef.current = false;
      return;
    }
    openedByHoverRef.current = false;
    setServicesOpen((value) => !value);
  }

  // Close on any press outside the trigger plus menu, covers touch tablets.
  useEffect(() => {
    if (!servicesOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!servicesWrapperRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

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
          ? "border-b border-forest/10 bg-white/80 shadow-soft backdrop-blur-md"
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
            onMouseEnter={openServicesByHover}
            onMouseLeave={scheduleServicesClose}
            onBlur={onServicesBlur}
          >
            <button
              ref={servicesTriggerRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              aria-controls={servicesMenuId}
              onClick={onTriggerClick}
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

            {/*
              The pt-3 gap lives INSIDE this hoverable wrapper, so the pointer
              never leaves the hover area while traveling from the trigger down
              into the menu. A margin here would be dead space that fired
              mouseleave and closed the menu mid travel.
            */}
            <div
              className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${
                servicesOpen ? "visible" : "invisible pointer-events-none"
              }`}
            >
              <div
                id={servicesMenuId}
                role="menu"
                aria-label="Services"
                onKeyDown={onMenuKeyDown}
                className={`w-72 rounded-2xl border border-ink/5 bg-white p-2 shadow-xl transition duration-200 ${
                  servicesOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
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
