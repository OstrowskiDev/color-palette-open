import { hueOffsetOptions, presetSLOptions } from '../schemas/selectOptions'
import { SelectField } from '../ui/SelectField'
import { PresetSL } from '../utils/hue'
import { HueOffset } from '../utils/position'

interface ColorSettingsProps {
  hueOffset: any
  setHueOffset: (value: HueOffset) => void
  presetSL: any
  setPresetSL: (value: PresetSL) => void
}

export default function ColorSettings({
  hueOffset,
  setHueOffset,
  presetSL,
  setPresetSL,
}: ColorSettingsProps) {
  return (
    <div className="color-settings-container flex flex-col w-full">
      <div className="hue-offset-container flex flex-row">
        <SelectField
          options={hueOffsetOptions}
          value={hueOffset}
          setValue={setHueOffset}
          label="schema"
        />
      </div>
      <div className="hue-offset-container flex flex-row mt-2">
        <SelectField
          options={presetSLOptions}
          value={presetSL}
          setValue={setPresetSL}
          label="shades"
        />
      </div>
    </div>
  )
}
