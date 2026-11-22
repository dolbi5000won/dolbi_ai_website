export function getSupabasePublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
}

export function isSupabaseConfigured() {
  return Boolean(getSupabasePublicEnv() && getSupabaseServiceKey());
}

export function getResendEnv() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!apiKey || !fromEmail || !adminEmail) return null;
  return { apiKey, fromEmail, adminEmail };
}
