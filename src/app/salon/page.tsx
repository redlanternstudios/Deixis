"use client"

import { useState, useEffect } from "react"
import BrandedHeader from "@/components/branded-header"

const NAV_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/salon", label: "SALON" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
]

// Active drop: opens 7 days from 2026-06-25
const OPENS_AT = new Date("2026-07-02T18:00:00-07:00")

const PAST_DROPS = [
  {
    id: 1,
    title: "Nocturnes",
    artist: "Carmen Villanueva",
    soldOut: true,
    bgTone: "bg-[#C8C4BC]",
  },
  {
    id: 2,
    title: "Meridian",
    artist: "Teo Ramirez",
    soldOut: true,
    bgTone: "bg-[#BFBAB3]",
  },
]

function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(() => Math.max(0, target.getTime() - Date.now()))

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, target.getTime() - Date.now()))
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor(remaining / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isOpen: remaining === 0 }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-title text-5xl md:text-6xl tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs tracking-[0.2em] uppercase text-deixis-gray">{label}</span>
    </div>
  )
}

export default function SalonPage() {
  const [mounted, setMounted] = useState(false)
  const countdown = useCountdown(OPENS_AT)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div className="min-h-screen bg-deixis-cream">
      <BrandedHeader links={NAV_LINKS} />

      {/* Active Drop Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-20">
        <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-8">
          Salon de Deixis — Next Drop
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="font-title text-5xl md:text-6xl leading-tight mb-2">
                The Meridian Hours
              </h1>
              <p className="text-deixis-gray text-lg">Marcus Adefope</p>
            </div>

            {/* Countdown */}
            <div>
              {!mounted ? (
                // Placeholder with same dimensions to prevent layout shift
                <div className="h-32" />
              ) : (
                <>
                  <p className="text-xs tracking-[0.15em] uppercase text-deixis-gray mb-5">
                    {countdown.isOpen ? "Drop is open now" : "Opens in"}
                  </p>
                  {!countdown.isOpen && (
                    <div className="flex gap-6">
                      <CountdownUnit value={countdown.days} label="Days" />
                      <span className="font-title text-4xl text-black/20 self-start mt-1">:</span>
                      <CountdownUnit value={countdown.hours} label="Hours" />
                      <span className="font-title text-4xl text-black/20 self-start mt-1">:</span>
                      <CountdownUnit value={countdown.minutes} label="Min" />
                      <span className="font-title text-4xl text-black/20 self-start mt-1">:</span>
                      <CountdownUnit value={countdown.seconds} label="Sec" />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Email capture */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-deixis-gray mb-4">
                Get notified when it opens
              </p>
              {subscribed ? (
                <p className="text-sm text-deixis-gold tracking-wide">
                  You&apos;re on the list. We&apos;ll notify you when the drop opens.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-0">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="border border-black/20 bg-white px-4 py-3 text-sm w-64 focus:outline-none focus:border-deixis-black transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-deixis-black text-white px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-deixis-gray transition-colors whitespace-nowrap"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Blurred preview image */}
          <div className="relative aspect-[4/5] bg-[#C8C4BC] overflow-hidden">
            {/* Blurred shapes to suggest artwork content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-48 bg-[#9A948C] opacity-60 blur-2xl" />
              <div className="absolute w-20 h-20 bg-[#7A7470] opacity-40 blur-xl top-1/4 left-1/4" />
            </div>
            <div className="absolute inset-0 backdrop-blur-md" />
            {/* COMING SOON overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-px bg-deixis-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-white font-medium">
                Coming Soon
              </span>
              <div className="w-8 h-px bg-deixis-gold" />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-black/10 max-w-6xl mx-auto px-8" />

      {/* Past Drops */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-10">Past Drops</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {PAST_DROPS.map((drop) => (
            <div key={drop.id} className="group">
              <div
                className={`aspect-[4/5] ${drop.bgTone} grayscale mb-4 relative`}
                aria-label={`${drop.title} — closed drop`}
              >
                {drop.soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs tracking-[0.25em] uppercase text-white/80 border border-white/40 px-3 py-1">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>
              <p className="font-title text-lg">{drop.title}</p>
              <p className="text-xs text-deixis-gray mt-0.5">{drop.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 px-8 py-8 text-center text-xs text-deixis-gray tracking-wide">
        © 2026 Deixis Gallery. Barrio Logan, San Diego.
      </footer>
    </div>
  )
}
