"use client"

import { useState, useRef, useCallback } from "react"
import { uploadImage } from "@/app/admin/upload-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"

type ImageUploadProps = {
  name: string
  label?: string
  currentUrl?: string
  folder?: string
  onUploadComplete?: (url: string) => void
}

export function ImageUpload({
  name,
  label = "Imagen",
  currentUrl = "",
  folder = "general",
  onUploadComplete,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(currentUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    setError(null)

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      setError("Formato no permitido. Usa JPG, PNG, WebP, AVIF o GIF.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar los 5MB.")
      return
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)
    setUploading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    const result = await uploadImage(formData)

    if (result.error) {
      setError(result.error)
      setPreview(currentUrl)
      setUploading(false)
      URL.revokeObjectURL(localPreview)
      return
    }

    if (result.url) {
      URL.revokeObjectURL(localPreview)
      setPreview(result.url)
      // Update the hidden input with the new URL
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = result.url
      }
      onUploadComplete?.(result.url)
    }

    setUploading(false)
  }, [currentUrl, folder, onUploadComplete])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleRemove = () => {
    setPreview("")
    setError(null)
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = ""
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {/* Hidden input that holds the URL value for form submission */}
      <input type="hidden" name={name} ref={hiddenInputRef} defaultValue={currentUrl} />

      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border border-border/50 bg-secondary/30">
          <div className="relative aspect-video">
            <Image
              src={preview}
              alt="Vista previa"
              fill
              className="object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
            {uploading && (
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Subiendo imagen...
                </div>
              </div>
            )}
          </div>
          {!uploading && (
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-3.5 w-3.5" />
                <span className="sr-only">Cambiar imagen</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm text-destructive hover:text-destructive"
                onClick={handleRemove}
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Eliminar imagen</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-border/50 hover:border-primary/50 hover:bg-secondary/20"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click() }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="rounded-full bg-secondary/50 p-3">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {isDragOver ? "Soltar imagen aqui" : "Arrastra una imagen o haz clic para seleccionar"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, WebP, AVIF o GIF. Max 5MB.
            </p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2">
          {error}
        </p>
      )}
    </div>
  )
}
