'use client'

import { Palette } from '@/types/palette'
import { paletteSchema } from '../schemas/zodSchemas'

export async function storeInBrowser(inputPalette: unknown) {
  const parsedPalette = paletteSchema.safeParse(inputPalette)
  if (!parsedPalette.success) {
    return {
      success: false,
      message: `Error: failed to save palette to browser local storage.`,
    }
  }

  const palette = {
    name: parsedPalette.data.name,
    baseHue: parsedPalette.data.baseHue,
    hueOffset: parsedPalette.data.hueOffset,
    presetSL: parsedPalette.data.presetSL,
    colorSetNames: parsedPalette.data.colorSetNames,
  }

  try {
    const key = 'palettes'
    const stored = localStorage.getItem(key)
    const palettes = stored ? JSON.parse(stored) : []
    const index = palettes.findIndex((p: Palette) => p.name === palette.name)

    if (index !== -1) {
      palettes[index] = palette
    } else {
      palettes.push(palette)
    }

    localStorage.setItem('palettes', JSON.stringify(palettes))

    return {
      success: true,
      message: `Palette "${palette.name}" saved to browser local storage.`,
    }
  } catch (error) {
    console.error('Error saving palette:', error)
    return {
      success: false,
      message: `Failed to save "${palette.name}" to browser local storage.`,
    }
  }
}
