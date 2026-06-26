import BrandedHeader from "@/components/branded-header"

const NAV_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/salon", label: "SALON" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
]

const STEPS = [
  {
    number: "01",
    title: "Artist Submits Work",
    body: "Artists based in or connected to Barrio Logan submit their work for review. We accept paintings, photography, prints, and sculpture.",
  },
  {
    number: "02",
    title: "Deixis Curates",
    body: "Our team selects pieces that align with the gallery's vision — work that speaks to the community, the culture, and the contemporary moment.",
  },
  {
    number: "03",
    title: "Collector Buys, Artist Gets Paid",
    body: "When a piece sells, the artist receives the majority of the sale price directly. No bureaucracy. No delay.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-deixis-cream">
      <BrandedHeader links={NAV_LINKS} />

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-8 pt-20 pb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-6">Our Mission</p>
        <h1 className="font-title text-5xl md:text-6xl leading-tight mb-8 max-w-3xl">
          A gallery built on the ground of Barrio Logan.
        </h1>
        <p className="text-lg text-deixis-gray leading-relaxed max-w-2xl">
          Deixis is a consignment gallery rooted in Barrio Logan, San Diego. We exist to
          connect serious collectors with artists who are making consequential work — people
          who live, paint, photograph, and sculpt in one of California&apos;s most vital creative
          communities. Every sale is a direct transfer of value from collector to artist.
        </p>
      </section>

      <hr className="border-t border-black/10 max-w-5xl mx-auto px-8" />

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-10">How It Works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <span className="font-title text-5xl text-black/10 leading-none select-none">
                {step.number}
              </span>
              <h3 className="font-title text-xl">{step.title}</h3>
              <p className="text-deixis-gray leading-relaxed text-sm">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-black/10 max-w-5xl mx-auto px-8" />

      {/* The Space */}
      <section className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-6">The Space</p>
          <h2 className="font-title text-3xl mb-5">Rooted in Barrio Logan</h2>
          <p className="text-deixis-gray leading-relaxed mb-4">
            Barrio Logan has long been the heartbeat of Chicano art and culture in Southern
            California. Home to Chicano Park — the largest Chicano mural site in the world —
            the neighborhood carries a living tradition of resistance, beauty, and community.
          </p>
          <p className="text-deixis-gray leading-relaxed">
            Deixis occupies that tradition deliberately. We are not importing culture from
            elsewhere. We are amplifying what is already here: the painters, the muralists,
            the photographers, the sculptors who call this neighborhood home.
          </p>
        </div>
        <div
          className="aspect-[4/3] bg-black/5 flex items-end p-4"
          aria-label="Barrio Logan, San Diego — gallery exterior"
        >
          <span className="text-xs text-deixis-gray tracking-wide">BARRIO LOGAN, SAN DIEGO</span>
        </div>
      </section>

      <hr className="border-t border-black/10 max-w-5xl mx-auto px-8" />

      {/* Team */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-10">The Team</p>
        <div className="flex gap-8">
          <div className="w-56">
            <div
              className="w-full aspect-[3/4] bg-black/8 mb-4"
              aria-label="Bilal, Founder — portrait placeholder"
            />
            <p className="font-title text-lg mb-0.5">Bilal</p>
            <p className="text-xs tracking-[0.15em] uppercase text-deixis-gray">Founder</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 px-8 py-8 text-center text-xs text-deixis-gray tracking-wide">
        © 2026 Deixis Gallery. Barrio Logan, San Diego.
      </footer>
    </div>
  )
}
