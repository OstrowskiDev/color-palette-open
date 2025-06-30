'use client'

import { Palette } from '@/types/palette'
import { paletteSchema } from '../schemas/zodSchemas'

export async function storeInBrowser(paletteOptions: any) {
  const paletteObject = {
    id: paletteOptions.paletteName,
    baseHue: paletteOptions.baseHue,
    hueOffset: paletteOptions.hueOffset,
    presetSL: paletteOptions.presetSL,
    colorSetNames: paletteOptions.colorSetNames,
  }

  const parsed = paletteSchema.safeParse(paletteObject)
  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid data',
      errors: parsed.error.format(),
    }
  }

  try {
    const key = 'palettes'
    const stored = localStorage.getItem(key)
    const palettes = stored ? JSON.parse(stored) : []
    const index = palettes.findIndex((p: Palette) => p.id === parsed.data.id)

    if (index !== -1) {
      palettes[index] = parsed.data
    } else {
      palettes.push(parsed.data)
    }

    localStorage.setItem('palettes', JSON.stringify(palettes))

    return {
      success: true,
      message: `palette "${paletteOptions.paletteName}" saved to browser local storage`,
    }
  } catch (error) {
    console.error('Error saving palette:', error)
    return {
      success: false,
      message: `Failed to save "${paletteOptions.paletteName}" to browser local storage`,
    }
  }
}
