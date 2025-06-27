import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'

type MessageModalProps = {
  title: string
  modalType: string
  message: string
  closeLabel?: string
}

export function MessageModal({
  title,
  modalType,
  message,
  closeLabel = 'Close',
}: MessageModalProps) {
  const { actions } = useColorSettings()
  const { setOpenModal } = actions

  function onApply() {
    setOpenModal(null)
  }

  return (
    <Modal
      title={title}
      modalType={modalType}
      footer={
        <>
          <ModalApplyBtn label={closeLabel} action={onApply} />
        </>
      }
    >
      <p className="text-lg text-app-gray-100">{message}</p>
    </Modal>
  )
}
