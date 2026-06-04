import redis from "@/lib/redis";
import { incrementViews } from "@/app/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title: rawTitle } = await params;
  const title = decodeURIComponent(rawTitle);

  // Mỗi lần xem chi tiết -> tăng views bằng HINCRBY (atomic counter).
  await incrementViews(title);

  const book = await redis.hgetall(`book:${title}`);
  if (!book || !book.title) notFound();

  return (
    <div className="rise mx-auto max-w-lg">
      <Link
        href="/"
        className="mb-8 inline-block text-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        ← Về tủ sách
      </Link>

      <p
        className="mb-2 text-xs uppercase tracking-[0.25em]"
        style={{ color: "var(--accent)" }}
      >
        {book.year}
      </p>
      <h1 className="mb-2 font-serif text-4xl font-black leading-tight">
        {book.title}
      </h1>
      <p
        className="mb-8 text-lg"
        style={{ color: "var(--ink-soft)" }}
      >
        {book.author}
      </p>

      <div
        className="flex items-center gap-6 rounded-xl border bg-white/40 px-6 py-4"
        style={{ borderColor: "var(--line)" }}
      >
        <Stat
          label="Lượt xem"
          value={book.views}
        />
        <div
          className="h-8 w-px"
          style={{ backgroundColor: "var(--line)" }}
        />
        <Stat
          label="ID"
          value={(book.id ?? "—").slice(0, 8)}
          mono
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-wider"
        style={{ color: "var(--ink-soft)" }}
      >
        {label}
      </p>
      <p className={`text-xl font-semibold ${mono ? "font-mono text-base" : ""}`}>
        {value}
      </p>
    </div>
  );
}
