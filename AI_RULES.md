# AI_RULES.md
# PlotFinder / IndiaLand – Product System & AI Coding Rules

---

# 🎯 Purpose

This file defines **strict UI, UX, and coding rules** for all AI-generated code.

Any AI (LLM/agent/codegen) working on this project MUST:

✅ follow design system  
✅ follow layout rules  
✅ use same colors/spacing  
✅ keep UI consistent  
✅ generate production-quality code  

AI must NOT invent styles or structures outside this document.

---

# 🧠 Product Vision

A clean, trustworthy, professional **Land & Plot Marketplace SaaS** for India.

Style keywords:
- Minimal
- Real estate focused
- Premium
- Trust-first
- Not flashy

Avoid:
- fancy gradients
- too many colors
- dark themes
- experimental UI
- startup gimmicks

Think: MagicBricks + Stripe + Notion simplicity

---

# 🎨 COLOR SYSTEM

## Brand Colors

Primary Green (CTA, prices)
#16A34A

Primary Dark
#15803D

Primary Light
#DCFCE7


## Neutrals

Background
#F4F4F5

Section Background
#FFFFFF

Border
#E5E7EB

Text Primary
#111827

Text Secondary
#6B7280

Muted
#9CA3AF


## Status Colors

Success
#22C55E

Warning
#F59E0B

Error
#EF4444

Info
#3B82F6

Verified Badge
#10B981


## Color Rules

- Green ONLY for CTA and price
- Max 2 accent colors per screen
- Avoid random colors
- Keep backgrounds mostly white/light gray

---

# 🔤 TYPOGRAPHY

Font Family:
Inter, system-ui, sans-serif

## Font Scale

Hero      48px bold
H1        36px bold
H2        28px semibold
H3        22px semibold
Body      16px regular
Small     14px
Caption   12px

Rules:
- Bold only headings and prices
- Never bold long paragraphs
- No custom fonts

---

# 📐 SPACING SYSTEM

Use 4px grid only.

4   xs
8   sm
12
16  md
20
24  lg
32  xl
40
48
64  2xl

Rules:
- cards: p-6 or p-8
- sections: py-16 or py-20
- avoid random spacing values

---

# 🧱 LAYOUT SYSTEM

Container:
max-w-7xl mx-auto px-6

Grid:
Mobile: 1 column
Tablet: 2 columns
Desktop: 3–4 columns

Sections:
vertical spacing consistent

Use whitespace generously.

---

# 🧩 COMPONENT RULES

---

## Buttons

Primary:
- bg green
- text white
- rounded-xl
- px-6 py-3

Secondary:
- border
- white bg
- green text

Ghost:
- text only

Rules:
- only 1 primary CTA per section
- never stack many primary buttons

---

## Cards (Property Card)

Must contain:
- image
- price
- title
- location
- 3–4 attributes
- CTA

Style:
- rounded-2xl
- shadow-sm
- hover: shadow-md
- border

---

## Badges

For:
- RERA Approved
- Verified
- New Launch
- Featured

Style:
- text-xs
- rounded-full
- px-3 py-1
- light background

---

## Inputs

- height 44px
- rounded-xl
- border
- focus green ring
- full width

---

## Navbar

Structure:
Logo | Links | Post Property CTA | Profile

Rules:
- sticky
- white background
- subtle shadow

---

# 🏗 CORE FEATURES (Product Requirements)

---

## Authentication
- email/password
- Google login
- role: buyer/seller/admin

---

## Property Listing
Seller can:
- upload multiple images
- price
- area
- type
- ownership
- location (map pin)
- description
- documents

---

## Search & Filters
- city
- budget range
- area range
- type
- facing
- verified
- sort

---

## Property Detail Page
Must include:
- gallery
- price highlight
- location map
- seller info
- contact buttons
- legal docs
- similar properties

---

## Admin Dashboard
- approve/reject listings
- verify properties
- manage users
- moderate spam

---

# 🖥 REQUIRED PAGES

1. Home
2. Listings (grid + filters)
3. Property Detail
4. Post Property (form)
5. Dashboard (seller)
6. Admin panel
7. Auth pages

---

# 🔄 USER FLOWS

---

## Buyer Flow

Home
→ Search
→ Filter
→ Property Detail
→ Contact Seller
→ Lead created

---

## Seller Flow

Login
→ Post Property
→ Upload details
→ Submit
→ Admin approval
→ Receive leads

---

## Admin Flow

Dashboard
→ Review listing
→ Approve/Reject
→ Manage users

---

# 🧠 UX RULES

Real estate = TRUST

Always show:
- verified badge
- price clearly
- ownership type
- documents
- map location
- contact info

Avoid:
- clutter
- heavy animations
- confusing layouts

Every page must have clear CTA.

---

# ⚙️ TECH STACK RULES

Stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Auth + Firestore + Storage)

---

# 🤖 AI CODING RULES (CRITICAL)

AI MUST:

- use TypeScript only
- use Tailwind only
- create reusable components
- follow folder structure
- use server components where possible
- write clean readable code
- use semantic HTML

AI MUST NOT:

- add random libraries
- use inline styles
- use CSS files
- duplicate components
- overcomplicate logic
- add unnecessary animations

---

# 📁 PROJECT STRUCTURE

app/
components/
  ui/
  property/
  layout/
lib/
firebase/
types/
hooks/
utils/

---

# 🎯 DESIGN PHILOSOPHY (FINAL RULE)

When unsure:

Choose:
- simpler
- cleaner
- more whitespace
- fewer elements

Never:
- add complexity
- add decoration without purpose

Trust + clarity > fancy UI
