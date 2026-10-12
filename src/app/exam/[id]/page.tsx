import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModule, getModuleIds } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import Quiz from "@/components/Quiz";

export function generateStaticParams() {
  return getModuleIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = getModule(id);
  return { title: m ? `แบบทดสอบบทที่ ${m.meta.week}: ${m.meta.title}` : "ไม่พบแบบทดสอบ" };
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = getModule(id);
  if (!data || data.quiz.length === 0) notFound();
  const { meta, quiz } = data;

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: `บทที่ ${meta.week}`, href: `/module/${id}` }, { label: "แบบทดสอบ" }]} />
      <Quiz moduleId={id} week={meta.week} title={meta.title} titleEn={meta.titleEn} minutes={meta.quiz.minutes} questions={quiz} />
    </div>
  );
}
