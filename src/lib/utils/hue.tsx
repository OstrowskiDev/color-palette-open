export type Vec2 = [number, number]

export type Coords = { x: number; y: number }

export type ColorHSL = [number, number, number]

export type SetColor = (color: number) => void

export type PresetSL = {
  name: string
  sat: number
  lightRange: [number, number]
}

export function multiplyVectors(vecAB: Vec2, vecAC: Vec2): number {
  return vecAB[0] * vecAC[0] + vecAB[1] * vecAC[1]
}

export function magnitude(vector: Vec2): number {
  return Math.sqrt(vector[0] ** 2 + vector[1] ** 2)
}

export function calcCosVal(vecAB: Vec2, vecAC: Vec2): number {
  return multiplyVectors(vecAB, vecAC) / (magnitude(vecAB) * magnitude(vecAC))
}

export function calcAngleDegrees(vecAB: Vec2, vecAC: Vec2): number {
  const radians = Math.acos(calcCosVal(vecAB, vecAC))
  return Math.round(radians * (180 / Math.PI))
}

export function calcHue(vecAB: Vec2, vecAC: Vec2, coords: Coords) {
  let deg = calcAngleDegrees(vecAB, vecAC)
  if (coords.x > 150) return deg
  if (coords.x < 150) return 360 - deg
  if (coords.x === 150 && coords.y > 150) return 180
  return 0
}
