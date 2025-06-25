import { useColorSettings } from '../hooks/ColorSettingsContext'
import { appModeOptions } from '../schemas/selectOptions'
import Button from '../ui/Button'
import { SelectField } from '../ui/SelectField'

export default function TopBar() {
  const { state, actions } = useColorSettings()
  const { appMode } = state
  const { setAppMode, setOpenModal } = actions
  const saveModal = appMode === 'local' ? 'save-local' : 'save-remote'
  const loadModal = appMode === 'local' ? 'load-local' : 'load-remote'
  const deleteModal = appMode === 'local' ? 'delete-local' : 'delete-remote'
  return (
    <div className="app-top-bar flex flex-row h-[40px] mx-5 mt-2 mb-[2px]">
      <div className="app-logo w-56 relative bottom-2 flex flex-row">
        <span className="mr-1">dev</span>
        <p className="font-semibold">PALETTE TOOLS</p>
      </div>
      <div className="toolbar relative flex flex-row w-full justify-end items-end z-10">
        <SelectField
          options={appModeOptions}
          value={appMode}
          setValue={setAppMode}
          label="App Mode"
          labelClasses="w-[80px] mr-1"
          optionsWidth="80px"
        />
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
        <Button
          type="text"
          label="signin"
          action={() => setOpenModal('signin')}
        />
      </div>
    </div>
  )
}
