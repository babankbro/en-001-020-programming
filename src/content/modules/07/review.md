## สิ่งที่ต้องจำ (Key Facts)
- `velocity *= 0.97` ทุกเฟรม = **ลำดับเรขาคณิต** $v_n = v_0 \cdot 0.97^n$ ลดลง 3% ของค่าปัจจุบัน ไม่ใช่ลดทีละเท่ากัน และ **ไม่มีวันเป็นศูนย์** จึงต้องมีเกณฑ์ `< 1` หรือ `< 0.1`
- จำนวนเฟรมจนต่ำกว่าเกณฑ์ใช้ลอการิทึม: $n > \ln(v_{min}/v_0)/\ln f$ แล้วปัดขึ้น (ทั้งเศษและส่วนติดลบ)
- `(cos θ, sin θ)` มีขนาด 1 เสมอ → ใช้เป็นทิศได้ทันที คูณอัตราเร็วได้ความเร็ว
- **มอดูล** = ไฟล์ `.py` · `config.py` เก็บ `SCREEN_WIDTH = 1200`, `SCREEN_HEIGHT = 900` · `from config import *` ใช้ชื่อตรง ๆ · `import config` ต้องใช้ `config.SCREEN_WIDTH`
- เส้นทาง `"Lab07/game/images/enemy.png"` สัมพัทธ์ต่อโฟลเดอร์ที่ **สั่งรัน** ไม่ใช่ที่ไฟล์อยู่ → รันผิดที่ได้ `FileNotFoundError`
- `random.uniform(a, b)` คืน float ทุกค่าในช่วงเท่า ๆ กัน ค่าเฉลี่ย $(a+b)/2$ · `random.randint` คืน int รวมปลาย · `random.seed(n)` ทำให้สุ่มซ้ำได้
- เก็บ `pos` เป็น `Vector2` (float) แล้วค่อย `rect.topleft = (int(pos.x), int(pos.y))` — บวก 0.3 เข้า `rect.x` (int) ตรง ๆ วัตถุจะไม่ขยับ
- สะท้อนขอบซ้าย/ขวา กลับเฉพาะ `vel.x` · บน/ล่าง กลับเฉพาะ `vel.y` · อัตราเร็วคงเดิม · ถ้าไม่วางตำแหน่งกลับที่ขอบอาจ **ติดผนัง**
- **เวกเตอร์จาก A ไป B = B − A**: ไล่ตาม = ผู้เล่น − ตัวเอง · แยกตัว = ตัวเอง − อีกตัว · สลับลำดับ = หนีแทนไล่
- `RedEnemy(x, y, player, red_enemys, path)` เก็บ **การอ้างอิง** ถึงยาน อ่าน `self.player.rect.center` ได้ตำแหน่งล่าสุดทุกเฟรม
- `normalize()` เวกเตอร์ศูนย์ → `ValueError` ต้องตรวจ `length() > 0` ก่อน · `scale_to_length(L)` = $\hat v \times L$ คงทิศ เปลี่ยนขนาด
- มุมที่สั้นที่สุด: `(target - angle) % 360` แล้วถ้า `> 180` ลบ 360 → ช่วง (−180, 180] · lerp ด้วย `* 0.15` มุมที่เหลือ $d \cdot 0.85^n$

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| อัตราเร็วหลัง n เฟรม | $\lvert v_n \rvert = \lvert v_0 \rvert f^{\,n}$ | `velocity *= 0.97` (วนซ้ำ n ครั้ง) |
| เฟรมจนต่ำกว่าเกณฑ์ | $n > \dfrac{\ln(v_{min}/v_0)}{\ln f}$ | `math.ceil(math.log(vmin/v0)/math.log(f))` |
| ระยะสูงสุดก่อนหยุด | $S_\infty = \dfrac{v_0}{1-f}$ | — |
| ระยะจริงใน n เฟรม | $S_n = \dfrac{v_0(1-f^{\,n})}{1-f}$ | ผลรวม `pos += velocity` |
| ทิศจากมุม | $(\cos\theta, \sin\theta)$ ขนาด 1 | `np.array([np.cos(rad), np.sin(rad)])` |
| ไล่ตาม | $\hat d = \dfrac{P - E}{\lvert P - E \rvert}$, $v \mathrel{+}= 0.1\,\hat d$ | `(Vector2(player.rect.center) - self.pos).normalize() * 0.1` |
| แยกตัว | $\hat p = \dfrac{E_{me} - E_{other}}{\lvert \cdot \rvert}$ | `(Vector2(self.rect.center) - Vector2(other.rect.center)).normalize() * 0.1` |
| จำกัดอัตราเร็ว | $v \leftarrow \hat v \times v_{max}$ ถ้า $\lvert v \rvert > v_{max}$ | `if vel.length() > max_speed: vel.scale_to_length(max_speed)` |
| สะท้อน | $(v_x, v_y) \to (-v_x, v_y)$ หรือ $(v_x, -v_y)$ | `self.vel.x *= -1` / `self.vel.y *= -1` |
| มุมที่สั้นที่สุด | $d = (t - a) \bmod 360$; ถ้า $d > 180$: $d \mathrel{-}= 360$ | `angle_diff = (target - angle) % 360` |
| Lerp | $a + (b - a)t$ · เหลือ $d_0(1-t)^n$ | `self.angle += angle_diff * 0.15` |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
# แรงเสียดทานจนหยุด
n = 0
while True:
    pos = pos + velocity
    velocity *= 0.97
    n += 1
    if np.linalg.norm(velocity) < 1:
        break

# ศัตรูสุ่ม + สะท้อนขอบ
self.vel = pygame.math.Vector2(random.uniform(-3, 3), random.uniform(-3, 3))
self.pos += self.vel
self.rect.topleft = (int(self.pos.x), int(self.pos.y))
if self.rect.left < 0 or self.rect.right > SCREEN_WIDTH:
    self.vel.x *= -1

# ศัตรูแดงไล่ตาม + จำกัดอัตราเร็ว
direction = pygame.math.Vector2(self.player.rect.center) - self.pos
if direction.length() > 0:
    self.vel += direction.normalize() * 0.1
if self.vel.length() > self.max_speed:
    self.vel.scale_to_length(self.max_speed)

# มุมที่สั้นที่สุด + lerp
angle_diff = (target_angle - self.angle) % 360
if angle_diff > 180:
    angle_diff -= 360
self.angle += angle_diff * self.rotation_smoothness
```

## ตัวเลขที่ออกสอบบ่อย
- $v_0 = 5$, $f = 0.97$: เฟรม 1 → 4.85 · เฟรม 2 → 4.7045 · เฟรม 3 → 4.5634 · เฟรม 10 → 3.687 · ต่ำกว่า 1 ที่ **53 เฟรม** ($5 \times 0.97^{52} = 1.026$, $5 \times 0.97^{53} = 0.995$)
- ระยะสูงสุด $5/0.03 = 166.7$ · ระยะจริง 53 เฟรม ≈ 133.5 · $f = 0.9$: 16 เฟรม, 50 พิกเซล
- $8 \times 0.9^3 = 5.832$ · $10 \times 0.5^n < 1$ ที่ $n = 4$ · $6 \times 0.8^2 = 3.84$, ต่ำกว่า 2 ที่ 5 เฟรม
- `np.radians(230)` → ทิศ (−0.643, −0.766) · ความเร็ว (−3.214, −3.830)
- ศัตรู (200, 500) ผู้เล่น (500, 100) → ทิศ (300, −400) ขนาด 500 → (0.6, −0.8) → ความเร่ง (0.06, −0.08)
- ศัตรู (50, 50) ผู้เล่น (110, 130) → (0.06, 0.08) · ความเร่ง 0.1/เฟรม ถึง max_speed 3 ใน 30 เฟรม (ทิศคงที่)
- (−9, 12) ขนาด 15 → `scale_to_length(5)` = (−3, 4) · (6, 8) → (3, 4)
- แยกตัว (300, 300) − (280, 310) = (20, −10) ขนาด 22.36 → (0.894, −0.447)
- มุม: 170→−170 = 20 · 10→350 = −20 · 0→−90 = −90 · 170→−90 = 100 · 350→20 = 30 (มุมใหม่ 354.5) · −30→200 = −130
- lerp 0→90 ที่ 0.15: 13.5, 24.975, 34.729 · เหลือ $100 \times 0.85^5 = 44.37$ · $80 \times 0.5^3 = 10$ · lerp(10, 50, 0.25) = 20

## กับดักที่พบบ่อย
1. ใส่ `ln` แล้วลืมว่า $\ln 0.97 < 0$ → ได้ $n$ ติดลบหรือกลับเครื่องหมายอสมการผิด
2. ตอบระยะสูงสุด 166.7 ทั้งที่โจทย์ถามระยะจริงก่อน `break` (133.5) หรือกลับกัน
3. `import config` แล้วเรียก `SCREEN_WIDTH` ตรง ๆ → `NameError`; `from config import *` แล้วเรียก `config.SCREEN_WIDTH` ก็ `NameError`
4. บวกความเร็ว float เข้า `rect.x` โดยตรง → ปัดทิ้ง วัตถุความเร็วต่ำกว่า 1 ไม่ขยับ
5. สะท้อนโดยไม่วางตำแหน่งกลับที่ขอบ → ติดผนัง สั่นค้าง
6. เขียน `self.pos - player` → ศัตรูหนีแทนไล่ · เขียน `other - self` → ศัตรูดูดเข้าหากันแทนแยก
7. `normalize()` โดยไม่ตรวจ `length() > 0` → `ValueError` เมื่อตำแหน่งซ้อนกันพอดี
8. ลืม `% 360` → ยานหมุน 340° แทน 20° · ลืมเช็ก `> 180` → หมุนทางยาวเสมอ
9. คำนวณ `direction` ครั้งเดียวใน `__init__` → ศัตรูวิ่งเป็นเส้นตรงไปตำแหน่งเก่าของผู้เล่น

## เชื่อมโยงบทถัดไป
บทที่ 8 ใช้ `(mouse − ship).normalize() * bullet_speed` แบบเดียวกับการไล่ตามเพื่อยิงกระสุนไปยังเมาส์ ตรวจการชนกระสุน-ศัตรูด้วย `rect.colliderect` ที่ใช้ในการแยกตัวบทนี้ และเพิ่ม `grid.py` เป็นมอดูลใหม่ที่ `from config import *` เพื่อแบ่งจอ 1200×900 เป็นกริดลดจำนวนการเปรียบเทียบ
