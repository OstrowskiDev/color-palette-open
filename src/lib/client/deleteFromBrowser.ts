'use client'

import { Palette } from '@/types/palette'

export async function deleteFromBrowser(paletteName: string) {
  try {
    const key = 'palettes'
    const stored = localStorage.getItem(key)
    const palettes = stored ? JSON.parse(stored) : []

    const newPalettes = palettes.filter((p: Palette) => p.name !== paletteName)

    localStorage.setItem(key, JSON.stringify(newPalettes))

    return {
      success: true,
      message: `Palette "${paletteName}" removed from browser local storage.`,
    }
  } catch (error) {
    console.error('Error saving palette:', error)
    return {
      success: false,
      message: `Error: failed to delete "${paletteName}" from browser local storage.`,
    }
  }
}
