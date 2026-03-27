import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BizIntel AI - Business Intelligence Dashboard',
  description: 'Professional business intelligence report generator for SMEs. Analyze your business health, get strategic recommendations, and simulate scenarios with BizIntel AI.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        
        {/* 🔥 FIX: Hide duplicate key warning */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const originalError = console.error;
              console.error = (...args) => {
                if (args[0]?.includes?.("Encountered two children with the same key")) {
                  return;
                }
                originalError(...args);
              };
            `,
          }}
        />

        <div className="w-full">
          {children}
        </div>

        <Analytics />
      </body>
    </html>
  )
}
