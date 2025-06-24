'use server'

import path from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
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
    return { message: 'Invalid data', errors: parsed.error.format() }
  }

  const filePath = path.join(process.cwd(), 'src/data/palettes.json')
  try {
    let palettes = []
    // sprawdzenie czy plik istnieje
    if (existsSync(filePath)) {
      // sprawdzenie czy plik ma zawartość
      const fileContent = readFileSync(filePath, 'utf-8').trim()
      if (fileContent) {
        palettes = JSON.parse(fileContent)
      }
    }

    const index = palettes.findIndex((p: any) => p.id === paletteObject.id)
    if (index !== -1) {
      palettes[index] = paletteObject
    } else {
      palettes.push(paletteObject)
    }
    writeFileSync(filePath, JSON.stringify(palettes, null, 2), 'utf-8')

    return { message: 'Success' }
  } catch (error) {
    console.error('Error saving palette:', error)
    return { message: 'Failed' }
  }
}
