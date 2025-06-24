import { useEffect } from 'react'

export function useKeyboardShortcut(
  callback: () => void,
  key: string,
  openModal: string | null,
) {
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const pressedKey = e.key // returnes caseSensitive string of pressed key
      const ctrlOrCmdPressed = e.ctrlKey || e.metaKey // returnes boolan, true when ctrl/cmd is pressed

      if (ctrlOrCmdPressed && pressedKey === key) {
        e.preventDefault()
        if (openModal !== null) return
        callback()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [callback, key, openModal])
}
