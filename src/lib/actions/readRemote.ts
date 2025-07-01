'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function getRemotePalettes(inputUserId: unknown) {
  const parsedUserId = z.string().uuid().safeParse(inputUserId)
  if (!parsedUserId.success) {
    return null
  }

  const userId = parsedUserId.data

  try {
    const palettes = await prisma.palette.findMany({
      where: { userId },
      include: {
        hueOffset: true,
        presetSL: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return palettes
  } catch (error) {
    console.error('Error fetching remote palettes', error)
    return null
  }
}
