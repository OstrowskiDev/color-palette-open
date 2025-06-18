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
