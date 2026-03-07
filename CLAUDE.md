# CLAUDE.md — underarock design & voice spec

This file is read automatically at the start of every session.
Use it to ground all code, copy, and design decisions in the project's aesthetic.

---

## Brand overview

**underarock** (under-a-rock.org) is a climbing brand run by kyler and devun.
It sells shirts, zines, and climbing holds, and hosts blogs and community links.
The name is a double entendre: bouldering under actual rocks, and "living under a rock."

The site is both a shop and a community hub / zine archive.

---

## Voice & tone

- **Lowercase by default.** Navigation, headings, labels, and body copy default to lowercase unless something needs to shout (e.g., `UNDER CONSTRUCTION`, `BLINK`, error states).
- **Laconic and dry.** Short sentences. "we have both kinds, bootlegs AND originals." is the register.
- **Tongue-in-cheek, never ironic.** The site is earnest about climbing and the community; the humor is in the framing, not at anyone's expense.
- **No marketing-speak.** No "elevate your experience," no "premium," no exclamation points used for enthusiasm. Exclamation points, if used, are for absurdity only.
- **Self-aware about being a website.** "under construction," "webmaster: devunp," fake visitor counters — lean into the bit.
- Copy should feel like it was written by a person who climbs, not by a brand.

---

## Visual identity

### Color palette (from styles.css)
| Token        | Hex       | Use                                         |
|--------------|-----------|---------------------------------------------|
| `--paper`    | `#ffffff` | Page background                             |
| `--ink`      | `#050505` | Body text                                   |
| `--link`     | `#0000ee` | Hyperlinks (unvisited)                      |
| `--visited`  | `#551a8b` | Visited links                               |
| `--acid`     | `#1f9d55` | Accent / product codes / highlights         |
| `--highlight`| `#ffb300` | Logo shadow layer / warm accent             |
| `--line`     | `#111111` | Borders, rules, strokes                     |

**Do not introduce new brand colors** without explicit instruction. Off-white page tints (`#f6f6f6`, `#f9f9f9`) are allowed for panel backgrounds only.

### Typography
- **Body:** Times New Roman (system serif) — the default, always
- **Logo / display:** Arial Black or Impact (system sans-serif, all-caps, weighted)
- **Terminal / code blocks:** Courier New (system monospace)
- **No web fonts.** No Google Fonts, no Typekit, no CDN font loads. System fonts only.
- Headings use `text-transform: lowercase` (set in styles.css). Don't override this.

### Layout
- Max width: 980px, centered, `min(980px, 94vw)`
- Grid: 2-column (`grid-2`) for primary content panels, single-column on mobile (<760px)
- Spacing unit: ~12px gutters, 10px panel padding, 6px tight
- Tables for data/site maps (not for layout hacks)
- **No border-radius anywhere.** Sharp corners only. This is non-negotiable.
- Borders: `2px solid var(--line)` for panels, `1px solid var(--line)` for fine details, `1px dashed` for secondary / web-ring-style elements

---

## On-brand elements

These are established patterns — reuse them, don't reinvent:

- `<marquee>` scrolling banners for announcements
- `.blink` class (CSS `animation: blink 1s steps(1, end) infinite`) for urgent/silly text
- `.scanline` panel overlay (subtle repeating-linear-gradient) for CRT effect
- `.terminal` boxes (Courier New, `#f6f6f6` bg) for system-message-style content
- 88×31 pixel buttons (`.button88`) — the classic web badge format
- Fake web ring footer
- Visitor counter badge
- "last updated" badge
- Zigzag SVG divider (`assets/divider-zigzag.svg`) between sections
- 3D rotating CSS logo (`.logo-3d-wrap`) — keep this; don't replace with an image

---

## Off-brand / anti-patterns

Never introduce these without explicit instruction:

- Border radius on any element
- Drop shadows (box-shadow) on panels or cards — flat borders only
- Smooth color gradients as design elements (scanline gradient is the exception)
- Flexbox card grids with hover lift effects
- Any "modern" UI component: modals, toasts, floating action buttons, sliders, carousels
- Font Awesome or any icon library — use text symbols (`>>`, `::`, `[ ]`) instead
- Animations that are smooth or "polished" — prefer step-based, jerky, or mechanical
- CSS variables not already defined in :root — extend cautiously
- JavaScript frameworks or libraries (vanilla JS only, no jQuery, no React)
- Emoji in UI elements (emoji in copy are allowed if the bit calls for it)
- `cursor: pointer` on anything that isn't a link or button

---

## Animation conventions

- Logo: rotates on Y-axis with slight X wobble, 8s linear, forever
- Blink: `steps(1, end)` — hard cut, not fade
- Any new animations should feel mechanical, not smooth. Use `steps()` or very short durations.
- No parallax, no scroll-triggered animations, no intersection observers unless specifically requested

---

## Asset conventions

- All SVG assets live in `assets/`
- Photos go in `assets/photos/`
- Prefer SVG for all graphics; fallback to PNG for photos
- Reference images: drop in `assets/reference/` and mention them in chat (never linked from HTML)
- 88×31 button SVGs follow the existing style: flat, bordered, no gradients

---

## Pages & structure

| File | Purpose |
|------|---------|
| `index.html` | Homepage, site map, news, buttons |
| `zines.html` | Zine shop |
| `shirts.html` | Shirt shop |
| `funnies.html` | Comics / jokes |
| `blogs.html` | Blog index |
| `rocks.html` | Climbing holds shop |
| `buddies.html` | Community links |
| `order.html` | Order form (prefills email to orders@under-a-rock.org) |
| `about.html` | About page |
| `contact.html` | Contact |
| `blog-template.html` | Copy to create new blog posts |
| `photo-template.html` | Copy to create new photo pages |

---

## Providing reference assets

Drop images into the chat or into `assets/reference/` and mention them. I can read:
- Screenshots of retro/reference websites
- Scanned zines or physical media
- Annotated mockups (draw on them in Preview, then share)
- SVG/PNG assets you want incorporated

The more visual and concrete the input, the less translation error.
Good sources for retro web references: Wayback Machine (web.archive.org), old climbing forums, skate/BMX zine scans.
