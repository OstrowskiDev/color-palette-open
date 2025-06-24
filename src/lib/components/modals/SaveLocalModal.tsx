import { saveLocally } from '@/lib/actions/storeLocaly'
import { useColorSettings } from '@/lib/hooks/ColorSettingsContext'
import LabeledState from '@/lib/ui/LabeledState'
import Modal from '@/lib/ui/Modal'
import ModalApplyBtn from '@/lib/ui/ModalApplyBtn'
import ModalCancelBtn from '@/lib/ui/ModalCancelBtn'

export default function SaveLocalModal() {
  const { state, actions } = useColorSettings()
  //prettier-ignore
  const { baseHue, hueOffset, presetSL, paletteName, colorSetNames } = state
  const { setOpenModal } = actions
  const paletteOptions = state

  function onSave() {
    saveLocally(paletteOptions)
  }

  function onCancel() {
    setOpenModal(null)
  }

  return (
    <Modal
      title="Save palette locally"
      modalType="save-local"
      footer={
        <>
          <ModalCancelBtn label="Cancel" action={onCancel} />
          <ModalApplyBtn label="Save" action={onSave} />
        </>
      }
    >
      <div className="save-states-container flex flex-col w-full ">
        <p className="label text-left mt-2 mb-1 ">Palette data:</p>
        <div className="bg-app-gray-900 p-1 pl-2">
          <LabeledState label={'name:'} stateValue={paletteName} />
          <LabeledState label={'schema:'} stateValue={hueOffset.name} />
        </div>

        <p className="label text-left mt-2 mb-1 ">HSL values:</p>
        <div className="bg-app-gray-900 p-1 pl-2">
          <LabeledState label={'preset name:'} stateValue={presetSL.name} />
          <LabeledState label={'hue:'} stateValue={baseHue} />
          <LabeledState label={'saturation:'} stateValue={presetSL.sat} />
          <LabeledState
            label={'light values:'}
            stateValue={presetSL.lightRange.join(', ')}
            stateTailwind="w-[280px]"
          />
        </div>

        <p className="label text-left mt-2 mb-1 ">Tailwind color names:</p>
        <div className="bg-app-gray-900 p-1 pl-2">
          <LabeledState label={'primary:'} stateValue={colorSetNames[0]} />
          <LabeledState label={'secondary:'} stateValue={colorSetNames[1]} />
          <LabeledState label={'tertiary:'} stateValue={colorSetNames[2]} />
        </div>
      </div>
    </Modal>
  )
}

export type PresetSL = {
  name: string
  sat: number
  lightRange: number[]
}
