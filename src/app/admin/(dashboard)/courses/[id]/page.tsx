import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseEditor } from "@/components/admin/CourseEditor";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "과정 수정",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCoursePage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const curriculum = Array.isArray(data.curriculum)
    ? (data.curriculum as string[])
    : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold">과정 수정</h1>
      <div className="mt-6">
        <CourseEditor
          initial={{
            id: data.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            target_audience: data.target_audience,
            curriculum,
            duration: data.duration,
            difficulty: data.difficulty,
            price: data.price,
            is_active: data.is_active,
          }}
        />
      </div>
    </div>
  );
}
