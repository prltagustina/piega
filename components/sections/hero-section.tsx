"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type HeroData = {
  subtitle?: string;
  title_line1?: string;
  title_line2?: string;
  description?: string;
  image_url?: string;
  cta_primary_text?: string;
  cta_secondary_text?: string;
} | null;

type SettingsData = {
  booking_url?: string;
} | null;

export function HeroSection({
  hero,
  settings,
}: {
  hero: HeroData;
  settings: SettingsData;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.45, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative h-screen overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute top-[-10%] bottom-[-10%] left-0 right-0 h-[120%]" style={{ y: imageY }}>
        <Image
          src={hero?.image_url || "/images/hero.jpg"}
          alt="Interior del salón Piega Hair & Beauty"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
          unoptimized={hero?.image_url?.includes('supabase') ? true : false}
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--site-bg)",
          opacity: overlayOpacity,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ y: textY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs uppercase tracking-[0.4em] mb-6"
          style={{ color: "var(--site-accent)" }}
        >
          {hero?.subtitle ? (
            <span dangerouslySetInnerHTML={{ __html: hero.subtitle.replace(/(experiencia)\s+(en)/i, '$1<br class="md:hidden" /> $2') }} />
          ) : (
            <>
              Una nueva experiencia
              <br className="md:hidden" />
              {" "}en Santa Fe
            </>
          )}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-medium leading-[0.95] tracking-tight text-balance"
          style={{ color: "var(--site-fg)" }}
        >
          {hero?.title_line1 || "Love your"}
          <br />
          <span style={{ color: "var(--site-accent)" }}>
            {hero?.title_line2 || "beauty"}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-sm md:text-base font-light max-w-md leading-relaxed"
          style={{ color: "var(--site-fg-muted)" }}
        >
          {hero?.description ||
            "Un espacio donde el estilo se encuentra con la sofisticación. Experiencias de belleza personalizadas para cada persona."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href={settings?.booking_url || "https://piega.site.agendapro.com/ar/sucursal/486410"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
            style={{
              backgroundColor: "var(--site-accent)",
              color: "var(--site-bg)",
            }}
          >
            {hero?.cta_primary_text || "Reservar turno"}
          </a>
          <a
            href="#servicios"
            className="px-10 py-4 text-xs uppercase tracking-[0.25em] font-light border transition-colors duration-300"
            style={{
              borderColor: "var(--site-accent)",
              color: "var(--site-fg)",
            }}
          >
            {hero?.cta_secondary_text || "Nuestros servicios"}
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
