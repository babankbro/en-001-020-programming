import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="text-6xl font-bold text-accent">404</div>
      <p className="mt-3 text-muted">ไม่พบหน้าที่ต้องการ</p>
      <Link href="/" className="inline-block mt-6 px-4 py-2 rounded-xl bg-accent text-white">
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
