"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, User, Hash, Users, ClipboardList, CheckCircle2, XCircle, RotateCcw, Printer } from "lucide-react";
import type { QuizQuestion } from "@/content/types";

const THAI = ["ก", "ข", "ค", "ง"];

interface Props {
  moduleId: string;
  week: number;
  title: string;
  titleEn: string;
  minutes: number;
  questions: QuizQuestion[];
}

type Phase = "intro" | "doing" | "done";

export default function Quiz({ moduleId, week, title, titleEn, minutes, questions }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");
  const [section, setSection] = useState("");
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [left, setLeft] = useState(minutes * 60);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  // นับเวลาถอยหลัง หมดเวลาแล้วส่งอัตโนมัติ
  useEffect(() => {
    if (phase !== "doing") return;
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          finish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function start(e: React.FormEvent) {
    e.preventDefault();
    setStartedAt(Date.now());
    setPhase("doing");
  }

  function finish() {
    setFinishedAt(Date.now());
    setPhase("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setAnswers(questions.map(() => null));
    setLeft(minutes * 60);
    setStartedAt(null);
    setFinishedAt(null);
    setPhase("intro");
  }

  const score = useMemo(() => answers.filter((a, i) => a === questions[i].answer).length, [answers, questions]);
  const answered = answers.filter((a) => a !== null).length;
  // คิดคะแนนแบบข้อสอบปลายภาค: ถูกได้ 1 ผิดหัก 0.2 ไม่ตอบได้ 0
  const penaltyScore = Math.round((score - 0.2 * (answered - score)) * 10) / 10;
  const examCount = questions.filter((q) => q.exam).length;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  function jump(i: number) {
    document.getElementById(`q-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- หน้าเริ่มต้น ---------- */
  if (phase === "intro") {
    return (
      <div className="max-w-xl mx-auto bg-card border border-line rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs text-accent bg-accent-soft/50 rounded-full px-3 py-1">
            <Clock size={13} /> {minutes} นาที | {questions.length} ข้อ | {questions.length} คะแนน
          </span>
          <h1 className="text-2xl font-bold mt-3">แบบทดสอบประจำบทที่ {week}</h1>
          <p className="text-muted mt-1">
            {titleEn} — {title}
          </p>
          <p className="text-xs text-muted mt-1">วิชา EN-001-020 การเขียนโปรแกรมและแก้ปัญหา</p>
        </div>
        <form onSubmit={start} className="space-y-4">
          <Field icon={<User size={15} />} label="ชื่อ-สกุล" required value={name} onChange={setName} placeholder="กรอกชื่อ-นามสกุล" />
          <Field icon={<Hash size={15} />} label="รหัสนักศึกษา" required value={sid} onChange={setSid} placeholder="กรอกรหัสนักศึกษา" />
          <Field icon={<Users size={15} />} label="Section" value={section} onChange={setSection} placeholder="เช่น 1, 2, A, B (ไม่บังคับ)" />
          <div className="callout callout-warning text-sm">
            <span className="callout-title">
              <ClipboardList size={16} /> คำชี้แจง
            </span>
            <p>จงเลือกคำตอบที่ถูกต้องที่สุดเพียงข้อเดียว (ข้อละ 1 คะแนน) เวลาจะเริ่มนับเมื่อกดปุ่มเริ่มทำแบบทดสอบ และระบบจะเฉลยพร้อมคำอธิบายทันทีเมื่อส่งคำตอบ</p>
            {examCount > 0 && (
              <p>
                มี {examCount} ข้อที่ติดป้าย <b>แนวข้อสอบปลายภาค</b> รูปแบบเดียวกับข้อสอบปรนัยจริง และผลลัพธ์จะแสดง<b>คะแนนแบบข้อสอบจริง</b> (ผิดหักข้อละ 0.2) ให้ฝึกตัดสินใจว่าควรตอบหรือเว้น
              </p>
            )}
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:opacity-90">
            เริ่มทำแบบทดสอบ
          </button>
        </form>
      </div>
    );
  }

  /* ---------- หน้าผลลัพธ์ ---------- */
  const resultBanner =
    phase === "done" && (
      <div className="bg-card border border-line rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="text-sm text-muted">คะแนนของคุณ</div>
            <div className="text-4xl font-bold">
              {score} <span className="text-lg text-muted font-normal">/ {questions.length}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted">คะแนนแบบข้อสอบจริง (ผิดหัก 0.2)</div>
            <div className="text-4xl font-bold text-violet-600 dark:text-violet-400">
              {penaltyScore} <span className="text-lg text-muted font-normal">/ {questions.length}</span>
            </div>
          </div>
          <div className="text-sm space-y-0.5">
            <div>
              <span className="text-muted">ผู้ทำ:</span> {name} ({sid}){section && ` · Sec ${section}`}
            </div>
            <div>
              <span className="text-muted">ตอบถูก:</span> {score} · <span className="text-muted">ตอบผิด:</span> {answered - score} · <span className="text-muted">ไม่ตอบ:</span> {questions.length - answered}
            </div>
            {startedAt && finishedAt && (
              <div>
                <span className="text-muted">ใช้เวลา:</span> {Math.round((finishedAt - startedAt) / 1000 / 60)} นาที {Math.round((finishedAt - startedAt) / 1000) % 60} วินาที
              </div>
            )}
          </div>
          <div className="ml-auto flex gap-2 no-print">
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-line hover:bg-accent-soft/40">
              <Printer size={15} /> พิมพ์ผล
            </button>
            <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-line hover:bg-accent-soft/40">
              <RotateCcw size={15} /> ทำใหม่
            </button>
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-line overflow-hidden">
          <div className="h-full bg-accent" style={{ width: `${(score / questions.length) * 100}%` }} />
        </div>
      </div>
    );

  return (
    <div>
      {/* แถบสถานะ */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-8 px-4 sm:px-8 py-2.5 bg-card/95 backdrop-blur border-b border-line flex items-center gap-3 text-sm mb-6 no-print">
        <span className="font-semibold truncate">
          บทที่ {week} — {title}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono">
          <Clock size={15} className={left < 60 && phase === "doing" ? "text-red-500" : "text-accent"} />
          {phase === "doing" ? `${mm}:${ss}` : "หมดเวลา/ส่งแล้ว"}
        </span>
        <span className="text-muted">
          {answered}/{questions.length} ข้อ
        </span>
      </div>

      {resultBanner}

      <ol className="space-y-5">
        {questions.map((qq, i) => {
          const picked = answers[i];
          const done = phase === "done";
          const correct = done && picked === qq.answer;
          return (
            <li key={i} id={`q-${i}`} className={`bg-card border rounded-2xl p-5 scroll-mt-32 ${done ? (correct ? "border-green-400/60" : "border-red-400/60") : "border-line"}`}>
              <div className="flex gap-3">
                <span className="shrink-0 w-7 h-7 grid place-items-center rounded-full bg-accent-soft/60 text-accent text-sm font-bold">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  {qq.exam && (
                    <span className="inline-block mb-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300">
                      แนวข้อสอบปลายภาค
                    </span>
                  )}
                  <p className="font-medium whitespace-pre-wrap">{qq.q}</p>
                  {qq.code && (
                    <pre className="mt-3 bg-[var(--code-bg)] text-slate-200 rounded-xl p-3 text-[13px] overflow-x-auto font-mono leading-relaxed">
                      <code>{qq.code}</code>
                    </pre>
                  )}
                  <div className="mt-3 grid gap-2">
                    {qq.choices.map((c, j) => {
                      const isPicked = picked === j;
                      const isAns = qq.answer === j;
                      let cls = "border-line hover:border-accent/60";
                      if (!done && isPicked) cls = "border-accent bg-accent-soft/40";
                      if (done && isAns) cls = "border-green-500 bg-green-500/10";
                      if (done && isPicked && !isAns) cls = "border-red-500 bg-red-500/10";
                      return (
                        <label key={j} className={`flex items-start gap-2.5 border rounded-xl px-3 py-2.5 cursor-pointer text-[15px] ${cls}`}>
                          <input
                            type="radio"
                            name={`q${i}`}
                            className="mt-1 accent-[var(--accent)]"
                            disabled={done}
                            checked={isPicked}
                            onChange={() => setAnswers((a) => a.map((v, k) => (k === i ? j : v)))}
                          />
                          <span className="font-semibold shrink-0">{THAI[j]}.</span>
                          <span className="whitespace-pre-wrap">{c}</span>
                          {done && isAns && <CheckCircle2 size={17} className="ml-auto text-green-600 shrink-0" />}
                          {done && isPicked && !isAns && <XCircle size={17} className="ml-auto text-red-600 shrink-0" />}
                        </label>
                      );
                    })}
                  </div>
                  {done && (
                    <div className={`mt-3 text-sm rounded-xl px-3 py-2 ${correct ? "bg-green-500/10" : "bg-red-500/10"}`}>
                      <span className="font-semibold">{correct ? "ถูกต้อง" : picked === null ? "ไม่ได้ตอบ" : "ยังไม่ถูก"} · เฉลย {THAI[qq.answer]}.</span> {qq.explain}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* ตัวเลขข้อสำหรับกระโดด */}
      <div className="sticky bottom-0 mt-6 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-card/95 backdrop-blur border-t border-line no-print">
        <div className="flex flex-wrap gap-1.5 items-center">
          {questions.map((qq, i) => {
            const a = answers[i];
            let cls = "border-line";
            if (phase === "doing" && a !== null) cls = "bg-accent text-white border-accent";
            if (phase === "done") cls = a === qq.answer ? "bg-green-500 text-white border-green-500" : "bg-red-500 text-white border-red-500";
            return (
              <button key={i} onClick={() => jump(i)} className={`w-8 h-8 text-xs rounded-md border ${cls}`}>
                {i + 1}
              </button>
            );
          })}
          {phase === "doing" && (
            <button
              onClick={() => {
                if (answered < questions.length && !confirm(`ยังไม่ได้ตอบ ${questions.length - answered} ข้อ ต้องการส่งคำตอบหรือไม่?`)) return;
                finish();
              }}
              className="ml-auto px-5 py-2 rounded-xl bg-accent text-white font-semibold hover:opacity-90"
            >
              ส่งคำตอบ
            </button>
          )}
          {phase === "done" && (
            <a href={`/review/${moduleId}`} className="ml-auto px-4 py-2 rounded-xl border border-line text-sm hover:bg-accent-soft/40">
              ทบทวน Review Sheet บทที่ {week}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-medium mb-1">
        {icon} {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 outline-none focus:border-accent"
      />
    </label>
  );
}
