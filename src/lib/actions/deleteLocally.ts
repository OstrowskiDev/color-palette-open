'use server'

import path from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'

export async function deleteLocally(paletteObjectId: string) {
  const filePath = path.join(process.cwd(), 'src/data/palettes.json')
  try {
    let palettes = []
    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, 'utf-8').trim()
      if (fileContent) {
        palettes = JSON.parse(fileContent)
      }
    }

    const newPalettes = palettes.filter((p: any) => p.id !== paletteObjectId)
    writeFileSync(filePath, JSON.stringify(newPalettes, null, 2), 'utf-8')

    return { message: 'Success' }
  } catch (error) {
    console.error('Error saving palette:', error)
    return { message: 'Failed' }
  }
}
