"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAction } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ApplicationStatus,
  InquiryStatus,
} from "@/lib/supabase/types";
import { z } from "zod";

type ActionOk = { ok: true };
type ActionErr = { ok: false; message: string };
type ActionResult = ActionOk | ActionErr;

const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "슬러그 형식이 올바르지 않습니다.");

async function adminClient() {
  await requireAdminAction();
  return createSupabaseServerClient();
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): Promise<ActionResult> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);
    if (error) return { ok: false, message: "상태 변경에 실패했습니다." };
    revalidatePath("/admin/inquiries");
    return { ok: true };
  } catch {
    return { ok: false, message: "권한이 없습니다." };
  }
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<ActionResult> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase
      .from("course_applications")
      .update({ status })
      .eq("id", id);
    if (error) return { ok: false, message: "상태 변경에 실패했습니다." };
    revalidatePath("/admin/applications");
    return { ok: true };
  } catch {
    return { ok: false, message: "권한이 없습니다." };
  }
}

const courseSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  description: z.string().trim().min(1),
  target_audience: z.string().trim().min(1),
  curriculumText: z.string().trim().min(1),
  duration: z.string().trim().min(1),
  difficulty: z.enum(["입문", "중급", "실전", "맞춤"]),
  price: z.string().trim().optional(),
  is_active: z.boolean(),
});

export async function saveCourse(raw: unknown): Promise<ActionResult> {
  try {
    const parsed = courseSchema.safeParse(raw);
    if (!parsed.success) {
      return { ok: false, message: "입력값을 확인해 주세요." };
    }
    const data = parsed.data;
    const curriculum = data.curriculumText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const price =
      data.price && data.price.length > 0 ? Number(data.price) : null;
    if (price !== null && (!Number.isInteger(price) || price < 0)) {
      return { ok: false, message: "가격은 0 이상의 정수(원)여야 합니다." };
    }

    const supabase = await adminClient();
    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      target_audience: data.target_audience,
      curriculum,
      duration: data.duration,
      difficulty: data.difficulty,
      price,
      is_active: data.is_active,
    };

    const { error } = data.id
      ? await supabase.from("courses").update(payload).eq("id", data.id)
      : await supabase.from("courses").insert(payload);

    if (error) return { ok: false, message: "과정 저장에 실패했습니다." };
    revalidatePath("/admin/courses");
    revalidatePath("/academy");
    return { ok: true };
  } catch {
    return { ok: false, message: "권한이 없습니다." };
  }
}

const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  category: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  problem: z.string().trim().min(1),
  solution: z.string().trim().min(1),
  technologiesText: z.string().trim().min(1),
  content: z.string().trim().min(1),
  thumbnail: z.string().trim().optional(),
  is_published: z.boolean(),
});

export async function saveProject(raw: unknown): Promise<ActionResult> {
  try {
    const parsed = projectSchema.safeParse(raw);
    if (!parsed.success) {
      return { ok: false, message: "입력값을 확인해 주세요." };
    }
    const data = parsed.data;
    const technologies = data.technologiesText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const supabase = await adminClient();
    const payload = {
      title: data.title,
      slug: data.slug,
      category: data.category,
      summary: data.summary,
      problem: data.problem,
      solution: data.solution,
      technologies,
      content: data.content,
      thumbnail: data.thumbnail || null,
      is_published: data.is_published,
    };

    const { error } = data.id
      ? await supabase.from("projects").update(payload).eq("id", data.id)
      : await supabase.from("projects").insert(payload);

    if (error) return { ok: false, message: "프로젝트 저장에 실패했습니다." };
    revalidatePath("/admin/projects");
    revalidatePath("/project");
    return { ok: true };
  } catch {
    return { ok: false, message: "권한이 없습니다." };
  }
}

const insightSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  category: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  content: z.string().trim().min(1),
  thumbnail: z.string().trim().optional(),
  is_published: z.boolean(),
});

export async function saveInsight(raw: unknown): Promise<ActionResult> {
  try {
    const parsed = insightSchema.safeParse(raw);
    if (!parsed.success) {
      return { ok: false, message: "입력값을 확인해 주세요." };
    }
    const data = parsed.data;
    const supabase = await adminClient();
    const payload = {
      title: data.title,
      slug: data.slug,
      category: data.category,
      summary: data.summary,
      content: data.content,
      thumbnail: data.thumbnail || null,
      is_published: data.is_published,
    };

    const { error } = data.id
      ? await supabase.from("insights").update(payload).eq("id", data.id)
      : await supabase.from("insights").insert(payload);

    if (error) return { ok: false, message: "인사이트 저장에 실패했습니다." };
    revalidatePath("/admin/insights");
    revalidatePath("/insight");
    return { ok: true };
  } catch {
    return { ok: false, message: "권한이 없습니다." };
  }
}
