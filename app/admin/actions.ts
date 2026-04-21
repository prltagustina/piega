"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// ============================================
// Hero Section
// ============================================
export async function updateHeroSection(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("hero_section")
    .update({
      subtitle: formData.get("subtitle") as string,
      title_line1: formData.get("title_line1") as string,
      title_line2: formData.get("title_line2") as string,
      description: formData.get("description") as string,
      image_url: formData.get("image_url") as string,
      cta_primary_text: formData.get("cta_primary_text") as string,
      cta_secondary_text: formData.get("cta_secondary_text") as string,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/hero")
  revalidatePath("/")
}

// ============================================
// About Section
// ============================================
export async function updateAboutSection(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("about_section")
    .update({
      subtitle: formData.get("subtitle") as string,
      title: formData.get("title") as string,
      paragraph1: formData.get("paragraph1") as string,
      paragraph2: formData.get("paragraph2") as string,
      image_url: formData.get("image_url") as string,
      stat1_number: formData.get("stat1_number") as string,
      stat1_label: formData.get("stat1_label") as string,
      stat2_number: formData.get("stat2_number") as string,
      stat2_label: formData.get("stat2_label") as string,
      stat3_number: formData.get("stat3_number") as string,
      stat3_label: formData.get("stat3_label") as string,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/about")
  revalidatePath("/")
}

// ============================================
// Site Settings
// ============================================
export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("site_settings")
    .update({
      site_name: formData.get("site_name") as string,
      tagline: formData.get("tagline") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      instagram_url: formData.get("instagram_url") as string,
      whatsapp_url: formData.get("whatsapp_url") as string,
      facebook_url: formData.get("facebook_url") as string,
      booking_url: formData.get("booking_url") as string,
      services_default_image: formData.get("services_default_image") as string || "/images/services.jpg",
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/settings")
  revalidatePath("/")
}

// ============================================
// Services CRUD
// ============================================
export async function createService(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase.from("services").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    image_url: formData.get("image_url") as string || "",
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    is_active: formData.get("is_active") === "on",
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/services")
  revalidatePath("/")
}

export async function updateService(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("services")
    .update({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      image_url: formData.get("image_url") as string || "",
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      is_active: formData.get("is_active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/services")
  revalidatePath("/")
}

export async function deleteService(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/services")
  revalidatePath("/")
}

// ============================================
// Team Members CRUD
// ============================================
export async function createTeamMember(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase.from("team_members").insert({
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    image_url: formData.get("image_url") as string,
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    is_active: formData.get("is_active") === "on",
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/team")
  revalidatePath("/")
}

export async function updateTeamMember(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("team_members")
    .update({
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      image_url: formData.get("image_url") as string,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      is_active: formData.get("is_active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/team")
  revalidatePath("/")
}

export async function deleteTeamMember(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/team")
  revalidatePath("/")
}

// ============================================
// Gallery Images CRUD
// ============================================
export async function createGalleryImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase.from("gallery_images").insert({
    image_url: formData.get("image_url") as string,
    alt_text: formData.get("alt_text") as string,
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    is_active: formData.get("is_active") === "on",
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/gallery")
  revalidatePath("/")
}

export async function updateGalleryImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("gallery_images")
    .update({
      image_url: formData.get("image_url") as string,
      alt_text: formData.get("alt_text") as string,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      is_active: formData.get("is_active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/gallery")
  revalidatePath("/")
}

// ============================================
// Reorder Items (generic for services, team, gallery)
// ============================================
export async function reorderItem(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const table = formData.get("table") as string
  const id = formData.get("id") as string
  const direction = formData.get("direction") as string // "up" or "down"
  const revalidateRoute = formData.get("revalidate") as string

  const allowedTables = ["services", "team_members", "gallery_images"]
  if (!allowedTables.includes(table)) throw new Error("Tabla no permitida")

  // Get current item
  const { data: currentItem } = await supabase
    .from(table)
    .select("id, sort_order")
    .eq("id", id)
    .single()

  if (!currentItem) throw new Error("Item no encontrado")

  // Get neighbor: for "up" get the item with next smaller sort_order, for "down" next larger
  let neighborQuery = supabase
    .from(table)
    .select("id, sort_order")

  if (direction === "up") {
    neighborQuery = neighborQuery
      .lt("sort_order", currentItem.sort_order)
      .order("sort_order", { ascending: false })
  } else {
    neighborQuery = neighborQuery
      .gt("sort_order", currentItem.sort_order)
      .order("sort_order", { ascending: true })
  }

  const { data: neighbor } = await neighborQuery.limit(1).single()

  if (!neighbor) return // Already at boundary

  // Swap sort_order values
  const { error: e1 } = await supabase
    .from(table)
    .update({ sort_order: neighbor.sort_order, updated_at: new Date().toISOString() })
    .eq("id", currentItem.id)

  const { error: e2 } = await supabase
    .from(table)
    .update({ sort_order: currentItem.sort_order, updated_at: new Date().toISOString() })
    .eq("id", neighbor.id)

  if (e1 || e2) throw new Error("Error al reordenar")

  if (revalidateRoute) revalidatePath(revalidateRoute)
  revalidatePath("/")
}

export async function deleteGalleryImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/gallery")
  revalidatePath("/")
}

// ============================================
// Contact Section
// ============================================
export async function updateContactSection(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const id = formData.get("id") as string
  
  if (id) {
    const { error } = await supabase
      .from("contact_section")
      .update({
        subtitle: formData.get("subtitle") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image_url: formData.get("image_url") as string,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("contact_section").insert({
      subtitle: formData.get("subtitle") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image_url: formData.get("image_url") as string,
    })

    if (error) throw new Error(error.message)
  }

  revalidatePath("/admin/contact")
  revalidatePath("/")
}

// ============================================
// About Images CRUD (for carousel)
// ============================================
export async function createAboutImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase.from("about_images").insert({
    image_url: formData.get("image_url") as string,
    alt_text: formData.get("alt_text") as string,
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    is_active: true,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/about")
  revalidatePath("/")
}

export async function updateAboutImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("about_images")
    .update({
      image_url: formData.get("image_url") as string,
      alt_text: formData.get("alt_text") as string,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/about")
  revalidatePath("/")
}

export async function deleteAboutImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const { error } = await supabase
    .from("about_images")
    .delete()
    .eq("id", formData.get("id") as string)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/about")
  revalidatePath("/")
}
