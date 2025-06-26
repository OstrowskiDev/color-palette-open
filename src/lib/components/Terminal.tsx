'use client'

import { useEffect, useRef } from 'react'
import { useColorSettings } from '../hooks/ColorSettingsContext'

export default function Terminal() {
  const { state } = useColorSettings()
  const { terminalText } = state

  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalText])

  return (
    <div
      ref={terminalRef}
      className="terminal-conatiner w-[460px] h-[172px] px-4 py-1 bg-app-gray-900 text-app-font-light font-mono text-sm text-left overflow-y-auto"
    >
      {terminalText.map((text, i) => (
        <div key={i}>{text}</div>
      ))}
    </div>
  )
}
