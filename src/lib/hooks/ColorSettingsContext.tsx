import { AppMode, ColorSetNames, HueOffset, PresetSL } from '@/types/palette'
import { createContext, useContext, useState } from 'react'

interface ColorSettingsState {
  appMode: AppMode
  baseHue: number
  hueOffset: HueOffset
  presetSL: PresetSL
  paletteName: string
  colorSetNames: ColorSetNames
}

interface ColorSettingsActions {
  setAppMode: React.Dispatch<React.SetStateAction<AppMode>>
  setBaseHue: React.Dispatch<React.SetStateAction<number>>
  setHueOffset: React.Dispatch<React.SetStateAction<HueOffset>>
  setPresetSL: React.Dispatch<React.SetStateAction<PresetSL>>
  setPaletteName: React.Dispatch<React.SetStateAction<string>>
  setColorSetNames: React.Dispatch<React.SetStateAction<ColorSetNames>>
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
  const [appMode, setAppMode] = useState<AppMode>('local')
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
  const [colorSetNames, setColorSetNames] = useState<ColorSetNames>([
    'primary',
    'accent',
    'highlight',
  ])

  const state = {
    appMode,
    baseHue,
    hueOffset,
    presetSL,
    paletteName,
    colorSetNames,
  }
  const actions = {
    setAppMode,
    setBaseHue,
    setHueOffset,
    setPresetSL,
    setPaletteName,
    setColorSetNames,
  }

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
