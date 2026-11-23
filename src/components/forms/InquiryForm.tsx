"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { submitInquiry } from "@/app/actions/inquiry";
import { FormMessage } from "@/components/forms/FormMessage";
import { Button } from "@/components/ui/Button";
import { INQUIRY_TYPE_OPTIONS } from "@/lib/validation/inquiry";

const initial = {
  name: "",
  company: "",
  email: "",
  phone: "",
  inquiry_type: "enterprise_automation",
  subject: "",
  message: "",
  privacy_consent: false,
  website: "",
};

type InquiryFormProps = {
  defaultType?: string;
};

export function InquiryForm({ defaultType }: InquiryFormProps) {
  const [values, setValues] = useState({
    ...initial,
    inquiry_type:
      INQUIRY_TYPE_OPTIONS.some((item) => item.value === defaultType)
        ? (defaultType as string)
        : initial.inquiry_type,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<{
    tone: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setFieldErrors({});

    startTransition(async () => {
      const result = await submitInquiry({
        ...values,
        privacy_consent: values.privacy_consent ? true : undefined,
      });

      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setMessage({ tone: "error", text: result.message });
        return;
      }

      setSubmitted(true);
      setValues(initial);
      setMessage({
        tone: "success",
        text:
          result.emailStatus === "skipped"
            ? "상담이 접수되었습니다. (이메일 알림은 환경 설정 후 발송됩니다.)"
            : "상담이 접수되었습니다. 확인 메일을 보내드렸습니다.",
      });
    });
  }

  if (submitted && message?.tone === "success") {
    return (
      <div className="space-y-4">
        <FormMessage tone="success">{message.text}</FormMessage>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setSubmitted(false);
            setMessage(null);
          }}
        >
          새 문의 작성
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {message ? <FormMessage tone={message.tone}>{message.text}</FormMessage> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="이름"
          required
          error={fieldErrors.name?.[0]}
        >
          <input
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="회사명" error={fieldErrors.company?.[0]}>
          <input
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="이메일" required error={fieldErrors.email?.[0]}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="연락처" required error={fieldErrors.phone?.[0]}>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
      </div>

      <Field label="문의 유형" required error={fieldErrors.inquiry_type?.[0]}>
        <select
          name="inquiry_type"
          value={values.inquiry_type}
          onChange={(e) => update("inquiry_type", e.target.value)}
          className={inputClass}
        >
          {INQUIRY_TYPE_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="제목" required error={fieldErrors.subject?.[0]}>
        <input
          name="subject"
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
          className={inputClass}
          required
        />
      </Field>

      <Field label="문의 내용" required error={fieldErrors.message?.[0]}>
        <textarea
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
          required
        />
      </Field>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          웹사이트
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          checked={values.privacy_consent}
          onChange={(e) => update("privacy_consent", e.target.checked)}
        />
        <span>
          <Link href="/privacy" className="text-brand-blue hover:underline">
            개인정보처리방침
          </Link>
          에 따라 상담 목적의 개인정보 수집·이용에 동의합니다. (필수)
          {fieldErrors.privacy_consent?.[0] ? (
            <span className="mt-1 block text-red-600">
              {fieldErrors.privacy_consent[0]}
            </span>
          ) : null}
        </span>
      </label>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "접수 중..." : "상담 신청하기"}
      </Button>
    </form>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-brand-navy outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-brand-navy">
      {label}
      {required ? <span className="text-brand-blue"> *</span> : null}
      {children}
      {error ? <span className="mt-1 block text-xs font-normal text-red-600">{error}</span> : null}
    </label>
  );
}
