'use server'

import prisma from '@/lib/prisma'

export async function deleteRemote(paletteObjectId: string) {
  try {
    await prisma.palette.delete({
      where: { id: paletteObjectId },
    })

    return {
      success: true,
      message: `palette "${paletteObjectId}" removed from remote database`,
    }
  } catch (error) {
    console.error('Error deleting palette:', error)
    return {
      success: false,
      message: `failed to delete "${paletteObjectId}" from remote database`,
    }
  }
}
