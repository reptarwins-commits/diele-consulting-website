# LESSONS.md — Diele Consulting Website

## Build: 2026-03-07

### What Worked

**Scratch build > template fight**
Generic consulting templates embed wrong assumptions (form factor, nav, CTA placement). When you have specific design decisions locked (navy, gold, stat counters, headshot hero, named offer), writing from scratch takes the same time and you get exactly what you want.

**Reusable animation components pay off fast**
`GoldLine.tsx` and `MagneticButton.tsx` as standalone components meant they could be dropped anywhere without copy-pasting IntersectionObserver boilerplate. Worth the 10 minutes to extract them.

**Build → verify → deploy cycle**
Running `npm run build` before every deploy caught TypeScript issues (notably: `transition-all duration-800` is not a valid Tailwind class — use `duration-700` or add to config). Never skip the build check.

**Direct Vercel CLI deploy is frictionless**
`npx vercel --prod --yes --token $TOKEN` from the project dir. No GitHub, no dashboard. Fast iteration loop (~30s per deploy). Token stored in secrets/ works fine.

**Real images over placeholders immediately**
Swapping the JD initials placeholder for the real headshot + actual book cover in the same session made the site feel real instantly. Don't leave placeholders if the assets exist.

### What to Watch

**Tailwind arbitrary durations**
`duration-800` isn't in Tailwind's default scale (only 75, 100, 150, 200, 300, 500, 700, 1000). Either add to tailwind.config.ts or use `duration-700`. Easy to miss — looks like valid CSS but compiles to nothing.

**Parallax + SSR**
The parallax scroll listener reads `window.scrollY` — fine in a Client Component but would break in SSR. Always mark parallax/scroll components with `"use client"`.

**Border trace animation (4-div approach)**
Using 4 absolutely-positioned divs (top/right/bottom/left) with staggered `transitionDelay` is the cleanest pure-CSS approach. Clip-path alternatives are more complex and less cross-browser reliable. The 4-div method works.

**Credential ticker**
Duplicate the items array for seamless loop (`translateX(-50%)` brings it back to start). Don't try to use `@keyframes` with dynamic JS values — keep the keyframe static and toggle the class.

**Magnetic button UX**
0.25x ratio is the sweet spot — noticeable but not nauseating. `mouseLeave` needs `transition: 0.4s cubic-bezier(0.23, 1, 0.32, 1)` for the spring-back feel. `mouseEnter` sets it to `0.1s ease` so it snaps toward the cursor fast.

### Animation Philosophy (dpw preference — PERMANENT)
- dpw wants ALL subtle animations — never push back or suggest cutting them
- Reference: conversant.com — their animation philosophy is the design target
- Principle: animations should feel like the site is alive, not like a slideshow
- All 10 animations approved and implemented in one pass

### Deployment Notes
- Vercel project: `diele-consulting`, account: wooddigital (davidpaulwood@gmail.com)
- Token: `secrets/vercel_token.txt`
- Domain alias auto-assigned: `diele-consulting.vercel.app`
- Joe connects his real domain via Vercel dashboard after approval
- No GitHub required — direct CLI deploy is the workflow
