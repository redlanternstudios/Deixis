import BrandedHeader from '@/components/branded-header'

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandedHeader subLabel="/ artists" />
      <main className="max-w-6xl mx-auto px-8">
        {children}
      </main>
    </div>
  )
}
