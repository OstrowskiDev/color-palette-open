import { z } from 'zod'

export const hueOffsetSchema = z.object({
  name: z.string(),
  angle: z.array(z.number().int().min(-360).max(360)),
})

export const presetSLSchema = z.object({
  name: z.string(),
  sat: z.number().int().min(0).max(100),
  lightRange: z.array(z.number().int().min(0).max(100)).length(11),
})

export const paletteSchema = z.object({
  id: z.string(),
  baseHue: z.number().int().min(0).max(360),
  hueOffset: hueOffsetSchema,
  presetSL: presetSLSchema,
  colorSetNames: z.tuple([z.string(), z.string(), z.string()]),
})

export type Palette = z.infer<typeof paletteSchema>

//!!!! below schemas for twColors, atm not used in app
// so if its still not used when moving to prod, just delete it

const hslString = z
  .string()
  .regex(/^hsl\(\d{1,3},\s*\d{1,3}%,\s*\d{1,3}%\)$/i, {
    message: 'Invalid HSL color format',
  })

const twColorShadeSchema = z.object({
  50: hslString,
  100: hslString,
  200: hslString,
  300: hslString,
  400: hslString,
  500: hslString,
  600: hslString,
  700: hslString,
  800: hslString,
  900: hslString,
  950: hslString,
})

export const twColorsSchema = z.record(twColorShadeSchema)
