import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token.role === 'admin') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard/admin')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  if (pathname.startsWith('/dashboard/business')) {
    const pathParts = pathname.split('/');
    const businessIdFromPath = pathParts[3]; 


    if (token.role !== 'business' || token.id !== businessIdFromPath) {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  if (pathname.startsWith('/dashboard/investor')) {
    const pathParts = pathname.split('/');
    const investorIdFromPath = pathParts[3];

    if (token.role !== 'investor' || token.id !== investorIdFromPath) {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};
