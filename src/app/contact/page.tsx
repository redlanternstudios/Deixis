"use client"

import { useState } from "react"
import BrandedHeader from "@/components/branded-header"

const NAV_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/salon", label: "SALON" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
]

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "artist-submission", label: "Artist Submission" },
  { value: "press", label: "Press" },
  { value: "collector", label: "Collector Inquiry" },
]

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "general",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      }
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-deixis-cream">
      <BrandedHeader links={NAV_LINKS} />

      <section className="max-w-2xl mx-auto px-8 pt-20 pb-24">
        <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-6">Get in Touch</p>
        <h1 className="font-title text-5xl mb-3">Contact</h1>
        <p className="text-deixis-gray mb-12 leading-relaxed">
          Whether you&apos;re an artist looking to submit work, a collector with a question,
          or press reaching out — we read every message.
        </p>

        {status === "success" ? (
          <div className="border border-deixis-gold bg-white px-8 py-10">
            <p className="font-title text-2xl mb-2">Message received.</p>
            <p className="text-deixis-gray text-sm leading-relaxed">
              We&apos;ll get back to you within a few days. Thank you for reaching out.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs tracking-[0.15em] uppercase text-deixis-gray">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="border border-black/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-deixis-black transition-colors"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs tracking-[0.15em] uppercase text-deixis-gray">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="border border-black/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-deixis-black transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs tracking-[0.15em] uppercase text-deixis-gray">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="border border-black/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-deixis-black transition-colors appearance-none cursor-pointer"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs tracking-[0.15em] uppercase text-deixis-gray">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                className="border border-black/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-deixis-black transition-colors resize-none"
                placeholder="Your message…"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="self-start bg-deixis-black text-white px-10 py-3 text-xs tracking-[0.2em] uppercase hover:bg-deixis-gray transition-colors disabled:opacity-50"
            >
              {status === "submitting" ? "SENDING…" : "SEND MESSAGE"}
            </button>
          </form>
        )}
      </section>

      <footer className="border-t border-black/10 px-8 py-8 text-center text-xs text-deixis-gray tracking-wide">
        © 2026 Deixis Gallery. Barrio Logan, San Diego.
      </footer>
    </div>
  )
}
