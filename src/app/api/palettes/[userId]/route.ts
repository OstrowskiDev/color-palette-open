import { NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

type RouteContext = {
  params: Promise<{
    userId: string
  }>
}

export async function GET(request: Request, { params }: RouteContext) {
  const { userId: inputUserId } = await params
  const parsedUserId = z.string().uuid().safeParse(inputUserId)

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
