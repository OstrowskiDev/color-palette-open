'use client'

import ColorPalettes from '@/lib/components/ColorPalettes'
import ColorSelector from '@/lib/components/ColorSelector'
import ColorSettings from '@/lib/components/ColorSettings'
import ElementWrapper from '@/lib/components/ElementWrapper'
import InputField from '@/lib/components/InputField'
import ListenToResize from '@/lib/components/ListenToResize'
import { LoadLocalModal } from '@/lib/components/modals/LoadModal'
import OutputPreview from '@/lib/components/OutputPreview'
import OverwriteColorsBtn from '@/lib/components/OverwriteColorsBtn'
import TopBar from '@/lib/components/TopBar'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import { useState } from 'react'

export default function Home() {
  const { state } = useColorSettings()
  const { openModal } = state
  const [pathToTwFile, setPathToTwFile] = useState<string>(
    'C:\\Tests\\colors.js',
  )
  const [trigger, setTrigger] = useState<number>(0)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  function handleMouseDown() {
    setIsMouseDown(true)
  }
  function handleMouseUp() {
    setIsMouseDown(false)
  }

  return (
    <div
      className="app-wrapper h-[95vh] w-[540px] mx-auto flex flex-col justify-center text-white text-center overflow-hidden bg-app-background-secondary"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <ListenToResize trigger={trigger} />
      <TopBar />
      <div className="main-app-container select-none flex flex-col flex-wrap h-[90vh] px-5 gap-x-5">
        <ElementWrapper label={'color settings'} tailwind={'h-[480px]'}>
          <ColorSettings />
          <ColorSelector isMouseDown={isMouseDown} />
          <InputField
            value={pathToTwFile}
            setValue={setPathToTwFile}
            label="path to file"
            type="text"
            labelWidth="90px"
            inputWidth="260px"
            labelClasses="ml-6"
          />
        </ElementWrapper>
        <ElementWrapper label={'tailwind palettes'} tailwind={'h-[180px]'}>
          <ColorPalettes />
        </ElementWrapper>
        <ElementWrapper label={'output'} tailwind={'h-[480px]'}>
          <OutputPreview />
        </ElementWrapper>
        <ElementWrapper label={'tests'} tailwind={'h-[180px]'}>
          <div>
            <div className="w-20 h-20 bg-primary-500 border border-amber-100"></div>
            <OverwriteColorsBtn pathToTwFile={pathToTwFile} />
          </div>
        </ElementWrapper>
      </div>
      {openModal === 'load' && <LoadLocalModal />}
      {/* {openModal === 'delete' && <DeleteModal />} */}
      {/* {openModal === 'export' && <ExportModal />} */}
      {/* {openModal === 'import' && <ImportModal />} */}
      {/* {openModal === 'signin' && <SigninModal />} */}
    </div>
  )
}
