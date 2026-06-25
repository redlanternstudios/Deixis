"use client"

import { FormEvent, useState, useEffect } from "react"

export function SubscriptionForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only render after client-side hydration is complete
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle subscription logic here
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  if (!mounted) {
    return (
      <div className="flex justify-center gap-2">
        <input
          type="email"
          placeholder="Your email"
          disabled
          className="border border-gray-light px-4 py-2 text-sm w-64 bg-off-white"
        />
        <button
          disabled
          className="btn btn-primary"
        >
          Subscribe
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-light px-4 py-2 text-sm w-64 bg-off-white"
      />
      <button
        type="submit"
        className="btn btn-primary"
      >
        {submitted ? "SUBSCRIBED" : "SUBSCRIBE"}
      </button>
    </form>
  )
}
