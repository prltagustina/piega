"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Upload, X, Crop, Check, Loader2 } from "lucide-react"
import Image from "next/image"

type ImageUploaderProps = {
  name: string
  value?: string
  aspectRatio?: number // e.g. 16/9, 4/5, 1
  folder?: string // subfolder in bucket: "hero", "about", "team", "gallery"
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
  const [cropping, setCropping] = useState(false)
  const [rawImage, setRawImage] = useState<string | null>(null)
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cropContainerRef = useRef<HTMLDivElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(value)
    // Also update the hidden input when value changes externally
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = value
    }
  }, [value])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const reader = new FileReader()
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string
        if (aspectRatio) {
          setRawImage(dataUrl)
          setCropping(true)
          // Initialize crop area when image loads
          const img = new window.Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            setImgNatural({ w: img.naturalWidth, h: img.naturalHeight })
            const imgAR = img.naturalWidth / img.naturalHeight
            let cw: number, ch: number
            if (imgAR > aspectRatio) {
              ch = img.naturalHeight
              cw = ch * aspectRatio
            } else {
              cw = img.naturalWidth
              ch = cw / aspectRatio
            }
            setCropArea({
              x: (img.naturalWidth - cw) / 2,
              y: (img.naturalHeight - ch) / 2,
              w: cw,
              h: ch,
            })
          }
          img.src = dataUrl
        } else {
          uploadDataUrl(dataUrl, file.name)
        }
      }
      reader.readAsDataURL(file)
    },
    [aspectRatio, folder]
  )

  const uploadDataUrl = async (dataUrl: string, fileName: string) => {
    setUploading(true)
    setError(null)
    try {
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const ext = fileName.split(".").pop() || "jpg"
      const uniqueName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

      const supabase = createClient()
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(uniqueName, blob, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(uniqueName)

      const publicUrl = urlData.publicUrl
      setPreview(publicUrl)
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = publicUrl
      }
      onUploaded?.(publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleCropConfirm = useCallback(() => {
    if (!rawImage) return

    const canvas = document.createElement("canvas")
    const maxDim = 1600
    let outW = cropArea.w
    let outH = cropArea.h
    if (outW > maxDim || outH > maxDim) {
      const scale = maxDim / Math.max(outW, outH)
      outW = Math.round(outW * scale)
      outH = Math.round(outH * scale)
    }
    canvas.width = outW
    canvas.height = outH

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.w,
        cropArea.h,
        0,
        0,
        outW,
        outH
      )
      const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.9)
      setCropping(false)
      setRawImage(null)
      uploadDataUrl(croppedDataUrl, "cropped.jpg")
    }
    img.src = rawImage
  }, [rawImage, cropArea])

  const handleCropCancel = () => {
    setCropping(false)
    setRawImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Crop drag handlers - move the crop window within the image
  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = cropContainerRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    const displayW = rect.width
    const displayH = rect.height
    return {
      x: ((clientX - rect.left) / displayW) * imgNatural.w,
      y: ((clientY - rect.top) / displayH) * imgNatural.h,
    }
  }

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setDragging(true)
    const pos = getPointerPos(e)
    setDragStart({
      x: pos.x - cropArea.x,
      y: pos.y - cropArea.y,
    })
  }

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return
    e.preventDefault()
    const pos = getPointerPos(e)
    let newX = pos.x - dragStart.x
    let newY = pos.y - dragStart.y
    newX = Math.max(0, Math.min(newX, imgNatural.w - cropArea.w))
    newY = Math.max(0, Math.min(newY, imgNatural.h - cropArea.h))
    setCropArea((prev) => ({ ...prev, x: newX, y: newY }))
  }

  const handlePointerUp = () => setDragging(false)

  const handleRemove = () => {
    setPreview("")
    if (hiddenInputRef.current) hiddenInputRef.current.value = ""
    onUploaded?.("")
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input type="hidden" name={name} ref={hiddenInputRef} value={preview} onChange={() => {}} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Crop modal */}
      {cropping && rawImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-4 max-w-lg w-full shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Crop className="h-4 w-4" />
                Recortar imagen
              </p>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCropCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div
              ref={cropContainerRef}
              className="relative w-full overflow-hidden rounded-lg select-none touch-none"
              style={{ aspectRatio: `${imgNatural.w} / ${imgNatural.h}` }}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            >
              {/* Base image dimmed */}
              <img
                src={rawImage}
                alt="Preview"
                className="w-full h-full object-contain"
                draggable={false}
              />
              {/* Dark overlay outside crop area */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.5)" }} />
              {/* Bright crop window */}
              <div
                className="absolute cursor-move border-2 border-white/80"
                style={{
                  left: `${(cropArea.x / imgNatural.w) * 100}%`,
                  top: `${(cropArea.y / imgNatural.h) * 100}%`,
                  width: `${(cropArea.w / imgNatural.w) * 100}%`,
                  height: `${(cropArea.h / imgNatural.h) * 100}%`,
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
                  background: "transparent",
                }}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
              >
                {/* Corner indicators */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCropCancel}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCropConfirm} className="bg-primary text-primary-foreground">
                <Check className="h-3.5 w-3.5 mr-1" />
                Aplicar recorte
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview or upload zone */}
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
