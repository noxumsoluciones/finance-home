(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__958cb42b._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Jth/Git Repository/Home/finance-home/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// middleware.ts
__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
async function middleware(request) {
    // Rutas públicas que no requieren login
    const publicPaths = [
        '/login',
        '/_next',
        '/favicon.ico'
    ];
    const token = request.cookies.get('auth_token')?.value;
    // Verificamos si existe la cookie y si su valor es explícitamente 'true'
    const isDemo = request.cookies.get('is_demo_mode')?.value === 'true';
    const { pathname } = request.nextUrl;
    const isPublicRoute = pathname === '/login' || pathname === '/register' || pathname.startsWith('/api/') || pathname.startsWith('/_next') || pathname.includes('favicon.ico');
    if (!isPublicRoute && !token && !isDemo) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
    }
    if ((pathname === '/login' || pathname === '/register') && (token || isDemo)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/', request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
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

  return NextResponse.next();*/ }
const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__958cb42b._.js.map