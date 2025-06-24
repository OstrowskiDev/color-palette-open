import { getCurrentPallette } from '@/lib/actions/paletteStates'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'
import { Palette } from '@/types/palette'
import { useEffect, useState } from 'react'

export function ExportModal() {
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null)

  const { state, actions } = useColorSettings()
  const { setOpenModal } = actions

  useEffect(() => {
    const paletteData = getCurrentPallette(state)
    setCurrentPalette(paletteData)
  }, [])

  function onClose() {
    setOpenModal(null)
  }

  function onDownload() {
    if (!currentPalette) return

    const json = JSON.stringify(currentPalette, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${currentPalette.id}.json`
    anchor.click()

    URL.revokeObjectURL(url) // cleanup
  }

  function onCopy() {
    navigator.clipboard.writeText(JSON.stringify(currentPalette, null, 2))
  }

  return (
    <Modal
      title="Export palette"
      modalType="export"
      footer={
        <>
          <ModalApplyBtn label="Close" action={onClose} />
        </>
      }
    >
      <h3 className="export-preview-label w-full ml-4 mt-4 mb-1 text-left text-app-font-strong">
        Exported code preview:
      </h3>
      <pre className="export-preview px-4 py-2 mx-4 mb-4 text-left text-app-font-strong bg-app-gray-900 overflow-auto w-[380px] h-[230px] select-text">
        <code>{JSON.stringify(currentPalette, null, 3)}</code>
      </pre>
      <div className="export-options-container flex flex-row">
        <ModalApplyBtn
          label="Download JSON"
          action={onDownload}
          tailwind="w-44"
        />
        <ModalApplyBtn
          label="Copy to Clipboard"
          action={onCopy}
          tailwind="w-48"
          successMessage="copied!"
        />
      </div>
    </Modal>
  )
}
