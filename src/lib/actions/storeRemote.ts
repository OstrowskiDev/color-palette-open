'use server'

import prisma from '@/lib/prisma'
import { paletteRemoteSchema } from '../schemas/zodSchemas'

export async function saveRemote(paletteOptions: any, userId: any) {
  const paletteObject = {
    name: paletteOptions.paletteName,
    userId: userId,
    baseHue: paletteOptions.baseHue,
    hueOffset: paletteOptions.hueOffset,
    presetSL: paletteOptions.presetSL,
    colorSetNames: paletteOptions.colorSetNames,
  }
  const parsed = paletteRemoteSchema.safeParse(paletteObject)
  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid data',
      errors: parsed.error.format(),
    }
  }
  const palette = parsed.data

  try {
    const existing = await prisma.palette.findUnique({
      where: {
        userId_name: { userId, name: palette.name },
      },
    })

    if (existing) {
      await prisma.palette.update({
        where: { id: existing.id },
        data: {
          baseHue: palette.baseHue,
          hueOffset: { connect: { name: palette.hueOffset.name } },
          presetSL: { connect: { name: palette.presetSL.name } },
          colorSetNames: palette.colorSetNames,
        },
      })
    } else {
      await prisma.palette.create({
        data: {
          id: crypto.randomUUID(),
          user: { connect: { id: userId } },
          name: palette.name,
          baseHue: palette.baseHue,
          hueOffset: { connect: { name: palette.hueOffset.name } },
          presetSL: { connect: { name: palette.presetSL.name } },
          colorSetNames: palette.colorSetNames,
        },
      })
    }

    return {
      success: true,
      message: `palette "${paletteOptions.paletteName}" saved to remote database`,
    }
  } catch (error: any) {
    console.error('DB save error:', error)
    return {
      success: false,
      message: `failed to save "${paletteOptions.paletteName}" to remote database`,
    }
  }
}
