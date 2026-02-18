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

async function getSiteData() {
  try {
    const supabase = createPublicClient()

    if (!supabase) {
      // Env vars not available, render with defaults
      return { hero: null, settings: null, services: [], about: null, team: [], gallery: [] }
    }

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

    return {
      hero: heroRes.data,
      settings: settingsRes.data,
      services: servicesRes.data ?? [],
      about: aboutRes.data,
      team: teamRes.data ?? [],
      gallery: galleryRes.data ?? [],
    }
  } catch {
    // Fallback: return nulls so sections render with defaults
    return {
      hero: null,
      settings: null,
      services: [],
      about: null,
      team: [],
      gallery: [],
    }
  }
}

export default async function Page() {
  const { hero, settings, services, about, team, gallery } = await getSiteData()

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
