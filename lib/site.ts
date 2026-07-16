/*
  siteConfig is the single source of truth for shared site data.
  Every worker imports from here. Do not hardcode NAP (name, address, phone),
  hours, or links elsewhere.
*/

export interface SiteAddress {
  street: string;
  suite: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessHours {
  /** Day label, Monday first. */
  day: string;
  /** Display open time, for example "8:00 AM", or null when closed. */
  open: string | null;
  /** Display close time, for example "3:30 PM", or null when closed. */
  close: string | null;
  /** Machine readable 24 hour open time, for example "08:00", or null when closed. */
  opens: string | null;
  /** Machine readable 24 hour close time, for example "15:30", or null when closed. */
  closes: string | null;
}

export interface SiteSocial {
  facebook: string;
  instagram: string;
}

export interface SiteConfig {
  name: string;
  domain: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: SiteAddress;
  hours: BusinessHours[];
  bookingUrl: string;
  scheduleHref: string;
  quizHubHref: string;
  social: SiteSocial;
}

export const siteConfig: SiteConfig = {
  name: "Austin Sleep & Airway Health",
  domain: "https://austinsleephealth.com",
  phone: "(512) 900-9715",
  phoneHref: "tel:+15129009715",
  email: "hello@austinsleephealth.com",
  address: {
    street: "1701 Simond Ave",
    suite: "Suite 107A",
    city: "Austin",
    state: "TX",
    zip: "78723",
  },
  hours: [
    { day: "Monday", open: "8:00 AM", close: "3:30 PM", opens: "08:00", closes: "15:30" },
    { day: "Tuesday", open: "8:00 AM", close: "3:30 PM", opens: "08:00", closes: "15:30" },
    { day: "Wednesday", open: null, close: null, opens: null, closes: null },
    { day: "Thursday", open: null, close: null, opens: null, closes: null },
    { day: "Friday", open: "8:00 AM", close: "3:30 PM", opens: "08:00", closes: "15:30" },
    { day: "Saturday", open: null, close: null, opens: null, closes: null },
    { day: "Sunday", open: null, close: null, opens: null, closes: null },
  ],
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  scheduleHref: "/schedule/",
  quizHubHref: "/sleep-apnea-test/",
  social: {
    // URLs are pending from the client.
    facebook: "",
    instagram: "",
  },
};
