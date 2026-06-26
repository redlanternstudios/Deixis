import Link from "next/link"
import BrandedHeader from "@/components/branded-header"

const NAV_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/salon", label: "SALON" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <BrandedHeader links={NAV_LINKS} />

      {/* ── HERO ── cream background, split layout */}
      <section className="bg-deixis-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: copy */}
          <div>
            <p className="text-xs tracking-[0.25em] text-deixis-gold uppercase mb-6">
              Barrio Logan · San Diego
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-title tracking-tight leading-[1.05] mb-8">
              Contemporary<br />Art from<br />Barrio Logan.
            </h1>
            <p className="text-base md:text-lg text-deixis-gray leading-relaxed max-w-sm mb-10">
              A curated consignment gallery connecting collectors with exceptional artists.
              Every purchase directly supports the artists who create the work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="inline-block bg-deixis-black text-white px-8 py-4 text-xs tracking-[0.18em] hover:bg-gray-800 transition-colors text-center uppercase"
              >
                Explore Works
              </Link>
              <Link
                href="/about"
                className="inline-block border border-deixis-black text-deixis-black px-8 py-4 text-xs tracking-[0.18em] hover:bg-deixis-black hover:text-white transition-colors text-center uppercase"
              >
                About the Gallery
              </Link>
            </div>
          </div>

          {/* Right: editorial card */}
          <div className="hidden md:block">
            <div className="w-full aspect-[3/4] bg-[#D6CFC5] relative overflow-hidden flex flex-col items-center justify-center text-center p-10">
              {/* top rule */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-12 bg-deixis-gold opacity-60" />
              <div className="mt-12">
                <p className="font-title text-2xl md:text-3xl tracking-wide text-[#3A3328] mb-3">
                  Artist Submissions
                </p>
                <p className="text-xs tracking-[0.2em] text-[#6B6050] uppercase mb-10">
                  Now Open
                </p>
                <Link
                  href="/artists/signin"
                  className="text-xs tracking-[0.18em] text-[#3A3328] border-b border-deixis-gold pb-0.5 hover:text-deixis-gold transition-colors uppercase"
                >
                  Artist Portal →
                </Link>
              </div>
              {/* bottom rule */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-deixis-gold opacity-60" />
            </div>
          </div>

        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-gray-200" />

      {/* ── FEATURED WORKS ── white background */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">

          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] text-deixis-gold uppercase mb-3">
                Selected Works
              </p>
              <h2 className="text-3xl md:text-4xl font-title">Featured Works</h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-block text-xs tracking-[0.18em] uppercase border-b border-deixis-black pb-0.5 hover:border-deixis-gold hover:text-deixis-gold transition-colors"
            >
              View All Works
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: "Featured Work 1", bg: "bg-[#DDD8D0]" },
              { label: "Featured Work 2", bg: "bg-[#C9C4BB]" },
              { label: "Featured Work 3", bg: "bg-[#E4DDD4]" },
            ].map((item, i) => (
              <Link href="/shop" key={i} className="group block">
                <div className={`aspect-[4/5] ${item.bg} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-8 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[10px] tracking-[0.15em] text-[#6B6050] uppercase">
                      {item.label}
                    </span>
                  </div>
                </div>
                <div className="pt-4 pb-3 border-b border-gray-100">
                  <p className="text-sm text-deixis-gray">Artist Name</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile "view all" */}
          <div className="mt-10 md:hidden">
            <Link
              href="/shop"
              className="text-xs tracking-[0.18em] uppercase border-b border-deixis-black pb-0.5"
            >
              View All Works
            </Link>
          </div>

        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-gray-200" />

      {/* ── SALON TEASER ── back to cream */}
      <section className="bg-deixis-cream py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-xs tracking-[0.25em] text-deixis-gold uppercase mb-4">
            Exclusive Drops
          </p>
          <h2 className="text-4xl md:text-5xl font-title mb-6">Salon de Deixis</h2>
          <p className="text-deixis-gray leading-relaxed mb-10">
            Time-bound drops featuring exclusive collections.
            Join the mailing list for early access.
          </p>

          {/* Email form — inline on sm+ */}
          <div className="flex flex-col sm:flex-row max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-gray-300 border-r-0 px-4 py-3 text-sm bg-white focus:outline-none focus:border-deixis-black sm:border-r-0"
            />
            <button className="bg-deixis-black text-white px-6 py-3 text-xs tracking-[0.18em] hover:bg-gray-800 transition-colors whitespace-nowrap border border-deixis-black uppercase">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-deixis-gray mt-5">
            Or{" "}
            <Link href="/salon" className="underline underline-offset-2 hover:text-deixis-black transition-colors">
              view the current drop
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-deixis-black text-white py-10 px-6 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs tracking-wider">
          <span className="font-title text-xl">DEIXIS</span>
          <p className="text-gray-400">© 2026 Deixis Gallery · Barrio Logan, San Diego.</p>
          <div className="flex gap-8 text-gray-400">
            <Link href="/artists/signin" className="hover:text-white transition-colors uppercase tracking-[0.15em]">
              Artist Portal
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors uppercase tracking-[0.15em]">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
