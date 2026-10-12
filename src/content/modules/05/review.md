## ภาพรวมบท
บทนี้สร้างเกมแรกด้วย Pygame ตั้งแต่วงวนเกม 6 ขั้นและระบบพิกัดจอที่แกน y ชี้ลง การวาดวงกลม สี่เหลี่ยม และเส้นจากค่าที่คำนวณเอง ไปจนถึงลูกบอลเด้งที่อัปเดตตำแหน่งและความเร็วทีละเฟรมด้วยวิธีของออยเลอร์ สะท้อนเมื่อชนขอบพร้อมเสียพลังงาน แล้วยกระดับโค้ดจากพจนานุกรมเป็นคลาส `Ball` และสไปรต์ `Dog` ซึ่งเป็นโครงของเกมยิงยานอวกาศบทที่ 6–8

![แผนที่แนวคิด 5 หัวข้อของบทที่ 5 รอบหัวข้อกลางเกมลูกบอลเด้ง](/infographics/05/summary.svg)

**วิธีอ่านภาพ**
1. เริ่มที่กล่องกลาง "เกมลูกบอลเด้ง" แล้วอ่านตามป้าย ① – ⑤: ① วงวนเกมคือเวทีที่วนทุกเฟรม → ② วาดสิ่งที่เห็นด้วยรูปทรงและสี → ③ ฟิสิกส์ออยเลอร์ในขั้น update → ④ ตรวจชนขอบหลังขยับ → ⑤ จัดทุกอย่างให้เป็นคลาสและสไปรต์
2. แต่ละการ์ดมีคำสั่งและ **ตัวเลขที่ออกสอบ** เช่น 600 ÷ 60 = 10 วินาที, a ≈ 424.26, y เฟรม 1 = 100, vy 5 → −4.5
3. กล่องจุดที่มักผิดท้ายภาพรวมสองข้อที่เสียคะแนนบ่อยที่สุดของบท

## สิ่งที่ต้องจำ (Key Facts)

### 1. วงวนเกมและระบบพิกัดจอภาพ
- วงวนเกม 6 ขั้นทุกเฟรม: **event → fill → update → draw → flip → tick**
- ไม่มี `event.get()` หน้าต่างค้าง · ไม่มี `fill()` เกิดรอยทาง · ไม่มี `flip()` ไม่เห็นภาพ · ไม่มี `tick()` เกมเร็วตามเครื่อง
- `clock.tick(60)` = ไม่เกิน 60 เฟรม/วินาที → 1 เฟรม ≈ 16.7 ms · 5 px/เฟรม = 300 px/วินาที
- วาด **ก่อน** `fill` → จอเป็นสีพื้นล้วน (fill ทาทับ) · สิ่งที่วาดทีหลังทับสิ่งที่วาดก่อน (วาดสี่เหลี่ยมแล้ววงกลม → วงกลมอยู่บน)
- เวลาทำงาน = `FRAME_LIMIT / FPS`: 600/60 = 10 s · 900/30 = 30 s · 1200/50 = 24 s · ms ต่อเฟรม = 1000/FPS
- จอภาพ: (0, 0) อยู่ **มุมบนซ้าย** แกน y **ชี้ลง** → ความโน้มถ่วงเป็นบวก, กดขึ้นคือ `y -= 1`, Matplotlib ต้อง `invert_yaxis()`
- `pygame.Rect`: `right = x + w`, `bottom = y + h`, `center = (x + w/2, y + h/2)` · กำหนด `rect.right = 800` เลื่อนทั้งกรอบ · `rect.x` เป็น **จำนวนเต็ม**

### 2. การวาดรูปทรงและสี่เหลี่ยมจัตุรัสแนบในวงกลม
- `draw.circle(screen, color, (cx, cy), r)` ใช้ **จุดศูนย์กลาง**
- `draw.rect(screen, color, (x, y, w, h))` ใช้ **มุมบนซ้าย** · ใส่ความหนา `1` = วาดแค่ขอบ
- `draw.line(screen, color, start, end, width)` ใช้จุดปลายสองจุด
- สี `(R, G, B)` แต่ละค่า 0–255 · วาดทีหลังทับของที่วาดก่อน
- สี่เหลี่ยมแนบในวงกลม: เส้นทแยง = $2r$ → $a = r\sqrt2$ · ศูนย์กลาง $(c_x, c_y)$ → มุมบนซ้าย $(c_x - a/2,\ c_y - a/2)$
- RGB ผสมแสงแบบบวก: เหลือง `(255, 255, 0)` = R+G · ฟ้าอมเขียว `(0, 255, 255)` = G+B · ม่วงแดง/ชมพูบานเย็น `(255, 0, 255)` = R+B · ขาว = ทั้งสาม · เทา = สามช่องเท่ากัน เช่น `(128, 128, 128)`

### 3. การเคลื่อนที่แบบออยเลอร์และความโน้มถ่วง
- ตำแหน่ง += ความเร็ว แล้ว ความเร็ว += ความเร่ง (1 เฟรม = 1 หน่วยเวลา)
- `ball.py` **ปรับตำแหน่งก่อน** แล้วจึง `vy += GRAVITY` และคูณ `DAMPING_COEFFICIENT` → เฟรมแรก y ยังไม่เปลี่ยนถ้า vy เริ่มที่ 0
- ค่าคงที่: `GRAVITY = 0.1`, `DAMPING_COEFFICIENT = 0.999`, `BOUNCE_DAMPING = 0.9`
- ความเร็วคงที่ → เส้นตรง (กระสุน) · ความเร่งคงที่ → พาราโบลา (ลูกบอล)
- ตำแหน่งเก็บเป็น float แปลง `int()` ตอนวาดเท่านั้น

### 4. การสะท้อนเมื่อชนขอบและการหน่วง
- ชนผนังซ้าย/ขวา กลับ `vx` · ชนบน/ล่าง กลับ `vy`
- เงื่อนไขใช้ **ขอบวงกลม**: `x - r <= 0`, `x + r >= W`, `y + r >= H`
- `vy = -vy * 0.9` เสียความเร็ว 10% ต่อครั้ง → ชนครั้งที่ $n$ เหลือ $v_0 \times 0.9^n$
- ต้อง **วางตำแหน่งกลับ** `y = H - r` ไม่เช่นนั้นเฟรมถัดไปยังอยู่นอกขอบ กลับทิศซ้ำจนติดผนัง
- `rect.py` ใช้ (x, y) เป็นมุมบนซ้าย ขอบซ้ายจริงคือ `x` ขอบขวาคือ `x + size` → `self.x <= 0 or self.x + self.size >= SCREEN_WIDTH` · แบบยืมจาก Ball `self.x - self.size <= 0` เด้งก่อนถึงขอบ `size` พิกเซล

### 5. จากพจนานุกรมสู่คลาสและสไปรต์
- พจนานุกรม: `ball["x"] += ball["vx"]` ข้อมูลแยกจากฟังก์ชัน · คลาส: `self.x += self.vx` รวมข้อมูลกับพฤติกรรม
- `Ball(400, 100, 3, 0, 15, RED)` เรียก `__init__` อัตโนมัติ · `self` คือวัตถุที่เรียกเมท็อด
- สร้าง N ลูกด้วย `for i in range(N)` · `3 * (-1)**i` สลับ +3, −3
- สไปรต์ต้องมี `image`, `rect`, `update()` และเรียก `super().__init__()` ก่อน
- `group.update()` เรียก `update()` ทุกตัว · `group.draw(screen)` วาด `image` ที่ `rect`
- `Dog(pygame.sprite.Sprite)` → `Dog` เป็น **คลาสลูก** ของ `Sprite` · ลืม `super().__init__()` → `group.add()` พังด้วย `AttributeError: ... no attribute '_Sprite__g'` · `isinstance(dog, pygame.sprite.Sprite)` → `True`
- Group กับศัตรู 100 ตัว: `all_sprites.add(enemy)` ในลูป แล้ว `update()`/`draw()` บรรทัดเดียวครบทุกตัว · `kill()` ลบออกจากทุก Group
- `flip(img, True, False)` ซ้าย–ขวา · `flip(img, False, True)` บน–ล่าง · `scale(img, (100, 100))` ขนาดใหม่พอดี (ยืดถ้าสัดส่วนต่าง) · `rotate(img, มุม)` ทวนเข็มบนจอ → หมุนจาก `original_image` เสมอ

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด | ตัวอย่างตัวเลข |
|---|---|---|---|
| เวลาต่อเฟรม | $1000/\text{FPS}$ ms | `clock.tick(FPS)` | 60 FPS → 16.7 ms |
| ระยะทาง | $d = v \times \text{FPS} \times t$ | | 4 px × 60 × 2.5 s = 600 px |
| เวลาจำลอง | จำนวนเฟรม ÷ FPS | `FRAME_LIMIT / FPS` | 900 / 30 = 30 s |
| กึ่งกลางจอ | $(W/2,\ H/2)$ | `WIDTH//2, HEIGHT//2` | (400, 300) |
| สี่เหลี่ยมแนบในวงกลม | $a = r\sqrt2 = 2\sqrt{r^2/2}$ | `2*math.sqrt(r**2/2)` | r = 300 → 424.26 |
| มุมบนซ้ายจากศูนย์กลาง | $(c_x - a/2,\ c_y - a/2)$ | `circle_x - a//2` | (188.0, 88.0) |
| ออยเลอร์ | $p_{t+1} = p_t + v_t$, $v_{t+1} = v_t + a$ | `x += vx; vy += GRAVITY` | vy: 0 → 0.0999 |
| การหน่วง | $v_n = v_0 \times 0.999^n$ | `vx *= 0.999` | $3 \times 0.999^{100} \approx 2.71$ |
| สะท้อน | $(v_x, v_y) \to (-v_x, v_y)$ / $(v_x, -v_y)$ | `vy = -vy * 0.9` | vy 5 → −4.5 |
| ชนครั้งที่ $n$ | $\lvert v_0 \rvert \times 0.9^n$ | | 4 → 3.6 → 3.24 |
| วางกลับ | $y = H - r$ | `self.y = SCREEN_HEIGHT - self.radius` | 600 − 20 = 580 |
| ตำแหน่งลูกที่ i | $x = 100 + 20i$, $v_x = 3(-1)^i$ | `3 * (-1)**i` | i = 3 → (160, −3) |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
class Ball:
    def __init__(self, x, y, vx, vy, radius, color):
        self.x, self.y = x, y
        self.vx, self.vy = vx, vy
        self.radius = radius
        self.color = color

    def move(self):
        self.x += self.vx                       # 1. ตำแหน่งก่อน
        self.y += self.vy
        self.vy += GRAVITY                      # 2. ความโน้มถ่วง
        self.vx *= DAMPING_COEFFICIENT          # 3. หน่วง
        self.vy *= DAMPING_COEFFICIENT
        if self.x - self.radius <= 0 or self.x + self.radius >= SCREEN_WIDTH:
            self.vx = -self.vx * BOUNCE_DAMPING
        if self.y + self.radius >= SCREEN_HEIGHT:
            self.vy = -self.vy * BOUNCE_DAMPING
            self.y = SCREEN_HEIGHT - self.radius   # วางกลับ

    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), self.radius)

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill(BLACK)
    for ball in balls:
        ball.move()
        ball.draw(screen)
    pygame.display.flip()
    clock.tick(60)
```

```python
class Rectangle:
    def __init__(self, x, y, vx, size, color):
        self.x, self.y, self.vx = x, y, vx
        self.size, self.color = size, color
    def move(self):
        self.x += self.vx
        if self.x <= 0 or self.x + self.size >= SCREEN_WIDTH:   # มุมบนซ้าย!
            self.vx = -self.vx
    def draw(self, screen):
        pygame.draw.rect(screen, self.color, (int(self.x), int(self.y), self.size, self.size))

class Dog(pygame.sprite.Sprite):
    def __init__(self, x, y, vx, image_path):
        super().__init__()                                       # บรรทัดแรกเสมอ
        img = pygame.image.load(image_path).convert_alpha()
        self.image_right = pygame.transform.scale(img, (100, 100))
        self.image_left = pygame.transform.flip(self.image_right, True, False)
        self.image = self.image_right
        self.rect = self.image.get_rect(topleft=(x, y))
        self.vx = vx
    def update(self):
        self.rect.x += self.vx
```

## ตัวอย่างไล่ค่า (Trace)
ลูกบอลเริ่ม x = 400, y = 100, vx = 3, vy = 0 (ยังไม่ชนขอบ)

| เฟรม | x | y | vx | vy |
|---|---|---|---|---|
| 0 | 400 | 100 | 3 | 0 |
| 1 | 403 | **100** | 2.997 | 0.0999 |
| 2 | 405.997 | 100.0999 | 2.994 | 0.1997 |
| 3 | 408.991 | 100.2996 | 2.991 | 0.2994 |
| 4 | 411.982 | 100.599 | 2.988 | 0.399 |
| 5 | 414.97 | 100.998 | 2.985 | 0.4985 |

สุนัขกว้าง 80 บนจอกว้าง 640 เริ่ม `rect.x = 15`, `vx = −5`

| update ครั้งที่ | rect.x | vx | ภาพ |
|---|---|---|---|
| 1 | 10 | −5 | ซ้าย |
| 2 | 5 | −5 | ซ้าย |
| 3 | 0 (ชนซ้าย, `rect.left = 0`) | 5 | ขวา |
| 4 | 5 | 5 | ขวา |

## ตัวเลขที่ออกสอบบ่อย
- `first_gam.py`: ศูนย์กลาง (400, 300), r = 300, $a \approx 424.26$, `a//2 = 212.0`, มุมบนซ้าย (188.0, 88.0), พื้นที่ 180,000
- x=400, y=100, vx=3, vy=0 → แตะพื้นที่เฟรม 101 (vy ≈ 9.60 → −8.64) และชนขอบขวาที่เฟรม 138
- x=100, y=200, vx=−4, vy=2 → 1 เฟรม: (96, 202, −3.996, 2.0979)
- ไม่หน่วง GRAVITY 0.5, 4 เฟรม → vy = 2.0, y เพิ่ม 3.0 (ถ้าสลับบรรทัดได้ 5.0)
- y=590, r=20, vy=5 ชนพื้น → y = 580, vy = −4.5 · ถ้าไม่วางกลับ เฟรมถัดไป y = 585.5 ชนซ้ำ vy ≈ 3.96
- vx = 4 ชนขวาแล้วซ้าย → −3.6 แล้ว 3.24
- `Rect` topleft (120, 80) ขนาด 50×50 → right 170, bottom 130, center (145, 105)
- `ball_sim_v3.py`: i = 3 → x = 160, vx = −3 · ลูกที่ i ≥ 35 เริ่มนอกจอ ($100 + 20 \times 35 = 800$)
- FPS 30 × FRAME_LIMIT 900 = 30 s · 600 เฟรมที่ 60 FPS = 10 s · 1200 เฟรมที่ 50 FPS = 24 s · ms/เฟรม: 60 → 16.7, 30 → 33.3, 50 → 20
- `Rectangle` size 40 เริ่ม x = 100, vx = −5: เงื่อนไขถูกชนที่เฟรม 20 (x = 0) · เงื่อนไขผิด `x - size <= 0` ชนที่เฟรม 12 (x = 40 เหลือช่องว่าง 40 px)
- `Bullet(400, 500)` speed 8: update 5 ครั้ง → y = 460
- ภาพ 80×40: `flip` → 80×40 · `scale(…, (100, 100))` → 100×100 · `rotate(…, 90)` → 40×80 · `rotate(…, 45)` → 84×84 · หมุนซ้ำ 10° สิบครั้ง → 251×247

## กับดักที่พบบ่อย
| ✗ ผิด | ✓ ถูก |
|---|---|
| บวก `vy += GRAVITY` ก่อน `y += vy` → y เฟรมแรกได้ 100.1 | ทำตามลำดับโค้ด: ตำแหน่งก่อน y เฟรมแรก = 100 |
| ชนขอบแล้วกลับทิศอย่างเดียว → สั่นติดผนัง | กลับทิศ **และ** วาง `y = SCREEN_HEIGHT - radius` |
| เงื่อนไขชนใช้จุดศูนย์กลาง `y >= SCREEN_HEIGHT` → บอลจมครึ่งลูก | ใช้ขอบวงกลม `y + radius >= SCREEN_HEIGHT` |
| `draw.rect(screen, c, (cx, cy, a, a))` ส่งศูนย์กลาง → รูปเลื่อนไปขวาล่าง | ส่งมุมบนซ้าย `(cx - a/2, cy - a/2, a, a)` |
| เรียก `flip()` ก่อนวาดเสร็จ หรือ `fill()` หลังวาด | event → fill → update → draw → flip → tick |
| ลืม `super().__init__()` ในคลาสลูกของ `Sprite` | เรียก `super().__init__()` เป็นบรรทัดแรกของ `__init__` |
| `rect.x += 0.3` คิดว่าวัตถุขยับช้า ๆ | `rect.x` ปัดเป็นจำนวนเต็ม ต้องเก็บตำแหน่ง float แยก |
| คิดว่า `a//2` ได้ 212.13 | `//` หารปัดลง ได้ `212.0` (float เพราะ `a` เป็น float) |
| วาดแล้วค่อย `fill` คิดว่าเห็นวัตถุ | จอเป็นสีพื้นล้วน เพราะ `fill` ทาทับทั้งจอ |
| เหลือง = `(255, 0, 255)` | เหลือง = `(255, 255, 0)` (แดง + เขียว) · `(255, 0, 255)` คือม่วงแดง |
| สี่เหลี่ยมใช้ `self.x - self.size <= 0` (ยืมจาก Ball) | `self.x <= 0` เพราะ (x, y) คือมุมบนซ้าย |
| `self.image = rotate(self.image, 10)` ทุกเฟรม | `rotate(self.original_image, self.angle)` ไม่เบลอ ไม่โต |
| `flip(img, False, True)` เพื่อให้หันซ้าย | `flip(img, True, False)` = ซ้าย–ขวา (ตัวแรกคือแกน x) |
| คิดว่า `rotate(img, 90)` หมุนตามเข็ม | มุมบวก = ทวนเข็มบนจอ |

## ทดสอบตัวเอง 5 ข้อ

> [!question]- 1. ลูกบอล x = 200, y = 50, vx = −2, vy = 1 (GRAVITY 0.1, DAMPING 0.999, ไม่ชนขอบ) หลัง `move()` 1 ครั้งได้ค่าใด
> > [!success]- เฉลย
> > x = 198, y = 51 (ใช้ vy เดิม), vx = $-2 \times 0.999 = -1.998$, vy = $(1 + 0.1) \times 0.999 = 1.0989$

> [!question]- 2. จอ 640×480 วาดวงกลมรัศมี 240 ที่กึ่งกลาง และสี่เหลี่ยมแนบในด้วยสูตรเดียวกับ `first_gam.py` จงหา $a$, `a//2` และมุมบนซ้าย
> > [!success]- เฉลย
> > ศูนย์กลาง (320, 240), $a = 240\sqrt2 \approx 339.41$, `a//2 = 169.0`, มุมบนซ้าย $(320 - 169,\ 240 - 169) = (151.0, 71.0)$

> [!question]- 3. `pygame.Rect(200, 150, 40, 60)` มีค่า `right`, `bottom`, `center` เท่าใด
> > [!success]- เฉลย
> > right = 200 + 40 = 240, bottom = 150 + 60 = 210, center = (200 + 20, 150 + 30) = (220, 180)

> [!question]- 4. ลูกบอลรัศมี 10 บนจอสูง 600 อยู่ที่ y = 595, vy = 6 ขณะตรวจการชนพื้น (BOUNCE_DAMPING 0.9) ค่า y และ vy ใหม่คือเท่าใด
> > [!success]- เฉลย
> > $595 + 10 = 605 \ge 600$ ชน → vy = $-6 \times 0.9 = -5.4$ และวางกลับ y = $600 - 10 = 590$

> [!question]- 5. ใน `ball_sim_v3.py` ลูกที่ i = 6 มี x เริ่มต้นและ vx เท่าใด และหลัง `move()` 2 ครั้ง x เป็นเท่าใด (ไม่ชนขอบ)
> > [!success]- เฉลย
> > x = 100 + 6×20 = 220, vx = $3 \times (-1)^6 = 3$ → เฟรม 1: x = 223, vx = 2.997 → เฟรม 2: x = 225.997

> [!question]- ข้อเสริม ก (แนวข้อสอบปลายภาค): `FRAME_LIMIT = 1200`, `FPS = 50` ทำงานกี่วินาที และถ้าวงวนเรียงเป็น event → update → draw → fill → flip → tick จะเห็นอะไร
> > [!success]- เฉลย
> > 1200 / 50 = **24 วินาที** (เฟรมละ 1000 / 50 = 20 ms) · เห็นจอเป็นสีพื้นล้วน เพราะ `fill` ทาทับทุกอย่างที่วาดก่อนถึง `flip`

> [!question]- ข้อเสริม ข (แนวข้อสอบปลายภาค): `class Dog(pygame.sprite.Sprite)` — `Dog` เป็นอะไรของ `Sprite` ถ้าลืม `super().__init__()` จะเกิดอะไร และสีม่วงแดงกับฟ้าอมเขียวมีทูเพิลใด
> > [!success]- เฉลย
> > `Dog` เป็นคลาสลูก (Subclass) ของ `Sprite` · ลืม `super().__init__()` → ตอน `all_sprites.add(dog)` เกิด `AttributeError: 'Dog' object has no attribute '_Sprite__g'` · ม่วงแดง `(255, 0, 255)` ฟ้าอมเขียว `(0, 255, 255)`

## เชื่อมโยงบทถัดไป
บทที่ 6 นำ **เวกเตอร์และเมทริกซ์การหมุน (NumPy)** มาใช้ เก็บตำแหน่งยานเป็น `pygame.math.Vector2` (แก้ปัญหา `rect.x` เป็นจำนวนเต็ม) หามุมจากปุ่มกดด้วย `atan2` และหมุนภาพจาก `original_image` — ทั้งหมดทำงานอยู่ในขั้น update และ draw ของวงวนเกม และใช้โครงสไปรต์ `image` / `rect` / `update()` จากบทนี้ ทบทวนต่อที่ [/module/06](/module/06)
