import type { Metadata } from "next"
import Link from "next/link"
import CartBadge from "@/components/CartBadge"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Deixis — The art of elsewhere",
  description: "A curated, multi-artist consignment gallery and online store in Barrio Logan, San Diego.",
  openGraph: {
    title: "Deixis — The art of elsewhere",
    description: "Curated consignment gallery in Barrio Logan, San Diego.",
    url: "https://deixisofficial.com",
    siteName: "Deixis",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--color-deixis-white)] text-[var(--color-deixis-black)] font-sans">
        <CartProvider>
          <header className="sticky top-0 z-50 bg-[var(--color-deixis-white)]/95 backdrop-blur-sm border-b border-[var(--color-deixis-stone)]/20">
            <nav className="flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto">
              <Link href="/" className="font-serif text-2xl tracking-wider uppercase">Deixis</Link>
              <div className="flex items-center gap-8 text-sm tracking-widest uppercase">
                <Link href="/shop" className="hover:text-[var(--color-deixis-gold)] transition-colors">Shop</Link>
                <Link href="/artists" className="hover:text-[var(--color-deixis-gold)] transition-colors">Artists</Link>
                <Link href="/exhibitions" className="hover:text-[var(--color-deixis-gold)] transition-colors">Exhibitions</Link>
                <Link href="/about" className="hover:text-[var(--color-deixis-gold)] transition-colors">About</Link>
                <Link href="/contact" className="hover:text-[var(--color-deixis-gold)] transition-colors">Contact</Link>
                <CartBadge />
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="px-6 md:px-10 py-10 border-t border-[var(--color-deixis-stone)]/20 text-xs text-[var(--color-deixis-stone)]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <span>&copy; {new Date().getFullYear()} Deixis Gallery. All rights reserved.</span>
              <span>Barrio Logan, San Diego, CA</span>
              <span>@deixis.gallery</span>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
