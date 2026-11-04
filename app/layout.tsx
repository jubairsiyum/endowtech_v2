import type { Metadata, Viewport } from 'next'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'Endow Tech — Enterprise Software & Digital Product Studio',
  description:
    'Endow Tech is the technology and product engineering wing of Endow Corporation. We engineer high-performance web applications, student portal systems, and scalable SaaS platforms.',
  keywords: [
    'Endow Tech',
    'Endow Corporation',
    'Endow Global Education',
    'student portals',
    'admission management system',
    'SaaS platforms',
    'enterprise web development',
    'Next.js product studio',
    'TypeScript engineering',
    'Seoul tech studio',
    'Dhaka software agency',
  ],
  authors: [{ name: 'Endow Tech' }],
  creator: 'Endow Tech',
  metadataBase: new URL('https://endowtech.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://endowtech.dev',
    title: 'Endow Tech — Enterprise Software & Digital Product Studio',
    description:
      'The technology and product engineering studio behind global academic portals and scalable SaaS architectures.',
    siteName: 'Endow Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endow Tech — Enterprise Software & Digital Product Studio',
    description:
      'High-performance web applications, student portal systems, and scalable SaaS platforms.',
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
  themeColor: '#0A0A0B',
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased" suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
