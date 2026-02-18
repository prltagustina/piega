import { createClient } from "@/lib/supabase/server"
import { ServicesManager } from "./services-manager"

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true })

  return <ServicesManager services={services ?? []} />
}
