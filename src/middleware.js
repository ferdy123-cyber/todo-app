import { NextResponse } from "next/server";

const protectedRoutes = [];

export default function middleware(req) {
  const isAuthenticated = req.cookies.get("session");
  const protectedPath =
    req.nextUrl.pathname == "/"
      ? req.nextUrl.pathname
      : protectedRoutes.find((e) => req.nextUrl.pathname.includes(e));
  console.log("protectedPath", protectedPath);
  if (!isAuthenticated) {
    if (protectedPath) {
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else {
    const unProtectedRoute =
      req.nextUrl.pathname.includes("/login") ||
      req.nextUrl.pathname.includes("/register");
    console.log("unProtectedRoute", req.nextUrl.pathname, unProtectedRoute);
    if (unProtectedRoute) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
