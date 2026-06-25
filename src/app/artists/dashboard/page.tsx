import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Artist {
  id: string
  auth_user_id: string
  status: string
  created_at: string
  display_name?: string
  email?: string
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/artists/signin')
  }

  const { data: artist } = await supabase
    .from('deixis_artists')
    .select('*')
    .eq('auth_user_id', user.id)
    .single<Artist>()

  const statusConfig: Record<string, { label: string; color: string; message: string }> = {
    applied: {
      label: 'Application Submitted',
      color: 'bg-blue-100 text-blue-800',
      message: 'Your artist application has been submitted and is under review. We will be in touch soon.',
    },
    approved: {
      label: 'Approved',
      color: 'bg-green-100 text-green-800',
      message: 'Welcome to Deixis! You can now set up your artist profile and start listing works.',
    },
    rejected: {
      label: 'Not Approved',
      color: 'bg-red-100 text-red-800',
      message: 'Unfortunately, your application was not approved at this time.',
    },
    onboarding: {
      label: 'Onboarding',
      color: 'bg-purple-100 text-purple-800',
      message: 'Complete your profile setup to get started on Deixis.',
    },
  }

  const statusInfo = statusConfig[artist?.status || 'applied'] || statusConfig.applied

  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-title mb-8">Artist Dashboard</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6">
        {/* Status badge */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Status message */}
        <p className="text-gray-600">{statusInfo.message}</p>

        {/* Email */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="text-sm font-medium">{user.email}</p>
        </div>

        {/* Joined date */}
        {artist?.created_at && (
          <div>
            <p className="text-sm text-gray-500">Application date</p>
            <p className="text-sm font-medium">
              {new Date(artist.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        )}

        {/* Sign out */}
        <div className="pt-4 border-t border-gray-100">
          <form action="/artists/auth/signout" method="post">
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-red-600 underline transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
