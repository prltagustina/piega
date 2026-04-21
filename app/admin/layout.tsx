import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export const metadata = {
  title: "Panel Admin | Piega Hair & Beauty Club",
  description: "Tablero de control administrativo de Piega Hair & Beauty Club",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null
  let missingConfig = false
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (error) {
    if (error instanceof Error && error.message === "Supabase env vars missing") {
      missingConfig = true
    }
  }

  if (!user) {
    redirect(
      missingConfig
        ? "/auth/login?reason=missing-config"
        : "/auth/login?reason=auth-required"
    )
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <SidebarInset>
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
