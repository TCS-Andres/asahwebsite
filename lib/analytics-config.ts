/*
  Analytics route gating config. HIPAA safe by construction.

  EXCLUDED_PREFIXES lists the route trees where NO third party tracker may ever
  load. The sleep apnea test covers both the questionnaire pages and the results
  pages, and both reflect health related input, so no tracker is allowed on any
  of them. The Analytics component uses this list to decide whether to mount the
  tracker scripts at all, so on an excluded route nothing is ever injected.
*/

export const EXCLUDED_PREFIXES = ["/sleep-apnea-test"] as const;

/*
  Return true when third party trackers are allowed on the given route.

  The check is a plain startsWith against each excluded prefix, as required. No
  route on the site shares this string prefix with a different, allowed section,
  so startsWith is both correct and strict here. With trailingSlash true the quiz
  routes arrive as /sleep-apnea-test/, /sleep-apnea-test/adult/, and so on, and
  every one of them starts with the excluded prefix.
*/
export function isTrackingAllowed(pathname: string): boolean {
  return !EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
