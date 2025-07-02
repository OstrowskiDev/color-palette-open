'use client'

import { safeFetch, SafeFetchResult } from './safeFetch'

export async function deleteFromRemote(
  userId: string,
  paletteName: string,
): Promise<SafeFetchResult> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const url = `${baseUrl}/api/palettes/${userId}/${paletteName}`

  return await safeFetch(url, { method: 'DELETE' })
}
