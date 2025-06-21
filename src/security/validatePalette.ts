'use server'

import { paletteSchema } from '@/lib/schemas/zodSchemas'

function validatePaletteFromInput(inputTextValue: string) {
  try {
    const parsed = JSON.parse(inputTextValue)
    const result = paletteSchema.parse(parsed)
    return { success: true, data: result }
  } catch (error) {
    return {
      success: false,
      error: 'Make sure to pass correct JSON structure.',
    }
  }
}

function validatePaletteFromFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string)
        const parsed = paletteSchema.parse(json)
        resolve({ success: true, data: parsed })
      } catch (err) {
        resolve({ success: false, error: err })
      }
    }
    reader.onerror = () => {
      resolve({ success: false, error: new Error('File reading failed') })
    }
    reader.readAsText(file)
  })
}
