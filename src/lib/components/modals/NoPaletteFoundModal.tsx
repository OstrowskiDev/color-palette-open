import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'

export function NoPaletteFoundModal() {
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
      <p className="text-lg text-app-gray-100 ">
        Save created palettes using save button so they can be loaded here
        later.
      </p>
    </Modal>
  )
}
