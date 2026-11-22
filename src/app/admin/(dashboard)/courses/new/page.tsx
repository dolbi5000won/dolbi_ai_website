import type { Metadata } from "next";
import { CourseEditor } from "@/components/admin/CourseEditor";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "과정 등록",
};

export default async function NewCoursePage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-2xl font-semibold">과정 등록</h1>
      <div className="mt-6">
        <CourseEditor />
      </div>
    </div>
  );
}
