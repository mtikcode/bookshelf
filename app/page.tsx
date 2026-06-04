import redis from "@/lib/redis";
import Link from "next/link";

type Book = {
  id?: string;
  title: string;
  author: string;
  year: string;
  views: string;
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // lấy 20 title mới nhất từ Sorted Set
  const titles = await redis.zrange("books", 0, 19, "REV");

  // gom tất cả hgetall vào 1 PIPELINE -> chỉ 1 round trip thay vì N round trip.
  console.time("load-books");
  const pipeline = redis.pipeline();
  titles.forEach((title) => {
    pipeline.hgetall(`book:${title}`);
  });
  const results = await pipeline.exec();
  console.timeEnd("load-books");

  // exec() trả về mảng [error, result] pairs -> extract phần data ra.
  const books =
    results
      ?.map(([err, data]) => (err ? null : (data as Book)))
      .filter((b): b is Book => Boolean(b && b.title)) ?? [];

  return (
    <div>
      <div className="rise mb-10">
        <p
          className="mb-2 text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--accent)" }}
        >
          Tủ sách của bạn
        </p>
        <h1 className="font-serif text-4xl font-black leading-tight">
          {books.length > 0 ? `${books.length} cuốn trên kệ` : "Kệ sách đang trống"}
        </h1>
      </div>

      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="space-y-3">
          {books.map((book, i) => (
            <li
              key={book.title}
              className="rise"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Link
                href={`/book/${encodeURIComponent(book.title)}`}
                className="group flex items-center justify-between gap-4 rounded-xl border bg-white/40 px-5 py-4 transition-all hover:bg-white/70 hover:shadow-sm"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="min-w-0">
                  <h2 className="font-serif text-xl font-semibold leading-snug">
                    {book.title}
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {book.author} · {book.year}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--paper-2)",
                    color: "var(--ink-soft)",
                  }}
                >
                  {book.views} lượt xem
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="rise rounded-2xl border border-dashed px-8 py-16 text-center"
      style={{ borderColor: "var(--line)" }}
    >
      <p
        className="mb-4 text-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        Chưa có cuốn sách nào. Thêm cuốn đầu tiên để bắt đầu.
      </p>
      <Link
        href="/add"
        className="inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        + Thêm sách đầu tiên
      </Link>
    </div>
  );
}
