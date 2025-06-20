import React from 'react'

type ButtonProps = {
  action: () => void
  tailwind?: string
  label?: string
  successMessage?: string
}

export default function ModalApplyBtn({
  action,
  tailwind = '',
  label = 'Apply',
  successMessage,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button flex justify-center h-8 px-4 mx-1 text-lg bg-app-gray-600 border border-app-gray-500 font-semibold text-app-gray-200 hover:bg-app-gray-500 hover:text-app-gray-50 hover:border-app-gray-300 rounded-md cursor-pointer ${tailwind}`}
      onClick={action}
    >
      <span className="flex items-center gap-2">{label}</span>
      {successMessage && (
        <span className="button-tooltip bottom-8 left-6">{successMessage}</span>
      )}
    </button>
  )
}
