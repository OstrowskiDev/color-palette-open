'use client'

import { Palette } from '@/types/palette'
import { safeFetch, SafeFetchResult } from './safeFetch'

export async function storeInRemote(
  userId: string,
  paletteName: string,
  palette: Palette,
): Promise<SafeFetchResult> {
  const url = `/api/palettes/${encodeURIComponent(userId)}/${encodeURIComponent(paletteName)}`

  return await safeFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(palette),
  })
}
