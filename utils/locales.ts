export const locales = ["en", "gr"] as const;
export const defaultLocale="en";
export type Locale = (typeof locales)[number];