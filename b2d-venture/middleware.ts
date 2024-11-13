import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect to login if the user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Admins can access any route
  if (token.role === 'admin') {
    return NextResponse.next();
  }

  // Business dashboard access control
  if (pathname.startsWith('/dashboard/business')) {
    const pathParts = pathname.split('/');
    const businessIdFromPath = pathParts[3]; // Extract business ID from the path

    // Check if the user is a business user and if they are accessing their own dashboard
    if (token.role !== 'business' || token.businessId !== businessIdFromPath) {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  // Investor dashboard access control
  if (pathname.startsWith('/dashboard/investor')) {
    const pathParts = pathname.split('/');
    const investorIdFromPath = pathParts[3]; // Extract investor ID from the path

    console.log('Investor ID from path:', investorIdFromPath);
    console.log(pathParts);
    console.log("Token" + token);
    console.log("Investor ID" + token.investorId);
    console.log("Role" + token.role);


    // Check if the user is an investor and if they are accessing their own dashboard
    if (token.role !== 'investor' || token.investorId !== investorIdFromPath) {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};
