'use client'
import { useState } from 'react'
import generateTailwindColors from '../utils/generateTailwindColors'
import { writeFileLocaly } from '../actions/writeFileLocaly'

export default function OverwriteColorsBtn({
  pathToTwFile,
  baseHue,
  hueOffset,
  presetSL,
  colorSetNames,
}) {
  const [status, setStatus] = useState(null)

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
