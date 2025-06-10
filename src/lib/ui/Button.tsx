import React from 'react'

type ButtonProps = {
  action: () => void
  tailwind?: string
  icon?: React.ReactNode
  label?: string
  type: 'icon' | 'text' | 'icon+text'
}

export default function Button({
  action,
  tailwind = '',
  icon,
  label,
  type,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button flex justify-center h-6 px-1 mx-1 text-sm border border-app-gray-600 text-app-font-light hover:text-app-font-strong active:bg-app-gray-700 rounded-md cursor-pointer ${tailwind}`}
      onClick={action}
    >
      {type === 'icon' && icon}
      {type === 'text' && label}
      {type === 'icon+text' && (
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
      )}
    </button>
  )
}
