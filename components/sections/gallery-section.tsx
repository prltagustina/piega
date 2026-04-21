"use client";

import { useRef, useMemo } from "react";
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

const defaultGallery: GalleryImage[] = [
  { id: "1", image_url: "/images/gallery-1.jpg", alt_text: "Resultado de estilismo profesional", sort_order: 1 },
  { id: "2", image_url: "/images/gallery-2.jpg", alt_text: "Sala de spa y tratamientos", sort_order: 2 },
  { id: "3", image_url: "/images/gallery-3.jpg", alt_text: "Productos y herramientas premium", sort_order: 3 },
  { id: "4", image_url: "/images/gallery-1.jpg", alt_text: "Corte y estilo profesional", sort_order: 4 },
  { id: "5", image_url: "/images/gallery-2.jpg", alt_text: "Tratamiento capilar", sort_order: 5 },
  { id: "6", image_url: "/images/gallery-3.jpg", alt_text: "Color y tendencia", sort_order: 6 },
]

export function GallerySection({ gallery: propGallery }: { gallery: GalleryImage[] }) {
  const gallery = propGallery.length > 0 ? propGallery : defaultGallery
  const images = gallery.map((img, i) => ({
    src: img.image_url,
    alt: img.alt_text || "Imagen de galeria",
    aspect: aspects[i % aspects.length],
  }))
  
  // Distribute images into columns dynamically (no limit)
  // For mobile: 2 columns, for desktop: 3 columns
  const columns = useMemo(() => {
    const col1: typeof images = []
    const col2: typeof images = []
    const col3: typeof images = []
    
    images.forEach((img, i) => {
      if (i % 3 === 0) col1.push(img)
      else if (i % 3 === 1) col2.push(img)
      else col3.push(img)
    })
    
    return { col1, col2, col3 }
  }, [images])
  
  // For mobile: distribute all images into 2 columns
  const mobileColumns = useMemo(() => {
    const col1: typeof images = []
    const col2: typeof images = []
    
    images.forEach((img, i) => {
      if (i % 2 === 0) col1.push(img)
      else col2.push(img)
    })
    
    return { col1, col2 }
  }, [images])
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Reduced parallax values for smoother mobile performance
  const col1Y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

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
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-medium"
            style={{ color: "var(--site-fg)" }}
          >
            Nuestro trabajo
          </h2>
        </div>
      </ScrollReveal>

      {/* Mobile: 2 columns showing ALL images */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {/* Mobile Column 1 */}
        <motion.div
          className="flex flex-col gap-3"
          style={{ y: col1Y }}
        >
          {mobileColumns.col1.map((img, i) => (
            <ScrollReveal key={`mobile-col1-${i}`} delay={i * 0.05}>
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
                  sizes="50vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(92,82,120,0.7) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* Mobile Column 2 */}
        <motion.div
          className="flex flex-col gap-3 mt-8"
          style={{ y: col2Y }}
        >
          {mobileColumns.col2.map((img, i) => (
            <ScrollReveal key={`mobile-col2-${i}`} delay={i * 0.05 + 0.1}>
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
                  sizes="50vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(92,82,120,0.7) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>

      {/* Desktop: 3 columns with parallax */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {/* Column 1 */}
        <motion.div
          className="flex flex-col gap-4"
          style={{ y: col1Y }}
        >
          {columns.col1.map((img, i) => (
            <ScrollReveal key={`col1-${i}`} delay={i * 0.1}>
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
                      "linear-gradient(to top, rgba(92,82,120,0.7) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div
          className="flex flex-col gap-4 mt-16"
          style={{ y: col2Y }}
        >
          {columns.col2.map((img, i) => (
            <ScrollReveal key={`col2-${i}`} delay={i * 0.1 + 0.15}>
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
                      "linear-gradient(to top, rgba(92,82,120,0.7) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div
          className="flex flex-col gap-4"
          style={{ y: col3Y }}
        >
          {columns.col3.map((img, i) => (
            <ScrollReveal key={`col3-${i}`} delay={i * 0.1 + 0.3}>
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
                      "linear-gradient(to top, rgba(92,82,120,0.7) 0%, transparent 50%)",
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
