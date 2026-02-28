import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthSessionProvider } from '@/components/auth/session-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Youu — Know your channel. Own your growth.',
  description: 'The premium YouTube creator analytics app. Beautiful stats, AI insights, and shareable moments.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-foreground min-h-screen" style={{ background: '#080808' }} suppressHydrationWarning>
        <AuthSessionProvider>
          <div className="w-full max-w-[390px] min-h-screen mx-auto pb-[80px]">
            {children}
          </div>
        </AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
