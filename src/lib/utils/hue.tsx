export type Vec2 = [number, number]

export type ColorHSL = [number, number, number]

export type SetColor = (color: ColorHSL) => void

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

export function calcHue(
  vecAB: Vec2,
  vecAC: Vec2,
  b: { x: number; y: number } = { x: 150, y: 150 },
): number {
  const deg = calcAngleDegrees(vecAB, vecAC)
  if (b.x > 150) return deg
  if (b.x < 150) return 360 - deg
  if (b.x === 150 && b.y > 150) return 180
  return 0
}
