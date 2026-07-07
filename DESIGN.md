---
name: Mdina Tours
description: Premium Morocco private tours and airport transfer booking system.
colors:
  primary: "#dc834e"
  primary-hover: "#9e5d36"
  secondary: "#202f59"
  secondary-hover: "#121d39"
  text: "#666666"
  accent: "#222222"
  lighter: "#999999"
  border: "#e5e5e5"
  bg-color: "#fcf9f6"
  orange: "#e87e04"
  cream: "#f5f0e8"
  purple: "#2a2438"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 7vw, 5.5rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-poppins), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Mdina Tours

## 1. Overview

**Creative North Star: "The Mediterra Transit Grid"**

The Mediterra Transit Grid marries high-reliability layout structures, strict typographic alignment, and clear informational navigation with the warm, rich tones of Morocco. The aesthetic balances structured digital interfaces (crisp lines, precise grids, flat surfaces) with a warm-minimalist color spectrum (limestone, abyssal navy, ochre sand) that feels premium yet highly functional.

This system explicitly rejects generic SaaS landing-page templates with flat gray scales, cluttered travel layouts with flashing badges, and hard-to-use experimental interfaces. Instead, it guides the user with structured layout rhythm, readable typography hierarchy, and clear functional targets.

**Key Characteristics:**
- High-contrast, legible typography with a balance of serif display headings and clean sans-serif body text.
- Grid-driven layouts that align booking inputs, tiers, and information tables cleanly.
- Restrained color application where saturated brand tones guide conversion targets rather than decorative background fills.

## 2. Colors

The color palette represents Morocco's warm landscapes and coastal depth, applied with strict functional hierarchy.

### Primary
- **Ochre Sand** (#dc834e): Used for key call-to-actions, highlights, active states, and focus states. This color marks conversion paths.

### Secondary
- **Dark Abyssal Blue** (#202f59): Used for structural panels, primary typography hierarchy, headers, and backgrounds that require high contrast or emphasis.

### Neutral
- **Off-White Parchment** (#fcf9f6): The main background color, providing a warm and clean canvas.
- **Limestone Cream** (#f5f0e8): Used for subtle component backgrounds or section dividers.
- **Charcoal Text** (#666666): Standard body copy color, optimizing readability against light backgrounds.
- **Muted Ink** (#999999): Used for metadata, inactive states, and placeholder text.
- **Clean Border** (#e5e5e5): Subtle line color for structural grids and input fields.

**The Ochre Highlight Rule.** Saturated primary accents are used on ≤10% of any given screen. Its rarity is the point—it commands visual priority.

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)
**Body Font:** Poppins (with sans-serif fallback)
**Label/Mono Font:** Aeonik (with Helvetica, Arial, sans-serif fallback)

**Character:** Editorial warmth meets geometric clarity. The classic serif display face adds heritage and high-end prestige to headings, while the sans-serif body maintains modern legibility.

### Hierarchy
- **Display** (300 weight, clamp(2.25rem, 7vw, 5.5rem), 1.05 line-height): Used for primary hero titles and major section entry points.
- **Headline** (700 weight, 2.2rem, 1.2 line-height): Used for core section titles.
- **Title** (600 weight, 1.4rem, 1.25 line-height): Used for card titles, section subtitles, and component group labels.
- **Body** (400 weight, 1rem, 1.6 line-height): Main body copy. Max line length is restricted to 65–75ch for optimal reading comfort.
- **Label** (600 weight, 0.875rem, -0.02em letter-spacing): Used for tags, badges, tables, and buttons.

**The Heading Balance Rule.** Heading elements (h1–h3) must always use `text-wrap: balance` to prevent awkward line breaks and orphaned words.

## 4. Elevation

Mdina Tours is a flat and structured system. Depth is communicated via explicit border boundaries and background color changes rather than heavy drop shadows.

**The Flat-By-Default Rule.** Surfaces and cards are flat at rest. Subtle, low-contrast shadows appear only during active state responses (such as button hovers or modal/dialog overlays).

### Shadow Vocabulary
- **Interactive Hover** (`box-shadow: 0 6px 16px rgba(220, 131, 78, 0.35)`): Used on primary button hover states.
- **Overlay depth** (`box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15)`): Used for floating overlays, galleries, and modals.

## 5. Components

### Buttons
- **Shape:** Softly curved corners (8px radius / `{rounded.md}`).
- **Primary:** Background color Ochre Sand (`#dc834e`), text color white. Uses 12px 24px padding.
- **Hover / Focus:** Changes background to primary-hover (`#9e5d36`), translates 2px upward, and casts a subtle warm drop shadow (`box-shadow: 0 6px 16px rgba(220, 131, 78, 0.35)`).
- **Secondary:** Transparent background with a border matching the primary color or abyssal blue.

### Cards / Containers
- **Corner Style:** Softly curved corners (8px radius / `{rounded.md}`).
- **Background:** Flat white (`#ffffff`) or Limestone Cream (`#f5f0e8`).
- **Shadow Strategy:** Flat at rest; no ambient shadow.
- **Border:** Thin solid border (`1px solid #e5e5e5`).
- **Internal Padding:** Responsive padding scaled between 16px (`{spacing.md}`) and 24px (`{spacing.lg}`).

### Inputs / Fields
- **Style:** Thin border (`1px solid #e5e5e5`), soft radius (`8px` / `{rounded.md}`), flat white background.
- **Focus:** Border shifts to primary color (`#dc834e`) with a crisp outline or glow.

### Navigation
- **Style:** Flat top nav utilizing Dark Abyssal Blue (`#202f59`) or white backdrops depending on hero integration.
- **Typography:** Aeonik / Poppins body font weight 500, letter-spacing normal.

## 6. Do's and Don'ts

### Do:
- **Do** wrap display and headline headings using `text-wrap: balance` to maintain balanced visual columns.
- **Do** use exact color contrast to ensure body text and form labels are fully legible against background tints.
- **Do** preserve the flat-by-default visual strategy, utilizing clean borders (`#e5e5e5`) to divide space.

### Don't:
- **Don't** use generic SaaS landing-page clichés (like flat gray color scales or tiny tracked eyebrow titles above every section).
- **Don't** clutter booking flows with flashing badges, cheap discount badges, or intrusive popups.
- **Don't** animate image scale or rotation on hover (this is an AI visual tell; animate card backgrounds, borders, or shadows instead).
- **Don't** use side-stripe borders (e.g. `border-left` thicker than 1px as a colored accent on cards or callouts).
