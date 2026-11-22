import type { Metadata } from "next";
import { InsightEditor } from "@/components/admin/InsightEditor";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "인사이트 등록",
};

export default async function NewInsightPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-2xl font-semibold">인사이트 등록</h1>
      <div className="mt-6">
        <InsightEditor />
      </div>
    </div>
  );
}
