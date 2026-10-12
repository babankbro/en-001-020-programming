import type { ModuleMeta } from "@/content/types";
import SidebarNav from "./SidebarNav";

export default function Sidebar({ modules }: { modules: ModuleMeta[] }) {
  return (
    <aside className="hidden lg:block w-72 shrink-0 border-r border-line">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        <SidebarNav modules={modules} />
      </div>
    </aside>
  );
}
