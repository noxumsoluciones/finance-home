// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Rutas públicas que no requieren login
  const publicPaths = ['/login', '/_next', '/favicon.ico'];
  const token = request.cookies.get('auth_token')?.value;
  // Verificamos si existe la cookie y si su valor es explícitamente 'true'
  const isDemo = request.cookies.get('is_demo_mode')?.value === 'true';


  const { pathname } = request.nextUrl;
  const isPublicRoute = 
      pathname === '/login' || 
      pathname === '/register' || 
      pathname.startsWith('/api/') || 
      pathname.startsWith('/_next') || 
      pathname.includes('favicon.ico');

  if (!isPublicRoute && !token && !isDemo) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if ((pathname === '/login' || pathname === '/register') && (token || isDemo)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
  /*
  // Si estamos en una ruta pública, dejamos pasar
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Verificamos si existe la cookie del modo DEMO
  const isDemo = request.cookies.get('is_demo_mode')?.value === 'true';
  if (isDemo) {
      return NextResponse.next(); // Si es demo, dejamos pasar a todo
  }

  // Verificamos el Token real
  const token = request.cookies.get('auth_token')?.value;
  const verifiedUser = token ? await verifyToken(token) : null;

  // Si no hay token válido y no es demo, mandar al login
  if (!verifiedUser) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));
  if ((token || isDemo) && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();*/
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};