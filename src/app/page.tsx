export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-2xl text-center">
        {/* Gyroscope logo placeholder — large */}
        <div className="mx-auto mb-8 h-16 w-16 rounded-full border border-white/20 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border border-white/40" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
          Deixis
        </h1>
        <p className="font-body text-lg text-white/50 tracking-wide">
          Digital Gallery — Coming Soon
        </p>
      </div>
    </div>
  )
}
