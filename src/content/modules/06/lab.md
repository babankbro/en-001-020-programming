> [!info] ผลลัพธ์ในใบงานนี้
> output ทุกกล่องได้จากการรันจริงด้วย Python 3.12 และ NumPy 2.x บน Jupyter Notebook / Google Colab ให้นักศึกษาพิมพ์โค้ดเอง **ห้ามคัดลอกวาง** และก่อนรันทุกเซลล์ให้ **คำนวณผลบนกระดาษก่อน** แล้วค่อยเทียบกับเครื่อง — ข้อสอบจะให้คำนวณมือแบบเดียวกันนี้

## ส่วนที่ 1: เวกเตอร์และเมทริกซ์ด้วย NumPy (40 นาที)

### ขั้นตอนที่ 1: บวก ลบ คูณสเกลาร์ และกับดักลิสต์
1. สร้างสมุดใหม่ชื่อ `Lab06_<รหัสนักศึกษา>.ipynb` แล้วพิมพ์เซลล์แรก

```python
import numpy as np

u = np.array([1, 2, 3])
v = np.array([3, 3, 0])
print("u + v =", u + v)
print("u - v =", u - v)
print("u * 2 =", u * 2)
print("u ** 2 =", u ** 2)
print(type(u + v))
```
```
u + v = [4 5 3]
u - v = [-2 -1  3]
u * 2 = [2 4 6]
u ** 2 = [1 4 9]
<class 'numpy.ndarray'>
```

2. ทำแบบเดียวกันด้วย **ลิสต์** แล้วเทียบผล

```python
a = [1, 2, 3]
b = [3, 3, 0]
print(a + b)
print(a * 2)
print(np.array(a) + np.array(b))
```
```
[1, 2, 3, 3, 3, 0]
[1, 2, 3, 1, 2, 3]
[4 5 3]
```

> [!question]- คำถาม 1.1: ดูจากผลลัพธ์อย่างเดียว จะรู้ได้อย่างไรว่าบรรทัดใดเป็นลิสต์ บรรทัดใดเป็น np.array
> > [!success]- แนวคำตอบ
> > ลิสต์พิมพ์มีจุลภาคคั่น `[1, 2, 3, 3, 3, 0]` ส่วน np.array พิมพ์คั่นด้วยช่องว่าง `[4 5 3]` และ `+` ของลิสต์คือต่อกัน ไม่ใช่บวกเวกเตอร์

### ขั้นตอนที่ 2: ขนาด เวกเตอร์หนึ่งหน่วย และผลคูณจุด
```python
print(np.linalg.norm(v))
print(np.linalg.norm(np.array([3, 4])))
w = np.array([3, 4])
w_hat = w / np.linalg.norm(w)
print(w_hat)
print(np.linalg.norm(w_hat))
print(np.dot(u, v))
```
```
4.242640687119285
5.0
[0.6 0.8]
1.0
9
```
3. ตรวจมือ: $|\mathbf{v}| = \sqrt{9+9+0} = \sqrt{18} \approx 4.243$ และ $\mathbf{u}\cdot\mathbf{v} = 3 + 6 + 0 = 9$
4. เปลี่ยนเป็น $\mathbf{u} = (2, -3, 1)$, $\mathbf{v} = (4, 0, -2)$ คำนวณมือก่อนแล้วรัน `print(u + v, u - v, np.dot(u, v))` — ควรได้ `[ 6 -3 -1] [-2 -3  3] 6` และ `round(np.linalg.norm(v), 2)` ได้ `4.47`

> [!warning] อย่าหารด้วยขนาดศูนย์
> `np.array([0, 0]) / 0` ได้ `[nan nan]` พร้อม RuntimeWarning โปรแกรมไม่หยุดแต่ค่าทั้งหมดที่ตามมาจะเป็น nan ในเกมจึงตรวจ `if input_dir.length() > 0:` ก่อน normalize เสมอ

### ขั้นตอนที่ 3: เมทริกซ์ เอกลักษณ์ และ `*` กับ `@`
```python
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
B = np.array([[1, 0, 0],
              [0, 1, 0],
              [0, 0, 1]])
print(A + B)
print(A - B)
print(np.matmul(A, B))
```
```
[[ 2  2  3]
 [ 4  6  6]
 [ 7  8 10]]
[[0 2 3]
 [4 4 6]
 [7 8 8]]
[[1 2 3]
 [4 5 6]
 [7 8 9]]
```
5. อธิบายในเซลล์ Markdown ว่าทำไม `np.matmul(A, B)` จึงได้ `A` กลับมา แล้วลอง `print(A * B)` — จะได้เมทริกซ์ที่เหลือเฉพาะแนวทแยง `[[1 0 0] [0 5 0] [0 0 9]]` ส่วน `print(A @ B)` ได้ `A` เหมือน `np.matmul`

6. คูณเมทริกซ์ 2×2 ด้วยมือ (แถว·คอลัมน์) ทั้ง $PQ$ และ $QP$ ก่อนรัน

```python
P = np.array([[1, 2], [3, 4]])
Q = np.array([[5, 6], [7, 8]])
print(P @ Q)
print(Q @ P)
print(P * Q)
```
```
[[19 22]
 [43 50]]
[[23 34]
 [31 46]]
[[ 5 12]
 [21 32]]
```

> [!question]- คำถาม 1.2: `A * B` ได้เมทริกซ์ที่เหลือแต่แนวทแยง (1, 5, 9) เพราะอะไร และถ้าต้องการคูณเมทริกซ์จริง ๆ มีกี่วิธีเขียน
> > [!success]- แนวคำตอบ
> > `*` คูณทีละตำแหน่ง ตำแหน่งที่ B เป็น 0 จึงกลายเป็น 0 เหลือเฉพาะแนวทแยงที่ B เป็น 1 — คูณเมทริกซ์ใช้ `A @ B`, `np.matmul(A, B)` หรือ `A.dot(B)` (3 วิธี ให้ผลเหมือนกัน)

## ส่วนที่ 2: เมทริกซ์การหมุนและวงโคจร (40 นาที)

### ขั้นตอนที่ 4: หมุน (10, 0) ด้วย R(30°)
```python
theta_rad = np.radians(30)
R = np.array([[np.cos(theta_rad), -np.sin(theta_rad)],
              [np.sin(theta_rad),  np.cos(theta_rad)]])
print(np.round(R, 3))

world_pos = np.array([10.0, 0.0])
ori_pos = np.array([0.0, 0.0])
new_world_pos = R.dot(world_pos - ori_pos) + ori_pos
print(np.round(new_world_pos, 2))
print(np.linalg.norm(world_pos - ori_pos), np.linalg.norm(new_world_pos - ori_pos))
```
```
[[ 0.866 -0.5  ]
 [ 0.5    0.866]]
[8.66 5.  ]
10.0 10.0
```
7. ตรวจมือ: $x' = 10(0.866) - 0(0.5) = 8.66$, $y' = 10(0.5) + 0(0.866) = 5$ และรัศมีก่อน–หลังหมุนเท่ากัน

### ขั้นตอนที่ 5: ฟังก์ชันหมุนรอบจุดใด ๆ
8. เขียนฟังก์ชัน `rotate_about(point, center, theta_deg)` ตามขั้น **เลื่อน → หมุน → เลื่อนกลับ** แล้วทดสอบ 4 กรณี (คำนวณมือก่อนทุกข้อ)

```python
def rotate_about(point, center, theta_deg):
    t = np.radians(theta_deg)
    R = np.array([[np.cos(t), -np.sin(t)],
                  [np.sin(t),  np.cos(t)]])
    point = np.array(point, dtype=float)
    center = np.array(center, dtype=float)
    return R.dot(point - center) + center

print(np.round(rotate_about((7, 3), (3, 3), 90), 2))
print(np.round(rotate_about((5, 1), (2, 1), 180), 2))
print(np.round(rotate_about((2, 5), (0, 0), 90), 2))
print(np.round(rotate_about((4, 0), (0, 0), 60), 2))
```
```
[3. 7.]
[-1.  1.]
[-5.  2.]
[2.   3.46]
```

9. ลองทำ "ผิดลำดับ" โดยแก้บรรทัด return เป็น `R.dot(point) + center` (หมุนก่อนแล้วค่อยบวก) แล้วรัน `rotate_about((7, 3), (3, 3), 90)` อีกครั้ง — จะได้ `[ 0. 10.]` แทน `[3. 7.]` จากนั้นแก้กลับให้ถูก

> [!question]- คำถาม 2.1: ทำไมผลลัพธ์ "ผิดลำดับ" จึงได้ (0, 10) จงไล่ขั้นตอน
> > [!success]- แนวคำตอบ
> > หมุน (7, 3) รอบ (0, 0) 90° ได้ (−3, 7) แล้วบวก (3, 3) ได้ (0, 10) — เป็นการหมุนรอบจุดกำเนิดแล้วเลื่อนทั้งภาพ ไม่ใช่หมุนรอบ (3, 3) ต้องลบจุดศูนย์กลางออกก่อนหมุน

### ขั้นตอนที่ 6: จุดบนวงโคจรด้วย linspace
```python
radius = np.linalg.norm(world_pos - ori_pos)
angles = np.linspace(0, 2 * np.pi, 100)
orbit_x = ori_pos[0] + radius * np.cos(angles)
orbit_y = ori_pos[1] + radius * np.sin(angles)
print(len(angles), round(angles[1], 4))
print(np.round(orbit_x[:3], 3), np.round(orbit_y[:3], 3))
print(np.round(np.sqrt(orbit_x**2 + orbit_y**2)[:5], 3))
```
```
100 0.0635
[10.    9.98  9.92] [0.    0.634 1.266]
[10. 10. 10. 10. 10.]
```
10. สังเกตว่า `angles[1]` = $2\pi/99 \approx 0.0635$ (ไม่ใช่ $2\pi/100$) เพราะ `linspace` รวมปลายทั้งสองข้าง และทุกจุดห่างจากศูนย์กลาง 10 เท่ากัน
11. คำนวณมือ: `np.linspace(0, 2*np.pi, 5)` ให้มุม 0°, 90°, 180°, 270°, 360° → จุดบนวงโคจรคือ (10, 0), (0, 10), (−10, 0), (0, −10), (10, 0)
12. ไล่ค่าเฟรมของภาพเคลื่อนไหว (`theta_deg = frame * 2`) โดยไม่ต้องเปิด Matplotlib

```python
for frame in [0, 15, 45, 90, 180]:
    theta_deg = frame * 2
    p = rotate_about(world_pos, ori_pos, theta_deg)
    print(f"frame {frame:3d}: theta = {theta_deg:3d}° -> ({p[0]:6.2f}, {p[1]:6.2f})")
```
```
frame   0: theta =   0° -> ( 10.00,   0.00)
frame  15: theta =  30° -> (  8.66,   5.00)
frame  45: theta =  90° -> (  0.00,  10.00)
frame  90: theta = 180° -> (-10.00,   0.00)
frame 180: theta = 360° -> ( 10.00,  -0.00)
```

> [!tip] `-0.00` ไม่ใช่ความผิดพลาด
> $\sin360°$ ในเครื่องได้ค่าประมาณ $-2.4 \times 10^{-16}$ ไม่ใช่ 0 พอดี เพราะ $\pi$ เก็บได้ไม่แม่นยำสมบูรณ์ เมื่อแสดงทศนิยม 2 ตำแหน่งจึงเห็น `-0.00`

13. (ถ้ามีเวลา) วาดวงโคจรและจุดด้วย Matplotlib: `ax.plot(orbit_x, orbit_y, '--')`, `ax.plot(new_world_pos[0], new_world_pos[1], 'ro')`, `ax.set_aspect('equal')` แล้วใช้ `animation.FuncAnimation(fig, animate, frames=180, interval=20)` ตามโค้ดในบทเรียน — บนจอจะเห็นวงกลมเส้นประรัศมี 10 มีจุดสีแดงวิ่งทวนเข็มนาฬิกาจาก (10, 0) ครบรอบใน 3.6 วินาที (ถ้าไม่ใส่ `set_aspect('equal')` วงกลมจะดูเป็นวงรี)

## ส่วนที่ 3: ตรรกะยานอวกาศ (40 นาที)

ส่วนนี้เขียนด้วย `math` ล้วน ไม่ต้องติดตั้ง Pygame เพื่อให้ตรวจตัวเลขได้ แต่ทุกฟังก์ชันคือสิ่งที่ `game/space.py` ทำในเมท็อด `update()`

### ขั้นตอนที่ 7: มุมเป้าหมายจากปุ่มกด
14. คำนวณ target_angle ของทั้ง 6 กรณี **ด้วยมือลงตาราง** ก่อนรัน

```python
import math

def target_angle(dx, dy):
    return math.degrees(math.atan2(-dy, dx)) - 90

keys = {"ขึ้น": (0, -1), "ขวา": (1, 0), "ซ้าย": (-1, 0), "ลง": (0, 1),
        "ขึ้น+ขวา": (1, -1), "ลง+ซ้าย": (-1, 1)}
for name, (dx, dy) in keys.items():
    print(f"{name:10} input_dir=({dx:2d},{dy:2d})  target = {target_angle(dx, dy):7.1f}")
```
```
ขึ้น       input_dir=( 0,-1)  target =     0.0
ขวา        input_dir=( 1, 0)  target =   -90.0
ซ้าย       input_dir=(-1, 0)  target =    90.0
ลง         input_dir=( 0, 1)  target =  -180.0
ขึ้น+ขวา   input_dir=( 1,-1)  target =   -45.0
ลง+ซ้าย    input_dir=(-1, 1)  target =  -225.0
```

15. เขียน `normalize(dx, dy)` ที่คืน `(0, 0)` เมื่อขนาดเป็นศูนย์ (ไม่หาร) แล้วตรวจว่า `normalize(1, -1)` ได้ `(0.7071067811865475, -0.7071067811865475)` และ target_angle ของเวกเตอร์หลัง normalize ยังเท่าเดิม (−45°) เพราะ atan2 ไม่สนใจขนาด

> [!question]- คำถาม 3.1: ถ้าเขียน `target_angle` เป็น `math.degrees(math.atan2(dy, dx)) - 90` (ลืมลบหน้า dy) กดปุ่มขึ้นจะได้ target เท่าใด และยานหันไปทางไหน
> > [!success]- แนวคำตอบ
> > atan2(−1, 0) = −90° → target = −180° คือหันลง ตรงข้ามกับปุ่มที่กด เพราะแกน y ของจอชี้ลง ต้องกลับเครื่องหมายก่อนหามุม

### ขั้นตอนที่ 8: มุมต่างที่สั้นที่สุดและ Lerp
16. เติมคอลัมน์ raw, % 360 และ diff ลงตารางด้วยมือก่อนรัน (จำไว้ว่ามอดุโลของจำนวนลบในไพทอนให้ผลบวก)

```python
def shortest_diff(angle, target):
    angle_diff = (target - angle) % 360
    if angle_diff > 180:
        angle_diff -= 360
    return angle_diff

for angle, target in [(170, -170), (10, 350), (0, -90), (170, -90), (-30, 200)]:
    print(f"angle={angle:5}  target={target:5}  raw={target-angle:5}  diff={shortest_diff(angle, target):5}")
```
```
angle=  170  target= -170  raw= -340  diff=   20
angle=   10  target=  350  raw=  340  diff=  -20
angle=    0  target=  -90  raw=  -90  diff=  -90
angle=  170  target= -90  raw= -260  diff=  100
angle=  -30  target=  200  raw=  230  diff= -130
```

17. จำลองการหมุนแบบนุ่มนวล 5 เฟรม จาก 0° ไป −90° ด้วย `rotation_smoothness = 0.15`

```python
angle = 0
target = -90
rotation_smoothness = 0.15
for frame in range(1, 6):
    angle_diff = shortest_diff(angle, target)
    angle += angle_diff * rotation_smoothness
    print(f"frame {frame}: angle = {angle:8.3f}  (เหลือ {target - angle:7.3f})")
```
```
frame 1: angle =  -13.500  (เหลือ -76.500)
frame 2: angle =  -24.975  (เหลือ -65.025)
frame 3: angle =  -34.729  (เหลือ -55.271)
frame 4: angle =  -43.019  (เหลือ -46.981)
frame 5: angle =  -50.067  (เหลือ -39.933)
```
18. ตรวจว่ามุมที่เหลือหลังเฟรม $n$ เท่ากับ $90 \times 0.85^{\,n}$ (เฟรม 3: $90 \times 0.614 = 55.27$) — ลดลงแบบเรขาคณิตเหมือนแรงเสียดทาน

> [!warning] Lerp ไม่มีวันถึงเป้าพอดี
> ทุกเฟรมเหลือ 85% ของมุมที่เหลือ จึงเข้าใกล้ −90 เรื่อย ๆ แต่ไม่เท่ากับ −90 ในทางทฤษฎี ในเกมมองไม่เห็นความต่างเพราะมุมเล็กกว่า 1° ตั้งแต่เฟรมที่ ~28

### ขั้นตอนที่ 9: ความเร่ง แรงเสียดทาน และความเร็วสูงสุด
19. เขียน `accel_from_angle` ตามสูตร $(\cos, -\sin)$ ของมุม `angle + 90` แล้วตรวจว่ากลับกันกับตาราง target_angle พอดี (ค่า `thrust = 0.2` เป็นค่าสมมติสำหรับทดลอง)

```python
def accel_from_angle(angle, thrust):
    angle_rad = math.radians(angle + 90)
    return (math.cos(angle_rad) * thrust, -math.sin(angle_rad) * thrust)

for angle in [0, -90, 90, -180, -45]:
    ax, ay = accel_from_angle(angle, 0.2)
    print(f"angle={angle:5}  accel=({ax:7.4f}, {ay:7.4f})")
```
```
angle=    0  accel=( 0.0000, -0.2000)
angle=  -90  accel=( 0.2000, -0.0000)
angle=   90  accel=(-0.2000, -0.0000)
angle= -180  accel=( 0.0000,  0.2000)
angle=  -45  accel=( 0.1414, -0.1414)
```

20. ไล่ความเร็วทีละเฟรม: กดปุ่มขึ้น (angle = 0) 3 เฟรม แล้วปล่อยปุ่ม 3 เฟรม (`friction = 0.97`)

```python
vx, vy = 0.0, 0.0
thrust = 0.2
friction = 0.97
max_speed = 5
for frame in range(1, 4):
    ax, ay = accel_from_angle(0, thrust)
    vx += ax
    vy += ay
    print(f"กดปุ่ม เฟรม {frame}: v = ({vx:.2f}, {vy:.2f})")
for frame in range(1, 4):
    vx *= friction
    vy *= friction
    print(f"ปล่อยปุ่ม เฟรม {frame}: v = ({vx:.4f}, {vy:.4f})")
```
```
กดปุ่ม เฟรม 1: v = (0.00, -0.20)
กดปุ่ม เฟรม 2: v = (0.00, -0.40)
กดปุ่ม เฟรม 3: v = (0.00, -0.60)
ปล่อยปุ่ม เฟรม 1: v = (0.0000, -0.5820)
ปล่อยปุ่ม เฟรม 2: v = (0.0000, -0.5645)
ปล่อยปุ่ม เฟรม 3: v = (0.0000, -0.5476)
```

21. เขียน `scale_to_length(vx, vy, length)` เลียนแบบ Pygame (หารด้วยขนาดแล้วคูณ `length`) และทดสอบกับความเร็ว (6, 8) เมื่อ `max_speed = 5` — ต้องได้ `3.0 4.0`

> [!question]- คำถาม 3.2: ความเร็ว (−0.6, 0) หลังปล่อยปุ่มกี่เฟรมจึงมีขนาดต่ำกว่า 0.1 (friction = 0.97) ให้ประมาณด้วยลอการิทึมแล้วตรวจด้วยลูป
> > [!success]- แนวคำตอบ
> > $0.6 \times 0.97^n < 0.1 \Rightarrow n > \ln(1/6)/\ln 0.97 = -1.792/-0.0305 \approx 58.8$ → **59 เฟรม** (ตรวจ: $0.6 \times 0.97^{58} \approx 0.1025$, $0.6 \times 0.97^{59} \approx 0.0990$)

22. (ส่วนเสริม ถ้าติดตั้ง Pygame แล้ว) นำฟังก์ชันทั้งสามไปใส่ในคลาส `Spaceship(pygame.sprite.Sprite)` ที่มี `self.pos`, `self.velocity`, `self.angle` แล้วใช้ `pygame.transform.rotate(self.original_image, self.angle)` วาดภาพยาน — บนจอจะเห็นยานหันหัวตามปุ่มลูกศรอย่างนุ่มนวล พุ่งไปทางที่หัน และค่อย ๆ ไถลหยุดเมื่อปล่อยปุ่ม

## คำถามท้ายใบงาน
> [!question]- 1. หมุนจุด (8, 2) รอบจุดศูนย์กลาง (2, 2) เป็นมุม 90° และ 180° ได้จุดใด และรัศมีเท่าใด
> > [!success]- แนวคำตอบ
> > เลื่อนได้ (6, 0) รัศมี 6 → 90°: (0, 6) + (2, 2) = **(2, 8)** · 180°: (−6, 0) + (2, 2) = **(−4, 2)**

> [!question]- 2. ผู้เล่นกดปุ่มขึ้นและซ้ายพร้อมกัน ยานหันอยู่ที่ angle = −120 จงหา target_angle, angle_diff และมุมหลังเฟรมแรก (smoothness 0.15)
> > [!success]- แนวคำตอบ
> > input_dir = (−1, −1) → atan2(1, −1) = 135° → target = 45° · angle_diff = (45 − (−120)) % 360 = 165 (ไม่เกิน 180) → มุมใหม่ = −120 + 165 × 0.15 = **−95.25**

> [!question]- 3. `P = np.array([[1,2],[3,4]])` จงหา `P @ P @ P` และอธิบายว่าทำไม `P * P * P` จึงไม่ใช่คำตอบเดียวกัน
> > [!success]- แนวคำตอบ
> > `P @ P = [[7 10] [15 22]]` → `@ P` ได้ `[[37 54] [81 118]]` (เช่น $7\cdot1 + 10\cdot3 = 37$) ส่วน `P * P * P = [[1 8] [27 64]]` คือยกกำลังสามทีละตัว

## สิ่งที่ต้องส่ง
- ไฟล์ `Lab06_<รหัสนักศึกษา>.ipynb` ที่รันครบทุกเซลล์ พร้อมเซลล์ Markdown แสดงการคำนวณมือของข้อ 3, 6, 7, 8, 14 และ 16
- คำตอบคำถาม 1.1, 1.2, 2.1, 3.1, 3.2 และคำถามท้ายใบงาน 1–3
- ฟังก์ชัน `rotate_about`, `target_angle`, `shortest_diff`, `accel_from_angle` ที่ทำงานถูกต้องตามผลลัพธ์ในใบงาน
