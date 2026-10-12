> [!info] ผลลัพธ์ในใบงานนี้
> output ทุกกล่องได้จากการรันจริงด้วย Python 3.12 บน Jupyter Notebook ให้นักศึกษาพิมพ์โค้ดเอง **ห้ามคัดลอกวาง** เพื่อฝึกสังเกตไวยากรณ์ และก่อนรันทุกครั้งให้ **ทายผลลัพธ์บนกระดาษก่อน** แล้วค่อยเทียบ

## ส่วนที่ 1: โปรแกรมแรกและ f-string (30 นาที)

### ขั้นตอนที่ 1: เปิด Notebook และรันเซลล์แรก
1. เปิด Google Colab (colab.research.google.com) หรือ Jupyter Notebook บนเครื่อง สร้างสมุดใหม่ชื่อ `Lab02_<รหัสนักศึกษา>.ipynb`
2. พิมพ์โค้ดต่อไปนี้ในเซลล์แรกแล้วกด **Shift+Enter**

```python
print("Hello, my name is <ชื่อของคุณ>.")
a = 5
b = 2
print("a x b =", a*b)
print(f"a x b = {a*b}")
print("a x b = {a*b}")
```
```
Hello, my name is <ชื่อของคุณ>.
a x b = 10
a x b = 10
a x b = {a*b}
```

> [!question]- คำถาม 1.1: บรรทัดที่ 3 กับบรรทัดที่ 4 ของผลลัพธ์ต่างกันเพราะอะไร
> > [!success]- แนวคำตอบ
> > บรรทัดที่ 4 ไม่มีอักษร `f` นำหน้า ไพทอนจึงมองว่า `{a*b}` เป็นข้อความธรรมดา ไม่ใช่นิพจน์ที่ต้องคำนวณ

### ขั้นตอนที่ 2: ค่าเฉลี่ยของตัวเลข 3 จำนวน
```python
n1, n2, n3 = 5, 10, 15
total = n1 + n2 + n3
avg = total / 3
print(f"average of {n1} {n2} and {n3} is {avg}.")
print(f"average (2 decimals) = {avg:.2f}")
print(type(total), type(avg))
```
```
average of 5 10 and 15 is 10.0.
average (2 decimals) = 10.00
<class 'int'> <class 'float'>
```

3. เปลี่ยน `n1, n2, n3 = 7, 8, 10` แล้วรันใหม่ บันทึกผลลัพธ์ลงในใบงาน
4. ทดลองเปลี่ยน `/ 3` เป็น `// 3` แล้วสังเกตว่าค่าเฉลี่ยเปลี่ยนเป็นเท่าใด

## ส่วนที่ 2: ฟังก์ชันเวกเตอร์ (45 นาที)

### ขั้นตอนที่ 3: ผลคูณจุดแบบ 3 มิติ
```python
def dotv3(v, u):
    return v[0]*u[0] + v[1]*u[1] + v[2]*u[2]

a = (1, 2, 3)
b = (1, 0, 1)
print("a . b =", dotv3(a, b))
```
```
a . b = 4
```
5. คำนวณด้วยมือ: $1\cdot1 + 2\cdot0 + 3\cdot1 = 4$ ตรงกับโปรแกรมหรือไม่
6. ลองเรียก `dotv3((1, 2, 0, 4), (1, 2, 3, 4))` — ได้ค่าใด และค่าที่ถูกต้องควรเป็นเท่าใด

> [!warning] สิ่งที่ควรสังเกต
> `dotv3` ไม่เกิดข้อผิดพลาดกับเวกเตอร์ 4 มิติ แต่ **คำนวณผิด** เพราะมองแค่ 3 ตำแหน่งแรก (ได้ 1 + 4 + 0 = 5 แทนที่จะเป็น 21) ข้อผิดพลาดแบบนี้อันตรายกว่า error เพราะโปรแกรมไม่เตือน

### ขั้นตอนที่ 4: ทำให้รองรับทุกมิติด้วยการวนซ้ำ
```python
import math

def dotv(v, u):
    total = 0
    for i in range(len(v)):
        total += v[i] * u[i]
    return total

def lenv(v):
    sumofPower2 = 0
    for i in range(len(v)):
        sumofPower2 += v[i]*v[i]
    return math.sqrt(sumofPower2)

print(dotv((1, 2, 0, 4), (1, 2, 3, 4)))
lena = lenv((1, 2, 3, 4))
print(lena)
print(round(lena, 2))
```
```
21
5.477225575051661
5.48
```

7. เพิ่มฟังก์ชัน `unitv(v)` ที่คืนเวกเตอร์หนึ่งหน่วย (แต่ละสมาชิกหารด้วย `lenv(v)`) แล้วทดสอบกับ `(3, 4)` — ควรได้ `[0.6, 0.8]`

```python
def unitv(v):
    L = lenv(v)
    result = []
    for i in range(len(v)):
        result.append(v[i] / L)
    return result

print(unitv((3, 4)))
print(lenv(unitv((3, 4))))
```
```
[0.6, 0.8]
1.0
```

> [!question]- คำถาม 2.1: ถ้าเรียก `unitv((0, 0))` จะเกิดอะไรขึ้น และควรป้องกันอย่างไร
> > [!success]- แนวคำตอบ
> > `lenv((0,0))` ได้ 0 จึงเกิด `ZeroDivisionError` ควรตรวจ `if L == 0: return v` ก่อนหาร — หลักเดียวกับ `if direction.length() > 0:` ที่จะใช้ในเกมบทที่ 6–8

## ส่วนที่ 3: วาดรูปด้วย # แบบ Top-Down (45 นาที)

### ขั้นตอนที่ 5: line และ block
```python
def line(n):
    for i in range(n):
        print("#", end="")
    print()

def block(row, col):
    for i in range(row):
        line(col)

line(5)
block(2, 10)
```
```
#####
##########
##########
```

### ขั้นตอนที่ 6: triangle
8. เขียน `triangle(n)` โดย **เรียกใช้ `line()`** ไม่ใช่เขียนลูปซ้อนใหม่

```python
def triangle(n):
    for i in range(n):
        line(i + 1)

triangle(4)
```
```
#
##
###
####
```

### ขั้นตอนที่ 7 (การบ้าน): ต้นไม้
9. ออกแบบฟังก์ชัน `tree()` ที่ประกอบจาก `top_leaf()`, `bottom_leaf()` และ `clone()` ให้ได้ภาพประมาณนี้ (ใช้ `linespace(s, n)` ที่พิมพ์ช่องว่าง `s` ตัวแล้วตามด้วย `#` `n` ตัว)

```
   #
  ###
 #####
  ###
 #####
#######
   #
   #
```

```python
def linespace(s, n):
    for i in range(s):
        print(" ", end="")
    for i in range(n):
        print("#", end="")
    print()

def top_leaf():
    for i in range(3):
        linespace(3 - i, 2*i + 1)

def bottom_leaf():
    for i in range(3):
        linespace(2 - i, 2*i + 3)

def clone():
    for i in range(2):
        linespace(3, 1)

def tree():
    top_leaf()
    bottom_leaf()
    clone()

tree()
```

> [!tip] วาดแผนภาพการเรียกฟังก์ชันก่อนเขียนโค้ด
> `tree()` → `top_leaf()` / `bottom_leaf()` / `clone()` → ทุกตัวเรียก `linespace()` — นี่คือ Top-Down Design: ออกแบบจากฟังก์ชันระดับบนลงมาถึงฟังก์ชันพื้นฐาน

## คำถามท้ายใบงาน
> [!question]- 1. ถ้าเปลี่ยน `print("#", end="")` ใน `line()` เป็น `print("#")` ผลลัพธ์ของ `block(2, 3)` จะเป็นอย่างไร
> > [!success]- แนวคำตอบ
> > ได้ `#` 6 บรรทัด บรรทัดละตัว (ตามด้วยบรรทัดว่างจาก `print()` อีก 2 บรรทัด) เพราะทุก `#` ขึ้นบรรทัดใหม่

> [!question]- 2. `triangle(n)` พิมพ์ `#` ทั้งหมดกี่ตัวเมื่อ n = 6 และ n = 100
> > [!success]- แนวคำตอบ
> > $n(n+1)/2$ → 21 และ 5,050 ตัว

> [!question]- 3. จงเขียน `lenv` ใหม่โดยใช้ `dotv` เพียงบรรทัดเดียว
> > [!success]- แนวคำตอบ
> > `def lenv(v): return math.sqrt(dotv(v, v))` เพราะ $|\mathbf{v}| = \sqrt{\mathbf{v}\cdot\mathbf{v}}$

## สิ่งที่ต้องส่ง
- ไฟล์ `Lab02_<รหัสนักศึกษา>.ipynb` ที่มีผลลัพธ์ทุกเซลล์ (รันแล้ว)
- คำตอบคำถาม 1.1, 2.1 และคำถามท้ายใบงาน 1–3 เขียนในเซลล์ Markdown
- ภาพต้นไม้จาก `tree()` ของตนเอง (ออกแบบรูปทรงได้อิสระ แต่ต้องใช้ฟังก์ชันย่อยอย่างน้อย 3 ฟังก์ชัน)
