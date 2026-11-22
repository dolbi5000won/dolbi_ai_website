import Link from "next/link";
import type { Course } from "@/lib/content/academy";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/academy/${course.slug}`}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-blue"
    >
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="font-medium text-brand-blue">{course.difficulty}</span>
        <span aria-hidden>·</span>
        <span>{course.duration}</span>
      </div>
      <h2 className="mt-3 text-xl font-semibold text-brand-navy transition-colors group-hover:text-brand-blue">
        {course.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {course.summary}
      </p>
      <p className="mt-5 text-sm text-slate-500">{course.targetAudience}</p>
      <span className="mt-4 text-sm font-medium text-brand-navy group-hover:text-brand-blue">
        과정 상세 보기 →
      </span>
    </Link>
  );
}
