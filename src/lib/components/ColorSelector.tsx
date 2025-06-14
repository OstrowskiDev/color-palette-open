import ColorWheel from './ColorWheel'

interface ColorSelectorOptions {
  isMouseDown: boolean
}

export default function ColorSelector({ isMouseDown }: ColorSelectorOptions) {
  return (
    <div className="color-selector relative my-[6px] py-[18px] pr-[16px] pb-[14px] pl-[16px]">
      <div className="color-selector-container" id="color-selector-container">
        <ColorWheel isMouseDown={isMouseDown} />
      </div>
    </div>
  )
}
