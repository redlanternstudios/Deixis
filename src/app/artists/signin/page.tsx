'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const linkExpired = searchParams.get('error') === 'link_expired'

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/artists/auth/callback`,
        },
      })

      if (authError) throw authError
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gold bg-opacity-10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif mb-3">Check your email</h2>
        <p className="text-gray mb-6 max-w-md mx-auto">
          We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
        </p>
        <button
          onClick={() => { setSent(false); setEmail('') }}
          className="text-sm text-gray hover:text-black underline"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-16 px-8">
      {linkExpired && (
        <div className="bg-cream border border-gold p-4 mb-8 text-sm text-brown">
          That link has expired. Request a new one below.
        </div>
      )}

      <h1 className="text-3xl font-serif mb-2">Artist Sign In</h1>
      <p className="text-gray mb-8">Sign in with your email to access the artist dashboard.</p>

      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-light px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent bg-off-white"
          />
        </div>

        {error && (
          <p className="text-sm text-brown">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending…' : 'Send magic link'}
        </button>
      </form>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">Loading…</div>}>
      <SignInForm />
    </Suspense>
  )
}
