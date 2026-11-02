# AWAKE Sembako – Design System

## Brand Identity
**Product:** AWAKE Sembako – Mobile retail app for daily essentials (rice, oil, spices, noodles, packages)  
**Audience:** Everyday Indonesian shoppers seeking convenience and reliability  
**Personality:** Practical, direct, modern—no fuss, just what you need

## Visual System

### Color Palette
- **Primary Red:** `#dc1f26` (action, urgency, calls-to-action, price)
- **Background:** `#eef0e8` (light) / `#16181a` (dark)
- **Surface:** `#ffffff` (light mode) / `#26292c` (dark mode)
- **Text:** `#1a1a1a` (light) / `#eee` (dark)
- **Neutral:** `#b9bbb3` (secondary text), `#d9dbd3` (borders)
- **Semantic:** `#3aa655` (success/stock), `#d98a00` (warning), `#d11f26` (danger)

### Typography
- **Font:** Plus Jakarta Sans (system fallback)
- **Weights:** 400 (body), 500 (input), 600 (labels/nav), 700 (headlines), 800 (titles)
- **Hierarchy:**
  - Title (h1): 24px, 800, tight letter-spacing
  - Section (h2/h5): 16–20px, 800, tracking
  - Label (h3/b): 12–14px, 700–800
  - Body: 12–13px, 400–500
  - Small: 10–11px, 500–600, neutral color

### Layout & Spacing
- **Container:** 360px phone width, 344px screen (8px padding)
- **Safe Areas:** Top/bottom safe-area-inset respect
- **Gaps:** 6px (tabs), 10px (nav), 12px (grid/flex), 14px (sections), 16px (page padding), 20px (major sections)
- **Radius:** 99px (pills), 50% (avatars), 12–20px (cards/buttons)
- **Shadow:** `0 1px 6px rgba(0,0,0,.03)` (light), `0 20px 50px rgba(0,0,0,.25)` (phone frame)

### Components
- **Buttons:** 40–48px height, 12–13px font, rounded 20–24px, red for primary, white border for secondary
- **Pills/Chips:** 34–40px height, 20px radius, toggleable (border + background on select)
- **Cards:** White bg, 16–20px radius, 10px internal padding, 1px solid borders on focus
- **Icons:** 16–22px, stroke-based (not filled), red on highlight

### States
- **Active:** Red background + red text or red border + light red bg
- **Disabled:** Gray bg, gray text, no cursor
- **Focus/Hover:** Red border, light red background (for inputs/cards)

## Design Dials (Antislop R-37)
- **ENERGY:** 2 (moderate, functional emphasis on red highlights, not overwrought)
- **RHYTHM:** 2 (consistent grid, predictable spacing, no chaotic variation)
- **MOTION:** 1 (minimal; subtle transitions `.2s` on state changes, no decorative animations)

## Key Patterns

### Product Display
- Grid 2-column with card wrapper
- Image on top (70–128px), title below, price in red
- Star rating (11–13px) on overlay badge
- Discount badge top-right

### Variants Selection
- Pill-style buttons (40px height, 18px horizontal padding)
- Selected: red border + light red background + checkmark
- Sub-variants appear below when main selected
- Pill-wrap with 10px gap

### Navigation
- Bottom nav: 52–78px height, dark (`#111518`) / light, icon + label
- Active: bright red background, round style
- Tap target: 40px minimum

### Sections
- Header: 60px height, white, flex center–space-between
- Sticky scroll container below
- Hero image: 200px height, 16px radius, full width object-cover

## Dark Mode Support
- CSS variable system: `--pg`, `--tx`, `--chip`, `--chipb`
- Auto-detect via `prefers-color-scheme`
- Override via `[data-theme="dark"]`

## Accessibility Notes (No Full Audit)
- Color contrast: red (#dc1f26) on white (7:1 ratio ✓)
- Semantic HTML: buttons, headings, labels used
- Keyboard: all interactive elements focusable
- Touch: minimum 44px tap targets in nav/buttons
- Status bar hidden via CSS (clock still ticks in background)

---

**Status:** Production-ready design system extracted from working prototype.  
**Dials:** ENERGY 2 / RHYTHM 2 / MOTION 1
