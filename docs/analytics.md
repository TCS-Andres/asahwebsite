# Client analytics

HIPAA safe client side analytics for Austin Sleep & Airway Health. This document
covers what the component does, the route exclusion, the one line the
orchestrator adds to `app/layout.tsx`, the environment variables, and the launch
verification step.

## What it does

`components/analytics/Analytics.tsx` is a client component that renders two
third party trackers:

- GA4 through `gtag.js`, loaded with `next/script` on the `lazyOnload` strategy.
- The Meta pixel base code, also loaded with `next/script` on `lazyOnload`.

Each tracker renders only when its public environment variable is set and only
on routes where tracking is allowed. Page views fire on the initial allowed load
through the tracker init, and on every later allowed route change through a
`usePathname` effect. Server side conversion tracking (the QuizComplete event
sent from the quiz API) lives elsewhere and is not touched here.

## The exclusion, the critical requirement

No tracker may ever load on any route under `/sleep-apnea-test`, which covers the
quiz question pages and the results pages. The exclusion list lives in
`lib/analytics-config.ts`:

```ts
export const EXCLUDED_PREFIXES = ["/sleep-apnea-test"];
```

`isTrackingAllowed(pathname)` returns false when the current path starts with any
excluded prefix. How the exclusion is enforced:

- On an excluded route the component returns `null` before any `<Script>` is
  rendered, so `next/script` never injects `gtag.js` or the Meta base code. A
  direct load of a quiz route makes zero tracker network requests.
- The route change effect returns early on excluded routes, and every `gtag` and
  `fbq` call is gated, so a SPA navigation into the quiz sends nothing to any
  tracker. GA4 page views are handled per route change rather than being left to
  fire on their own for an excluded path.
- Honest residual: if a visitor loads an allowed page first, then navigates into
  the quiz in the same tab, `gtag.js` and `fbq` may already be resident in memory
  from the earlier allowed page. They receive no quiz URL and fire no event,
  because all calls are suppressed on excluded routes. Nothing is transmitted for
  the quiz route. The only fully airtight case, a direct load of a quiz route,
  loads no tracker at all, and that is the case the launch verification checks.

No health data, score, band, quiz slug, or answer is ever sent to a tracker. The
only value passed is the page path of allowed marketing routes.

## Orchestrator wiring, one line in layout.tsx

`app/layout.tsx` is owned by another worker this wave, so this component is not
wired in here. To activate it, the orchestrator adds one line inside `<body>` in
`app/layout.tsx`, as the last child after `<Footer />`:

```tsx
<Analytics />
```

That line needs this import at the top of `app/layout.tsx`:

```tsx
import { Analytics } from "@/components/analytics/Analytics";
```

`app/layout.tsx` is a Server Component, and `Analytics` is a client component, so
rendering it as a child is valid. No provider or wrapper is required.

## Environment variables

Both are public, so they are exposed to the browser with the `NEXT_PUBLIC_`
prefix. Each tracker skips cleanly when its variable is unset.

- `NEXT_PUBLIC_GA4_ID`, the GA4 measurement id for the client side gtag.js.
- `NEXT_PUBLIC_META_PIXEL_ID`, the Meta pixel id for the client side base code.

Both are listed in `.env.example`. The server side GA4 and Meta secrets used by
the quiz API (`GA4_API_SECRET`, `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`) are
separate and unrelated to this component.

## Launch verification

The spec requires verifying that no pixel or GA hit fires on any quiz route.
After wiring `<Analytics />` into the layout and setting both env vars:

1. Open the site and go to any allowed marketing route, for example the home
   page. Open the browser Network tab. Confirm requests to
   `googletagmanager.com/gtag/js` and `connect.facebook.net/en_US/fbevents.js`
   appear, and that a GA4 collect hit and a Meta PageView fire.
2. Navigate to a quiz route, for example `/sleep-apnea-test/adult/`, and reload
   it directly. In the Network tab, confirm zero requests to any tracker host,
   `googletagmanager.com`, `google-analytics.com`, and `facebook.net` or
   `facebook.com`. No `gtag/js`, no `collect`, no `fbevents.js`, no `/tr` pixel.
3. Repeat step 2 for the results route, for example
   `/sleep-apnea-test/adult/results/`. Confirm the same zero tracker requests.

If any tracker request appears on a quiz route, the launch is blocked until it is
resolved.
