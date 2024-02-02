import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("login")?.value;

  if (!currentUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = { matcher: ["/personal"] };
