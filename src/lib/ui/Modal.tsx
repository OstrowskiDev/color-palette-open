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
  const { state } = useColorSettings()
  const { openModal } = state
  if (openModal !== modalType) return null

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-app-gray-700 p-6 rounded-xl shadow-xl w-full max-w-md border border-app-gray-500">
        {title && (
          <h2 className="text-2xl font-semibold text-app-gray-100 mb-4">
            {title}
          </h2>
        )}
        <div>{children}</div>
        <div className="mt-4 flex justify-end gap-2">{footer}</div>
      </div>
    </div>
  )
}
