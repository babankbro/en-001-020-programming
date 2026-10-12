# Infographic & Review Sheet Guide

ใช้คู่กับ [CONTENT_GUIDE.md](CONTENT_GUIDE.md)

## Infographic (SVG)
- เก็บที่ `public/infographics/NN/<ชื่อสั้น-ภาษาอังกฤษ>.svg` (NN = รหัสบท, docs ใช้ `public/infographics/calc/`)
- อ้างอิงใน markdown ด้วยรูปภาพ markdown ธรรมดา: `![คำอธิบายภาพภาษาไทย](/infographics/05/euler-trace.svg)` แล้วตามด้วยย่อหน้าอธิบายภาพ 2–4 ประโยค (อ่านภาพอย่างไร)
- SVG ต้องเป็นไฟล์เดี่ยว ไม่มี script ไม่มี font/รูปภายนอก ไม่มี `<foreignObject>`
  - `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 H" width="800" height="H" font-family="Sarabun, Tahoma, 'Segoe UI', sans-serif">`
  - พื้นหลังแรกสุด: `<rect width="100%" height="100%" rx="16" fill="#ffffff"/>` (ภาพต้องอ่านออกบนเว็บทั้งธีมสว่างและมืด จึงมีพื้นขาวในตัว)
  - ข้อความภาษาไทย ขนาด ≥ 14px, หัวภาพ 20–22px ตัวหนา, สีตัวอักษรหลัก `#0f172a`, รอง `#475569`
  - ชุดสีหลัก: น้ำเงิน `#2563eb`, เขียว `#059669`, ส้ม `#d97706`, แดง `#dc2626`, ม่วง `#7c3aed`, พื้นอ่อน `#eff6ff` `#ecfdf5` `#fffbeb` `#fef2f2` `#f5f3ff`, เส้นกรอบ `#cbd5e1`
  - โค้ดในภาพใช้ `font-family="Consolas, 'Courier New', monospace"`
  - ลูกศรใช้ `<marker>` ใน `<defs>`
- **ความถูกต้อง**: กราฟ/เวกเตอร์/ตำแหน่งต้องวาดตามสเกลจริง — คำนวณพิกัดด้วย Python ก่อนเขียน SVG (หรือเขียน Python สร้าง SVG) ตัวเลขทุกตัวในภาพต้องตรงกับเนื้อหา
- ตรวจ XML ให้ valid: `python -c "import xml.etree.ElementTree as E;E.parse(r'path.svg')"` และแปลงเป็น PNG ดูด้วยตาด้วย PyMuPDF: `python -c "import fitz;d=fitz.open(r'a.svg');d[0].get_pixmap(dpi=96).save(r'a.png')"` แล้วเปิดภาพดูว่าข้อความไม่ทับกัน ไม่ล้นกรอบ (scratch ไฟล์ PNG ไว้นอกโปรเจกต์)
- ประเภทภาพที่ควรมี: แผนผังขั้นตอน (flow), ตารางไล่ค่า (trace) แบบมีสี, แผนภาพเวกเตอร์บนพิกัด, เปรียบเทียบ ✓/✗, แผนที่แนวคิด (concept map), timeline ของเฟรม

## Review Sheet ที่สมบูรณ์ (`review.md`)
ต้องครอบคลุม **ทุกหัวข้อ** ใน `topics` ของบท ลำดับหัวข้อ:
1. `## ภาพรวมบท` — 2–3 ประโยค + ภาพ infographic สรุปบท 1 ภาพ (`public/infographics/NN/summary.svg`, แผนที่แนวคิดของ 5 หัวข้อ)
2. `## สิ่งที่ต้องจำ (Key Facts)` — แยก `###` ตามหัวข้อ 1–5 ของบท ข้อละ 3–6 bullet
3. `## สูตร (Formulas)` — ตาราง เรื่อง | สูตร | โค้ด | ตัวอย่างตัวเลข
4. `## โค้ดที่ต้องเขียนได้โดยไม่ดู`
5. `## ตัวอย่างไล่ค่า (Trace)` — 1–2 ตารางไล่ค่าทีละรอบ/ทีละเฟรม
6. `## ตัวเลขที่ออกสอบบ่อย`
7. `## กับดักที่พบบ่อย` — ✗ ผิด / ✓ ถูก
8. `## ทดสอบตัวเอง 5 ข้อ` — callout `> [!question]-` พร้อม `> > [!success]- เฉลย` ตัวเลขตรวจด้วย Python
9. `## เชื่อมโยงบทถัดไป`
ความยาวประมาณ 120–200 บรรทัด ยังพิมพ์ได้ 2–3 หน้า
