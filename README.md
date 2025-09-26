# jhonp

## Virtual Business Card FOTON

Single Page Application built with Vite + React + TypeScript for the digital card of Jhon Carlos Perez Cubas. HashRouter keeps navigation working on GitHub Pages and the UI uses Tailwind CSS with shadcn-style components.

### Key Features
- Responsive layout with photographic background, translucent cards, and smooth transitions.
- Smart actions: WhatsApp with preset message, Gmail compose, website link, vCard download, and share fallback.
- Gallery with autoplay controls, indicators, and an overlay intro.
- GitHub Pages ready: base path `/JhonPerez/`, deploy script with `gh-pages`.

### Install
```
npm install
```

### Scripts
- `npm run dev` - development server
- `npm run lint` - run ESLint
- `npm run build` - generate static output in `dist/`
- `npm run preview` - serve `dist/` (after build)
- `npm run deploy` - build and publish `dist/` to the `gh-pages` branch (runs `predeploy` automatically)

### Deploy to GitHub Pages
1. Ensure the repository on GitHub is named `JhonPerez` or override the base path in `vite.config.ts`.
2. Run `npm run deploy` to publish the production build to the `gh-pages` branch.
3. In GitHub, configure Pages to use the `gh-pages` branch with the root folder (`/`).
4. Update `index.html` metadata (`og:url`) and optionally set `VITE_BASE_PATH` before building if your repo name changes.

### Relevant Structure
```
public/
  imagenes/
    09.jpeg                # Background
    Foton-logo-01.png      # Favicon and OpenGraph asset
    otras fotos/
      F1.jpeg
      F2.jpg
      F3.jpg
      GF1.jpeg
src/
  components/
    VirtualBusinessCard.tsx
    ui/ (Button, Badge, Card)
  lib/utils.ts
  index.css
  main.tsx
  App.tsx
```

### Notes
- 100% static stack (Vite + Tailwind + shadcn) so it runs fine on GitHub Pages.
- For best Lighthouse scores convert the gallery images to WebP/AVIF when you have the source files.
- Add a PWA manifest and service worker later if you want offline support (e.g. via `vite-plugin-pwa`).
