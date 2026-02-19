import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./auth";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const user = getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.redirect(new URL("/home", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/dashboard", "/profile"],
};
