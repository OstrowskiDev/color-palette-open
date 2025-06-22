import React from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps {
  children: React.ReactNode
  label?: string
  labelClasses?: string
}

export function Label({ children, labelClasses = '', label }: LabelProps) {
  return (
    <label className={`label-container flex flex-row`}>
      {label && (
        <span
          className={`label  ${twMerge(`flex flex-row w-[58px] text-app-font-light ${labelClasses}`)} `}
        >
          {`${label}:`}
        </span>
      )}
      {children}
    </label>
  )
}
