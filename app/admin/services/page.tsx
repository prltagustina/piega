import { createClient } from "@/lib/db/server"
import { ServicesManager } from "./services-manager"

export default async function AdminServicesPage() {
  let services: Array<Record<string, unknown>> = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
    services = data ?? []
  } catch {
    // Supabase not available
  }

  return <ServicesManager services={services} />
}
