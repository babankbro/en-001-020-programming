## สิ่งที่ต้องจำ (Key Facts)
- `print(a, b)` พิมพ์คั่นด้วยช่องว่าง · `print("#", end="")` ไม่ขึ้นบรรทัดใหม่ · `print()` เปล่า = ขึ้นบรรทัด
- **f-string**: `f"{x}"` ต้องมี `f` + ปีกกา · `{x:.2f}` ทศนิยม 2 · `{s:<10}` ชิดซ้าย · `{s:>5}` ชิดขวา
- `/` ได้ float เสมอ · `//` ปัดลง (`-7 // 2 = -4`) · `%` เศษตามเครื่องหมายตัวหาร (`-7 % 2 = 1`) · `**` ยกกำลัง
- ฟังก์ชันไม่มี `return` → คืน `None` · ตัวแปรในฟังก์ชันเป็น local
- `range(start, stop, step)` ไม่รวม stop · `range(5, 0, -1)` = 5,4,3,2,1
- Top-Down Design: `line(n)` → `block(row, col)` → `triangle(n)` เรียก `line(i+1)`

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| ค่าเฉลี่ย | $\bar{x} = \frac{1}{n}\sum x_i$ | `sum / n` |
| ผลคูณจุด | $\mathbf{a}\cdot\mathbf{b} = \sum a_i b_i$ (สเกลาร์) | `total += v[i]*u[i]` |
| ขนาดเวกเตอร์ | $\lvert\mathbf{v}\rvert = \sqrt{\sum v_i^2} = \sqrt{\mathbf{v}\cdot\mathbf{v}}$ | `math.sqrt(dotv(v, v))` |
| เวกเตอร์หนึ่งหน่วย | $\hat{\mathbf{v}} = \mathbf{v}/\lvert\mathbf{v}\rvert$ | `v[i] / lenv(v)` |
| ตั้งฉาก | $\mathbf{a}\cdot\mathbf{b} = 0$ | |
| จำนวน # ใน `triangle(n)` | $n(n+1)/2$ | |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
def dotv(v, u):
    total = 0
    for i in range(len(v)):
        total += v[i] * u[i]
    return total

def lenv(v):
    s = 0
    for i in range(len(v)):
        s += v[i] * v[i]
    return math.sqrt(s)

def line(n):
    for i in range(n):
        print("#", end="")
    print()

def triangle(n):
    for i in range(n):
        line(i + 1)
```

## ตัวเลขที่ออกสอบบ่อย
- `dotv3((1,2,3), (1,0,1))` = 4 · `(1,2,0,4)·(1,2,3,4)` = 21
- `lenv((1,2,3,4))` = $\sqrt{30} \approx 5.477$ · `lenv((3,4))` = 5 · `lenv((2,3,6))` = 7
- `(3,4)·(−4,3)` = 0 → ตั้งฉาก
- `block(2, 10)` พิมพ์ # 20 ตัว · `triangle(10)` พิมพ์ 55 ตัว

## กับดักที่พบบ่อย
1. ลืม `f` หน้า f-string → พิมพ์ `{a*b}` ออกมาตรง ๆ
2. `dotv3` กับเวกเตอร์ 4 มิติ **ไม่ error แต่คำนวณผิด** (ดูแค่ 3 ตัวแรก)
3. `dotv` กับเวกเตอร์ยาวไม่เท่ากัน → `IndexError`
4. ใช้ `//` หาค่าเฉลี่ย → เศษหาย
5. `(1, 2) + (3, 4)` ได้ `(1, 2, 3, 4)` ไม่ใช่การบวกเวกเตอร์ (ต้องใช้ NumPy — บทที่ 6)

## เชื่อมโยงบทถัดไป
บทที่ 3 จะรับค่าจากผู้ใช้ด้วย `input()` เก็บหลายค่าใน **ลิสต์** และใช้ `linespace(s, n)` วาดสามเหลี่ยมชิดขวา
