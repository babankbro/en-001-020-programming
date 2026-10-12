import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import { Info, Lightbulb, AlertTriangle, OctagonAlert, HelpCircle, CheckCircle2, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";

type CalloutKind = "info" | "tip" | "warning" | "danger" | "question" | "success" | "note" | "important" | "abstract" | "bug";

const KIND_MAP: Record<CalloutKind, { cls: string; icon: ReactNode; label: string }> = {
  info: { cls: "callout-info", icon: <Info size={17} />, label: "ข้อมูล" },
  note: { cls: "callout-info", icon: <Info size={17} />, label: "หมายเหตุ" },
  abstract: { cls: "callout-info", icon: <Info size={17} />, label: "สาระสำคัญ" },
  tip: { cls: "callout-tip", icon: <Lightbulb size={17} />, label: "เคล็ดลับ" },
  important: { cls: "callout-warning", icon: <AlertTriangle size={17} />, label: "สำคัญ" },
  warning: { cls: "callout-warning", icon: <AlertTriangle size={17} />, label: "ข้อควรระวัง" },
  danger: { cls: "callout-danger", icon: <OctagonAlert size={17} />, label: "อันตราย" },
  bug: { cls: "callout-danger", icon: <OctagonAlert size={17} />, label: "จุดที่ต้องระวัง" },
  question: { cls: "callout-question", icon: <HelpCircle size={17} />, label: "ฝึกทำ" },
  success: { cls: "callout-success", icon: <CheckCircle2 size={17} />, label: "เฉลย" },
};

/**
 * แปลง blockquote รูปแบบ Obsidian callout
 *   > [!tip] หัวข้อ
 *   > เนื้อหา
 * ถ้าชนิดเป็น question/success หรือมีเครื่องหมาย - หลัง ] จะพับได้ (details)
 */
function parseCallout(children: ReactNode): { kind: CalloutKind; title: string; collapsible: boolean; rest: ReactNode[] } | null {
  const arr = Array.isArray(children) ? children : [children];
  const first = arr.find((c) => c && typeof c === "object" && "props" in (c as object)) as
    | { props: { children?: ReactNode } }
    | undefined;
  if (!first) return null;
  const pchildren = first.props?.children;
  const inner = Array.isArray(pchildren) ? pchildren : [pchildren];
  const head = inner[0];
  if (typeof head !== "string") return null;
  const m = /^\[!(\w+)\](-?)\s*([^\n]*)\n?([\s\S]*)$/.exec(head);
  if (!m) return null;
  const kind = (m[1].toLowerCase() as CalloutKind) in KIND_MAP ? (m[1].toLowerCase() as CalloutKind) : "info";
  const collapsible = m[2] === "-" || kind === "question" || kind === "success";
  const title = m[3].trim();
  // เนื้อหาที่เหลือใน paragraph แรก + paragraph อื่น ๆ
  const firstRest: ReactNode[] = [];
  if (m[4]) firstRest.push(m[4]);
  firstRest.push(...inner.slice(1));
  const restParas = arr.slice(arr.indexOf(first as ReactNode) + 1);
  const rest: ReactNode[] = [];
  if (firstRest.some((x) => (typeof x === "string" ? x.trim() : x))) rest.push(<p key="p0">{firstRest}</p>);
  rest.push(...restParas);
  return { kind, title, collapsible, rest };
}

const components: Components = {
  blockquote({ children }) {
    const c = parseCallout(children);
    if (!c) return <blockquote>{children}</blockquote>;
    const { cls, icon, label } = KIND_MAP[c.kind];
    const titleNode = (
      <span className="callout-title">
        {c.collapsible && <ChevronRight size={16} className="chev" />}
        {icon}
        <span>{c.title || label}</span>
      </span>
    );
    if (c.collapsible) {
      return (
        <details className={`callout ${cls}`}>
          <summary>{titleNode}</summary>
          {c.rest}
        </details>
      );
    }
    return (
      <div className={`callout ${cls}`}>
        {titleNode}
        {c.rest}
      </div>
    );
  },
  pre({ children }) {
    return <CodeBlock>{children}</CodeBlock>;
  },
  a({ href, children }) {
    const external = href?.startsWith("http");
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  },
};

/** remark-math ถือว่า `$$x$$` บนบรรทัดเดียวเป็น inline จึงแยกเป็นบล็อกให้แสดงแบบ display (รวมใน callout ที่ขึ้นต้นด้วย >) */
function normalizeDisplayMath(md: string): string {
  return md.replace(/^((?:>\s?)*)\$\$(.+?)\$\$\s*$/gm, (_m, q: string, body: string) => `${q}$$\n${q}${body.trim()}\n${q}$$`);
}

export default function Markdown({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`prose ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeSlug]} components={components}>
        {normalizeDisplayMath(children)}
      </ReactMarkdown>
    </div>
  );
}
