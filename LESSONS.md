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

---

## Build: 2026-03-09 (About Page + Blog)

### About Page Structure
Six-section layout works well for a personal bio: Hero → Origin Story → Timeline → Credentials → Publications → CTA. The key is ordering by narrative arc, not by what sounds impressive. Story first, credentials second — CECM and LSSBB land harder after you understand the StorageTek origin.

### Blog Architecture: Static MDX > CMS at Launch
For a consulting site with low post volume, static MDX files are the right call:
- Zero infra cost, zero maintenance, fast builds
- Add a post by dropping a .mdx file — that's it
- gray-matter + marked is the simplest stack that works
- Full MDX pipeline (@next/mdx etc.) is overkill unless you need custom React components in post bodies

### Blog Content Strategy — Key Insight
LinkedIn posts are not blog posts. They're social media optimized for scroll-stop engagement. Converting them to essays requires:
1. Strip unicode bold headers → real h2/h3
2. Convert short punchy paragraphs → longer narrative flow
3. Add concrete scene-setting (where were you, who said what)
4. Soften the CTAs (web readers hate "DM me LEADER")
5. Add a proper intro that earns the essay before stating the thesis

The underlying material is excellent — Joe's posts are genuinely thoughtful. The conversion is mostly formatting and flow.

### Voice Calibration — Joe Diele
Consistent patterns to maintain across all future posts:
- Opens with a moment/scene, not an abstract claim
- Names the uncomfortable truth directly (doesn't soften the diagnosis)
- Always grounds abstract ideas in personal experience
- The "mentor who changed everything" figure recurs — it's structural, not repetitive
- Soft CTAs only: "I'd be glad to have a real conversation" not "Book now, limited spots"

### Claude CLI Sub-Agent Limitation
Claude CLI (`claude` command) requires separate `/login` auth — not inherited from the gateway's OpenClaw OAuth session. On this Mac Studio machine it's installed but not logged in. Cannot be used as a sub-agent without running the interactive login flow first.

### Nav Route vs Anchor
Updated About nav link from `#about` (anchor on homepage) to `/about` (real page route). Worth double-checking all nav links match actual routes whenever a new page is added — stale anchors silently 404.

### prose-joe CSS Class Pattern
For blog post body typography: use a custom CSS class (`.prose-joe`) in globals.css rather than `@tailwind/typography` plugin. More control, no plugin dependency, easier to tune to the site's exact dark palette. Defined: p, h2, h3, blockquote, strong, em, a, ul, ol, li, hr.

---

## Build: 2026-03-10 (Hero Concepts)

### Hero Concept Exploration — 8 Concepts Built
Built 8 distinct hero concepts as separate routes (/concept-a through /concept-e, plus /concept-2 through /concept-4). Each gets the full page body below it so dpw can compare how each hero transitions into the rest of the site. This is the right approach for client-facing concept exploration.

### Container Width Consistency
Hero content container must match nav container exactly — same max-w-* and px-* classes. If nav uses `max-w-6xl px-6`, hero inner wrapper must also be `max-w-6xl px-6`. Mismatches are immediately visible as column misalignment and feel amateurish.

### AI Photos — Wrong for Personal Brand Sites
AI-generated and stock photos are wrong for personal brand consulting sites where authenticity is the product. dpw correctly identified this after generating several images. The lesson: for coaches, therapists, consultants — real photos or nothing. Placeholder + photo shoot checklist > fake photos.

### Midjourney Cinematic Bias
Midjourney's default aesthetic is cinematic/dramatic. For realistic corporate documentary photography, this is a bug not a feature. Even with "not cinematic, flat lighting, iPhone" prompts it fights back. Better alternatives: Adobe Firefly, Google ImageFX, DALL-E 3. Midjourney is the wrong tool for "boring real office."

### Concept E — The Reveal (Selected Direction)
dpw chose Concept E. Key design principles:
- Pacing IS the design — the site completes its thought WITH the visitor
- Line 1 setup → pause → Line 2 gut-punch → CTA cascade
- Scroll also advances the reveal (interactive)
- The `overflow-hidden` + `translateY(105%)` clip reveal technique is the right approach for line-by-line text reveals (not opacity fade, not slide from side)
- Red accent bar on the left grows as stages reveal — subtle progress indicator

### SVG Parent Transition Bug (recurring)
`transition-all` on a parent element intercepts child SVG transitions. Always scope parent transitions to specific properties: `transition-[opacity,transform]` not `transition-all`. This has bitten us twice now — it's a pattern to remember permanently.

### SVG Circle — Premature Visibility Fix
The only reliable way to prevent an SVG stroke from bleeding through before its animation fires is to NOT mount the component at all until the trigger fires. Controlling `strokeDashoffset` alone is insufficient — browsers can render a tiny visible tick at the start point during paint. Pattern: gate mount on the boolean trigger state, add 50ms internal delay before animating to let browser paint the hidden initial state first.

### strokeDasharray Gap Value
Use `PATH_LENGTH 9999` (huge gap) instead of `PATH_LENGTH PATH_LENGTH`. When gap equals dash length, the second dash can bleed into view if PATH_LENGTH estimate is slightly off. An oversized gap (9999) guarantees only one dash segment exists and the circle always draws fully closed.

### Hero After-Lines Content
Body copy + bio strip in the hero breaks the cinematic sequence. After a 3-line animated reveal, switching to paragraph text and a tiny headshot thumbnail creates an abrupt gear shift. The right pattern: hero ends at a single CTA button. Introduce the person properly in a full-width intro strip below fold (large photo, credentials, stats). Sections: Hero → JoeIntroStrip → TrustedBy → Stats.

### CTA Alignment
For hero CTAs where all headline text is left-anchored: always left-align the CTA button. Right-alignment pulls against the reading flow. Full-width CTA buttons read as footer bars, not calls to action.

### "Scroll to Continue" Persistence
Tie scroll hint visibility to actual scroll position (window.scrollY > 10), not to animation state (ctaVisible, lineVisible, etc). The user may scroll before the animation completes OR the animation may complete while they haven't scrolled yet. Both cases need the hint visible.

### Section Order for Personal Brand Sites
Credibility build order: Hero (hook) → Who is this person? (photo + bio) → Where have they been? (company logos) → What have they accomplished? (stats). This is the logical trust sequence. Don't put stats before logos or bio before the hook.

## 2026-03-11 — Session Lessons

### Vercel Account Transfer
- Removing `.vercel/` directory forces re-link to new account on next deploy
- First deploy after reset picks up cached/old build — always run `npm run build` explicitly before deploying after a `.vercel` reset
- Joe's token goes in `secrets/joe_vercel_token.txt`; use `$JOE_TOKEN` env var in deploy commands

### LinkedIn Recommendations Scraping
- LinkedIn recommendations page loads with JS — need Playwright + domcontentloaded + 6s wait + scroll
- `networkidle` timeout fails on LinkedIn — stick with `domcontentloaded`
- `inner_text("body")` after scrolling gives clean text output of all visible content
- Joe has 3 recs, all engineering-era (2006-2023) — NOT coaching client testimonials
- bs4 not installed on Mac Studio Python — use regex or Playwright inner_text instead

### Homepage = concept-e3
- app/page.tsx replaced with concept-e3/page.tsx content
- Function rename: ConceptE3() → Home()
- Metadata updated to primary SEO title
- concept-e3 route still works as alias

### OG Meta Title
- `openGraph.title` template in layout.tsx controls Discord/Slack link preview subtitle
- Was "Joseph Diele" — changed to "Executive Coaching & Leadership Development"
- Discord caches embeds — fresh link needed to see updated title

### Amazon Reviews
- Amazon blocks web_fetch for review content
- Workaround: manually transcribe from screenshots provided by user
- Show review title + stars + body + reviewer name + verified badge

## 2026-03-13 — Carousel Implementation

### What worked
- Doubling the testimonials array for seamless CSS animation loop (translateX(-50%))
- `style jsx` for keyframe animation inside the component
- Fade edges with gradient overlays (from-[#111111] to-transparent) to hide abrupt card edges
- `line-clamp-6` on long quotes (Jon Lacey's is much longer than others)
- `animationPlayState` toggle for pause-on-hover

### What to watch
- 40s animation duration works for 4 cards at 420px width — if more testimonials are added, may need to increase duration or the scroll will feel rushed
- The `style jsx` approach works in Next.js client components but won't work in server components
- Cards are fixed width (360px mobile, 420px desktop) — this keeps the carousel consistent but means very long quotes get clipped via line-clamp

### Deployment note
- Auto-sync cron committed the change before manual `git add` — the nightly auto-commit picked up the file write. Not a problem but worth knowing: if you write a file, the auto-sync may commit it before you get to tag.
- Workaround: tag after auto-sync commits, which is what we did.
