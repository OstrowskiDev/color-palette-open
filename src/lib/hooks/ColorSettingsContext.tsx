import {
  AppMode,
  ColorSetNames,
  HueOffset,
  PresetSL,
  Setter,
} from '@/types/palette'
import { createContext, useContext, useState } from 'react'

export interface ColorSettingsState {
  appMode: AppMode
  baseHue: number
  hueOffset: HueOffset
  presetSL: PresetSL
  paletteName: string
  colorSetNames: ColorSetNames
  openModal: string | null
  showAppLoader: boolean
}

export interface ColorSettingsActions {
  setAppMode: Setter<AppMode>
  setBaseHue: Setter<number>
  setHueOffset: Setter<HueOffset>
  setPresetSL: Setter<PresetSL>
  setPaletteName: Setter<string>
  setColorSetNames: Setter<ColorSetNames>
  setOpenModal: Setter<string | null>
  setShowAppLoader: Setter<boolean>
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
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [showAppLoader, setShowAppLoader] = useState<boolean>(false)

  const state = {
    appMode,
    baseHue,
    hueOffset,
    presetSL,
    paletteName,
    colorSetNames,
    openModal,
    showAppLoader,
  }
  const actions = {
    setAppMode,
    setBaseHue,
    setHueOffset,
    setPresetSL,
    setPaletteName,
    setColorSetNames,
    setOpenModal,
    setShowAppLoader,
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
