"server-only";

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { type AbstractIntlMessages } from "next-intl";
import { defaultLocale, locales, type Locale } from "@/utils/locales";

const messageImports = {
  en: () => import("./messages/en.json"),
  gr: () => import("./messages/gr.json"),
} as const satisfies Record<Locale, () => Promise<{ default: AbstractIntlMessages }>>;

export function isValidLocale(locale: unknown): locale is Locale {
  return locales.some((l) => l === locale);
}

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  
  // const baseLocale = new Intl.Locale(requested).baseName;
  if (!isValidLocale(requested)) notFound();
  const locale = isValidLocale(requested)
    ? requested
    : defaultLocale;

  const messages = (await messageImports[requested]()).default;

  return {
    locale,
    messages,
  };
});