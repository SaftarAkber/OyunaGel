# OyunaGəl

MVP layihəsi — Next.js (App Router) + Tailwind CSS + Prisma.

## Struktur

```
app/
  page.tsx              → Login/qeydiyyat səhifəsi (Figma dizaynına uyğun)
  layout.tsx
  globals.css
  components/
    Header.tsx           → Üst naviqasiya (loqo, "Açıq oyunlar", "Oyun yarat")
    GoogleIcon.tsx        → Google düyməsi ikonu
public/
  bg.png                 → Fon şəkli
prisma/
  schema.prisma          → User / Account / Session modelləri (Google OAuth üçün hazır)
```

## Quraşdırma

```bash
npm install
cp .env.example .env   # DATABASE_URL və Google OAuth açarlarını doldurun
npx prisma migrate dev --name init
npm run dev
```

Sonra http://localhost:3000 açın.

## Quraşdırma (lokal)

### 1. Baza (Postgres) hazırla
Lokal Postgres qura bilərsən, amma ən sürətlisi pulsuz hosted baza almaqdır (Vercel-ə keçəndə də eyni bazanı istifadə edə bilərsən):
- [Neon](https://neon.tech) və ya [Supabase](https://supabase.com) — pulsuz plan var, saniyələr içində `DATABASE_URL` verir.

### 2. Google OAuth açarları al
1. [Google Cloud Console](https://console.cloud.google.com/) → yeni layihə yarat (və ya mövcud olanı seç).
2. **APIs & Services → OAuth consent screen** → "External" seç, tələb olunan sahələri doldur.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID** → Application type: **Web application**.
4. **Authorized redirect URIs**-ə bunu əlavə et:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. Yaranan **Client ID** və **Client Secret**-i kopyala.

### 3. `.env` faylını doldur
```bash
cp .env.example .env
```
```
DATABASE_URL="Neon/Supabase-dən aldığın connection string"
GOOGLE_CLIENT_ID="Google-dan aldığın client id"
GOOGLE_CLIENT_SECRET="Google-dan aldığın client secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="terminalda 'openssl rand -base64 32' yazıb çıxan nəticəni bura qoy"
```

### 4. Bazaya cədvəlləri yarat və serveri başlat
```bash
npm install
npx prisma migrate dev --name init
npm run dev
```
`http://localhost:3000/login` aç → "Google ilə davam et" düyməsi indi **real Google hesabı ilə daxil olur** və
uğurlu olduqda avtomatik `/` (home) səhifəsinə yönləndirir. Header-də artıq "Daxil ol" əvəzinə hesabının
adı/şəkli və "Çıxış" düyməsi görünəcək.

⚠️ `npx prisma migrate dev` işlədəndə yaranan **`prisma/migrations` qovluğunu mütləq commit et** — Vercel
build zamanı bu miqrasiyaları bazaya tətbiq edəcək (aşağıya bax).

## Vercel-də yayımlamaq

1. Layihəni GitHub-a push et, sonra [vercel.com](https://vercel.com) → "New Project" → repo-nu seç.
2. **Environment Variables** bölməsində eyni dəyişənləri əlavə et:
   - `DATABASE_URL` — production baza (Neon/Supabase-də ayrı, production üçün baza yaratmaq tövsiyə olunur)
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_URL` = `https://SƏNIN-DOMAININ.vercel.app`
   - `NEXTAUTH_SECRET` = yenə `openssl rand -base64 32` ilə yaradılmış, fərqli bir dəyər (production üçün ayrıca)
3. Google Cloud Console-a qayıt → **Authorized redirect URIs**-ə production URL-i də əlavə et:
   ```
   https://SƏNIN-DOMAININ.vercel.app/api/auth/callback/google
   ```
4. Deploy et. `package.json`-dakı `build` skripti (`prisma generate && prisma migrate deploy && next build`)
   avtomatik olaraq bazaya miqrasiyaları tətbiq edəcək — əlavə heç nə etməyə ehtiyac yoxdur.
5. Bundan sonra **hər kəs** öz Google hesabı ilə "Google ilə davam et" düyməsinə klikləyib qeydiyyatdan
   keçə/daxil ola bilər — hər yeni istifadəçi avtomatik `User` cədvəlinə yazılır (Prisma adapter bunu özü edir,
   əlavə kod yazmağa ehtiyac yoxdur).

## Qeydlər

- "Google ilə davam et" artıq işləkdir — `next-auth` (Google provider) + Prisma adapter ilə qoşulub.
  Uğurlu login-dən sonra istifadəçi `/` (home) səhifəsinə yönləndirilir.
- `prisma/schema.prisma` NextAuth-un Prisma adapterinə tam uyğundur (`User`, `Account`, `Session`,
  `VerificationToken`) — Google-dan başqa provayder (email, GitHub və s.) əlavə etmək istəsən də hazırdır.
- Fon şəkli `public/bg.png` faylındadır və `app/login/page.tsx` içində CSS `background-image` kimi çağırılır.

## Səhifələr

- `app/login/page.tsx` → Google ilə giriş səhifəsi (`/login`)
- `app/page.tsx` → Ana səhifə (`/`) — hero, idman kateqoriyaları, açıq oyunlar grid-i, footer

## Backend API gələndə — hara nə yazacaqsan

Hazırda bütün data `lib/mock-data.ts` faylından gəlir. Backend API hazır olanda **yalnız 3 yer** dəyişir,
komponentlərin özünə toxunmağa ehtiyac yoxdur:

### 1. `lib/types.ts`
Bu fayldakı `SportCategory`, `FeaturedGame`, `OpenGame` tipləri backend-in JSON cavabı ilə **eyni sahə
adlarına** uyğun olmalıdır. Backend-çi API cavabını göndərəndə, sahə adları fərqlidirsə (məs. backend
`current_players` qaytarır, bizdə `currentPlayers`), ya bu fayldakı adları backend-ə uyğunlaşdır, ya da
fetch etdiyin yerdə map elə (aşağıya bax).

### 2. `lib/mock-data.ts` → silinir, əvəzinə real fetch
`app/page.tsx` hazırda server component olduğu üçün, backend hazır olanda `app/page.tsx`-in başındakı

```ts
import { featuredGames, openGames, sportCategories } from "@/lib/mock-data";
```

sətrini silib, elə `app/page.tsx` içində (async function edərək) belə yazacaqsan:

```ts
async function getHomeData() {
  const res = await fetch("https://SIZIN-API-DOMAININIZ/api/home", {
    // backend token/cookie lazımdırsa buraya headers əlavə et
    cache: "no-store", // real-time data üçün; statik data üçün "force-cache" da ola bilər
  });
  if (!res.ok) throw new Error("Home data fetch failed");
  return res.json() as Promise<{
    sportCategories: SportCategory[];
    featuredGames: FeaturedGame[];
    openGames: OpenGame[];
  }>;
}

export default async function HomePage() {
  const { sportCategories, featuredGames, openGames } = await getHomeData();
  // qalan hissə eyni qalır — <Hero games={featuredGames} /> və s.
}
```

Ayrı endpoint-lər varsa (məs. `/api/sports`, `/api/games/featured`, `/api/games/open`), sadəcə
`Promise.all` ilə paralel çağır:

```ts
const [sportCategories, featuredGames, openGames] = await Promise.all([
  fetch(`${API_URL}/sports`).then((r) => r.json()),
  fetch(`${API_URL}/games/featured`).then((r) => r.json()),
  fetch(`${API_URL}/games/open`).then((r) => r.json()),
]);
```

### 3. `.env` → `NEXT_PUBLIC_API_URL` (yeni)
API domain-ini `.env` faylına əlavə et ki, hardcode etməyəsən:

```
NEXT_PUBLIC_API_URL="https://api.oyunagel.com"
```

və fetch-lərdə `process.env.NEXT_PUBLIC_API_URL` istifadə et.

### İnteraktiv hissələr (Qoşul düyməsi, "Daha çox", kateqoriya seçimi)
- **"Qoşul" düyməsi** (`Hero.tsx` və `GameCard.tsx` içində) — hazırda heç nə etmir. Backend
  `POST /api/games/:id/join` kimi bir endpoint versə, həmin komponentlərdə `onClick` handler yazıb
  fetch çağırışı əlavə edəcəyik (bu komponentlər `"use client"` olmalıdır, `GameCard.tsx` hazırda server
  component-dir — join funksionallığı əlavə ediləndə onu da client-ə çevirmək lazım olacaq).
- **"Daha çox" düyməsi** (`OpenGamesSection.tsx`) — pagination/infinite-scroll üçün backend `?page=` və ya
  `?cursor=` parametri versə, bu düyməni client component edib state saxlamaq lazımdır.
- **Kateqoriya tabları** (`SportCategoryTabs.tsx`) — seçiləndə grid-i filtərləmək üçün backend-ə
  `?sport=futbol` kimi query parametri göndərmək olar; `onSelect` prop-u artıq hazırdır, sadəcə
  `app/page.tsx`-də ona bir fetch/filter funksiyası bağlamaq qalır.

Qısası: backend API-ni alan kimi mənə göstər, mən mock-data-nı real fetch-lərlə əvəz edib
tam qoşuluşu edərəm.
