import type { Metadata } from "next";
import { Sarabun, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { COURSE } from "@/content/types";
import { getAllModuleMeta, buildSearchIndex } from "@/lib/content";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${COURSE.title} — ${COURSE.titleEn} | ${COURSE.code}`,
    template: `%s | ${COURSE.code}`,
  },
  description: COURSE.description,
};

// ตั้งธีมก่อน hydrate เพื่อไม่ให้กะพริบ
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const modules = getAllModuleMeta();
  const index = buildSearchIndex();
  return (
    <html lang="th" className={`${sarabun.variable} ${mono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header index={index} modules={modules} />
        <div className="flex flex-1 max-w-[1400px] w-full mx-auto">
          <Sidebar modules={modules} />
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">{children}</main>
        </div>
        <footer className="border-t border-line text-center text-sm text-muted py-6 px-4">
          {COURSE.code} {COURSE.title} · {COURSE.instructor} · {COURSE.department}
        </footer>
      </body>
    </html>
  );
}
