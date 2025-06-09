import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  if (match) {
    const [, locale, rest] = match;
    const cleanPath = rest?.replace(/^\/|\/$/g, "") ?? "";

    const validRoutes = [
      "",
      "contact",
      "login",
      "login/recover",
      "login/recover/code",
      "login/recover/success",
      "map",
      "notFound",
      "register",
      "register/code",
      "register/success",
      "rooms",
      "reservation/success",
    ];

    const isValid = validRoutes.some(
      route => cleanPath === route || cleanPath.startsWith(`${route}/`)
    );

    if (!isValid) {
      const notFoundUrl = request.nextUrl.clone();
      notFoundUrl.pathname = `/${locale}/notFound`;
      return NextResponse.redirect(notFoundUrl);
    }
  }

  const response = intlMiddleware(request);

  // ✅ Si existe auth_token, marca una cookie auxiliar
  const authToken = request.cookies.get("auth_token");
  if (authToken) {
    response.cookies.set("isLogged", "true", {
      path: "/",
    });
  } else {
    response.cookies.set("isLogged", "false", {
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
