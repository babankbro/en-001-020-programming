> [!info] ผลลัพธ์ในใบงานนี้
> output ทุกกล่องได้จากการรันจริงด้วย Python 3.12 บน Windows (เลขเวอร์ชันของไลบรารีบนเครื่องนักศึกษาอาจต่างกันเล็กน้อย ถือว่าถูกต้องถ้าแสดงเลขเวอร์ชันได้โดยไม่เกิด error) ให้ **พิมพ์โค้ดเอง ห้ามคัดลอกวาง** และก่อนรันทุกครั้งให้ **ทายผลลัพธ์บนกระดาษก่อน** แล้วค่อยเทียบ ใบงานนี้ทำเป็นกลุ่ม 2–3 คน แต่ทุกคนต้องติดตั้งบนเครื่องของตนเองให้สำเร็จ

## ส่วนที่ 1: ติดตั้งและตรวจสอบเครื่องมือ (45 นาที)

### ขั้นตอนที่ 1: ตรวจสอบ Python
1. เปิดเทอร์มินัล (Windows: กด Win แล้วพิมพ์ `PowerShell` · macOS: Terminal)
2. พิมพ์คำสั่งต่อไปนี้ (macOS/Linux อาจต้องใช้ `python3`)

```text
python --version
```
```
Python 3.12.8
```
3. ถ้าได้ตัวเลข 3.10 ขึ้นไป ผ่าน ถ้าได้ข้อความ `'python' is not recognized...` หรือ Microsoft Store เปิดขึ้นมา ให้ติดตั้งจาก python.org โดย **ติ๊ก "Add python.exe to PATH"** แล้ว **ปิดและเปิดเทอร์มินัลใหม่** ก่อนตรวจซ้ำ (ดูรายละเอียดใน [/module/01#topic-3](/module/01#topic-3))
4. ตรวจว่า pip ชี้ไปที่ไพทอนตัวเดียวกัน

```text
python -m pip --version
```
```
pip 25.3 from C:\Users\student\AppData\Local\Programs\Python\Python312\Lib\site-packages\pip (python 3.12)
```

> [!question]- คำถาม 1.1: ทำไมใบงานนี้ใช้ `python -m pip` แทน `pip` เฉย ๆ
> > [!success]- แนวคำตอบ
> > `python -m pip` บังคับให้ pip ของไพทอน **ตัวเดียวกับที่ใช้รันโค้ด** เป็นคนติดตั้ง ถ้าเครื่องมีไพทอนหลายตัว `pip` เฉย ๆ อาจเป็นของอีกตัว ทำให้ติดตั้งสำเร็จแต่ `import` ไม่เจอ

### ขั้นตอนที่ 2 (ทางเลือก): สร้าง Virtual Environment
5. สร้างโฟลเดอร์ `ps-course` สำหรับเก็บงานทั้งวิชา แล้ว `cd` เข้าไป
6. สร้างและเปิดใช้สภาพแวดล้อมเสมือน

```text
python -m venv .venv
.venv\Scripts\activate
```
```
(.venv) C:\Users\student\ps-course>
```
พรอมต์ที่มี `(.venv)` นำหน้าแปลว่ากำลังใช้ไพทอนในโฟลเดอร์นี้ (macOS/Linux ใช้ `source .venv/bin/activate`) หากข้ามขั้นตอนนี้ ให้ทำขั้นตอนถัดไปกับไพทอนหลักของเครื่องได้เลย

### ขั้นตอนที่ 3: ติดตั้งไลบรารี
```text
python -m pip install pygame numpy matplotlib pandas
```
```
Collecting pygame
  Downloading pygame-2.6.1-cp312-cp312-win_amd64.whl (10.6 MB)
Collecting numpy
  ...
Successfully installed contourpy-... matplotlib-3.8.2 numpy-1.26.2 pandas-2.2.0 pygame-2.6.1 ...
```
บรรทัดสุดท้ายต้องขึ้นต้นด้วย `Successfully installed` (ถ้าเคยติดตั้งแล้วจะได้ `Requirement already satisfied`) ใช้เวลา 1–3 นาทีขึ้นกับอินเทอร์เน็ต

> [!warning] ถ้าขึ้น `ERROR: Could not find a version that satisfies the requirement pygame`
> มักเกิดจากไพทอนรุ่นใหม่มากที่ pygame ยังไม่มีไฟล์ติดตั้งสำเร็จรูป (wheel) ให้ หรือไม่มีอินเทอร์เน็ต วิธีแก้: ตรวจเวอร์ชันไพทอน (ใช้ 3.12 เป็นรุ่นที่ทดสอบแล้ว) หรือลอง `python -m pip install pygame-ce` ซึ่งเป็นรุ่นชุมชนที่ใช้ API เดียวกัน

### ขั้นตอนที่ 4: เขียนสคริปต์ตรวจสอบเวอร์ชัน
7. เปิด VS Code → File → Open Folder เลือก `ps-course` → สร้างไฟล์ `check_env.py` แล้วพิมพ์

```python
import sys
import pygame, numpy, matplotlib, pandas

print("Python    :", sys.version.split()[0])
print("pygame    :", pygame.version.ver)
print("numpy     :", numpy.__version__)
print("matplotlib:", matplotlib.__version__)
print("pandas    :", pandas.__version__)
```
8. รันด้วยปุ่ม ▶ มุมขวาบนของ VS Code หรือพิมพ์ในเทอร์มินัล `python check_env.py`

```
pygame 2.6.1 (SDL 2.28.4, Python 3.12.8)
Hello from the pygame community. https://www.pygame.org/contribute.html
Python    : 3.12.8
pygame    : 2.6.1
numpy     : 1.26.2
matplotlib: 3.8.2
pandas    : 2.2.0
```
สองบรรทัดแรกเป็นข้อความทักทายที่ pygame พิมพ์เองตอน `import` ไม่ใช่ error

> [!tip] VS Code รันด้วยไพทอนตัวไหน
> ดูที่แถบสถานะมุมล่างขวา (เช่น `3.12.8 ('.venv')`) ถ้าไม่ตรงกับที่ติดตั้งไลบรารี ให้กด Ctrl+Shift+P → **Python: Select Interpreter** แล้วเลือกตัวที่ถูกต้อง นี่คือสาเหตุอันดับหนึ่งของ `ModuleNotFoundError` ในห้องปฏิบัติการ

> [!question]- คำถาม 1.2: ถ้า `check_env.py` หยุดที่บรรทัด `import pygame, numpy, matplotlib, pandas` ด้วย `ModuleNotFoundError: No module named 'pandas'` แปลว่าไลบรารีตัวใดติดตั้งสำเร็จแล้วบ้าง
> > [!success]- แนวคำตอบ
> > `pygame`, `numpy`, `matplotlib` นำเข้าสำเร็จแล้ว (ไพทอนนำเข้าจากซ้ายไปขวาและหยุดที่ตัวแรกที่หาไม่พบ) ขาดเฉพาะ `pandas` ให้รัน `python -m pip install pandas`

## ส่วนที่ 2: โปรแกรมแรกบน Colab และ VS Code (40 นาที)

### ขั้นตอนที่ 5: Notebook แรกบน Google Colab
9. เปิด colab.research.google.com → **New notebook** → เปลี่ยนชื่อเป็น `Lab01_<รหัสนักศึกษา>.ipynb`
10. พิมพ์ในเซลล์แรกแล้วกด **Shift+Enter**

```python
print("Hello, my name is <ชื่อของคุณ>.")
a = 5
b = 2
print("a x b =", a*b)
print(type(a), type(a / b))
```
```
Hello, my name is <ชื่อของคุณ>.
a x b = 10
<class 'int'> <class 'float'>
```
11. สร้างเซลล์ใหม่ (ปุ่ม + Code) พิมพ์ **เฉพาะ** `a * b` โดยไม่มี `print` แล้วรัน — Notebook จะแสดงค่า `10` ของนิพจน์บรรทัดสุดท้ายให้เอง
12. สร้างเซลล์ที่สาม พิมพ์ `print(c)` แล้วรัน สังเกต error ที่ได้

```
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
...
NameError: name 'c' is not defined
```
13. แก้โดยเพิ่มเซลล์ใหม่ **ด้านบน** เซลล์ที่สาม พิมพ์ `c = a + b` รัน แล้วกลับไปรันเซลล์ `print(c)` อีกครั้ง → ได้ `7`

> [!question]- คำถาม 2.1: ถ้ากด Runtime → Restart session แล้วรันเฉพาะเซลล์ `print(c)` ทันที จะเกิดอะไรขึ้น เพราะเหตุใด
> > [!success]- แนวคำตอบ
> > ได้ `NameError` อีกครั้ง เพราะการ Restart ล้างตัวแปรทั้งหมดใน kernel ตัวแปร `a`, `b`, `c` จึงยังไม่ถูกสร้างจนกว่าจะรันเซลล์ที่นิยามมันใหม่ — ต่างจากไฟล์ `.py` ที่รันทั้งไฟล์ตามลำดับทุกครั้ง

### ขั้นตอนที่ 6: ไฟล์ .py แรกใน VS Code
14. สร้างไฟล์ `first.py` ใน VS Code แล้วพิมพ์ **โดยตั้งใจเว้นวงเล็บปิดบรรทัดสุดท้าย**

```python
print("start")
n1, n2, n3 = 5, 10, 15
total = n1 + n2 + n3
avg = total / 3
print(f"average of {n1} {n2} and {n3} is {avg}."
```
```
  File "first.py", line 5
    print(f"average of {n1} {n2} and {n3} is {avg}."
         ^
SyntaxError: '(' was never closed
```
15. สังเกตว่า `start` **ไม่ถูกพิมพ์** แม้บรรทัดแรกจะถูกต้อง จดเหตุผลลงใบงาน แล้วเติม `)` ให้ครบและรันใหม่

```
start
average of 5 10 and 15 is 10.0.
```
16. เพิ่มบรรทัด `print("sum = " + total)` ต่อท้ายแล้วรัน

```
start
average of 5 10 and 15 is 10.0.
Traceback (most recent call last):
  File "first.py", line 6, in <module>
    print("sum = " + total)
          ~~~~~~~~~^~~~~~~
TypeError: can only concatenate str (not "int") to str
```
17. ครั้งนี้สองบรรทัดแรก **ถูกพิมพ์** ก่อนเกิด error แก้เป็น `print(f"sum = {total}")` แล้วรันจนได้ `sum = 30`

> [!warning] อ่าน Traceback จากล่างขึ้นบน
> บรรทัดสุดท้ายบอก **ชนิด** (`TypeError`) และ **สาเหตุ** (ต่อ `str` กับ `int` ไม่ได้) บรรทัดเหนือขึ้นไปบอก **ตำแหน่ง** (`line 6`) และเครื่องหมาย `^` ชี้ตัวดำเนินการ `+` ที่มีปัญหา อย่าอ่านแค่คำว่า Traceback แล้วตกใจ

> [!question]- คำถาม 2.2: ข้อผิดพลาดในขั้นตอนที่ 14 กับขั้นตอนที่ 16 ต่างกันอย่างไรในแง่ "โปรแกรมเริ่มทำงานหรือยัง"
> > [!success]- แนวคำตอบ
> > `SyntaxError` (ขั้นตอน 14) ถูกตรวจพบตอนแปลไวยากรณ์ก่อนรัน โปรแกรมจึงไม่ทำงานเลย ส่วน `TypeError` (ขั้นตอน 16) เป็น runtime error โปรแกรมรันบรรทัด 1–5 สำเร็จแล้วจึงล้มที่บรรทัด 6

## ส่วนที่ 3: หน้าต่าง Pygame แรกและตารางไล่ค่า (35 นาที)

### ขั้นตอนที่ 7: หน้าต่างสีดำ 800×600
18. สร้างไฟล์ `first_window.py` แล้วพิมพ์

```python
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Lab01 - My First Window")
clock = pygame.time.Clock()

running = True
while running:
    for event in pygame.event.get():        # รับเหตุการณ์จากผู้ใช้
        if event.type == pygame.QUIT:       # กดกากบาทปิดหน้าต่าง
            running = False
    screen.fill((0, 0, 0))                  # ล้างจอด้วยสีดำ (R, G, B)
    pygame.display.flip()                   # แสดงภาพ
    clock.tick(60)                          # ไม่เกิน 60 เฟรม/วินาที

pygame.quit()
print("window closed")
```
19. รันด้วย `python first_window.py`

```
สิ่งที่เห็น: หน้าต่างใหม่ขนาด 800×600 พิกเซล พื้นหลังสีดำล้วน ชื่อหน้าต่าง "Lab01 - My First Window"
หน้าต่างค้างเปิดอยู่ (ไม่ปิดเอง) จนกว่าจะกดปุ่มกากบาทมุมขวาบน
เมื่อปิดแล้ว เทอร์มินัลพิมพ์: window closed
```
20. ทดลองเปลี่ยน `screen.fill((0, 0, 0))` เป็น `screen.fill((0, 0, 255))` → พื้นหลังสีน้ำเงิน แล้วเปลี่ยนเป็น `(255, 255, 0)` → สีเหลือง บันทึกว่าแต่ละค่าให้สีอะไร
21. ทดลอง **คอมเมนต์บรรทัด `for event ...` ถึง `running = False` ทั้ง 3 บรรทัด** แล้วรัน — หน้าต่างจะ "ไม่ตอบสนอง (Not Responding)" และกดกากบาทไม่ได้ ให้ปิดด้วยการกด Ctrl+C ในเทอร์มินัล แล้วเอาคอมเมนต์ออก

> [!tip] วงวนเกม 6 ขั้น
> `event.get()` → `fill()` → อัปเดต → วาด → `flip()` → `tick()` — ไฟล์นี้มีแค่ขั้น 1, 2, 5, 6 บทที่ 5 จะเติมขั้น 3–4 (ลูกบอลเด้ง) ลงไปในโครงเดียวกันนี้ ให้เก็บไฟล์นี้ไว้เป็นต้นแบบ

> [!question]- คำถาม 3.1: ถ้าลบบรรทัด `pygame.display.flip()` ออก จะเห็นอะไรบนหน้าต่าง และทำไม
> > [!success]- แนวคำตอบ
> > หน้าต่างเปิดได้แต่ภาพไม่อัปเดต (อาจเป็นสีดำหรือภาพค้าง) เพราะ `fill()` วาดลงบัฟเฟอร์หลังจอ ต้อง `flip()` เพื่อสลับบัฟเฟอร์นั้นขึ้นมาแสดง

### ขั้นตอนที่ 8: ตารางไล่ค่าบนกระดาษ
22. **ห้ามรันก่อน** ให้ไล่ค่าโค้ดต่อไปนี้บนกระดาษเป็นตาราง 3 คอลัมน์ (`frame`, `y`, `vy`) จนครบ 6 รอบ

```python
GRAVITY = 0.1
y, vy = 100, 0
for frame in range(1, 7):
    y += vy
    vy += GRAVITY
    print(frame, round(y, 2), round(vy, 2))
```
23. เมื่อทำตารางเสร็จแล้วค่อยรันในเซลล์ Colab เพื่อตรวจคำตอบ

```
1 100 0.1
2 100.1 0.2
3 100.3 0.3
4 100.6 0.4
5 101.0 0.5
6 101.5 0.6
```
24. ไล่ค่าซ้ำอีกครั้งโดย **สลับลำดับ** สองบรรทัดในลูป (`vy += GRAVITY` ก่อน `y += vy`) แล้วเทียบกับผลรัน

```
1 100.1 0.1
2 100.3 0.2
3 100.6 0.3
4 101.0 0.4
5 101.5 0.5
6 102.1 0.6
```

> [!question]- คำถาม 3.2: ทำไมการสลับลำดับสองบรรทัดจึงทำให้ `y` ในทุกเฟรมต่างกัน ทั้งที่ค่า `vy` เหมือนเดิม
> > [!success]- แนวคำตอบ
> > แบบเดิมใช้ความเร็ว "ก่อนเพิ่ม" ในการเลื่อนตำแหน่ง แบบสลับใช้ความเร็ว "หลังเพิ่ม" จึงเลื่อนมากกว่าเฟรมละ 0.1 สะสมไปเรื่อย ๆ (เฟรม 6 ต่างกัน 0.6) ข้อสอบไล่ค่าในบทที่ 5 ต้องดูลำดับบรรทัดให้แม่น

## คำถามท้ายใบงาน
> [!question]- 1. โปรแกรมต่อไปนี้พิมพ์อะไร และหากพิมพ์ `rnage` แทน `range` จะเกิด error ชนิดใด
> ```python
> s = 0
> for i in range(1, 5):
>     s += i * i
> print(s)
> ```
> > [!success]- แนวคำตอบ
> > $1 + 4 + 9 + 16 = 30$ → พิมพ์ `30` · ถ้าพิมพ์ `rnage` จะได้ `NameError: name 'rnage' is not defined` (ชื่อที่ไม่มีอยู่ ไม่ใช่ SyntaxError เพราะไวยากรณ์ยังถูก)

> [!question]- 2. เพื่อนร่วมกลุ่มรัน `check_env.py` แล้วได้ `ModuleNotFoundError: No module named 'pygame'` ทั้งที่เพิ่ง `pip install pygame` สำเร็จ จงเขียนลำดับขั้นการวินิจฉัย 3 ขั้น
> > [!success]- แนวคำตอบ
> > (1) ดู interpreter ที่ VS Code ใช้ที่แถบสถานะ หรือรัน `import sys; print(sys.executable)` (2) รัน `python -m pip --version` เทียบว่าเป็นโฟลเดอร์เดียวกันหรือไม่ (3) ถ้าไม่ตรง เลือก interpreter ให้ตรง หรือติดตั้งใหม่ด้วย `python -m pip install pygame` จากไพทอนตัวที่ใช้รัน

> [!question]- 3. ในไฟล์ `first_window.py` ถ้าเปลี่ยน `clock.tick(60)` เป็น `clock.tick(10)` ผู้ใช้จะสังเกตเห็นความต่างหรือไม่ในใบงานนี้ และจะเห็นความต่างเมื่อใด
> > [!success]- แนวคำตอบ
> > ตอนนี้ยังไม่เห็น เพราะจอเป็นสีดำนิ่ง ๆ ไม่มีอะไรเคลื่อนที่ จะเห็นชัดในบทที่ 5 เมื่อมีลูกบอลเคลื่อนที่: 10 FPS ทำให้ภาพกระตุก และลูกบอลที่เลื่อน 3 พิกเซล/เฟรม จะเคลื่อนเพียง 30 พิกเซล/วินาที แทน 180

## สิ่งที่ต้องส่ง
- ภาพหน้าจอ (screenshot) ผลรัน `check_env.py` ที่แสดงเวอร์ชันครบทั้ง 5 บรรทัด **จากเครื่องของตนเอง**
- ไฟล์ `Lab01_<รหัสนักศึกษา>.ipynb` จาก Colab ที่มีเซลล์ขั้นตอนที่ 10–13 และ 23–24 พร้อมผลลัพธ์ (รวมเซลล์ที่เกิด `NameError` ด้วย ไม่ต้องลบ)
- ไฟล์ `first.py` (ฉบับแก้แล้ว) และ `first_window.py` พร้อมภาพหน้าจอหน้าต่าง Pygame ที่เปลี่ยนสีพื้นหลังเป็นสีที่กลุ่มเลือกเอง (ระบุค่า RGB ไว้ในคอมเมนต์)
- ภาพถ่ายตารางไล่ค่าบนกระดาษจากขั้นตอนที่ 22 และ 24 และคำตอบคำถาม 1.1–3.2 กับคำถามท้ายใบงาน 1–3 ในเซลล์ Markdown
