import Link from "next/link";
import type { Course } from "@/lib/content/academy";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/academy/${course.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_24px_60px_-30px_rgba(16,29,53,0.3)]"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-brand-blue">
          {course.difficulty}
        </span>
        <span className="rounded-full bg-surface px-3 py-1 text-slate-600">
          {course.duration}
        </span>
      </div>
      <h2 className="mt-5 text-xl font-bold tracking-tight text-brand-navy transition-colors group-hover:text-brand-blue">
        {course.title}
      </h2>
      <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
        {course.summary}
      </p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
        <p className="text-sm text-slate-500">{course.targetAudience}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-blue">
          <ArrowIcon />
        </span>
      </div>
      <span className="sr-only">과정 상세 보기</span>
    </Link>
  );
}
