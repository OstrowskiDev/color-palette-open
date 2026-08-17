'use client'

import { Palette } from '@/types/palette'

export async function getPalettesFromDb(
  userId: string | null,
): Promise<Palette[] | []> {
  if (!userId) return []

  const url = `/api/palettes/${encodeURIComponent(userId)}`

  try {
    const res = await fetch(url, { method: 'GET', cache: 'no-store' })

    if (!res.ok) {
      return []
    }

    const json = await res.json()
    return json
  } catch (error) {
    console.error('Error during fetch request:', error)
    return []
  }
}
