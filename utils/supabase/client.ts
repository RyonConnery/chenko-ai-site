import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://bfrafodaipngrzukzzij.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_C04qIAatOYnM6ESs1Jmaow_8xNAAlje";

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
