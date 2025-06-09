import { calcHue, Vec2, Coords } from './hue'

export interface HueOffset {
  name: string
  angle: number[]
}

export function calcPositionOnCircle(angle: number): { x: number; y: number } {
  const r = 250 / 2
  const centerX = 142
  const centerY = 142
  return {
    x: -1 * r * Math.sin((Math.PI * 2 * angle) / 360) + centerX,
    y: r * Math.cos((Math.PI * 2 * angle) / 360) + centerY,
  }
}

export function positionDotsOnCircle(
  vecAB: Vec2,
  vecAC: Vec2,
  hueOffset: HueOffset,
  coords: Coords,
): void {
  const newAngle = calcHue(vecAB, vecAC, coords) + 180
  const dotsNum = hueOffset.angle.length
  const dots = [1, 2, 3].map((num) => {
    return document.querySelector<HTMLDivElement>(`.dot-${num}`)
  })
  dots.forEach((dot, i) => {
    if (!dot) return
    if (dotsNum > i) {
      const { x, y } = calcPositionOnCircle(newAngle + hueOffset.angle[i])
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      dot.style.visibility = 'visible'
    } else {
      dot.style.visibility = 'hidden'
    }
  })
}
