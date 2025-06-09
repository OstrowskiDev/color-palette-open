import { useState, useEffect } from 'react'
import { calcHue, ColorHSL, SetColor } from '../utils/hue'
import { positionDotsOnCircle, hueOffsets, HueOffset } from '../utils/position'
import styles from './ColorWheel.module.css'

interface ColorWheelProps {
  color: ColorHSL
  setColor: SetColor
  hueOffset: HueOffset
  isMouseDown: boolean
}

export default function ColorWheel({
  color,
  setColor,
  hueOffset,
  isMouseDown,
}: ColorWheelProps) {
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 150,
    y: 150,
  })

  const a = { x: 150, y: 150 }
  const b = { ...coords }
  const c = { x: 150, y: 0 }

  const vecAB: [number, number] = [a.x - b.x, a.y - b.y]
  const vecAC: [number, number] = [a.x - c.x, a.y - c.y]

  useEffect(() => {
    positionDotsOnCircle(vecAB, vecAC, hueOffset, coords)
  }, [coords, hueOffset])

  function getHueFromWheel() {
    const newHue = calcHue(vecAB, vecAC, coords)
    setColor([newHue, color[1], color[2]])
  }

  function getMouseCoords(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  function handleMouseEvents(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    getHueFromWheel()
    getMouseCoords(e)
    positionDotsOnCircle(vecAB, vecAC, hueOffset, coords)
  }

  return (
    <div
      className={`color-wheel ${styles['color-wheel']}`}
      onMouseMove={(e) => isMouseDown && handleMouseEvents(e)}
      onMouseDown={handleMouseEvents}
      onMouseUp={handleMouseEvents}
    >
      {hueOffsets.map((dotType) => (
        <div key={dotType.name} className={`dot dot-${dotType.name}`}></div>
      ))}
      <div className={`color-wheel-center ${styles['color-wheel-center']}`}>
        <p>color[0]: {color[0]}</p>
        <p>calcHue: {calcHue(vecAB, vecAC, coords)}</p>
        <p>coords: {`${b.x}, ${b.y}`}</p>
      </div>
    </div>
  )
}
