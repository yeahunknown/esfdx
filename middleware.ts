import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(ua)
  const cookie = request.cookies.get('browser_verified')

  // TEMP FIX: If redirected from /verify.html, allow through once (for cookie delay)
  const cameFromVerify = request.headers.get('referer')?.includes('/verify.html')

  // ✅ Skip verify.html itself, static assets, etc.
  const url = request.nextUrl
  if (
    url.pathname.startsWith('/verify.html') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // ✅ Let user through if cookie exists or just came from /verify.html
  if (cookie || cameFromVerify) {
    return NextResponse.next()
  }

  // 🔁 Otherwise, redirect to verification page
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/verify.html'
  return NextResponse.next()

}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
}
