import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLaout'

// !!!! change fonts or delete them
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dev Palette Tools',
  description:
    'Open source color palette tool built for web developers. It helps you design, preview, and test color palettes live in your application during development',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <div
            id="root"
            className="root h-[100vh] w-full p-6 bg-app-background-main"
          >
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  )
}
