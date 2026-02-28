# Endow Tech — Agency Website

Production-ready minimalist tech agency website built with **Next.js 16 App Router**, TypeScript, Tailwind CSS, and Framer Motion.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Font:** Inter via `next/font/google`
- **Rendering:** Static generation (SSG)

---

## Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9

### Setup

```bash
# 1. Clone or enter the project directory
cd endowtech_v2

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## npm Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint across all files |
| `npm run typecheck` | Run TypeScript type checking without emitting |

---

## Project Structure

```
endowtech_v2/
├── app/
│   ├── globals.css        # Global styles + Tailwind directives
│   ├── layout.tsx         # Root layout with metadata & font
│   └── page.tsx           # Main homepage (assembles all sections)
├── components/
│   ├── Navbar.tsx         # Sticky header with blur on scroll + mobile menu
│   ├── Hero.tsx           # Hero with animated gradient + CTA
│   ├── Services.tsx       # 4 service cards in responsive grid
│   ├── Portfolio.tsx      # 4 case study cards
│   ├── About.tsx          # Company mission + differentiators
│   ├── Contact.tsx        # Validated contact form + WhatsApp
│   └── Footer.tsx         # Links, socials, copyright
├── public/                # Static assets (favicon, og-image, etc.)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## Deploying to Hostinger Node.js Hosting

Hostinger supports Node.js via its **Node.js hosting** or **VPS** plans.

### Step 1 — Build for production

```bash
npm run build
```

This produces a `.next/standalone` folder (enabled via `output: 'standalone'` in `next.config.js`).

### Step 2 — Prepare the standalone bundle

```bash
# Copy public assets & static files into standalone
xcopy public .next\standalone\public /E /I /Y
xcopy .next\static .next\standalone\.next\static /E /I /Y
```

Or on Linux/Mac:
```bash
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/static
```

### Step 3 — Upload to Hostinger

1. Log into **Hostinger hPanel** → Node.js section
2. Set **Node.js version** to 18 or 20
3. Set **Entry point** to `server.js`
4. Upload the entire `.next/standalone/` folder contents via **File Manager** or **SFTP**
5. Set **Startup file:** `server.js`
6. Set environment variable: `PORT=3000` (or your assigned port)

### Step 4 — Start the app

Hostinger will auto-start using the entry point. Or via SSH:

```bash
node server.js
```

### Step 5 — Custom domain

- Point your domain A-record to Hostinger's server IP
- Enable **SSL** via hPanel → Security → SSL/TLS

### Environment Variables (for future backend integration)

```env
# .env.local (never commit this)
NEXT_PUBLIC_SITE_URL=https://endowtech.dev
CONTACT_EMAIL=hello@endowtech.dev
```

---

## Customisation Checklist

- [ ] Replace `hello@endowtech.dev` in `Contact.tsx` and `Footer.tsx`
- [ ] Update WhatsApp number in `Contact.tsx` (`+1234567890`)
- [ ] Add real portfolio images to `/public/` and update `Portfolio.tsx`
- [ ] Add `/public/og-image.png` (1200×630) for social sharing
- [ ] Add `/public/favicon.ico`
- [ ] Update social links in `Footer.tsx`
- [ ] Update `metadataBase` URL in `layout.tsx` to your actual domain

---

## Lighthouse Performance Targets

| Metric | Target |
|---|---|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

All sections use semantic HTML, proper ARIA labels, and accessible focus indicators.
