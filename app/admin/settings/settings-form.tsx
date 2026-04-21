"use client"

import { handleSettingsUpdate } from "@/app/admin/action-wrappers"
import { FormCard } from "@/components/admin/form-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Settings = {
  id: string
  site_name: string
  tagline: string
  phone: string
  email: string
  address: string
  instagram_url: string
  whatsapp_url: string
  facebook_url: string
  booking_url: string
}

export function SettingsForm({ settings }: { settings: Settings }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <FormCard
        title="Datos del Salon"
        description="Informacion general del negocio."
        action={handleSettingsUpdate}
      >
        <input type="hidden" name="id" value={settings.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="site_name">Nombre del Salon</Label>
            <Input id="site_name" name="site_name" defaultValue={settings.site_name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tagline">Eslogan</Label>
            <Input id="tagline" name="tagline" defaultValue={settings.tagline} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefono</Label>
            <Input id="phone" name="phone" defaultValue={settings.phone} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={settings.email} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Direccion</Label>
          <Input id="address" name="address" defaultValue={settings.address} />
        </div>

        <div className="border-t border-border/50 pt-4 mt-2">
          <p className="text-sm font-medium text-foreground mb-4">Redes Sociales y Enlaces</p>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="instagram_url">Instagram</Label>
              <Input id="instagram_url" name="instagram_url" defaultValue={settings.instagram_url} placeholder="https://instagram.com/..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whatsapp_url">WhatsApp</Label>
              <Input id="whatsapp_url" name="whatsapp_url" defaultValue={settings.whatsapp_url} placeholder="https://wa.me/..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="facebook_url">Facebook</Label>
              <Input id="facebook_url" name="facebook_url" defaultValue={settings.facebook_url} placeholder="https://facebook.com/..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="booking_url">URL de Reservas</Label>
              <Input id="booking_url" name="booking_url" defaultValue={settings.booking_url} placeholder="https://..." />
            </div>
          </div>
        </div>
      </FormCard>
    </div>
  )
}
