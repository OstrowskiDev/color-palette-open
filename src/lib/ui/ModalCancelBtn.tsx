import React from 'react'

type ButtonProps = {
  action: () => void
  tailwind?: string
  label?: string
  successMessage?: string
}

export default function ModalCancelBtn({
  action,
  tailwind = '',
  label = 'Cancel',
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button flex justify-center h-8 px-4 mx-1 text-lg bg-transparent border border-app-gray-500 text-app-gray-400 font-semibold hover:bg-app-gray-100/10 hover:text-app-gray-200 hover:border-app-gray-300 rounded-md cursor-pointer ${tailwind}`}
      onClick={action}
    >
      <span className="flex items-center gap-2">{label}</span>
    </button>
  )
}
