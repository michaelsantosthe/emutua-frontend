import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === "/login"

  const token = request.cookies.get("auth_token")?.value || ""

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside public folder)
     * 4. /favicon.ico, /sitemap.xml (inside public folder)
     */
    "/((?!api|_next|fonts|favicon.ico|sitemap.xml).*)",
  ],
}

