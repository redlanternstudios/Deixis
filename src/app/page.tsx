import Link from "next/link"
import { SubscriptionForm } from "@/components/subscription-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-off-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-light">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif font-semibold tracking-tight">DEIXIS</span>
        </div>
        <div className="flex gap-8 text-sm tracking-wider uppercase font-medium">
          <Link href="/shop" className="hover:text-blue transition-colors">Shop</Link>
          <Link href="/salon" className="hover:text-blue transition-colors">Salon</Link>
          <Link href="/about" className="hover:text-blue transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif tracking-snug mb-6">
          Contemporary Art<br />
          <span className="text-gray">from Barrio Logan</span>
        </h1>
        <p className="text-lg text-gray max-w-xl mb-8 leading-relaxed">
          A curated consignment gallery connecting collectors with exceptional artists.
          Every purchase directly supports the artists who create the work.
        </p>
        <Link
          href="/shop"
          className="btn btn-primary"
        >
          Explore Works
        </Link>
      </section>

      {/* Featured Works placeholder */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif mb-8">Featured Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/5] bg-cream flex items-center justify-center text-gray border border-gray-light">
              Featured Work {i}
            </div>
          ))}
        </div>
      </section>

      {/* Salon de Deixis teaser */}
      <section className="px-8 py-16 bg-cream">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4">Salon de Deixis</h2>
          <p className="text-gray max-w-lg mx-auto mb-6 leading-relaxed">
            Time-bound drops featuring exclusive collections. Join the mailing list for early access.
          </p>
          <SubscriptionForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-xs text-gray border-t border-gray-light">
        <p>© 2026 Deixis Gallery. Barrio Logan, San Diego.</p>
      </footer>
    </main>
  )
}
