import React from 'react'

interface LabelProps {
  children: React.ReactNode
  tailwind?: string
}

export function Label({ children, tailwind = '' }: LabelProps) {
  return (
    <label className={`label text-app-font-strong ${tailwind}`}>
      {children}
    </label>
  )
}
