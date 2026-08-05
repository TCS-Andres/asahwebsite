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
  The Web3Forms access key is a UUID that Web3Forms emails when you create a
  form. Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to that UUID in Vercel to turn on
  delivery. Until it is set this returns false, so callers fall back to their
  server route and nothing hard fails.
*/
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

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
