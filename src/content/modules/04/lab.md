> [!info] ผลลัพธ์ในใบงานนี้
> output ทุกกล่องได้จากการรันจริงด้วย Python 3.12 ขึ้นไป ให้นักศึกษาพิมพ์โค้ดเอง **ห้ามคัดลอกวาง** และก่อนรันทุกเซลล์ให้ **ทายผลลัพธ์บนกระดาษก่อน** โดยเฉพาะส่วนที่ 2 (นับความกว้างคอลัมน์ด้วยมือ) และส่วนที่ 3 (ไล่ลำดับสแตกเป็นตาราง) แล้วค่อยเทียบกับผลที่รันได้

## ส่วนที่ 1: ตารางคะแนนและค่าเฉลี่ย (35 นาที)

### ขั้นตอนที่ 1: สร้างตารางและเข้าถึงข้อมูล
1. สร้างสมุดใหม่ชื่อ `Lab04_<รหัสนักศึกษา>.ipynb` (หรือไฟล์ `list_of_list.py`)
2. พิมพ์ตารางคะแนนของนักศึกษา 3 คน 4 วิชา แล้วทดลองเข้าถึงข้อมูล

```python
scores = [[55, 63, 77, 81],
          [65, 61, 67, 72],
          [97, 95, 92, 88]]
subjects = ["Math", "Science", "English", "Computer"]
names = ["Somchai", "Somsri", "Sompong"]

print(scores[0])
print(scores[0][2])
print(scores[2][0])
print(len(scores), len(scores[0]))
print(type(scores), type(scores[0]), type(scores[0][0]))
```
```
[55, 63, 77, 81]
77
97
3 4
<class 'list'> <class 'list'> <class 'int'>
```

3. ก่อนรันบรรทัดถัดไป ให้ทายก่อน: `scores[1][3]`, `scores[-1][-1]`, `scores[3][0]` ได้อะไร แล้วรันทีละบรรทัดเพื่อตรวจ (บรรทัดสุดท้ายควรเกิด `IndexError: list index out of range` เพราะมีแค่แถว 0–2)

> [!question]- คำถาม 1.1: `len(scores)` กับ `len(scores[0])` ต่างกันอย่างไร และถ้าตารางไม่มีแถวเลย (`scores = []`) คำสั่ง `len(scores[0])` จะเกิดอะไร
> > [!success]- แนวคำตอบ
> > `len(scores)` นับจำนวนแถว (3) ส่วน `len(scores[0])` นับจำนวนคอลัมน์ของแถวแรก (4) ถ้า `scores = []` จะเกิด `IndexError` เพราะไม่มี `scores[0]` ให้วัดความยาว

### ขั้นตอนที่ 2: วนซ้ำทุกช่องด้วยลูปซ้อน
```python
for i in range(len(scores)):
    for j in range(len(scores[i])):
        print(scores[i][j], end=" ")
    print()
```
```
55 63 77 81 
65 61 67 72 
97 95 92 88 
```
4. ทดลองสลับเป็น `print(scores[j][i], end=" ")` แล้วรัน — เกิดอะไรขึ้นและเพราะเหตุใด (คำใบ้: `j` วิ่งถึง 3 แต่มีแถวแค่ 0–2)

### ขั้นตอนที่ 3: ค่าเฉลี่ยแถวและคอลัมน์
5. คำนวณค่าเฉลี่ยของนักศึกษาแต่ละคน (แถว) และแต่ละวิชา (คอลัมน์) — ก่อนรันให้คำนวณด้วยมืออย่างน้อยแถวแรกและคอลัมน์แรก

```python
for i in range(len(scores)):
    avg = sum(scores[i]) / len(scores[i])
    print(f"{names[i]}: total = {sum(scores[i])}, average = {avg:.2f}")

num_cols = len(scores[0])
for j in range(num_cols):
    total = 0
    for i in range(len(scores)):
        total += scores[i][j]
    print(f"{subjects[j]}: total = {total}, average = {total / len(scores):.2f}")
```
```
Somchai: total = 276, average = 69.00
Somsri: total = 265, average = 66.25
Sompong: total = 372, average = 93.00
Math: total = 217, average = 72.33
Science: total = 219, average = 73.00
English: total = 236, average = 78.67
Computer: total = 241, average = 80.33
```

6. เขียนแบบย่อด้วย List Comprehension แล้วเทียบผล

```python
row_avgs = [sum(row) / len(row) for row in scores]
col_avgs = [sum(row[j] for row in scores) / len(scores) for j in range(len(scores[0]))]
print(row_avgs)
print(col_avgs)
```
```
[69.0, 66.25, 93.0]
[72.33333333333333, 73.0, 78.66666666666667, 80.33333333333333]
```

> [!warning] ตัวหารของค่าเฉลี่ยแถวกับคอลัมน์ไม่เท่ากัน
> ค่าเฉลี่ยแถวหารด้วยจำนวนคอลัมน์ (`len(row)` = 4) แต่ค่าเฉลี่ยคอลัมน์หารด้วยจำนวนแถว (`len(scores)` = 3) ถ้าเผลอใช้ `len(scores[0])` หาค่าเฉลี่ยคอลัมน์จะได้ `217 / 4 = 54.25` ซึ่งผิด

> [!question]- คำถาม 1.2: ถ้าเปลี่ยน `/ len(scores)` เป็น `// len(scores)` ในค่าเฉลี่ยคอลัมน์ ผลลัพธ์ของ Math และ Science จะเป็นเท่าใด
> > [!success]- แนวคำตอบ
> > `217 // 3 = 72` และ `219 // 3 = 73` — Science บังเอิญหารลงตัวจึงถูก แต่ Math เสียเศษ .33 ไป จึงไม่ควรใช้ `//` หาค่าเฉลี่ย

## ส่วนที่ 2: พิมพ์ตารางและแทรกหัวตาราง (45 นาที)

### ขั้นตอนที่ 4: ฟังก์ชัน print_table
7. เขียนฟังก์ชันพิมพ์ตารางที่หาความกว้างของแต่ละคอลัมน์อัตโนมัติ

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

print_table(scores)
```
```
--------------------
55 | 63 | 77 | 81 | 
65 | 61 | 67 | 72 | 
97 | 95 | 92 | 88 | 
--------------------
```

8. เพิ่ม `print(col_widths, line_length)` ไว้ในฟังก์ชันชั่วคราว ควรได้ `[2, 2, 2, 2] 20` — นับเส้นประในผลลัพธ์ว่าครบ 20 ตัวจริงหรือไม่
9. ทดลองเปลี่ยน `<` เป็น `>` แล้วสังเกตว่าตัวเลขเลื่อนไปทางใด (กับเลข 2 หลักทุกช่องจะยังมองไม่เห็นความต่าง — เก็บไว้ดูในขั้นตอนที่ 5)

> [!question]- คำถาม 2.1: ถ้าลบ `str()` ออกจาก `len(str(row[i]))` จะเกิดอะไรขึ้นเมื่อเรียก `print_table(scores)`
> > [!success]- แนวคำตอบ
> > เกิด `TypeError: object of type 'int' has no len()` เพราะ `len()` ใช้กับจำนวนเต็มไม่ได้ ต้องแปลงเป็นสายอักขระก่อนจึงนับจำนวนตัวอักษรได้

### ขั้นตอนที่ 5: แทรกหัวตารางและสังเกตสำเนาตื้น
10. **ก่อนรัน** ให้คำนวณ `col_widths` และ `line_length` ของตารางใหม่ด้วยมือ (ชื่อยาวสุดแต่ละคอลัมน์คือ `Somchai`, `Math`, `Science`, `English`, `Computer`)

```python
table_show = scores.copy()
subject_show = subjects.copy()
subject_show.insert(0, "Name")
table_show.insert(0, subject_show)
for i in range(len(names)):
    table_show[i + 1].insert(0, names[i])

print_table(table_show)
```
```
------------------------------------------------
Name    | Math | Science | English | Computer | 
Somchai | 55   | 63      | 77      | 81       | 
Somsri  | 65   | 61      | 67      | 72       | 
Sompong | 97   | 95      | 92      | 88       | 
------------------------------------------------
```
`col_widths = [7, 4, 7, 7, 8]` รวม 33 บวก 5 × 3 = 48 — ตอนนี้เห็นผลของ `<` ชัดเจน (ตัวเลขชิดซ้ายแล้วเติมช่องว่างทางขวา)

11. ตารางสวยแล้ว แต่ให้พิมพ์ตัวแปรต้นฉบับดูก่อนไปต่อ

```python
print(scores)
print(subjects)
print(table_show[1] is scores[0])
```
```
[['Somchai', 55, 63, 77, 81], ['Somsri', 65, 61, 67, 72], ['Sompong', 97, 95, 92, 88]]
['Math', 'Science', 'English', 'Computer']
True
```

> [!warning] `scores` เปลี่ยนไปทั้งที่เราแก้แค่ `table_show`
> `scores.copy()` เป็น **สำเนาตื้น (Shallow Copy)** คัดลอกเฉพาะลิสต์ชั้นนอก ลิสต์แถวข้างในยังเป็นตัวเดียวกัน (`is` ได้ `True`) การ `insert` ชื่อลงใน `table_show[i + 1]` จึงเท่ากับ insert ลงใน `scores[i]` ด้วย ส่วน `subjects` ไม่เปลี่ยนเพราะ `subject_show.insert(0, "Name")` แก้ลิสต์ชั้นนอกที่เป็นสำเนาจริง — ถ้าตอนนี้รันขั้นตอนที่ 3 ซ้ำ `sum(scores[i])` จะพังเพราะมีสายอักขระปนอยู่

12. แก้ไขโดยสร้าง `scores` ใหม่ แล้วใช้สำเนาลึกแทน

```python
import copy
scores = [[55, 63, 77, 81],
          [65, 61, 67, 72],
          [97, 95, 92, 88]]

table_show = copy.deepcopy(scores)
table_show.insert(0, ["Name"] + subjects)
for i in range(len(names)):
    table_show[i + 1].insert(0, names[i])

print_table(table_show)
print(scores)
```
```
------------------------------------------------
Name    | Math | Science | English | Computer | 
Somchai | 55   | 63      | 77      | 81       | 
Somsri  | 65   | 61      | 67      | 72       | 
Sompong | 97   | 95      | 92      | 88       | 
------------------------------------------------
[[55, 63, 77, 81], [65, 61, 67, 72], [97, 95, 92, 88]]
```

> [!question]- คำถาม 2.2: จงเสนอวิธีสร้าง `table_show` โดย **ไม่ใช้** `copy` เลย แต่ `scores` ยังไม่เปลี่ยน
> > [!success]- แนวคำตอบ
> > สร้างแถวใหม่ทุกแถวด้วยการต่อลิสต์ ซึ่งคืนลิสต์ใหม่เสมอ: `table_show = [[names[i]] + scores[i] for i in range(len(names))]` แล้ว `table_show.insert(0, ["Name"] + subjects)`

### ขั้นตอนที่ 6: เพิ่มคอลัมน์ค่าเฉลี่ย
13. เพิ่มคอลัมน์ `Average` ทางขวาสุด โดยจัดรูปแบบทศนิยม 2 ตำแหน่งเป็นสายอักขระก่อนใส่ในตาราง

```python
table_avg = copy.deepcopy(table_show)
table_avg[0].append("Average")
for i in range(len(scores)):
    avg = sum(scores[i]) / len(scores[i])
    table_avg[i + 1].append(f"{avg:.2f}")

print_table(table_avg)
```
```
----------------------------------------------------------
Name    | Math | Science | English | Computer | Average | 
Somchai | 55   | 63      | 77      | 81       | 69.00   | 
Somsri  | 65   | 61      | 67      | 72       | 66.25   | 
Sompong | 97   | 95      | 92      | 88       | 93.00   | 
----------------------------------------------------------
```
คอลัมน์ใหม่กว้าง 7 (จากคำว่า `Average`) จึงได้ `col_widths = [7, 4, 7, 7, 8, 7]` และ `line_length = 40 + 6 × 3 = 58`

> [!tip] ทำไมใส่ `f"{avg:.2f}"` ไม่ใส่ `avg` ตรง ๆ
> ถ้าใส่ `69.0` ตรง ๆ `str(69.0)` ยาว 4 แต่ `str(66.25)` ยาว 5 ตารางจะไม่เรียบ และ `print_table` ไม่รู้ว่าต้องปัดทศนิยม การแปลงเป็นสายอักขระที่จัดรูปแบบแล้วก่อนใส่ตาราง ทำให้ `print_table` ทำงานกับ "ข้อความ" ล้วน ๆ ได้เหมือนกันทุกคอลัมน์

14. (ถ้ามี pandas) ตรวจคำตอบด้วย `pd.DataFrame(scores, columns=subjects, index=names).mean(axis=1)` ควรได้ 69.00, 66.25, 93.00 ตรงกับคอลัมน์ Average

## ส่วนที่ 3: สแตก (40 นาที)

### ขั้นตอนที่ 7: คลาส Stack และการไล่ลำดับ
15. พิมพ์คลาส `Stack` ลงในไฟล์ `stack_v2.py` (หรือเซลล์ใหม่) แล้ว **วาดตารางไล่ลำดับ `items` บนกระดาษก่อนรัน**

```python
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

m = Stack()
print(m.is_empty(), m.size())
m.push('x')
m.push('y')
m.push('z')
print(m.items, m.size())
print(m.peek(), m.size())
print(m.pop(), m.items)
print(m.pop(), m.items)
print(m.pop(), m.items)
print(m.is_empty())
```
```
True 0
['x', 'y', 'z'] 3
z 3
z ['x', 'y']
y ['x']
x []
True
```

16. สังเกตว่า `peek()` คืน `'z'` แต่ `size()` ยังเป็น 3 (ดูเฉย ๆ ไม่หยิบออก) ส่วน `pop()` คืน `'z'` แล้ว `items` สั้นลง
17. เพิ่ม `print(m.pop())` อีกหนึ่งบรรทัดท้ายสุด แล้วรัน — ควรได้ `IndexError: pop from empty stack` อ่านข้อความ traceback ว่าชี้มาที่บรรทัด `raise` ในเมท็อด `pop`

> [!question]- คำถาม 3.1: สร้าง `a = Stack()` และ `b = Stack()` แล้ว `a.push(1); a.push(2); b.push(9)` ค่าของ `a.size()`, `b.size()`, `b.peek()` คืออะไร และทำไมสองวัตถุไม่ปนกัน
> > [!success]- แนวคำตอบ
> > `2 1 9` — `__init__` สร้าง `self.items = []` ใหม่ให้วัตถุแต่ละตัวตอนเรียก `Stack()` ทั้งสองจึงมีลิสต์คนละตัว

### ขั้นตอนที่ 8: อธิบายข้อผิดพลาดใน stack_v2.py
18. ส่วนท้ายของ `stack_v2.py` ในคาบเขียนไว้แบบนี้ **ทายผลก่อนรัน** ว่าจะพิมพ์อะไรและพังที่รอบใด

```python
m = Stack()
m.push('x')
m.push('y')
m.push('z')
while not m.is_empty():
    print(m.pop())
    print(m.pop())
```
```
z
y
x
Traceback (most recent call last):
  ...
    raise IndexError("pop from empty stack")
IndexError: pop from empty stack
```

| รอบ | `items` ต้นรอบ | `is_empty()` | pop ครั้งที่ 1 | pop ครั้งที่ 2 |
|---|---|---|---|---|
| 1 | `['x', 'y', 'z']` | False → เข้ารอบ | `z` → `['x', 'y']` | `y` → `['x']` |
| 2 | `['x']` | False → เข้ารอบ | `x` → `[]` | **ว่าง → `IndexError`** |

> [!warning] เงื่อนไขของ `while` ตรวจแค่ต้นรอบ
> สแตกมี 3 ตัว แต่แต่ละรอบ pop 2 ตัว รอบที่สองจึงเหลือตัวเดียวให้ pop ครั้งแรก ส่วน pop ครั้งที่สองเจอสแตกว่างโดยไม่มีใครตรวจ `is_empty()` ให้ — กฎทั่วไป: **ตรวจ `is_empty()` ก่อน `pop()` ทุกครั้ง** ไม่ใช่แค่ครั้งแรกของรอบ

19. แก้ไข 2 แบบแล้วรันทั้งคู่: (ก) เหลือ `print(m.pop())` บรรทัดเดียวต่อรอบ (ข) คง 2 บรรทัดไว้แต่ครอบบรรทัดที่สองด้วย `if not m.is_empty():` — ทั้งสองแบบต้องได้ `z`, `y`, `x` โดยไม่เกิดข้อผิดพลาด

> [!question]- คำถาม 3.2: ถ้า push 4 ตัว (`'w', 'x', 'y', 'z'`) แทน 3 ตัว โค้ดเดิมที่ pop 2 ครั้งต่อรอบจะยังพังหรือไม่
> > [!success]- แนวคำตอบ
> > ไม่พัง — รอบ 1 pop `z`, `y` รอบ 2 pop `x`, `w` แล้วสแตกว่างพอดี ข้อผิดพลาดนี้เกิดเฉพาะเมื่อจำนวนข้อมูลเป็น **เลขคี่** ซึ่งเป็นบั๊กชนิดที่ทดสอบผ่านบางกรณีแล้วพังในกรณีอื่น

### ขั้นตอนที่ 9: กลับลำดับและตรวจวงเล็บ
20. เขียนฟังก์ชัน `reverse(text)` และ `balanced(text)` โดยใช้คลาส `Stack`

```python
def reverse(text):
    s = Stack()
    for ch in text:
        s.push(ch)
    out = ""
    while not s.is_empty():
        out += s.pop()
    return out

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

print(reverse("Python"))
print(reverse("KSU"))
print(balanced("(a+b)*(c-d)"))
print(balanced("((a+b)"))
print(balanced("a+b)("))
print(balanced(""))
```
```
nohtyP
USK
True
False
False
True
```

21. ไล่ `balanced("a+b)(")` ด้วยมือ: พบ `)` ขณะสแตกว่าง → คืน `False` ทันทีโดยไม่ดู `(` ตัวท้าย ส่วน `balanced("")` ไม่มีวงเล็บเลย สแตกว่างตอนจบจึงเป็น `True`

> [!tip] ขยายให้รองรับ `[]` และ `{}`
> push วงเล็บเปิดทุกชนิด และเมื่อพบวงเล็บปิดให้ `pop()` แล้วตรวจว่าเป็นคู่ที่ถูกต้อง เช่น `"([)]"` ต้องได้ `False` — ลองทำเป็นการบ้าน

## คำถามท้ายใบงาน
> [!question]- 1. เริ่มจากสแตกว่าง ทำ `push(1), push(2), push(3), pop(), push(4), pop(), pop()` จงเขียนตารางไล่ `items` ทุกขั้น และบอกค่าที่ pop ได้ตามลำดับ
> > [!success]- แนวคำตอบ
> > `[1]` → `[1, 2]` → `[1, 2, 3]` → pop `3` → `[1, 2]` → `[1, 2, 4]` → pop `4` → `[1, 2]` → pop `2` → `[1]` ดังนั้น pop ได้ `3, 4, 2` เหลือ `[1]`

> [!question]- 2. ตาราง `[["ID", "Score"], [7, 100], [12345, 9]]` มี `col_widths` และ `line_length` เท่าใด และบรรทัดที่สองที่ `print_table` พิมพ์มีหน้าตาอย่างไร
> > [!success]- แนวคำตอบ
> > `[5, 5]` และ `10 + 2 × 3 = 16`; บรรทัดที่สองคือ `7     | 100   | ` (เลข 7 ตามด้วยช่องว่าง 4 ตัว, 100 ตามด้วยช่องว่าง 2 ตัว)

> [!question]- 3. เหตุใด `grid = [[0] * 3] * 2` แล้ว `grid[0][0] = 9` จึงได้ `[[9, 0, 0], [9, 0, 0]]` และเกี่ยวกับสำเนาตื้นในขั้นตอนที่ 5 อย่างไร
> > [!success]- แนวคำตอบ
> > `* 2` ทำซ้ำ **การอ้างอิง** ถึงลิสต์ `[0, 0, 0]` ตัวเดียว ทั้งสองแถวจึงเป็นวัตถุเดียวกัน เหมือน `scores.copy()` ที่ชั้นในยังใช้ลิสต์ร่วมกัน วิธีที่ถูกคือ `[[0] * 3 for _ in range(2)]` ซึ่งสร้างลิสต์ใหม่ทุกรอบ

## สิ่งที่ต้องส่ง
- ไฟล์ `Lab04_<รหัสนักศึกษา>.ipynb` (หรือ `list_of_list.py`, `exam_table.py`, `stack_v2.py`) ที่มีผลลัพธ์ทุกเซลล์ รวมทั้งเซลล์ที่แสดง `scores` ก่อนและหลังแก้ปัญหาสำเนาตื้น
- ตารางไล่ลำดับสแตกของขั้นตอนที่ 8 (เขียนมือหรือ Markdown) พร้อมคำอธิบายว่าพังที่รอบใดเพราะอะไร และโค้ดที่แก้แล้วทั้ง 2 แบบ
- คำตอบคำถาม 1.1, 1.2, 2.1, 2.2, 3.1, 3.2 และคำถามท้ายใบงาน 1–3 ในเซลล์ Markdown
