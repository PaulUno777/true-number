import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Debug logging - this will help us see what's happening
  console.log("next-intl request config locale:", locale);

  // Provide a fallback if locale is undefined
  const validLocale = locale || routing.defaultLocale;
  console.log("using locale:", validLocale);

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(validLocale as "en" | "fr")) {
    console.log(
      "Invalid locale, falling back to default:",
      routing.defaultLocale
    );
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
