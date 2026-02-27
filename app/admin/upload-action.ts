"use server"

import { createClient } from "@/lib/supabase/server"

export async function uploadImage(formData: FormData): Promise<{ url: string | null; error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { url: null, error: "No autorizado" }

  const file = formData.get("file") as File | null
  const folder = (formData.get("folder") as string) || "general"

  if (!file || file.size === 0) {
    return { url: null, error: "No se selecciono ningun archivo" }
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    return { url: null, error: "Formato no permitido. Usa JPG, PNG, WebP, AVIF o GIF." }
  }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { url: null, error: "La imagen no puede superar los 5MB" }
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "31536000",
      upsert: false,
    })

  if (uploadError) {
    return { url: null, error: `Error al subir: ${uploadError.message}` }
  }

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName)

  return { url: urlData.publicUrl, error: null }
}

export async function deleteStorageImage(path: string): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "No autorizado" }

  // Extract the path after the bucket URL
  const bucketUrl = `/storage/v1/object/public/images/`
  const idx = path.indexOf(bucketUrl)
  const filePath = idx !== -1 ? path.substring(idx + bucketUrl.length) : path

  const { error } = await supabase.storage.from("images").remove([filePath])
  if (error) return { error: error.message }

  return { error: null }
}
