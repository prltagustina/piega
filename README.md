# Piega Hair & Beauty Club

## Security Status

✅ **No known vulnerabilities** - Dependencies audited and patched via `pnpm audit --fix` and manual overrides.

Last security audit: April 2026
- Next.js updated to 16.2.3 (patched for request smuggling, DoS, CSRF)
- All transitive vulnerabilities resolved via dependency overrides

## Deployment on Vercel

This project uses Supabase for backend data and authentication.

### Required environment variables

Configure these variables in Vercel dashboard for both Preview and Production environments:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Which vars are used where

- `SUPABASE_URL` and `SUPABASE_ANON_KEY`
  - used by server-side code in `lib/supabase/server.ts` and `lib/supabase/middleware.ts`
  - should be stored as secret server environment variables

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - used by client-side authentication and public Supabase client code
  - required for `app/auth/login/page.tsx` and browser-side Supabase usage

### Vercel setup

1. Open your project in Vercel.
2. Go to `Settings > Environment Variables`.
3. Add the variables above.
4. Set the values to your Supabase project URL and anon key.
5. Redeploy the project after saving.

### Notes

- `SUPABASE_URL` and `SUPABASE_ANON_KEY` should not be exposed to the browser.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be present for login to work in the client.
- If you want to simplify local development, copy `.env.example` to `.env.local`.
