import { useState, useEffect } from 'react'
import { calcHue } from '../utils/hue'
import { positionDotsFromCoords, positionDotsFromHue } from '../utils/position'
import styles from './ColorWheel.module.css'
import { useColorSettings } from '../hooks/ColorSettingsContext'

interface ColorWheelProps {
  isMouseDown: boolean
}

export default function ColorWheel({ isMouseDown }: ColorWheelProps) {
  const { state, actions } = useColorSettings()
  const { baseHue, hueOffset } = state
  const { setBaseHue } = actions

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
    positionDotsFromHue(baseHue, hueOffset)
  }, [baseHue])

  useEffect(() => {
    positionDotsFromCoords(vecAB, vecAC, hueOffset, coords)
  }, [coords, hueOffset])

  function getHueFromWheel() {
    const newHue = calcHue(vecAB, vecAC, coords)
    setBaseHue(newHue)
  }

  function getMouseCoords(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  function handleMouseEvents(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    getHueFromWheel()
    getMouseCoords(e)
    positionDotsFromCoords(vecAB, vecAC, hueOffset, coords)
  }

  return (
    <div
      className={`color-wheel ${styles['color-wheel']}`}
      onMouseMove={(e) => isMouseDown && handleMouseEvents(e)}
      onMouseDown={handleMouseEvents}
      onMouseUp={handleMouseEvents}
    >
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`dot dot-${num}`}
          style={{ visibility: 'hidden' }}
        ></div>
      ))}
      <div className={`color-wheel-center ${styles['color-wheel-center']}`}>
        <p>color: {baseHue}</p>
        <p>calcHue: {calcHue(vecAB, vecAC, coords)}</p>
        <p>coords: {`${b.x}, ${b.y}`}</p>
      </div>
    </div>
  )
}
