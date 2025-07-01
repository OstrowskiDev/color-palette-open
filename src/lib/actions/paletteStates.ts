import {
  ColorSettingsActions,
  ColorSettingsState,
} from '../hooks/ColorSettingsContext'
import { Palette } from '../schemas/zodSchemas'

export function setPaletteStates(
  paletteOptions: Palette,
  actions: ColorSettingsActions,
) {
  const { name, baseHue, hueOffset, presetSL, colorSetNames } = paletteOptions
  const {
    setBaseHue,
    setHueOffset,
    setPresetSL,
    setPaletteName,
    setColorSetNames,
  } = actions

  setPaletteName(name)
  setBaseHue(baseHue)
  setHueOffset(hueOffset)
  setPresetSL(presetSL)
  setColorSetNames(colorSetNames)
}

export function getCurrentPallette(state: ColorSettingsState) {
  const { baseHue, hueOffset, presetSL, paletteName, colorSetNames } = state
  return {
    name: paletteName,
    baseHue: baseHue,
    hueOffset: hueOffset,
    presetSL: presetSL,
    colorSetNames: colorSetNames,
  }
}
