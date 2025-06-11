import { hueOffsetOptions, presetSLOptions } from '../schemas/selectOptions'
import { SelectField } from '../ui/SelectField'
import { PresetSL } from '../utils/hue'
import { HueOffset } from '../utils/position'
import InputField from './InputField'

interface ColorSettingsProps {
  baseHue: number
  setBaseHue: (value: number) => void
  hueOffset: HueOffset
  setHueOffset: (value: HueOffset) => void
  presetSL: any
  setPresetSL: (value: PresetSL) => void
  paletteName: string
  setPaletteName: (value: string) => void
}

export default function ColorSettings({
  baseHue,
  setBaseHue,
  hueOffset,
  setHueOffset,
  presetSL,
  setPresetSL,
  paletteName,
  setPaletteName,
}: ColorSettingsProps) {
  return (
    <div className="color-settings-container grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-4 w-full px-6">
      <div className="hue-offset-container flex flex-row">
        <SelectField
          options={hueOffsetOptions}
          value={hueOffset}
          setValue={setHueOffset}
          label="schema"
        />
      </div>
      <div className="shades-container flex flex-row">
        <SelectField
          options={presetSLOptions}
          value={presetSL}
          setValue={setPresetSL}
          label="shades"
        />
      </div>
      <div className="palette-name-container flex flex-row">
        <InputField
          value={paletteName}
          setValue={setPaletteName}
          label="name"
          type="text"
        />
      </div>
      <div className="base-hue-container flex flex-row">
        <InputField
          value={baseHue}
          setValue={(v) => setBaseHue(v === '' ? 0 : Number(v))}
          label="hue"
          type="number"
          min={0}
          max={360}
        />
      </div>
    </div>
  )
}
