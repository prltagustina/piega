"use client"

import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"

type ImageUploaderProps = {
  name: string
  value?: string
  aspectRatio?: number
  folder?: string
  onUploaded?: (url: string) => void
  className?: string
}

export function ImageUploader({
  name,
  value = "",
  aspectRatio,
  folder = "general",
  onUploaded,
  className = "",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(value)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(value)
  }, [value])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setError(null)

    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5MB")
      return
    }

    setUploading(true)

    try {
      const supabase = createClient()
      
      // Verificar autenticación
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error("Debes iniciar sesión para subir imágenes")
      }

      // Generar nombre único
      const ext = file.name.split(".").pop() || "jpg"
      const uniqueName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

      // Subir archivo
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(uniqueName, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(uniqueName)

      const publicUrl = urlData.publicUrl
      setPreview(publicUrl)
      onUploaded?.(publicUrl)
    } catch (err) {
      console.error("Error uploading:", err)
      setError(err instanceof Error ? err.message : "Error al subir la imagen")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleRemove = () => {
    setPreview("")
    onUploaded?.("")
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input type="hidden" name={name} value={preview} readOnly />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border border-border/50 bg-secondary/30">
          <div
            className="relative w-full"
            style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : "16/9" }}
          >
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="h-3.5 w-3.5 mr-1" />
              Cambiar
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Quitar
            </Button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/60 bg-secondary/20 p-6 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary/40 cursor-pointer"
          style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined, minHeight: aspectRatio ? undefined : "120px" }}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-xs">Seleccionar imagen</span>
              <span className="text-[10px] text-muted-foreground/60">JPG, PNG, WebP (max 5MB)</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
