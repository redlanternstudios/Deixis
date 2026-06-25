import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="font-serif text-6xl md:text-8xl mb-6 tracking-tight">Deixis</h1>
        <p className="font-serif text-xl md:text-2xl italic text-[var(--color-deixis-stone)] mb-12">The art of elsewhere</p>
        <div className="flex gap-6">
          <Link href="/shop" className="px-8 py-3 border-2 border-[var(--color-deixis-black)] text-sm tracking-widest uppercase hover:bg-[var(--color-deixis-black)] hover:text-[var(--color-deixis-white)] transition-colors">Shop Art</Link>
          <Link href="/exhibitions" className="px-8 py-3 border-2 border-[var(--color-deixis-stone)]/30 text-sm tracking-widest uppercase hover:border-[var(--color-deixis-black)] transition-colors">Exhibitions</Link>
        </div>
      </section>
    </div>
  )
}
