'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function deleteRemote(inputName: unknown, inputUserId: unknown) {
  const parsedUserId = z.string().uuid().safeParse(inputUserId)
  const parsedName = z.string().safeParse(inputName)
  if (!parsedUserId.success || !parsedName.success) {
    return {
      success: false,
      message: `Error: failed to delete palette from remote database.`,
    }
  }

  const userId = parsedUserId.data
  const name = parsedName.data

  try {
    await prisma.palette.delete({
      where: {
        userId_name: { userId, name },
      },
    })

    return {
      success: true,
      message: `Palette "${name}" removed from remote database.`,
    }
  } catch (error) {
    console.error('Error deleting palette:', error)
    return {
      success: false,
      message: `Error: failed to delete "${name}" from remote database.`,
    }
  }
}
