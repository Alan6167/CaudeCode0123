# AI Metadata Remover

Free online tool that removes EXIF, GPS, embedded AI generation data, and C2PA Content Credentials from images — entirely in the browser. No uploads, no accounts, lossless output.

Built as an MVP with dual positioning: generic "metadata remover" head terms plus the "AI metadata" niche (aimetadataremover domain). Product research and domain strategy: see `output/documents/2026-08-07-metadata-remover-keyword-research/keyword-research.md` (section 10 covers the AI positioning).

## Features

- **100% client-side** — files are parsed and cleaned with vanilla JavaScript in the browser; nothing is ever uploaded. Works offline once loaded.
- **Lossless** — image data is never decoded or re-encoded. Only metadata sections are removed, so quality is bit-for-bit identical.
- **Formats** — JPEG (removes EXIF, XMP, IPTC/Photoshop, comments, C2PA APP11/JUMBF, multi-picture data, and hidden data after the image end), PNG (tEXt/zTXt/iTXt/eXIf/tIME/caBX chunks), WebP (EXIF/XMP/C2PA chunks + VP8X flag fix).
- **AI metadata aware** — detects and displays embedded AI generation data: Stable Diffusion / ComfyUI / InvokeAI prompts and workflows stored in PNG text chunks (with an in-card prompt preview), C2PA Content Credentials, and XMP `trainedAlgorithmicMedia` markers.
- **Metadata preview** — shows what each image contained (camera, dates, software, AI prompts, and a highlighted GPS location warning) before download.
- **Batch** — multiple files at once, with a dependency-free ZIP download (store method).
- **Orientation-safe** — optionally re-adds a minimal orientation-only EXIF tag (default on) so cleaned photos don't display sideways. No personal data involved.
- **Accessible & responsive** — keyboard-operable dropzone, `aria-live` status announcements, mobile-first layout, dark mode, reduced-motion support.

## Running locally

It's a static site with zero dependencies:

```bash
cd metadata-remover
python3 -m http.server 8080
# open http://localhost:8080
```

Opening `index.html` directly from disk also works.

## Deploying

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Point the host at the `metadata-remover/` directory. No build step.

### Launch checklist (once the domain is final)

These are intentionally left out until the production URL is confirmed — a canonical or og:url pointing at the wrong domain does active harm:

- [ ] `<link rel="canonical" href="https://<domain>/">`
- [ ] `<meta property="og:url" content="https://<domain>/">`
- [ ] `<meta property="og:image" content="https://<domain>/assets/og-image.png">` (asset already in `assets/og-image.png`, 1200x630) + `og:image:width`/`og:image:height`
- [ ] `<meta name="twitter:card" content="summary_large_image">` + `twitter:image`
- [ ] Add `"url"` to the WebApplication JSON-LD
- [ ] `sitemap.xml` + `robots.txt` at the web root
- [ ] Submit to Google Search Console / Bing Webmaster Tools

## Architecture

| File | Purpose |
|------|---------|
| `index.html` | Page structure, SEO meta, `WebApplication` + `FAQPage` JSON-LD, FAQ content |
| `css/styles.css` | Design system (light/dark), layout, components |
| `js/cleaners.js` | Lossless metadata strippers: JPEG segment parser, PNG chunk parser, WebP RIFF parser |
| `js/exif-reader.js` | Read-only TIFF/EXIF parser for the "what was found" preview (incl. GPS decoding and AI-signature detection) |
| `js/zip.js` | Minimal store-only ZIP writer for batch downloads |
| `js/app.js` | UI flow: drop/browse/paste → auto-clean → download |

Safety notes on the JPEG cleaner: JFIF (APP0), ICC color profiles (APP2 `ICC_PROFILE`), and Adobe color-transform markers (APP14) are deliberately **kept** — removing them can change color rendering. Everything else in the APPn/COM range is stripped.
