import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const apiKey = request.cookies.get("apiKey")?.value;
    const isAuthPage = request.nextUrl.pathname === "/auth";

    // Redirect to auth if not authenticated and trying to access protected routes
    if (!apiKey && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    // Redirect to dashboard if authenticated and trying to access auth page
    if (apiKey && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard/invoices", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/auth",
        "/dashboard/:path*"
    ]
};