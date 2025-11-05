# Kawasaki H2R Hero (React + Vite + TypeScript)

A small demo app that renders a **motorcycle hero section** with:
- a responsive bike image,
- animated **ShinyText** over the bike,
- a reusable **RevealOnScroll** wrapper,
- optional **SplitText** effect for headlines.

> Lightweight: no GSAP required (CSS transitions + IntersectionObserver).

---

## 🧰 Tech Stack
- **React 18** + **Vite** + **TypeScript**
- Plain CSS modules/files (no framework required)

---

## 🚀 Getting Started

### Prereqs
- Node.js **18+** (recommended)

### Install
```bash
npm install
# or: pnpm i / yarn
```

### Dev
```bash
npm run dev
```
Open the URL printed by Vite (e.g. `http://localhost:5173`).

### Build & Preview
```bash
npm run build
npm run preview
```

---

## 📦 Project Structure (excerpt)

```
src/
  assets/
    ba2e994c-bc19-4d3a-8900-07dd187a9dd4.webp
    kawasaki-ninja-h2r-28-635x396.webp
    x_japan_logo_white_transparent.png
  components/
    Background.tsx            # main hero section (bike + shiny text overlay)
    BackGroundImage.css       # hero styles
    KawaHeader.css            # (optional header styles)
    navBar.tsx                # (optional navbar)
    RevealOnScroll.tsx        # generic scroll-reveal wrapper
    ShinyText.tsx             # shiny animated text
    ShinyText.css             # shiny text styles
    SplitText.tsx             # optional split/letter animation
  App.tsx
  main.tsx
```

> Your main component file might be called `Background.tsx` or `BackGroundImage.tsx`. Import whichever name you use in `App.tsx`.

---

## 🧩 Components

### ShinyText
**File:** `src/components/ShinyText.tsx`  
Props:
- `text: string` – text to display.
- `speed?: number` – sweep duration in seconds (default `5`).
- `disabled?: boolean` – pause the animation.
- `className?: string` – additional classes (for size/position).

**Styles:** `src/components/ShinyText.css` (excerpt)
```css
.shiny-text {
  display: inline-block;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: transparent;
  background: linear-gradient(110deg,
    rgba(255,255,255,.08) 10%,
    rgba(255,255,255,.95) 35%,
    rgba(255,255,255,0) 60%) no-repeat;
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shiny-sweep linear infinite;
}
@keyframes shiny-sweep {
  from { background-position: -150% 0; }
  to   { background-position: 150% 0; }
}
/* Overlay preset */
.on-bike {
  position: absolute;
  bottom: 8%;
  left: 6%;
  font-size: clamp(28px, 7vw, 96px);
  pointer-events: none;
  mix-blend-mode: screen;
  text-shadow: 0 6px 18px rgba(0,0,0,.35);
  -webkit-text-stroke: 1px rgba(0,0,0,.25);
}
```

**Usage (overlay on the bike):**
```tsx
<div className="h2r-bike-wrap">
  <img className="h2r-bike" src={bike} alt="Kawasaki Ninja H2R" />
  <ShinyText text="NINJA H2R" className="on-bike" speed={3} />
</div>
```

---

### RevealOnScroll
**File:** `src/components/RevealOnScroll.tsx`  
A wrapper that animates children from `from` → `to` when in view.

Props:
- `from?: React.CSSProperties` – starting style (default fade + translateY).
- `to?: React.CSSProperties` – final style.
- `duration?: number` – seconds (or ms if >10).
- `delay?: number` – seconds (or ms if >10).
- `ease?: string` – `"power3.out"` (mapped to cubic-bezier).
- `threshold?: number` – intersection threshold (0..1).
- `rootMargin?: string` – e.g. `"-100px"`.
- `once?: boolean` – animate once (default) or on each scroll.

**Example:**
```tsx
<RevealOnScroll
  className="h2r-bike-wrap"
  from={{ opacity: 0, transform: "translateY(40px) scale(0.98)" }}
  to={{ opacity: 1, transform: "translateY(0) scale(1)" }}
  duration={0.6}
  delay={0.1}
  ease="power3.out"
  threshold={0.1}
  rootMargin="-100px"
>
  <img className="h2r-bike" src={bike} alt="Kawasaki Ninja H2R" />
</RevealOnScroll>
```

> If TypeScript complains about `ReactNode`/`CSSProperties`, add:
> ```ts
> import type { CSSProperties, ReactNode } from "react";
> ```

---

### SplitText (optional)
Animate headings character-by-character.
```tsx
<SplitText
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  onLetterAnimationComplete={() => console.log("All letters animated!")}
/>
```

---

## 🎨 Hero Styles (excerpt)

**File:** `src/components/BackGroundImage.css`
```css
.h2r-hero { position: relative; min-height: 540px; color: #e8ebf0; }
.h2r-inner {
  max-width: 1200px; margin: 0 auto; padding: 48px 20px;
  display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 24px;
}
.h2r-bike-wrap { position: relative; display: inline-block; width: 100%; }
.h2r-bike { width: 120%; height: auto; transform: translateX(-6%);
  filter: drop-shadow(0 30px 40px rgba(0,0,0,.55)); }
.h2r-ghost { position: absolute; inset: 0; opacity: .06; pointer-events: none; }
```

---

## 🔗 App Entry

**`src/App.tsx`**
```tsx
import Background from "./components/Background"; // or BackGroundImage

export default function App() {
  return <Background />;
}
```

---

## 🛠️ Troubleshooting

- **JSX outside a component** – render `SplitText` **inside** a component’s `return`.
- **Missing imports** – ensure `RevealOnScroll` is default-imported:  
  `import RevealOnScroll from "./RevealOnScroll";`
- **Type errors (React types)** – add:  
  `import type { CSSProperties, ReactNode } from "react";`
- **Blank image** – keep assets under `src/assets/` so Vite can process imports.

---

## 📄 License
MIT (replace with your preferred license if needed).

## 🙏 Credits
Product names / imagery belong to their respective owners. Built with Vite + React + TypeScript.
