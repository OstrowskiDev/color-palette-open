'use server'

import prisma from '@/lib/prisma'
import { paletteSchema } from '../schemas/zodSchemas'
import { success } from 'zod/v4'

export async function saveRemote(paletteOptions: any) {
  const paletteObject = {
    id: paletteOptions.paletteName,
    baseHue: paletteOptions.baseHue,
    hueOffset: paletteOptions.hueOffset,
    presetSL: paletteOptions.presetSL,
    colorSetNames: paletteOptions.colorSetNames,
  }
  const parsed = paletteSchema.safeParse(paletteObject)
  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid data',
      errors: parsed.error.format(),
    }
  }
  const palette = parsed.data

  try {
    const response = await prisma.palette.upsert({
      where: { id: palette.id },
      update: {
        baseHue: palette.baseHue,
        hueOffset: { connect: { name: palette.hueOffset.name } },
        presetSL: { connect: { name: palette.presetSL.name } },
        colorSetNames: palette.colorSetNames,
      },
      create: {
        id: palette.id,
        baseHue: palette.baseHue,
        hueOffset: { connect: { name: palette.hueOffset.name } },
        presetSL: { connect: { name: palette.presetSL.name } },
        colorSetNames: palette.colorSetNames,
      },
    })

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
