import React from 'react'

interface LabelProps {
  children: React.ReactNode
  label?: string
  labelClasses?: string
  labelWidth?: string
}

export function Label({
  children,
  labelClasses = '',
  label,
  labelWidth = '56px',
}: LabelProps) {
  return (
    <label className={`label-container flex flex-row w-full`}>
      {label && (
        <span
          className={`label flex flex-row text-app-font-light mr-2 ${labelClasses}`}
          style={{ width: labelWidth }}
        >
          {`${label}:`}
        </span>
      )}
      {children}
    </label>
  )
}
