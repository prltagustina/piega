"use client"

import { createGalleryImage, updateGalleryImage, deleteGalleryImage } from "@/app/admin/actions"
import { SubmitButton } from "@/components/admin/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

type GalleryImage = {
  id: string
  image_url: string
  alt_text: string
  sort_order: number
  is_active: boolean
}

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {images.length} imagenes en la galeria
        </p>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Imagen
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Agregar Imagen</DialogTitle>
            </DialogHeader>
            <form
              action={async (formData) => {
                await createGalleryImage(formData)
                setShowCreate(false)
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-2">
                <Label>URL de Imagen</Label>
                <Input name="image_url" required placeholder="/images/nueva-foto.jpg" />
              </div>
              <div className="grid gap-2">
                <Label>Texto Alternativo</Label>
                <Input name="alt_text" placeholder="Descripcion de la imagen" />
              </div>
              <div className="grid gap-2">
                <Label>Orden</Label>
                <Input name="sort_order" type="number" defaultValue={images.length + 1} />
              </div>
              <div className="flex items-center gap-2">
                <Switch name="is_active" defaultChecked />
                <Label>Activa</Label>
              </div>
              <SubmitButton>Agregar Imagen</SubmitButton>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative rounded-lg overflow-hidden border border-border/50 bg-card"
          >
            <div className="aspect-square relative">
              <Image
                src={image.image_url}
                alt={image.alt_text || "Imagen de galeria"}
                fill
                className="object-cover"
              />
              {!image.is_active && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Inactiva</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-xs text-muted-foreground truncate flex-1">
                {image.alt_text || "Sin descripcion"}
              </span>
              <div className="flex items-center gap-1">
                <Dialog
                  open={editingImage?.id === image.id}
                  onOpenChange={(open) => !open && setEditingImage(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setEditingImage(image)}
                    >
                      <Pencil className="h-3 w-3" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Editar Imagen</DialogTitle>
                    </DialogHeader>
                    {editingImage && (
                      <form
                        action={async (formData) => {
                          await updateGalleryImage(formData)
                          setEditingImage(null)
                        }}
                        className="flex flex-col gap-4"
                      >
                        <input type="hidden" name="id" value={editingImage.id} />
                        <div className="grid gap-2">
                          <Label>URL de Imagen</Label>
                          <Input name="image_url" defaultValue={editingImage.image_url} required />
                        </div>
                        <div className="grid gap-2">
                          <Label>Texto Alternativo</Label>
                          <Input name="alt_text" defaultValue={editingImage.alt_text} />
                        </div>
                        <div className="grid gap-2">
                          <Label>Orden</Label>
                          <Input name="sort_order" type="number" defaultValue={editingImage.sort_order} />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch name="is_active" defaultChecked={editingImage.is_active} />
                          <Label>Activa</Label>
                        </div>
                        <SubmitButton>Guardar cambios</SubmitButton>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
                <form action={deleteGalleryImage}>
                  <input type="hidden" name="id" value={image.id} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    type="submit"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
