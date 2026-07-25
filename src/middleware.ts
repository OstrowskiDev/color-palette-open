import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { RateLimiterMemory } from 'rate-limiter-flexible'
import { getFormattedTimestamp } from './lib/utils/helpers'

const getLimiter = new RateLimiterMemory({
  points: 10,
  duration: 10,
})

const putLimiter = new RateLimiterMemory({
  points: 3,
  duration: 10,
})

const deleteLimiter = new RateLimiterMemory({
  points: 5,
  duration: 10,
})

// Global API protection from flood at 200 / minute
const globalFloodLimiter = new RateLimiterMemory({
  points: 200,
  duration: 60,
})

function getClientIP(request: NextRequest): string {
  // Cloudflare adds client's IP to its header
  const cfConnectingIp = request.headers.get('cf-connecting-ip')

  // Standard forwarded header
  const forwarded = request.headers.get('x-forwarded-for')
  const forwardedIp = forwarded ? forwarded.split(',')[0].trim() : null

  // Nginx can add its IP to X-Forwarded-For
  const realIp = request.headers.get('x-real-ip')

  // Priority order for Cloudflare + Nginx setup
  return cfConnectingIp || forwardedIp || realIp || '127.0.0.1'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method
  const ip = getClientIP(request)
  const timestamp = getFormattedTimestamp()

  // 1. /api/palettes/ GET protection based on IP
  if (ip) {
    if (pathname.startsWith('/api/palettes/') && method === 'GET') {
      try {
        const res = await getLimiter.consume(ip)
        console.log(
          `[${timestamp}] [API GET] ${ip} - Remaining: ${res.remainingPoints}`,
        )
      } catch {
        return new NextResponse('Too many API requests', { status: 429 })
      }
    }
  }

  // 2. /api/palettes/ PUT protection based on IP
  if (ip) {
    if (pathname.startsWith('/api/palettes/') && method === 'PUT') {
      try {
        const res = await putLimiter.consume(ip)
        console.log(
          `[${timestamp}] [API PUT] ${ip} - Remaining: ${res.remainingPoints}`,
        )
      } catch {
        return new NextResponse('Too many API requests', { status: 429 })
      }
    }
  }

  // 3 /api/palettes/ DELETE protection based on IP
  if (ip) {
    if (pathname.startsWith('/api/palettes/') && method === 'DELETE') {
      try {
        const res = await deleteLimiter.consume(ip)
        console.log(
          `[${timestamp}] [API DELETE] ${ip} - Remaining: ${res.remainingPoints}`,
        )
      } catch {
        return new NextResponse('Too many API requests', { status: 429 })
      }
    }
  }

  // 4. Global API protection from flood
  try {
    const res = await globalFloodLimiter.consume('global')
    console.log(
      `[${timestamp}] [Global limit] Remaining: ${res.remainingPoints}`,
    )
  } catch {
    return new NextResponse('Too many requests', {
      status: 429,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
