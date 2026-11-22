import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth/admin";

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-full flex-col">
      <AdminNav email={admin.email} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">
        {children}
      </main>
    </div>
  );
}
