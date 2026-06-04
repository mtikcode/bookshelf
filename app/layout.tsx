import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookshelf · Redis Mini Course",
  description: "App quản lý sách dựng bằng Next.js + Redis (ioredis)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Spline+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <header
          className="border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="group flex items-baseline gap-2"
            >
              <span
                className="font-serif text-2xl font-black tracking-tight"
                style={{ color: "var(--ink)" }}
              >
                Bookshelf
              </span>
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                redis
              </span>
            </Link>
            <Link
              href="/add"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--accent)" }}
            >
              + Thêm sách
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
        <footer
          className="mx-auto max-w-3xl px-6 py-10 text-center text-xs"
          style={{ color: "var(--ink-soft)" }}
        >
          Bookshelf · project thực hành của Redis Mini Course · Mtikcode
        </footer>
      </body>
    </html>
  );
}
