'use server'

import prisma from '@/lib/prisma'
import { paletteSchema, uuidSchema } from '../schemas/zodSchemas'

export async function saveRemote(inputPalette: unknown, inputUserId: unknown) {
  const parsedUserId = uuidSchema.safeParse(inputUserId)
  const parsedPalette = paletteSchema.safeParse(inputPalette)
  if (!parsedUserId.success || !parsedPalette.success) {
    return {
      success: false,
      message: `Error: failed to save palette to remote database.`,
    }
  }

  const userId = parsedUserId.data

  const palette = {
    name: parsedPalette.data.name,
    userId: userId,
    baseHue: parsedPalette.data.baseHue,
    hueOffset: parsedPalette.data.hueOffset,
    presetSL: parsedPalette.data.presetSL,
    colorSetNames: parsedPalette.data.colorSetNames,
  }

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
      message: `Palette "${palette.name}" saved to remote database.`,
    }
  } catch (error: any) {
    console.error('DB save error:', error)
    return {
      success: false,
      message: `Error: failed to save "${palette.name}" to remote database.`,
    }
  }
}
