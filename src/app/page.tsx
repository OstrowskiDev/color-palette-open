'use client'

import ColorPalettes from '@/lib/components/ColorPalettes'
import ColorSelector from '@/lib/components/ColorSelector'
import ColorSettings from '@/lib/components/ColorSettings'
import ElementWrapper from '@/lib/components/ElementWrapper'
import InputField from '@/lib/components/InputField'
import ListenToResize from '@/lib/components/ListenToResize'
import { DeleteLocalModal } from '@/lib/components/modals/DeleteLocalModal'
import { DeleteRemoteModal } from '@/lib/components/modals/DeleteRemoteModal'
import { ExportModal } from '@/lib/components/modals/ExportModal'
import { ImportModal } from '@/lib/components/modals/ImportModal'
import LoadLocalModal from '@/lib/components/modals/LoadLocalModal'
import LoadRemoteModal from '@/lib/components/modals/LoadRemoteModal'
import SaveLocalModal from '@/lib/components/modals/SaveLocalModal'
import SaveRemoteModal from '@/lib/components/modals/SaveRemoteModal'
import OutputPreview from '@/lib/components/OutputPreview'
import TopBar from '@/lib/components/TopBar'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import { useKeyboardShortcut } from '@/lib/hooks/useKeyboardShortcut'
import { Loader } from '@/lib/ui/Loader'
import { useState } from 'react'

export default function Home() {
  const { state, actions } = useColorSettings()
  const { openModal, appMode, showAppLoader } = state
  const { setOpenModal } = actions
  const [pathToTwFile, setPathToTwFile] = useState<string>(
    'C:\\Tests\\colors.js',
  )
  const [trigger, setTrigger] = useState<number>(0)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const saveModal = appMode === 'local' ? 'save-local' : 'save-remote'
  const loadModal = appMode === 'local' ? 'load-local' : 'load-remote'
  const deleteModal = appMode === 'local' ? 'delete-local' : 'delete-remote'

  useKeyboardShortcut(() => setOpenModal(saveModal), 's', openModal)
  useKeyboardShortcut(() => setOpenModal(loadModal), 'o', openModal)
  useKeyboardShortcut(() => setOpenModal(deleteModal), 'Delete', openModal)
  useKeyboardShortcut(() => setOpenModal(deleteModal), 'd', openModal)
  useKeyboardShortcut(() => setOpenModal('import'), 'i', openModal)
  useKeyboardShortcut(() => setOpenModal('export'), 'e', openModal)

  function handleMouseDown() {
    setIsMouseDown(true)
  }
  function handleMouseUp() {
    setIsMouseDown(false)
  }

  return (
    <div
      className="app-wrapper h-[780x] w-[540px] mx-auto flex flex-col justify-center text-white text-center overflow-hidden bg-app-background-secondary"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <ListenToResize trigger={trigger} />
      <TopBar />
      <div className="main-app-container select-none flex flex-col flex-wrap h-[740px] px-5 gap-x-5">
        <ElementWrapper label={'color settings'} tailwind={'h-[480px]'}>
          <ColorSettings />
          <ColorSelector
            isMouseDown={isMouseDown}
            pathToTwFile={pathToTwFile}
          />
          <InputField
            value={pathToTwFile}
            setValue={setPathToTwFile}
            label="path to file"
            type="text"
            inputTailwind="w-[260px]"
            labelClasses="w-[90px] ml-6"
          />
        </ElementWrapper>
        <ElementWrapper label={'tailwind palettes'} tailwind={'h-[210px]'}>
          <ColorPalettes />
        </ElementWrapper>
        <ElementWrapper label={'output'} tailwind={'h-[480px]'}>
          <OutputPreview />
        </ElementWrapper>
        <ElementWrapper label={'tests'} tailwind={'h-[210px]'}>
          <div>
            <div className="w-20 h-20 bg-primary-500 border border-amber-100"></div>
          </div>
        </ElementWrapper>
      </div>
      {openModal === 'save-local' && <SaveLocalModal />}
      {openModal === 'save-remote' && <SaveRemoteModal />}
      {openModal === 'load-local' && <LoadLocalModal />}
      {openModal === 'load-remote' && <LoadRemoteModal />}
      {openModal === 'delete-local' && <DeleteLocalModal />}
      {openModal === 'delete-remote' && <DeleteRemoteModal />}
      {openModal === 'export' && <ExportModal />}
      {openModal === 'import' && <ImportModal />}

      {showAppLoader && <Loader />}
    </div>
  )
}
