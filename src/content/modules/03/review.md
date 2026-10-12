## สิ่งที่ต้องจำ (Key Facts)
- `input()` คืน **str เสมอ** · `"15" + "5"` = `"155"` · `"7" * 2` = `"77"` · ต้องแปลง `int(input())` / `float(input())` ก่อนคำนวณ
- `int("15")` = 15 · `int(3.9)` = 3 (ตัดทศนิยม) · `int("3.5")` → `ValueError` ต้องใช้ `float("3.5")` · `str(55)` = `"55"`
- ลิสต์แก้ไขได้ (Mutable) ดัชนีเริ่ม 0 · `ns[-1]` ตัวสุดท้าย · ดัชนีสูงสุด `len(ns) - 1` เกินนั้น `IndexError` · ทูเพิลแก้ไม่ได้
- `append(x)` ต่อท้าย · `insert(i, x)` แทรกที่ดัชนี · `pop()` ลบท้าย+คืนค่า · `pop(i)` ลบตามดัชนี · `remove(x)` ลบตาม **ค่า** ตัวแรก
- `append`/`insert`/`remove` คืน `None` → ห้ามเขียน `ns = ns.append(x)` · `b = a` ไม่ได้สำเนา ต้องใช้ `a.copy()` หรือ `a[:]`
- ค่าเฉลี่ย = `sum(ns) / len(ns)` ใช้ `/` เท่านั้น (`//` เศษหาย) · `for x in ns` ได้ค่า · `for i in range(len(ns))` ได้ดัชนี
- `random.uniform(a, b)` จำนวนจริง · `random.randint(a, b)` จำนวนเต็ม **รวม b** · `seed()` ทำให้สุ่มซ้ำได้เหมือนเดิม
- `np.random.uniform(low, high, size)` กระจายทั่ว · `np.random.normal(loc=μ, scale=σ, size)` กระจุกรอบ μ ไม่มีขอบเขต
- `plt.scatter(xs, ys, color, s)` จุด · `plt.plot` เส้นตามลำดับ · `plt.subplots(1, 2)` ได้ `fig, (ax1, ax2)` แล้วใช้ `ax.set_title/set_xlim`
- `pd.read_csv(...)` ได้ DataFrame · `df["col"]` ได้ Series ส่งเข้า scatter ได้
- `linespace(s, n)` = ช่องว่าง s + `#` n · สามเหลี่ยมชิดขวา `linespace(n - i - 1, i + 1)` ทุกแถวยาว n

## สูตร (Formulas)
| เรื่อง | สูตร | โค้ด |
|---|---|---|
| ค่าเฉลี่ย | $\bar{x} = \frac{1}{n}\sum x_i$ | `sum(ns) / len(ns)` |
| ค่าเฉลี่ย uniform $[a, b]$ | $\frac{a+b}{2}$ | `uniform(-5, 5)` → 0, `uniform(0, 100)` → 50 |
| กฎ 68–95–99.7 | $\mu\pm\sigma$ 68%, $\mu\pm2\sigma$ 95%, $\mu\pm3\sigma$ 99.7% | `normal(loc=50, scale=15)` → 95% ใน 20–80 |
| แถว i ของสามเหลี่ยมชิดขวา | ช่องว่าง $n-i-1$, `#` $i+1$, รวม $n$ | `linespace(n - i - 1, i + 1)` |
| แถว i ของพีระมิด | ช่องว่าง $n-i-1$, `#` $2i+1$ | `linespace(n - i - 1, 2*i + 1)` |
| จำนวน `#` / ช่องว่างใน `triangle(n)` | $\frac{n(n+1)}{2}$ / $\frac{n(n-1)}{2}$ | |

## โค้ดที่ต้องเขียนได้โดยไม่ดู
```python
ns = []
for i in range(5):
    ns.append(int(input(f"n{i+1}: ")))
print(max(ns), min(ns), sum(ns) / len(ns))

total = 0
for x in ns:
    total += x
avg = total / len(ns)

xs = np.random.uniform(low=0, high=100, size=100)
ys = np.random.normal(loc=50, scale=15, size=100)
fig, (ax1, ax2) = plt.subplots(1, 2)
ax1.scatter(xs, ys, color='green', s=50)
ax1.set_title('...'); ax1.set_xlim(0, 100)

def linespace(s, n):
    for i in range(s):
        print(" ", end="")
    for i in range(n):
        print("#", end="")
    print()

def triangle(n):
    for i in range(n):
        linespace(n - i - 1, i + 1)
```

## ตัวเลขที่ออกสอบบ่อย
- ป้อน 15, 5: `n1 + n2` = `155` · `int(n1) + int(n2)` = 20 · ป้อน 7, 3: `a * 2, int(a) * int(b)` = `77 21`
- `[5, 10, 15, 20, 30]`: sum 80, len 5, avg 16.0 · append(40) → insert(1, 7) → pop() คืน 40 → pop(1) คืน 7 → `[5, 10, 15, 20, 30]`
- `[2, 4, 6]` insert(0, 1) → append(8) → pop(2) = 4 → `ns[0] = 9` → `[9, 2, 6, 8]` · `[3, 6, 9]` insert(2, 7), pop(0), append → `[6, 7, 9, 3]`
- `[4, 8, 15, 16, 23, 42]` sum 108 avg 18.0 · `[12, 7, 20, 3, 9]` avg 10.2 max 20 min 3
- `normal(loc=100, scale=10, size=1000)`: ใน 90–110 ≈ 680 ค่า · นอก 80–120 ≈ 50 ค่า
- `triangle(4)` ชิดขวา: `"   #"`, `"  ##"`, `" ###"`, `"####"` · `#` 10 ตัว ช่องว่าง 6 ตัว · `pyramid(3)` แถวล่าง `#####`

## กับดักที่พบบ่อย
1. ลืม `int()` หลัง `input()` → ต่อสายอักขระ `"155"` **ไม่ error แต่ผิด**; `"10" + 20` → `TypeError`
2. `int("2.5")` → `ValueError` ต้องใช้ `float()`
3. `ns = ns.append(x)` → `ns` กลายเป็น `None`
4. สับสน `pop(1)` (ลบดัชนี 1) กับ `remove(1)` (ลบค่า 1)
5. `b = a` แล้ว `b.append()` ทำให้ `a` เปลี่ยนด้วย
6. ลบสมาชิกขณะวนลิสต์เดิม → ลบไม่หมด (`[1, 2, 2, 3]` remove 2 เหลือ `[1, 2, 3]`) ต้องวนบน `xs[:]`
7. `randint(1, 6)` รวม 6 แต่ `range(1, 6)` ไม่รวม 6
8. ใช้ `plt.xlim` / `plt.title` กับแกนย่อยจาก `subplots` → ต้องใช้ `ax.set_xlim` / `ax.set_title`
9. ใช้ `plot` กับข้อมูลสุ่มได้เส้นยุ่ง → ใช้ `scatter`
10. เขียน `linespace(n - i, i + 1)` (ลืม `- 1`) รูปเลื่อนขวาทั้งก้อน

## เชื่อมโยงบทถัดไป
บทที่ 4 ต่อยอดลิสต์เป็น **ลิสต์ซ้อนลิสต์** (ตาราง 2 มิติ) หาค่าเฉลี่ยแต่ละแถว/คอลัมน์ด้วย `[sum(row) / len(row) for row in scores]` จัดรูปแบบตารางด้วย `len(str(item))` และสร้าง **สแตก** จาก `append()`/`pop()` ส่วน `random.uniform(-5, 5)` และลิสต์ของวัตถุ `balls.append(Ball(...))` จะกลายเป็นลูกบอลหลายลูกใน Pygame บทที่ 5
