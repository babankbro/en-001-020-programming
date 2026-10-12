import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Code2, ExternalLink, HelpCircle, ListChecks, Lightbulb } from "lucide-react";
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
  return { title: m ? `บทที่ ${m.meta.week}. ${m.meta.title}` : "ไม่พบบทเรียน" };
}

/** แยก markdown ออกเป็นส่วนนำ + หัวข้อ `## ` เพื่อใส่ id ให้สารบัญกระโดดได้ */
function splitSections(md: string): { intro: string; sections: string[] } {
  const parts = md.split(/\n(?=## )/);
  const intro = parts[0].startsWith("## ") ? "" : parts.shift() ?? "";
  return { intro, sections: parts };
}

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = getModule(id);
  if (!data) notFound();
  const { meta, module } = data;
  const { intro, sections } = splitSections(module);
  const { prev, next } = getNeighbors(id);

  return (
    <article className="max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: `บทที่ ${meta.week}` }]} />

      <header className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs text-accent bg-accent-soft/50 rounded-full px-3 py-1">
          <Code2 size={13} /> บทที่ {meta.week}
        </span>
        <h1 className="text-3xl font-bold mt-3">{meta.title}</h1>
        <p className="text-muted italic">{meta.titleEn}</p>
        <p className="mt-3">{meta.summary}</p>
        <div className="flex flex-wrap gap-1.5 mt-3 text-xs">
          {meta.clo.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded-md bg-accent-soft/50 text-accent font-medium">
              {c}
            </span>
          ))}
          {meta.tags.slice(0, 8).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md border border-line text-muted">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <ModuleActions id={id} current="module" />
        </div>
      </header>

      {meta.prereq.length > 0 && (
        <div className="callout callout-info text-sm mb-6">
          <span className="callout-title">
            <ExternalLink size={16} /> ทบทวนพื้นฐานจากรายวิชา EN-001-002 การโปรแกรมคอมพิวเตอร์
          </span>
          <ul className="list-disc pl-5 space-y-0.5">
            {meta.prereq.map((p) => (
              <li key={p.url}>
                <a href={p.url} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* สารบัญหัวข้อเชิงลึก */}
      <section className="border border-line rounded-2xl bg-card p-5 mb-6">
        <h2 className="font-bold mb-3">เนื้อหาเชิงลึกประจำบท (Deep Dive)</h2>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          {meta.topics.map((t, i) => (
            <li key={i}>
              <a href={`#topic-${i + 1}`} className="hover:text-accent">
                <span className="font-mono text-muted mr-2">{String(i + 1).padStart(2, "0")}.</span>
                {t}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="border border-line rounded-2xl p-4 md:col-span-3 bg-accent-soft/20">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <HelpCircle size={16} className="text-accent" /> คำถามนำ
          </div>
          <p>{meta.leadQuestion}</p>
        </div>
        <div className="border border-line rounded-2xl p-4 md:col-span-1">
          <div className="font-bold flex items-center gap-1.5 mb-2">
            <ListChecks size={16} className="text-accent" /> ผลลัพธ์การเรียนรู้ย่อย
          </div>
          <ul className="list-disc pl-4 space-y-1">
            {meta.outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
        <div className="border border-line rounded-2xl p-4 md:col-span-2">
          <div className="font-bold flex items-center gap-1.5 mb-2">
            <Lightbulb size={16} className="text-accent" /> แก่นความรู้ที่ต้องเข้าใจ
          </div>
          <ul className="list-disc pl-4 space-y-1">
            {meta.keyIdeas.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      </div>

      {intro && <Markdown>{intro}</Markdown>}
      {sections.map((s, i) => (
        <section key={i} id={`topic-${i + 1}`} className="scroll-mt-20">
          <Markdown>{s}</Markdown>
        </section>
      ))}

      <div className="mt-10">
        <ModuleActions id={id} current="module" />
      </div>
      <PrevNext prev={prev} next={next} base="module" />
    </article>
  );
}
