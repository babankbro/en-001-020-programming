import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { getModule, getModuleIds, getNeighbors } from "@/lib/content";
import Markdown from "@/components/Markdown";
import Breadcrumb from "@/components/Breadcrumb";
import ModuleActions from "@/components/ModuleActions";
import PrevNext from "@/components/PrevNext";
import PrintButton from "@/components/PrintButton";

export function generateStaticParams() {
  return getModuleIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = getModule(id);
  return { title: m ? `Review Sheet บทที่ ${m.meta.week}: ${m.meta.title}` : "ไม่พบเอกสาร" };
}

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = getModule(id);
  if (!data) notFound();
  const { meta, review } = data;
  const { prev, next } = getNeighbors(id);

  return (
    <article className="max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: `บทที่ ${meta.week}`, href: `/module/${id}` }, { label: "Review Sheet" }]} />
      <header className="mb-6 flex flex-wrap items-start gap-4">
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-500/10 rounded-full px-3 py-1">
            <FileText size={13} /> Review Sheet · สรุป 1 หน้า
          </span>
          <h1 className="text-3xl font-bold mt-3">
            บทที่ {meta.week}: {meta.title}
          </h1>
          <p className="text-muted">{meta.titleEn}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ModuleActions id={id} current="review" />
            <PrintButton />
          </div>
        </div>
      </header>

      <div className="border border-line rounded-2xl bg-card p-5 sm:p-8">
        <Markdown className="text-[0.98rem]">{review}</Markdown>
      </div>

      <PrevNext prev={prev} next={next} base="review" />
    </article>
  );
}
