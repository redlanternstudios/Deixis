import Link from 'next/link'

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Artists nav */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-title tracking-tight">
            DEIXIS{" "}
            <span className="text-xs text-gray-400 font-normal">/ artists</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8">
        {children}
      </main>
    </div>
  )
}
