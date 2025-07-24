import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const sessionCookie = getSessionCookie(req)

  //["/dashboard/:path*"],

  const res = NextResponse.next()

  const isLoggedIn = !!sessionCookie
  const isOnProtectedRoute = nextUrl.pathname.startsWith('/admin/')
  const isOnAuthRoute = nextUrl.pathname.startsWith('/auth/')

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
