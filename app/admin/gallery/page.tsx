import { createClient } from "@/lib/supabase/server"
import { GalleryManager } from "./gallery-manager"

export default async function AdminGalleryPage() {
  let images: { id: string; image_url: string; alt_text: string; sort_order: number; is_active: boolean }[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
    if (data) images = data as typeof images
  } catch {
    // Supabase not available
  }

  return <GalleryManager images={images} />
}
