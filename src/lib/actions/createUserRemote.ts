'use server'

import prisma from '@/lib/prisma'
import { uuidSchema } from '../schemas/zodSchemas'

export async function ensureUserExists(userId: unknown) {
  const parsed = uuidSchema.safeParse(userId)
  if (!parsed.success) {
    return {
      success: false,
      message: `Error: failed to create user`,
    }
  }

  try {
    const id = parsed.data

    const existing = await prisma.user.findUnique({ where: { id } })

    if (existing) {
      return {
        success: true,
        message: `User "${id}" connected successfully.`,
      }
    }

    await prisma.user.create({ data: { id } })
    return {
      success: true,
      message: `New user id generated: ${id}. Store it if you want to  access your account between different browsers/machines.`,
    }
  } catch (error: any) {
    console.error('DB error in createUser:', error)

    return {
      success: false,
      message: `Error: failed to create user.`,
    }
  }
}
