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
  is_active?: boolean
}

const aspects = ["aspect-[3/4]", "aspect-square"]

type GalleryItem = {
  id: string
  src: string
  alt: string
  aspect: string
}

// El aspect se elige por la posicion dentro de la columna y no por el indice
// global: con el indice global cada columna terminaba con un unico aspect
// (todas verticales de un lado, todas cuadradas del otro) y las alturas se
// desincronizaban a medida que la galeria crecia. El desfase por columna es lo
// que evita que queden todas alineadas.
function toItem(img: GalleryImage, positionInColumn: number, columnPhase: number): GalleryItem {
  return {
    id: img.id,
    src: img.image_url,
    alt: img.alt_text || "Imagen de galeria",
    aspect: aspects[(positionInColumn + columnPhase) % aspects.length],
  }
}

const defaultGallery: GalleryImage[] = [
  { id: "1", image_url: "/images/gallery-1.webp", alt_text: "Resultado de estilismo profesional", sort_order: 1 },
  { id: "2", image_url: "/images/gallery-2.webp", alt_text: "Sala de spa y tratamientos", sort_order: 2 },
  { id: "3", image_url: "/images/gallery-3.webp", alt_text: "Productos y herramientas premium", sort_order: 3 },
  { id: "4", image_url: "/images/gallery-1.webp", alt_text: "Corte y estilo profesional", sort_order: 4 },
  { id: "5", image_url: "/images/gallery-2.webp", alt_text: "Tratamiento capilar", sort_order: 5 },
  { id: "6", image_url: "/images/gallery-3.webp", alt_text: "Color y tendencia", sort_order: 6 },
]

export function GallerySection({ gallery: propGallery }: { gallery: GalleryImage[] }) {
  const gallery = useMemo(
    () =>
      propGallery.length > 0
        ? propGallery
            .filter((img) => (img.is_active ?? true) && img.image_url)
            .sort((a, b) => a.sort_order - b.sort_order)
        : defaultGallery,
    [propGallery],
  )

  // Distribute images into columns dynamically (no limit)
  // For mobile: 2 columns, for desktop: 3 columns
  const columns = useMemo(() => {
    const col1: GalleryItem[] = []
    const col2: GalleryItem[] = []
    const col3: GalleryItem[] = []

    gallery.forEach((img, i) => {
      if (i % 3 === 0) col1.push(toItem(img, col1.length, 0))
      else if (i % 3 === 1) col2.push(toItem(img, col2.length, 1))
      else col3.push(toItem(img, col3.length, 0))
    })

    return { col1, col2, col3 }
  }, [gallery])

  // For mobile: distribute all images into 2 columns
  const mobileColumns = useMemo(() => {
    const col1: GalleryItem[] = []
    const col2: GalleryItem[] = []

    gallery.forEach((img, i) => {
      if (i % 2 === 0) col1.push(toItem(img, col1.length, 0))
      else col2.push(toItem(img, col2.length, 1))
    })

    return { col1, col2 }
  }, [gallery])
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Offsets en rem, no en %: un translate porcentual se resuelve contra la altura
  // del propio elemento, asi que el parallax escalaba con la cantidad de imagenes
  // (~30px con 6, ~240px con 46). El recorrido tampoco cambia de signo, para que
  // la columna del medio quede siempre por debajo de las laterales.
  const col1Y = useTransform(scrollYProgress, [0, 1], ["0rem", "-2rem"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["0rem", "2rem"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["0rem", "-1.5rem"]);

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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-medium leading-tight"
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
            <ScrollReveal key={img.id} delay={i * 0.05}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
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
            <ScrollReveal key={img.id} delay={i * 0.05 + 0.1}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEBAQEBAAIDAAAAAAAAAAAAAAEAEBEGCBVBURNhcZEigf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
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
            <ScrollReveal key={img.id} delay={i * 0.1}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                  sizes="33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
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
            <ScrollReveal key={img.id} delay={i * 0.1 + 0.15}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                  sizes="33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
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
            <ScrollReveal key={img.id} delay={i * 0.1 + 0.3}>
              <motion.div
                className={`relative ${img.aspect} overflow-hidden group cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                  sizes="33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
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
