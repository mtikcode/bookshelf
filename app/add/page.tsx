import Link from "next/link";

export default function AddBookPage() {
  // Server Action TẠM (stub) — hiện chỉ in ra console, chưa lưu gì.
  async function action(formData: FormData) {
    "use server";
    const title = formData.get("title");
    const author = formData.get("author");
    const year = formData.get("year");
    // todo: lưu book
    console.log("New book:", { title, author, year });
  }

  return (
    <div className="rise mx-auto max-w-md">
      <Link
        href="/"
        className="mb-6 inline-block text-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        ← Về tủ sách
      </Link>

      <h1 className="mb-1 font-serif text-3xl font-black">Thêm sách mới</h1>
      <p
        className="mb-8 text-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        Tên sách phải là duy nhất — Redis sẽ chặn nếu trùng.
      </p>

      <form
        action={action}
        className="space-y-4"
      >
        <Field
          name="title"
          label="Tên sách"
          placeholder="Clean Code"
        />
        <Field
          name="author"
          label="Tác giả"
          placeholder="Robert C. Martin"
        />
        <Field
          name="year"
          label="Năm xuất bản"
          placeholder="2008"
          type="number"
        />
        <button
          type="submit"
          className="w-full rounded-full py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Thêm vào tủ sách
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--ink-soft)" }}
      >
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border bg-white/50 px-4 py-2.5 text-sm outline-none transition-colors focus:bg-white"
        style={{ borderColor: "var(--line)" }}
      />
    </label>
  );
}
