import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deixis — Digital Gallery',
  description: 'A curated digital gallery experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body bg-black text-white antialiased">
        {/* Header with gyroscope logo placeholder */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3">
            {/* Gyroscope logo placeholder */}
            <div className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full border border-white/50" />
            </div>
            <span className="font-display text-lg tracking-wide text-white">DEIXIS</span>
          </div>
          <nav className="flex gap-8 text-sm tracking-widest uppercase text-white/60 font-body">
            <a href="/" className="hover:text-white transition-colors">Gallery</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
          </nav>
        </header>
        <main className="min-h-screen pt-24">
          {children}
        </main>
      </body>
    </html>
  )
}
