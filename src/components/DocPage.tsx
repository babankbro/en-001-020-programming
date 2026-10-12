import { FileText } from "lucide-react";
import Markdown from "./Markdown";
import Breadcrumb from "./Breadcrumb";
import PrintButton from "./PrintButton";

/** เลย์เอาต์เอกสารรายวิชา (course-plan, assessment, exam-prep, calc-examples) */
export default function DocPage({ badge, title, subtitle, body }: { badge: string; title: string; subtitle?: string; body: string }) {
  return (
    <article className="max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: title }]} />
      <header className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs text-accent bg-accent-soft/50 rounded-full px-3 py-1">
          <FileText size={13} /> {badge}
        </span>
        <h1 className="text-3xl font-bold mt-3">{title}</h1>
        {subtitle && <p className="text-muted mt-1">{subtitle}</p>}
        <div className="mt-3">
          <PrintButton />
        </div>
      </header>
      <Markdown>{body}</Markdown>
    </article>
  );
}
