import type { Metadata } from "next";
import DocPage from "@/components/DocPage";
import { getDoc } from "@/lib/content";

export const metadata: Metadata = { title: "การวัดและประเมินผล" };

export default function Page() {
  return <DocPage badge="เอกสารรายวิชา" title="การวัดและประเมินผล" subtitle="สัดส่วนคะแนน · เกณฑ์ตัดเกรด · Rubric" body={getDoc("assessment")} />;
}
