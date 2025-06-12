import generateTailwindColors from '../utils/generateTailwindColors'
import { ColorSetNames, PresetSL } from '../utils/hue'
import { HueOffset } from '../utils/position'

interface OutputPreviewProps {
  baseHue: number
  hueOffset: HueOffset
  presetSL: PresetSL
  colorSetNames: ColorSetNames
}

export default function OutputPreview({
  baseHue,
  hueOffset,
  presetSL,
  colorSetNames,
}: OutputPreviewProps) {
  const twColorsObj = generateTailwindColors(
    baseHue,
    hueOffset,
    presetSL,
    colorSetNames,
  )
  return (
    <div className="output-container h-full w-full overflow-auto">
      <h3 className="output-label ml-4 my-4 text-left text-app-font-light">
        code preview:
      </h3>
      <pre className="code-preview p-4 mx-4 mb-4 text-left text-app-font-strong bg-app-gray-900">
        {/* druga wartość to replacer, tutaj nie będzie używana */}
        {/* trzecia wartość to liczba spacji renderowanych w wcięciach */}
        <code>{JSON.stringify(twColorsObj, null, 3)}</code>
      </pre>
    </div>
  )
}
