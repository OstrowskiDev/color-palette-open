'use server'

import prisma from '@/lib/prisma'

export async function getRemotePalettes() {
  try {
    const palettes = await prisma.palette.findMany({
      include: {
        hueOffset: true,
        presetSL: true,
      },
      orderBy: {
        id: 'asc',
      },
    })

    return palettes
  } catch (error) {
    console.error('Error fetching remote palettes', error)
    return null
  }
}
