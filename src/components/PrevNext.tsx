import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ModuleMeta } from "@/content/types";

export default function PrevNext({ prev, next, base }: { prev?: ModuleMeta; next?: ModuleMeta; base: "module" | "lab" | "review" | "exam" }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-10 no-print">
      {prev ? (
        <Link href={`/${base}/${prev.id}`} className="border border-line rounded-xl p-4 hover:border-accent/60 flex items-center gap-3">
          <ArrowLeft size={18} className="text-muted shrink-0" />
          <span className="min-w-0">
            <span className="block text-xs text-muted">บทก่อนหน้า</span>
            <span className="block truncate font-medium">
              {prev.id} {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={`/${base}/${next.id}`} className="border border-line rounded-xl p-4 hover:border-accent/60 flex items-center gap-3 text-right sm:justify-end">
          <span className="min-w-0">
            <span className="block text-xs text-muted">บทถัดไป</span>
            <span className="block truncate font-medium">
              {next.id} {next.title}
            </span>
          </span>
          <ArrowRight size={18} className="text-muted shrink-0" />
        </Link>
      )}
    </div>
  );
}
