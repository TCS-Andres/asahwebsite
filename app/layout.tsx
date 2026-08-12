import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/analytics/Analytics";

/*
  Headline font: Super Clarendon, self hosted, exposed as --font-clarendon.
  Bold (700) and Black (900) weights are bundled.
*/
const clarendon = localFont({
  src: [
    {
      path: "../public/fonts/SuperClarendon-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SuperClarendon-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-clarendon",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/*
  Body font: Mona Sans variable, self hosted, exposed as --font-mona.
  The weight range covers the full variable axis.
*/
const mona = localFont({
  src: [
    {
      path: "../public/fonts/MonaSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/MonaSans-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-mona",
  display: "swap",
  weight: "200 900",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

/*
  Site wide metadata. metadataBase, the title template, and the homepage default
  title live here. The origin literal mirrors siteConfig.domain; it is inlined so
  this file keeps its existing imports untouched. Per page files set their own
  canonical, title, description, and Open Graph via lib/seo buildMetadata.
*/
const HOME_TITLE = "Airway & Sleep Dentist in Austin, TX";
const HOME_OG_TITLE =
  "Airway & Sleep Dentist in Austin, TX | Austin Sleep & Airway Health";
const HOME_DESCRIPTION =
  "Dr. Kacie Culotta and her team provide personalized dental airway and sleep care in Austin, TX, helping you and your family overcome airway challenges and enjoy a healthier, thriving life.";

/*
  The base URL that resolves the share image to an absolute link. It follows
  the live deployment so a shared link renders a working preview before the
  DNS cutover: the Vercel production domain now, and austinsleephealth.com once
  that is set as the production domain. NEXT_PUBLIC_SITE_URL overrides it.
*/
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://austinsleephealth.com");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s | Austin Sleep & Airway Health",
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_OG_TITLE,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: "Austin Sleep & Airway Health",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_OG_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clarendon.variable} ${mona.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink antialiased">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
