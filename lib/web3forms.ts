/*
  Web3Forms client submission. Web3Forms relays form submissions to the inbox
  tied to the access key. On the free plan Web3Forms only accepts submissions
  from the browser, not from a server, so this runs client side and the access
  key is necessarily public. That is by design for Web3Forms. Protect it by
  restricting the key to the austinsleephealth.com domain in the Web3Forms
  dashboard, which blocks use from any other origin.

  The key can be overridden per environment with NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  in Vercel. The fallback keeps delivery working without a build time variable.

  PHI note: never pass raw quiz answers or symptom data here. Web3Forms is a
  third party without a BAA, so only non answer lead fields may be sent.
*/

/*
  The Web3Forms access key is a UUID that Web3Forms issues per form. This is the
  key for the "Austin Sleep & Airway Health" form. Web3Forms states it is a
  public key that is safe in client side code, and the free plan only accepts
  submissions from the browser, so it lives here rather than a server secret.
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY overrides it per environment if the key is
  ever rotated. Restrict the key to the site domains in the Web3Forms dashboard.
*/
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "6161854f-645e-4d79-8ebe-4ec21ed2eedd";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitToWeb3Forms(
  subject: string,
  fields: Record<string, string>,
): Promise<boolean> {
  if (!ACCESS_KEY) return false;
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: ACCESS_KEY, subject, ...fields }),
    });
    const json = (await res.json().catch(() => null)) as
      | { success?: boolean }
      | null;
    return res.ok && json?.success === true;
  } catch {
    return false;
  }
}
