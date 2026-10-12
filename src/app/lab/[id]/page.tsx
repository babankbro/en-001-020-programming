import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FlaskConical, Target, Wrench, Clock } from "lucide-react";
import { getModule, getModuleIds, getNeighbors } from "@/lib/content";
import Markdown from "@/components/Markdown";
import Breadcrumb from "@/components/Breadcrumb";
import ModuleActions from "@/components/ModuleActions";
import PrevNext from "@/components/PrevNext";

export function generateStaticParams() {
  return getModuleIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = getModule(id);
  return { title: m ? `Lab ${id}: ${m.meta.lab.title}` : "ไม่พบใบงาน" };
}

export default async function LabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = getModule(id);
  if (!data) notFound();
  const { meta, lab } = data;
  const { prev, next } = getNeighbors(id);

  return (
    <article className="max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: `บทที่ ${meta.week}`, href: `/module/${id}` }, { label: `Lab ${id}` }]} />
      <header className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 rounded-full px-3 py-1">
          <FlaskConical size={13} /> ใบงาน (Lab) · บทที่ {meta.week}
        </span>
        <h1 className="text-3xl font-bold mt-3">
          Lab {id}: {meta.lab.title}
        </h1>
        <p className="text-muted">
          {meta.titleEn} · {meta.clo.join(", ")}
        </p>
        <div className="mt-4">
          <ModuleActions id={id} current="lab" />
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4 mb-8 text-sm">
        <div className="border border-line rounded-2xl p-4 bg-card">
          <div className="font-bold flex items-center gap-1.5 mb-2">
            <Target size={16} className="text-accent" /> จุดประสงค์การทดลอง (Objectives)
          </div>
          <ul className="list-disc pl-4 space-y-1">
            {meta.lab.objectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
        <div className="border border-line rounded-2xl p-4 bg-card">
          <div className="font-bold flex items-center gap-1.5 mb-2">
            <Wrench size={16} className="text-accent" /> เครื่องมือที่ต้องใช้ (Prerequisites & Tools)
          </div>
          <ul className="list-disc pl-4 space-y-1">
            {meta.lab.tools.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
          <div className="mt-3 text-muted flex items-center gap-1.5">
            <Clock size={14} /> เวลาที่ใช้: {meta.lab.duration}
          </div>
        </div>
      </div>

      <Markdown>{lab}</Markdown>

      <div className="mt-10">
        <ModuleActions id={id} current="lab" />
      </div>
      <PrevNext prev={prev} next={next} base="lab" />
    </article>
  );
}
