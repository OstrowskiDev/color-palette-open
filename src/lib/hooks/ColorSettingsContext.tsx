import { HueOffset, PresetSL } from '@/types/palette'
import { createContext, useContext, useState } from 'react'

interface ColorSettingsState {
  baseHue: number
  hueOffset: HueOffset
  presetSL: PresetSL
  paletteName: string
}

interface ColorSettingsActions {
  setBaseHue: React.Dispatch<React.SetStateAction<number>>
  setHueOffset: React.Dispatch<React.SetStateAction<HueOffset>>
  setPresetSL: React.Dispatch<React.SetStateAction<PresetSL>>
  setPaletteName: React.Dispatch<React.SetStateAction<string>>
}

interface ColorSettingsContextType {
  state: ColorSettingsState
  actions: ColorSettingsActions
}

const ColorSettingsContext = createContext<
  ColorSettingsContextType | undefined
>(undefined)

export function ColorSettingsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [baseHue, setBaseHue] = useState<number>(0)
  const [hueOffset, setHueOffset] = useState<HueOffset>({
    name: 'monochrome',
    angle: [0],
  })
  const [presetSL, setPresetSL] = useState<PresetSL>({
    name: 'contrasts',
    sat: 100,
    lightRange: [97, 94, 88, 78, 65, 55, 45, 35, 25, 18, 10],
  })
  const [paletteName, setPaletteName] = useState<string>('new palette')

  const state = { baseHue, hueOffset, presetSL, paletteName }
  const actions = { setBaseHue, setHueOffset, setPresetSL, setPaletteName }

  return (
    <ColorSettingsContext.Provider value={{ state, actions }}>
      {children}
    </ColorSettingsContext.Provider>
  )
}

export function useColorSettings() {
  const context = useContext(ColorSettingsContext)
  if (!context) {
    throw new Error(
      'useColorSettings must be used within a ColorSettingsProvider',
    )
  }
  return context
}
