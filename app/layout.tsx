import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Urlice & José — Mariage 19 Décembre 2026",
  description: "Vous êtes invités au mariage d'Urlice et José, le 19 décembre 2026 à Godomey Cococodji Fandji, Bénin.",
  openGraph: {
    title: "Urlice & José",
    description: "19 Décembre 2026 · Godomey, Bénin",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${greatVibes.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
