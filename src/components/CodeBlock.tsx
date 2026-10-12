"use client";

import { useRef, useState, type ReactNode, isValidElement } from "react";
import { Copy, Check } from "lucide-react";

/** กล่องโค้ดพร้อมป้ายภาษาและปุ่มคัดลอก */
export default function CodeBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  let lang = "";
  if (isValidElement<{ className?: string }>(children)) {
    const m = /language-(\w+)/.exec(children.props.className ?? "");
    if (m) lang = m[1];
  }

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 flex items-center gap-2 no-print">
        {lang && <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">{lang}</span>}
        <button
          onClick={copy}
          className="text-xs flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 text-slate-200 hover:bg-white/20"
          aria-label="คัดลอกโค้ด"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "คัดลอกแล้ว" : "คัดลอก"}
        </button>
      </div>
      <pre ref={ref}>{children}</pre>
    </div>
  );
}
