# 🌿 Herbal Nusantara - Panduan Deployment

## 📋 Persyaratan

- **Node.js** 18+ atau **Bun** 1.0+
- **Database**: SQLite (sudah termasuk, bisa diganti MySQL/PostgreSQL)
- **Domain** (opsional)

---

## 🚀 Deploy ke Vercel

### Cara 1: Via GitHub (Rekomendasi)
1. Upload project ini ke repository GitHub
2. Buka [vercel.com](https://vercel.com)
3. Klik **"New Project"** → Import dari GitHub
4. Setting environment variable:
   - `DATABASE_URL` = `file:./db/custom.db` (untuk SQLite lokal)
   - *Jika pakai database online (PlanetScale/Neon), ganti connection string*
5. Klik **Deploy**

### Cara 2: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```
Set environment variable di Vercel Dashboard → Settings → Environment Variables.

### ⚠️ Penting untuk Vercel
Vercel adalah **serverless** dan **read-only filesystem**. SQLite tidak akan persist antar deploy. Solusi:

**Opsi A - Pakai database cloud (Rekomendasi):**
1. Buat database gratis di [Neon](https://neon.tech) (PostgreSQL) atau [Turso](https://turso.tech) (SQLite cloud)
2. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   ```
3. Edit `prisma/schema.prisma`:
   ```
   datasource db {
     provider = "postgresql"  # atau "mysql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

**Opsi B - Pakai Turso (SQLite Cloud):**
1. Sign up di [turso.tech](https://turso.tech)
2. Buat database dan copy connection URL
3. Update `DATABASE_URL` di Vercel
4. Run `npx prisma db push` dan `npx prisma db generate` locally
5. Commit `node_modules/.prisma/client` ke repo

---

## 🟢 Deploy ke cPanel

### Persyaratan cPanel:
- cPanel dengan **Node.js** support (cPanel 108+)
- Akses ke **Terminal** di cPanel
- **Setup Node.js App** di cPanel

### Langkah-langkah:

1. **Upload file project** ke cPanel via File Manager atau SSH
   - Upload ke folder `~/herbal-nusantara/` (atau nama yang diinginkan)
   - **JANGAN upload folder `node_modules`** — akan di-install ulang

2. **Setup Node.js App di cPanel:**
   - Buka cPanel → **Software** → **Setup Node.js App**
   - Klik **"Create Application"**
   - Setting:
     - Node.js version: **18.x** atau lebih tinggi
     - Application mode: **Production**
     - Application root: `herbal-nusantara`
     - Application URL: domain Anda
     - Application startup file: `node_modules/.bin/next`
     - Build command: `npx next build`

3. **Install dependencies via SSH Terminal:**
   ```bash
   cd ~/herbal-nusantara
   npm install
   ```

4. **Setup Environment:**
   - Di halaman Setup Node.js App, klik **"Edit"** pada bagian Environment Variables
   - Tambahkan:
     ```
     DATABASE_URL = file:./db/custom.db
     NODE_ENV = production
   ```

5. **Push Prisma Schema:**
   ```bash
   cd ~/herbal-nusantara
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

6. **Restart Application:**
   - Klik **"Restart"** di Setup Node.js App

### ⚠️ Jika cPanel Tidak Support Node.js

Gunakan **Docker** atau pindah ke hosting yang support Node.js seperti:
- [Railway.app](https://railway.app) - Gratis untuk starter
- [Render.com](https://render.com) - Gratis tier tersedia
- [Fly.io](https://fly.io) - Gratis tier tersedia
- [Koyeb.com](https://koyeb.com) - Gratis tier tersedia

---

## 🐳 Deploy dengan Docker (Opsional)

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/db ./db

EXPOSE 3000
CMD ["node", "server.js"]
```

Build & Run:
```bash
docker build -t herbal-nusantara .
docker run -p 3000:3000 herbal-nusantara
```

---

## 🔧 Konfigurasi WhatsApp

Untuk mengubah nomor WhatsApp, edit file:
- `src/components/layout/WhatsAppButton.tsx`
- `src/components/pages/ProductDetailPage.tsx`
- `src/components/pages/ContactPage.tsx`
- `src/components/pages/Footer.tsx`

Ganti `6281234567890` dengan nomor WhatsApp Anda (format: 62xx).

---

## 📱 Seed Data

Database sudah termasuk data awal:
- 6 Kategori Produk
- 8 Keluhan/Kondisi Kesehatan
- 12 Produk Herbal (dengan gambar)
- 8 Testimoni Pelanggan
- 6 Artikel Edukasi (dengan gambar)

Untuk re-seed:
```bash
npx prisma db seed
```

---

## 📂 Struktur Project

```
herbal-nusantara/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Data awal
├── public/
│   ├── products/            # Gambar produk
│   ├── articles/            # Gambar artikel
│   ├── logo.png             # Logo
│   └── favicon-32.png       # Favicon
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Main page (SPA router)
│   │   ├── globals.css
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── layout/          # Header, Footer, WhatsApp, CartDrawer
│   │   ├── pages/           # 14 page components
│   │   └── ui/              # shadcn/ui components
│   ├── store/
│   │   └── useStore.ts      # Zustand state management
│   └── lib/
│       ├── db.ts            # Prisma client
│       ├── format.ts        # Rupiah formatter
│       └── utils.ts         # Utility functions
├── package.json
└── tailwind.config.ts
```

---

## 💡 Tips

1. **Backup database** secara berkala: `cp db/custom.db backup-$(date +%Y%m%d).db`
2. **Update produk** langsung via database atau buat admin panel
3. **Ganti gambar** di folder `public/products/` dan `public/articles/`
4. **SEO**: Set `metadata` di `layout.tsx` sesuai kebutuhan
