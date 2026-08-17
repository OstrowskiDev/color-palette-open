'use client'

import { safeFetch, SafeFetchResult } from './safeFetch'

export async function deleteFromRemote(
  userId: string,
  paletteName: string,
): Promise<SafeFetchResult> {
  const url = `/api/palettes/${encodeURIComponent(userId)}/${encodeURIComponent(paletteName)}`

  return await safeFetch(url, { method: 'DELETE' })
}
