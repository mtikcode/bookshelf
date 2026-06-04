import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rise py-16 text-center">
      <h1 className="mb-2 font-serif text-3xl font-black">
        Không tìm thấy sách
      </h1>
      <p className="mb-6 text-sm" style={{ color: 'var(--ink-soft)' }}>
        Cuốn sách này không có trên kệ.
      </p>
      <Link
        href="/"
        className="inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        ← Về tủ sách
      </Link>
    </div>
  );
}
