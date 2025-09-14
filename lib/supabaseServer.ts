// Mark this module as server-only to prevent importing from the client
import "server-only";

import { createClient } from "@supabase/supabase-js";

// Create a function that returns the supabase client
export function getSupabaseServer() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL in environment");
  }
  if (!supabaseAnonKey) {
    throw new Error("Missing SUPABASE_ANON_KEY in environment");
  }

  // Server-side only client. Do not import this into client components.
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// For build-time compatibility, export a dummy client if env vars are missing
export const supabaseServer = (() => {
  try {
    return getSupabaseServer();
  } catch {
    // Return a dummy client during build time
    return {
      from: () => ({
        select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: "Build time - no env vars" } }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "Build time - no env vars" } }) }) }) }),
        delete: () => ({ eq: () => ({ data: null, error: { message: "Build time - no env vars" } }) }),
      }),
    } as any;
  }
})();