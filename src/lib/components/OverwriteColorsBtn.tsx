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
  const [status, setStatus] = useState<string | null>(null)
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
      setStatus('Error saving file')
    }
  }

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleClick}
      >
        Nadpisz testColors.js
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  )
}
