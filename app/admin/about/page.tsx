import { createClient } from "@/lib/supabase/server"
import { AboutForm } from "./about-form"
import { AboutImagesManager } from "./about-images-manager"

export default async function AdminAboutPage() {
  let about = null
  let aboutImages: { id: string; image_url: string; alt_text: string; sort_order: number }[] = []
  
  try {
    const supabase = await createClient()
    const [aboutRes, imagesRes] = await Promise.all([
      supabase.from("about_section").select("*").single(),
      supabase.from("about_images").select("*").order("sort_order"),
    ])
    about = aboutRes.data
    aboutImages = imagesRes.data ?? []
  } catch {
    // Supabase not available
  }

  if (!about) {
    return (
      <div className="text-muted-foreground">
        No se encontro la seccion Sobre Nosotros en la base de datos.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <AboutForm about={about} />
      <AboutImagesManager images={aboutImages} />
    </div>
  )
}
