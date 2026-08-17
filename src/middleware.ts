import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { getFormattedTimestamp } from './lib/utils/helpers'

const ipLimiter = new RateLimiterMemory({
  points: 15,
  duration: 60,
})

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

function buildRequestContext(
  request: NextRequest,
  extra: Record<string, string | number | null | undefined> = {},
) {
  const path = `${request.nextUrl.pathname}${request.nextUrl.search}`

  return {
    ts: getFormattedTimestamp(),
    method: request.method,
    path,
    ip: getClientIP(request),
    host: request.headers.get('host') ?? '-',
    country: request.headers.get('cf-ipcountry') ?? '-',
    userAgent: request.headers.get('user-agent') ?? '-',
    referer: request.headers.get('referer') ?? '-',
    forwardedFor: request.headers.get('x-forwarded-for') ?? '-',
    realIp: request.headers.get('x-real-ip') ?? '-',
    cfRay: request.headers.get('cf-ray') ?? '-',
    ...extra,
  }
}

function logStructured(
  level: 'info' | 'warn' | 'error',
  event: string,
  request: NextRequest,
  extra: Record<string, string | number | null | undefined> = {},
) {
  console.log(
    JSON.stringify({
      level,
      event,
      ...buildRequestContext(request, extra),
    }),
  )
}

async function consumeWithLogging({
  request,
  limiter,
  key,
  label,
  route,
}: {
  request: NextRequest
  limiter: RateLimiterMemory
  key: string
  label: string
  route: string
}) {
  try {
    const res = await limiter.consume(key)

    logStructured('info', 'api.rate_limit', request, {
      route,
      limiter: label,
      remainingPoints: res.remainingPoints,
      outcome: 'allowed',
      status: 200,
    })

    return true
  } catch {
    logStructured('warn', 'api.rate_limit', request, {
      route,
      limiter: label,
      remainingPoints: 0,
      outcome: 'blocked',
      status: 429,
      reason: 'too_many_requests',
    })

    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method
  const ip = getClientIP(request)

  if (pathname.startsWith('/api/palettes/')) {
    logStructured('info', 'api.request', request, {
      route: 'api.palettes',
      outcome: 'checked',
      status: 200,
    })

    if (ip) {
      const allowed = await consumeWithLogging({
        request,
        limiter: ipLimiter,
        key: ip,
        label: 'IP',
        route: 'api.palettes',
      })

      if (!allowed) {
        return new NextResponse('Too many API requests', { status: 429 })
      }
    }
  }

  // 1. /api/palettes/ GET protection based on IP
  if (ip) {
    if (pathname.startsWith('/api/palettes/') && method === 'GET') {
      const allowed = await consumeWithLogging({
        request,
        limiter: getLimiter,
        key: ip,
        label: 'GET',
        route: 'api.palettes',
      })

      if (!allowed) {
        return new NextResponse('Too many API requests', { status: 429 })
      }
    }
  }

  // 2. /api/palettes/ PUT protection based on IP
  if (ip) {
    if (pathname.startsWith('/api/palettes/') && method === 'PUT') {
      const allowed = await consumeWithLogging({
        request,
        limiter: putLimiter,
        key: ip,
        label: 'PUT',
        route: 'api.palettes',
      })

      if (!allowed) {
        return new NextResponse('Too many API requests', { status: 429 })
      }
    }
  }

  // 3 /api/palettes/ DELETE protection based on IP
  if (ip) {
    if (pathname.startsWith('/api/palettes/') && method === 'DELETE') {
      const allowed = await consumeWithLogging({
        request,
        limiter: deleteLimiter,
        key: ip,
        label: 'DELETE',
        route: 'api.palettes',
      })

      if (!allowed) {
        return new NextResponse('Too many API requests', { status: 429 })
      }
    }
  }

  // 4. Global API protection from flood
  try {
    const res = await globalFloodLimiter.consume('global')
    logStructured('info', 'api.rate_limit', request, {
      route: 'api.global',
      limiter: 'GLOBAL',
      remainingPoints: res.remainingPoints,
      outcome: 'allowed',
      status: 200,
    })
  } catch {
    logStructured('warn', 'api.rate_limit', request, {
      route: 'api.global',
      limiter: 'GLOBAL',
      remainingPoints: 0,
      outcome: 'blocked',
      status: 429,
      reason: 'too_many_requests',
    })

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
