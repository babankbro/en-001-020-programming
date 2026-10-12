/** โครงสร้างข้อมูลของแต่ละบทเรียน (อ่านจาก src/content/modules/NN/meta.json) */
export interface ModuleMeta {
  id: string; // "01" … "08"
  week: number;
  title: string; // ชื่อบทภาษาไทย
  titleEn: string;
  summary: string; // 1–2 ประโยค ใช้บนการ์ดหน้าแรก
  tags: string[]; // คำค้น/หัวข้อย่อย ใช้ใน search
  clo: string[]; // เช่น ["CLO1", "CLO3"]
  /** ลิงก์ทบทวนพื้นฐานจากรายวิชา EN-001-002 */
  prereq: { label: string; url: string }[];
  /** หัวข้อเชิงลึก แสดงเป็นสารบัญบนหน้าบทเรียน ต้องตรงกับหัวข้อ `## ` ใน module.md */
  topics: string[];
  leadQuestion: string;
  outcomes: string[];
  keyIdeas: string[];
  /** ใบงาน */
  lab: {
    title: string;
    duration: string;
    objectives: string[];
    tools: string[];
  };
  /** แบบทดสอบ */
  quiz: {
    minutes: number;
  };
}

export interface QuizQuestion {
  q: string;
  code?: string; // โค้ดประกอบโจทย์ (ถ้ามี)
  choices: string[]; // 4 ตัวเลือก
  answer: number; // index 0–3
  explain: string; // เฉลยพร้อมเหตุผลสั้น ๆ
  exam?: boolean; // ข้อแนวข้อสอบปลายภาค (แสดงป้ายกำกับ)
}

export interface ModuleContent {
  meta: ModuleMeta;
  module: string; // markdown
  lab: string; // markdown
  review: string; // markdown
  quiz: QuizQuestion[];
}

export const COURSE = {
  code: "EN-001-020",
  title: "การเขียนโปรแกรมและแก้ปัญหา",
  titleEn: "Programming and Problem Solving",
  credit: "3(2-2-5)",
  term: "ภาคการศึกษาที่ 1/2569",
  instructor: "ผศ.ดร. สรายุทธ กรวิรัตน์",
  department:
    "สาขาวิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยกาฬสินธุ์",
  description:
    "เรียนรู้การเขียนโปรแกรมภาษาไพทอนเพื่อแก้ปัญหา ตั้งแต่ตัวแปร ฟังก์ชัน ลิสต์ และคลาส ไปจนถึงคณิตศาสตร์เบื้องหลังเกม — เวกเตอร์ เมทริกซ์ ตรีโกณมิติ และการจำลองฟิสิกส์ — ผ่านการสร้างเกมยิงยานอวกาศด้วย Pygame ทีละขั้นตลอด 8 บทเรียน",
  prereqCourse: {
    code: "EN-001-002",
    title: "การโปรแกรมคอมพิวเตอร์",
    url: "https://en-001-002-computer-programming.vercel.app",
  },
  github: "https://github.com/babankbro/en-001-020-programming",
};
