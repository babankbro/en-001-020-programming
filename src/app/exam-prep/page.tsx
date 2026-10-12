import type { Metadata } from "next";
import DocPage from "@/components/DocPage";
import { getDoc } from "@/lib/content";

export const metadata: Metadata = { title: "แนวทางเตรียมสอบ" };

export default function Page() {
  return <DocPage badge="เตรียมสอบ" title="แนวทางเตรียมสอบและแนวข้อสอบ" subtitle="อัตนัย 60 คะแนน · ปรนัย 40 ข้อ (ผิดหัก 0.2) · ใช้เครื่องคำนวณและโน้ตลายมือ 5 แผ่นได้" body={getDoc("exam-prep")} />;
}
