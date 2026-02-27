"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useIsMobileDevice } from "@/hooks/use-is-mobile-device";

type HeroData = {
  subtitle?: string
  title_line1?: string
  title_line2?: string
  description?: string
  image_url?: string
  cta_primary_text?: string
  cta_secondary_text?: string
} | null

type SettingsData = {
  booking_url?: string
} | null

export function HeroSection({ hero, settings }: { hero: HeroData; settings: SettingsData }) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobileDevice();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.45, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "50%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative h-screen overflow-hidden"
    >
      {/* Background image - static on mobile, parallax on desktop */}
      <motion.div className="absolute inset-0" style={isMobile ? undefined : { y: imageY }}>
        <Image
          src={hero?.image_url || "/images/hero.jpg"}
          alt="Interior del salon Piega Hair & Beauty"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMAAAAAAAAAAAAAAQACAwQFEQYSITETQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEEA/ANBs2oKS7UsdTQyiSJ+cHGOxkdhEQf/Z"
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
        style={isMobile ? undefined : { y: textY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs uppercase tracking-[0.4em] mb-6"
          style={{ color: "var(--site-accent)" }}
        >
          {hero?.subtitle || "Salón de belleza premium"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-6xl md:text-8xl lg:text-9xl font-heading font-medium leading-[0.95] tracking-tight text-balance"
          style={{ color: "var(--site-fg)" }}
        >
          {hero?.title_line1 || "El arte de"}
          <br />
          <span style={{ color: "var(--site-accent)" }}>{hero?.title_line2 || "ser vos"}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-sm md:text-base font-light max-w-md leading-relaxed"
          style={{ color: "var(--site-fg-muted)" }}
        >
          {hero?.description || "Un espacio donde el estilo se encuentra con la sofisticación. Experiencias de belleza personalizadas para cada persona."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href={settings?.booking_url || "#reservar"}
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-[1px] h-12"
            style={{ backgroundColor: "var(--site-accent)", opacity: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
