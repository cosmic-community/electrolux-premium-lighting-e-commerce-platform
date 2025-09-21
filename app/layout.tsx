import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'ElectroLux - Premium Lighting Solutions',
  description: 'Discover premium lighting solutions for residential, commercial, and industrial spaces. Modern chandeliers, LED systems, and specialty lighting with 3D presentations.',
  keywords: 'lighting, LED, chandeliers, commercial lighting, residential lighting, electrical lamps',
  authors: [{ name: 'ElectroLux' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'ElectroLux - Premium Lighting Solutions',
    description: 'Discover premium lighting solutions for residential, commercial, and industrial spaces.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElectroLux - Premium Lighting Solutions',
    description: 'Discover premium lighting solutions for residential, commercial, and industrial spaces.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get bucket slug for the cosmic badge
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}