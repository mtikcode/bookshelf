import Link from "next/link";

type Book = {
  title: string;
  author: string;
  year: string;
  views: string;
};

// dữ liệu mẫu
const placeholderBooks: Book[] = [
  { title: "Clean Code", author: "Robert C. Martin", year: "2008", views: "0" },
  { title: "Refactoring", author: "Martin Fowler", year: "1999", views: "0" },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    year: "1999",
    views: "0",
  },
];

export default function HomePage() {
  const books = placeholderBooks;

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
