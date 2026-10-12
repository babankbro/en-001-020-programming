> [!info] ผลลัพธ์ในใบงานนี้
> output ทุกกล่องได้จากการรันจริงด้วย Python 3.12 และ NumPy ส่วนที่เป็น Pygame จะบรรยายสิ่งที่เห็นบนจอแทน ใบงานนี้ทดสอบ **ตรรกะ** ของศัตรูด้วยไพทอนล้วน ๆ ก่อน แล้วค่อยนำไปใส่ในคลาส Pygame ให้นักศึกษา **ทายผลลัพธ์บนกระดาษก่อนรัน** ทุกครั้ง โดยเฉพาะตารางไล่ค่าทีละเฟรม

## ส่วนที่ 1: จำลองแรงเสียดทาน (35 นาที)

### ขั้นตอนที่ 1: จำลองด้วย NumPy
1. สร้างโฟลเดอร์ `Lab07/` แล้วสร้างไฟล์ `friction_sim.py` เปิดโฟลเดอร์ `Lab07/` ใน VS Code (File → Open Folder) เพื่อให้ Current Working Directory ถูกต้องตลอดใบงาน
2. ทายก่อน: ยานเริ่มด้วยอัตราเร็ว 5 ถูกคูณ 0.97 ทุกเฟรม จะต้องใช้กี่เฟรมจึงช้ากว่า 1

```python
import numpy as np

rad = np.radians(230)
a = np.array([np.cos(rad), np.sin(rad)])
velocity = a * 5
pos = np.array([600.0, 450.0])
print("unit direction =", np.round(a, 4), "length =", round(np.linalg.norm(a), 4))
print("velocity0      =", np.round(velocity, 4), "speed =", round(np.linalg.norm(velocity), 4))

n = 0
while True:
    pos = pos + velocity
    velocity *= 0.97
    n += 1
    speed = np.linalg.norm(velocity)
    if n <= 3 or n >= 52:
        print(f"frame {n:2d}: pos = {np.round(pos, 2)}  speed = {speed:.4f}")
    if speed < 1:
        break

print("frames until speed < 1:", n)
print("distance moved:", round(np.linalg.norm(pos - np.array([600.0, 450.0])), 2))
```
```
unit direction = [-0.6428 -0.766 ] length = 1.0
velocity0      = [-3.2139 -3.8302] speed = 5.0
frame  1: pos = [596.79 446.17]  speed = 4.8500
frame  2: pos = [593.67 442.45]  speed = 4.7045
frame  3: pos = [590.64 438.85]  speed = 4.5634
frame 52: pos = [514.85 348.52]  speed = 1.0259
frame 53: pos = [514.19 347.74]  speed = 0.9951
frames until speed < 1: 53
distance moved: 133.5
```

> [!question]- คำถาม 1.1: ทำไม `length` ของ `a` จึงเท่ากับ 1.0 พอดีโดยไม่ต้อง normalize
> > [!success]- แนวคำตอบ
> > เพราะ $\cos^2\theta + \sin^2\theta = 1$ เวกเตอร์ $(\cos\theta, \sin\theta)$ จึงเป็นเวกเตอร์หนึ่งหน่วยอยู่แล้ว คูณ 5 ได้อัตราเร็ว 5 พอดี

### ขั้นตอนที่ 2: ยืนยันด้วยสูตร
3. สร้างไฟล์ `friction_formula.py` คำนวณจากสูตร $|v_n| = 5 \times 0.97^n$ และ $n > \ln(v_{min}/v_0)/\ln f$ แล้วเทียบกับขั้นตอนที่ 1

```python
import math

v0, f, vmin = 5, 0.97, 1
n = math.log(vmin / v0) / math.log(f)
print("n >", round(n, 2), "-> use", math.ceil(n), "frames")
for k in (1, 2, 3, 10, 52, 53):
    print(f"speed after {k:2d} frames = {v0 * f**k:.4f}")
print("max distance =", round(v0 / (1 - f), 2))
```
```
n > 52.84 -> use 53 frames
speed after  1 frames = 4.8500
speed after  2 frames = 4.7045
speed after  3 frames = 4.5634
speed after 10 frames = 3.6871
speed after 52 frames = 1.0259
speed after 53 frames = 0.9951
max distance = 166.67
```

4. เปลี่ยน `f` เป็น 0.9, 0.95 และ 0.98 บันทึกจำนวนเฟรมและระยะสูงสุดลงตารางในใบงาน (ควรได้ 16, 32, 80 เฟรม และ 50, 100, 250 พิกเซล)

> [!warning] ระยะ 166.67 กับ 133.5 ไม่เท่ากัน
> 166.67 คือผลรวมอนุกรมเรขาคณิต **อนันต์** (ถ้าไม่ `break`) ส่วน 133.5 คือระยะที่ขยับจริงใน 53 เฟรม $= 5(1 - 0.97^{53})/0.03$ โจทย์จะถามคนละอย่างกัน อ่านให้ดี

> [!question]- คำถาม 1.2: ถ้าเปลี่ยนเงื่อนไขเป็น `if speed < 0.1: break` จะใช้กี่เฟรม (คำนวณด้วยสูตรก่อน แล้วแก้โค้ดตรวจ)
> > [!success]- แนวคำตอบ
> > $n > \ln(0.02)/\ln(0.97) = -3.912/-0.0305 \approx 128.4 \Rightarrow 129$ เฟรม

### ขั้นตอนที่ 3: มุมที่เหลือก็ลดแบบเรขาคณิต
5. สร้างไฟล์ `angle_decay.py` ไล่ค่าการหมุนแบบนุ่มนวลของยานจากมุม 0 ไปเป้าหมาย 90 ด้วย `rotation_smoothness = 0.15`

```python
angle, target, smooth = 0, 90, 0.15
for frame in range(1, 5):
    angle_diff = (target - angle) % 360
    if angle_diff > 180:
        angle_diff -= 360
    angle += angle_diff * smooth
    print(f"frame {frame}: diff = {angle_diff:.4f}  angle = {angle:.4f}")
print("remaining after 10 frames =", round(90 * 0.85**10, 4))
```
```
frame 1: diff = 90.0000  angle = 13.5000
frame 2: diff = 76.5000  angle = 24.9750
frame 3: diff = 65.0250  angle = 34.7288
frame 4: diff = 55.2712  angle = 43.0194
remaining after 10 frames = 17.7187
```

6. เปลี่ยน `angle, target = 350, 20` แล้วรันใหม่ — เฟรมแรกควรได้ `diff = 30.0000` และ `angle = 354.5000` (ไม่ใช่หมุนลบ 330°)

## ส่วนที่ 2: มอดูล config.py และศัตรูเคลื่อนที่สุ่ม (45 นาที)

### ขั้นตอนที่ 4: สร้างโครงสร้างโปรเจกต์
7. สร้างโฟลเดอร์ `Lab07/game/` และไฟล์ตามผัง คัดลอก `space.py` และโฟลเดอร์ `images/` จาก Lab06 มาไว้ด้วย
```
Lab07/
├── friction_sim.py  friction_formula.py  angle_decay.py  seek.py
└── game/
    ├── config.py  test_config.py  enemy_logic.py
    ├── enemy.py  red_enemy.py  space.py  main.py
    └── images/
```

```python
# game/config.py
SCREEN_WIDTH = 1200
SCREEN_HEIGHT = 900
FPS = 60
```
```python
# game/test_config.py
from config import *
import config

print(SCREEN_WIDTH, SCREEN_HEIGHT)
print(config.SCREEN_WIDTH * config.SCREEN_HEIGHT)
print(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
```
```
1200 900
1080000
600 450
```

8. สร้างไฟล์ `bad_import.py` ที่มีเพียง `import config` ตามด้วย `print(SCREEN_WIDTH)` แล้วรัน สังเกตข้อความผิดพลาด
```
NameError: name 'SCREEN_WIDTH' is not defined
```

> [!tip] รันจากโฟลเดอร์ไหน
> ไพทอนหามอดูลจากโฟลเดอร์ของไฟล์ที่รัน (`game/`) จึงเจอ `config.py` เสมอ แต่ `pygame.image.load("Lab07/game/images/enemy.png")` เป็นเส้นทางสัมพัทธ์ต่อ **โฟลเดอร์ที่สั่งรัน** ต้องเปิด VS Code ที่โฟลเดอร์แม่ของ `Lab07/` ไม่เช่นนั้นได้ `FileNotFoundError`

### ขั้นตอนที่ 5: ตรรกะศัตรูสุ่มด้วยไพทอนล้วน
9. ก่อนแตะ Pygame ให้เขียนคลาสจำลองที่เก็บ `pos` เป็น float, คำนวณ `rect` เป็น int และสะท้อนขอบ ทดสอบด้วย `random.seed(7)` เพื่อให้ได้ค่าสุ่มเหมือนกันทุกเครื่อง

```python
# game/enemy_logic.py
import random
from config import *

class SimpleEnemy:
    def __init__(self, x, y, size=50, max_speed=3):
        self.pos = [float(x), float(y)]        # ตำแหน่งจริง (float)
        self.size = size
        self.max_speed = max_speed
        vx = random.uniform(-max_speed, max_speed)
        vy = random.uniform(-max_speed, max_speed)
        self.vel = [vx, vy]

    def rect(self):                            # (left, top, right, bottom) เป็น int
        left, top = int(self.pos[0]), int(self.pos[1])
        return left, top, left + self.size, top + self.size

    def update(self):
        self.pos[0] += self.vel[0]
        self.pos[1] += self.vel[1]
        left, top, right, bottom = self.rect()
        if left < 0 or right > SCREEN_WIDTH:
            self.vel[0] *= -1
        if top < 0 or bottom > SCREEN_HEIGHT:
            self.vel[1] *= -1

random.seed(7)
e = SimpleEnemy(1145, 100)
print("vel =", [round(v, 3) for v in e.vel])
e.vel = [2.5, -1.0]                            # กำหนดค่าเองเพื่อไล่ตารางได้
for frame in range(1, 6):
    e.update()
    left, top, right, bottom = e.rect()
    print(f"frame {frame}: pos.x = {e.pos[0]:7.1f}  rect.right = {right}  vel = {e.vel}")
```
```
vel = [-1.057, -2.095]
frame 1: pos.x =  1147.5  rect.right = 1197  vel = [2.5, -1.0]
frame 2: pos.x =  1150.0  rect.right = 1200  vel = [2.5, -1.0]
frame 3: pos.x =  1152.5  rect.right = 1202  vel = [-2.5, -1.0]
frame 4: pos.x =  1150.0  rect.right = 1200  vel = [-2.5, -1.0]
frame 5: pos.x =  1147.5  rect.right = 1197  vel = [-2.5, -1.0]
```

> [!question]- คำถาม 2.1: ในเฟรมที่ 2 `rect.right = 1200` เท่ากับ `SCREEN_WIDTH` พอดี ทำไมจึงยังไม่สะท้อน และถ้าเปลี่ยน `>` เป็น `>=` ตารางจะเปลี่ยนอย่างไร
> > [!success]- แนวคำตอบ
> > เงื่อนไขคือ `right > SCREEN_WIDTH` ซึ่ง 1200 > 1200 เป็นเท็จ ถ้าใช้ `>=` จะสะท้อนตั้งแต่เฟรม 2 (`vel.x = −2.5`) และเฟรม 3 จะได้ `pos.x = 1147.5`

10. เปลี่ยนตำแหน่งเริ่มเป็น `SimpleEnemy(1160, 100)` แล้วรันใหม่ สังเกตว่า `vel.x` สลับเครื่องหมายทุกเฟรมแต่ `pos.x` วนอยู่ที่ 1160–1162.5 — นี่คืออาการ **ติดผนัง**
```
frame 1: pos.x =  1162.5  rect.right = 1212  vel = [-2.5, -1.0]
frame 2: pos.x =  1160.0  rect.right = 1210  vel = [2.5, -1.0]
frame 3: pos.x =  1162.5  rect.right = 1212  vel = [-2.5, -1.0]
frame 4: pos.x =  1160.0  rect.right = 1210  vel = [2.5, -1.0]
```

> [!warning] วิธีแก้อาการติดผนัง
> เมื่อพบว่าล้ำขอบ ให้ **วางตำแหน่งกลับเข้ามา** ก่อนกลับทิศ เช่น `self.pos[0] = SCREEN_WIDTH - self.size` ในกิ่ง `right > SCREEN_WIDTH` — ยานใน `space.py` ใช้ `self.rect.right = SCREEN_WIDTH` ด้วยเหตุผลเดียวกัน (ดู [บท 07 หัวข้อ 5](/module/07#topic-5))

### ขั้นตอนที่ 6: ใส่ลงคลาส Pygame
11. เขียน `game/enemy.py` ตามโค้ดใน [บท 07 หัวข้อ 3](/module/07#topic-3) (สืบทอด `pygame.sprite.Sprite`, เก็บ `self.pos` เป็น `Vector2`, สุ่ม `vel` ด้วย `random.uniform`) แล้วใน `main.py` สร้างศัตรู 8 ตัวใส่ `pygame.sprite.Group` เรียก `enemies.update()` และ `enemies.draw(screen)` ในวงวนเกม

**สิ่งที่เห็นบนจอ:** ศัตรู 8 ตัวเริ่มจากตำแหน่งที่กำหนด แต่ละตัววิ่งไปคนละทิศคนละอัตราเร็ว (บางตัวช้ามากเพราะสุ่มได้ค่าใกล้ 0) เมื่อชนขอบจอจะสะท้อนกลับเป็นมุมเท่ากับมุมตกกระทบโดยอัตราเร็วไม่ลดลง และวิ่งอย่างนี้ไปเรื่อย ๆ ไม่มีวันหยุด ถ้ารันซ้ำโดยไม่ตั้ง `random.seed` ทิศทางจะต่างจากเดิมทุกครั้ง

## ส่วนที่ 3: ศัตรูสีแดงไล่ตามผู้เล่น (40 นาที)

### ขั้นตอนที่ 7: คำนวณทิศและความเร่ง
12. สร้างไฟล์ `seek.py` ใน `Lab07/` คำนวณด้วยมือก่อน: ศัตรูอยู่ที่ (200, 500) ผู้เล่นอยู่ที่ (500, 100) เวกเตอร์ไปหาผู้เล่นคืออะไร ขนาดเท่าใด

```python
import math

def length(v):
    return math.hypot(v[0], v[1])

def normalize(v):
    L = length(v)
    return (v[0] / L, v[1] / L)

def scale_to_length(v, L):
    u = normalize(v)
    return (u[0] * L, u[1] * L)

player = (500, 100)
enemy_pos = (200, 500)
direction = (player[0] - enemy_pos[0], player[1] - enemy_pos[1])
print("direction =", direction, "length =", length(direction))
unit = normalize(direction)
print("unit      =", unit)
print("accel     =", (round(unit[0] * 0.1, 3), round(unit[1] * 0.1, 3)))

vel = (-9, 12)
print("speed", length(vel), "->", scale_to_length(vel, 5))
```
```
direction = (300, -400) length = 500.0
unit      = (0.6, -0.8)
accel     = (0.06, -0.08)
speed 15.0 -> (-3.0, 4.0)
```

> [!question]- คำถาม 3.1: ถ้าสลับเป็น `enemy_pos - player` ศัตรูจะทำอะไร และถ้าศัตรูอยู่ที่ (500, 100) พอดี `normalize` จะเกิดอะไร
> > [!success]- แนวคำตอบ
> > ได้ (−300, 400) ชี้ออกจากผู้เล่น ศัตรูจะ **หนี** แทนที่จะไล่; ถ้าตำแหน่งตรงกัน `direction = (0, 0)` ขนาด 0 → `ZeroDivisionError` (ใน Pygame คือ `ValueError`) จึงต้องตรวจ `length() > 0` ก่อน

### ขั้นตอนที่ 8: ไล่ค่า 3 เฟรม
13. ทายก่อน: ถ้า `vel` เริ่มที่ (2.0, 0.0) และ `max_speed = 3` หลัง 3 เฟรมความเร็วจะเป็นเท่าใด (ผู้เล่นอยู่นิ่ง)

```python
import math

def length(v): return math.hypot(v[0], v[1])
def normalize(v):
    L = length(v); return (v[0] / L, v[1] / L)

player = (500, 100)
pos = [200.0, 500.0]
vel = [2.0, 0.0]
max_speed = 3
for frame in range(1, 4):
    direction = (player[0] - pos[0], player[1] - pos[1])
    if length(direction) > 0:
        u = normalize(direction)
        vel[0] += u[0] * 0.1
        vel[1] += u[1] * 0.1
    if length(vel) > max_speed:
        u = normalize(vel)
        vel = [u[0] * max_speed, u[1] * max_speed]
    pos[0] += vel[0]
    pos[1] += vel[1]
    print(f"frame {frame}: vel = ({vel[0]:.4f}, {vel[1]:.4f})  speed = {length(vel):.4f}  pos = ({pos[0]:.4f}, {pos[1]:.4f})")
```
```
frame 1: vel = (2.0600, -0.0800)  speed = 2.0616  pos = (202.0600, 499.9200)
frame 2: vel = (2.1197, -0.1602)  speed = 2.1258  pos = (204.1797, 499.7598)
frame 3: vel = (2.1792, -0.2406)  speed = 2.1925  pos = (206.3590, 499.5192)
```

14. เพิ่ม `range(1, 4)` เป็น `range(1, 20)` และพิมพ์เฉพาะเฟรมที่ `speed` ถึง 3 เป็นครั้งแรก — ควรเป็นเฟรมที่ 14 จากนั้น `speed` จะค้างที่ 3.0000 เพราะ `scale_to_length`

> [!tip] ทิศเปลี่ยนทุกเฟรม
> ตั้งแต่เฟรมที่ 2 ทิศไม่ใช่ (0.6, −0.8) พอดีแล้ว เพราะศัตรูขยับไป ตำแหน่งสัมพัทธ์จึงเปลี่ยน นี่คือเหตุผลที่ต้องคำนวณ `direction` ใหม่ **ทุกเฟรม** ไม่ใช่คำนวณครั้งเดียวตอน `__init__`

### ขั้นตอนที่ 9: การแยกตัว
15. เพิ่มท้าย `seek.py`: ตัวเองอยู่ที่ (300, 300) อีกตัวอยู่ที่ (280, 310) คำนวณ `push = me - other` แล้ว `normalize` และคูณ 0.1 — ควรพิมพ์ได้ `unit = (0.8944, -0.4472)` และ `accel = (0.0894, -0.0447)` ตรงกับ [บท 07 หัวข้อ 4](/module/07#topic-4)

### ขั้นตอนที่ 10: ใส่ลงคลาส RedEnemy
16. เขียน `game/red_enemy.py` ตามโค้ดใน [บท 07 หัวข้อ 4](/module/07#topic-4) คอนสตรักเตอร์รับ `(x, y, player, red_enemys, image_path)` ใน `main.py` สร้างยาน `space` ก่อน แล้วสร้างศัตรูแดง 5 ตัวโดยส่ง `space` และกลุ่ม `red_enemys` เข้าไป

**สิ่งที่เห็นบนจอ:** ศัตรูแดง 5 ตัวเริ่มนิ่ง แล้วค่อย ๆ ออกตัวเข้าหายาน (ประมาณครึ่งวินาทีจึงถึงอัตราเร็วสูงสุด) เมื่อยานขยับหนี ฝูงจะโค้งตามอย่างนุ่มนวลไม่หักเลี้ยวทันที เพราะเร่งทีละ 0.1 ต่อเฟรม เมื่อหลายตัววิ่งมาชนกันจะผลักกันออกจนเรียงเป็นแถวล้อมยานแทนที่จะซ้อนกันเป็นจุดเดียว ถ้าลบส่วนแยกตัวออก ศัตรูทุกตัวจะรวมกันเป็นก้อนเดียวภายในไม่กี่วินาที

> [!warning] ใครต้อง `update()` ก่อน
> ใน `main.py` ให้เรียก `space.update()` ก่อน `red_enemys.update()` เพื่อให้ศัตรูไล่ตำแหน่ง **ล่าสุด** ของยาน ถ้าสลับกันศัตรูจะไล่ตำแหน่งเมื่อเฟรมก่อน (ต่างกันเล็กน้อยแต่เป็นหลักการที่ต้องรู้)

## คำถามท้ายใบงาน
> [!question]- 1. ยานมี `friction = 0.97` และ `max_speed = 8` เมื่อปล่อยปุ่มที่อัตราเร็วสูงสุด ต้องผ่านไปกี่เฟรมจึงช้ากว่า 1 และเป็นกี่วินาทีที่ 60 FPS
> > [!success]- แนวคำตอบ
> > $n > \ln(1/8)/\ln 0.97 = -2.079/-0.0305 \approx 68.3 \Rightarrow 69$ เฟรม ≈ 1.15 วินาที

> [!question]- 2. ถ้าเปลี่ยนความเร่งไล่ตามจาก 0.1 เป็น 0.5 และ `max_speed` ยังเป็น 3 พฤติกรรมศัตรูแดงจะต่างไปอย่างไร และจะถึงอัตราเร็วสูงสุดจากนิ่งในกี่เฟรม (ทิศคงที่)
> > [!success]- แนวคำตอบ
> > หักเลี้ยวไวขึ้นมาก ไล่ตามได้แม่นกว่าแต่ดูกระตุก; ถึง 3 ในเฟรมที่ 6 (0.5 × 6 = 3.0 ไม่เกิน จึงถึงพอดีโดยไม่ถูก scale)

> [!question]- 3. `Enemy` ในหัวข้อ 3 ใช้ `self.rect.topleft = (int(self.pos.x), int(self.pos.y))` แต่ `RedEnemy` ใช้ `self.rect.center` ถ้าสร้างทั้งสองด้วย `x, y` เท่ากัน ภาพจะอยู่ตำแหน่งเดียวกันหรือไม่
> > [!success]- แนวคำตอบ
> > ไม่ — ตัวแรกวางมุมบนซ้ายที่ (x, y) ตัวหลังวางจุดศูนย์กลางที่ (x, y) ภาพขนาด 50×50 จึงเหลื่อมกัน 25 พิกเซลทั้งสองแกน ต้องใช้แบบเดียวกันทั้ง `__init__` และ `update()` ไม่เช่นนั้นภาพจะกระโดดในเฟรมแรก

## สิ่งที่ต้องส่ง
- โฟลเดอร์ `Lab07/` ทั้งหมด: `friction_sim.py`, `friction_formula.py`, `angle_decay.py`, `seek.py` และ `game/` ที่มี `config.py`, `enemy_logic.py`, `enemy.py`, `red_enemy.py`, `space.py`, `main.py`
- ตารางจำนวนเฟรมและระยะสูงสุดสำหรับ `f = 0.9, 0.95, 0.97, 0.98` (ขั้นตอนที่ 2 ข้อ 4)
- คำตอบคำถาม 1.1, 1.2, 2.1, 3.1 และคำถามท้ายใบงาน 1–3 ในไฟล์ `answers.md`
- วิดีโอสั้นหรือภาพหน้าจอเกมที่มีศัตรูสุ่ม 8 ตัวและศัตรูแดง 5 ตัวไล่ตามยาน
