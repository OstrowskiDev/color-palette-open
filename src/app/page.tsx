'use client'

import ColorPalettes from '@/lib/components/ColorPalettes'
import ColorSelector from '@/lib/components/ColorSelector'
import ColorSettings from '@/lib/components/ColorSettings'
import ElementWrapper from '@/lib/components/ElementWrapper'
import InputField from '@/lib/components/InputField'
import ListenToResize from '@/lib/components/ListenToResize'
import { DeleteBrowserModal } from '@/lib/components/modals/DeleteBrowserModal'
import { DeleteLocalModal } from '@/lib/components/modals/DeleteLocalModal'
import { DeleteRemoteModal } from '@/lib/components/modals/DeleteRemoteModal'
import { ExportModal } from '@/lib/components/modals/ExportModal'
import { ImportModal } from '@/lib/components/modals/ImportModal'
import LoadBrowserModal from '@/lib/components/modals/LoadBrowserModal'
import LoadLocalModal from '@/lib/components/modals/LoadLocalModal'
import LoadRemoteModal from '@/lib/components/modals/LoadRemoteModal'
import SaveBrowserModal from '@/lib/components/modals/SaveBrowserModal'
import SaveLocalModal from '@/lib/components/modals/SaveLocalModal'
import SaveRemoteModal from '@/lib/components/modals/SaveRemoteModal'
import WelcomeModal from '@/lib/components/modals/WelcomeModal'
import OutputPreview from '@/lib/components/OutputPreview'
import Terminal from '@/lib/components/Terminal'
import TopBar from '@/lib/components/TopBar'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import { useKeyboardShortcut } from '@/lib/hooks/useKeyboardShortcut'
import { Loader } from '@/lib/ui/Loader'
import { getModaltype } from '@/lib/utils/helpers'
import { useState } from 'react'

export default function Home() {
  const { state, actions } = useColorSettings()
  const { openModal, appMode, showAppLoader, userId } = state
  const { setOpenModal } = actions
  const [pathToTwFile, setPathToTwFile] = useState<string>(
    'C:\\Tests\\colors.js',
  )
  const [trigger, _setTrigger] = useState<number>(0)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const saveModal = getModaltype('save', appMode)
  const loadModal = getModaltype('load', appMode)
  const deleteModal = getModaltype('delete', appMode)

  const isDemo = process.env.NEXT_PUBLIC_IS_DEMO
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
        <ElementWrapper label={'terminal'} tailwind={'h-[210px]'}>
          <Terminal />
        </ElementWrapper>
      </div>

      {!isDemo && openModal === 'save-local' && <SaveLocalModal />}
      {isDemo && openModal === 'save-browser' && <SaveBrowserModal />}
      {!isDemo && openModal === 'save-remote' && <SaveRemoteModal />}

      {!isDemo && openModal === 'load-local' && <LoadLocalModal />}
      {isDemo && openModal === 'load-browser' && <LoadBrowserModal />}
      {!isDemo && openModal === 'load-remote' && <LoadRemoteModal />}

      {!isDemo && openModal === 'delete-local' && <DeleteLocalModal />}
      {isDemo && openModal === 'delete-browser' && <DeleteBrowserModal />}
      {!isDemo && openModal === 'delete-remote' && <DeleteRemoteModal />}

      {!isDemo && openModal === 'export' && <ExportModal />}
      {!isDemo && openModal === 'import' && <ImportModal />}

      {!userId && <WelcomeModal />}

      {showAppLoader && <Loader />}
    </div>
  )
}
