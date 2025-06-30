'use client'

export async function getLocalPalettes() {
  try {
    const key = 'palettes'
    const stored = localStorage.getItem(key)
    const palettes = stored ? JSON.parse(stored) : []

    return palettes
  } catch (error) {
    console.error('Error reading local src/data/palettes.json', error)
    return null
  }
}
