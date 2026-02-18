import { createClient } from "@/lib/db/server"
import { GalleryManager } from "./gallery-manager"

export default async function AdminGalleryPage() {
  let images: Array<Record<string, unknown>> = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
    images = data ?? []
  } catch {
    // Supabase not available
  }

  return <GalleryManager images={images} />
}
