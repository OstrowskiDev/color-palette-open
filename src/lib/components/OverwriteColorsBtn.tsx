'use client'
import { useState } from 'react'
import generateTailwindColors from '../utils/generateTailwindColors'
import { writeFileLocaly } from '../actions/writeFileLocaly'
import { useColorSettings } from '../hooks/ColorSettingsContext'

type OverwriteColorsBtnProps = {
  pathToTwFile: string
}

export default function OverwriteColorsBtn({
  pathToTwFile,
}: OverwriteColorsBtnProps) {
  const [status, setStatus] = useState<string | null>(' ')
  const { state, actions } = useColorSettings()
  const { baseHue, hueOffset, presetSL, colorSetNames } = state

  async function handleClick() {
    setStatus('Saving...')
    const colorsObject = generateTailwindColors(
      baseHue,
      hueOffset,
      presetSL,
      colorSetNames,
    )
    try {
      const results = await writeFileLocaly(colorsObject, pathToTwFile)
      setStatus(results.message)
    } catch (error) {
      console.error(error)
      setStatus('Ooops!')
    }
  }

  return (
    <div className="overwrite-tw-file-container absolute top-[90px] left-[90px]">
      <button
        className="apply-btn w-[120px] h-[120px] text-app-gray-200 bg-app-gray-700 border border-app-gray-700 rounded-full cursor-pointer hover:bg-app-gray-600 hover:text-app-gray-50 hover:border-app-gray-800 active:bg-app-gray-800 active:text-app-gray-500 active:border-app-gray-700 z-20"
        onClick={handleClick}
        style={{ ['--hue' as any]: baseHue }}
      >
        <div className="apply-btn-label-container flex flex-col">
          <span className="apply-btn-label uppercase font-semibold mb-1">
            Apply
          </span>
          <div className="separator w-[79px] h-[1px] mx-auto bg-app-gray-400"></div>
          <span className="apply-btn-info min-h-[26px]">{status}</span>
        </div>
      </button>
    </div>
  )
}
