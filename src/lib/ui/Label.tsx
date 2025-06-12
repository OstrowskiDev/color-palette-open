import React from 'react'

interface LabelProps {
  children: React.ReactNode
  label?: string
  className?: string
  labelWidth?: string
}

export function Label({
  children,
  className = '',
  label,
  labelWidth = '56px',
}: LabelProps) {
  return (
    <label className={`label-container flex flex-row w-full`}>
      {label && (
        <span
          className={`label text-app-font-light mr-2 ${className}`}
          style={{ width: labelWidth }}
        >
          {`${label}:`}
        </span>
      )}
      {children}
    </label>
  )
}
