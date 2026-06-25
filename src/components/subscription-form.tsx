"use client"

import { FormEvent, useState } from "react"

export function SubscriptionForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle subscription logic here
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 px-4 py-2 text-sm w-64"
      />
      <button
        type="submit"
        className="bg-deixis-black text-white px-6 py-2 text-sm tracking-wider hover:bg-deixis-gray transition-colors"
      >
        {submitted ? "SUBSCRIBED" : "SUBSCRIBE"}
      </button>
    </form>
  )
}
