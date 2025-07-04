import {
  getCurrentPallette,
  setPaletteStates,
} from '@/lib/actions/paletteStates'
import { getLocalPalettes } from '@/lib/actions/readLocally'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'
import { SelectField } from '@/lib/ui/SelectField'
import { Palette, PaletteOption } from '@/types/palette'
import { useEffect, useState } from 'react'
import ModalCancelBtn from '@/lib/ui/ModalCancelBtn'
import { deleteLocally } from '@/lib/actions/deleteLocally'
import { MessageModal } from './MessageModal'

export function DeleteLocalModal() {
  const { state, actions } = useColorSettings()
  const { setOpenModal, setTerminalText } = actions

  const [localPalettes, setLocalPalettes] = useState<Palette[]>([])
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null)
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null)

  useEffect(() => {
    async function fetchPalettes() {
      const results = await getLocalPalettes()
      setLocalPalettes(results)
    }
    fetchPalettes()
  }, [])

  useEffect(() => {
    const paletteData = getCurrentPallette(state)
    setCurrentPalette(paletteData)
  }, [])

  useEffect(() => {
    if (selectedPalette) setPaletteStates(selectedPalette, actions)
  }, [selectedPalette])

  if (localPalettes.length === 0) {
    return (
      <MessageModal
        title="No palettes found locally"
        modalType="delete-local"
        message="There are no palettes that could be deleted. If you have saved palettes locally make sure that palettes.json is inside src/data/ dir."
      />
    )
  }

  const palettesOptions: PaletteOption[] = localPalettes.map((palette) => ({
    value: palette,
    label: palette.id,
  }))

  if (currentPalette)
    palettesOptions.unshift({
      value: '',
      label: '',
      hidden: true,
    })

  async function onDelete() {
    if (!selectedPalette) return
    const result = await deleteLocally(selectedPalette.id)
    setTerminalText((prev) => [...prev, result.message])
    const newData = await getLocalPalettes()
    setLocalPalettes(newData)
  }

  function onClose() {
    setPaletteStates(currentPalette!, actions)
    setOpenModal(null)
  }

  return (
    <Modal
      title="Delete palette"
      modalType="delete-local"
      footer={<ModalCancelBtn label="Close" action={onClose} />}
    >
      <p className="text-lg text-app-gray-100 ">
        Select palette saved locally:
      </p>
      <div className="modal-content flex flex-row items-center mt-2">
        <SelectField
          options={palettesOptions}
          value={selectedPalette}
          setValue={setSelectedPalette}
          selectClasses="border-app-gray-400 text-app-gray-200 px-4 text-md"
          labelClasses="h-7"
          optionsWidth="220px"
        />
        <ModalApplyBtn tailwind="h-7 ml-3" label="Delete" action={onDelete} />
      </div>
    </Modal>
  )
}
