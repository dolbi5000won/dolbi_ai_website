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
import { courseApplicationSchema } from "@/lib/validation/course-application";

async function clientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function submitCourseApplication(
  raw: unknown,
): Promise<ActionResult> {
  const parsed = courseApplicationSchema.safeParse(raw);
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
        "교육 신청 시스템이 아직 연결되지 않았습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  const rateKey = `course:${await clientIp()}:${data.email.toLowerCase()}`;
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

    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, title, slug, is_active")
      .eq("slug", data.course_slug)
      .maybeSingle();

    if (courseError) {
      console.error("[course-application] course lookup failed");
      return {
        ok: false,
        code: "server",
        message: "잠시 후 다시 시도해 주세요.",
      };
    }

    if (!course || !course.is_active) {
      return {
        ok: false,
        code: "not_found",
        message: "선택한 교육 과정을 찾을 수 없습니다.",
      };
    }

    const since = new Date(
      Date.now() - DUPLICATE_WINDOW_MINUTES * 60 * 1000,
    ).toISOString();

    const { data: recent, error: recentError } = await supabase
      .from("course_applications")
      .select("id")
      .eq("email", data.email.toLowerCase())
      .eq("course_id", course.id)
      .gte("created_at", since)
      .limit(1);

    if (recentError) {
      console.error("[course-application] duplicate check failed");
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
        message: `같은 과정 신청이 최근 ${DUPLICATE_WINDOW_MINUTES}분 내에 접수되었습니다.`,
      };
    }

    const { data: inserted, error: insertError } = await supabase
      .from("course_applications")
      .insert({
        course_id: course.id,
        applicant_name: data.applicant_name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        company: data.company ? data.company : null,
        participant_count: data.participant_count,
        preferred_date: data.preferred_date ? data.preferred_date : null,
        message: data.message ? data.message : null,
        privacy_consent: true,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("[course-application] insert failed");
      return {
        ok: false,
        code: "server",
        message: "신청에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    const safe = {
      name: escapeHtml(data.applicant_name),
      company: escapeHtml(data.company || "-"),
      email: escapeHtml(data.email),
      phone: escapeHtml(data.phone),
      course: escapeHtml(course.title),
      count: String(data.participant_count),
      date: escapeHtml(data.preferred_date || "-"),
      message: escapeHtml(data.message || "-").replaceAll("\n", "<br />"),
    };

    const mail = await sendAdminAndApplicantMails({
      adminSubject: `[DOLBI] 교육 신청 — ${course.title}`,
      adminText: `교육 신청\n과정: ${course.title}\n이름: ${data.applicant_name}\n회사: ${data.company || "-"}\n이메일: ${data.email}\n연락처: ${data.phone}\n인원: ${data.participant_count}\n희망일: ${data.preferred_date || "-"}\n메시지:\n${data.message || "-"}`,
      adminHtml: `<h2>교육 신청</h2><p>과정: ${safe.course}</p><p>이름: ${safe.name}</p><p>회사: ${safe.company}</p><p>이메일: ${safe.email}</p><p>연락처: ${safe.phone}</p><p>인원: ${safe.count}</p><p>희망일: ${safe.date}</p><p>${safe.message}</p>`,
      applicantEmail: data.email,
      applicantSubject: `[DOLBI] ${course.title} 신청이 접수되었습니다`,
      applicantText: `${data.applicant_name}님, ${course.title} 신청이 접수되었습니다.\n담당자가 확인 후 안내드리겠습니다.`,
      applicantHtml: `<p>${safe.name}님, <strong>${safe.course}</strong> 신청이 접수되었습니다.</p><p>담당자가 확인 후 안내드리겠습니다.</p><p>DOLBI</p>`,
    });

    const emailStatus =
      mail.admin.sent && mail.applicant.sent
        ? "sent"
        : mail.admin.sent || mail.applicant.sent
          ? "partial"
          : "skipped";

    return { ok: true, id: inserted.id, emailStatus };
  } catch (error) {
    console.error("[course-application] unexpected", error);
    return {
      ok: false,
      code: "server",
      message: "잠시 후 다시 시도해 주세요.",
    };
  }
}
