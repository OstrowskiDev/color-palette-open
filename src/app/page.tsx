'use client'

import ColorSelector from '@/lib/components/ColorSelector'
import { ColorHSL } from '@/lib/utils/hue'
import { HueOffset } from '@/lib/utils/position'
import { useEffect, useState } from 'react'

export default function Home() {
  const [color, setColor] = useState<ColorHSL>([0, 50, 50])
  // const [contrast, setContrast] = useState(80)
  const [hueOffset, setHueOffset] = useState<HueOffset>({
    name: 'monochrome',
    angle: 0,
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
        <ColorSelector
          color={color}
          setColor={setColor}
          hueOffset={hueOffset}
          isMouseDown={isMouseDown}
        />
      </div>
    </div>
  )
}
