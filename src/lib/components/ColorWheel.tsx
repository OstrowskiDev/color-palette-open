import { calcHue } from '../utils/hue'
import { positionDotsFromHue } from '../utils/position'
import styles from './ColorWheel.module.css'
import { useColorSettings } from '../hooks/ColorSettingsContext'

interface ColorWheelProps {
  isMouseDown: boolean
}

export default function ColorWheel({ isMouseDown }: ColorWheelProps) {
  const { state, actions } = useColorSettings()
  const { baseHue, hueOffset } = state
  const { setBaseHue } = actions

  const dotsData = positionDotsFromHue(baseHue, hueOffset)

  function setHueFromWheel(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const a = { x: 150, y: 150 }
    const b = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    const c = { x: 150, y: 0 }

    const vecAB: [number, number] = [a.x - b.x, a.y - b.y]
    const vecAC: [number, number] = [a.x - c.x, a.y - c.y]

    const newHue = calcHue(vecAB, vecAC, b)
    setBaseHue(newHue)
  }

  function handleMouseEvents(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setHueFromWheel(e)
  }

  return (
    <div
      className={`color-wheel ${styles['color-wheel']}`}
      onMouseMove={(e) => isMouseDown && handleMouseEvents(e)}
      onMouseDown={handleMouseEvents}
      onMouseUp={handleMouseEvents}
    >
      {dotsData.map(({ x, y, visibility }, i) => (
        <div
          key={i}
          className={`dot dot-${i}`}
          style={{ left: x, top: y, visibility: visibility }}
        ></div>
      ))}
      <div
        className={`color-wheel-center ${styles['color-wheel-center']}`}
      ></div>
    </div>
  )
}
