import Link from "next/link";
import { BookOpen, FlaskConical, FileText, ClipboardCheck } from "lucide-react";

/** ปุ่มลัดไป เนื้อหา / ใบงาน / Review / Quiz ของบทเดียวกัน */
export default function ModuleActions({ id, current }: { id: string; current: "module" | "lab" | "review" | "exam" }) {
  const items = [
    { key: "module", href: `/module/${id}`, label: "เนื้อหาบทเรียน", icon: BookOpen, cls: "text-blue-700 bg-blue-500/10 border-blue-300/60 dark:text-blue-300" },
    { key: "lab", href: `/lab/${id}`, label: `ใบงาน Lab ${id}`, icon: FlaskConical, cls: "text-emerald-700 bg-emerald-500/10 border-emerald-300/60 dark:text-emerald-300" },
    { key: "review", href: `/review/${id}`, label: "Review Sheet", icon: FileText, cls: "text-amber-700 bg-amber-500/10 border-amber-300/60 dark:text-amber-300" },
    { key: "exam", href: `/exam/${id}`, label: "ทำแบบทดสอบ", icon: ClipboardCheck, cls: "text-white bg-violet-600 border-violet-600" },
  ] as const;
  return (
    <div className="flex flex-wrap gap-2 no-print">
      {items
        .filter((i) => i.key !== current)
        .map(({ key, href, label, icon: Icon, cls }) => (
          <Link key={key} href={href} className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border ${cls} hover:opacity-90`}>
            <Icon size={15} /> {label}
          </Link>
        ))}
    </div>
  );
}
