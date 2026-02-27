import React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

import "./globals.css"
import "./styles/site.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Piega Hair & Beauty Club",
  description: "Salon de belleza premium en Santa Fe. Cortes, color, tratamientos capilares, spa y maquillaje profesional. Reserva tu turno online.",
  keywords: ["salon de belleza", "peluqueria", "Santa Fe", "cortes", "color", "spa", "Piega"],
  openGraph: {
    title: "Piega Hair & Beauty Club",
    description: "Salon de belleza premium - Hair & Beauty Club",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#1c1520",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
