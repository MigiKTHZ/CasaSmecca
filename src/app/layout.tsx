// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Providers } from "./components/provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Italian Deli Shop',
  description: 'Premium Italian products delivered to your door',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Header - appears on every page */}
            <Header />

            {/* Main content - grows to fill space */}
            <main className="flex-grow">
              {children}
            </main>

            {/* Footer - appears on every page */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}