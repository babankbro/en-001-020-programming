"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Target, ClipboardList, GraduationCap, Calculator, BookOpen } from "lucide-react";
import type { ModuleMeta } from "@/content/types";

const DOCS = [
  { href: "/", label: "ภาพรวมรายวิชา", icon: Home },
  { href: "/docs/course-plan", label: "แผนการสอนและ CLO", icon: Target },
  { href: "/docs/assessment", label: "การวัดและประเมินผล", icon: ClipboardList },
  { href: "/exam-prep", label: "แนวทางเตรียมสอบ", icon: GraduationCap },
  { href: "/calc-examples", label: "ตัวอย่างโจทย์คำนวณ", icon: Calculator },
];

export default function SidebarNav({ modules, onNavigate }: { modules: ModuleMeta[]; onNavigate?: () => void }) {
  const path = usePathname();
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const moduleActive = (id: string) => /^\/(module|lab|review|exam)\/(\d+)/.exec(path)?.[2] === id;

  return (
    <nav className="text-sm">
      <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">เอกสารรายวิชา</div>
      <ul className="space-y-0.5 mb-6">
        {DOCS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-accent-soft/40 ${isActive(href) ? "bg-accent-soft/60 text-accent font-semibold" : ""}`}
            >
              <Icon size={15} /> {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 flex items-center gap-1.5">
        <BookOpen size={13} /> บทเรียน ({modules.length} บท)
      </div>
      <ul className="space-y-0.5">
        {modules.map((m) => (
          <li key={m.id}>
            <Link
              href={`/module/${m.id}`}
              onClick={onNavigate}
              className={`block px-2.5 py-1.5 rounded-lg hover:bg-accent-soft/40 leading-snug ${moduleActive(m.id) ? "bg-accent-soft/60 text-accent font-semibold" : ""}`}
            >
              <span className="font-mono text-xs text-muted mr-1.5">{m.id}</span>
              {m.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
