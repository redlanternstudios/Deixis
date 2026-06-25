import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div className="container-main py-20 text-center">
      <h1 className="font-serif text-3xl mb-4">Work Not Found</h1>
      <p className="text-[var(--color-deixis-stone)] mb-8">This artwork could not be found. It may have been removed or the link is incorrect.</p>
      <Link href="/shop" className="inline-block px-8 py-3 border-2 border-[var(--color-deixis-black)] text-sm tracking-widest uppercase hover:bg-[var(--color-deixis-black)] hover:text-white transition-colors">Browse All Works</Link>
    </div>
  )
}
