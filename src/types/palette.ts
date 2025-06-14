export type Vec2 = [number, number]

export type Coords = { x: number; y: number }

export type ColorHSL = [number, number, number]

export type SetColor = (color: number) => void

export type ColorSetNames = [string, string, string]

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

// verify if types below are used:
export type ShadeMap = Record<
  '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
  string
>

export type ColorSlot = {
  name: 'primary' | 'accent' | 'highlight'
  hue: number
  saturation: number
  lightnessRange: [number, number]
  preset: 'soft' | 'bold' | 'muted' | 'pastel'
  shades: ShadeMap
}

export type ColorPalette = {
  id: string
  name: string
  mode: 'mono' | 'duo' | 'triadic'
  createdBy: string
  createdAt: Date
  updatedAt: Date
  colors: ColorSlot[]
  version?: number
  tags?: string[]
}
