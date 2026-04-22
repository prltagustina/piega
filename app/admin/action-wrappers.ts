"use server"

import { updateHeroSection, updateAboutSection, updateSiteSettings } from "@/app/admin/actions"

export async function handleHeroUpdate(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  try {
    await updateHeroSection(formData)
    return { error: null, success: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido", success: false }
  }
}

export async function handleAboutUpdate(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  try {
    await updateAboutSection(formData)
    return { error: null, success: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido", success: false }
  }
}

export async function handleSettingsUpdate(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  try {
    await updateSiteSettings(formData)
    return { error: null, success: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido", success: false }
  }
}
