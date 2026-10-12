"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SidebarNav from "./SidebarNav";
import type { ModuleMeta } from "@/content/types";

/** เมนูสำหรับจอเล็ก (เปิดเป็น drawer จากซ้าย) */
export default function MobileNav({ modules }: { modules: ModuleMeta[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="เปิดเมนู" className="lg:hidden w-9 h-9 grid place-items-center rounded-lg border border-line">
        <Menu size={18} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card border-r border-line p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-2">
              <button onClick={() => setOpen(false)} aria-label="ปิดเมนู" className="w-9 h-9 grid place-items-center rounded-lg border border-line">
                <X size={18} />
              </button>
            </div>
            <SidebarNav modules={modules} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
