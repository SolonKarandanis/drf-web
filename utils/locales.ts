export const locales = ["en", "gr"] as const;
export type Locale = (typeof locales)[number];