import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/forms'];

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;
   const role = request.cookies.get('role')?.value;

   const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
   if (isProtectedRoute && !role) {
      return NextResponse.redirect(new URL('/login', request.url));
   }

   const isAdminRoute = pathname.startsWith('/forms/new') || pathname.match(/\/forms\/[^\/]+$/);
   if (isAdminRoute && role !== 'Admin') {
      return NextResponse.redirect(new URL('/forms', request.url));
   }

   if (pathname === '/login' && role) {
      return NextResponse.redirect(new URL('/forms', request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/', '/login', '/forms/:path*'],
};
