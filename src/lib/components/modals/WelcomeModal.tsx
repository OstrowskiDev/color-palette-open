import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import { isUUID } from '@/lib/schemas/zodSchemas'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'
import { useEffect, useState } from 'react'

export default function WelcomeModal() {
  const { state, actions } = useColorSettings()
  const { openModal } = state
  const { setUserId, setTerminalText, setOpenModal } = actions
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    let id = localStorage.getItem('userId')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('userId', id)
      const message = `New user id generated: ${id}. Store it if you want to have access to your account between different browsers/machines.`
      setTerminalText((prev) => [...prev, message])
    }
    setInputValue(id)
  }, [])

  function onApply() {
    localStorage.setItem('userId', inputValue)
    setUserId(inputValue)
    setOpenModal(null)
  }

  const inputIsUuid = isUUID(inputValue)

  return (
    <Modal
      title="Welcome to Open Palette Dev Tools!"
      modalType={openModal}
      footer={
        <>
          <ModalApplyBtn
            label="Save user id"
            action={onApply}
            disabled={!inputIsUuid}
          />
        </>
      }
    >
      <h3 className="welcome-label w-full ml-4 mt-4 mb-1 text-left text-app-font-strong">
        This is first time you opened Open Palette Dev Tools on this browser!
      </h3>

      <p className="welcome-info w-full ml-4 mt-4 mb-3 text-left text-app-font-strong">
        Your user id has been generated, copy and save it to use same account
        between different browsers and machines.
      </p>

      <input
        className="user-id-input px-2 py-1 rounded-lg w-full bg-app-gray-900 border border-app-gray-600"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {!inputIsUuid && inputValue && (
        <p className="ml-4 mt-1 text-red-500 text-sm">Invalid UUID format</p>
      )}

      <p className="welcome-from-label w-full ml-4 mt-4 mb-1 text-left text-app-font-strong">
        If you already have account and want to use it, paste your user id
        above:
      </p>
    </Modal>
  )
}
