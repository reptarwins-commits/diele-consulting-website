# Diele Consulting Website — Complete Handoff Document

**Created:** 2026-06-20  
**Project:** dieleconsulting.com  
**Owner:** Joe Diele / Diele Consulting, LLC  
**Developers:** dpw + Reptar  

---

## 1. PROJECT OVERVIEW

### What This Is
A Next.js marketing website for Diele Consulting — executive coaching for technical leaders. Migrated from Wix to a custom-built Vercel deployment with custom animations and a professional dark-themed design.

### Live URLs
- **Production:** https://dieleconsulting.com
- **Vercel Preview:** https://diele-consulting.vercel.app
- **Vercel Project:** `diele-consulting`

### Migration History
- **Original:** Wix site (josephdiele@gmail.com login)
- **Migration Date:** 2026-03-07 (built) → 2026-05-29 (DNS switched)
- **Status:** Wix → Vercel migration complete
- **Old Wix Site:** Still accessible in Wix dashboard but domain no longer points to it

---

## 2. LOCAL DEVELOPMENT SETUP

### Project Location
```
~/projects/diele-consulting/
```

### Tech Stack
| Component | Version |
|-----------|---------|
| Framework | Next.js 16.1.6 |
| Language | TypeScript 5 |
| React | 19.2.3 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12.35.0 + custom CSS |
| Icons | Lucide React 0.577.0 |
| Fonts | Inter, Playfair Display, Caveat (Google Fonts) |

### File Structure
```
diele-consulting/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts + metadata
│   ├── page.tsx           # Homepage composition
│   ├── globals.css        # Global styles + Tailwind
│   ├── about/             # About page
│   ├── resources/         # Resources page
│   └── favicon.ico
├── components/            # React components
│   ├── Nav.tsx           # Sticky navigation
│   ├── HeroV2.tsx       # Hero section (v2)
│   ├── Stats.tsx         # Stats counter animation
│   ├── WhoThisIsFor.tsx  # Target audience section
│   ├── Framework.tsx     # Coaching framework
│   ├── Services.tsx      # Services offered
│   ├── Book.tsx         # Book promotion
│   ├── Testimonials.tsx  # LinkedIn testimonials
│   ├── CTA.tsx          # Call-to-action
│   ├── Footer.tsx       # Footer
│   ├── ScrollProgress.tsx # Scroll progress bar
│   ├── GoldLine.tsx     # Animated accent line
│   ├── MagneticButton.tsx # Magnetic hover button
│   └── WorkshopSheet.tsx  # Workshop pricing sheet
├── public/               # Static assets
│   ├── images/          # Photos, book cover, headshots
│   └── resources/       # PDF downloads
├── package.json
├── next.config.ts
├── tailwind.config.ts   # Custom colors + animations
├── vercel.json          # Cache headers config
└── tsconfig.json
```

### Install & Run Locally
```bash
cd ~/projects/diele-consulting

# Install dependencies
npm install

# Run dev server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## 3. PLATFORM CONFIGURATIONS

### 3.1 VERCEL

**Account:** `davidpaulwood-1108` (davidpaulwood@gmail.com)  
**Project Name:** `diele-consulting`  
**Team ID:** `team_CxLaTArzhv7Jc8EitMK9M2v8`

**Vercel Token:**
- **Location:** `~/.openclaw/workspace/secrets/vercel_token.txt`
- **Also cached:** `~/.vercel/auth.json`
- **Token Type:** Read-only (`vck_*` prefix) — sufficient for deployments

**Vercel Config (`vercel.json`):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

**Deploy Command:**
```bash
# From project directory
npx vercel --prod --yes --token $(cat ~/.openclaw/workspace/secrets/vercel_token.txt)

# Or with explicit path
vercel --cwd ~/projects/diele-consulting --yes -Q ~/.vercel
```

**Why CLI over Git auto-deploy:** Git-triggered auto-deploy missed commits during development. CLI deploy is reliable (~30s) and explicit.

---

### 3.2 GITHUB

**Repository:** `reptarwins-commits/diele-consulting`

**Remotes configured:**
```bash
# Primary (this project)
diele-origin → https://reptarwins-commits:***@github.com/reptarwins-commits/diele-consulting.git

# Parent workspace (for heartbeat auto-commits)
origin → git@github.com:reptarwins-commits/openclaw-workspace.git
```

**Git workflow:**
```bash
cd ~/projects/diele-consulting

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Description of changes"

# Push to GitHub
git push diele-origin main
```

**Note:** The `origin` remote points to the parent workspace repo. Use `diele-origin` for this project's commits.

---

### 3.3 CLOUDFLARE DNS

**Domain:** dieleconsulting.com

**DNS Records:**
| Type | Name | Value | Status |
|------|------|-------|--------|
| A | @ | Vercel IPs | ✅ Active |
| CNAME | www | cname.vercel-dns.com | ✅ Active |
| CNAME | en | (stale — Wix CDN) | ⬜ Cleanup pending |

**DNS Switch Date:** 2026-05-29  
**Nameservers:** Cloudflare (managed)

---

### 3.4 WIX (LEGACY — READ ONLY)

**Status:** Migrated away from. Old site still exists in dashboard but domain no longer points to it.

**Wix Account:**
- **Login:** josephdiele@gmail.com
- **Password:** Quality2025!
- **2FA:** Google Authenticator on Joe's phone
- **Site ID:** `96143a00-b1d0-4a58-9fd8-f4dd7bf5c7d9`
- **Account ID:** `b5164f26-ca1a-4c88-af0e-9f7135e08e16`

**Wix API Key:** Stored in `~/.openclaw/workspace/secrets/joe_all_logins.txt`

**Why kept:** May need to extract old content (podcast appearances, blog posts) that weren't migrated.

**Access Issues:**
- Browser automation blocked by FedCM/CAPTCHA
- Requires Joe's 2FA code for manual login
- Editor automation not possible due to cross-origin iframe sandboxing

---

### 3.5 OPENCLAW/REPTAR CONFIGURATION

**Project Path in OpenClaw:**
```
/Users/dwood/.openclaw/workspace/projects/diele-consulting/
```

**Browser Profile:**
- **Profile name:** `openclaw` (managed)
- **Port:** 18800 (default)
- **Purpose:** Screenshots, local preview verification
- **Limitation:** Cannot reach localhost or LAN IPs (sandboxed)

**Secrets Storage:**
```
~/.openclaw/workspace/secrets/
├── vercel_token.txt          # Vercel deploy token
├── joe_all_logins.txt        # Wix API key, other credentials
└── github_creds.txt          # GitHub PAT (for API calls)
```

**Heartbeat Auto-Commit:**
- Enabled for workspace repos
- Commits uncommitted changes with timestamped messages
- Configured in OpenClaw heartbeat system

---

## 4. DESIGN SYSTEM

### Color Palette (Tailwind Config)
```typescript
colors: {
  bg: {
    primary: "#111111",      // Main background
    secondary: "#1a1a1a",    // Card backgrounds
    card: "#1e1e1e",         // Elevated cards
    light: "#f5f3f0",        // Light sections
  },
  accent: {
    red: "#B22222",          // Primary brand red
    "red-muted": "#8B1A1A",  // Darker red
    white: "#E8E8E8",        // Off-white text
    gray: "#A0A0A0",         // Muted text
  },
}
```

### Typography
| Font | Usage | CSS Variable |
|------|-------|--------------|
| Inter | Body text, UI | `--font-inter` |
| Playfair Display | Headlines, quotes | `--font-playfair` |
| Caveat | Accent/script text | `--font-caveat` |

### Animation Philosophy
> "Subtle animations that make the site feel alive, not like a slideshow"

**Reference:** conversant.com animation philosophy  
**Rule:** dpw wants ALL subtle animations — never cut them

**Key Animation Components:**
- `GoldLine.tsx` — Animated border trace using 4-div approach
- `MagneticButton.tsx` — Magnetic hover effect (0.25x ratio)
- `ScrollProgress.tsx` — Progress bar at top
- `Stats.tsx` — Count-up animation with IntersectionObserver
- Ticker animation — CSS keyframes for credential scroll

---

## 5. KEY COMPONENTS

### Hero (HeroV2.tsx)
- Two-column layout: text + headshot
- Magnetic CTA button
- Playfair headline with Inter body

### Stats (Stats.tsx)
- 3 stats: Years experience, Teams coached, ROI delivered
- Count-up animation on scroll into view
- Gold accent numbers

### Services (Services.tsx)
- 3 service lanes with icons
- Hover lift effect
- Each links to Calendly booking

### Testimonials (Testimonials.tsx)
- LinkedIn recommendation quotes
- Carousel-style display
- Real testimonials from Joe's career

### Book (Book.tsx)
- "Sustainable Quality" book promotion
- Cover image + purchase link
- Credential mention (published author)

### CTA (CTA.tsx)
- Final call-to-action section
- Calendly scheduling link
- Contrasting background

---

## 6. DEPLOYMENT WORKFLOW

### Standard Edit → Deploy Flow

```bash
# 1. Make edits in your editor
# Edit components in ~/projects/diele-consulting/components/

# 2. Test locally
npm run dev
# Check http://localhost:3000

# 3. Build check
npm run build
# Fix any TypeScript/Tailwind errors

# 4. Commit to Git
git add .
git commit -m "Description of changes"
git push diele-origin main

# 5. Deploy to Vercel
npx vercel --prod --yes --token $(cat ~/.openclaw/workspace/secrets/vercel_token.txt)

# 6. Verify live
# Visit https://dieleconsulting.com
```

### One-Liner Deploy (if already committed)
```bash
cd ~/projects/diele-consulting && npx vercel --prod --yes --token $(cat ~/.openclaw/workspace/secrets/vercel_token.txt)
```

---

## 7. COMMON ISSUES & FIXES

### Tailwind Arbitrary Durations
❌ `duration-800` doesn't exist in default Tailwind  
✅ Use `duration-700` or add custom duration to `tailwind.config.ts`

### Font Loading
Fonts loaded via `next/font/google` — don't import Google Fonts via `<link>`.

### Build Errors
Always run `npm run build` before deploying. TypeScript is strict.

### Token Expiration
If Vercel deploy fails with 401:
- Check token in `secrets/vercel_token.txt`
- May need to regenerate at vercel.com → Settings → Tokens

### Image Optimization
Next.js Image component auto-optimizes. Ensure images are in `public/images/`.

---

## 8. CONTENT UPDATES

### Updating Testimonials
Edit `components/Testimonials.tsx` — quotes are hardcoded in the component.

### Updating Services
Edit `components/Services.tsx` — update text and links.

### Adding Resources
1. Add PDF to `public/resources/`
2. Update `components/ResourcesList.tsx` or create new resource page
3. Deploy

### Updating Book Info
Edit `components/Book.tsx` — links, description, etc.

---

## 9. EXTERNAL INTEGRATIONS

### Calendly
- **URL:** calendly.com/josephdiele
- **Usage:** CTA buttons link to this for booking

### LinkedIn
- **Profile:** Used for social proof, testimonials
- **No API integration** — manual embed of recommendations

### Google Drive (Content Source)
- Homepage rewrite doc: `1Xxc7eAm2KsucFbHIvLuovQPF9mC9Qa495TZfnO-7dKo`
- Content planning happens in Google Docs before implementation

---

## 10. BACKUP & RECOVERY

### What's Version Controlled
- All code in `diele-consulting/` directory
- Committed to GitHub repo

### What's NOT Version Controlled
- `node_modules/` (regenerated via npm install)
- `.next/` build output (regenerated)
- Vercel token (stored in secrets/)

### Recovery Process
```bash
# If local copy lost
git clone git@github.com:reptarwins-commits/diele-consulting.git
cd diele-consulting
npm install
```

---

## 11. CONTACT & ACCESS

| Platform | Access Method | Notes |
|----------|---------------|-------|
| Vercel | Token in secrets/ | davidpaulwood@gmail.com account |
| GitHub | SSH key | reptarwins-commits org |
| Wix | josephdiele@gmail.com | Requires Joe's 2FA |
| Cloudflare | dpw's account | DNS management |
| Domain Registrar | Namecheap? | dpw manages |

---

## 12. TODOS & OPEN ITEMS

- [ ] Remove `en.dieleconsulting.com` CNAME from Cloudflare (stale Wix alias)
- [ ] Extract old podcast appearances from Wix (blocked on Joe's 2FA)
- [ ] Add SEO meta tags for individual pages
- [ ] Implement blog section (if Joe wants to migrate old posts)
- [ ] Add analytics (Vercel Analytics or Google Analytics)

---

## 13. LESSONS LEARNED

See `LESSONS.md` in project root for detailed development insights.

**Key takeaways:**
1. Scratch build > template fight
2. Reusable animation components pay off fast
3. Direct Vercel CLI > Git auto-deploy
4. Build → verify → deploy cycle catches errors early
5. dpw wants ALL subtle animations — never cut them

---

**End of Handoff Document**

Last updated: 2026-06-20 by Reptar
