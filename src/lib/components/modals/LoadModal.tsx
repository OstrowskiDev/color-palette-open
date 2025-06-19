import {
  getCurrentPallette,
  setPaletteStates,
} from '@/lib/actions/paletteStates'
import { getLocalPalettes } from '@/lib/actions/readLocaly'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import { SelectField } from '@/lib/ui/SelectField'
import { Palette, PaletteOption } from '@/types/palette'
import { useEffect, useState } from 'react'

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

  if (!localPalettes) return //!!!! zwróć NoPaletteFoundModal

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

  //stwórz dwa osobne komponenty UI dla buttonów (apply/cancel)

  return (
    <Modal title="Load palette" modalType="load">
      <p className="text-lg text-app-gray-100 ">Select palette saved localy:</p>
      <div className="w-[300px] h-[200px]"></div>
      <SelectField
        options={palettesOptions}
        value={selectedPalette}
        setValue={setSelectedPalette}
        optionsWidth="240px"
      />
    </Modal>
  )
}
