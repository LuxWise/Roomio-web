import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const PUBLIC_ROUTES = ["/login", "/404"];
const ERROR_ROUTES = ["/not_route"];
const PROTECTED_ROUTES = ["/route"];

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
