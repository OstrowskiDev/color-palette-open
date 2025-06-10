import React from 'react'

interface LabelProps {
  children: React.ReactNode
  label?: string
  className?: string
}

export function Label({ children, className = '', label }: LabelProps) {
  return (
    <label className={`label-container flex flex-row w-full`}>
      {label && (
        <span
          className={`label text-app-font-light w-14 mr-2 text-app-font-light ${className}`}
        >
          {`${label}:`}
        </span>
      )}
      {children}
    </label>
  )
}
