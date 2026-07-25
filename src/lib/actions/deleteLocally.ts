'use server'

import path from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { Palette } from '@/types/palette'

export async function deleteLocally(paletteName: string) {
  const isDemo = process.env.NEXT_PUBLIC_IS_DEMO === 'true'
  if (isDemo)
    return {
      success: false,
      message: `Error: failed to delete palette from local storage.`,
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

    const newPalettes = palettes.filter((p: Palette) => p.name !== paletteName)
    writeFileSync(filePath, JSON.stringify(newPalettes, null, 2), 'utf-8')

    return {
      success: true,
      message: `Palette "${paletteName}" removed from local storage.`,
    }
  } catch (error) {
    console.error('Error saving palette:', error)
    return {
      success: false,
      message: `Error: failed to delete "${paletteName}" from local storage.`,
    }
  }
}
