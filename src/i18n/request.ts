// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async params => {
  const rawLocale = params.requestLocale;
  const locale: string = (await Promise.resolve(rawLocale)) ?? "en";
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
