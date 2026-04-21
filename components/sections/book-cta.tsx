"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";

type SettingsData = {
  phone?: string
  booking_url?: string
} | null

type ContactData = {
  subtitle?: string
  title?: string
  description?: string
  image_url?: string
} | null

export function BookCTA({ settings, contact }: { settings?: SettingsData; contact?: ContactData }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      id="reservar"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute top-[-10%] bottom-[-10%] left-0 right-0 h-[120%]" style={{ y: bgY }}>
        <Image
          src={contact?.image_url || "/images/hero.jpg"}
          alt="Ambiente del salon"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(92,82,120,0.85)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <ScrollReveal>
          <p
            className="text-xs uppercase tracking-[0.4em] mb-6"
            style={{ color: "var(--site-accent)" }}
          >
            {contact?.subtitle || "Reserva tu experiencia"}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-heading font-medium leading-tight max-w-3xl text-balance"
            style={{ color: "var(--site-fg)" }}
          >
            {contact?.title || "Tu momento de belleza te espera"}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="mt-6 text-sm md:text-base font-light max-w-md leading-relaxed"
            style={{ color: "var(--site-fg-muted)" }}
          >
            {contact?.description || "Agenda tu turno de manera simple y rapida. Elegis el servicio, el profesional y el horario que mas te convenga."}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <motion.a
            href={settings?.booking_url || "https://piega.site.agendapro.com/ar/sucursal/486410"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium transition-all duration-300"
            style={{
              backgroundColor: "var(--site-accent)",
              color: "var(--site-bg)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Reservar ahora
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p
            className="mt-6 text-xs font-light"
            style={{ color: "var(--site-fg-muted)" }}
          >
            {"También podés escribirnos al "}
            <a
              href={`https://wa.me/${(settings?.phone || "+549342596445").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="site-link"
              style={{ color: "var(--site-accent)" }}
            >
              {settings?.phone || "+54 9 342 596 445"}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
