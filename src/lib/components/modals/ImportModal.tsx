import {
  getCurrentPallette,
  setPaletteStates,
} from '@/lib/actions/paletteStates'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'
import ModalCancelBtn from '@/lib/ui/ModalCancelBtn'
import { Palette } from '@/types/palette'
import { useEffect, useRef, useState } from 'react'
import { validatePaletteString } from '@/security/validatePalette'

export function ImportModal() {
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null)
  const [importedString, setImportedString] = useState<string>('')
  const [importedPalette, setImportedPalette] = useState<Palette | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { state, actions } = useColorSettings()
  const { setOpenModal } = actions

  useEffect(() => {
    const paletteData = getCurrentPallette(state)
    setCurrentPalette(paletteData)
  }, [])

  useEffect(() => {
    validateInput()

    async function validateInput() {
      if (!importedString) return
      const result = await validatePaletteString(importedString)
      if (result.success) setImportedPalette(result.data!)
    }
  }, [importedString])

  function onCancel() {
    setPaletteStates(currentPalette!, actions)
    setOpenModal(null)
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const paletteString = await readJsonFile(file)
      const result = await validatePaletteString(paletteString)
      if (result.success) {
        setImportedPalette(result.data)
        const string = JSON.stringify(result.data, null, 3)
        setImportedString(string)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  async function readJsonFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Invalid file content'))
        }
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })
  }

  async function onImport() {
    if (!importedPalette) return
    setPaletteStates(importedPalette, actions)
    setOpenModal(null)
  }

  const disableImport = importedPalette ? false : true
  console.log('🚀 ~ ImportModal ~ disableImport:', disableImport)

  return (
    <Modal
      title="Import palette"
      modalType="import"
      footer={
        <>
          <ModalCancelBtn label="Cancel" action={onCancel} />
          <ModalApplyBtn
            label="Import"
            action={onImport}
            disabled={disableImport}
          />
        </>
      }
    >
      <h3 className="import-label w-full ml-4 mt-4 mb-1 text-left text-app-font-strong">
        Import palette using one of the methods below:
      </h3>

      <p className="import-from-string-label w-full ml-4 mt-4 mb-1 text-left text-app-font-strong">
        Paste JSON code below:
      </p>

      <textarea
        className="input-field w-[380px] h-[200px] text-app-font-light bg-app-gray-900 border border-app-gray-600 text-[15px]"
        value={importedString}
        onChange={(e) => setImportedString(e.target.value)}
      />

      <p className="import-from-file-label w-full ml-4 mt-4 mb-1 text-left text-app-font-strong">
        Or upload JSON file:
      </p>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleUpload}
      />
      <ModalApplyBtn
        label="Upload"
        action={() => fileInputRef.current?.click()}
        tailwind="w-full"
      />
    </Modal>
  )
}
