'use server'

import path from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { paletteSchema } from '../schemas/zodSchemas'
import { Palette } from '@prisma/client'

export async function saveLocally(inputPalette: unknown) {
  const isDemo = process.env.NEXT_PUBLIC_IS_DEMO === 'true'
  if (isDemo)
    return {
      success: false,
      message: `Error: failed to save palette to local storage.`,
    }

  const parsedPalette = paletteSchema.safeParse(inputPalette)
  if (!parsedPalette.success) {
    return {
      success: false,
      message: `Error: failed to save palette to local storage.`,
    }
  }

  const newPalette = {
    name: parsedPalette.data.name,
    baseHue: parsedPalette.data.baseHue,
    hueOffset: parsedPalette.data.hueOffset,
    presetSL: parsedPalette.data.presetSL,
    colorSetNames: parsedPalette.data.colorSetNames,
  }

  const filePath = path.join(process.cwd(), 'src/data/palettes.json')
  try {
    let palettes = []
    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, 'utf-8').trim()
      if (fileContent) {
        palettes = JSON.parse(fileContent)
      }
    }

    const index = palettes.findIndex((p: Palette) => p.name === newPalette.name)
    if (index !== -1) {
      palettes[index] = newPalette
    } else {
      palettes.push(newPalette)
    }
    writeFileSync(filePath, JSON.stringify(palettes, null, 2), 'utf-8')

    return {
      success: true,
      message: `Palette "${newPalette.name}" saved to local storage.`,
    }
  } catch (error) {
    console.error('Error saving palette:', error)
    return {
      success: false,
      message: `Error: failed to save "${newPalette.name}" to local storage.`,
    }
  }
}
