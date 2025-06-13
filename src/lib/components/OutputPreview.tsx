import Button from '../ui/Button'
import generateTailwindColors from '../utils/generateTailwindColors'
import { ColorSetNames, PresetSL } from '../utils/hue'
import { HueOffset } from '../utils/position'
import InputField from './InputField'

interface OutputPreviewProps {
  baseHue: number
  hueOffset: HueOffset
  presetSL: PresetSL
  colorSetNames: ColorSetNames
  setColorSetNames: (value: ColorSetNames) => void
}

export default function OutputPreview({
  baseHue,
  hueOffset,
  presetSL,
  colorSetNames,
  setColorSetNames,
}: OutputPreviewProps) {
  const twColorsObj = generateTailwindColors(
    baseHue,
    hueOffset,
    presetSL,
    colorSetNames,
  )
  return (
    <div className="output-container h-full w-full">
      <div className="output-settings-container grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-4 w-full px-6 mt-4">
        <div className="primary-color-input-container flex flex-row">
          <InputField
            value={colorSetNames[0]}
            setValue={(v) => {
              setColorSetNames([v, colorSetNames[1], colorSetNames[2]])
            }}
            label="primary"
            type="text"
            labelWidth="80px"
            inputWidth="132px"
          />
        </div>
        <div className="secondary-color-input-container flex flex-row">
          <InputField
            value={colorSetNames[1]}
            setValue={(v) => {
              setColorSetNames([colorSetNames[0], v, colorSetNames[2]])
            }}
            label="secondary"
            type="text"
            labelWidth="80px"
            inputWidth="132px"
          />
        </div>
        <div className="tertiary-color-input-container flex flex-row">
          <InputField
            value={colorSetNames[2]}
            setValue={(v) => {
              setColorSetNames([colorSetNames[0], colorSetNames[1], v])
            }}
            label="tertiary"
            type="text"
            labelWidth="80px"
            inputWidth="132px"
          />
        </div>
      </div>

      <div className="relative code-output-container h-[380px]">
        <Button
          tailwind="copy-on-click absolute top-10 right-8"
          action={() =>
            navigator.clipboard.writeText(JSON.stringify(twColorsObj, null, 3))
          }
          label="copy"
          type="text"
          successMessage="copied!"
        />
        <h3 className="output-label ml-4 mt-4 mb-1 text-left text-app-font-light">
          code preview:
        </h3>
        <pre className="code-preview px-4 py-2 mx-4 mb-4 text-left text-app-font-strong bg-app-gray-900 overflow-auto h-[340px] select-text">
          {/* druga wartość to replacer, tutaj nie będzie używana */}
          {/* trzecia wartość to liczba spacji renderowanych w wcięciach */}
          <code>{JSON.stringify(twColorsObj, null, 3)}</code>
        </pre>
      </div>
    </div>
  )
}
