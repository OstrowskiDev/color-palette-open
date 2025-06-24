import { HueOffset } from '@/types/palette'

export function calcPositionOnCircle(angle: number): { x: number; y: number } {
  const r = 250 / 2
  const centerX = 142
  const centerY = 142
  return {
    x: -1 * r * Math.sin((Math.PI * 2 * angle) / 360) + centerX,
    y: r * Math.cos((Math.PI * 2 * angle) / 360) + centerY,
  }
}

interface Dot {
  x: number
  y: number
  visibility: 'visible' | 'hidden'
}

function positionDotsOnCircle(hueOffset: HueOffset, newAngle: number) {
  const dotsNum = hueOffset.angle.length
  const dots: Dot[] = [0, 1, 2].map((i) => {
    if (dotsNum > i) {
      const { x, y } = calcPositionOnCircle(newAngle + hueOffset.angle[i])
      return { x, y, visibility: 'visible' }
    } else {
      return { x: 0, y: 0, visibility: 'hidden' }
    }
  })
  return dots
}

export function positionDotsFromHue(baseHue: number, hueOffset: HueOffset) {
  const newAngle = baseHue + 180
  return positionDotsOnCircle(hueOffset, newAngle)
}
