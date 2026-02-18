"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";

type GalleryImage = {
  id: string
  image_url: string
  alt_text: string
  sort_order: number
}

const aspects = ["aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square"]

export function GallerySection({ gallery }: { gallery: GalleryImage[] }) {
  const images = gallery.map((img, i) => ({
    src: img.image_url,
    alt: img.alt_text || "Imagen de galeria",
    aspect: aspects[i % aspects.length],
  }))
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <ScrollReveal>
        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--site-accent)" }}
          >
            Galería
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold"
            style={{ color: "var(--site-fg)" }}
          >
            Nuestro trabajo
          </h2>
        </div>
      </ScrollReveal>

      {/* Masonry grid with parallax columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {/* Column 1 */}
        <motion.div
          className="flex flex-col gap-3 md:gap-4"
          style={{ y: col1Y }}
        >
          {images.slice(0, 2).map((img, i) => (
            <ScrollReveal key={img.src} delay={i * 0.1}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,21,32,0.6) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div
          className="flex flex-col gap-3 md:gap-4 mt-8 md:mt-16"
          style={{ y: col2Y }}
        >
          {images.slice(2, 4).map((img, i) => (
            <ScrollReveal key={img.src} delay={i * 0.1 + 0.15}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,21,32,0.6) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* Column 3 (hidden on mobile) */}
        <motion.div
          className="hidden md:flex flex-col gap-3 md:gap-4"
          style={{ y: col3Y }}
        >
          {images.slice(4, 6).map((img, i) => (
            <ScrollReveal key={img.src} delay={i * 0.1 + 0.3}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,21,32,0.6) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
