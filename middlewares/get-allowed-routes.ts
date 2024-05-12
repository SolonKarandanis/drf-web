import { Locale } from "@/utils/locales"

export const allowedPaths = ['/auth/login/','/auth/register/','/auth/forgot-password/']

export  function getAllowedRoutes(allowedPaths: string[], locales: Locale[]) {
    let allowedPathsWithLocale = [...allowedPaths]
  
    allowedPaths.forEach(route => {
      locales.forEach(
        locale =>
          (allowedPathsWithLocale = [
            ...allowedPathsWithLocale,
            `/${locale}${route}`
          ])
      )
    })
  
    return allowedPathsWithLocale
}