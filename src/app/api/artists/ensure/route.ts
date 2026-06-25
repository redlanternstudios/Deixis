import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verify the requesting user matches — only create your own row
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if artist row already exists (idempotent)
    const { data: existing } = await supabase
      .from('deixis_artists')
      .select('id')
      .eq('auth_user_id', userId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ artist: existing, created: false })
    }

    // Create artist row with status='applied'
    const { data: artist, error } = await supabase
      .from('deixis_artists')
      .insert({
        auth_user_id: userId,
        email: user.email,
        status: 'applied',
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create artist row:', error)
      return NextResponse.json(
        { error: 'Failed to create artist record' },
        { status: 500 }
      )
    }

    return NextResponse.json({ artist, created: true })
  } catch (err) {
    console.error('Ensuring artist failed:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
