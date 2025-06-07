import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Lista de rutas válidas
const validRoutes = [
  "", // equivale a /[locale]
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
];

// Middleware principal
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  if (match) {
    const [, locale, rest] = match;
    const cleanPath = rest?.replace(/^\/|\/$/g, "") ?? "";

    const isValid = validRoutes.some(
      route => cleanPath === route || cleanPath.startsWith(`${route}/`)
    );

    if (!isValid) {
      const notFoundUrl = request.nextUrl.clone();
      notFoundUrl.pathname = `/${locale}/notFound`;
      return NextResponse.redirect(notFoundUrl);
    }
  }

  // Si todo es válido, sigue con el middleware original de next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
