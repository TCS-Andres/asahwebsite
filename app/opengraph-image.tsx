/*
  Default Open Graph image, applied to every route by the file based metadata
  convention. Forest background, the practice name in Super Clarendon, a gold
  accent rule, and an Austin, TX subline in a system sans.

  The headline font is loaded from the local TTF in public/fonts because the
  next/og renderer does not support woff2. The subline intentionally uses a
  system sans, since Mona Sans ships only as a woff2 variable font here.
*/
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Austin Sleep & Airway Health, airway and sleep care in Austin, TX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens, mirrored from app/globals.css.
const FOREST = "#49665A";
const CREAM = "#F5F5F0";
const GOLD = "#CCA257";

export default async function OpengraphImage() {
  const clarendon = await readFile(
    join(process.cwd(), "public/fonts/SuperClarendon-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: FOREST,
          padding: "90px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: GOLD,
            fontWeight: 700,
          }}
        >
          Austin, TX
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            width: 120,
            height: 8,
            backgroundColor: GOLD,
            borderRadius: 4,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontFamily: "Super Clarendon",
            fontSize: 96,
            lineHeight: 1.05,
            color: CREAM,
            maxWidth: 960,
          }}
        >
          Austin Sleep & Airway Health
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 40,
            color: CREAM,
            opacity: 0.85,
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
