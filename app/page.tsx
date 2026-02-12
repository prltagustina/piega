import { Navbar } from "@/components/sections/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { Marquee } from "@/components/sections/marquee"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { TeamSection } from "@/components/sections/team-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { BookCTA } from "@/components/sections/book-cta"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <div className="site-page relative">
      <Navbar />
      <HeroSection />
      <Marquee />
      <ServicesSection />
      <hr className="site-divider mx-6 md:mx-12 lg:mx-16" />
      <AboutSection />
      <hr className="site-divider mx-6 md:mx-12 lg:mx-16" />
      <TeamSection />
      <Marquee />
      <GallerySection />
      <BookCTA />
      <Footer />
    </div>
  )
}
