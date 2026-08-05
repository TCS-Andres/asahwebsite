/*
  Web3Forms client submission. Web3Forms relays form submissions to the inbox
  tied to the access key. On the free plan Web3Forms only accepts submissions
  from the browser, not from a server, so this runs client side and the access
  keys are necessarily public. That is by design for Web3Forms. Restrict each
  key to the site domains in the Web3Forms dashboard so a copied key cannot be
  used elsewhere.

  Two forms keep the responses separated in the Web3Forms dashboard:
  - Contact key: the contact form and the schedule request form.
  - Quiz key: the screening lead, which also names which screening was taken.

  Each key can be overridden per environment with a NEXT_PUBLIC variable.

  PHI note: never pass raw quiz answers or symptom data here. Web3Forms is a
  third party without a BAA, so only non answer lead fields may be sent.
*/

export const WEB3FORMS_CONTACT_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY ||
  "6161854f-645e-4d79-8ebe-4ec21ed2eedd";

export const WEB3FORMS_QUIZ_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_QUIZ_KEY ||
  "f699ab29-3e71-49a5-9a93-b78e6d43628d";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitToWeb3Forms(
  accessKey: string,
  subject: string,
  fields: Record<string, string>,
): Promise<boolean> {
  if (!accessKey) return false;
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: accessKey, subject, ...fields }),
    });
    const json = (await res.json().catch(() => null)) as
      | { success?: boolean }
      | null;
    return res.ok && json?.success === true;
  } catch {
    return false;
  }
}
