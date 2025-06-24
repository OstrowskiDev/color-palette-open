'use server'

import { paletteSchema } from '@/lib/schemas/zodSchemas'
import { Palette } from '@/types/palette'

type ValidationResult =
  | { success: true; data: Palette }
  | { success: false; error: string }

export async function validatePaletteString(
  inputTextValue: string,
): Promise<ValidationResult> {
  try {
    const parsed = JSON.parse(inputTextValue)
    const result = paletteSchema.parse(parsed) as Palette
    return { success: true, data: result }
  } catch (error) {
    return {
      success: false,
      error: 'Make sure to pass correct JSON structure.',
    }
  }
}
