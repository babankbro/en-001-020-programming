import type { Metadata } from "next";
import DocPage from "@/components/DocPage";
import { getDoc } from "@/lib/content";

export const metadata: Metadata = { title: "ตัวอย่างโจทย์คำนวณพร้อมวิธีทำ" };

export default function Page() {
  return <DocPage badge="เตรียมสอบ" title="ตัวอย่างโจทย์คำนวณพร้อมวิธีทำ" subtitle="โจทย์คณิตศาสตร์จากรหัสโปรแกรม จัดเป็นหมวด พร้อมวิธีทำทีละขั้น" body={getDoc("calc-examples")} />;
}
