import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // เนื้อหาทั้งหมดอ่านจากไฟล์ markdown ตอน build จึง render แบบ static ทั้งเว็บ
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
