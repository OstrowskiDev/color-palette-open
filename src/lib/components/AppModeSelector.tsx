import { useEffect } from 'react'
import { useColorSettings } from '../hooks/ColorSettingsContext'
import { appModeOptions } from '../schemas/selectOptions'
import { SelectField } from '../ui/SelectField'

export default function AppModeSelector() {
  const { state, actions } = useColorSettings()
  const { appMode } = state
  const { setAppMode, setTerminalText } = actions

  useEffect(() => {
    const message = `APP MODE SWITCHED TO ${appMode.toUpperCase()}`
    setTerminalText((prev) => [...prev, message])
  }, [appMode])

  return (
    <SelectField
      options={appModeOptions}
      value={appMode}
      setValue={setAppMode}
      label="App Mode"
      labelClasses="w-[80px] mr-1"
      optionsWidth="80px"
    />
  )
}
