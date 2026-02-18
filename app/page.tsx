import { createPublicClient } from "@/lib/supabase/public"
import { Navbar } from "@/components/sections/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { Marquee } from "@/components/sections/marquee"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { TeamSection } from "@/components/sections/team-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { BookCTA } from "@/components/sections/book-cta"
import { Footer } from "@/components/sections/footer"

export default async function Page() {
  const supabase = createPublicClient()

  const [heroRes, settingsRes, servicesRes, aboutRes, teamRes, galleryRes] =
    await Promise.all([
      supabase.from("hero_section").select("*").single(),
      supabase.from("site_settings").select("*").single(),
      supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order"),
      supabase.from("about_section").select("*").single(),
      supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("sort_order"),
      supabase
        .from("gallery_images")
        .select("*")
        .eq("is_active", true)
        .order("sort_order"),
    ])

  const hero = heroRes.data
  const settings = settingsRes.data
  const services = servicesRes.data ?? []
  const about = aboutRes.data
  const team = teamRes.data ?? []
  const gallery = galleryRes.data ?? []

  console.log("[v0] Data loaded:", {
    hero: !!hero,
    settings: !!settings,
    services: services.length,
    about: !!about,
    team: team.length,
    gallery: gallery.length,
    heroError: heroRes.error?.message,
    settingsError: settingsRes.error?.message,
  })

  return (
    <div className="site-page relative">
      <Navbar settings={settings} />
      <HeroSection hero={hero} settings={settings} />
      <Marquee />
      <ServicesSection services={services} />
      <hr className="site-divider mx-6 md:mx-12 lg:mx-16" />
      <AboutSection about={about} />
      <hr className="site-divider mx-6 md:mx-12 lg:mx-16" />
      <TeamSection team={team} />
      <Marquee />
      <GallerySection gallery={gallery} />
      <BookCTA settings={settings} />
      <Footer settings={settings} services={services} />
    </div>
  )
}
