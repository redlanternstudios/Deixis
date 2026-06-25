import Link from "next/link"
import { SubscriptionForm } from "@/components/subscription-form"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-title">DEIXIS</span>
        </div>
        <div className="flex gap-8 text-sm tracking-wide">
          <Link href="/shop" className="hover:text-deixis-blue transition-colors">SHOP</Link>
          <Link href="/salon" className="hover:text-deixis-blue transition-colors">SALON</Link>
          <Link href="/about" className="hover:text-deixis-blue transition-colors">ABOUT</Link>
          <Link href="/contact" className="hover:text-deixis-blue transition-colors">CONTACT</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-title tracking-tight mb-6">
          Contemporary Art<br />
          <span className="text-deixis-gray">from Barrio Logan</span>
        </h1>
        <p className="text-lg text-deixis-gray max-w-xl mb-8">
          A curated consignment gallery connecting collectors with exceptional artists.
          Every purchase directly supports the artists who create the work.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-deixis-black text-white px-8 py-3 text-sm tracking-wider hover:bg-deixis-gray transition-colors"
        >
          EXPLORE WORKS
        </Link>
      </section>

      {/* Featured Works placeholder */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-title mb-8">Featured Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/5] bg-gray-100 flex items-center justify-center text-deixis-gray">
              Featured Work {i}
            </div>
          ))}
        </div>
      </section>

      {/* Salon de Deixis teaser */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-title mb-4">Salon de Deixis</h2>
          <p className="text-deixis-gray max-w-lg mx-auto mb-6">
            Time-bound drops featuring exclusive collections. Join the mailing list for early access.
          </p>
          <SubscriptionForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-xs text-deixis-gray">
        <p>© 2026 Deixis Gallery. Barrio Logan, San Diego.</p>
      </footer>
    </main>
  )
}
