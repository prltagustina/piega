"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Sparkles,
  Users,
  ImageIcon,
  Settings,
  LogOut,
  FileText,
  Palette,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

/* Secciones ordenadas igual que la web publica */
const sectionItems = [
  { title: "Inicio (Hero)", href: "/admin/hero", icon: Palette },
  { title: "Sobre Nosotros", href: "/admin/about", icon: FileText },
  { title: "Servicios", href: "/admin/services", icon: Sparkles },
  { title: "Nuestro Trabajo", href: "/admin/gallery", icon: ImageIcon },
  { title: "Equipo", href: "/admin/team", icon: Users },
  { title: "Contacto", href: "/admin/contact", icon: Phone },
];

const systemItems = [
  { title: "Configuracion", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar(); // ✅ SOLO UNA VEZ

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const handleClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/images/logo-piega.png"
            alt="Piega"
            width={80}
            height={26}
            className="h-6 w-auto brightness-110"
          />
          <span className="text-[7px] font-heading font-medium leading-[1.3] tracking-[0.04em] text-sidebar-foreground">
            Hair &<br />
            Beauty
            <br />
            Club
          </span>
          <span className="text-xs text-muted-foreground ml-1">Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                  <Link href="/admin" onClick={handleClick}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Vista General</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secciones */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Secciones del Sitio
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sectionItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                  >
                    <Link href={item.href} onClick={handleClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sistema */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Sistema
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                  >
                    <Link href={item.href} onClick={handleClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesion</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
