import fs from "node:fs";
import path from "node:path";
import type { ModuleContent, ModuleMeta, QuizQuestion } from "@/content/types";

const ROOT = path.join(process.cwd(), "src", "content");
const MODULES_DIR = path.join(ROOT, "modules");

function read(file: string): string {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

/** รายการบทเรียนทั้งหมด เรียงตามรหัส */
export function getModuleIds(): string[] {
  return fs
    .readdirSync(MODULES_DIR)
    .filter((d) => fs.existsSync(path.join(MODULES_DIR, d, "meta.json")))
    .sort();
}

export function getModuleMeta(id: string): ModuleMeta | null {
  const file = path.join(MODULES_DIR, id, "meta.json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(read(file)) as ModuleMeta;
}

export function getAllModuleMeta(): ModuleMeta[] {
  return getModuleIds()
    .map(getModuleMeta)
    .filter((m): m is ModuleMeta => m !== null);
}

export function getModule(id: string): ModuleContent | null {
  const meta = getModuleMeta(id);
  if (!meta) return null;
  const dir = path.join(MODULES_DIR, id);
  const quizRaw = read(path.join(dir, "quiz.json"));
  return {
    meta,
    module: read(path.join(dir, "module.md")),
    lab: read(path.join(dir, "lab.md")),
    review: read(path.join(dir, "review.md")),
    quiz: quizRaw ? (JSON.parse(quizRaw) as QuizQuestion[]) : [],
  };
}

/** เอกสารรายวิชา เช่น docs/course-plan.md */
export function getDoc(name: string): string {
  return read(path.join(ROOT, "docs", `${name}.md`));
}

/** บทก่อนหน้า/ถัดไป สำหรับปุ่มนำทางท้ายหน้า */
export function getNeighbors(id: string): { prev?: ModuleMeta; next?: ModuleMeta } {
  const all = getAllModuleMeta();
  const i = all.findIndex((m) => m.id === id);
  return { prev: i > 0 ? all[i - 1] : undefined, next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined };
}

export interface SearchItem {
  title: string;
  sub: string;
  url: string;
  kind: "module" | "topic" | "lab" | "review" | "exam" | "doc";
}

/** ดัชนีค้นหาแบบ static ส่งให้ client ใช้ใน Ctrl+K */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const m of getAllModuleMeta()) {
    const w = `บทที่ ${m.week}`;
    items.push({ title: `${m.title}`, sub: `${w} · ${m.titleEn}`, url: `/module/${m.id}`, kind: "module" });
    m.topics.forEach((t, i) =>
      items.push({ title: t, sub: `${w} · หัวข้อเชิงลึก ${i + 1}`, url: `/module/${m.id}#topic-${i + 1}`, kind: "topic" })
    );
    items.push({ title: `Lab ${m.id}: ${m.lab.title}`, sub: `${w} · ใบงาน`, url: `/lab/${m.id}`, kind: "lab" });
    items.push({ title: `Review Sheet บทที่ ${m.week}`, sub: `${m.title}`, url: `/review/${m.id}`, kind: "review" });
    items.push({ title: `แบบทดสอบบทที่ ${m.week}`, sub: `${m.title} · มีแนวข้อสอบปลายภาค`, url: `/exam/${m.id}`, kind: "exam" });
    m.tags.forEach((t) => items.push({ title: t, sub: `${w} · ${m.title}`, url: `/module/${m.id}`, kind: "topic" }));
  }
  items.push(
    { title: "แผนการสอนและผลลัพธ์การเรียนรู้ (CLO)", sub: "เอกสารรายวิชา", url: "/docs/course-plan", kind: "doc" },
    { title: "การวัดและประเมินผล", sub: "เอกสารรายวิชา", url: "/docs/assessment", kind: "doc" },
    { title: "แนวทางเตรียมสอบ", sub: "รูปแบบข้อสอบ · แผนอ่าน · สูตรที่ต้องจำ", url: "/exam-prep", kind: "doc" },
    { title: "ตัวอย่างโจทย์คำนวณพร้อมวิธีทำ", sub: "เวกเตอร์ เมทริกซ์ มุม แรงเสียดทาน การชน", url: "/calc-examples", kind: "doc" }
  );
  return items;
}
