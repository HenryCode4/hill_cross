import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/academics","/e-learning", "/allocate-Module", "/student-mgt", "/Accounts_&_Finance", "/notification", "/hr_management", "/admin"];
const publicRoutes = [
  "/",
  "/signup",
  "/confirm-account",
  "/forgot-password", 
  "/reset-password", 
  "/verify-mfa",
];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Check if the path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path === route);

  const accessToken = req.cookies.get("accessToken")?.value;

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Add config to specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};