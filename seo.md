# SEO Rules: Next.js Company Portfolio Website

> These rules apply to ALL work in this repository. Whenever you create or modify a page, route, layout, component, content, image, or config, follow every rule below. If a user instruction conflicts with a rule, ask before deviating. Finish every task with the "SEO Impact Note" described in Section 16.

**Stack assumptions:** Next.js (App Router, `app/` directory), TypeScript preferred, deployed on Vercel or similar. If the project actually uses the Pages Router, adapt using `next/head` and `getStaticProps`, but keep every principle the same.

**Site type:** Company portfolio (home, about, services, projects/case studies, team, blog (optional), contact).

---

## 1. Golden Rules

1. Every public page must be crawlable, indexable, fast, accessible, and have unique metadata.
2. Use **Server Components by default**. Add `'use client'` only for real interactivity (forms, menus, sliders), and keep client components small and at the leaves of the tree. Never put primary page content, headings, or metadata in a client-only component.
3. All SEO metadata must come from the Next.js **Metadata API**, not from `document.title` or client-side effects.
4. Never change or remove an existing URL without adding a 301 redirect.
5. Never ship `noindex` or `Disallow: /` to production.
6. Write for users first. No keyword stuffing, hidden text, or cloaking.

---

## 2. Single Source of Truth for Site Config

Create `src/lib/site.ts` (or `lib/site.ts`) and import from it everywhere. Never hard-code the domain, company name, or social links in multiple files.

```ts
// lib/site.ts
export const siteConfig = {
  name: "Company Name",
  shortName: "Company",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com", // no trailing slash
  description: "One clear sentence (120–160 chars) describing what the company does and for whom.",
  locale: "en_US",
  ogImage: "/og/default.jpg", // 1200x630
  twitterHandle: "@company",
  email: "hello@example.com",
  phone: "+8801XXXXXXXXX",
  address: {
    street: "", city: "Dhaka", region: "Dhaka", postalCode: "", country: "BD",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/...",
    facebook: "https://www.facebook.com/...",
    github: "https://github.com/...",
  },
};
```

- Environment variable `NEXT_PUBLIC_SITE_URL` must be set in production and must be the final canonical domain (HTTPS, with or without `www`, but consistent).
- Pick ONE host (`www` or non-`www`) and 301-redirect the other (configure in hosting or `next.config`).

---

## 3. Root Layout Metadata (`app/layout.tsx`)

Set global defaults once. Pages then override only what differs.

```tsx
import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Short Value Proposition`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production",
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};
```

- `<html lang="en">` is mandatory (use `bn` for Bangla pages).
- Staging/preview deployments must be `noindex` (handle via environment check, as above, and also verify `X-Robots-Tag` on previews).

---

## 4. Per-Page Metadata

Every `page.tsx` must export `metadata` (static pages) or `generateMetadata` (dynamic pages). **A page without its own title, description, and canonical is incomplete.**

```tsx
// app/services/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web & Mobile App Development Services",   // template adds "| Company Name"
  description: "We design and build fast, scalable websites and mobile apps for growing businesses. See our services and get a free consultation.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Web & Mobile App Development Services",
    description: "…same or similar…",
    url: "/services",
    images: [{ url: "/og/services.jpg", width: 1200, height: 630 }],
  },
};
```

Dynamic pages (projects, blog posts, services detail):

```tsx
// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };

  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/projects/${slug}`,
      images: [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }],
    },
  };
}
```

### Metadata rules
| Item | Rule |
|---|---|
| Title | Unique per page, **50–60 chars** (before template suffix keep ≤ ~45–50), primary keyword first, natural wording |
| Description | Unique per page, **120–160 chars**, includes keyword + soft call to action |
| Canonical | Self-referencing, via `alternates.canonical`, relative values resolve through `metadataBase` |
| OG image | 1200×630, unique for key pages, under ~300 KB, descriptive `alt` |
| Not-found / error | Must not be indexable; real 404 status |

Do NOT use `keywords` meta (ignored by Google). Do NOT duplicate the same title/description across pages.

---

## 5. Page Content & Heading Structure

- **Exactly one `<h1>` per page**, matching the page topic. Never put the logo in an `<h1>` on inner pages.
- Heading order: `h1 → h2 → h3`. Never skip levels for styling; use CSS/Tailwind classes for size.
- Use semantic landmarks: `<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<section>`, `<article>`, `<aside>`, `<footer>`. One `<main>` per page (usually in layout).
- Provide a "Skip to content" link.
- Home page must clearly state: who the company is, what it offers, for whom, and where (location), in real text (not inside images or sliders).
- Each service gets its **own page** (`/services/web-development`) with at least ~300–600 words of unique, useful content, not just one long "Services" page.
- Each project/case study gets its own page: client/industry, problem, solution, tech used, results (with numbers), screenshots with alt text.
- Avoid thin/boilerplate pages and duplicated text across service pages.
- Do not hide important text behind tabs/accordions that only load via JS fetch. Content in accordions must be present in the HTML.

---

## 6. Links & Navigation

- Use `next/link` (`<Link href="/services">`). Never navigate between indexable pages via `router.push`, `onClick`, or `<div>`/`<button>`.
- Anchor text must be descriptive ("View our web development services"), never "click here" / "read more" alone (if a "Read more" button is needed, add `aria-label` with the full context).
- Every page reachable within 3 clicks from the home page; no orphan pages. Link related services ↔ projects ↔ blog posts contextually.
- Add **breadcrumbs** on deep pages (`Home › Projects › Project Name`) with `BreadcrumbList` JSON-LD.
- External links: `target="_blank"` must have `rel="noopener noreferrer"`. Use `rel="nofollow"`/`"sponsored"`/`"ugc"` where appropriate.
- Footer must link to key pages (Services, Projects, About, Contact, Privacy Policy, Terms).
- Do not link to redirected URLs or 404s internally; link to the final URL.

---

## 7. Images (next/image)

- Always use `next/image` (`import Image from "next/image"`).
- Every image has meaningful `alt` text (describe it naturally; `alt=""` only for purely decorative images). No keyword stuffing.
- Always provide `width` and `height` (or `fill` with a sized parent + `sizes`) to prevent layout shift.
- **Hero / above-the-fold LCP image:** use `priority` (and don't lazy-load it). All other images lazy-load by default, so don't override that.
- Provide a correct `sizes` prop for responsive images, for example `sizes="(max-width: 768px) 100vw, 50vw"`.
- Use WebP/AVIF (Next handles conversion; keep `images.formats` default or `['image/avif','image/webp']`). Source files should be compressed already (avoid >500 KB originals).
- Descriptive file names: `ecommerce-dashboard-case-study.jpg`, not `IMG_001.jpg`.
- Configure `images.remotePatterns` in `next.config.ts` for external image hosts; never use unoptimized huge remote images.
- Text must be real HTML text, never baked into images (logos excepted).

---

## 8. Fonts, CSS & Scripts

- Use `next/font` (Google or local) for fonts; self-hosted, `display: "swap"`, limit to 1–2 families and only needed weights/subsets. For Bangla content, include the `bengali` subset.
- Avoid render-blocking third-party CSS/JS. Use `next/script` with `strategy="afterInteractive"` or `"lazyOnload"` for analytics, chat widgets, pixels, etc.
- Dynamically import heavy, non-critical client components: `const Map = dynamic(() => import("./Map"), { ssr: false })`. Only use `ssr: false` for components whose content does not need indexing.
- Avoid large animation/UI libraries for simple effects. Check bundle impact before adding any dependency; prefer CSS animations.
- Do not run animations that hide content on load (e.g., opacity:0 until JS runs) for critical content: content must be visible in initial HTML.

---

## 9. Structured Data (JSON-LD)

Create a reusable, safe component:

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" to prevent script injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

Required schemas and where to place them:

| Page | Schema |
|---|---|
| Home (layout or page) | `Organization` (or `ProfessionalService` / `LocalBusiness` if serving a local area) + `WebSite` |
| Contact | `ContactPoint` inside Organization, plus `LocalBusiness` with address, phone, opening hours |
| Services (each) | `Service` (name, description, provider, areaServed) |
| Projects / case studies | `Article` or `CreativeWork` (headline, image, datePublished, author/publisher) |
| Blog posts | `BlogPosting` (headline, image, datePublished, dateModified, author, publisher) |
| About / Team | `Person` entries (name, jobTitle, image, sameAs) where displayed |
| All inner pages | `BreadcrumbList` |
| FAQ sections (only if real FAQs visible) | `FAQPage` |

Organization example (home):

```tsx
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
  sameAs: Object.values(siteConfig.social),
}} />
```

Rules: only mark up content visible on the page; never invent ratings or reviews; keep `dateModified` accurate; validate with Google Rich Results Test.

---

## 10. Sitemap & Robots (use Next.js file conventions)

### `app/sitemap.ts`
```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/services", "/projects", "/blog", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(), // prefer a real last-modified date when available
  }));

  const projects = await getAllProjects(); // from CMS/MDX/db
  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  // add services, blog posts, etc.
  return [...staticRoutes, ...projectRoutes];
}
```

### `app/robots.ts`
```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
  return isProd
    ? {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/_next/static/../private/"] }],
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
      }
    : { rules: [{ userAgent: "*", disallow: "/" }] }; // block previews/staging
}
```

Rules:
- **Every new public route must be added to the sitemap** (dynamic routes must be generated from data automatically).
- Sitemap contains only canonical, indexable, 200-status URLs. Never include `noindex` pages, redirects, or 404s.
- Don't block `/_next/static/` (CSS/JS) in robots.
- Use `noindex` (via metadata `robots`) for pages that shouldn't appear in search (thank-you, login, admin, internal search).

---

## 11. Dynamic Routes, Rendering & Status Codes

- Prefer static generation: use `generateStaticParams` for `[slug]` routes so pages are pre-rendered at build time. Use `revalidate` (ISR) for content that changes.
- If content is missing, call `notFound()` so Next returns a **real 404**, with a helpful `app/not-found.tsx` (links to home, services, contact). Never render a "not found" message with a 200 status.
- Use `app/error.tsx` for errors, but don't let error pages be indexed.
- Redirects belong in `next.config.ts` using `permanent: true` (308/301) or middleware. Never use client-side `router.replace` for SEO redirects.

```ts
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      { source: "/old-services", destination: "/services", permanent: true },
      // non-www → www (or vice versa) if not handled by hosting
    ];
  },
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  compress: true,
};
export default nextConfig;
```

- No redirect chains (A→B→C). Point directly to the final URL.
- Trailing slash policy must be consistent (`trailingSlash` setting in config), and canonical URLs must follow it.

---

## 12. Core Web Vitals Targets (mobile, 75th percentile)

| Metric | Target |
|---|---|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| TTFB | ≤ 0.8 s |

Checklist:
- Hero image uses `priority`; hero text is server-rendered.
- Reserve space for all images/embeds/banners (no layout jumps).
- Keep client JS small: avoid unnecessary `'use client'`, avoid huge libraries (moment, lodash full, etc.), tree-shake imports.
- Lazy-load below-the-fold heavy sections (maps, video embeds, carousels, 3D/WebGL).
- Embeds (YouTube, Google Maps): use `loading="lazy"` iframes or a click-to-load facade.
- Use caching and CDN (Vercel handles this); set long cache headers for static assets.
- Run Lighthouse (mobile) before finishing significant UI changes. Targets: **Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100**.

---

## 13. Accessibility & Mobile (affects SEO)

- Mobile-first responsive layout; no horizontal scroll; tap targets ≥ 44×44 px; base font ≥ 16px.
- Sufficient color contrast (WCAG AA), visible focus outlines, keyboard-navigable menus.
- Form inputs have `<label>`; icon-only buttons have `aria-label`.
- Use native elements (`<button>`, `<a>`, `<nav>`) before ARIA.
- Don't use full-screen pop-ups/interstitials on mobile immediately after landing.

---

## 14. Contact, Trust & Local SEO

- Contact page: real address, phone, email, map link, and business hours as visible text (consistent NAP: Name, Address, Phone, identical everywhere on the site and profiles).
- Include About, Team, Privacy Policy, and Terms pages. Show real team members, client logos (with permission), testimonials (real, visible), and case-study results (E-E-A-T).
- Add social profile links (`sameAs` in schema).
- Contact forms: server-side validation, spam protection (honeypot/Turnstile), no indexable "thank you" page (`noindex`).
- If targeting local searches (e.g., "software company in Dhaka"), mention the city naturally in titles/H1/body of relevant pages and in schema `areaServed`.

---

## 15. Multilingual (only if Bangla/English versions are added)

- Use route segments: `/en/...` and `/bn/...` (Next.js i18n routing with `[lang]` segment).
- Each language version has its own translated title, description, headings, alt text, and schema.
- Add `alternates.languages` in metadata for hreflang, including `x-default`:

```ts
alternates: {
  canonical: `/${lang}/services`,
  languages: { en: "/en/services", bn: "/bn/services", "x-default": "/en/services" },
}
```

- Set `<html lang={lang}>`. Don't auto-redirect crawlers by IP/language; offer a visible language switcher using real links.

---

## 16. Definition of Done & Required Output

### A page is done only when:
1. ✅ Unique `title` + `description` via Metadata API
2. ✅ Canonical set (`alternates.canonical`) and correct
3. ✅ OG/Twitter image defined (1200×630)
4. ✅ Exactly one `<h1>`, logical headings, semantic landmarks
5. ✅ Server-rendered main content (no client-only primary content)
6. ✅ `next/image` used with `alt`, dimensions, `priority` only on LCP image
7. ✅ Appropriate JSON-LD added (+ breadcrumbs)
8. ✅ Added to `sitemap.ts` (or generated automatically)
9. ✅ Linked from at least one other page via `next/link` with descriptive anchor text
10. ✅ Real 404 for missing data; redirects added for any changed URL
11. ✅ Mobile-friendly, accessible, no layout shift
12. ✅ Production builds are indexable; preview/staging is not

### Don'ts (hard rules)
- ❌ Don't set title/meta via `useEffect` or `document.title`
- ❌ Don't use `<img>` instead of `next/image` without a reason
- ❌ Don't use multiple `<h1>` or skip heading levels
- ❌ Don't ship `<meta name="robots" content="noindex">` / `Disallow: /` to production
- ❌ Don't change slugs/folders in `app/` without adding a redirect
- ❌ Don't put key content only inside client components, modals, tabs fetched by JS, or images
- ❌ Don't lazy-load the hero/LCP image
- ❌ Don't add heavy third-party scripts without `next/script` and justification
- ❌ Don't create duplicate or thin pages
- ❌ Don't fabricate reviews, ratings, awards, or statistics

### SEO Impact Note (append to EVERY task summary)
End each response with a short section:

**SEO Impact Note**
- Changed/added: (metadata, headings, schema, routes, redirects, images, sitemap entries)
- Risks: (URL changes, removed content, noindex changes, performance impact)
- Follow-ups: (e.g., resubmit sitemap in Search Console, verify with Rich Results Test, run Lighthouse)

If a requirement cannot be met, state that explicitly and propose the closest alternative. Never skip silently.

---

## 17. Pre-Launch / Periodic Audit Checklist

- [ ] `NEXT_PUBLIC_SITE_URL` correct in production; `www`/non-`www` redirect works; HTTPS enforced
- [ ] `/sitemap.xml` and `/robots.txt` load correctly in production
- [ ] No page missing title/description/canonical; no duplicates (crawl with Screaming Frog or Lighthouse CI)
- [ ] Rich Results Test passes for Organization, Breadcrumb, Article/Service schemas
- [ ] Google Search Console + Bing Webmaster Tools verified; sitemap submitted
- [ ] Analytics installed with `next/script`, consent handled if required
- [ ] Core Web Vitals pass on mobile (PageSpeed Insights / Vercel Analytics)
- [ ] No broken links, redirect chains, or soft 404s
- [ ] OG previews checked (Facebook Sharing Debugger, LinkedIn Post Inspector)
