import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: {
    default: "Admin | DOLBI",
    template: "%s | DOLBI Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-slate-50 text-brand-navy">{children}</div>
  );
}
