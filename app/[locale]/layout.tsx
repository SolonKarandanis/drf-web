import { locales, type Locale } from "@/utils/locales";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import CustomProvider from '@/shared/redux/provider'
import { FC } from "react";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import AuthProvider from "@/components/auth/auth-provider";
import { ProgressBar } from "@/shared/layout-components/progress-bar/progress-bar";
import ToastProvider from "@/shared/react-tostify/toast-provider";

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
            <ToastProvider>
              {/* <Setup /> */}
              <NextIntlClientProvider messages={messages}>
                <ProgressBar className="fixed top-0 z-50 h-1 bg-sky-500" >
                  {/* <RootStyleRegistry> */}
                    {children}
                  {/* </RootStyleRegistry> */}
                </ProgressBar>
              </NextIntlClientProvider>
            </ToastProvider>
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