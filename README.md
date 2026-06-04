# Bookshelf — Redis Mini Course (Phần III)

App quản lý sách dựng bằng **Next.js (App Router) + Redis (ioredis)**. Đây là project
thực hành xuyên suốt Phần III của khóa học.

## Cách lấy REDIS_URL từ Redis Cloud

`REDIS_URL` là **connection URI** của database, có dạng `redis://default:<password>@<host>:<port>`.

1. Sau khi login vào Redis Cloud database, ở trang **General**, bấm vào **Connect using Redis CLI, client, or insight**.

2. Mở tab **Redis CLI**. Bạn sẽ thấy một lệnh dạng:

   \`\`\`
   redis-cli -u redis://default:iCbC3AEsPSp1epaR2zNVTN2ur@shop-snail-letters-32968.db.redis.io:10169
   \`\`\`

3. Phần **phía sau `redis-cli -u`** chính là `REDIS_URL`. Copy nó vào `.env` là xong.

## Chạy thử

```bash
# 1. Cài dependencies
pnpm i

# 2. Tạo file .env.local từ mẫu, rồi dán REDIS_URL từ Redis Cloud
cp .env.local.example .env.local

# 3. (Tùy chọn) Seed 100 sách để test Pipeline
pnpm seed

# 4. Chạy dev server
pnpm dev
```
