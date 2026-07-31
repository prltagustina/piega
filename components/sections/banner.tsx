"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

type BannerSlide = {
  src: string
  alt: string
  href: string
}

const slides: BannerSlide[] = [
  { src: "/images/banner/olaplex.jpg", alt: "Olaplex", href: "https://www.google.com" },
  { src: "/images/banner/authentic-beauty-concept.jpg", alt: "Authentic Beauty Concept", href: "https://www.google.com" },
  { src: "/images/banner/moroccanoil.jpg", alt: "Moroccanoil", href: "https://www.google.com" },
  { src: "/images/banner/loreal.jpg", alt: "L'Oreal", href: "https://www.google.com" },
]

export function Banner() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    const touch = e.touches[0]
    setTouchStartX(touch.clientX)
    setTouchStartY(touch.clientY)
    setIsScrolling(false)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartX
    const deltaY = Math.abs(touch.clientY - touchStartY)

    if (!isScrolling && Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
      setIsScrolling(true)
    }

    if (isScrolling) {
      e.preventDefault()
      scrollContainerRef.current.scrollLeft = scrollLeft - deltaX
    }
  }

  const handleTouchEnd = () => {
    setIsScrolling(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const goToSlide = (index: number) => {
    const container = scrollContainerRef.current
    const slide = container?.querySelectorAll<HTMLElement>("[data-banner-slide]")[index]
    if (!container || !slide) return
    container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
    setCurrentIndex(index)
  }

  return (
    <section className="relative py-12 md:py-16 px-6 md:px-12 lg:px-16">
      {/* Mobile: swipeable carousel */}
      <div className="md:hidden flex flex-col gap-4">
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } select-none`}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x pinch-zoom",
            userSelect: "none",
            overscrollBehaviorX: "contain",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.href + i}
              data-banner-slide
              className="relative aspect-[820/1000] min-w-full snap-center overflow-hidden"
            >
              <Link href={slide.href} aria-label={slide.alt} className="group block w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  sizes="100vw"
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{
                width: i === currentIndex ? "28px" : "8px",
                backgroundColor: i === currentIndex ? "var(--site-accent)" : "rgba(212, 204, 196, 0.45)",
              }}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 4-column grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {slides.map((slide, i) => (
          <Link
            key={slide.href + i}
            href={slide.href}
            aria-label={slide.alt}
            className="group relative aspect-[820/1000] overflow-hidden block transition-opacity duration-300 hover:opacity-90"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="25vw"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
