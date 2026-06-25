import Link from 'next/link'

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Artists nav */}
      <nav className="bg-off-white border-b border-gray-light px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-serif tracking-tight font-semibold">
            DEIXIS{" "}
            <span className="text-xs text-gray-subtle font-normal">/ artists</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8">
        {children}
      </main>
    </div>
  )
}
