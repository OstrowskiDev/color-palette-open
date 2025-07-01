export function toKebabCase(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, '-')
}

export function getModaltype(
  type: 'save' | 'load' | 'delete',
  appMode: 'local' | 'remote',
) {
  const isDemo = process.env.NEXT_PUBLIC_IS_DEMO === 'true'

  if (type === 'save') {
    if (!isDemo && appMode === 'local') return 'save-local'
    if (isDemo && appMode === 'local') return 'save-browser'
    if (appMode === 'remote') return 'save-remote'
  }

  if (type === 'load') {
    if (!isDemo && appMode === 'local') return 'load-local'
    if (isDemo && appMode === 'local') return 'load-browser'
    if (appMode === 'remote') return 'load-remote'
  }

  if (type === 'delete') {
    if (!isDemo && appMode === 'local') return 'delete-local'
    if (isDemo && appMode === 'local') return 'delete-browser'
    if (appMode === 'remote') return 'delete-remote'
  }
  return null
}
