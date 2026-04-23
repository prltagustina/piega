import React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

import "./globals.css";
import "./styles/site.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Piega Hair & Beauty Club",
  description: "Salon de belleza premium - Hair & Beauty Club",
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#000000",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/p-icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    shortcut: "/p-icon.svg",
    apple: {
      url: "/p-icon.svg",
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
