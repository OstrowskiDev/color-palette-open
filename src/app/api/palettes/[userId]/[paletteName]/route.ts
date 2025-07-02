import { NextResponse } from 'next/server'
import { paletteSchema, uuidSchema } from '@/lib/schemas/zodSchemas'
import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function PUT(
  request: Request,
  { params }: { params: { userId: string; paletteName: string } },
) {
  const inputPalette = await request.json()
  const parsedUserId = uuidSchema.safeParse(params.userId)
  const parsedName = z
    .string()
    .trim()
    .min(1)
    .max(30)
    .safeParse(params.paletteName)
  const parsedPalette = paletteSchema.safeParse(inputPalette)
  if (!parsedUserId.success || !parsedPalette.success || !parsedName.success) {
    return NextResponse.json(
      {
        success: false,
        message: `Error: failed to save palette to remote database.`,
      },
      { status: 400 },
    )
  }

  const userId = parsedUserId.data
  const name = parsedName.data

  const palette = {
    name: name,
    userId: userId,
    baseHue: parsedPalette.data.baseHue,
    hueOffset: parsedPalette.data.hueOffset,
    presetSL: parsedPalette.data.presetSL,
    colorSetNames: parsedPalette.data.colorSetNames,
  }

  try {
    const existing = await prisma.palette.findUnique({
      where: {
        userId_name: { userId, name },
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
          name,
          baseHue: palette.baseHue,
          hueOffset: { connect: { name: palette.hueOffset.name } },
          presetSL: { connect: { name: palette.presetSL.name } },
          colorSetNames: palette.colorSetNames,
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: `Palette "${name}" saved to remote database.`,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('DB save error:', error)
    return NextResponse.json(
      {
        success: false,
        message: `Error: failed to save "${name}" to remote database.`,
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; paletteName: string } },
) {
  const parsedUserId = z.string().uuid().safeParse(params.userId)
  const parsedName = z.string().safeParse(params.paletteName)
  if (!parsedUserId.success || !parsedName.success) {
    return NextResponse.json(
      {
        success: false,
        message: `Error: failed to delete palette from remote database.`,
      },
      { status: 400 },
    )
  }

  const userId = parsedUserId.data
  const name = parsedName.data

  try {
    await prisma.palette.delete({
      where: {
        userId_name: { userId, name },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: `Palette "${name}" removed from remote database.`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting palette:', error)

    return NextResponse.json(
      {
        success: false,
        message: `Error: failed to delete "${name}" from remote database.`,
      },
      { status: 500 },
    )
  }
}
