/*
  Default Open Graph share card, applied to every route by the file based
  metadata convention. Forest background with the brand sun mark rising over
  the practice name in Super Clarendon and an Austin, TX tagline. The headline
  font is loaded from the local TTF because the next/og renderer does not read
  woff2. The sun is the trimmed logo mark embedded as a data URI.
*/
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Austin Sleep & Airway Health, airway and sleep care in Austin, TX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens, mirrored from app/globals.css.
const FOREST = "#49665A";
const CREAM = "#F5F5F0";
const GOLD = "#CCA257";

export default async function OpengraphImage() {
  const [clarendon, sunData] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/SuperClarendon-Bold.ttf")),
    readFile(join(process.cwd(), "public/og-sun.png")),
  ]);
  const sunSrc = `data:image/png;base64,${sunData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: FOREST,
          padding: "72px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sunSrc} width={520} height={212} alt="" />

        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontFamily: "Super Clarendon",
            fontSize: 82,
            lineHeight: 1.05,
            color: CREAM,
            textAlign: "center",
            maxWidth: 1000,
          }}
        >
          Austin Sleep & Airway Health
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 34,
            letterSpacing: 2,
            color: GOLD,
            fontWeight: 700,
          }}
        >
          Airway and Sleep Care in Austin, TX
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Super Clarendon",
          data: clarendon,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
