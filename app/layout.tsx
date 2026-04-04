import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Haifa Events — כל האירועים בחיפה",
  description: "כל האירועים בחיפה במקום אחד — הופעות, תיאטרון, תערוכות, ילדים ועוד",
  openGraph: {
    title: "haifa.events",
    description: "Everything happening in Haifa — in one place",
    url: "https://haifa.events",
    images: [{ url: "https://haifa.events/og-image.png" }],
    siteName: "Haifa Events",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" className={`${inter.variable} ${nunito.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
