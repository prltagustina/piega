import React from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

// Viewport separado para Next.js 16+ - mejor compatibilidad con iOS
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#5C5278",
};

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
    <html lang="es" className="dark" style={{ WebkitTextSizeAdjust: "100%" }}>
      <body
        className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}
        style={{
          // Fixes para iOS Safari
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}
