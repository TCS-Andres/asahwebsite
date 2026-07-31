# Components and site config API

This document is the contract for the shared scaffold. Parallel workers build pages against these signatures without reading component source. Do not change these signatures without updating this file and notifying the orchestrator.

Import primitives from the barrel or from individual files:

```tsx
import { Button, Container, EyebrowHeading, Section, Sunburst } from "@/components";
// or
import { Button } from "@/components/Button";
```

Import shared site data:

```tsx
import { siteConfig } from "@/lib/site";
```

## Design system quick reference

Color tokens (Tailwind utilities): `sage`, `forest`, `terracotta`, `salmon`, `gold`, `cream`, `ink`, `white`. Use them as `bg-sage`, `text-forest`, `border-terracotta`, and so on. Never use a color outside this set.

Font families: `font-display` (Super Clarendon, headlines) and `font-sans` (Mona Sans, body, the default on body text).

Type scale utility classes: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-eyebrow`, `text-body`, `text-small`. Apply directly to elements.

```tsx
<p className="text-eyebrow">Airway focused care</p>
<h2 className="text-h2 text-forest">A calmer night starts here</h2>
<p className="text-body">Standard paragraph copy.</p>
```

## Button

Renders a Next.js `Link` when `href` is provided, otherwise a native `button`.

Props:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "outline"` | `"primary"` | primary is terracotta fill with white text, outline is a sage border and sage text |
| `href` | `string` | none | when present the component renders a `Link` |
| `className` | `string` | `""` | appended after the variant classes |
| `children` | `ReactNode` | required | button label |

When `href` is set, all remaining anchor attributes are accepted (for example `target`, `rel`, `aria-label`). When `href` is omitted, all remaining button attributes are accepted (for example `type`, `onClick`, `disabled`). Note that passing `onClick` requires the consuming file to be a Client Component.

Examples:

```tsx
<Button href="/schedule/">Schedule a visit</Button>

<Button variant="outline" href="/sleep-apnea-test/">
  Take the sleep screening
</Button>

<Button type="submit">Send</Button>
```

## Container

Centers content, applies `max-w-7xl mx-auto px-6`. Place inside a Section.

Props:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | `""` | appended to the wrapper |
| `children` | `ReactNode` | required | |

```tsx
<Container>
  <p className="text-body">Constrained content.</p>
</Container>
```

## Section

Vertical band wrapper. Applies `py-20 md:py-28` and a brand background. The forest background switches text to a light cream tone.

Props:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `background` | `"white" \| "cream" \| "forest"` | `"white"` | forest sets light text automatically |
| `className` | `string` | `""` | appended to the section |
| `id` | `string` | none | optional anchor id for in page navigation |
| `children` | `ReactNode` | required | usually wraps a Container |

```tsx
<Section background="cream" id="services">
  <Container>...</Container>
</Section>
```

## EyebrowHeading

Renders a small uppercase eyebrow label above a display heading. The eyebrow above heading pattern is a signature of this design.

Props:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `eyebrow` | `string` | required | small uppercase sage label |
| `heading` | `string` | required | display heading text |
| `as` | `"h1" \| "h2" \| "h3"` | `"h2"` | heading tag and matching type scale |
| `align` | `"left" \| "center"` | `"left"` | text alignment |
| `className` | `string` | `""` | appended to the wrapper div |

The heading color defaults to `text-forest`. Override with `className` when placing on a forest background, for example `className="[&_*]:text-cream"` or by wrapping in your own element.

```tsx
<EyebrowHeading
  eyebrow="Meet Dr. Culotta"
  heading="Airway focused dental care in Austin"
  as="h1"
  align="center"
/>
```

## Sunburst

Decorative half circle of tapering rays inspired by the ASAH logo sun. Generated in JSX, not traced from the logo file. It is `aria-hidden` and purely decorative. Size it with width and height classes on `className`, and position it with absolute positioning on a `relative` parent.

Props:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `color` | `string` | `"var(--color-gold)"` | any CSS color, keep it within the brand token set |
| `opacity` | `number` | `0.15` | keep low so it stays a background texture |
| `rotation` | `number` | `0` | degrees, rotated around the motif center |
| `rays` | `number` | `12` | number of rays across the half circle |
| `className` | `string` | `""` | set size and positioning here |

The SVG uses a `0 0 200 100` viewBox, so a two to one width to height ratio keeps the rays undistorted.

```tsx
<div className="relative overflow-hidden">
  <Sunburst
    color="var(--color-gold)"
    opacity={0.12}
    rotation={0}
    className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
  />
  {/* content */}
</div>
```

## ServiceCard

Image-first service card with a color reveal: the photo is desaturated on desktop and blooms to color on hover while it scales, the arrow rotates, and the Super Clarendon title rolls letter by letter (word aware, so long names wrap cleanly). Pure CSS, no client JavaScript, motion gated behind motion-safe. Used on the services index and the RelatedServices strip.

Props: `title`, `summary`, `href`, `image`, `imageAlt` (required strings), `number` ("01" corner label, optional), `featured` (boolean, taller lead card), `sizes` (next/image sizes hint), `className`.

```tsx
import { ServiceCard } from "@/components";

<ServiceCard
  title="Sleep Appliances"
  summary="Custom fit oral appliances made in Austin."
  href="/services/sleep-appliances/"
  image="/images/services/oral-care-mandibular-device-for-sleep-apneaaustin-texas.avif"
  imageAlt="Custom oral sleep appliance"
  number="01"
/>
```

## QuizCTA

The repeating sage quiz banner (homepage section 7, bottom of every service page). Fully self contained: renders its own sage section band with eyebrow, heading, body, and a terracotta button linking to the quiz hub. Every prop has an on brand default, so `<QuizCTA />` with no props is the standard usage. Do not fork, restyle, or wrap it in another Section.

Props (all optional): `eyebrow`, `heading`, `body`, `buttonLabel` (strings), `className` (appended to the outer section).

```tsx
import { QuizCTA } from "@/components";

<QuizCTA />
```

## siteConfig

The single source of truth for shared site data. Import it, do not hardcode name, address, phone, hours, or links anywhere else.

Type shape:

```ts
interface SiteConfig {
  name: string;            // "Austin Sleep & Airway Health"
  domain: string;          // "https://austinsleephealth.com"
  phone: string;           // "(512) 900-9715"
  phoneHref: string;       // "tel:+15129009715"
  email: string;           // "hello@austinsleephealth.com" (the only email on the site)
  address: {
    street: string;        // "1701 Simond Ave"
    suite: string;         // "Suite 107A"
    city: string;          // "Austin"
    state: string;         // "TX"
    zip: string;           // "78723"
  };
  hours: Array<{
    day: string;           // "Monday" ... "Sunday", Monday first
    open: string | null;   // display, for example "8:00 AM", null when closed
    close: string | null;  // display, for example "3:30 PM", null when closed
    opens: string | null;  // machine readable "08:00", null when closed
    closes: string | null; // machine readable "15:30", null when closed
  }>;
  bookingUrl: string;      // process.env.NEXT_PUBLIC_BOOKING_URL or ""
  scheduleHref: string;    // "/schedule/"
  quizHubHref: string;     // "/sleep-apnea-test/"
  social: {
    facebook: string;      // "" pending from the client
    instagram: string;     // "" pending from the client
  };
}
```

Hours data: Monday, Tuesday, and Friday are open 8:00 AM to 3:30 PM. Wednesday, Thursday, Saturday, and Sunday are closed, represented with null values on all four time fields.

Usage examples:

```tsx
import { siteConfig } from "@/lib/site";

<a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
<a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>

{siteConfig.hours.map((entry) => (
  <li key={entry.day}>
    {entry.day}: {entry.open ? `${entry.open} to ${entry.close}` : "Closed"}
  </li>
))}
```

Building structured data hours from the machine readable fields:

```tsx
const openDays = siteConfig.hours
  .filter((entry) => entry.opens !== null)
  .map((entry) => ({
    day: entry.day,
    opens: entry.opens,
    closes: entry.closes,
  }));
```
