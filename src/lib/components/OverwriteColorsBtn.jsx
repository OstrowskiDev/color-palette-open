'use client'
import { useState } from 'react'

export default function OverwriteColorsBtn({ colorsObject }) {
  const [status, setStatus] = useState(null)

  const handleClick = async () => {
    setStatus('Saving...')
    try {
      const res = await fetch('/api/write-test-colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ colorsObject }),
      })

      const data = await res.json()
      setStatus(data.message)
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
