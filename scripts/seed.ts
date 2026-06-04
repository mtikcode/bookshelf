/**
 * Seed 100 cuốn sách vào Redis để benchmark Pipeline (Bài tập cuối khóa).
 * Chạy:  npm run seed
 *
 * Cần biến môi trường REDIS_URL. Load từ .env thủ công vì script này
 * chạy ngoài Next.js.
 */
import { readFileSync } from "fs";
import { join } from "path";
import Redis from "ioredis";
import { randomUUID } from "crypto";

// Load .env đơn giản (không phụ thuộc dotenv)
try {
  const env = readFileSync(join(process.cwd(), ".env"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* ignore - dùng env có sẵn */
}

const redis = new Redis(process.env.REDIS_URL!);

const authors = [
  "Robert C. Martin",
  "Martin Fowler",
  "Kent Beck",
  "Eric Evans",
  "Andrew Hunt",
  "Donald Knuth",
  "Brian Kernighan",
  "Joshua Bloch",
];

async function main() {
  console.log("Seeding 100 books...");
  const pipeline = redis.pipeline();

  for (let i = 1; i <= 100; i++) {
    const title = `Sample Book #${i}`;
    const author = authors[i % authors.length];
    const year = String(2000 + (i % 25));
    const score = Date.now() + i; // mỗi cuốn 1 timestamp khác nhau

    pipeline.zadd("books", "NX", score, title);
    pipeline.hset(`book:${title}`, {
      id: randomUUID(),
      title,
      author,
      year,
      views: "0",
    });
  }

  await pipeline.exec();
  const total = await redis.zcard("books");
  console.log(`Done. Sorted Set "books" hiện có ${total} member.`);
  await redis.quit();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
