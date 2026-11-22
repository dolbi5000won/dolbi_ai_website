import type { Metadata } from "next";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "프로젝트 등록",
};

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-2xl font-semibold">프로젝트 등록</h1>
      <div className="mt-6">
        <ProjectEditor />
      </div>
    </div>
  );
}
