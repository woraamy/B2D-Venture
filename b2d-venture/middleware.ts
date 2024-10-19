import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import User from '@/models/user';
import Business from '@/models/Business';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/dashboard/admin')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  if (pathname.startsWith('/dashboard/business')) {
    const pathParts = pathname.split('/');
    const businessId = pathParts[3];
    if (token.role !== 'business') {
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
