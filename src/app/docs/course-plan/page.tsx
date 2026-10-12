import type { Metadata } from "next";
import DocPage from "@/components/DocPage";
import { getDoc } from "@/lib/content";

export const metadata: Metadata = { title: "แผนการสอนและผลลัพธ์การเรียนรู้ (CLO)" };

export default function Page() {
  return <DocPage badge="เอกสารรายวิชา" title="แผนการสอนและผลลัพธ์การเรียนรู้ (CLO)" subtitle="EN-001-020 การเขียนโปรแกรมและแก้ปัญหา" body={getDoc("course-plan")} />;
}
