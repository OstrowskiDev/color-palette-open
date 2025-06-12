'use client'

import ColorPalettes from '@/lib/components/ColorPalettes'
import ColorSelector from '@/lib/components/ColorSelector'
import ColorSettings from '@/lib/components/ColorSettings'
import ElementWrapper from '@/lib/components/ElementWrapper'
import ListenToResize from '@/lib/components/ListenToResize'
import OutputPreview from '@/lib/components/OutputPreview'
import TopBar from '@/lib/components/TopBar'
import { ColorSetNames, PresetSL } from '@/lib/utils/hue'
import { HueOffset } from '@/lib/utils/position'
import { useState } from 'react'

export default function Home() {
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
  const [trigger, setTrigger] = useState<number>(0)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  function handleMouseDown() {
    setIsMouseDown(true)
  }
  function handleMouseUp() {
    setIsMouseDown(false)
  }

  return (
    <div
      className="app-wrapper h-[95vh] w-[540px] mx-auto flex flex-col justify-center text-white text-center overflow-hidden bg-app-background-secondary"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <ListenToResize trigger={trigger} />
      <TopBar />
      <div className="main-app-container select-none flex flex-col flex-wrap h-[90vh] px-5 gap-x-5">
        <ElementWrapper label={'color settings'} tailwind={'h-[480px]'}>
          <ColorSettings
            baseHue={baseHue}
            setBaseHue={setBaseHue}
            hueOffset={hueOffset}
            setHueOffset={setHueOffset}
            presetSL={presetSL}
            setPresetSL={setPresetSL}
            paletteName={paletteName}
            setPaletteName={setPaletteName}
          />
          <ColorSelector
            baseHue={baseHue}
            setBaseHue={setBaseHue}
            hueOffset={hueOffset}
            isMouseDown={isMouseDown}
          />
        </ElementWrapper>
        <ElementWrapper label={'tailwind palettes'} tailwind={'h-[180px]'}>
          <ColorPalettes
            baseHue={baseHue}
            hueOffset={hueOffset}
            presetSL={presetSL}
          />
        </ElementWrapper>
        <ElementWrapper label={'output'} tailwind={'h-[480px]'}>
          <OutputPreview
            baseHue={baseHue}
            hueOffset={hueOffset}
            presetSL={presetSL}
            colorSetNames={colorSetNames}
            setColorSetNames={setColorSetNames}
          />
        </ElementWrapper>
      </div>
    </div>
  )
}
