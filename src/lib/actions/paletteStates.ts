import {
  ColorSettingsActions,
  ColorSettingsState,
} from '../hooks/ColorSettingsContext'
import { Palette } from '../schemas/zodSchemas'

export function setPaletteStates(
  paletteOptions: Palette,
  actions: ColorSettingsActions,
) {
  const { id, baseHue, hueOffset, presetSL, colorSetNames } = paletteOptions
  const {
    setBaseHue,
    setHueOffset,
    setPresetSL,
    setPaletteName,
    setColorSetNames,
  } = actions

  setPaletteName(id)
  setBaseHue(baseHue)
  setHueOffset(hueOffset)
  setPresetSL(presetSL)
  setColorSetNames(colorSetNames)
}

export function getCurrentPallette(state: ColorSettingsState) {
  const { baseHue, hueOffset, presetSL, paletteName, colorSetNames } = state
  return {
    id: paletteName,
    baseHue: baseHue,
    hueOffset: hueOffset,
    presetSL: presetSL,
    colorSetNames: colorSetNames,
  }
}
