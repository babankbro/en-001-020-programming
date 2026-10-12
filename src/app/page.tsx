import Link from "next/link";
import { GraduationCap, BookOpen, FlaskConical, FileText, ClipboardCheck, Target, ClipboardList, Calculator, ArrowRight, ExternalLink, Gamepad2 } from "lucide-react";
import { COURSE } from "@/content/types";
import { getAllModuleMeta } from "@/lib/content";

export default function Home() {
  const modules = getAllModuleMeta();
  const topicCount = modules.reduce((s, m) => s + m.topics.length, 0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <section className="mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs text-accent bg-accent-soft/50 rounded-full px-3 py-1">
          <GraduationCap size={13} /> สื่อการสอนออนไลน์ · {COURSE.term} · {COURSE.credit}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 leading-tight">
          {COURSE.code} {COURSE.titleEn}
          <span className="block text-2xl sm:text-3xl mt-1">{COURSE.title}</span>
        </h1>
        <p className="text-muted mt-4">จัดทำโดย</p>
        <p className="text-xl font-bold">{COURSE.instructor}</p>
        <p className="text-sm text-muted">{COURSE.department}</p>
        <p className="mt-4 leading-relaxed">{COURSE.description}</p>
        <p className="mt-3 text-sm text-muted">
          รายวิชานี้ต่อยอดจาก{" "}
          <a href={COURSE.prereqCourse.url} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2 inline-flex items-center gap-1">
            {COURSE.prereqCourse.code} {COURSE.prereqCourse.title} <ExternalLink size={12} />
          </a>{" "}
          — แต่ละบทมีลิงก์ทบทวนพื้นฐานที่เกี่ยวข้องให้
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Stat icon={<BookOpen size={18} />} big={`${modules.length} บทเรียน`} small={`${topicCount} หัวข้อเชิงลึก`} />
        <Stat icon={<FlaskConical size={18} />} big={`${modules.length} ใบงาน`} small="สร้างเกมทีละขั้น" />
        <Stat icon={<FileText size={18} />} big={`${modules.length} Review Sheet`} small="สรุป 1 หน้าต่อบท" />
        <Stat icon={<ClipboardCheck size={18} />} big={`${modules.length} แบบทดสอบ`} small="Quiz 25 ข้อ + แนวข้อสอบปลายภาค" />
      </section>

      {/* Docs cards */}
      <section className="grid md:grid-cols-2 gap-3 mb-10">
        <DocCard href="/docs/course-plan" icon={<Target size={22} />} color="bg-amber-400/15 text-amber-700 dark:text-amber-300" title="แผนการสอนและผลลัพธ์การเรียนรู้ (CLO)" desc="CLO · ความสอดคล้อง PLO · รูปแบบคาบเรียน" />
        <DocCard href="/docs/assessment" icon={<ClipboardList size={22} />} color="bg-sky-400/15 text-sky-700 dark:text-sky-300" title="การวัดและประเมินผล" desc="สัดส่วนคะแนน · เกณฑ์ตัดเกรด · Rubric ใบงานและโครงงาน" />
        <DocCard href="/exam-prep" icon={<GraduationCap size={22} />} color="bg-violet-400/15 text-violet-700 dark:text-violet-300" title="แนวทางเตรียมสอบ" desc="รูปแบบข้อสอบ อัตนัย 60 + ปรนัย 40 · กลยุทธ์หักคะแนน · โน้ต 5 แผ่น · สูตรที่ต้องจำ" />
        <DocCard href="/calc-examples" icon={<Calculator size={22} />} color="bg-emerald-400/15 text-emerald-700 dark:text-emerald-300" title="ตัวอย่างโจทย์คำนวณพร้อมวิธีทำ" desc="เวกเตอร์ เมทริกซ์ การหมุน atan2 แรงเสียดทาน การชน และกริด" />
      </section>

      {/* Project path */}
      <section className="mb-10 border border-line rounded-2xl p-5 bg-card">
        <h2 className="font-bold text-lg flex items-center gap-2 mb-3">
          <Gamepad2 size={20} className="text-accent" /> เส้นทางโครงงาน: เกมยิงยานอวกาศ (Space Shooter)
        </h2>
        <div className="grid sm:grid-cols-4 gap-3 text-sm">
          <Phase w="บท 1–2" t="พื้นฐานไพทอน" d="ตัวแปร ฟังก์ชัน การวนซ้ำ เวกเตอร์" />
          <Phase w="บท 3–4" t="ข้อมูลและโครงสร้าง" d="ลิสต์ ตาราง สแตก แผนภูมิ" />
          <Phase w="บท 5–6" t="Pygame และคณิตศาสตร์" d="ลูกบอลเด้ง คลาส เมทริกซ์ การหมุน ยาน" />
          <Phase w="บท 7–8" t="เกมสมบูรณ์" d="ศัตรูไล่ตาม กระสุน การชน กริด" />
        </div>
      </section>

      {/* Modules */}
      <section>
        <h2 className="font-bold text-xl mb-4">บทเรียนทั้งหมด ({modules.length} บท)</h2>
        <div className="space-y-3">
          {modules.map((m) => (
            <article key={m.id} className="border border-line rounded-2xl bg-card p-5 hover:border-accent/50 transition">
              <div className="flex gap-4">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-accent text-white grid place-items-center font-bold text-lg">{m.id}</div>
                <div className="flex-1 min-w-0">
                  <Link href={`/module/${m.id}`} className="font-bold text-lg hover:text-accent">
                    {m.title}
                  </Link>
                  <div className="text-xs text-muted">
                    บทที่ {m.week} · {m.clo.join(", ")}
                  </div>
                  <div className="text-sm text-muted italic">{m.titleEn}</div>
                  <p className="text-sm mt-2">{m.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    <span className="text-muted self-center">{m.topics.length} หัวข้อเชิงลึก</span>
                    <Pill href={`/module/${m.id}`} cls="text-blue-700 bg-blue-500/10 dark:text-blue-300">เนื้อหา</Pill>
                    <Pill href={`/lab/${m.id}`} cls="text-emerald-700 bg-emerald-500/10 dark:text-emerald-300">Lab {m.id}</Pill>
                    <Pill href={`/review/${m.id}`} cls="text-amber-700 bg-amber-500/10 dark:text-amber-300">Review</Pill>
                    <Pill href={`/exam/${m.id}`} cls="text-violet-700 bg-violet-500/10 dark:text-violet-300">Quiz</Pill>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 text-sm">
        <h2 className="font-bold text-lg mb-2">ตำราและแหล่งอ้างอิงหลัก</h2>
        <ul className="list-disc pl-5 space-y-1 text-muted">
          <li>Zelle, J. M. <i>Python Programming: An Introduction to Computer Science</i> (3rd ed.). Franklin, Beedle & Associates, 2016.</li>
          <li>Sweigart, A. <i>Invent Your Own Computer Games with Python</i> (4th ed.). No Starch Press, 2016.</li>
          <li>Pygame Documentation — https://www.pygame.org/docs/</li>
          <li>NumPy User Guide — https://numpy.org/doc/stable/user/</li>
          <li>
            เว็บรายวิชาพื้นฐาน {COURSE.prereqCourse.code} {COURSE.prereqCourse.title} — {COURSE.prereqCourse.url}
          </li>
        </ul>
      </section>
    </div>
  );
}

function Stat({ icon, big, small }: { icon: React.ReactNode; big: string; small: string }) {
  return (
    <div className="border border-line rounded-xl bg-card p-4 flex items-center gap-3">
      <span className="text-accent">{icon}</span>
      <span>
        <span className="block font-bold">{big}</span>
        <span className="block text-xs text-muted">{small}</span>
      </span>
    </div>
  );
}

function DocCard({ href, icon, color, title, desc }: { href: string; icon: React.ReactNode; color: string; title: string; desc: string }) {
  return (
    <Link href={href} className="border border-line rounded-2xl bg-card p-4 flex items-center gap-4 hover:border-accent/60">
      <span className={`shrink-0 w-12 h-12 rounded-xl grid place-items-center ${color}`}>{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block font-bold">{title}</span>
        <span className="block text-sm text-muted">{desc}</span>
      </span>
      <ArrowRight size={18} className="text-muted shrink-0" />
    </Link>
  );
}

function Phase({ w, t, d }: { w: string; t: string; d: string }) {
  return (
    <div className="border border-line rounded-xl p-3">
      <div className="text-xs text-accent font-semibold">{w}</div>
      <div className="font-bold">{t}</div>
      <div className="text-xs text-muted">{d}</div>
    </div>
  );
}

function Pill({ href, cls, children }: { href: string; cls: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`px-2.5 py-1 rounded-md font-medium ${cls}`}>
      {children}
    </Link>
  );
}
