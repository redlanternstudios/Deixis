"use client"

import { useState } from "react"
import Link from "next/link"

export function SalonTeaser() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
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
        {subscribed ? (
          <p className="text-sm text-deixis-gold tracking-wide">
            You&apos;re on the list. We&apos;ll notify you about the next drop.
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-sm mx-auto">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-300 border-r-0 px-4 py-3 text-sm bg-white focus:outline-none focus:border-deixis-black sm:border-r-0"
            />
            <button
              type="submit"
              className="bg-deixis-black text-white px-6 py-3 text-xs tracking-[0.18em] hover:bg-gray-800 transition-colors whitespace-nowrap border border-deixis-black uppercase"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-xs text-deixis-gray mt-5">
          Or{" "}
          <Link href="/salon" className="underline underline-offset-2 hover:text-deixis-black transition-colors">
            view the current drop
          </Link>
        </p>
      </div>
    </section>
  )
}
