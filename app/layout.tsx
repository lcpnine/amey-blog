import type { Metadata } from "next"
import { Inter } from "next/font/google"
import config from "../blog.config"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { generateWebsiteSchema } from "../lib/seo"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: config.site.title,
    template: `%s | ${config.site.title}`,
  },
  description: config.site.description,
  metadataBase: new URL(config.site.url),
  openGraph: {
    title: config.site.title,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.title,
    locale: config.site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: config.site.description,
    creator: config.social.twitter ? `@${config.social.twitter}` : undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteSchema = generateWebsiteSchema()

  return (
    <html lang={config.site.language} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
