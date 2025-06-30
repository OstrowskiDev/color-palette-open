'use server'

import { existsSync, readFileSync } from 'fs'
import path from 'path'

export async function getLocalPalettes() {
  const filePath = path.join(process.cwd(), 'src/data/palettes.json')
  try {
    let palettes = []
    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, 'utf-8').trim()
      if (fileContent) {
        palettes = JSON.parse(fileContent)
      }
    }
    return palettes
  } catch (error) {
    console.error('Error reading local src/data/palettes.json', error)
    return null
  }
}
