'use server'

import { Palette } from '@/types/palette'
import { existsSync, readFileSync } from 'fs'
import path from 'path'

export async function getLocalPalettes() {
  const isDemo = process.env.NEXT_PUBLIC_IS_DEMO === 'true'
  if (isDemo) return []

  const filePath = path.join(process.cwd(), 'src/data/palettes.json')
  try {
    let palettes: Palette[] = []
    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, 'utf-8').trim()
      if (fileContent) {
        palettes = JSON.parse(fileContent)
      }
    }

    palettes.sort((a, b) => a.name.localeCompare(b.name))

    return palettes
  } catch (error) {
    console.error('Error reading local src/data/palettes.json', error)
    return []
  }
}
