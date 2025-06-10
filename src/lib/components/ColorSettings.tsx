import { hueOffsetOptions, presetSLOptions } from '../schemas/selectOptions'
import { SelectField } from '../ui/SelectField'
import { PresetSL } from '../utils/hue'
import { HueOffset } from '../utils/position'
import InputField from './InputField'

interface ColorSettingsProps {
  hueOffset: any
  setHueOffset: (value: HueOffset) => void
  presetSL: any
  setPresetSL: (value: PresetSL) => void
  paletteName: string
  setPaletteName: (value: string) => void
}

export default function ColorSettings({
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
      <div className="shades-container flex flex-row">
        <InputField
          value={paletteName}
          setValue={setPaletteName}
          label="name"
        />
      </div>
    </div>
  )
}
