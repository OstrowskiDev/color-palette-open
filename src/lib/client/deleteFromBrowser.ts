'use client'

import { Palette } from '@/types/palette'

export async function deleteLocally(paletteObjectId: string) {
  try {
    const key = 'palettes'
    const stored = localStorage.getItem(key)
    const palettes = stored ? JSON.parse(stored) : []

    const newPalettes = palettes.filter(
      (p: Palette) => p.id !== paletteObjectId,
    )

    localStorage.setItem(key, JSON.stringify(newPalettes))

    return {
      success: true,
      message: `palette "${paletteObjectId}" removed from local storage`,
    }
  } catch (error) {
    console.error('Error saving palette:', error)
    return {
      success: false,
      message: `failed to delete "${paletteObjectId}" from local storage`,
    }
  }
}
