# Audentix Rebranding Plan

## Overview
This document outlines the comprehensive plan to rename the entire project from "Audentix" to "Audentix" (with domain audentix.com).

---

## Clarifying Questions & Assumptions

If you disagree with any of these assumptions, please let me know before I proceed:

| # | Question | Assumption Made |
|---|----------|-----------------|
| 1 | Folder name? | Rename `audentix` → `audentix` (not audentix-v1) |
| 2 | Email domain? | Change `hello@audentix.com` → `audentix@gmail.com` strictly use this|
| 3 | Product names? | Change "Audentix Analytics" → "Audentix Analytics", etc. |
| 4 | Testimonials? | Update company references, keep quote text as-is |
| 5 | Sanity/Blog folder? | Rename "audentix-blog" → "audentix-blog" |

---

## Scope of Changes

### 1. Project Configuration Files
- [`package.json`](package.json:1) - name: "audentix" → "audentix"
- [`index.html`](index.html:1) - title, description → "Audentix"
- [`vite.config.ts`](vite.config.ts:1) - verify no qubit refs
- [`tailwind.config.js`](tailwind.config.js:1) - verify no qubit refs
- [`tsconfig.json`](tsconfig.json:1) - verify no qubit refs

### 2. Source Code Files
- [`src/App.tsx`](src/App.tsx:1) - all qubit → audentix
- [`src/main.tsx`](src/main.tsx:1) - verify
- [`src/components/layout/Navbar.tsx`](src/components/layout/Navbar.tsx:1) - "Audentix Technologies" → "Audentix"
- [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx:1) - "Audentix" → "Audentix"
- [`src/components/sections/Features.tsx`](src/components/sections/Features.tsx:1) - "Audentix" → "Audentix"
- [`src/components/sections/Hero.tsx`](src/components/sections/Hero.tsx:1) - verify
- [`src/components/sections/Contact.tsx`](src/components/sections/Contact.tsx:1) - verify
- [`src/pages/Products.tsx`](src/pages/Products.tsx:1) - "Audentix Analytics" → "Audentix Analytics", etc.
- [`src/data/testimonials.ts`](src/data/testimonials.ts:1) - update company refs
- [`src/lib/errorHandler.ts`](src/lib/errorHandler.ts:1) - header comment

### 3. Documentation Files
- [`README.md`](README.md:1) - all qubit → audentix
- [`EMAILJS_SETUP.md`](EMAILJS_SETUP.md:1) - all qubit → audentix, @audentix.com → @audentix.com
- [`EMAIL_QUICK_START.md`](EMAIL_QUICK_START.md:1) - all qubit → audentix

### 4. Additional Files
- [`prompt/index.html`](prompt/index.html:1) - all qubit → audentix, @audentix.com → @audentix.com
- [`newFolder/package.json`](newFolder/package.json:1) - name: "audentix-blog" → "audentix-blog"
- [`newFolder/sanity.config.ts`](newFolder/sanity.config.ts:1) - title: "audentix-blog"
- [`plans/*.md`](plans/) - update references

### 5. Build Artifacts
- Clear `dist/` folder (will rebuild)

### 6. Manual Step
- Rename folder: `audentix` → `audentix` (you need to do this manually)

---

## Replacements Summary

| Search | Replace |
|--------|---------|
| `qubit` | `audentix` |
| `Audentix` | `Audentix` |
| `Audentix` | `audentix` |
| `Audentix` | `Audentix` |
| `audentix` | `audentix` |
| `@audentix.com` | `@audentix.com` |
| `audentix.com` | `audentix.com` |
| "Audentix Analytics", "Audentix Cloud", etc. | "Audentix Analytics", "Audentix Cloud", etc. |

---

## Approve & Proceed

Please confirm if this plan looks good, or let me know what changes you want:

1. **Approve** - Switch to Code mode and I'll execute the plan
2. **Modify** - Tell me what assumptions to change
