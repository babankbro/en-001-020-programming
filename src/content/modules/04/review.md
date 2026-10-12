## สิ่งที่ต้องจำ (Key Facts)
- ลิสต์ซ้อนลิสต์ = ตาราง: `table[i][j]` คือแถว `i` คอลัมน์ `j` (= $a_{ij}$) · `len(table)` นับแถว · `len(table[0])` นับคอลัมน์ · `table[-1][-1]` ช่องขวาล่าง
- สร้างทีละแถว: `row = []` **ภายใน** ลูปนอก แล้ว `table.append(row)` · ห้าม `[[0]*3]*2` (ทุกแถวเป็นลิสต์เดียวกัน) ใช้ `[[0]*3 for _ in range(2)]`
- ค่าเฉลี่ยแถวหารด้วย `len(row)` (จำนวนคอลัมน์) · ค่าเฉลี่ยคอลัมน์หารด้วย `len(table)` (จำนวนแถว) · ห้ามใช้ `//`
- `col_widths[i] = max(len(str(row[i])) for row in table)` · `line_length = sum(col_widths) + num_cols * 3` (3 = ความยาว `" | "`)
- f-string: `{x:<{w}}` ชิดซ้าย · `{x:>{w}}` ชิดขวา · `{x:^{w}}` กึ่งกลาง · `{x:.2f}` ทศนิยม 2 · ความกว้างซ้อนปีกกาเป็นตัวแปรได้ · ต้อง `str()` ก่อน `len()` (`len(77)` → `TypeError`)
- `enumerate(row)` ให้ `(i, item)` พร้อมกัน ใช้เลือก `col_widths[i]`
- `list.copy()` / `[:]` = **สำเนาตื้น** คัดลอกชั้นนอกเท่านั้น ลิสต์ข้างในใช้ร่วมกัน · `copy.deepcopy()` = สำเนาลึก · `b = a` ไม่ใช่สำเนาเลย
- สแตก = **LIFO** (เข้าหลังออกก่อน): `push` = `append` · `pop` = `pop()` ท้ายลิสต์ · `peek` = `items[-1]` ไม่หยิบออก · `is_empty` = `len == 0`
- คลาส `Stack`: `__init__` สร้าง `self.items = []` ให้วัตถุแต่ละตัว · `self` คือวัตถุที่เรียกเมท็อด · `raise IndexError("...")` เมื่อ pop/peek สแตกว่าง
- `while not s.is_empty():` ตรวจแค่ **ต้นรอบ** — pop หลายครั้งในรอบเดียวต้องตรวจก่อนทุกครั้ง
- `a // b` ปัดลงเสมอ · `a % b` เครื่องหมายตามตัวหาร · `row = k // cols`, `col = k % cols`
- `pd.DataFrame(scores, columns=subjects, index=names)` → `df.shape = (3, 4)` · `df.mean()` เฉลี่ยคอลัมน์ · `df.mean(axis=1)` เฉลี่ยแถว · `st.dataframe(df)` แสดงบนเว็บ

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| สมาชิกตาราง | $a_{ij}$ | `table[i][j]` |
| ค่าเฉลี่ยแถว $i$ | $\frac{1}{n_{col}}\sum_j a_{ij}$ | `sum(table[i]) / len(table[i])` |
| ค่าเฉลี่ยคอลัมน์ $j$ | $\frac{1}{n_{row}}\sum_i a_{ij}$ | `sum(row[j] for row in table) / len(table)` |
| ความกว้างคอลัมน์ | $w_i = \max_{\text{row}} \lvert \text{str}(a_{\cdot i}) \rvert$ | `max(len(str(row[i])) for row in table)` |
| ความยาวบรรทัด | $\sum w_i + 3 \cdot n_{col}$ | `sum(col_widths) + num_cols * 3` |
| หารปัดลง / มอดุโล | $a = bq + r,\ 0 \le r < b$ | `q = a // b`, `r = a % b` |
| ดัชนี 1 มิติ → 2 มิติ | $\text{row} = \lfloor k / c \rfloor,\ \text{col} = k \bmod c$ | `k // cols`, `k % cols` |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
def print_table(table):
    num_cols = len(table[0])
    col_widths = [max(len(str(row[i])) for row in table) for i in range(num_cols)]
    line_length = sum(col_widths) + (num_cols * 3)
    print("-" * line_length)
    for row in table:
        for i, item in enumerate(row):
            print(f"{str(item):<{col_widths[i]}}", end=" | ")
        print()
    print("-" * line_length)

class Stack:
    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)
    def pop(self):
        if not self.items:
            raise IndexError("pop from empty stack")
        return self.items.pop()
    def peek(self):
        return self.items[-1]
    def is_empty(self):
        return len(self.items) == 0
    def size(self):
        return len(self.items)

def balanced(text):
    s = Stack()
    for ch in text:
        if ch == "(":
            s.push(ch)
        elif ch == ")":
            if s.is_empty():
                return False
            s.pop()
    return s.is_empty()
```

## ตัวเลขที่ออกสอบบ่อย
- `scores = [[55, 63, 77, 81], [65, 61, 67, 72], [97, 95, 92, 88]]` → `scores[0][2] = 77`, `scores[1][2] = 67`, `scores[2][0] = 97`, `len = 3`, `len(scores[0]) = 4`
- ผลรวมแถว 276, 265, 372 → เฉลี่ยแถว **69.00, 66.25, 93.00** · ผลรวมคอลัมน์ 217, 219, 236, 241 → เฉลี่ยคอลัมน์ **72.33, 73.00, 78.67, 80.33**
- `print_table(scores)`: `col_widths = [2, 2, 2, 2]`, `line_length = 20` · ตารางมีหัว `Name/Math/Science/English/Computer`: `[7, 4, 7, 7, 8]`, `line_length = 48`
- `[["ID", "Score"], [7, 100], [12345, 9]]` → `[5, 5]`, `line_length = 16`
- `m = [[2, 4], [6, 8], [10, 12]]` → `m[2][0] + m[0][1] = 14`, `sum(m[1]) = 14`
- สแตก push 1,2,3 pop push 4 pop pop → pop ได้ **3, 4, 2** เหลือ `[1]` · push 10,20,30 pop push 40 → `peek() = 40`, `size() = 3`
- `stack_v2.py` (3 ตัว, pop 2 ครั้ง/รอบ) → พิมพ์ `z`, `y`, `x` แล้ว `IndexError` รอบที่ 2
- `-7 // 2 = -4`, `-7 % 2 = 1` · `-17 // 5 = -4`, `-17 % 5 = 3` · `-340 % 360 = 20` · $k = 9$ ใน 4 คอลัมน์ → แถว 2 คอลัมน์ 1 → `scores[2][1] = 95`

## กับดักที่พบบ่อย
1. สลับดัชนี `scores[j][i]` → ค่าผิดหรือ `IndexError` เมื่อจำนวนแถว ≠ คอลัมน์
2. ค่าเฉลี่ยคอลัมน์หารด้วย `len(scores[0])` (4) แทน `len(scores)` (3) → `217/4 = 54.25` ผิด
3. `len(row[i])` ไม่ใส่ `str()` → `TypeError` กับตัวเลข
4. `scores.copy()` แล้ว `insert` ลงแถวข้างใน → **ต้นฉบับเปลี่ยน** (สำเนาตื้น) ต้อง `deepcopy` หรือสร้างแถวใหม่ด้วย `[names[i]] + scores[i]`
5. `[[0]*3]*2` ทุกแถวเป็นลิสต์เดียวกัน
6. pop 2 ครั้งต่อรอบใน `while not is_empty()` → `IndexError` เมื่อจำนวนข้อมูลเป็นเลขคี่
7. `peek()` ไม่ลดขนาดสแตก แต่ `pop()` ลด · `items[0]` คือ **ก้น** สแตก ไม่ใช่บนสุด
8. เรียก `m.push(m, 'x')` — ไพทอนใส่ `self` ให้เองแล้ว
9. ใช้ `//` หาค่าเฉลี่ย เศษหาย · `-7 // 2` ได้ −4 ไม่ใช่ −3

## เชื่อมโยงบทถัดไป
[บทที่ 5](/module/05) เริ่มใช้ Pygame: ตารางพิกัดจอ `(x, y)` และ `WIDTH // 2, HEIGHT // 2` หาจุดกึ่งกลาง และต่อยอดคลาส `Stack` เป็นคลาส `Ball` ที่มี `__init__(self, x, y, vx, vy, …)` รับพารามิเตอร์ เมท็อด `move()` / `draw(screen)` และการสืบทอดจาก `pygame.sprite.Sprite` ด้วย `super().__init__()` — ลิสต์ของวัตถุ `balls` และสำเนา `balls[:]` จะกลับมาในบทที่ 8 เมื่อต้องลบกระสุนระหว่างวนซ้ำ
