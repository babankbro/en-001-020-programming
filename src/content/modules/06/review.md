## สิ่งที่ต้องจำ (Key Facts)
- `np.array([1,2]) + np.array([3,4])` = `[4 6]` (บวกเวกเตอร์) · `[1,2] + [3,4]` = `[1, 2, 3, 4]` (ต่อกัน) · `[1,2] * 2` = `[1, 2, 1, 2]`
- ผลลัพธ์ NumPy พิมพ์ **ไม่มีจุลภาค** `[4 5 3]` · ลิสต์มีจุลภาค
- `np.linalg.norm(v)` = ขนาด · `v / np.linalg.norm(v)` = เวกเตอร์หนึ่งหน่วย · `np.dot(u, v)` = ผลคูณจุด
- `np.linspace(a, b, n)` ให้ n ค่า **รวมปลาย** ห่างกัน $(b-a)/(n-1)$
- คูณเมทริกซ์: `A @ B` = `np.matmul(A, B)` = `A.dot(B)` · `A * B` คือคูณทีละตำแหน่ง · $AB \ne BA$ · $AI = A$
- `math.sin/cos/np.cos` รับ **เรเดียน** · `math.atan2(y, x)` รับ y ก่อน คืนมุมในช่วง (−180°, 180°] แยกจตุภาคได้
- หมุนรอบจุดใด ๆ: `R.dot(p - c) + c` (เลื่อน → หมุน → เลื่อนกลับ) · การหมุนไม่เปลี่ยนรัศมี · $R(\alpha)R(\beta) = R(\alpha+\beta)$
- ยาน: input_dir → normalize → `atan2(-y, x) - 90` → `(target - angle) % 360` (>180 ลบ 360) → `angle += diff * 0.15` → accel `(cos, -sin)(angle+90) × thrust` → ปล่อยปุ่ม `velocity *= friction` → `scale_to_length(max_speed)`

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| ขนาดเวกเตอร์ | $\lvert\mathbf{v}\rvert = \sqrt{\sum v_i^2}$ | `np.linalg.norm(v)` |
| เวกเตอร์หนึ่งหน่วย | $\hat{\mathbf{v}} = \mathbf{v}/\lvert\mathbf{v}\rvert$ | `v / np.linalg.norm(v)` |
| คูณเมทริกซ์ | $c_{ij} = \sum_k a_{ik}b_{kj}$ (แถว·คอลัมน์) | `A @ B` |
| เมทริกซ์คูณเวกเตอร์ | $\begin{bmatrix}a&b\\c&d\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix} = \begin{bmatrix}ax+by\\cx+dy\end{bmatrix}$ | `M @ x` |
| องศา ↔ เรเดียน | $\theta_{rad} = \theta_{deg}\pi/180$ | `np.radians(d)`, `math.degrees(r)` |
| เมทริกซ์การหมุน | $R(\theta) = \begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$ | `np.array([[c,-s],[s,c]])` |
| หมุนจุด | $(x', y') = (x\cos\theta - y\sin\theta,\ x\sin\theta + y\cos\theta)$ | `R.dot(p)` |
| หมุน 90° / 180° | $(x,y)\to(-y,x)$ / $(-x,-y)$ | |
| หมุนรอบ $c$ | $R(p - c) + c$ | `R.dot(p - c) + c` |
| จุดบนวงกลม | $(c_x + r\cos\theta,\ c_y + r\sin\theta)$ | `ori + radius*np.cos(angles)` |
| มุมของเวกเตอร์ | $\theta = \operatorname{atan2}(y, x)$ | `math.atan2(y, x)` |
| มุมเป้าหมายยาน | $\operatorname{atan2}(-y, x) - 90°$ | `degrees(atan2(-d.y, d.x)) - 90` |
| มุมต่างสั้นสุด | $d = (t - a) \bmod 360$, ถ้า $> 180$ ลบ 360 | `(target - angle) % 360` |
| Lerp | $a + (b-a)t$ · เหลือหลัง $n$ เฟรม $= d(1-t)^n$ | `angle += diff * 0.15` |
| ความเร่งยาน | $(\cos(\theta+90°),\ -\sin(\theta+90°)) \times \text{thrust}$ | `accel_y = -sin(...)*thrust` |
| จำกัดความเร็ว | $\hat{\mathbf{v}} \times \text{max}$ | `scale_to_length(max_speed)` |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
def rotate_about(point, center, theta_deg):
    t = np.radians(theta_deg)
    R = np.array([[np.cos(t), -np.sin(t)],
                  [np.sin(t),  np.cos(t)]])
    return R.dot(np.array(point) - np.array(center)) + np.array(center)

def target_angle(dx, dy):
    return math.degrees(math.atan2(-dy, dx)) - 90

def shortest_diff(angle, target):
    d = (target - angle) % 360
    if d > 180:
        d -= 360
    return d

angle_rad = math.radians(angle + 90)
accel = (math.cos(angle_rad) * thrust, -math.sin(angle_rad) * thrust)
```

## ตัวเลขที่ออกสอบบ่อย
- `[1,2,3] + [3,3,0]` (np) = `[4 5 3]` · `(2,-3,1)·(4,0,-2)` = 6 · $\lvert(4,0,-2)\rvert = \sqrt{20} \approx 4.47$
- หนึ่งหน่วยของ (3, 4) = (0.6, 0.8) · ของ (−5, 12) = (−0.385, 0.923) · ของ (1, −1) = (0.707, −0.707)
- $\begin{bmatrix}1&2\\3&4\end{bmatrix}\begin{bmatrix}5&6\\7&8\end{bmatrix} = \begin{bmatrix}19&22\\43&50\end{bmatrix}$ · `A = [[1,2],[3,4]]` → `A @ A = [[7,10],[15,22]]` · `A * A = [[1,4],[9,16]]`
- 30° = 0.524 rad · 45° = π/4 · 180° = π ≈ 3.142 · 270° = 3π/2 ≈ 4.712 · cos30 = 0.866, sin30 = 0.5, cos45 = sin45 = 0.707
- atan2: (1,0) → 0° · (0,1) → 90° · (−1,0) → 180° · (0,−1) → −90° · (1,1) → 45° · (−1,−1) → −135°
- `linspace(0, 2π, 5)` = 0°, 90°, 180°, 270°, 360° · 100 จุด ห่างกัน 2π/99
- (10, 0) หมุน 30° → (8.66, 5) · (4, 0) หมุน 60° → (2, 3.464) · (2, 5) หมุน 90° → (−5, 2)
- (7, 3) รอบ (3, 3) 90° → (3, 7) · (5, 1) รอบ (2, 1) 180° → (−1, 1)
- `frame * 2`, 180 เฟรม → 360° ครบรอบ (3.6 วินาที ที่ interval 20) · `frame * 3` → 120 เฟรม
- target_angle: ขึ้น 0 · ขวา −90 · ซ้าย 90 · ลง −180 · ขึ้น+ขวา −45 · ลง+ซ้าย −225
- angle_diff: 170→−170 = 20 · 10→350 = −20 · 0→−90 = −90 · 350→20 = 30 (มุมใหม่ 354.5) · −30→200 = −130
- (6, 8) `scale_to_length(5)` → (3, 4) · (−9, 12) → (−3, 4) · 5 × 0.97ⁿ < 1 เมื่อ n = 53

## กับดักที่พบบ่อย
1. บวกลิสต์แล้วคิดว่าเป็นบวกเวกเตอร์ — ได้ลิสต์ยาวขึ้นแทน
2. ใช้ `A * B` แทน `A @ B` — ได้คูณทีละตำแหน่ง ไม่ใช่คูณเมทริกซ์ และคิดว่า $AB = BA$
3. ใส่องศาเข้า `math.cos()` ตรง ๆ — ต้อง `math.radians()` ก่อน
4. `atan2(x, y)` สลับลำดับ — ต้องเป็น `atan2(y, x)` และในเกมต้อง `atan2(-y, x)` เพราะแกน y ชี้ลง
5. หมุนรอบจุดศูนย์กลางแล้วลืมลบ `ori_pos` ก่อนหมุน → `R.dot(p) + c` ได้ (0, 10) แทน (3, 7)
6. คิดมุมต่างตรง ๆ `target - angle` → หมุนเกือบรอบ (−340° แทน 20°) ต้อง `% 360` แล้วตรวจ > 180
7. normalize เวกเตอร์ศูนย์ → `nan` / `ValueError` ต้องตรวจ `length() > 0` ก่อน
8. `linspace(0, 2π, 100)` คิดว่าห่างกัน 2π/100 — จริง ๆ คือ 2π/99 เพราะรวมปลาย

## เชื่อมโยงบทถัดไป
บทที่ 7 ใช้ `velocity *= 0.97` จำลองแรงเสียดทานเป็นลำดับเรขาคณิต หาจำนวนเฟรมด้วยลอการิทึม และใช้ `(player - self.pos).normalize() * 0.1` ให้ศัตรูสีแดงไล่ตามผู้เล่น — ทั้งหมดคือเวกเตอร์หนึ่งหน่วยและการบวกเวกเตอร์จากบทนี้
