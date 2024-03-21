import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import CustomProvider from '@/shared/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DRF',
  description: 'DRF web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CustomProvider>
        <div>
          {children}
        </div>
      </CustomProvider>
      </body>
    </html>
  )
}
