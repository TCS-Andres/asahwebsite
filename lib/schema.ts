/*
  Typed JSON-LD structured data builders. Each function returns a plain object
  that the JsonLd component serializes into an application/ld+json script.

  All values come from siteConfig or from page level content that the caller
  passes in, so there is one source of truth for name, address, phone, and
  hours. Nothing here sends data anywhere; these objects are rendered inline.
*/
import { siteConfig } from "@/lib/site";
import { absoluteUrl, siteAsset } from "@/lib/seo";

/* A JSON-LD node. Values are serialized as-is. */
export type JsonLdObject = Record<string, unknown>;

/* Practice logo used as the schema image and publisher logo. */
const LOGO_PATH = "/images/logos/logo-png.webp";

/*
  Approximate geo coordinates for 1701 Simond Ave, Suite 107A, in the Mueller
  district of Austin. APPROXIMATE ONLY: these were estimated from the street
  address and MUST be verified against the practice Google Business Profile
  before launch. See flags_for_human in the worker output.
*/
const GEO = {
  latitude: 30.2988,
  longitude: -97.7047,
};

/*
  Dentist (a MedicalBusiness subtype) for the homepage. Opening hours are built
  from the machine readable fields in siteConfig, so only the open days
  (Monday, Tuesday, Thursday, Friday, 08:00 to 15:00) appear. sameAs is included only when
  a social URL is present, so with both currently empty it is omitted. priceRange
  and aggregateRating are intentionally omitted: no verified pricing or review
  data exists, and inventing it would be misleading.
*/
export function dentistSchema(): JsonLdObject {
  const openDays = siteConfig.hours.filter((entry) => entry.opens !== null);

  const openingHoursSpecification =
    openDays.length > 0
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: openDays.map((entry) => entry.day),
            opens: openDays[0].opens,
            closes: openDays[0].closes,
          },
        ]
      : [];

  const sameAs = [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
  ].filter((url) => url.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${absoluteUrl("/")}#practice`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: siteAsset(LOGO_PATH),
    logo: siteAsset(LOGO_PATH),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.suite}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification,
    founder: {
      "@type": "Person",
      name: "Dr. Kacie M. Culotta",
      jobTitle: "Dentist",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    // priceRange: intentionally omitted, no verified pricing data.
    // aggregateRating: intentionally omitted, no verified review data.
  };
}

/*
  WebSite node for the homepage. Publisher points back to the practice.
*/
export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

/*
  Person (Dentist) for Dr. Kacie M. Culotta on the about page. Credentials are
  summarized only from copy visible on that page: laser certified, American
  Academy of Dental Sleep Medicine qualified dentist, and Breathe Institute
  ambassador training.
*/
export function personSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Kacie M. Culotta",
    jobTitle: "Dentist",
    url: absoluteUrl("/about-us/"),
    image: siteAsset(
      "/images/doctor/austin-sleep-airway-health-doctor-kacie-culotta-texas.webp",
    ),
    worksFor: {
      "@type": "Dentist",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    knowsAbout: [
      "Airway focused dentistry",
      "Dental sleep medicine",
      "Myofunctional therapy",
      "Oral appliance therapy",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "American Academy of Dental Sleep Medicine",
      },
      {
        "@type": "Organization",
        name: "The Breathe Institute",
      },
    ],
  };
}

/*
  Service with a provider for a service page. Service is used rather than
  MedicalProcedure to avoid implying FDA cleared medical procedure claims.
*/
export function serviceSchema(input: {
  title: string;
  summary: string;
  slug: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.title,
    serviceType: input.title,
    description: input.summary,
    url: absoluteUrl(`/services/${input.slug}/`),
    provider: {
      "@type": "Dentist",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "City",
      name: "Austin, TX",
    },
  };
}

/*
  FAQPage from a service frontmatter faqs array.
*/
export function faqPageSchema(
  faqs: Array<{ q: string; a: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/*
  BreadcrumbList. Items without a url render as the current page (no link).
*/
export function breadcrumbSchema(
  items: Array<{ name: string; url?: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: absoluteUrl(item.url) } : {}),
    })),
  };
}

/*
  Article for a blog post. Author and publisher are the practice organization,
  since posts are bylined to Austin Sleep & Airway Health rather than a person.
*/
export function articleSchema(input: {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.excerpt,
    image: siteAsset(input.image),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteAsset(LOGO_PATH),
      },
    },
    mainEntityOfPage: absoluteUrl(`/${input.slug}/`),
  };
}
