import { createClient } from "@/lib/supabase/server"
import { ServicesManager } from "./services-manager"

export default async function AdminServicesPage() {
  let services: { id: string; title: string; description: string; price: string; sort_order: number; is_active: boolean }[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
    if (data) services = data as typeof services
  } catch {
    // Supabase not available
  }

  return <ServicesManager services={services} />
}
