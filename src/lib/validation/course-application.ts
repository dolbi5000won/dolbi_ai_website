import { z } from "zod";

export const courseApplicationSchema = z.object({
  course_slug: z
    .string()
    .trim()
    .min(1, "교육 과정을 선택해 주세요.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "잘못된 과정입니다."),
  applicant_name: z
    .string()
    .trim()
    .min(1, "이름을 입력해 주세요.")
    .max(100, "이름은 100자 이하여야 합니다."),
  email: z
    .string()
    .trim()
    .email("올바른 이메일을 입력해 주세요.")
    .max(255),
  phone: z
    .string()
    .trim()
    .min(7, "연락처를 입력해 주세요.")
    .max(30, "연락처가 너무 깁니다.")
    .regex(/^[0-9+\-\s()]+$/, "연락처 형식을 확인해 주세요."),
  company: z
    .string()
    .trim()
    .max(200, "회사명은 200자 이하여야 합니다.")
    .optional()
    .or(z.literal("")),
  participant_count: z.coerce
    .number()
    .int("인원은 정수여야 합니다.")
    .min(1, "인원은 1명 이상이어야 합니다.")
    .max(500, "인원은 500명 이하여야 합니다."),
  preferred_date: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
      "희망일 형식이 올바르지 않습니다.",
    ),
  message: z
    .string()
    .trim()
    .max(5000, "문의 내용은 5000자 이하여야 합니다.")
    .optional()
    .or(z.literal("")),
  privacy_consent: z.literal(true, {
    error: "개인정보 수집·이용에 동의해 주세요.",
  }),
  website: z.string().max(0, "스팸으로 감지되었습니다.").optional(),
});

export type CourseApplicationInput = z.infer<typeof courseApplicationSchema>;
