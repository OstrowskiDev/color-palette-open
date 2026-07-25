import { useColorSettings } from '../hooks/ColorSettingsContext'
import Button from '../ui/Button'
import { getModaltype } from '../utils/helpers'
import AppModeSelector from './AppModeSelector'

export default function TopBar() {
  const { state, actions } = useColorSettings()
  const { appMode } = state
  const { setOpenModal } = actions
  const saveModal = getModaltype('save', appMode)
  const loadModal = getModaltype('load', appMode)
  const deleteModal = getModaltype('delete', appMode)
  return (
    <div className="app-top-bar flex flex-row h-[40px] mx-5 mt-2 mb-[2px]">
      <div className="app-logo w-56 relative bottom-2 flex flex-row">
        <span className="app-logo-text mr-2 uppercase font-semibold ">
          open palette
        </span>
        <p className="app-logo-text">dev tools</p>
      </div>
      <div className="toolbar relative flex flex-row w-full justify-end items-end z-10">
        <AppModeSelector />
        {/* prettier-ignore */}
        <Button 
          type="text" 
          label="save" 
          tailwind="ml-2"
          action={() => setOpenModal(saveModal)} 
        />
        {/* prettier-ignore */}
        <Button 
          type="text" 
          label="load" 
          action={() => setOpenModal(loadModal)} 
        />
        <Button
          type="text"
          label="delete"
          action={() => setOpenModal(deleteModal)}
        />
        <Button
          type="text"
          label="export"
          action={() => setOpenModal('export')}
        />
        <Button
          type="text"
          label="import"
          action={() => setOpenModal('import')}
        />
        {/* <Button
          type="text"
          label="settings"
          action={() => setOpenModal('settings')}
        /> */}
      </div>
    </div>
  )
}
