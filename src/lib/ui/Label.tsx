import React from 'react'

interface LabelProps {
  children: React.ReactNode
  label?: string
  labelWidth?: string
  labelClasses?: string
}

export function Label({
  children,
  labelClasses = '',
  label,
  labelWidth = '56px',
}: LabelProps) {
  return (
    <label className={`label-container flex flex-row ${labelClasses}`}>
      {label && (
        <span
          className={`label flex flex-row text-app-font-light`}
          style={{ width: labelWidth }}
        >
          {`${label}:`}
        </span>
      )}
      {children}
    </label>
  )
}
