import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Public (anonymous) Supabase client for read-only queries.
 * Does NOT use cookies, so it won't trigger browser auth restrictions
 * in the v0 embedded preview.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
