import {
  getCurrentPallette,
  setPaletteStates,
} from '@/lib/actions/paletteStates'
import { deleteRemote } from '@/lib/actions/deleteRemote'
import { getRemotePalettes } from '@/lib/actions/readRemote'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'
import ModalCancelBtn from '@/lib/ui/ModalCancelBtn'
import { SelectField } from '@/lib/ui/SelectField'
import { Palette, PaletteOption } from '@/types/palette'
import { useEffect, useState } from 'react'
import { MessageModal } from './MessageModal'

export function DeleteRemoteModal() {
  const { state, actions } = useColorSettings()
  const { setOpenModal, setShowAppLoader, setTerminalText } = actions

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [remotePalettes, setRemotePalettes] = useState<Palette[]>([])
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null)
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null)

  useEffect(() => {
    async function fetchPalettes() {
      setShowAppLoader(true)
      const results = await getRemotePalettes()
      results
        ? setRemotePalettes(results as unknown as Palette[])
        : setRemotePalettes([])
      setShowAppLoader(false)
      setIsLoading(false)
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
  if (isLoading) return null
  if (remotePalettes.length === 0) {
    return (
      <MessageModal
        title="No palettes found in DB"
        modalType="delete-remote"
        message="There are no palettes that could be deleted in your database. In case your sure that remote has palettes check your connection with database."
      />
    )
  }

  const palettesOptions: PaletteOption[] = remotePalettes.map((palette) => ({
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
    setShowAppLoader(true)
    const result = await deleteRemote(selectedPalette.id)
    setTerminalText((prev) => [...prev, result.message])
    const newData = await getRemotePalettes()
    newData
      ? setRemotePalettes(newData as unknown as Palette[])
      : setRemotePalettes([])
    setShowAppLoader(false)
  }

  function onApplay() {
    setPaletteStates(currentPalette!, actions)
    setOpenModal(null)
  }
  return (
    <Modal
      title="Delete palette"
      modalType="delete-remote"
      footer={<ModalCancelBtn label="Close" action={onApplay} />}
    >
      <p className="text-lg text-app-gray-100 ">Select palette saved localy:</p>
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
