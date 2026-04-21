"use client";

import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";

type SettingsData = {
  site_name?: string
  tagline?: string
  phone?: string
  email?: string
  address?: string
  instagram_url?: string
  whatsapp_url?: string
  facebook_url?: string
} | null

type ServiceData = {
  id: string
  title: string
}

const defaultFooterServices: ServiceData[] = [
  { id: "1", title: "Corte & Estilo" },
  { id: "2", title: "Color & Mechas" },
  { id: "3", title: "Tratamientos" },
  { id: "4", title: "Spa & Bienestar" },
  { id: "5", title: "Novias" },
]

export function Footer({ settings, services: propServices }: { settings: SettingsData; services: ServiceData[] }) {
  const services = propServices.length > 0 ? propServices : defaultFooterServices
  return (
    <footer
      className="py-16 md:py-20 px-6 md:px-12 lg:px-16 border-t"
      style={{ borderColor: "var(--site-border)" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
        {/* Brand */}
        <ScrollReveal className="col-span-2 md:col-span-1">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-piega.png"
                alt="Piega"
                width={140}
                height={46}
                className="h-9 w-auto"
              />
              <span
                className="text-[8px] md:text-[9px] font-heading font-medium leading-[1.3] tracking-[0.04em]"
                style={{ color: "var(--site-fg)" }}
              >
                Hair &<br />Beauty<br />Club
              </span>
            </div>
            <p
              className="mt-4 text-xs font-light leading-relaxed max-w-xs"
              style={{ color: "var(--site-fg-muted)" }}
            >
              Un espacio donde el estilo se encuentra con la sofisticación.
              Experiencias de belleza que transforman.
            </p>
          </div>
        </ScrollReveal>

        {/* Navigation */}
        <ScrollReveal delay={0.1}>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-4 font-medium"
              style={{ color: "var(--site-pink)" }}
            >
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Servicios", href: "#servicios" },
                { label: "El Salón", href: "#salon" },
                { label: "Galería", href: "#galeria" },
                { label: "Equipo", href: "#equipo" },
              ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="site-link text-sm font-light"
                      style={{ color: "var(--site-fg-muted)" }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Servicios */}
        <ScrollReveal delay={0.2}>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-4 font-medium"
              style={{ color: "var(--site-pink)" }}
            >
              Servicios
            </h4>
            <ul className="flex flex-col gap-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <span
                    className="text-sm font-light"
                    style={{ color: "var(--site-fg-muted)" }}
                  >
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal delay={0.3}>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-4 font-medium"
              style={{ color: "var(--site-pink)" }}
            >
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              <p
                className="text-sm font-light"
                style={{ color: "var(--site-fg-muted)" }}
              >
                {settings?.address || "Av. Ejemplo 1234, Santa Fe"}
              </p>
              <a
                href={settings?.whatsapp_url || `https://wa.me/${(settings?.phone || "+549342596445").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="site-link text-sm font-light"
                style={{ color: "var(--site-fg-muted)" }}
              >
                {settings?.phone || "+54 9 342 596 445"}
              </a>
              <a
                href={`mailto:${settings?.email || "hola@piega.com.ar"}`}
                className="site-link text-sm font-light"
                style={{ color: "var(--site-fg-muted)" }}
              >
                {settings?.email || "hola@piega.com.ar"}
              </a>

              {/* Social */}
              <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
                {[
                  { label: "Instagram", url: settings?.instagram_url || "#" },
                  { label: "WhatsApp", url: settings?.whatsapp_url || "#" },
                  { label: "Facebook", url: settings?.facebook_url || "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-link text-xs uppercase tracking-wider"
                    style={{ color: "var(--site-fg-muted)" }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-16 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        style={{ borderColor: "var(--site-border)" }}
      >
        <p
          className="text-xs font-light"
          style={{ color: "var(--site-fg-muted)" }}
        >
          2026 Piega Hair & Beauty Club. Todos los derechos reservados.
        </p>
        <p
          className="text-xs font-light"
          style={{ color: "var(--site-fg-muted)" }}
        >
          Sitio desarrollado con Next.js
        </p>
      </div>
    </footer>
  );
}
