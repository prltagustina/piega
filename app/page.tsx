export const dynamic = "force-dynamic"

import { createPublicClient } from "@/lib/supabase/public"
import { Navbar } from "@/components/sections/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { Marquee } from "@/components/sections/marquee"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { TeamSection } from "@/components/sections/team-section"
import { BookCTA } from "@/components/sections/book-cta"
import { Footer } from "@/components/sections/footer"

async function getSiteData() {
  const supabase = createPublicClient()

  if (!supabase) {
    return { hero: null, settings: null, services: [], about: null, team: [], gallery: [] }
  }

  try {
    const [heroRes, settingsRes, servicesRes, aboutRes, teamRes, galleryRes] =
      await Promise.all([
        supabase.from("hero_section").select("*").single(),
        supabase.from("site_settings").select("*").single(),
        supabase.from("services").select("*").order("sort_order"),
        supabase.from("about_section").select("*").single(),
        supabase.from("team_members").select("*").order("sort_order"),
        supabase.from("gallery_images").select("*").order("sort_order"),
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
    return { hero: null, settings: null, services: [], about: null, team: [], gallery: [] }
  }
}

export default async function Home() {
  const { hero, settings, services, about, team, gallery } = await getSiteData()

  return (
    <main>
      <Navbar settings={settings} />
      <HeroSection hero={hero} settings={settings} />
      <Marquee />
      <ServicesSection services={services} />
      <AboutSection about={about} />
      <GallerySection gallery={gallery} />
      <TeamSection team={team} />
      <BookCTA settings={settings} />
      <Footer settings={settings} services={services} />
    </main>
  )
}
