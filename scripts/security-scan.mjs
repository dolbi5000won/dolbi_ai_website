import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const forbiddenPatterns = [
  {
    name: "service_role_in_client",
    re: /SUPABASE_SERVICE_ROLE_KEY/,
    allow: [
      "src/lib/supabase/env.ts",
      "src/lib/supabase/admin.ts",
      "scripts/create-admin.mjs",
      ".env.example",
      "DEPLOY.md",
      "supabase/APPLY.md",
      "README.md",
      "scripts/security-scan.mjs",
    ],
  },
  {
    name: "resend_key_literal_usage",
    re: /RESEND_API_KEY/,
    allow: [
      "src/lib/supabase/env.ts",
      "src/lib/email/resend.ts",
      ".env.example",
      "DEPLOY.md",
      "supabase/APPLY.md",
      "README.md",
      "scripts/security-scan.mjs",
    ],
  },
  {
    name: "hardcoded_sk_or_re_secret",
    re: /\b(sk_live_|re_[A-Za-z0-9]{20,}|eyJhbGciOi)/,
    allow: ["scripts/security-scan.mjs"],
  },
];

const skipDirs = new Set([
  "node_modules",
  ".next",
  ".git",
  "agent-tools",
]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|js|mjs|md|json|env\.example)$/.test(name) || name === ".env.example") {
      files.push(full);
    }
  }
  return files;
}

const files = walk(root);
let failed = 0;

for (const file of files) {
  const rel = relative(root, file).replaceAll("\\", "/");
  if (rel.startsWith(".env") && rel !== ".env.example") {
    console.log(`FAIL — tracked env file risk: ${rel}`);
    failed += 1;
    continue;
  }

  const text = readFileSync(file, "utf8");
  for (const rule of forbiddenPatterns) {
    if (!rule.re.test(text)) continue;
    if (rule.allow.some((allowed) => rel === allowed || rel.endsWith(allowed))) {
      continue;
    }
    // Client components must never reference service role / resend key names
    if (
      (rel.includes("/components/") || rel.endsWith(".tsx")) &&
      !rel.includes("/app/actions/") &&
      !rel.includes("/lib/")
    ) {
      if (rule.name !== "hardcoded_sk_or_re_secret" && !rel.includes("admin/")) {
        // only flag if in clearly client path with "use client"
        if (text.includes('"use client"') || text.includes("'use client'")) {
          console.log(`FAIL — ${rule.name} in client file: ${rel}`);
          failed += 1;
          continue;
        }
      }
    }
    if (rule.name === "hardcoded_sk_or_re_secret") {
      console.log(`FAIL — ${rule.name}: ${rel}`);
      failed += 1;
    }
  }
}

// Ensure .gitignore keeps env files out
const gitignore = readFileSync(join(root, ".gitignore"), "utf8");
if (!gitignore.includes(".env")) {
  console.log("FAIL — .gitignore missing .env rule");
  failed += 1;
} else {
  console.log("PASS — .gitignore env rule");
}

if (failed > 0) {
  console.log(`Security scan failed: ${failed}`);
  process.exit(1);
}

console.log("Security scan passed.");
