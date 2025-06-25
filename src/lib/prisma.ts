import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

// below line makes sure that only one instance will be run on dev server
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
