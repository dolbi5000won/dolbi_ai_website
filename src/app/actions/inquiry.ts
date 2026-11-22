"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  DUPLICATE_WINDOW_MINUTES,
  checkRateLimit,
} from "@/lib/security/rate-limit";
import {
  escapeHtml,
  sendAdminAndApplicantMails,
} from "@/lib/email/resend";
import type { ActionResult } from "@/lib/actions/types";
import {
  INQUIRY_TYPE_OPTIONS,
  inquirySchema,
} from "@/lib/validation/inquiry";

function labelForType(value: string) {
  return (
    INQUIRY_TYPE_OPTIONS.find((item) => item.value === value)?.label ?? value
  );
}

async function clientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function submitInquiry(raw: unknown): Promise<ActionResult> {
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      code: "validation",
      message: "입력값을 확인해 주세요.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  if (data.website) {
    return { ok: false, code: "validation", message: "요청을 처리할 수 없습니다." };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      code: "not_configured",
      message:
        "상담 접수 시스템이 아직 연결되지 않았습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  const rateKey = `inquiry:${await clientIp()}:${data.email.toLowerCase()}`;
  const rate = checkRateLimit(rateKey);
  if (!rate.ok) {
    return {
      ok: false,
      code: "rate_limit",
      message: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  try {
    const supabase = createAdminClient();
    const since = new Date(
      Date.now() - DUPLICATE_WINDOW_MINUTES * 60 * 1000,
    ).toISOString();

    const { data: recent, error: recentError } = await supabase
      .from("inquiries")
      .select("id")
      .eq("email", data.email.toLowerCase())
      .eq("inquiry_type", data.inquiry_type)
      .gte("created_at", since)
      .limit(1);

    if (recentError) {
      console.error("[inquiry] duplicate check failed");
      return {
        ok: false,
        code: "server",
        message: "잠시 후 다시 시도해 주세요.",
      };
    }

    if (recent && recent.length > 0) {
      return {
        ok: false,
        code: "duplicate",
        message: `같은 내용의 상담이 최근 ${DUPLICATE_WINDOW_MINUTES}분 내에 접수되었습니다.`,
      };
    }

    const { data: inserted, error: insertError } = await supabase
      .from("inquiries")
      .insert({
        name: data.name,
        company: data.company ? data.company : null,
        email: data.email.toLowerCase(),
        phone: data.phone,
        inquiry_type: data.inquiry_type,
        subject: data.subject,
        message: data.message,
        privacy_consent: true,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("[inquiry] insert failed");
      return {
        ok: false,
        code: "server",
        message: "접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    const typeLabel = labelForType(data.inquiry_type);
    const safe = {
      name: escapeHtml(data.name),
      company: escapeHtml(data.company || "-"),
      email: escapeHtml(data.email),
      phone: escapeHtml(data.phone),
      type: escapeHtml(typeLabel),
      subject: escapeHtml(data.subject),
      message: escapeHtml(data.message).replaceAll("\n", "<br />"),
    };

    const mail = await sendAdminAndApplicantMails({
      adminSubject: `[DOLBI] 상담 신청 — ${data.subject}`,
      adminText: `상담 신청\n유형: ${typeLabel}\n이름: ${data.name}\n회사: ${data.company || "-"}\n이메일: ${data.email}\n연락처: ${data.phone}\n제목: ${data.subject}\n내용:\n${data.message}`,
      adminHtml: `<h2>상담 신청</h2><p>유형: ${safe.type}</p><p>이름: ${safe.name}</p><p>회사: ${safe.company}</p><p>이메일: ${safe.email}</p><p>연락처: ${safe.phone}</p><p>제목: ${safe.subject}</p><p>${safe.message}</p>`,
      applicantEmail: data.email,
      applicantSubject: "[DOLBI] 상담 신청이 접수되었습니다",
      applicantText: `${data.name}님, 상담 신청이 접수되었습니다.\n제목: ${data.subject}\n담당자가 확인 후 연락드리겠습니다.`,
      applicantHtml: `<p>${safe.name}님, 상담 신청이 접수되었습니다.</p><p>제목: ${safe.subject}</p><p>담당자가 확인 후 연락드리겠습니다.</p><p>DOLBI</p>`,
    });

    const emailStatus =
      mail.admin.sent && mail.applicant.sent
        ? "sent"
        : mail.admin.sent || mail.applicant.sent
          ? "partial"
          : "skipped";

    return { ok: true, id: inserted.id, emailStatus };
  } catch (error) {
    console.error("[inquiry] unexpected", error);
    return {
      ok: false,
      code: "server",
      message: "잠시 후 다시 시도해 주세요.",
    };
  }
}
