import { locales, type Locale } from "@/utils/locales";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import CustomProvider from '@/shared/redux/provider'
import Setup from '@/components/utils/Setup'
import { FC } from "react";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import AuthProvider from "@/components/auth/auth-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DRF',
  description: 'DRF web',
}

type Props = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

const RootLayout:FC<Props>= async ({children,params:{locale}}) => {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} 
      suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <CustomProvider>
            {/* <Setup /> */}
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </CustomProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}


export default RootLayout;