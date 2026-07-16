import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveRedirect, isGone } from "@/lib/redirects";

/*
  Request interception layer for the WordPress to Next.js migration.

  Next.js 16 renamed the middleware file convention to proxy, so this file is
  proxy.ts at the project root. It runs before routes are rendered and does two
  things, in this order:

  1. Redirects. Legacy URLs 301 permanently to their new canonical paths. This
     runs first so a real service redirect is never swallowed by a gone rule.
  2. Gone. Retired demo content from the old theme returns 410 Gone with a small
     branded body, so search engines drop those URLs instead of chasing a 404.

  The maps live in lib/redirects.ts as typed data structures. Path lookups are
  normalized so both the trailing slash and the non trailing slash form of every
  legacy URL resolve, which matters because the site runs with trailingSlash true.
*/

// Minimal branded body for 410 Gone responses. Plain, self contained, no assets.
const GONE_BODY = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Page removed | Austin Sleep &amp; Airway Health</title>
  </head>
  <body style="font-family: system-ui, sans-serif; max-width: 34rem; margin: 4rem auto; padding: 0 1.5rem; color: #0A0A0A;">
    <h1 style="color: #49665A;">This page is no longer here</h1>
    <p>The page you asked for was retired and will not be coming back.</p>
    <p><a href="/" style="color: #D17960;">Return to Austin Sleep &amp; Airway Health</a></p>
  </body>
</html>`;

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // 1. Permanent redirects win over every gone rule.
  const destination = resolveRedirect(pathname);
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  // 2. Retired demo content returns 410 Gone.
  if (isGone(pathname)) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  // 3. Everything else passes through untouched.
  return NextResponse.next();
}

export const config = {
  /*
    Run on page requests only. The negative lookahead skips the Next internals,
    the API routes, and the metadata files, so proxy never intercepts an asset,
    an image optimization request, or a data route it has no rule for.
  */
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
