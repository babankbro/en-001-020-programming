import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="text-sm text-muted flex flex-wrap items-center gap-1.5 mb-4 no-print">
      <Link href="/" className="hover:text-accent">
        หน้าหลัก
      </Link>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span>/</span>
          {it.href ? (
            <Link href={it.href} className="hover:text-accent">
              {it.label}
            </Link>
          ) : (
            <span className="text-fg">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
