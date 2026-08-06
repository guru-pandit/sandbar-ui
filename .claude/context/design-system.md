# Design System — Panux UI Brand & Token Spec

This file is the brand/visual source of truth. For the token *architecture* (tiers, layering, theme engine mechanics), see `architecture.md` §Design Token System — this file covers the actual values, voice, and visual identity that fill that architecture.

## Identity
| | |
|---|---|
| Name | Panux UI |
| Tagline | *The container for your interface.* |
| Domain | `panux-ui.design` (fallback `panuxui.com`, `usepanux.dev`) |
| npm scope | `@panux-ui` |
| GitHub | `panux-ui/panux-ui` |
| CLI binary | `panux` |

## Mark & Wordmark
- **Mark**: a minimal open container — an outlined rounded-square with an open top edge, readable at 16px favicon size. Has a monogram "S" negative-space variant for social avatars.
- **Wordmark**: lowercase `panux`, geometric grotesque (Inter Display or Geist), tight tracking, no ligature tricks.

## Brand Color
Deep teal-to-slate accent, `#0F766E` family — deliberately distinct from MUI blue, Chakra teal-green, and shadcn neutral-zinc. Neutrals are a **true cool gray**, not blue-tinted (a common tell that a "neutral" scale was derived carelessly from the accent hue). This becomes the `accent` semantic token group's solid step; the full 12-step scale (Radix Colors model) is generated from this seed, not hand-picked per step.

## Typography
- **UI**: Inter
- **Code**: Geist Mono or JetBrains Mono
- **Marketing headings only** (landing page, blog — never component UI): Inter Display
- Loaded via `next/font` in `apps/docs`; `packages/react` ships font-agnostic components — it sets `font-family` via a semantic token that consumers can override, never hardcodes a font import into a component

## Originality Requirement
The docs site and every component's visual design must NOT visually match Chakra UI, Radix, shadcn/ui, MUI, Mantine, Ant Design, or any other public component-library docs site — not the color system, not the typography, not the spacing, not the overall layout rhythm. The code-block syntax-highlighting theme is part of this: it must be a custom, on-brand palette built from the tokens below, never a copied default like "GitHub Dark" or "Dracula" verbatim. This is a hard requirement, checked on every component page (see `architecture.md` §Design & Quality Gates).

## Illustration Style
Geometric line diagrams and anatomy schematics — **not** 3D renders or gradients. Docs anatomy diagrams (showing a compound component's part structure, e.g. `Dialog.Root > Dialog.Content > Dialog.Title`) are themselves part of the brand and should follow this same line-diagram style consistently across every component page.

## Voice
Direct, technical, unhyped. Write like a good API reference: short sentences, concrete nouns, no marketing superlatives. **Never** call anything "beautiful," "blazing fast," or "magical" — state what it does and what it costs. This applies to: docs prose, component descriptions, changeset summaries, CLI output, and error messages. An error message explains the problem and the fix, nothing else — no cute copy.

## Naming Conventions Recap (full detail in `CLAUDE.md`/`coding-standards.md`)
- CSS variables: `--panux-` prefix
- Internal DOM hooks: `data-panux-*`
- Theme class: `.panux-ui-theme`, mode via `data-theme="light | dark | contrast"`
- Storybook titles: `PanuxUI/<Category>/<Component>`

## Accessibility Baseline — WCAG 2.2 AA (see `testing-strategy.md` for the test gate)
- Every token *pairing* actually used together (e.g. `fg.default` on `bg.canvas`, `fg.onAccent` on `accent.solid`) must hit 4.5:1 for normal text / 3:1 for large text — verify pairings, not tokens in isolation, since a token can pass against one background and fail against another
- Color is never the only differentiator for state — pair with an icon, text, or pattern (e.g. `Alert` variant differs by icon + label, not tint alone)
- Visible focus ring on every interactive element, styled via a `focus.ring` semantic token — never `outline: none` without a token-driven replacement
- Motion respects `prefers-reduced-motion` — every animation/transition token has a reduced-motion fallback (near-instant or none), not just "less" motion

## Anatomy Diagram Convention (docs site)
Every component page's anatomy diagram is a labeled line-drawing of the compound structure — the outer box, each part's boundary, and its data attributes/role — rendered as SVG, matching the illustration style above. This is generated/maintained per component, not a generic screenshot of the rendered UI.
