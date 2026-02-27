"use client"

import { createGalleryImage, updateGalleryImage, deleteGalleryImage, reorderItem } from "@/app/admin/actions"
import { ImageUploader } from "@/components/admin/image-uploader"
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
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react"
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
  const [createImageUrl, setCreateImageUrl] = useState("")
  const [editImageUrl, setEditImageUrl] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {images.length} imagenes en la galeria
        </p>
        <Dialog open={showCreate} onOpenChange={(open) => {
          setShowCreate(open)
          if (!open) setCreateImageUrl("")
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Imagen
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-foreground">Agregar Imagen</DialogTitle>
            </DialogHeader>
            <form
              action={async (formData) => {
                await createGalleryImage(formData)
                setShowCreate(false)
                setCreateImageUrl("")
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-2">
                <Label>Imagen</Label>
                <ImageUploader
                  name="image_url"
                  value={createImageUrl}
                  folder="gallery"
                  onUploaded={setCreateImageUrl}
                />
              </div>
              <div className="grid gap-2">
                <Label>Texto Alternativo</Label>
                <Input name="alt_text" placeholder="Descripcion de la imagen" />
              </div>
              <input type="hidden" name="sort_order" value={images.length + 1} />
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
        {images.map((image, idx) => (
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
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <form action={reorderItem}>
                  <input type="hidden" name="table" value="gallery_images" />
                  <input type="hidden" name="id" value={image.id} />
                  <input type="hidden" name="direction" value="up" />
                  <input type="hidden" name="revalidate" value="/admin/gallery" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    type="submit"
                    disabled={idx === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                    <span className="sr-only">Subir</span>
                  </Button>
                </form>
                <form action={reorderItem}>
                  <input type="hidden" name="table" value="gallery_images" />
                  <input type="hidden" name="id" value={image.id} />
                  <input type="hidden" name="direction" value="down" />
                  <input type="hidden" name="revalidate" value="/admin/gallery" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    type="submit"
                    disabled={idx === images.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                    <span className="sr-only">Bajar</span>
                  </Button>
                </form>
              </div>
              <span className="text-xs text-muted-foreground truncate flex-1 px-1">
                {image.alt_text || "Sin descripcion"}
              </span>
              <div className="flex items-center gap-0.5">
                <Dialog
                  open={editingImage?.id === image.id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditingImage(null)
                      setEditImageUrl("")
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        setEditingImage(image)
                        setEditImageUrl(image.image_url)
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Editar Imagen</DialogTitle>
                    </DialogHeader>
                    {editingImage && (
                      <form
                        action={async (formData) => {
                          await updateGalleryImage(formData)
                          setEditingImage(null)
                          setEditImageUrl("")
                        }}
                        className="flex flex-col gap-4"
                      >
                        <input type="hidden" name="id" value={editingImage.id} />
                        <div className="grid gap-2">
                          <Label>Imagen</Label>
                          <ImageUploader
                            name="image_url"
                            value={editImageUrl}
                            folder="gallery"
                            onUploaded={setEditImageUrl}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Texto Alternativo</Label>
                          <Input name="alt_text" defaultValue={editingImage.alt_text} />
                        </div>
                        <input type="hidden" name="sort_order" value={editingImage.sort_order} />
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
