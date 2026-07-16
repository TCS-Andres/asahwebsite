/*
  Redirect and gone maps for the WordPress to Next.js migration.

  proxy.ts at the project root imports these and applies them on every request.
  The data lives here, separate from the proxy runtime, so the maps stay easy to
  extend and can be imported by a plain unit check without pulling in next/server.

  Matching rules:
  1. Redirects are evaluated before gone rules, so a real service redirect is
     never swallowed by the gone list.
  2. Every lookup runs against a normalized pathname with any trailing slash
     removed, so /sleep-appliances and /sleep-appliances/ both resolve the same.
  3. Real destinations carry the trailing slash the site serves with
     trailingSlash true, so the browser lands on the canonical URL directly and
     no second trailing slash redirect is needed.
*/

// Old path, without a trailing slash, mapped to its new canonical destination.
// Every destination is permanent, so proxy.ts issues these with a 301 status.
export const REDIRECTS: Readonly<Record<string, string>> = {
  // Legacy top level service URLs.
  "/sleep-appliances": "/services/sleep-appliances/",
  "/cbct-and-airway-health-screenings": "/services/cbct-airway-screenings/",
  "/co2-oral-tie-releases": "/services/co2-oral-tie-releases/",
  "/tmj-botox-neurotoxin": "/services/tmj-botox/",
  "/myofunctional-collaborative-space":
    "/services/myofunctional-collaborative-space/",
  "/soft-palate-tightening-with-laser": "/services/soft-palate-tightening/",
  "/airway-focused-dentistry": "/services/airway-focused-dentistry/",

  // Legacy nested service URLs that changed slug.
  "/services/oral-sleep-appliances": "/services/sleep-appliances/",
  "/services/3d-airway-cbct-and-airway-health-screenings":
    "/services/cbct-airway-screenings/",
  "/services/co2-laser-oral-ties": "/services/co2-oral-tie-releases/",
  "/services/laser-tightening-soft-palate": "/services/soft-palate-tightening/",
  "/services/collaborative-space-for-myofunctional-therapists":
    "/services/myofunctional-collaborative-space/",
  // TODO: confirm with the practice, this at home sleep apnea test service may
  // deserve its own page. For now it points at the sleep appliances page.
  "/services/at-home-sleep-apnea-tests": "/services/sleep-appliances/",

  // Legacy quiz URLs mapped to the new sleep apnea test routes.
  "/apnea-quiz-adult": "/sleep-apnea-test/adult/",
  "/apnea-quiz-2-5": "/sleep-apnea-test/ages-2-5/",
  "/apnea-quiz-6-12": "/sleep-apnea-test/ages-6-12/",
  "/apnea-quiz-13-18": "/sleep-apnea-test/ages-13-18/",
  "/apnea-craniofacial-pain": "/sleep-apnea-test/tmj-craniofacial-pain/",

  // Booking.
  "/appointment": "/schedule/",
};

// Exact old paths that must return 410 Gone. These are demo service slugs from
// the old WordPress theme that have no equivalent on the new site. They are
// matched exactly, never by prefix, so a real /services/ page is never caught.
export const GONE_PATHS: ReadonlySet<string> = new Set<string>([
  "/services/general-dentistry",
  "/services/childrens-dentistry",
  "/services/dental-radiography",
  "/services/x-ray-services",
  "/services/urgent-care",
  "/services/mri-diagnostics",
  "/services/annual-checkup",
  "/services/surgical-suite",
  "/services/inpatient-care",
  "/services/modern-laboratory",
  "/services/emergency-care",
  "/services/cosmetic-dentistry",
  "/services/braces-procedures",
  "/services/childbirth-services",
  "/services/results-processing",
  "/services/testing-begins",
  "/services/material-collection",
  "/services/glucose-test",
  "/services/allergy-testing",
  "/services/genetic-testing",
  "/services/metabolic-panel",
  "/services/group-therapy",
  "/services/family-therapy",
  "/services/online-therapy",
  "/services/pharmacy-services",
  "/services/maternity-ward",
  "/services/outpatient-clinic",
  "/services/laboratory-service",
]);

// Whole demo sections that must return 410 Gone. Any path equal to the base or
// nested under it is gone. These never overlap the real routes on the new site.
export const GONE_PREFIXES: readonly string[] = ["/team", "/layouts"];

// Remove a trailing slash from any path except the root, so lookups are stable
// against the trailingSlash true URL shape and both URL forms resolve alike.
export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

// Return the 301 destination for a path, or null when the path is not redirected.
export function resolveRedirect(pathname: string): string | null {
  const path = normalizePath(pathname);
  return REDIRECTS[path] ?? null;
}

// Return true when a path must respond with 410 Gone.
export function isGone(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (GONE_PATHS.has(path)) {
    return true;
  }
  return GONE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/"),
  );
}
