'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'processing' | 'error' | 'expired'>('processing')
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()

      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)

      if (error) {
        // Check if the error is about an expired or invalid link
        if (error.message?.toLowerCase().includes('expired') || 
            error.message?.toLowerCase().includes('invalid')) {
          setStatus('expired')
          return
        }
        console.error('Auth callback error:', error.message)
        setStatus('error')
        return
      }

      if (!data.session?.user) {
        setStatus('error')
        return
      }

      // Create or verify artist row on first sign-in
      try {
        await fetch('/api/artists/ensure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.session.user.id }),
        })
      } catch (err) {
        console.error('Failed to ensure artist row:', err)
        // Non-blocking — redirect anyway
      }

      router.push('/artists/dashboard')
    }

    handleCallback()
  }, [router])

  if (status === 'expired') {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-title mb-3">Link expired</h2>
        <p className="text-gray-600 mb-6">This magic link has expired or is no longer valid.</p>
        <button
          onClick={() => router.push('/artists/signin')}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm tracking-wider hover:bg-gray-800 transition-colors"
        >
          Request a new link
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-red-600 mb-4">Something went wrong while signing you in.</p>
        <button
          onClick={() => router.push('/artists/signin')}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm tracking-wider hover:bg-gray-800 transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-4" />
      <p className="text-gray-600">Signing you in…</p>
    </div>
  )
}
