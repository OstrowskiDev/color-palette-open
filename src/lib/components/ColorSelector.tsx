import { ColorHSL, SetColor } from '../utils/hue'
import { HueOffset } from '../utils/position'
import ColorWheel from './ColorWheel'

interface ColorSelectorProps {
  color: ColorHSL
  setColor: SetColor
  hueOffset: HueOffset
  isMouseDown: boolean
}

export default function ColorSelector({
  color,
  setColor,
  hueOffset,
  isMouseDown,
}: ColorSelectorProps) {
  return (
    <div className="color-selector">
      <div className="color-selector-container" id="color-selector-container">
        <ColorWheel
          color={color}
          setColor={setColor}
          hueOffset={hueOffset}
          isMouseDown={isMouseDown}
        />
      </div>
    </div>
  )
}
