'use client'

import { Palette } from '@/types/palette'
import { paletteSchema } from '../schemas/zodSchemas'

export async function saveLocally(paletteOptions: any) {
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
    const existing = stored ? JSON.parse(stored) : []

    const index = existing.findIndex((p: Palette) => p.id === parsed.data.id)

    if (index !== -1) {
      existing[index] = parsed.data
    } else {
      existing.push(parsed.data)
    }

    return {
      success: true,
      message: `palette "${paletteOptions.paletteName}" saved to local storage`,
    }
  } catch (error) {
    console.error('Error saving palette:', error)
    return {
      success: false,
      message: `Failed to save "${paletteOptions.paletteName}" to local storage`,
    }
  }
}
