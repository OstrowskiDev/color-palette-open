import { paletteSchema } from '@/lib/schemas/zodSchemas'
import { z } from 'zod'

export type Vec2 = [number, number]

export type Coords = { x: number; y: number }

export type ColorHSL = [number, number, number]

export type SetColor = (color: number) => void

export type ColorSetNames = [string, string, string]

export type AppMode = 'local' | 'remote'

export type PresetSL = {
  name: string
  sat: number
  lightRange: number[]
}

export interface HueOffset {
  name: string
  angle: number[]
}

export type TailwindColors = Record<string, Record<number, string>>

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export type Palette = z.infer<typeof paletteSchema>

export type PaletteOption = {
  value: Palette | ''
  label: string
  hidden?: boolean
}
