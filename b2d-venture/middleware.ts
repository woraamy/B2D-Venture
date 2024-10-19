import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  if (pathname.startsWith('/dashboard/admin')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  if (pathname.startsWith('/dashboard/business')) {
    const pathParts = pathname.split('/');
    const businessId = pathParts[pathParts.length - 1];

    if (token.role !== 'business' || token.businessId !== businessId) {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  if (pathname.startsWith('/dashboard/investor')) {
    if (token.role !== 'investor') {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};
