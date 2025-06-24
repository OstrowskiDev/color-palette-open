import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'

export function NoPaletteForDeletionModal() {
  const { actions } = useColorSettings()
  const { setOpenModal } = actions

  function onApplay() {
    setOpenModal(null)
  }

  return (
    <Modal
      title="No palettes found"
      modalType="load"
      footer={
        <>
          <ModalApplyBtn label="Close" action={onApplay} />
        </>
      }
    >
      <p className="text-lg text-app-gray-100 ">There are no palettes saved.</p>
    </Modal>
  )
}
