import ColorWheel from './ColorWheel'
import DemoEmptyWheelCenter from './DemoEmptyWheelCenter'
import OverwriteColorsBtn from './OverwriteColorsBtn'

interface ColorSelectorOptions {
  isMouseDown: boolean
  pathToTwFile: string
}

export default function ColorSelector({
  isMouseDown,
  pathToTwFile,
}: ColorSelectorOptions) {
  const isDemo = process.env.NEXT_PUBLIC_IS_DEMO === 'true'
  return (
    <div className="color-selector relative my-[6px] py-[18px] pr-[16px] pb-[14px] pl-[16px]">
      <div
        className="color-selector-container relative"
        id="color-selector-container"
      >
        <ColorWheel isMouseDown={isMouseDown} />
        {isDemo ? (
          <DemoEmptyWheelCenter />
        ) : (
          <OverwriteColorsBtn pathToTwFile={pathToTwFile} />
        )}
      </div>
    </div>
  )
}
