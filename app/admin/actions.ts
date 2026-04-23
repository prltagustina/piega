"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const requiredTrimString = z.preprocess((value) => {
  if (typeof value === "string") return value.trim()
  return ""
}, z.string().min(1))

const trimString = z.preprocess((value) => {
  if (typeof value === "string") return value.trim()
  return ""
}, z.string())

const optionalTrimString = z.preprocess((value) => {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
  }
  return undefined
}, z.string().optional())

const checkboxBoolean = z.preprocess((value) => value === "on", z.boolean())

const nonNegativeInt = z.preprocess((value) => {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0
}, z.number().int().nonnegative())

const permittedTable = z.enum(["services", "team_members", "gallery_images"])
const directionEnum = z.enum(["up", "down"])

function parseFormData<T extends z.ZodTypeAny>(schema: T, formData: FormData) {
  const rawData = Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  )

  return schema.parse(rawData)
}

// ============================================
// Hero Section
// ============================================
export async function updateHeroSection(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const heroSchema = z.object({
    id: requiredTrimString,
    subtitle: trimString,
    title_line1: trimString,
    title_line2: trimString,
    description: trimString,
    image_url: trimString,
    cta_primary_text: trimString,
    cta_secondary_text: trimString,
  })

  const data = parseFormData(heroSchema, formData)

  const { error } = await supabase
    .from("hero_section")
    .update({
      subtitle: data.subtitle,
      title_line1: data.title_line1,
      title_line2: data.title_line2,
      description: data.description,
      image_url: data.image_url,
      cta_primary_text: data.cta_primary_text,
      cta_secondary_text: data.cta_secondary_text,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

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

  const aboutSchema = z.object({
    id: requiredTrimString,
    subtitle: trimString,
    title: trimString,
    paragraph1: trimString,
    paragraph2: trimString,
    image_url: trimString,
    stat1_number: trimString,
    stat1_label: trimString,
    stat2_number: trimString,
    stat2_label: trimString,
    stat3_number: trimString,
    stat3_label: trimString,
  })

  const data = parseFormData(aboutSchema, formData)

  const { error } = await supabase
    .from("about_section")
    .update({
      subtitle: data.subtitle,
      title: data.title,
      paragraph1: data.paragraph1,
      paragraph2: data.paragraph2,
      image_url: data.image_url,
      stat1_number: data.stat1_number,
      stat1_label: data.stat1_label,
      stat2_number: data.stat2_number,
      stat2_label: data.stat2_label,
      stat3_number: data.stat3_number,
      stat3_label: data.stat3_label,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

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

  const siteSettingsSchema = z.object({
    id: requiredTrimString,
    site_name: trimString,
    tagline: trimString,
    phone: trimString,
    email: optionalTrimString,
    address: trimString,
    instagram_url: optionalTrimString,
    whatsapp_url: optionalTrimString,
    facebook_url: optionalTrimString,
    booking_url: optionalTrimString,
  })

  const data = parseFormData(siteSettingsSchema, formData)

  const { error } = await supabase
    .from("site_settings")
    .update({
      site_name: data.site_name,
      tagline: data.tagline,
      phone: data.phone,
      email: data.email,
      address: data.address,
      instagram_url: data.instagram_url,
      whatsapp_url: data.whatsapp_url,
      facebook_url: data.facebook_url,
      booking_url: data.booking_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/settings")
  revalidatePath("/")
}

export async function updateServicesDefaultImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const defaultImageSchema = z.object({
    id: requiredTrimString,
    services_default_image: trimString,
  })

  const data = parseFormData(defaultImageSchema, formData)

  const { error } = await supabase
    .from("site_settings")
    .update({
      services_default_image: data.services_default_image || "/images/services.jpg",
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/services")
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

  const createServiceSchema = z.object({
    title: requiredTrimString,
    description: requiredTrimString,
    price: requiredTrimString,
    image_url: trimString,
    sort_order: nonNegativeInt,
    is_active: checkboxBoolean,
  })

  const data = parseFormData(createServiceSchema, formData)

  const { error } = await supabase.from("services").insert({
    title: data.title,
    description: data.description,
    price: data.price,
    image_url: data.image_url,
    sort_order: data.sort_order,
    is_active: data.is_active,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/services")
  revalidatePath("/")
}

export async function updateService(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const updateServiceSchema = z.object({
    id: requiredTrimString,
    title: requiredTrimString,
    description: requiredTrimString,
    price: requiredTrimString,
    image_url: trimString,
    sort_order: nonNegativeInt,
    is_active: checkboxBoolean,
  })

  const data = parseFormData(updateServiceSchema, formData)

  const { error } = await supabase
    .from("services")
    .update({
      title: data.title,
      description: data.description,
      price: data.price,
      image_url: data.image_url,
      sort_order: data.sort_order,
      is_active: data.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/services")
  revalidatePath("/")
}

export async function deleteService(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const deleteServiceSchema = z.object({
    id: requiredTrimString,
  })

  const data = parseFormData(deleteServiceSchema, formData)

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", data.id)

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

  const createTeamMemberSchema = z.object({
    name: requiredTrimString,
    role: requiredTrimString,
    image_url: trimString,
    sort_order: nonNegativeInt,
    is_active: checkboxBoolean,
  })

  const data = parseFormData(createTeamMemberSchema, formData)

  const { error } = await supabase.from("team_members").insert({
    name: data.name,
    role: data.role,
    image_url: data.image_url,
    sort_order: data.sort_order,
    is_active: data.is_active,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/team")
  revalidatePath("/")
}

export async function updateTeamMember(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const updateTeamMemberSchema = z.object({
    id: requiredTrimString,
    name: requiredTrimString,
    role: requiredTrimString,
    image_url: trimString,
    sort_order: nonNegativeInt,
    is_active: checkboxBoolean,
  })

  const data = parseFormData(updateTeamMemberSchema, formData)

  const { error } = await supabase
    .from("team_members")
    .update({
      name: data.name,
      role: data.role,
      image_url: data.image_url,
      sort_order: data.sort_order,
      is_active: data.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/team")
  revalidatePath("/")
}

export async function deleteTeamMember(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const deleteTeamMemberSchema = z.object({
    id: requiredTrimString,
  })

  const data = parseFormData(deleteTeamMemberSchema, formData)

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", data.id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/team")
  revalidatePath("/")
}

export async function updateTeamSectionTitle(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const updateTeamSectionTitleSchema = z.object({
    section_key: z.literal("team"),
    subtitle: trimString,
    title: trimString,
    description: trimString,
  })

  const data = parseFormData(updateTeamSectionTitleSchema, formData)

  const { data: existing } = await supabase
    .from("section_titles")
    .select("id")
    .eq("section_key", data.section_key)
    .single()

  if (existing) {
    const { error } = await supabase
      .from("section_titles")
      .update({
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        updated_at: new Date().toISOString(),
      })
      .eq("section_key", data.section_key)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("section_titles").insert({
      section_key: data.section_key,
      subtitle: data.subtitle,
      title: data.title,
      description: data.description,
    })

    if (error) throw new Error(error.message)
  }

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

  const createGalleryImageSchema = z.object({
    image_url: requiredTrimString,
    alt_text: trimString,
    sort_order: nonNegativeInt,
    is_active: checkboxBoolean,
  })

  const data = parseFormData(createGalleryImageSchema, formData)

  const { error } = await supabase.from("gallery_images").insert({
    image_url: data.image_url,
    alt_text: data.alt_text,
    sort_order: data.sort_order,
    is_active: data.is_active,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/gallery")
  revalidatePath("/")
}

export async function updateGalleryImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const updateGalleryImageSchema = z.object({
    id: requiredTrimString,
    image_url: requiredTrimString,
    alt_text: trimString,
    sort_order: nonNegativeInt,
    is_active: checkboxBoolean,
  })

  const data = parseFormData(updateGalleryImageSchema, formData)

  const { error } = await supabase
    .from("gallery_images")
    .update({
      image_url: data.image_url,
      alt_text: data.alt_text,
      sort_order: data.sort_order,
      is_active: data.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

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

  const reorderSchema = z.object({
    table: permittedTable,
    id: requiredTrimString,
    direction: directionEnum,
    revalidate: trimString.optional(),
  })

  const data = parseFormData(reorderSchema, formData)

  const table = data.table
  const id = data.id
  const direction = data.direction
  const revalidateRoute = data.revalidate

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

  const deleteGalleryImageSchema = z.object({
    id: requiredTrimString,
  })

  const data = parseFormData(deleteGalleryImageSchema, formData)

  const { error } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", data.id)

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

  const contactSchema = z.object({
    id: trimString.optional(),
    subtitle: trimString,
    title: trimString,
    description: trimString,
    image_url: trimString,
  })

  const data = parseFormData(contactSchema, formData)

  if (data.id) {
    const { error } = await supabase
      .from("contact_section")
      .update({
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("contact_section").insert({
      subtitle: data.subtitle,
      title: data.title,
      description: data.description,
      image_url: data.image_url,
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

  const createAboutImageSchema = z.object({
    image_url: requiredTrimString,
    alt_text: trimString,
    sort_order: nonNegativeInt,
  })

  const data = parseFormData(createAboutImageSchema, formData)

  const { error } = await supabase.from("about_images").insert({
    image_url: data.image_url,
    alt_text: data.alt_text,
    sort_order: data.sort_order,
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

  const updateAboutImageSchema = z.object({
    id: requiredTrimString,
    image_url: requiredTrimString,
    alt_text: trimString,
    sort_order: nonNegativeInt,
  })

  const data = parseFormData(updateAboutImageSchema, formData)

  const { error } = await supabase
    .from("about_images")
    .update({
      image_url: data.image_url,
      alt_text: data.alt_text,
      sort_order: data.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/about")
  revalidatePath("/")
}

export async function deleteAboutImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const deleteAboutImageSchema = z.object({
    id: requiredTrimString,
  })

  const data = parseFormData(deleteAboutImageSchema, formData)

  const { error } = await supabase
    .from("about_images")
    .delete()
    .eq("id", data.id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/about")
  revalidatePath("/")
}
