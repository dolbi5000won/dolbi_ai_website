import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^[0-9+\-\s()]+$/),
  inquiry_type: z.enum([
    "enterprise_automation",
    "development",
    "education",
    "general",
  ]),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(5000),
  privacy_consent: z.literal(true),
  website: z.string().max(0).optional(),
});

const valid = inquirySchema.safeParse({
  name: "홍길동",
  email: "test@example.com",
  phone: "010-1234-5678",
  inquiry_type: "development",
  subject: "도입 상담",
  message: "업무자동화 도입을 상담하고 싶습니다.",
  privacy_consent: true,
});

const invalid = inquirySchema.safeParse({
  name: "",
  email: "bad",
  phone: "abc",
  inquiry_type: "x",
  subject: "",
  message: "짧음",
  privacy_consent: false,
});

const honeypot = inquirySchema.safeParse({
  name: "홍길동",
  email: "test@example.com",
  phone: "010-1234-5678",
  inquiry_type: "development",
  subject: "도입 상담",
  message: "업무자동화 도입을 상담하고 싶습니다.",
  privacy_consent: true,
  website: "http://spam.example",
});

const checks = [
  ["valid input", valid.success === true],
  ["invalid input rejected", invalid.success === false],
  ["honeypot rejected", honeypot.success === false],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} — ${name}`);
  if (!ok) failed += 1;
}

if (failed > 0) {
  process.exit(1);
}

console.log("Validation checks passed.");
