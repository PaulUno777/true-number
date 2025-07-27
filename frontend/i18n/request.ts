import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Provide a fallback if locale is undefined
  const validLocale = locale || routing.defaultLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(validLocale as "en" | "fr")) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../messages/${routing.defaultLocale}.json`))
        .default,
    };
  }

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
