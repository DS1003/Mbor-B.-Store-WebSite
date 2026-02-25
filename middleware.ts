import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // 1. CORS Management
    // For API routes, we want to allow cross-origin requests
    if (request.nextUrl.pathname.startsWith('/api')) {
        const response = NextResponse.next()

        // Add CORS headers
        response.headers.set('Access-Control-Allow-Origin', '*')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        response.headers.set('Access-Control-Max-Age', '86400')

        // Handle preflight requests
        if (request.method === 'OPTIONS') {
            return new NextResponse(null, {
                status: 204,
                headers: response.headers
            })
        }

        return response
    }

    // 2. Global Performance & Security Headers
    const response = NextResponse.next()

    // Security Headers
    response.headers.set('X-DNS-Prefetch-Control', 'on')
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

    // Performance: Early Hints or similar could go here if supported, 
    // but for now we focus on Cache-Control for static assets
    if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|ico|svg)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    }

    return response
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
