import { NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const parsedUserId = z.string().uuid().safeParse(params.userId)
  if (!parsedUserId.success) {
    return NextResponse.json([], { status: 400 })
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

    return NextResponse.json(palettes)
  } catch (error) {
    console.error('Error fetching remote palettes', error)
    return NextResponse.json([], { status: 500 })
  }
}
