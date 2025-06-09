import { calcHue, Vec2, Coords } from './hue'

export interface HueOffset {
  name: string
  angle: number
}

export const hueOffsets: HueOffset[] = [
  { name: 'monochrome', angle: 0 },
  { name: 'complementary', angle: 180 },
  { name: 'triadical1', angle: -120 },
  { name: 'triadical2', angle: 120 },
  { name: 'analogus1', angle: -30 },
  { name: 'analogus2', angle: 30 },
  { name: 'neutral1', angle: -15 },
  { name: 'neutral2', angle: 15 },
  { name: 'custom', angle: 0 },
]

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

  hueOffsets.forEach((dot) => {
    const { x, y } = calcPositionOnCircle(newAngle + dot.angle)
    const dotElement = document.querySelector<HTMLDivElement>(
      `.dot-${dot.name}`,
    )
    if (dotElement?.classList.contains('dot-monochrome')) {
      dotElement.style.left = `${x}px`
      dotElement.style.top = `${y}px`
      dotElement.style.visibility =
        dot.name === hueOffset.name ||
        dot.name === `${hueOffset.name}1` ||
        dot.name === `${hueOffset.name}2`
          ? 'visible'
          : 'hidden'
    }
  })
}
