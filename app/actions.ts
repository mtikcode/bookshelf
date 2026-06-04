"use server";

import redis from "@/lib/redis";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function createBook(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const year = (formData.get("year") as string)?.trim();

  if (!title || !author || !year) {
    throw new Error("Vui lòng điền đầy đủ tên sách, tác giả và năm");
  }

  // thử thêm title vào Sorted Set với flag NX.
  const added = await redis.zadd("books", "NX", Date.now(), title);

  // added = 0 nghĩa là title đã tồn tại -> chặn trùng.
  if (added === 0) {
    throw new Error(`Sách "${title}" đã tồn tại`);
  }

  // lưu chi tiết vào Hash.
  const id = randomUUID();
  await redis.hset(`book:${title}`, {
    id,
    title,
    author,
    year,
    views: "0",
  });

  revalidatePath("/");
}

export async function incrementViews(title: string) {
  await redis.hincrby(`book:${title}`, "views", 1);
}
