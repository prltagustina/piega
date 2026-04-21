import { createClient } from "@/lib/supabase/server"
import { ServicesManager } from "./services-manager"

export default async function AdminServicesPage() {
  let services: { id: string; title: string; description: string; price: string; sort_order: number; is_active: boolean }[] = []
  let settings: { id: string; services_default_image?: string | null } | null = null
  let settingsError: string | null = null
  try {
    const supabase = await createClient()
    const [{ data: servicesData, error: servicesError }, { data: settingsData, error: siteSettingsError }] = await Promise.all([
      supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("site_settings")
        .select("id, services_default_image")
        .single(),
    ])
    if (servicesError) throw new Error(servicesError.message)
    if (servicesData) services = servicesData as typeof services
    if (siteSettingsError) {
      settingsError = siteSettingsError.message
    } else if (settingsData) {
      settings = settingsData
    }
  } catch {
    // Supabase not available
  }

  return <ServicesManager services={services} settings={settings} settingsError={settingsError} />
}
