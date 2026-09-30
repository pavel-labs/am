import type { Metadata, Viewport } from 'next'
import { prefetchDNS } from 'react-dom'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { CommandPalette } from '@/widgets/command-palette'
import { ClientOnlyWidgets } from '@/shared/ui/ClientOnlyWidgets'
import { getAllPosts } from '@/shared/lib/posts'
import { THEME_INIT_SCRIPT } from '@/shared/lib/theme'
import { PERSON_JSON_LD, SITE_URL } from './constants'
import { mono, sans } from './fonts'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Pavel Piatrovich - Frontend Engineer',
  description:
    'Frontend Engineer with 7+ years of experience specialising in React, React Native, and TypeScript. Based in Warsaw, Poland.',
  keywords: [
    'Frontend Engineer',
    'React Developer',
    'React Native',
    'TypeScript',
    'Warsaw',
    'Poland',
    'Pavel Piatrovich',
  ],
  authors: [{ name: 'Pavel Piatrovich', url: SITE_URL }],
  creator: 'Pavel Piatrovich',
  publisher: 'Pavel Piatrovich',
  category: 'technology',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Pavel Piatrovich - Frontend Engineer',
    description:
      'Frontend Engineer with 7+ years of experience specialising in React, React Native, and TypeScript.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Pavel Piatrovich Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Pavel Piatrovich - Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pavel Piatrovich - Frontend Engineer',
    description: 'Frontend Engineer · React · React Native · TypeScript · Warsaw',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0c0e' },
    { media: '(prefers-color-scheme: light)', color: '#f3f2ee' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  prefetchDNS('https://linkedin.com')
  prefetchDNS('https://wa.me')

  const posts = getAllPosts().map(({ slug, title }) => ({ slug, title }))

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        {/* Intercept Cmd+P / Ctrl+P before React mounts - opens CV PDF inline */}
        <script dangerouslySetInnerHTML={{
          __html: `!function(){document.addEventListener('keydown',function(e){if((e.metaKey||e.ctrlKey)&&'p'===e.key.toLowerCase()){e.preventDefault();e.stopImmediatePropagation();window.open('/api/cv-view','_blank');}},true);}();`
        }} />
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <ClientOnlyWidgets />
        <CommandPalette posts={posts} />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
