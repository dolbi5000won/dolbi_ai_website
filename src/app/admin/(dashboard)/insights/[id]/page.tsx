import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightEditor } from "@/components/admin/InsightEditor";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "인사이트 수정",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditInsightPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("insights")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold">인사이트 수정</h1>
      <div className="mt-6">
        <InsightEditor initial={data} />
      </div>
    </div>
  );
}
