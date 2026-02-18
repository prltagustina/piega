import { createClient } from "@/lib/supabase/server"
import { TeamManager } from "./team-manager"

export default async function AdminTeamPage() {
  const supabase = await createClient()
  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })

  return <TeamManager members={members ?? []} />
}
