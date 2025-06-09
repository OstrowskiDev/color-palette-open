'use client'

import ColorSelector from '@/lib/components/ColorSelector'
import ColorSettings from '@/lib/components/ColorSettings'
import ElementWrapper from '@/lib/components/ElementWrapper'
import { PresetSL } from '@/lib/utils/hue'
import { HueOffset } from '@/lib/utils/position'
import { useEffect, useState } from 'react'

export default function Home() {
  const [baseHue, setBaseHue] = useState<number>(0)
  const [hueOffset, setHueOffset] = useState<HueOffset>({
    name: 'monochrome',
    angle: [0],
  })
  const [presetSL, setPresetSL] = useState<PresetSL>({
    name: 'soft',
    sat: 80,
    lightRange: [20, 95],
  })
  // const [showHidePalettes, setSHPalettes] = useState('block')
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  // useEffect(() => {
  //   autoCollapse('color-selector-collapse', hueOffset)
  //   changeLayoutOnResize(hueOffset)
  // }, [])

  function handleMouseDown() {
    setIsMouseDown(true)
  }
  function handleMouseUp() {
    setIsMouseDown(false)
  }

  return (
    <div
      className="app-wrapper flex flex-row items-center justify-center h-[94vh] min-w-[540px] max-w-[1740px] text-white text-center overflow-hidden bg-app-background-secondary"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="main-app-container select-none flex flex-col items-center w-[1080px] h-[90vh] flex-wrap overflow-hidden">
        <ElementWrapper label={'color settings'} tailwind={'h-[480px]'}>
          <ColorSettings
            hueOffset={hueOffset}
            setHueOffset={setHueOffset}
            presetSL={presetSL}
            setPresetSL={setPresetSL}
          />
          <ColorSelector
            baseHue={baseHue}
            setBaseHue={setBaseHue}
            hueOffset={hueOffset}
            isMouseDown={isMouseDown}
          />
        </ElementWrapper>
      </div>
    </div>
  )
}
