"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, BookOpen, FlaskConical, FileText, ClipboardCheck, Hash, File } from "lucide-react";
import type { SearchItem } from "@/lib/content";

const ICON = {
  module: BookOpen,
  topic: Hash,
  lab: FlaskConical,
  review: FileText,
  exam: ClipboardCheck,
  doc: File,
};

export default function Search({ index }: { index: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQ("");
      setActive(0);
    }
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return index.filter((i) => i.kind === "module").slice(0, 8);
    return index
      .filter((i) => (i.title + " " + i.sub).toLowerCase().includes(s))
      .slice(0, 12);
  }, [q, index]);

  function go(item: SearchItem) {
    setOpen(false);
    router.push(item.url);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full min-w-0 max-w-md text-sm text-muted bg-bg border border-line rounded-xl px-3 py-2 hover:border-accent/60"
      >
        <SearchIcon size={16} className="shrink-0" />
        <span className="flex-1 min-w-0 text-left truncate">ค้นหาบทเรียน หัวข้อ ใบงาน หรือศัพท์... (Ctrl+K)</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-[12vh] px-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-xl bg-card border border-line rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 border-b border-line">
              <SearchIcon size={18} className="text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
                  if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
                  if (e.key === "Enter" && results[active]) go(results[active]);
                }}
                placeholder="พิมพ์คำค้น เช่น เวกเตอร์, สแตก, Pygame, atan2"
                className="flex-1 bg-transparent py-3.5 outline-none text-[15px]"
              />
              <kbd className="text-xs text-muted border border-line rounded px-1.5 py-0.5">Esc</kbd>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto py-2">
              {results.length === 0 && <li className="px-4 py-6 text-center text-muted text-sm">ไม่พบผลลัพธ์</li>}
              {results.map((r, i) => {
                const Icon = ICON[r.kind];
                return (
                  <li key={r.url + r.title}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2.5 ${i === active ? "bg-accent-soft/50" : ""}`}
                    >
                      <Icon size={16} className="text-accent shrink-0" />
                      <span className="min-w-0">
                        <span className="block truncate text-[15px]">{r.title}</span>
                        <span className="block truncate text-xs text-muted">{r.sub}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
