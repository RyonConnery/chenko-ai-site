const DEFAULT_SUPABASE_PROJECT_REF = "bfrafodaipngrzukzzij";
const DEFAULT_SUPABASE_URL = `https://${DEFAULT_SUPABASE_PROJECT_REF}.supabase.co`;
const DEFAULT_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_C04qIAatOYnM6ESs1Jmaow_8xNAAlje";

function normalizeSupabaseUrl(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return DEFAULT_SUPABASE_URL;
  }

  if (trimmed === DEFAULT_SUPABASE_PROJECT_REF) {
    return DEFAULT_SUPABASE_URL;
  }

  if (/^[a-z0-9]+$/i.test(trimmed)) {
    return `https://${trimmed}.supabase.co`;
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol === "https:" && url.hostname.endsWith(".supabase.co")) {
      return url.origin;
    }
  } catch {
    // Fall back to the known ChenkoAI Supabase project below.
  }

  return DEFAULT_SUPABASE_URL;
}

export const supabaseUrl = normalizeSupabaseUrl(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);

export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY;
