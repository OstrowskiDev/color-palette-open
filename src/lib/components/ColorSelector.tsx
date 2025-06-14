import { HueOffset, SetColor } from '@/types/palette'
import ColorWheel from './ColorWheel'

interface ColorSelectorProps {
  baseHue: number
  setBaseHue: SetColor
  hueOffset: HueOffset
  isMouseDown: boolean
}

export default function ColorSelector({
  baseHue,
  setBaseHue,
  hueOffset,
  isMouseDown,
}: ColorSelectorProps) {
  return (
    <div className="color-selector relative my-[6px] py-[18px] pr-[16px] pb-[14px] pl-[16px]">
      <div className="color-selector-container" id="color-selector-container">
        <ColorWheel
          baseHue={baseHue}
          setBaseHue={setBaseHue}
          hueOffset={hueOffset}
          isMouseDown={isMouseDown}
        />
      </div>
    </div>
  )
}
