import {
  getCurrentPallette,
  setPaletteStates,
} from '@/lib/actions/paletteStates'
import { getLocalPalettes } from '@/lib/actions/readLocaly'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'
import ModalCancelBtn from '@/lib/ui/ModalCancelBtn'
import { SelectField } from '@/lib/ui/SelectField'
import { Palette, PaletteOption } from '@/types/palette'
import { useEffect, useState } from 'react'
import { NoPaletteFoundModal } from './NoPaletteFoundModal'

export function LoadLocalModal() {
  const [localPalettes, setLocalPalettes] = useState<Palette[]>([])
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null)
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null)

  const { state, actions } = useColorSettings()
  const { setOpenModal } = actions

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

  if (localPalettes.length === 0) return <NoPaletteFoundModal />

  const palettesOptions: PaletteOption[] = localPalettes.map((palette) => ({
    value: palette,
    label: palette.id,
  }))

  if (currentPalette)
    palettesOptions.unshift({ label: 'current palette', value: currentPalette })

  function onCancel() {
    setPaletteStates(currentPalette!, actions)
    setOpenModal(null)
  }

  function onApplay() {
    setOpenModal(null)
  }

  return (
    <Modal
      title="Load palette"
      modalType="load-local"
      footer={
        <>
          <ModalCancelBtn action={onCancel} />
          <ModalApplyBtn action={onApplay} />
        </>
      }
    >
      <p className="text-lg text-app-gray-100 ">
        Select palette saved locally:
      </p>
      <SelectField
        options={palettesOptions}
        value={selectedPalette}
        setValue={setSelectedPalette}
        selectClasses="border-app-gray-400 text-app-gray-200 px-4 text-md"
        labelClasses="h-7 mt-1"
        optionsWidth="220px"
      />
    </Modal>
  )
}
