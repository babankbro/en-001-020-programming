## สิ่งที่ต้องจำ (Key Facts)
- เส้นทาง 8 บท: 1 เครื่องมือ → 2 ไพทอน+เวกเตอร์ → 3 input/ลิสต์/แผนภูมิ → 4 ตาราง/สแตก → 5 Pygame ลูกบอลเด้ง → 6 เมทริกซ์/หมุน/ยาน → 7 ศัตรู → 8 กระสุน/ชน/กริด
- แก้ปัญหา 4 ขั้น: **วิเคราะห์** (input/output/กรณีพิเศษ) → **ออกแบบ** (pseudocode) → **เขียนโค้ด** → **ทดสอบ** (trace table + รันจริง)
- Trace table ต้องไล่ **ตามลำดับบรรทัดจริง** (`y += vy` ก่อน `vy += GRAVITY`)
- ติดตั้ง: `python --version` · `python -m pip install pygame numpy matplotlib pandas` · Windows ต้องติ๊ก **Add python.exe to PATH**
- ใช้ `python -m pip` ไม่ใช่ `pip` เฉย ๆ → ติดตั้งให้ interpreter ตัวเดียวกับที่รัน
- Colab เปิดหน้าต่าง Pygame **ไม่ได้** (ไม่มีจอ) บท 5–8 ต้องทำบนเครื่อง
- `.py` รันทั้งไฟล์บนลงล่าง ตัวแปรเริ่มใหม่ทุกครั้ง · `.ipynb` รันทีละเซลล์ ตัวแปรค้างใน kernel จน Restart
- อ่าน Traceback **จากบรรทัดสุดท้าย** (ชนิด + ข้อความ) ย้อนขึ้นไปหาเลขบรรทัดและ `^`
- `SyntaxError`/`IndentationError` ตรวจพบ **ก่อนรัน** (ไม่มีบรรทัดไหนทำงาน) · `NameError`/`TypeError`/`ValueError`/`ZeroDivisionError`/`IndexError` เกิด **ขณะรัน** (บรรทัดก่อนหน้าทำงานแล้ว)
- วงวนเกม 6 ขั้น: `event.get()` → `fill()` → อัปเดต → วาด → `flip()` → `tick(60)`

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| ค่าเฉลี่ย 3 จำนวน | $\bar{x} = (n_1+n_2+n_3)/3$ | `avg = total / 3` |
| ตกภายใต้ความโน้มถ่วง (1 เฟรม) | $y_{t+1} = y_t + v_t,\ v_{t+1} = v_t + g$ | `y += vy` แล้ว `vy += GRAVITY` |
| ตำแหน่งหลัง $n$ เฟรม (เริ่ม $v_0 = 0$) | $y_n = y_0 + g\,\dfrac{n(n-1)}{2}$ | เฟรม 5: $100 + 0.1 \times 10 = 101.0$ |
| เวลาต่อเฟรม | $1000 / \text{FPS}$ ms | `clock.tick(60)` ≈ 16.7 ms |
| สี RGB | $(R, G, B)$ แต่ละค่า 0–255 | `(0,0,0)` ดำ `(0,0,255)` น้ำเงิน `(255,255,0)` เหลือง |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
# ตรวจเวอร์ชัน
import sys, pygame, numpy
print(sys.version.split()[0], pygame.version.ver, numpy.__version__)

# หน้าต่าง Pygame ขั้นต่ำ
import pygame
pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill((0, 0, 0))
    pygame.display.flip()
    clock.tick(60)
pygame.quit()

# แก้ TypeError ตอนต่อข้อความกับตัวเลข
print(f"sum = {total}")       # หรือ "sum = " + str(total)
```

## ตัวเลขที่ออกสอบบ่อย
- Trace `y=100, vy=0, GRAVITY=0.1`: เฟรม 1–6 → y = 100, 100.1, 100.3, 100.6, 101.0, 101.5 · vy = 0.1 … 0.6
- สลับลำดับ (`vy += 0.1` ก่อน): y = 100.1, 100.3, 100.6, 101.0, 101.5, 102.1
- `sum(range(4))` = 6 · `sum(i*i for i in range(1,5))` = 30 · `range(1, 6, 2)` → 1, 3, 5
- `7 / 2 = 3.5`, `7 // 2 = 3`, `7 % 2 = 1`, `2 ** 3 = 8` · `0.1 + 0.2 = 0.30000000000000004`
- `while count < 5: count += 2` → หยุดที่ 6 · `len("Pygame")` = 6 · `"5" + "5"` = `"55"`
- `Ball(400, 3)` เรียก `move()` 2 ครั้ง → `x = 406`
- ข้อสอบ: อัตนัย 60 + ปรนัย 40 ข้อ (ผิดหัก 0.2) เอกสารลายมือ 5 แผ่น

## กับดักที่พบบ่อย
1. `pip install` สำเร็จแต่ `ModuleNotFoundError` → ติดตั้งให้ไพทอนคนละตัวกับที่ VS Code ใช้รัน (เลือก interpreter / ใช้ `python -m pip`)
2. `'python' is not recognized` หรือ Microsoft Store เด้ง → ไม่ได้ติ๊ก Add to PATH / ปิด App execution aliases
3. รันเซลล์ Notebook ข้ามลำดับ → `NameError` ทั้งที่โค้ดถูก (Restart and run all)
4. ลืมวงเล็บปิด/เครื่องหมายคำพูด → `SyntaxError` และ **บรรทัดแรกก็ไม่พิมพ์**
5. `"text" + 20` → `TypeError` (ใช้ f-string) · สะกดชื่อผิด (`rnage`) → `NameError` ไม่ใช่ SyntaxError
6. ลบ `for event in pygame.event.get()` → หน้าต่างค้าง ปิดไม่ได้ · ลบ `flip()` → มองไม่เห็นสิ่งที่วาด
7. เทียบ float ด้วย `==` (`0.1 + 0.2 == 0.3` เป็น False)

## เชื่อมโยงบทถัดไป
บทที่ 2 ใช้ Notebook เขียนโปรแกรมแรกอย่างจริงจัง: f-string, ตัวดำเนินการ `/ // % **`, ฟังก์ชัน `dotv`/`lenv` (ผลคูณจุดและขนาดเวกเตอร์) และวาดรูปด้วย `#` แบบ Top-Down Design — ใช้ `Lab01_….ipynb` ที่สร้างวันนี้เป็นต้นแบบได้เลย
