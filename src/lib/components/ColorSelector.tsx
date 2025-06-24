import ColorWheel from './ColorWheel'
import OverwriteColorsBtn from './OverwriteColorsBtn'

interface ColorSelectorOptions {
  isMouseDown: boolean
  pathToTwFile: string
}

export default function ColorSelector({
  isMouseDown,
  pathToTwFile,
}: ColorSelectorOptions) {
  return (
    <div className="color-selector relative my-[6px] py-[18px] pr-[16px] pb-[14px] pl-[16px]">
      <div
        className="color-selector-container relative"
        id="color-selector-container"
      >
        <ColorWheel isMouseDown={isMouseDown} />
        <OverwriteColorsBtn pathToTwFile={pathToTwFile} />
      </div>
    </div>
  )
}
