> [!info] ผลลัพธ์ในใบงานนี้
> ใบงานนี้ต้องรันบน **เครื่องของตนเอง** ด้วย Python 3.12 + VS Code (Google Colab เปิดหน้าต่าง Pygame ไม่ได้) กล่อง output ที่เป็นตัวเลขได้จากการรันจริง ส่วนขั้นตอนที่เปิดหน้าต่างเกมจะบรรยาย **สิ่งที่ควรเห็นบนจอ** แทน ก่อนรันทุกครั้งให้ **ทายผลบนกระดาษก่อน** โดยเฉพาะตารางไล่ค่าทีละเฟรม แล้วค่อยเทียบกับโปรแกรม ให้พิมพ์โค้ดเอง **ห้ามคัดลอกวาง**

## ส่วนที่ 1: หน้าต่างเกมและการวาดรูปทรง (35 นาที)

### ขั้นตอนที่ 1: ติดตั้ง Pygame
1. สร้างโฟลเดอร์ `Lab05_<รหัสนักศึกษา>` เปิดด้วย VS Code แล้วติดตั้งไลบรารีใน Terminal

```python
pip install pygame matplotlib
python -c "import pygame; print(pygame.version.ver)"
```
```
2.6.1
```
(เลขรุ่นอาจต่างกันเล็กน้อย ขอให้ขึ้นต้นด้วย 2 และไม่มี error)

### ขั้นตอนที่ 2: คำนวณตำแหน่งรูปทรงก่อนวาด
2. สร้างแฟ้ม `geo_check.py` คำนวณค่าที่ `first_gam.py` ต้องใช้ **ก่อน** เปิดหน้าต่าง ทายค่าทุกบรรทัดบนกระดาษก่อนรัน

```python
import math

WIDTH, HEIGHT = 800, 600
circle_x, circle_y = WIDTH//2, HEIGHT//2
circle_radius = HEIGHT//2
a = 2*math.sqrt(circle_radius**2/2)
rect_x, rect_y = circle_x - a//2, circle_y - a//2

print("center =", (circle_x, circle_y), "radius =", circle_radius)
print(f"a = {a:.2f}  (r*sqrt2 = {circle_radius*math.sqrt(2):.2f})")
print("a//2 =", a//2, " a/2 =", round(a/2, 2))
print("rect topleft =", (rect_x, rect_y))
print(f"rect bottomright = ({rect_x + a:.2f}, {rect_y + a:.2f})")
print("diagonal length =", round(math.sqrt(2)*a, 2), " 2r =", 2*circle_radius)
```
```
center = (400, 300) radius = 300
a = 424.26  (r*sqrt2 = 424.26)
a//2 = 212.0  a/2 = 212.13
rect topleft = (188.0, 88.0)
rect bottomright = (612.26, 512.26)
diagonal length = 600.0  2r = 600
```

> [!question]- คำถาม 1.1: บรรทัดสุดท้ายยืนยันอะไร และทำไม `a//2` จึงได้ `212.0` ไม่ใช่ `212.13`
> > [!success]- แนวคำตอบ
> > เส้นทแยงมุมของสี่เหลี่ยม $a\sqrt{2} = 600$ เท่ากับเส้นผ่านศูนย์กลาง $2r$ พอดี จึงยืนยันว่าสี่เหลี่ยมแนบในวงกลมจริง ส่วน `//` คือหารปัดลง จึงตัด .13 ทิ้งแต่ยังเป็น float เพราะ `a` เป็น float

### ขั้นตอนที่ 3: `first_gam.py` วงกลม สี่เหลี่ยมแนบใน และกากบาท
3. สร้างแฟ้ม `first_gam.py` นำ 5 บรรทัดคำนวณจากข้อ 2 มาใช้ แล้วเพิ่มวงวนเกมให้ครบ 6 ขั้น

```python
import math
import pygame

WIDTH, HEIGHT = 800, 600
BLACK, GREEN, BLUE, RED = (0, 0, 0), (0, 255, 0), (0, 0, 255), (255, 0, 0)
...                                   # circle_x, circle_y, circle_radius, a, rect_x, rect_y จากข้อ 2

pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("first_gam")
clock = pygame.time.Clock()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill(BLACK)
    pygame.draw.circle(screen, GREEN, (circle_x, circle_y), circle_radius)
    pygame.draw.rect(screen, BLUE, (rect_x, rect_y, a, a))
    pygame.draw.line(screen, RED, (rect_x, rect_y), (rect_x + a, rect_y + a), 20)
    pygame.draw.line(screen, RED, (rect_x, rect_y + a), (rect_x + a, rect_y), 20)
    pygame.display.flip()
    clock.tick(60)
pygame.quit()
```
```
หน้าต่างชื่อ "first_gam" ขนาด 800×600 พื้นดำ
วงกลมสีเขียวแตะขอบบนและขอบล่างของจอพอดี (สูง 600)
สี่เหลี่ยมจัตุรัสสีน้ำเงินอยู่ในวงกลม มุมทั้งสี่แตะเส้นรอบวง
กากบาทสีแดงหนา 20 พิกเซล ตัดกันตรงกลางจอ (400, 300)
กดปุ่มปิดหน้าต่าง → โปรแกรมจบโดยไม่ค้าง
```

4. ทดลองแก้ทีละข้อแล้วบันทึกสิ่งที่เห็น (แก้กลับทุกครั้ง): ย้าย `draw.circle` ไปหลัง `draw.line` ทั้งสอง · ลบ `pygame.display.flip()` · เปลี่ยน `clock.tick(60)` เป็น `clock.tick(2)`

> [!warning] อย่าลืม `for event in pygame.event.get()`
> ถ้าไม่มีการรับเหตุการณ์ หน้าต่างจะขึ้นว่า "ไม่ตอบสนอง" และกดปิดไม่ได้ ต้องหยุดด้วย Ctrl+C ใน Terminal

> [!question]- คำถาม 1.2: ถ้าเปลี่ยน `circle_radius = HEIGHT//2` เป็น `WIDTH//2` จะเกิดอะไรขึ้นกับวงกลมและสี่เหลี่ยม
> > [!success]- แนวคำตอบ
> > รัศมี 400 วงกลมสูง 800 เกินจอ (ถูกตัดบน–ล่าง) ส่วนสี่เหลี่ยมมีด้าน $400\sqrt{2} \approx 565.69$ มุมบนซ้ายที่ `(400 - 282.0, 300 - 282.0) = (118.0, 18.0)` ยังอยู่ในจอ แต่มุมล่างขวา y ≈ 583.69 เกือบชนขอบล่าง

## ส่วนที่ 2: ลูกบอลเด้ง จากพจนานุกรมสู่คลาส (50 นาที)

### ขั้นตอนที่ 4: ฟิสิกส์ล้วน ๆ โดยยังไม่เปิดหน้าต่าง
5. สร้างแฟ้ม `ball_physics.py` ที่มีเฉพาะส่วนคำนวณ (ไม่ `import pygame`) **ก่อนรัน ให้ไล่ค่าเฟรมที่ 1 และ 2 ด้วยมือลงตาราง** เริ่ม x = 400, y = 100, vx = 3, vy = 0

```python
GRAVITY = 0.1
BOUNCE_DAMPING = 0.9
DAMPING_COEFFICIENT = 0.999
SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600

def move_ball(ball):
    ball["x"] += ball["vx"]
    ball["y"] += ball["vy"]
    ball["vy"] += GRAVITY
    ball["vx"] *= DAMPING_COEFFICIENT
    ball["vy"] *= DAMPING_COEFFICIENT
    if ball["x"] - ball["radius"] <= 0 or ball["x"] + ball["radius"] >= SCREEN_WIDTH:
        ball["vx"] = -ball["vx"] * BOUNCE_DAMPING
    if ball["y"] + ball["radius"] >= SCREEN_HEIGHT:
        ball["vy"] = -ball["vy"] * BOUNCE_DAMPING
        ball["y"] = SCREEN_HEIGHT - ball["radius"]

ball = {"x": 400, "y": 100, "vx": 3, "vy": 0, "radius": 15}
print("frame        x          y       vx       vy")
for frame in range(1, 4):
    move_ball(ball)
    print(f"{frame:5d} {ball['x']:10.4f} {ball['y']:10.4f} {ball['vx']:8.4f} {ball['vy']:8.4f}")
```
```
frame        x          y       vx       vy
    1   403.0000   100.0000   2.9970   0.0999
    2   405.9970   100.0999   2.9940   0.1997
    3   408.9910   100.2996   2.9910   0.2994
```

6. เทียบกับตารางที่ไล่ด้วยมือ ถ้าเฟรม 1 ได้ y = 100.1 แสดงว่าคุณบวกความโน้มถ่วง **ก่อน** ปรับตำแหน่ง ซึ่งไม่ตรงกับลำดับในโค้ด

> [!question]- คำถาม 2.1: ทำไม y ในเฟรมที่ 1 ยังเป็น 100.0000 ทั้งที่มีความโน้มถ่วง
> > [!success]- แนวคำตอบ
> > `ball["y"] += ball["vy"]` ทำงานขณะ vy ยังเป็น 0 แล้วค่อย `vy += GRAVITY` ความโน้มถ่วงจึงมีผลต่อ y ตั้งแต่เฟรมที่ 2 เป็นต้นไป (วิธีของออยเลอร์: ตำแหน่งใช้ความเร็ว **ของเฟรมก่อน**)

### ขั้นตอนที่ 5: `ball_sim.py` แบบพจนานุกรม พร้อมบันทึกเส้นทาง
7. สร้าง `ball_sim.py` นำ `move_ball` และค่าคงที่จากข้อ 5 มาใช้ เพิ่มส่วนวาด เก็บตำแหน่งทุกเฟรม และวาดกราฟหลังปิดหน้าต่าง

```python
import pygame
import matplotlib.pyplot as plt
...                                   # ค่าคงที่และ move_ball จาก ball_physics.py
BLACK, RED = (0, 0, 0), (255, 0, 0)

def draw_ball(screen, ball):
    pygame.draw.circle(screen, ball["color"], (int(ball["x"]), int(ball["y"])), ball["radius"])

pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
clock = pygame.time.Clock()
ball = {"x": 400, "y": 100, "vx": 3, "vy": 0, "radius": 15, "color": RED}
positions = []

running = True
while running:
    ...                               # event.get() / QUIT เหมือน first_gam.py
    screen.fill(BLACK)
    move_ball(ball)
    positions.append((ball["x"], ball["y"]))
    draw_ball(screen, ball)
    pygame.display.flip()
    clock.tick(60)
pygame.quit()

xs = [p[0] for p in positions]
ys = [p[1] for p in positions]
plt.plot(xs, ys)
plt.gca().invert_yaxis()
plt.show()
```
```
หน้าต่างเกม: ลูกบอลแดงเริ่มกลางจอด้านบน วิ่งไปทางขวาพร้อมตกลงเป็นเส้นโค้ง
ราว 1.7 วินาที (เฟรมที่ 101) แตะพื้นแล้วเด้งขึ้น แต่เด้งได้เตี้ยลงทุกครั้ง
ชนขอบขวาแล้วสะท้อนกลับมาทางซ้าย ความเร็วแนวนอนลดลงช้า ๆ
เมื่อปิดหน้าต่าง: กราฟ Matplotlib แสดงพาราโบลาคว่ำหลายลูกต่อกัน (แกน y กลับด้านตรงกับจอ)
```

> [!tip] ถ้ากราฟคว่ำผิดด้าน
> ลืม `plt.gca().invert_yaxis()` — Matplotlib ให้ y ชี้ขึ้น แต่จอเกมให้ y ชี้ลง

### ขั้นตอนที่ 6: ย้ายเป็นคลาส `Ball` ในแฟ้ม `ball.py`
8. สร้างแฟ้ม `ball.py` (ชื่อนี้เท่านั้น เพราะจะ `from ball import Ball`) รวมค่าคงที่ ข้อมูล และฟังก์ชันไว้ในคลาสเดียว

```python
import pygame

GRAVITY = 0.1
BOUNCE_DAMPING = 0.9
DAMPING_COEFFICIENT = 0.999
SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600

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
```

9. คัดลอก `ball_sim.py` เป็น `ball_sim_v2.py` ลบ `move_ball`, `draw_ball` และส่วน Matplotlib ออก แล้วแก้ให้ใช้คลาส

```python
from ball import Ball, SCREEN_WIDTH, SCREEN_HEIGHT
...
ball = Ball(400, 100, 3, 0, 15, RED)
while running:
    ...
    screen.fill(BLACK)
    ball.move()
    ball.draw(screen)
    pygame.display.flip()
    clock.tick(60)
```
```
หน้าต่างเกม: ลูกบอลเคลื่อนที่เหมือนขั้นตอนที่ 5 ทุกประการ
(พฤติกรรมเดิม แต่โค้ดในวงวนเกมเหลือ 2 บรรทัด)
```

10. ตรวจว่าคลาสให้ค่าเดียวกับพจนานุกรม และหาว่าลูกบอลแตะพื้นครั้งแรกเมื่อใด ด้วย `ball_check.py` (ไม่ต้องเปิดหน้าต่าง)

```python
from ball import Ball, SCREEN_HEIGHT, GRAVITY, DAMPING_COEFFICIENT

ball = Ball(400, 100, 3, 0, 15, (255, 0, 0))
frame = 0
while True:
    frame += 1
    vy_before = ball.vy
    ball.move()
    if ball.y == SCREEN_HEIGHT - ball.radius:
        break
print("hit floor at frame", frame)
print(f"x = {ball.x:.2f}, y = {ball.y}, vy before bounce = {(vy_before + GRAVITY)*DAMPING_COEFFICIENT:.4f}, vy after = {ball.vy:.4f}")
```
```
hit floor at frame 101
x = 688.34, y = 585, vy before bounce = 9.6017, vy after = -8.6415
```
(Pygame จะพิมพ์ข้อความต้อนรับ 1 บรรทัดก่อน output — ไม่ใช่ error)

> [!question]- คำถาม 2.2: vy หลังสะท้อนเท่ากับ vy ก่อนสะท้อนคูณค่าใด และถ้าตั้ง `BOUNCE_DAMPING = 1.0` ลูกบอลจะเด้งกลับถึงความสูงเดิมหรือไม่
> > [!success]- แนวคำตอบ
> > $-9.6017 \times 0.9 = -8.6415$ ถ้าเป็น 1.0 จะเด้งเกือบถึงความสูงเดิมแต่ไม่ถึง เพราะยังมี `DAMPING_COEFFICIENT = 0.999` หน่วงทุกเฟรม

## ส่วนที่ 3: ลูกบอล 100 ลูก และสุนัขสไปรต์ (35 นาที)

### ขั้นตอนที่ 7: `ball_sim_v3.py` สร้างลูกบอล N ลูกด้วยการวนซ้ำ
11. ทายค่า x และ vx ของลูกบอล 5 ลูกแรกก่อน แล้วตรวจด้วย Python (ไม่เปิดหน้าต่าง)

```python
from ball import Ball

RED = (255, 0, 0)
balls = []
for i in range(5):
    balls.append(Ball(100 + i*20, 100, 3 * (-1)**i, 0, 15, RED))
print([(b.x, b.vx) for b in balls])
for b in balls:
    b.move()
print([round(b.x, 3) for b in balls])
```
```
[(100, 3), (120, -3), (140, 3), (160, -3), (180, 3)]
[103, 117, 143, 157, 183]
```

12. คัดลอก `ball_sim_v2.py` เป็น `ball_sim_v3.py` เปลี่ยนเป็น `N = 100` ลูก

```python
N = 100
balls = []
for i in range(N):
    balls.append(Ball(100 + i*20, 100, 3 * (-1)**i, 0, 15, RED))

while running:
    ...
    screen.fill(BLACK)
    for ball in balls:
        ball.move()
        ball.draw(screen)
    pygame.display.flip()
    clock.tick(60)
```
```
หน้าต่างเกม: ลูกบอลแดงเรียงกันเป็นแถวที่ y = 100 ห่างกัน 20 พิกเซล
ลูกลำดับคู่วิ่งขวา ลำดับคี่วิ่งซ้าย ทุกลูกตกถึงพื้นพร้อมกันที่เฟรม 101
ลูกที่ i ≥ 35 (x ≥ 800) เริ่มนอกจอขวา จะสั่นติดขอบขวาเพราะไม่มีการวางตำแหน่งกลับ
```

> [!question]- คำถาม 3.1: ลูกบอล i = 35 เริ่มที่ x = 800 เงื่อนไข `self.x + self.radius >= SCREEN_WIDTH` เป็นจริงทุกเฟรม เกิดอะไรกับ vx และควรแก้อย่างไรโดยใช้หลักเดียวกับการชนพื้น
> > [!success]- แนวคำตอบ
> > vx ถูกกลับทิศและคูณ 0.9 **ทุกเฟรม** ลูกบอลจึงสั่นอยู่ที่ขอบและช้าลงเรื่อย ๆ ควรเพิ่ม `self.x = SCREEN_WIDTH - self.radius` (และ `self.x = self.radius` สำหรับขอบซ้าย) เพื่อวางกลับเข้ามาในจอ

### ขั้นตอนที่ 8: `dog.py` สุนัขเดินกลับไปกลับมา
13. วางไฟล์ `dog.png` (พื้นหลังโปร่งใส หันหน้าไปทางขวา) ในโฟลเดอร์ `images/` แล้วสร้าง `dog.py`

```python
import pygame

SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600
BLACK = (0, 0, 0)

class Dog(pygame.sprite.Sprite):
    def __init__(self, x, y, vx, image_path):
        super().__init__()
        img = pygame.image.load(image_path).convert_alpha()
        self.image_right = pygame.transform.scale(img, (100, 100))
        self.image_left = pygame.transform.flip(self.image_right, True, False)
        self.image = self.image_right if vx > 0 else self.image_left
        self.rect = self.image.get_rect(topleft=(x, y))
        self.vx = vx

    def update(self):
        self.rect.x += self.vx
        if self.rect.right >= SCREEN_WIDTH:
            self.rect.right = SCREEN_WIDTH
            self.vx = -self.vx
            self.image = self.image_left
        elif self.rect.left <= 0:
            self.rect.left = 0
            self.vx = -self.vx
            self.image = self.image_right

pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
clock = pygame.time.Clock()
all_sprites = pygame.sprite.Group()
all_sprites.add(Dog(100, 400, 5, "images/dog.png"))

running = True
while running:
    ...                               # event.get() / QUIT
    screen.fill(BLACK)
    all_sprites.update()
    all_sprites.draw(screen)
    pygame.display.flip()
    clock.tick(60)
pygame.quit()
```
```
หน้าต่างเกม: สุนัขขนาด 100×100 เริ่มที่มุมบนซ้าย (100, 400) เดินไปทางขวา 5 พิกเซล/เฟรม
ถึงขอบขวา (rect.right = 800) ใน 120 เฟรม = 2 วินาที แล้วกลับภาพหันซ้ายเดินกลับ
ถึงขอบซ้ายกลับภาพหันขวา วนไปเรื่อย ๆ
```

> [!warning] `FileNotFoundError: images/dog.png`
> เส้นทางภาพสัมพัทธ์กับโฟลเดอร์ที่ **สั่งรัน** ใน Terminal ให้ `cd` เข้าโฟลเดอร์ `Lab05_<รหัส>` ก่อน `python dog.py` หรือกดปุ่ม Run ใน VS Code ขณะเปิดโฟลเดอร์นี้อยู่

14. ไล่ค่า `update()` ด้วยมือ 4 รอบ สำหรับสุนัขกว้าง 80 บนจอกว้าง 640 เริ่ม `rect.x = 15`, `vx = −5` (ไม่ต้องรัน) แล้วเทียบกับตาราง

| รอบ | rect.x | vx | ภาพ |
|---|---|---|---|
| 1 | 10 | −5 | ซ้าย |
| 2 | 5 | −5 | ซ้าย |
| 3 | 0 (ชนซ้าย) | 5 | ขวา |
| 4 | 5 | 5 | ขวา |

> [!question]- คำถาม 3.2: ถ้าลบ `super().__init__()` ออก จะเกิดอะไรเมื่อ `all_sprites.add(...)`
> > [!success]- แนวคำตอบ
> > `Sprite.__init__` ไม่ถูกเรียก โครงสร้างภายในที่เก็บว่าสไปรต์อยู่กลุ่มใดจึงไม่ถูกสร้าง เกิด `AttributeError` เมื่อ Group พยายามเพิ่มสไปรต์ — ต้องเรียก `super().__init__()` เป็นบรรทัดแรกของ `__init__` เสมอ

## คำถามท้ายใบงาน
> [!question]- 1. ลูกบอลรัศมี 20 บนจอสูง 600 อยู่ที่ y = 590 และ vy = 5 ขณะตรวจการชนพื้น (BOUNCE_DAMPING = 0.9) ค่า y และ vy ใหม่คือเท่าใด และถ้าไม่มีบรรทัด `self.y = SCREEN_HEIGHT - self.radius` จะเกิดอะไรในเฟรมถัดไป
> > [!success]- แนวคำตอบ
> > y = 580, vy = −4.5 ถ้าไม่วางกลับ y จะเป็น 585.5 ในเฟรมถัดไป ขอบล่าง 605.5 ยัง ≥ 600 จึงกลับทิศอีกเป็น vy ≈ +3.96 ลูกบอลสั่นติดพื้น

> [!question]- 2. จะเห็นอะไรบนจอหากสลับ `all_sprites.draw(screen)` ไปไว้ **ก่อน** `screen.fill(BLACK)` และลำดับที่ถูกต้องคืออะไร
> > [!success]- แนวคำตอบ
> > ภาพสุนัขถูกทาสีดำทับทุกเฟรม จอจึงดำสนิท ลำดับที่ถูกคือ event → fill → update → draw → flip → tick

> [!question]- 3. จงเขียนเมท็อด `speed()` ให้คลาส `Ball` คืนอัตราเร็ว (ขนาดของความเร็ว) แล้วคำนวณค่าเมื่อ vx = 3, vy = 4
> > [!success]- แนวคำตอบ
> > ```python
> > def speed(self):
> >     return math.sqrt(self.vx**2 + self.vy**2)
> > ```
> > $\sqrt{9 + 16} = 5$ (ต้อง `import math` ที่หัวแฟ้ม)

## สิ่งที่ต้องส่ง
- โฟลเดอร์ `Lab05_<รหัสนักศึกษา>` ที่มี `geo_check.py`, `first_gam.py`, `ball_physics.py`, `ball_sim.py`, `ball.py`, `ball_sim_v2.py`, `ball_sim_v3.py`, `dog.py` และ `images/dog.png`
- ภาพหน้าจอ (Screenshot) ของ `first_gam.py`, `ball_sim_v3.py`, `dog.py` และกราฟเส้นทางจาก `ball_sim.py`
- ตารางไล่ค่าด้วยมือ 2 เฟรม (ข้อ 5) และตารางสุนัข 4 รอบ (ข้อ 14) พร้อมคำตอบคำถาม 1.1–3.2 และคำถามท้ายใบงาน 1–3 ในแฟ้ม `answers.md`
