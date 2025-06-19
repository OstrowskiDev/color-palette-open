'use client'

import { ColorSettingsProvider } from '@/lib/hooks/ColorSettingsContext'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ColorSettingsProvider>{children}</ColorSettingsProvider>
}
