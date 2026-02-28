import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Endow Tech — Modern Web Solutions & SaaS Development',
  description:
    'Endow Tech builds scalable web applications, SaaS platforms, student portal systems, and API integrations. Clean code. Modern design. Real results.',
  keywords: [
    'web development',
    'SaaS platforms',
    'student portals',
    'API integration',
    'Next.js agency',
    'TypeScript development',
    'Endow Tech',
  ],
  authors: [{ name: 'Endow Tech' }],
  creator: 'Endow Tech',
  metadataBase: new URL('https://endowtech.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://endowtech.dev',
    title: 'Endow Tech — Modern Web Solutions & SaaS Development',
    description:
      'Scalable web applications, SaaS platforms, and student portal systems built with modern technology.',
    siteName: 'Endow Tech',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Endow Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endow Tech — Modern Web Solutions',
    description: 'Scalable web apps, SaaS, and student portals.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
