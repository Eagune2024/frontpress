import { createServerClient } from '@supabase/ssr'

const cookieStore = new Map()

export default (async function supabasePromise() {
  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return [...cookieStore].map(([key, value]) => ({ [key]: value }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value)
          )
        },
      },
    }
  )
  await supabaseClient.auth.signInWithPassword({
    email: process.env.NEXT_PUBLIC_SUPABASE_USER,
    password: process.env.NEXT_PUBLIC_SUPABASE_PASSWORD,
  })
  return supabaseClient;
})();