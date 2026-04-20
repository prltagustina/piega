"use client"

import { createService, updateService, deleteService, reorderItem } from "@/app/admin/actions"
import { SubmitButton } from "@/components/admin/submit-button"
import { ImageUploader } from "@/components/admin/image-uploader"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"

type Service = {
  id: string
  title: string
  description: string
  price: string
  sort_order: number
  is_active: boolean
  image_url?: string
}

export function ServicesManager({ services }: { services: Service[] }) {
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">
            {services.length} servicios en total
          </p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Crear Servicio</DialogTitle>
            </DialogHeader>
            <form
              action={async (formData) => {
                await createService(formData)
                setShowCreate(false)
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-2">
                <Label>Titulo</Label>
                <Input name="title" required />
              </div>
              <div className="grid gap-2">
                <Label>Descripcion</Label>
                <Textarea name="description" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label>Precio</Label>
                <Input name="price" placeholder="Desde $5.000" />
              </div>
              <div className="grid gap-2">
                <Label>Imagen del servicio</Label>
                <ImageUploader
                  name="image_url"
                  value=""
                  aspectRatio={3 / 4}
                  folder="services"
                />
              </div>
              <input type="hidden" name="sort_order" value={services.length + 1} />
              <div className="flex items-center gap-2">
                <Switch name="is_active" defaultChecked />
                <Label>Activo</Label>
              </div>
              <SubmitButton>Crear Servicio</SubmitButton>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((service, idx) => (
          <Card key={service.id} className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5">
                  <form action={reorderItem}>
                    <input type="hidden" name="table" value="services" />
                    <input type="hidden" name="id" value={service.id} />
                    <input type="hidden" name="direction" value="up" />
                    <input type="hidden" name="revalidate" value="/admin/services" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      type="submit"
                      disabled={idx === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                      <span className="sr-only">Subir</span>
                    </Button>
                  </form>
                  <form action={reorderItem}>
                    <input type="hidden" name="table" value="services" />
                    <input type="hidden" name="id" value={service.id} />
                    <input type="hidden" name="direction" value="down" />
                    <input type="hidden" name="revalidate" value="/admin/services" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      type="submit"
                      disabled={idx === services.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                      <span className="sr-only">Bajar</span>
                    </Button>
                  </form>
                </div>
                <div>
                  <CardTitle className="text-sm text-foreground">
                    {service.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{service.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    service.is_active ? "bg-accent" : "bg-muted-foreground"
                  }`}
                />
                <Dialog
                  open={editingService?.id === service.id}
                  onOpenChange={(open) => !open && setEditingService(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingService(service)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Editar Servicio</DialogTitle>
                    </DialogHeader>
                    {editingService && (
                      <form
                        action={async (formData) => {
                          await updateService(formData)
                          setEditingService(null)
                        }}
                        className="flex flex-col gap-4"
                      >
                        <input type="hidden" name="id" value={editingService.id} />
                        <div className="grid gap-2">
                          <Label>Titulo</Label>
                          <Input name="title" defaultValue={editingService.title} required />
                        </div>
                        <div className="grid gap-2">
                          <Label>Descripcion</Label>
                          <Textarea name="description" defaultValue={editingService.description} rows={3} />
                        </div>
                        <div className="grid gap-2">
                          <Label>Precio</Label>
                          <Input name="price" defaultValue={editingService.price} />
                        </div>
                        <div className="grid gap-2">
                          <Label>Imagen del servicio</Label>
                          <ImageUploader
                            name="image_url"
                            value={editingService.image_url || ""}
                            aspectRatio={3 / 4}
                            folder="services"
                          />
                        </div>
                        <input type="hidden" name="sort_order" value={editingService.sort_order} />
                        <div className="flex items-center gap-2">
                          <Switch name="is_active" defaultChecked={editingService.is_active} />
                          <Label>Activo</Label>
                        </div>
                        <SubmitButton>Guardar cambios</SubmitButton>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
                <form action={deleteService}>
                  <input type="hidden" name="id" value={service.id} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    type="submit"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </form>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
