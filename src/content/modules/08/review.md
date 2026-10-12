## สิ่งที่ต้องจำ (Key Facts)
- ทิศกระสุน = **เมาส์ − ยาน** → `normalize()` (ขนาด 1) → `* bullet_speed` ทุกนัดจึงเร็วเท่ากัน · ห้าม normalize $(0, 0)$ ต้องตรวจ `length() > 0`
- กระสุนเคลื่อนที่ **ความเร็วคงที่** `pos += vel` ไม่มีแรงเสียดทาน · ออกนอกจอ → `kill()`
- ยิงทุก k เฟรม: `if time_steps % k != 0: return None` → อัตรา $60/k$ นัดต่อวินาที
- **AABB จุดในกล่อง**: `x <= px <= x+w` **and** `y <= py <= y+h` — ต้องจริงทั้งสองแกน ใช้ `or` จะนับชนทั้งแถว/คอลัมน์
- กล่องซ้อนทับ: ซ้อนกันทั้งแกน x และ y · Pygame: `a.rect.colliderect(b.rect)` · แตะขอบพอดี = ไม่ชน
- **ห้าม `remove` จากลิสต์ที่กำลังวน** (`[1,2,2,3]` ลบ 2 ได้ `[1,2,3]`) → วนบน `bullets[:]`, เก็บ `mask_to_remove`, หรือ List Comprehension
- กริด: `cols = width // cell_size`, `rows = height // cell_size`, `get_cell(x, y)` คืน **(row, col) = (y // cell, x // cell)** · เก็บใน `cells[row][col]`
- กริดลดการเปรียบเทียบจาก $B \times E$ เหลือราว $B \times E / C$ ($C$ = จำนวนช่อง) แต่ **พลาดวัตถุที่คร่อมเส้นแบ่ง** → ตรวจช่องข้างเคียงด้วย
- `clock.tick(60)` = เพดาน · `clock.get_fps()` = อัตราจริง ถ้าต่ำกว่า 60 แปลว่างานต่อเฟรมเกิน 16.7 ms
- `[s for s in all_sprites if isinstance(s, Bullet)]` นับเฉพาะกระสุนในกลุ่มที่ปนหลายชนิด

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| เวกเตอร์ยาน → เมาส์ | $\mathbf{d} = (m_x - s_x,\ m_y - s_y)$ | `dx = mouse_x - space.rect.centerx` |
| ความเร็วกระสุน | $\mathbf{v} = \dfrac{\mathbf{d}}{\lvert\mathbf{d}\rvert} \times \text{speed}$ | `Vector2(dx, dy).normalize() * bullet_speed` |
| ตำแหน่งหลัง n เฟรม | $p_n = p_0 + n\mathbf{v}$ | `pos += vel` n ครั้ง |
| อัตราการยิง | $\text{FPS} / k$ นัดต่อวินาที | `time_steps % k == 0` |
| จุดในกล่อง | $x \le p_x \le x+w \land y \le p_y \le y+h$ | `(px >= x and px <= x+w) and (py >= y and py <= y+h)` |
| กล่องซ้อนทับ | $A_l < B_r \land A_r > B_l \land A_t < B_b \land A_b > B_t$ | `a.rect.colliderect(b.rect)` |
| ช่องกริด | $\text{col} = \lfloor x / c \rfloor,\ \text{row} = \lfloor y / c \rfloor$ | `return y // cell, x // cell` |
| การเปรียบเทียบทุกคู่ | $B \times E$ | `for b in bullets: for e in enemies:` |
| การเปรียบเทียบด้วยกริด | $\approx B \times E / C$ | ตรวจเฉพาะ `cells[row][col]` |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
def bullet_velocity(sx, sy, mx, my, speed):
    dx, dy = mx - sx, my - sy
    length = math.sqrt(dx*dx + dy*dy)
    if length == 0:
        return (0, 0)
    return (dx / length * speed, dy / length * speed)

def point_in_box(px, py, x, y, w, h):
    return (px >= x and px <= x + w) and (py >= y and py <= y + h)

for bullet in bullets[:]:            # วนบนสำเนา
    if bullet.off_screen():
        bullets.remove(bullet)       # ลบจากต้นฉบับ

class Grid:
    def __init__(self, width, height, cell_size):
        self.cell_size = cell_size
        self.cols = width // cell_size
        self.rows = height // cell_size
        self.cells = [[[] for c in range(self.cols)] for r in range(self.rows)]

    def get_cell(self, x, y):
        return y // self.cell_size, x // self.cell_size
```

## ตัวเลขที่ออกสอบบ่อย
- ยาน (400, 300) เมาส์ (460, 380) speed 10 → $(60, 80)$ → $(0.6, 0.8)$ → **(6, 8)** · ยาน (100, 100) เมาส์ (−20, 260) speed 15 → **(−9, 12)**
- `time_steps % 10` ที่ 60 FPS = **6 นัด/วินาที** · `% 15` = 4 · `% 20` = 3
- ศัตรู (200, 300) 50×50: (225, 320) ชน · (260, 320) ไม่ชน · (230, 360) ไม่ชน · กระสุน (305, 148) กับศัตรู (260, 100) **ชน**
- `[1, 2, 2, 3]` ลบ 2 ขณะวน → `[1, 2, 3]` · วนบนสำเนา → `[1, 3]`
- จอ 1200×900 cell 150 → **8 × 6 = 48 ช่อง** · (1000, 820) → **(5, 6)** · (150, 149) → (0, 1)
- จอ 1200×900 cell 100 → 108 ช่อง · (1199, 0) → (0, 11) · จอ 1600×1000 cell 200 → 8 × 5 · (1450, 610) → (3, 7)
- กระสุน 40 ศัตรู 2,000: ทุกคู่ **80,000** · กริด 48 ช่อง ≈ **1,667** (ทดลองจริง 1,649) · กระสุน 30 ศัตรู 500 = 15,000 → ศัตรู 1,000 = 30,000
- `bullets.remove(b)` = $O(B)$ · ตรวจทุกคู่ = $O(B \cdot E)$ · `triangle(n)` = $O(n^2)$

## กับดักที่พบบ่อย
1. ใช้ `(dx, dy)` เป็นความเร็วโดยไม่ normalize → เมาส์ยิ่งไกลกระสุนยิ่งเร็ว
2. เงื่อนไข AABB ใช้ `or` แทน `and` → ไม่ error แต่ศัตรูตายทั้งแถว
3. `remove` จากลิสต์ที่กำลังวน → ลบไม่หมด (สมาชิกถัดจากตัวที่ลบถูกข้าม)
4. สลับ (row, col) กับ (x, y) → `get_cell` ต้องคืน `(y // cell, x // cell)`
5. `[[]] * cols` ได้ลิสต์เดียวกันทุกช่อง → ต้องใช้ `[[] for _ in range(cols)]`
6. วัตถุที่ขอบจอพอดี (y = 900) ได้ row = 6 → `IndexError` ต้องจำกัดค่าหรือใช้จุดศูนย์กลาง
7. เชื่อว่ากริดให้ผลเหมือนตรวจทุกคู่ → จริง ๆ พลาดวัตถุที่คร่อมเส้นแบ่ง (181 vs 129 คู่ในใบงาน)
8. อ่าน `clock.tick(60)` เป็น FPS จริง → ค่าจริงต้องดูจาก `clock.get_fps()`

## เชื่อมโยงบทถัดไป
บทนี้ปิดเกมยิงยานอวกาศครบวงจร (วงวนเกม → การหมุน → แรงเสียดทานและศัตรู → กระสุน การชน กริด) ขั้นต่อไปคือ **โครงงานกลุ่ม**: นำทุกบทมาประกอบเป็นเกมของทีม เพิ่มคะแนน เสียง และฉาก พร้อมทดสอบประสิทธิภาพด้วย FPS และนำเสนอ — ทบทวนทั้งรายวิชาได้จาก [/review/05](/review/05) ถึง [/review/08](/review/08)
