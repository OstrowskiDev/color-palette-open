import React from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  action: (e?: unknown) => void
  tailwind?: string
  label?: string
  successMessage?: string
  disabled?: boolean
}

export default function ModalApplyBtn({
  action,
  tailwind = '',
  label = 'Apply',
  successMessage,
  disabled = false,
}: ButtonProps) {
  const stateStyles = disabled
    ? 'text-app-gray-600 bg-app-gray-800 border-app-gray-600'
    : 'text-app-gray-200 bg-app-gray-600 border-app-gray-500 hover:bg-app-gray-500 hover:text-app-gray-50 hover:border-app-gray-300 cursor-pointer'
  return (
    <button
      type="button"
      className={`button copy-on-click relative ${twMerge(
        `flex justify-center h-8 px-4 mx-1 text-lg border font-semibold  rounded-md  ${stateStyles} ${tailwind}`,
      )}`}
      onClick={action}
      disabled={disabled}
    >
      <span className="flex items-center gap-2">{label}</span>
      {successMessage && (
        <span className="button-tooltip top-[-36px] right-[-36px]">
          {successMessage}
        </span>
      )}
    </button>
  )
}
