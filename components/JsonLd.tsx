/*
  Renders one or more JSON-LD objects as an application/ld+json script. The
  serialized JSON escapes the "<" character so a value can never break out of
  the script element, which is the safe way to inline structured data.

  This is a server component. Import the builders from lib/schema.ts and pass
  their output as data.
*/
import type { JsonLdObject } from "@/lib/schema";

export interface JsonLdProps {
  data: JsonLdObject | JsonLdObject[];
}

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
