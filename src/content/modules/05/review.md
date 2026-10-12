## สิ่งที่ต้องจำ (Key Facts)
- วงวนเกม 6 ขั้นทุกเฟรม: **event → fill → update → draw → flip → tick** · ไม่มี `event.get()` หน้าต่างค้าง · ไม่มี `fill()` เกิดรอยทาง · ไม่มี `flip()` ไม่เห็นภาพ · ไม่มี `tick()` เกมเร็วตามเครื่อง
- `clock.tick(60)` = ไม่เกิน 60 เฟรม/วินาที · 1 เฟรม ≈ 16.7 ms · ความเร็ว 5 px/เฟรม = 300 px/วินาที
- จอภาพ: จุดกำเนิด **มุมบนซ้าย** แกน y **ชี้ลง** → `vy += GRAVITY` เป็นบวก, กดขึ้นคือ `y -= 1`, Matplotlib ต้อง `invert_yaxis()`
- `pygame.Rect`: `right = x + w`, `bottom = y + h`, `center = (x + w/2, y + h/2)` · กำหนด `rect.right = SCREEN_WIDTH` เลื่อนทั้งกรอบ · `rect.x` เป็น **จำนวนเต็ม**
- วงกลมใช้ **จุดศูนย์กลาง** สี่เหลี่ยมใช้ **มุมบนซ้าย** เส้นใช้จุดเริ่ม–ปลาย · วาดทีหลังทับของก่อน · สี `(R, G, B)` 0–255
- วิธีของออยเลอร์: ตำแหน่ง += ความเร็ว, ความเร็ว += ความเร่ง · ใน `ball.py` **ปรับตำแหน่งก่อน** แล้วค่อย `vy += GRAVITY` และคูณ `DAMPING`
- ค่าคงที่: `GRAVITY = 0.1`, `BOUNCE_DAMPING = 0.9`, `DAMPING_COEFFICIENT = 0.999`
- ชนซ้าย/ขวา กลับ vx · ชนพื้น กลับ vy **และวาง** `y = SCREEN_HEIGHT - radius` กันติดผนัง · เงื่อนไขชนใช้ขอบวงกลม `x ± r`, `y + r`
- คลาส = ข้อมูล + พฤติกรรม · `self` คือวัตถุที่เรียก · `from ball import Ball` · สไปรต์ต้องมี `image`, `rect`, `update()` และเรียก `super().__init__()` · `group.update()` / `group.draw(screen)`

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| เวลาต่อเฟรม / ระยะทาง | $1000/\text{FPS}$ ms · $d = v \times \text{FPS} \times t$ | `clock.tick(FPS)` |
| กึ่งกลางจอ | $(W/2,\ H/2)$ | `WIDTH//2, HEIGHT//2` |
| สี่เหลี่ยมแนบในวงกลม | $a = r\sqrt{2} = 2\sqrt{r^2/2}$, พื้นที่ $2r^2$ | `a = 2*math.sqrt(r**2/2)` |
| มุมบนซ้ายของสี่เหลี่ยมกึ่งกลาง | $(c_x - a/2,\ c_y - a/2)$ | `circle_x - a//2` |
| ออยเลอร์ | $p_{t+1} = p_t + v_t$, $v_{t+1} = v_t + a$ | `x += vx; vy += GRAVITY` |
| การหน่วง | $v_{t+1} = 0.999\,v_t$ → หลัง $n$ เฟรม $v_0 \times 0.999^n$ | `vx *= DAMPING_COEFFICIENT` |
| สะท้อน | $(v_x, v_y) \to (-v_x, v_y)$ หรือ $(v_x, -v_y)$ | `vy = -vy * BOUNCE_DAMPING` |
| ชนครั้งที่ $n$ | $\lvert v \rvert \times 0.9^n$ | |
| สลับทิศตามลำดับ | $3 \times (-1)^i = 3, -3, 3, \dots$ | `3 * (-1)**i` |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
class Ball:
    def __init__(self, x, y, vx, vy, radius, color):
        self.x, self.y = x, y
        self.vx, self.vy = vx, vy
        self.radius = radius
        self.color = color

    def move(self):
        self.x += self.vx
        self.y += self.vy
        self.vy += GRAVITY
        self.vx *= DAMPING_COEFFICIENT
        self.vy *= DAMPING_COEFFICIENT
        if self.x - self.radius <= 0 or self.x + self.radius >= SCREEN_WIDTH:
            self.vx = -self.vx * BOUNCE_DAMPING
        if self.y + self.radius >= SCREEN_HEIGHT:
            self.vy = -self.vy * BOUNCE_DAMPING
            self.y = SCREEN_HEIGHT - self.radius

    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), self.radius)

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill(BLACK)
    ball.move()
    ball.draw(screen)
    pygame.display.flip()
    clock.tick(60)
```

## ตัวเลขที่ออกสอบบ่อย
- `first_gam.py`: ศูนย์กลาง (400, 300), r = 300, $a \approx 424.26$, `a//2 = 212.0`, มุมบนซ้าย (188.0, 88.0)
- ไล่ค่า x=400, y=100, vx=3, vy=0 → เฟรม 1: (403, 100, 2.997, 0.0999) · เฟรม 2: (405.997, 100.0999, 2.994, 0.1997) · แตะพื้นเฟรมที่ 101
- x=100, y=200, vx=−4, vy=2 → 1 เฟรม: (96, 202, −3.996, 2.0979)
- ไม่หน่วง GRAVITY 0.5, 4 เฟรม → vy = 2.0, y เพิ่ม 3.0
- y=590, r=20, vy=5 ชนพื้น → y = 580, vy = −4.5 · vx=4 ชนขวาแล้วซ้าย → −3.6 แล้ว 3.24
- `rect.topleft = (120, 80)` 50×50 → right 170, bottom 130, center (145, 105)
- i = 3: x = 160, vx = −3 · สุนัข x=15, vx=−5 กว้าง 80 → 10, 5, 0 (vx = 5), 5
- FPS 30 × FRAME_LIMIT 900 = 30 s · 4 px/เฟรม × 60 × 2.5 s = 600 px

## กับดักที่พบบ่อย
1. บวกความโน้มถ่วง **ก่อน** ปรับตำแหน่ง → y เฟรมแรกได้ 100.1 แทน 100 (ผิดลำดับโค้ด)
2. ตรวจชนแล้วกลับทิศอย่างเดียว ไม่วางตำแหน่งกลับ → วัตถุสั่นติดผนัง
3. ใช้จุดศูนย์กลางวาดสี่เหลี่ยม (`rect.py` ยืมเงื่อนไข `x - size <= 0` จาก Ball) → ขอบซ้ายจริงคือ `x`
4. ลืม `super().__init__()` ในคลาสลูกของ `Sprite` → `AttributeError` เมื่อ `group.add()`
5. `rect.x += 0.3` ถูกปัดเป็นจำนวนเต็ม วัตถุไม่ขยับ → เก็บตำแหน่งเป็นจำนวนจริงแยกไว้
6. `a//2` ได้ `212.0` ไม่ใช่ `212.13` (หารปัดลง) และ `draw.rect` ต้องการมุมบนซ้ายไม่ใช่ศูนย์กลาง

## เชื่อมโยงบทถัดไป
บทที่ 6 นำ **เวกเตอร์และเมทริกซ์การหมุน (NumPy)** มาหมุนภาพยานอวกาศจาก `original_image` เก็บตำแหน่งเป็น `pygame.math.Vector2` และบังคับด้วยแป้นพิมพ์ — ใช้วงวนเกม สไปรต์ และการเคลื่อนที่ทีละเฟรมจากบทนี้ทั้งหมด
