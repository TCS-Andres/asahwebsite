import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

export const metadata: Metadata = {
  // TODO(SEO worker): replace with full title template, description, openGraph, and metadataBase.
  title: "Austin Sleep & Airway Health",
  description: "Placeholder description. TODO: owned by the SEO worker.",
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
      </body>
    </html>
  );
}
