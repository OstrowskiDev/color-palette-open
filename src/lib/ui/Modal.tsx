import { useEffect } from 'react'
import { useColorSettings } from '../hooks/ColorSettingsContext'

export default function Modal({
  title,
  children,
  footer,
  modalType,
}: {
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  modalType: string | null
}) {
  const { state, actions } = useColorSettings()
  const { openModal } = state
  const { setOpenModal } = actions

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenModal(null)
    }

    if (openModal !== modalType) return

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [openModal])
  console.log('🚀 ~ modalType:', modalType)
  console.log('🚀 ~ openModal:', openModal)
  // if (openModal !== modalType) return null

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center bg-app-gray-800 px-6 py-4 rounded-xl shadow-xl w-full max-w-md border border-app-gray-600">
        {title && (
          <h2 className="text-2xl font-semibold text-app-gray-100 mb-4">
            {title}
          </h2>
        )}
        {children}
        <div className="w-full mt-6 flex justify-end gap-1">{footer}</div>
      </div>
    </div>
  )
}
