import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "프로젝트 수정",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold">프로젝트 수정</h1>
      <div className="mt-6">
        <ProjectEditor initial={data} />
      </div>
    </div>
  );
}
