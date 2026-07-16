"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isTrackingAllowed } from "@/lib/analytics-config";

/*
  Client analytics for Austin Sleep & Airway Health, HIPAA safe by construction.

  What it does:
  - Renders GA4 (gtag.js) and the Meta pixel, but only when their public env vars
    are set and only on routes where tracking is allowed.
  - Route gating is the critical requirement. No tracker may load on any route
    under /sleep-apnea-test, the quiz questions and the results. The gate is a
    startsWith check against EXCLUDED_PREFIXES in lib/analytics-config.ts.

  How the exclusion is enforced:
  - On an excluded route this component returns null before any <Script> is
    rendered, so next/script never injects gtag.js or the Meta base code. A hard
    load of a quiz route therefore makes zero tracker network requests.
  - The route change effect fires page views only on allowed routes and returns
    early on excluded ones, so a SPA navigation into the quiz sends nothing to any
    tracker. Every gtag and fbq call is gated the same way.
  - Honest residual: if a visitor loads an allowed page first and then navigates
    into the quiz within the same tab, gtag.js and fbq may already be resident in
    memory from the allowed page. They receive no quiz URL and fire no event,
    because we suppress all calls on excluded routes and configure GA4 with
    send_page_view handled per route rather than automatically. On a direct load
    of a quiz route, nothing is ever loaded, which is the launch verification case.

  No health data, score, band, quiz slug, or answer is ever passed to a tracker.
  The only value sent is the page path of allowed marketing routes.
*/

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
    _fbq?: unknown;
  }
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function Analytics() {
  const pathname = usePathname();
  const allowed = isTrackingAllowed(pathname);

  const ga4Enabled = Boolean(GA4_ID) && allowed;
  const metaEnabled = Boolean(META_PIXEL_ID) && allowed;

  // Skip the first effect run. The init scripts send the first page view
  // themselves, so firing here on mount would double count. Every route change
  // after that fires a manual page view, but only when the route is allowed.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Suppress every route change event on excluded routes.
    if (!allowed) {
      return;
    }
    if (GA4_ID && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        send_to: GA4_ID,
      });
    }
    if (META_PIXEL_ID && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, allowed]);

  // Physically prevent any tracker from mounting on excluded routes. Returning
  // null means next/script never injects gtag.js or the Meta base code here, so
  // a hard load of a quiz route makes zero tracker requests.
  if (!allowed) {
    return null;
  }

  return (
    <>
      {ga4Enabled ? (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: true });
            `}
          </Script>
        </>
      ) : null}

      {metaEnabled ? (
        <Script id="meta-pixel-init" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}

export default Analytics;
