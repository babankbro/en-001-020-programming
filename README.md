# EN-001-020 การเขียนโปรแกรมและแก้ปัญหา — เว็บสื่อการสอน

เว็บรายวิชา **Programming and Problem Solving** สาขาวิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยกาฬสินธุ์
ออกแบบตามรูปแบบเว็บ [EN-001-019](https://en-001-019-ce.vercel.app/) และอ้างอิงพื้นฐานจาก [EN-001-002](https://en-001-002-computer-programming.vercel.app/)

## ส่วนประกอบ
- 8 บทเรียน (`/module/01`–`/module/08`) พร้อมหัวข้อเชิงลึก 5 หัวข้อต่อบท
- 8 ใบงาน step-by-step (`/lab/NN`)
- 8 Review Sheet สรุป 1 หน้า พิมพ์/บันทึก PDF ได้ (`/review/NN`)
- 8 แบบทดสอบออนไลน์ 25 ข้อ (รวมแนวข้อสอบปลายภาค 5 ข้อ) จับเวลา เฉลยพร้อมคำอธิบาย และคะแนนแบบผิดหัก 0.2 (`/exam/NN`)
- เอกสารรายวิชา: แผนการสอน/CLO, การวัดผล, แนวทางเตรียมสอบ, ตัวอย่างโจทย์คำนวณ
- ค้นหา Ctrl+K, โหมดมืด, รองรับมือถือ, สูตรคณิตศาสตร์ด้วย KaTeX

## รันบนเครื่อง
```bash
npm install
npm run dev
```
เปิด http://localhost:3000

## Build / Deploy
```bash
npm run build
```
ทุกหน้าเป็น static (SSG) — deploy บน Vercel ได้ทันทีโดย import repository นี้

## แก้ไขเนื้อหา
เนื้อหาทั้งหมดอยู่ใน `src/content/` ไม่ต้องแก้โค้ด React
- `src/content/modules/NN/` — `meta.json`, `module.md`, `lab.md`, `review.md`, `quiz.json`
- `src/content/docs/` — `course-plan.md`, `assessment.md`, `exam-prep.md`, `calc-examples.md`
- ข้อมูลรายวิชา (ชื่อ ผู้สอน ภาคการศึกษา) อยู่ใน `src/content/types.ts` ตัวแปร `COURSE`

รูปแบบไฟล์และกติกาการเขียนดูที่ [CONTENT_GUIDE.md](CONTENT_GUIDE.md) — Markdown รองรับ GFM, LaTeX (`$…$`, `$$…$$`) และ callout แบบ Obsidian (`> [!tip]`, `> [!question]-` พับได้)

แหล่งเนื้อหาต้นทาง: Obsidian vault `PS-Study-Vault` (สรุปจากโค้ดตัวอย่างคาบปฏิบัติการ 2–8)
