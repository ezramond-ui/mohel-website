# Mohel Practice Website

A fast, static, multi-page website for a mohel practice serving Greater Cleveland &
Northeast Ohio. Built with plain HTML, CSS, and a tiny bit of vanilla JavaScript —
**no build step, no framework, no dependencies to install.** It will deploy on any
static host and load quickly.

---

## 1. Quick start — preview locally

Because the site uses root-relative links (e.g. `/about/`), preview it through a
local web server rather than opening the files directly (`file://` will break the
links and styles).

From this folder, run **any one** of these:

```bash
# Python 3 (already on most machines)
python -m http.server 8080

# Node.js
npx serve .        # or: npx http-server -p 8080

# PHP
php -S localhost:8080
```

Then open <http://localhost:8080> in your browser. Edit a file, save, refresh.

---

## 2. File structure

```
/
├── index.html                     ← Home
├── the-bris-process/index.html    ← The Bris Process
├── about/index.html               ← About Me
├── service-areas/
│   ├── index.html                 ← Service Areas hub
│   ├── beachwood/index.html       ← one page per city (great for local SEO)
│   ├── cleveland-heights/index.html
│   ├── university-heights/index.html
│   ├── south-euclid/index.html
│   ├── shaker-heights/index.html
│   ├── solon/index.html
│   ├── pepper-pike/index.html
│   ├── lyndhurst/index.html
│   ├── mayfield-heights/index.html
│   └── orange/index.html
├── gallery/index.html             ← Photo gallery + lightbox
├── faq/index.html                 ← FAQ accordion
├── contact/index.html             ← Contact info + form
├── 404.html                       ← Friendly "not found" page
├── styles.css                     ← All styling (shared)
├── script.js                      ← Mobile nav, gallery lightbox, footer year
├── robots.txt                     ← Search-engine directives
├── sitemap.xml                    ← List of pages for search engines
└── README.md                      ← This file
```

The folder-per-page layout gives clean URLs like `/the-bris-process/` and
`/service-areas/beachwood/` with no `.html` in the address, on any static host.

---

## 3. What to customize (the important part)

All editable spots are marked in the HTML with comments like:

```html
<!-- PLACEHOLDER: replace with real bio -->
```

Search the whole project for **`PLACEHOLDER`** and for **`[`** (square brackets) to
find every spot to update. Here are the key ones:

| Placeholder | What to replace it with | Where |
|---|---|---|
| `[Your Name], Mohel` | Your name/title as you want it shown | Every page (header, footer, titles) |
| `(216) 555-0000` and `tel:+12165550000` / `sms:+12165550000` | Your real phone number | Header, footer, buttons, Contact page |
| `hello@yourdomain.com` | Your real email | Footer, Contact page, structured data |
| `www.yourdomain.com` | Your real domain | `<link rel="canonical">`, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt` |
| Bio, philosophy, training | Your real story & credentials | `about/index.html` |
| Trust-signal numbers (`[##]+`, years, etc.) | Real experience/credentials | `index.html` |
| `[PLACEHOLDER: ... synagogue]` | Real local synagogue names | Each `service-areas/<city>/index.html` |
| Testimonials / `[Family Name]` | Real testimonials (with permission) | *(add a section when ready — see note below)* |
| Photo placeholder blocks | Real photos | Home, About, Gallery (see §4) |

> **Tip — updating the phone number everywhere at once:** it appears in the header,
> footer, and buttons of every page. Use your editor's "Find in Files / Replace in
> Folder" feature to change `2165550000` and `(216) 555-0000` across the whole
> project in one pass.

### The name/title wordmark
The logo is currently a **text wordmark** (`✡︎ [Your Name], Mohel`). If you get a
logo image later, replace the `<span class="brand-name">…</span>` markup in the
header with an `<img src="/assets/logo.svg" alt="[Your Name], Mohel" height="40">`.

---

## 4. Adding real photos

1. Create an `assets/` folder (and e.g. `assets/gallery/` for gallery images).
2. **Portrait photos** (Home + About): replace the
   `<div class="photo-placeholder">…</div>` block with:
   ```html
   <img src="/assets/mohel.jpg" alt="[Your Name], mohel serving Cleveland"
        width="760" height="950" loading="lazy" />
   ```
3. **Gallery photos**: in `gallery/index.html`, replace each
   `<figure class="gallery-figure">…</figure>` with an `<img>` (instructions are in
   an HTML comment right above the gallery grid). Example:
   ```html
   <button class="gallery-item" aria-label="Enlarge photo">
     <img src="/assets/gallery/bris-01.jpg" alt="Grandfather holding baby during the bris"
          loading="lazy" width="800" height="600" />
   </button>
   ```
   The click-to-enlarge lightbox works automatically.

**Image tips for fast loading:** resize photos to ~1200px on the long edge, export as
optimized JPG or WebP (aim for < 200 KB each), and always include descriptive `alt`
text (good for accessibility *and* SEO). Every image already uses `loading="lazy"`.

---

## 5. Turning on the contact form

The form in `contact/index.html` posts to **Formspree** (free tier), so you need no
server. To activate it:

1. Sign up at <https://formspree.io> and create a new form.
2. It gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In `contact/index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and
   replace `YOUR_FORM_ID` with your id.
4. Submit the form once yourself to confirm the email address (Formspree asks you to
   verify on the first submission).

Submissions will then be emailed to you. A hidden honeypot field is already included
to reduce spam.

**Alternatives** (all drop-in — just change the `action`):
- **Netlify Forms** — if you host on Netlify, add `netlify` to the `<form>` tag and
  remove the Formspree action; Netlify captures submissions automatically.
- **Getform**, **Basin**, **FormSubmit** — same idea, different endpoint URL.

---

## 6. Deploying to a static host

Any of these will host this site for free or near-free. You already own the domain,
so you'll point it at whichever host you choose (each has a "custom domain" guide).

### Netlify (drag-and-drop — easiest)
1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page. Done — you get a live URL immediately.
3. Site settings → **Domain management** → add your custom domain.

### Cloudflare Pages / GitHub Pages / Vercel
- **Cloudflare Pages** or **Vercel**: create a project, connect a Git repo (or use
  their CLI / direct upload). No build command needed — set the output/root to this
  folder.
- **GitHub Pages**: push these files to a repo, enable Pages on the `main` branch
  root. *(Note: for the folder-based clean URLs to work, GitHub Pages serves
  `index.html` from each folder automatically — which this site relies on.)*

### Traditional web host (cPanel / FTP)
Upload the entire contents of this folder to your web root (`public_html`). That's it.

### After deploying — SEO housekeeping
1. Replace `www.yourdomain.com` everywhere (see the table in §3).
2. Submit `sitemap.xml` in **Google Search Console** (and Bing Webmaster Tools).
3. Create a **Google Business Profile** for the practice — for local searches like
   "mohel Cleveland," this matters as much as the website itself.

---

## 7. Accessibility & performance notes (already built in)

- Semantic HTML5 landmarks, one `<h1>` per page, logical heading order.
- Keyboard-accessible nav and FAQ (the FAQ uses native `<details>` elements).
- "Skip to content" link, visible focus outlines, `aria-current` on the active nav
  item, and `alt`/`aria-label` placeholders on imagery.
- Deep blue / gold / cream palette chosen for readable contrast.
- One web font (Playfair Display) for headings; body text uses the fast system font
  stack. Everything else is inline/local, so pages load quickly.
- `prefers-reduced-motion` is respected.

---

## 8. Keeping the shared header & footer in sync

There's no build step, so the header and footer are copied into each page. If you
change a nav link or your phone number, update it on **every** page (use Find &
Replace across the folder). The service-area city pages were generated from a shared
template; if you'd ever like to regenerate them in bulk, ask your developer — the
one-time generator script can be reused.

---

*Mazel tov on the new site — may it bring many simchas your way.*
