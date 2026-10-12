## ภาพรวมบท
บทนี้ยกระดับลิสต์จากบทที่ 3 เป็น **ลิสต์ซ้อนลิสต์** เพื่อแทนตารางคะแนน 2 มิติ เข้าถึงด้วย `[แถว][คอลัมน์]` หาค่าเฉลี่ยแถวและคอลัมน์ พิมพ์ตารางที่จัดความกว้างคอลัมน์อัตโนมัติด้วย f-string รู้ทันกับดักสำเนาตื้นเมื่อแทรกหัวตาราง สร้างสแตกแบบ LIFO ทั้งแบบฟังก์ชันและแบบคลาส และใช้ `//` `%` แปลงดัชนี 1 มิติเป็นแถว/คอลัมน์ ก่อนส่งตารางขึ้นเว็บด้วย pandas

![แผนที่แนวคิดบท 04 เชื่อม 5 หัวข้อ: ลิสต์ซ้อนลิสต์ f-string และ col_widths สำเนาตื้น สแตก และ // % กับ pandas](/infographics/04/summary.svg)

กล่องที่ 1 → 2 คือเส้นทางหลักของคาบ: สร้างตารางแล้วพิมพ์ให้สวย กล่องที่ 3 คือกับดักที่เกิดระหว่างทาง (แทรกหัวตารางแล้วต้นฉบับเปลี่ยน) กล่องที่ 4 คือโครงสร้างข้อมูลใหม่ที่สร้างจาก `append`/`pop` และเป็นคลาสแรกของวิชา ส่วนกล่องที่ 5 เชื่อมตารางกับคณิตศาสตร์จำนวนเต็มและไลบรารี

## สิ่งที่ต้องจำ (Key Facts)

### 1. ลิสต์ซ้อนลิสต์แทนตาราง 2 มิติ
- `table[i][j]` = แถว `i` คอลัมน์ `j` (ตรงกับ $a_{ij}$ แต่เริ่มนับ 0) · อ่านจากซ้าย: `table[i]` ได้ลิสต์แถวก่อน แล้ว `[j]` ได้ค่า
- `len(table)` = จำนวนแถว · `len(table[0])` = จำนวนคอลัมน์ · `table[-1][-1]` = ช่องขวาล่าง
- สร้างทีละแถว: `row = []` **ภายใน** ลูปนอก แล้ว `table.append(row)` · ห้าม `[[0]*3]*2` ใช้ `[[0]*3 for _ in range(2)]`
- ค่าเฉลี่ยแถวหารด้วย `len(row)` (จำนวนคอลัมน์) · ค่าเฉลี่ยคอลัมน์หารด้วย `len(table)` (จำนวนแถว)
- ลูปซ้อน: ลูปนอกคุมแถว ลูปในคุมคอลัมน์

### 2. การจัดรูปแบบตารางด้วย f-string และความกว้างคอลัมน์
- `{x:<{w}}` ชิดซ้าย · `{x:>{w}}` ชิดขวา · `{x:^{w}}` กึ่งกลาง · `{x:.2f}` ทศนิยม 2 · ความกว้างเป็นตัวแปรได้ด้วยปีกกาซ้อน
- `col_widths[i] = max(len(str(row[i])) for row in table)` — ต้อง `str()` ก่อน `len()` (`len(77)` → `TypeError`)
- `line_length = sum(col_widths) + num_cols * 3` (3 = ความยาว `" | "`)
- `for i, item in enumerate(row)` ให้ดัชนีคอลัมน์ไว้เลือก `col_widths[i]` และค่าไว้พิมพ์ในรอบเดียว

### 3. สำเนาตื้นและการแทรกหัวตาราง
- `b = a` ไม่ใช่สำเนา · `a.copy()` / `a[:]` = **สำเนาตื้น** คัดลอกชั้นนอก ชั้นในใช้ร่วม · `copy.deepcopy(a)` = สำเนาลึก
- `append`/`insert` ที่ชั้นนอกของสำเนาตื้นปลอดภัย แต่ `b[i].insert(...)` แก้ชั้นในที่ต้นฉบับใช้ร่วม
- `scores.copy()` แล้ว `table_show[i+1].insert(0, names[i])` → `scores` มีชื่อนักศึกษาโผล่มาด้วย
- ตรวจด้วย `table_show[1] is scores[0]` → `True` · แก้ด้วย `deepcopy` หรือ `[names[i]] + scores[i]` (สร้างแถวใหม่)

### 4. สแตก (Stack) แบบฟังก์ชันและแบบคลาส
- สแตก = **LIFO** เข้าหลังออกก่อน · บนสุด = ท้ายลิสต์ `items[-1]` · ก้น = `items[0]`
- `push` = `append` · `pop` = `pop()` · `peek` = `items[-1]` (ไม่หยิบออก) · `is_empty` = `len == 0` · `size` = `len`
- คลาสรวมข้อมูล (`self.items`) กับพฤติกรรม (เมท็อด) · `__init__` ทำงานเมื่อ `Stack()` · `self` คือวัตถุที่เรียกเมท็อด
- pop/peek สแตกว่างต้อง `raise IndexError("pop from empty stack")`
- `while not s.is_empty():` ตรวจแค่ **ต้นรอบ** — pop หลายครั้งในรอบเดียวต้องตรวจก่อนทุกครั้ง
- ลูป pop 2 ครั้ง/รอบ: จำนวนข้อมูล **คี่** → พิมพ์ครบทุกตัวแล้วจึง `IndexError` · จำนวน **คู่** (เช่น 4 ตัว) → จบปกติ · ลูป `pop()` + `size()` ไม่พังเสมอ
- `print(A, B)` ประเมินอาร์กิวเมนต์ **ซ้ายไปขวาให้ครบก่อน** แล้วจึงพิมพ์ → `print(m.pop(), m.size())` นับ size **หลัง** pop แล้ว
- เทมเพลตเมท็อด: `push` ไม่ return · `pop`/`peek` ตรวจว่างแล้ว `raise IndexError` ก่อน `return` · `peek` ใช้ `items[-1]` ไม่ใช่ `pop()`

### 5. การหารปัดลง มอดุโล และตารางบนเว็บด้วย pandas
- `a // b` = $\lfloor a/b \rfloor$ ปัดลงเสมอ (`-7 // 2` = −4) · `a % b` มีเครื่องหมายตามตัวหาร (`-7 % 2` = 1)
- $a = b \cdot q + r,\ 0 \le r < b$ ใช้ตรวจคำตอบ `//` และ `%` ทุกครั้ง
- ดัชนี 1 มิติ → 2 มิติ: `row = k // cols`, `col = k % cols`
- `pd.DataFrame(scores, columns=subjects, index=names)` → `df.shape = (3, 4)` · `df.mean()` เฉลี่ยคอลัมน์ · `df.mean(axis=1)` เฉลี่ยแถว
- `st.dataframe(df)` แสดงตารางโต้ตอบบนเว็บ รันด้วย `streamlit run ไฟล์.py`

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด | ตัวอย่างตัวเลข |
|---|---|---|---|
| สมาชิกตาราง | $a_{ij}$ | `table[i][j]` | `scores[1][2]` = 67 |
| ค่าเฉลี่ยแถว $i$ | $\frac{1}{n_{col}}\sum_j a_{ij}$ | `sum(table[i]) / len(table[i])` | 265/4 = 66.25 |
| ค่าเฉลี่ยคอลัมน์ $j$ | $\frac{1}{n_{row}}\sum_i a_{ij}$ | `sum(row[j] for row in table) / len(table)` | 236/3 ≈ 78.67 |
| ความกว้างคอลัมน์ | $w_i = \max \lvert \text{str}(a_{\cdot i}) \rvert$ | `max(len(str(row[i])) for row in table)` | `["Name","Somchai",…]` → 7 |
| ความยาวบรรทัด | $\sum w_i + 3 \cdot n_{col}$ | `sum(col_widths) + num_cols * 3` | 33 + 15 = 48 |
| หารปัดลง / มอดุโล | $a = bq + r,\ 0 \le r < b$ | `a // b`, `a % b` | −17 = 5·(−4) + 3 |
| ดัชนี 1 มิติ → 2 มิติ | $\lfloor k/c \rfloor,\ k \bmod c$ | `k // cols`, `k % cols` | k = 9, cols = 4 → (2, 1) |

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

# แทรกหัวตารางโดยไม่แตะต้นฉบับ
table_show = [[names[i]] + scores[i] for i in range(len(names))]
table_show.insert(0, ["Name"] + subjects)

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
        if not self.items:
            raise IndexError("peek from empty stack")
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

## ตัวอย่างไล่ค่า (Trace)
**ก. ค่าเฉลี่ยคอลัมน์ English** (`j = 2`) ด้วยลูป `for i in range(len(scores)): total += scores[i][2]`

| รอบ `i` | `scores[i][2]` | `total` หลังรอบ |
|---|---|---|
| 0 | 77 | 77 |
| 1 | 67 | 144 |
| 2 | 92 | 236 |

จบลูป `236 / len(scores)` = 236 / 3 ≈ **78.67** (หารด้วยจำนวนแถว 3 ไม่ใช่ 4)

**ข. `balanced("(a(b)c")`** — ไล่ `items` ของสแตกทีละตัวอักษร

| ตัวอักษร | การทำงาน | `items` หลังทำ |
|---|---|---|
| `(` | push | `['(']` |
| `a` | ข้าม | `['(']` |
| `(` | push | `['(', '(']` |
| `b` | ข้าม | `['(', '(']` |
| `)` | ไม่ว่าง → pop | `['(']` |
| `c` | ข้าม | `['(']` |

จบข้อความแล้วสแตกยังเหลือ `'('` 1 ตัว → `is_empty()` เป็น `False` → คืน **`False`** (วงเล็บเปิดเกิน)

## ตัวเลขที่ออกสอบบ่อย
- `scores = [[55, 63, 77, 81], [65, 61, 67, 72], [97, 95, 92, 88]]` → `scores[0][2]` = 77, `scores[1][2]` = 67, `scores[2][0]` = 97, `len` = 3, `len(scores[0])` = 4
- ผลรวมแถว 276, 265, 372 → เฉลี่ยแถว **69.00, 66.25, 93.00** · ผลรวมคอลัมน์ 217, 219, 236, 241 → เฉลี่ยคอลัมน์ **72.33, 73.00, 78.67, 80.33**
- `print_table(scores)`: `col_widths = [2, 2, 2, 2]`, `line_length = 20` · ตารางมีหัว: `[7, 4, 7, 7, 8]`, `line_length = 48`
- `[["ID", "Score"], [7, 100], [12345, 9]]` → `[5, 5]`, 16 · `[["Name", "Score"], ["Somchai", 100], ["Bo", 7]]` → `[7, 5]`, 18
- สแตก push 1, 2, 3, pop, push 4, pop, pop → pop ได้ **3, 4, 2** เหลือ `[1]` · push 10, 20, 30, pop, push 40 → `peek()` = 40, `size()` = 3
- `stack_v2.py` (3 ตัว pop 2 ครั้ง/รอบ) → พิมพ์ `z`, `y`, `x` แล้ว `IndexError` ในรอบที่ 2 · push 4 ตัวแล้วลูปเดียวกัน → พิมพ์ `4 3 2 1` ไม่พัง
- push x, push y, pop, push z → `print(m.peek(), m.size())` = **`z 2`** · push a, pop, push b, push c → **`c 2`**
- push k, push m, pop, push n → `print(m.pop(), m.size())` = **`n 1`** (ไม่ใช่ `n 2`) · สลับเป็น `print(m.size(), m.pop())` = `2 n`
- push 10, 20, 30 → `while not m.is_empty(): print(m.pop()); print(m.size())` → `30 2 20 1 10 0` (บรรทัดละค่า) ไม่มี error
- `-7 // 2` = −4, `-7 % 2` = 1 · `-17 // 5` = −4, `-17 % 5` = 3 · `-340 % 360` = 20 · k = 9 ใน 4 คอลัมน์ → `scores[2][1]` = 95

## กับดักที่พบบ่อย
| ✗ ผิด | ✓ ถูก | เหตุผล |
|---|---|---|
| `scores[j][i]` | `scores[i][j]` | ดัชนีแรกคือแถวเสมอ |
| `total / len(scores[0])` สำหรับเฉลี่ยคอลัมน์ | `total / len(scores)` | คอลัมน์มี 3 ค่า (217/4 = 54.25 ผิด) |
| `grid = [[0] * 3] * 2` | `[[0] * 3 for _ in range(2)]` | `* 2` ให้ทุกแถวเป็นลิสต์เดียวกัน |
| `len(row[i])` | `len(str(row[i]))` | `int` ไม่มีความยาว → `TypeError` |
| ตัวคั่น `"\|"` แต่ยังบวก `num_cols * 3` | บวก `num_cols * 1` | ความยาวตัวคั่นเปลี่ยน |
| `table_show = scores.copy()` แล้วแทรกในแถว | `copy.deepcopy(scores)` หรือ `[names[i]] + scores[i]` | สำเนาตื้นใช้แถวร่วม ต้นฉบับเปลี่ยน |
| `print(m.pop()); print(m.pop())` ใน `while not m.is_empty()` | pop ครั้งเดียวต่อรอบ | สแตกเลขคี่ → `IndexError` |
| `items[0]` คือบนสุด | `items[-1]` คือบนสุด | `items[0]` คือก้นสแตก |
| `print(m.pop(), m.size())` ตอบ `n 2` (นับก่อน pop) | `n 1` | อาร์กิวเมนต์ประเมินซ้ายไปขวา pop เสร็จก่อน size |
| "pop 2 ครั้ง/รอบ กับ 3 ตัว → error ทันที" | พิมพ์ `z y x` ก่อน แล้วจึง `IndexError` | error เกิดที่ pop ครั้งที่ 4 เท่านั้น |
| "ลูป pop 2 ครั้ง/รอบ พังเสมอ" | พังเฉพาะจำนวนข้อมูลคี่ | 4 ตัว → 2 รอบพอดี ไม่พัง |
| `peek()` เขียน `return self.items.pop()` | `return self.items[-1]` | peek ต้องไม่หยิบออก |
| `return self.items.pop` | `return self.items.pop()` | ลืมวงเล็บ = คืนตัวเมท็อด ไม่ได้เรียก |
| `m.push(m, 'x')` | `m.push('x')` | ไพทอนส่ง `self` ให้เอง |
| `avg = 265 // 4` | `avg = 265 / 4` | `//` ได้ 66 เศษหาย |
| คิดว่า `-7 // 2` = −3 | `-7 // 2` = −4 | `//` ปัดลง ไม่ใช่ปัดเข้าหาศูนย์ |

## ทดสอบตัวเอง 5 ข้อ

> [!question]- ข้อ 1: `t = [[3, 8, 1], [4, 6, 2]]` จงบอกผลลัพธ์ของ `print(t[1][0] + t[0][2], len(t), len(t[0]), sum(t[0]) / len(t[0]))`
> > [!success]- เฉลย
> > `5 2 3 4.0` — `t[1][0]` = 4, `t[0][2]` = 1 รวม 5; มี 2 แถว 3 คอลัมน์; ค่าเฉลี่ยแถว 0 = 12/3 = 4.0

> [!question]- ข้อ 2: ตาราง `[["Item", "Qty"], ["Pen", 120], ["Notebook", 5]]` มี `col_widths` และ `line_length` เท่าใด
> > [!success]- เฉลย
> > คอลัมน์ 0: 4, 3, 8 → 8; คอลัมน์ 1: 3, 3, 1 → 3 → `col_widths = [8, 3]` และ `line_length = 11 + 2 × 3 = 17`

> [!question]- ข้อ 3: จงบอกผลลัพธ์ของ `a = [[1, 2], [3, 4]]; b = a.copy(); b[1].append(5); b.append([6]); print(a)`
> > [!success]- เฉลย
> > `[[1, 2], [3, 4, 5]]` — `b[1]` คือลิสต์แถวเดียวกับ `a[1]` จึงได้ 5 ด้วย แต่ `b.append([6])` แก้แค่ชั้นนอกของ `b`

> [!question]- ข้อ 4: เริ่มจากสแตกว่าง ทำ `push('a'), push('b'), pop(), push('c'), push('d'), pop()` แล้วเรียก `peek()` และ `size()` ได้อะไร
> > [!success]- เฉลย
> > pop ได้ `'b'` แล้ว `'d'` เหลือ `['a', 'c']` → `peek()` = `'c'`, `size()` = 2

> [!question]- ข้อ 5: ตาราง 5 คอลัมน์ ช่องลำดับ $k = 17$ อยู่แถว/คอลัมน์ใด และ `-9 // 4`, `-9 % 4` เท่าใด
> > [!success]- เฉลย
> > แถว `17 // 5` = 3 คอลัมน์ `17 % 5` = 2 · `-9 // 4` = −3 (ปัดลงจาก −2.25) และ `-9 % 4` = 3 เพราะ $-9 = 4 \cdot (-3) + 3$

> [!question]- ข้อเสริม ก (แนวข้อสอบปลายภาค): push k, push m, pop, push n แล้ว `print(m.pop(), m.size())` ได้อะไร และถ้าเป็น `print(m.peek(), m.size())` ล่ะ
> > [!success]- เฉลย
> > ก่อน `print` สแตกคือ `[k, n]` · `print(m.pop(), m.size())` → `pop()` ทำก่อนได้ `'n'` เหลือ `[k]` แล้ว `size()` = 1 → **`n 1`** · `print(m.peek(), m.size())` → peek ไม่หยิบออก → **`n 2`**

> [!question]- ข้อเสริม ข (แนวข้อสอบปลายภาค): push 10, 20, 30 แล้วรัน `while not m.is_empty(): print(m.pop()); print(m.size())` ผลลัพธ์คืออะไร ถ้าเปลี่ยน `print(m.size())` เป็น `print(m.pop())` ล่ะ
> > [!success]- เฉลย
> > แบบแรก: `30, 2, 20, 1, 10, 0` (บรรทัดละค่า) จบปกติ · แบบที่สอง: `30, 20, 10` แล้วเกิด `IndexError: pop from empty stack` เพราะ 3 เป็นเลขคี่ รอบที่ 2 เริ่มด้วยสแตก `[10]` pop ได้ 10 แล้ว pop ซ้ำตอนว่าง

## เชื่อมโยงบทถัดไป
[บทที่ 5](/module/05) เริ่มใช้ Pygame: จอเกมคือตารางพิกเซล `(x, y)` ใช้ `WIDTH // 2, HEIGHT // 2` หาจุดกึ่งกลาง (400, 300) และต่อยอดคลาส `Stack` เป็นคลาส `Ball` ที่มี `__init__(self, x, y, vx, vy, …)` รับพารามิเตอร์ เมท็อด `move()` / `draw(screen)` และการสืบทอดจาก `pygame.sprite.Sprite` ด้วย `super().__init__()` — ลิสต์ของวัตถุ `balls` และสำเนาตื้น `balls[:]` จะกลับมาในบทที่ 8 เมื่อต้องลบกระสุนระหว่างวนซ้ำ ส่วน `cells[row][col]` และ `x // cell_size` คือการนำลิสต์ซ้อนลิสต์กับ `//` ไปแบ่งจอเป็นกริดตรวจการชน
