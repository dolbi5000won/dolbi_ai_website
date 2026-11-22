import { z } from "zod";

export const INQUIRY_TYPE_OPTIONS = [
  {
    value: "enterprise_automation",
    label: "기업 도입 상담 (업무자동화)",
  },
  {
    value: "development",
    label: "개발 프로젝트 상담",
  },
  {
    value: "education",
    label: "교육 문의",
  },
  {
    value: "general",
    label: "일반 문의",
  },
] as const;

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해 주세요.")
    .max(100, "이름은 100자 이하여야 합니다."),
  company: z
    .string()
    .trim()
    .max(200, "회사명은 200자 이하여야 합니다.")
    .optional()
    .or(z.literal("")),
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
  inquiry_type: z.enum([
    "enterprise_automation",
    "development",
    "education",
    "general",
  ]),
  subject: z
    .string()
    .trim()
    .min(1, "제목을 입력해 주세요.")
    .max(200, "제목은 200자 이하여야 합니다."),
  message: z
    .string()
    .trim()
    .min(10, "문의 내용을 10자 이상 입력해 주세요.")
    .max(5000, "문의 내용은 5000자 이하여야 합니다."),
  privacy_consent: z.literal(true, {
    error: "개인정보 수집·이용에 동의해 주세요.",
  }),
  website: z.string().max(0, "스팸으로 감지되었습니다.").optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
