> [!info] ผลลัพธ์ในใบงานนี้
> output ทุกกล่องได้จากการรันจริงด้วย Python 3.12 ส่วนที่ 1–3 เป็นไพทอนล้วน **ไม่ต้องใช้ Pygame** เพื่อให้เห็นตัวเลขชัดเจน (ขั้นตอนสุดท้ายจึงนำไปใส่ในเกม) ให้นักศึกษาพิมพ์โค้ดเอง **ห้ามคัดลอกวาง** และก่อนรันทุกครั้งให้ **ทายผลลัพธ์บนกระดาษก่อน** แล้วค่อยเทียบ สร้างไฟล์ `lab08_<รหัสนักศึกษา>.py` ใน VS Code (หรือ Notebook ก็ได้)

## ส่วนที่ 1: ทิศทางกระสุนและการเคลื่อนที่ (40 นาที)

### ขั้นตอนที่ 1: ความเร็วกระสุนจากเวกเตอร์หนึ่งหน่วย
1. เขียนฟังก์ชัน `bullet_velocity` ที่รับตำแหน่งยาน `(sx, sy)` ตำแหน่งเมาส์ `(mx, my)` และ `speed` แล้วคืนความเร็ว `(vx, vy)` โดย **ไม่ใช้ Pygame** (คำนวณ normalize เอง)

```python
import math

def bullet_velocity(sx, sy, mx, my, speed):
    dx = mx - sx                        # เวกเตอร์จากยานไปเมาส์
    dy = my - sy
    length = math.sqrt(dx*dx + dy*dy)   # ขนาดของเวกเตอร์
    if length == 0:                     # เมาส์อยู่บนยานพอดี → ไม่มีทิศ
        return (0, 0)
    ux = dx / length                    # เวกเตอร์หนึ่งหน่วย
    uy = dy / length
    return (ux * speed, uy * speed)     # คูณอัตราเร็ว

print(bullet_velocity(400, 300, 460, 380, 10))
print(bullet_velocity(100, 100, -20, 260, 15))
print(bullet_velocity(400, 300, 400, 300, 10))
```
```
(6.0, 8.0)
(-9.0, 12.0)
(0, 0)
```

2. คำนวณมือบรรทัดแรก: $(60, 80)$ ขนาด 100 → $(0.6, 0.8)$ → $(6, 8)$ ตรงกับโปรแกรมหรือไม่ และตรวจว่าขนาดของ $(6, 8)$ เท่ากับ `speed` = 10 พอดี

> [!question]- คำถาม 1.1: ถ้าตัดบรรทัด `if length == 0: return (0, 0)` ออก แล้วเรียก `bullet_velocity(400, 300, 400, 300, 10)` จะเกิดอะไรขึ้น
> > [!success]- แนวคำตอบ
> > `length = 0` ทำให้ `dx / length` เกิด `ZeroDivisionError` — ใน Pygame `Vector2(0, 0).normalize()` ก็เกิด `ValueError` เช่นกัน จึงต้องตรวจความยาวก่อนเสมอ

### ขั้นตอนที่ 2: คลาส Bullet แบบไพทอนล้วน
4. สร้างคลาส `Bullet` ที่เก็บตำแหน่งและความเร็ว มี `update()` เลื่อนตำแหน่ง และ `off_screen(width, height)` ตรวจว่าออกนอกจอหรือไม่

```python
class Bullet:
    def __init__(self, x, y, vx, vy):
        self.x = x
        self.y = y
        self.vx = vx
        self.vy = vy

    def update(self):
        self.x += self.vx               # ความเร็วคงที่ทุกเฟรม
        self.y += self.vy

    def off_screen(self, width, height):
        return self.x < 0 or self.x > width or self.y < 0 or self.y > height

b = Bullet(400, 300, 6, 8)
for frame in range(1, 4):
    b.update()
    print(frame, b.x, b.y)
```
```
1 406 308
2 412 316
3 418 324
```

> [!tip] `off_screen` ใช้ `or` แต่การชนใช้ `and`
> ออกนอกจอ = หลุดขอบ **ด้านใดด้านหนึ่ง** จึงใช้ `or` ส่วนการชนแบบ AABB ต้องอยู่ในช่วง **ทั้งสองแกน** จึงใช้ `and` — อย่าสับสนสองกรณีนี้

### ขั้นตอนที่ 3: ลบกระสุนที่ออกนอกจอระหว่างวนซ้ำ
5. สร้างกระสุน 3 นัดจากจุด (400, 300) บนจอ 800×600 แล้ววนเฟรมจนกระสุนหมด โดย **วนบนสำเนา `bullets[:]`** และลบจากต้นฉบับ

```python
bullets = [Bullet(400, 300, 6, 8), Bullet(400, 300, -9, 12), Bullet(400, 300, 0, -30)]
frame = 0
while len(bullets) > 0:
    frame += 1
    for bullet in bullets[:]:               # วนบนสำเนา
        bullet.update()
        if bullet.off_screen(800, 600):
            bullets.remove(bullet)          # ลบจากต้นฉบับ
            print(f"frame {frame}: bullet at ({bullet.x}, {bullet.y}) removed, left {len(bullets)}")
```
```
frame 11: bullet at (400, -30) removed, left 2
frame 26: bullet at (166, 612) removed, left 1
frame 38: bullet at (628, 604) removed, left 0
```

6. ตรวจด้วยมือ: กระสุน $(0, -30)$ มี $y = 300 - 30n < 0$ เมื่อ $n > 10$ จึงหลุดจอที่เฟรม 11 ✓ ส่วนกระสุน $(6, 8)$ หลุดเมื่อ $300 + 8n > 600$ คือ $n > 37.5$ → เฟรม 38 ✓

> [!question]- คำถาม 1.2: ถ้าเปลี่ยน `for bullet in bullets[:]:` เป็น `for bullet in bullets:` โปรแกรมยังให้ผลเดิมหรือไม่ เพราะเหตุใด
> > [!success]- แนวคำตอบ
> > กรณีนี้บังเอิญได้ผลเดิมเพราะแต่ละเฟรมมีกระสุนหลุดเพียงนัดเดียว แต่ถ้ามีสองนัดหลุดพร้อมกันในเฟรมเดียว นัดที่อยู่ถัดจากนัดที่ถูกลบจะ **ถูกข้าม** (ดูการสาธิตในขั้นตอนที่ 4) จึงต้องวนบนสำเนาเสมอ

### ขั้นตอนที่ 4: สาธิตกับดักการลบและอัตราการยิง
7. พิมพ์โค้ดสาธิตกับดักคลาสสิกและวิธีแก้ทั้ง 3 แบบ

```python
xs = [1, 2, 2, 3]
for x in xs:                 # ผิด: ลบจากลิสต์ที่กำลังวน
    if x == 2:
        xs.remove(x)
print(xs)

xs = [1, 2, 2, 3]
for x in xs[:]:              # ถูก: วนบนสำเนา
    if x == 2:
        xs.remove(x)
print(xs)

xs = [1, 2, 2, 3]
xs = [x for x in xs if x != 2]     # ถูก: สร้างลิสต์ใหม่
print(xs)
```
```
[1, 2, 3]
[1, 3]
[1, 3]
```

8. จำลองการยิงทุก ๆ 10 เฟรม นับจำนวนนัดใน 60 เฟรม (= 1 วินาทีที่ 60 FPS)

```python
shots = 0
for time_steps in range(60):
    if time_steps % 10 != 0:
        continue                 # ไม่ใช่เฟรมที่หาร 10 ลงตัว → ไม่ยิง
    shots += 1
print("shots in 60 frames:", shots)
```
```
shots in 60 frames: 6
```

> [!question]- คำถาม 1.3: ถ้าต้องการให้ยิง 4 นัดต่อวินาทีที่ 60 FPS ควรเปลี่ยน `% 10` เป็นค่าใด
> > [!success]- แนวคำตอบ
> > `% 15` เพราะ $60 / 15 = 4$ (เฟรม 0, 15, 30, 45)

## ส่วนที่ 2: การตรวจจับการชนแบบ AABB (35 นาที)

### ขั้นตอนที่ 5: จุดอยู่ในกล่องหรือไม่
9. เขียน `point_in_box` ตามเงื่อนไขใน `basic_list.py` แล้วทดสอบกับศัตรูมุมบนซ้าย (200, 300) ขนาด 50×50

```python
def point_in_box(px, py, x, y, w, h):
    return (px >= x and px <= x + w) and (py >= y and py <= y + h)

tests = [(225, 320), (260, 320), (230, 360), (250, 350)]
for px, py in tests:
    print((px, py), point_in_box(px, py, 200, 300, 50, 50))
print(point_in_box(305, 148, 260, 100, 50, 50))
```
```
(225, 320) True
(260, 320) False
(230, 360) False
(250, 350) True
True
```

10. สังเกตว่า (250, 350) อยู่ **ขอบพอดี** ยังนับว่าชนเพราะใช้ `<=` ส่วนบรรทัดสุดท้ายคือโจทย์ในแบบฝึกหัด: กระสุน (305, 148) กับศัตรู (260, 100) → ชน

### ขั้นตอนที่ 6: ทดลองความผิดพลาดของ `or`
11. เขียนฟังก์ชันผิด ๆ ที่ใช้ `or` แล้วเทียบผลกับฟังก์ชันที่ถูก

```python
def point_in_box_wrong(px, py, x, y, w, h):
    return (px >= x and px <= x + w) or (py >= y and py <= y + h)

for px, py in tests:
    print((px, py), point_in_box(px, py, 200, 300, 50, 50), point_in_box_wrong(px, py, 200, 300, 50, 50))
```
```
(225, 320) True True
(260, 320) False True
(230, 360) False True
(250, 350) True True
```

> [!warning] ผิดแบบไม่มี error
> (260, 320) อยู่ขวาศัตรู และ (230, 360) อยู่ใต้ศัตรู แต่ `or` บอกว่าชนทั้งคู่ ในเกมจริงหมายถึงกระสุนทำลายศัตรูทุกตัวที่อยู่แถวหรือคอลัมน์เดียวกัน — โปรแกรมรันได้ปกติ จึงต้องทดสอบด้วยกรณีแบบนี้เสมอ

### ขั้นตอนที่ 7: กล่องซ้อนทับกล่อง
12. เขียน `boxes_overlap` ตามสูตร AABB แล้วทดสอบ 3 กรณี

```python
def boxes_overlap(ax, ay, aw, ah, bx, by, bw, bh):
    return (ax < bx + bw and ax + aw > bx and
            ay < by + bh and ay + ah > by)

print(boxes_overlap(10, 10, 40, 40, 45, 30, 20, 20))   # ซ้อนกันทั้งสองแกน
print(boxes_overlap(10, 10, 40, 40, 50, 30, 20, 20))   # ขอบแตะกันพอดี
print(boxes_overlap(10, 10, 40, 40, 20, 60, 20, 20))   # ซ้อนแกน x แต่ไม่ซ้อนแกน y
```
```
True
False
False
```

> [!question]- คำถาม 2.1: ทำไมกรณีที่สอง (B เริ่มที่ x = 50 ซึ่งเป็นขอบขวาของ A พอดี) จึงได้ `False` และ `pygame.Rect.colliderect` ให้ผลอย่างไรในกรณีนี้
> > [!success]- แนวคำตอบ
> > เงื่อนไข `ax + aw > bx` คือ `50 > 50` เป็นเท็จ — กล่องที่แตะขอบกันพอดีไม่นับว่าซ้อนทับ `colliderect` ก็ให้ `False` เช่นกัน (ใช้เครื่องหมายมากกว่า/น้อยกว่าแบบไม่รวมขอบ)

### ขั้นตอนที่ 8: ตรวจทุกคู่และนับจำนวนการเปรียบเทียบ
13. สร้างคลาส `Enemy` และ `Bullet` แบบง่าย (เก็บเฉพาะ x, y) แล้วตรวจทุกคู่พร้อมนับ

```python
class Enemy:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Bullet:
    def __init__(self, x, y):
        self.x = x
        self.y = y

enemies = [Enemy(100, 100), Enemy(300, 100), Enemy(500, 400)]
bullets = [Bullet(120, 130), Bullet(330, 90), Bullet(540, 440), Bullet(700, 700)]
count = 0
checks = 0
for bullet in bullets:
    for enemy in enemies:
        checks += 1
        if point_in_box(bullet.x, bullet.y, enemy.x, enemy.y, 50, 50):
            count += 1
            print(f"bullet ({bullet.x}, {bullet.y}) hits enemy ({enemy.x}, {enemy.y})")
print("checks =", checks, "hits =", count)
```
```
bullet (120, 130) hits enemy (100, 100)
bullet (540, 440) hits enemy (500, 400)
checks = 12 hits = 2
```

14. `checks = 12` คือ $B \times E = 4 \times 3$ — ลองคิดว่าถ้า $B = 40$ และ $E = 2000$ จะได้เท่าใด (ส่วนที่ 3 จะวัดจริง)

## ส่วนที่ 3: กริดและการวัดประสิทธิภาพ (45 นาที)

### ขั้นตอนที่ 9: คลาส Grid
15. เขียนคลาส `Grid` ตาม `grid.py` (ไพทอนล้วน) แล้วทดสอบ `get_cell`

```python
import random

class Grid:
    def __init__(self, width, height, cell_size):
        self.cell_size = cell_size
        self.cols = width // cell_size
        self.rows = height // cell_size
        self.cells = []
        for row in range(self.rows):
            row_cells = []
            for col in range(self.cols):
                row_cells.append([])            # แต่ละช่องเป็นลิสต์ว่าง (คนละลิสต์)
            self.cells.append(row_cells)

    def get_cell(self, x, y):
        return y // self.cell_size, x // self.cell_size    # (row, col)

    def clear(self):
        for row in range(self.rows):
            for col in range(self.cols):
                self.cells[row][col] = []

    def add(self, obj):
        row, col = self.get_cell(obj.x, obj.y)
        self.cells[row][col].append(obj)

grid = Grid(1200, 900, 150)
print(grid.rows, grid.cols, grid.rows * grid.cols)
print(grid.get_cell(1000, 820))
print(grid.get_cell(0, 0))
print(grid.get_cell(1199, 899))
print(grid.get_cell(150, 149))
```
```
6 8 48
(5, 6)
(0, 0)
(5, 7)
(0, 1)
```

> [!question]- คำถาม 3.1: `get_cell(150, 149)` ได้ `(0, 1)` ไม่ใช่ `(1, 0)` เพราะอะไร
> > [!success]- แนวคำตอบ
> > ฟังก์ชันคืน `(row, col)` โดย row มาจาก **y** = 149 // 150 = 0 และ col มาจาก **x** = 150 // 150 = 1 ลำดับสลับกับ (x, y)

### ขั้นตอนที่ 10: ตรวจทุกคู่ vs กริด ด้วยตำแหน่งสุ่ม
16. สุ่มศัตรู 2,000 ตัวและกระสุน 40 ลูกด้วย `random.seed(8)` (ทุกคนได้ตำแหน่งชุดเดียวกัน) แล้วนับจำนวนการเปรียบเทียบและจำนวนการชนทั้งสองวิธี

```python
random.seed(8)
enemies = [Enemy(random.randint(0, 1199), random.randint(0, 899)) for i in range(2000)]
bullets = [Bullet(random.randint(0, 1199), random.randint(0, 899)) for i in range(40)]

# วิธีที่ 1: ตรวจทุกคู่
checks_all = 0
hits_all = 0
for bullet in bullets:
    for enemy in enemies:
        checks_all += 1
        if point_in_box(bullet.x, bullet.y, enemy.x, enemy.y, 50, 50):
            hits_all += 1
print("brute force: checks =", checks_all, "hits =", hits_all)

# วิธีที่ 2: ใช้กริด
grid.clear()
for enemy in enemies:
    grid.add(enemy)                         # ใส่ศัตรูลงช่อง
checks_grid = 0
hits_grid = 0
for bullet in bullets:
    row, col = grid.get_cell(bullet.x, bullet.y)
    for enemy in grid.cells[row][col]:      # ตรวจเฉพาะช่องเดียวกัน
        checks_grid += 1
        if point_in_box(bullet.x, bullet.y, enemy.x, enemy.y, 50, 50):
            hits_grid += 1
print("grid       : checks =", checks_grid, "hits =", hits_grid)
print("ratio =", round(checks_all / checks_grid, 1))
```
```
brute force: checks = 80000 hits = 181
grid       : checks = 1649 hits = 129
ratio = 48.5
```

17. เทียบกับค่าประมาณในบทเรียน $80{,}000 / 48 \approx 1{,}667$ — ได้ 1,649 ใกล้เคียงมาก และลดลง 48.5 เท่า
18. แต่ **จำนวนการชนไม่เท่ากัน** (181 กับ 129): กริดพลาดไป 52 คู่ ลองอธิบายก่อนอ่านขั้นตอนถัดไป

> [!warning] กริดพลาดการชนที่คร่อมเส้นแบ่ง
> ศัตรูถูกใส่ช่องตามมุมบนซ้าย (x, y) แต่กล่อง 50×50 ของมันอาจยื่นไปช่องขวาหรือช่องล่าง กระสุนที่อยู่ช่องถัดไปจึงไม่ถูกตรวจกับศัตรูตัวนั้น

### ขั้นตอนที่ 11: ตรวจช่องข้างเคียงด้วย
19. เพราะศัตรูยื่นไปทาง **ขวาและล่าง** กระสุนจึงต้องตรวจช่องของตัวเอง ช่องซ้าย ช่องบน และช่องซ้ายบนด้วย

```python
checks_nb = 0
hits_nb = 0
for bullet in bullets:
    row, col = grid.get_cell(bullet.x, bullet.y)
    for r in (row - 1, row):                    # แถวบนและแถวตัวเอง
        for c in (col - 1, col):                # คอลัมน์ซ้ายและคอลัมน์ตัวเอง
            if 0 <= r < grid.rows and 0 <= c < grid.cols:   # กันหลุดขอบกริด
                for enemy in grid.cells[r][c]:
                    checks_nb += 1
                    if point_in_box(bullet.x, bullet.y, enemy.x, enemy.y, 50, 50):
                        hits_nb += 1
print("grid+neighbors: checks =", checks_nb, "hits =", hits_nb)
```
```
grid+neighbors: checks = 5688 hits = 181
```

20. ได้การชนครบ 181 คู่เท่ากับการตรวจทุกคู่ ด้วยการเปรียบเทียบ 5,688 ครั้ง (ยังน้อยกว่า 80,000 ประมาณ 14 เท่า)

> [!question]- คำถาม 3.2: ถ้า `cell_size = 150` แต่ศัตรูมีขนาด 50×50 ทำไมจึงตรวจเพียงช่องข้างเคียง 1 ช่องก็พอ และถ้าศัตรูขนาด 200×200 จะต้องทำอย่างไร
> > [!success]- แนวคำตอบ
> > เพราะ 50 < 150 กล่องศัตรูยื่นได้ไม่เกิน 1 ช่อง ถ้าศัตรูใหญ่กว่าช่อง (200 > 150) อาจยื่นไป 2 ช่อง ต้องตรวจเพิ่มหรือเพิ่ม `cell_size` ให้ใหญ่กว่าวัตถุที่ใหญ่ที่สุด

### ขั้นตอนที่ 12: วัด FPS ในเกมจริง (Pygame)
21. เปิดโปรเจกต์เกมจากบทที่ 7 เพิ่ม `Bullet`, `Grid` และการแสดง FPS ในวงวนเกม

```python
font = pygame.font.SysFont(None, 28)
...
fps_text = font.render(f"FPS: {clock.get_fps():.1f}", True, (255, 255, 255))
bullet_count = len([s for s in all_sprites if isinstance(s, Bullet)])
count_text = font.render(f"Bullets: {bullet_count}  Enemies: {len(enemies)}", True, (255, 255, 255))
screen.blit(fps_text, (10, 10))
screen.blit(count_text, (10, 40))
```
```
(บนจอ) มุมบนซ้ายแสดง "FPS: 60.0" และ "Bullets: 5  Enemies: 200" กระสุนสีเหลืองพุ่งจากยานไปทางเมาส์ทุก 10 เฟรม ศัตรูที่โดนหายไป
```

22. ทดลองและบันทึกตาราง 3 แถว: จำนวนศัตรู 200 / 1,000 / 2,000 ตัว กับ FPS เมื่อ (ก) ตรวจทุกคู่ (ข) ใช้กริด — คาดว่า (ก) จะต่ำกว่า 60 ชัดเจนเมื่อศัตรู 2,000 ตัว ส่วน (ข) ยังใกล้ 60

> [!tip] ค่า FPS ขึ้นกับเครื่อง
> ตัวเลขของแต่ละคนไม่เท่ากัน สิ่งที่ต้องสังเกตคือ **แนวโน้ม**: วิธีตรวจทุกคู่ FPS ลดลงตามจำนวนศัตรูแบบเป็นสัดส่วน ($O(B \cdot E)$) ส่วนกริดลดลงช้ากว่ามาก

## คำถามท้ายใบงาน
> [!question]- 1. ยานอยู่ที่ (200, 200) เมาส์อยู่ที่ (500, 600) และ `bullet_speed = 5` จงหาความเร็วกระสุนและตำแหน่งหลังผ่านไป 10 เฟรม
> > [!success]- แนวคำตอบ
> > $\mathbf{d} = (300, 400)$ ขนาด 500 → $\hat{\mathbf{d}} = (0.6, 0.8)$ → ความเร็ว $(3, 4)$ → หลัง 10 เฟรมอยู่ที่ $(200 + 30,\ 200 + 40) = (230, 240)$

> [!question]- 2. กริดจอ 1200×900 `cell_size = 100` กระสุน 40 ลูก ศัตรู 2,000 ตัว กระจายเท่ากัน ประมาณจำนวนการเปรียบเทียบของวิธีกริด และเทียบกับ `cell_size = 150` ข้อดี–ข้อเสียคืออะไร
> > [!success]- แนวคำตอบ
> > 108 ช่อง → $80{,}000 / 108 \approx 741$ ครั้ง น้อยกว่า 1,667 ของ `cell_size = 150` แต่ช่องเล็กลงทำให้วัตถุคร่อมเส้นแบ่งบ่อยขึ้น พลาดการชนมากขึ้นถ้าไม่ตรวจช่องข้างเคียง

> [!question]- 3. จงเขียน `update()` ของกระสุนในส่วนที่ 1 ใหม่โดยไม่ใช้ `remove` แต่ใช้ List Comprehension กรองกระสุนที่ยังอยู่ในจอ
> > [!success]- แนวคำตอบ
> > ```python
> > for bullet in bullets:
> >     bullet.update()
> > bullets = [b for b in bullets if not b.off_screen(800, 600)]
> > ```
> > สร้างลิสต์ใหม่รอบเดียว $O(B)$ แทนการ `remove` ทีละตัวที่แต่ละครั้งเป็น $O(B)$

## สิ่งที่ต้องส่ง
- ไฟล์ `lab08_<รหัสนักศึกษา>.py` (หรือ `.ipynb`) ที่มีผลลัพธ์ของขั้นตอนที่ 1–11 ตรงกับใบงาน
- ตาราง FPS จากขั้นตอนที่ 22 พร้อมสรุปแนวโน้ม 2–3 ประโยค
- คำตอบคำถาม 1.1–1.3, 2.1, 3.1–3.2 และคำถามท้ายใบงาน 1–3
- โปรเจกต์เกมที่ยิงกระสุนไปยังเมาส์ ศัตรูหายเมื่อโดนยิง และแสดง FPS บนจอ (ภาพหน้าจอ 1 ภาพ)
