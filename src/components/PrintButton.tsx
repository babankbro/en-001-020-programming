"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-line hover:bg-accent-soft/40 no-print">
      <Printer size={15} /> พิมพ์ / บันทึก PDF
    </button>
  );
}
