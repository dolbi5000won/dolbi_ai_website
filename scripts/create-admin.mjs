/**
 * Create an admin user (no public signup).
 *
 * Usage:
 *   node scripts/create-admin.mjs <email> <password>
 *
 * Requires .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: created, error: createError } =
  await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

if (createError) {
  console.error("Failed to create auth user:", createError.message);
  process.exit(1);
}

const userId = created.user.id;

const { error: insertError } = await supabase.from("admin_users").upsert({
  user_id: userId,
  email,
});

if (insertError) {
  console.error("Auth user created but admin_users insert failed:", insertError.message);
  process.exit(1);
}

console.log(`Admin ready: ${email} (${userId})`);
console.log("Sign in at /admin/login");
