# Docs Page Pattern — the house standard for `apps/docs`

Authoritative spec for **what a docs page contains and how the docs shell is laid out**. `architecture.md` owns the site IA (routes, sidebar order); this file owns the anatomy of the pages themselves and the components that build them.

**Reference standard:** the structure and completeness bar is Chakra UI's / Ant Design's component docs — a components index of preview cards, a category sidebar, a long per-component page of live galleries, a recipe-customization section, auto-generated props tables, and a right-rail TOC.

> **We copy the information structure, never the visual design.** Colors, typography, spacing, card shape, code-block theme, and every other visual decision come from `design-system.md` and must not resemble Chakra, Radix, shadcn/ui, MUI, Mantine, or Ant (`design-system.md` §Originality Requirement — a merge gate). If a page ends up *looking* like the reference, it has failed, even if the sections are right.

---

## 1. Docs shell (every `/docs/*` page)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Top nav:  [logo+wordmark]  Docs · Blog · Guides        ⌘K search  ·      │
│                                          version ▾ · GitHub · theme ▾    │
├──────────────────────────────────────────────────────────────────────────┤
│ Section tabs:  Get Started | Components | Styling | Theming              │
├───────────────┬────────────────────────────────────┬─────────────────────┤
│ Sidebar       │ Content                            │ On this page (TOC)  │
│ (categories)  │                                    │ (component pages)   │
└───────────────┴────────────────────────────────────┴─────────────────────┘
```

**Top nav** — left: mark + `panux` wordmark, then primary links (Docs, Blog, Guides). Right: search field showing the `⌘K` hint, version dropdown, GitHub link, theme switcher. The theme switcher lives in the **top-right of the top navbar** via Fumadocs' `DocsLayout` `themeSwitch.component` slot — not `nav.children`, which renders it cramped beside the sidebar title.

**Section tabs** — a second row directly under the top nav switching doc sections: **Get Started · Components · Styling · Theming**. The active tab is visually marked; switching tabs swaps the sidebar tree.

**Sidebar** — one non-link group heading per category (Layout, Typography, Buttons, Forms, …) in canonical order from `architecture.md` §Component Scope, each listing its components in that fixed order. Active page highlighted, own scroll container, sticky under the tabs, collapsible on mobile.

**Right rail (`On this page`)** — auto-generated from the page's own `##`/`###` headings, sticky, active section highlighted on scroll, and below it: "Edit this page on GitHub" and "Scroll to top". Present on every component and hook page.

---

## 2. Components index page (`/docs/components`)

The landing page for the Components tab. Required elements, in order:

1. `# Components` + one-line description.
2. A **searchable, responsive card grid** — 4 columns at `xl`, 3 at `lg`, 2 at `md`, 1 at `sm`. Cards sorted alphabetically across all categories (not grouped — the sidebar does the grouping), with a category filter.
3. **Each card is:**
   - a **preview thumbnail** (~16:10, muted surface) containing a **miniature live render of the real component** — not a screenshot, not an icon, not a placeholder. It uses the actual `@panux-ui/react` export at reduced scale, non-interactive (`pointer-events: none`, `aria-hidden`) so the whole card is one link target.
   - the component **name**,
   - a **one-line description** — the same sentence used as the component page's `description` frontmatter and its sidebar tooltip. Write it once, reuse it; no drift.
   - the whole card is a single link to `/docs/components/<slug>`, keyboard focusable with a visible focus ring.
4. Top-right of the content column: the **Copy Page** control (see §5).

A component that exists in `packages/react/src/` but has no card on this page is **not shipped** — the index is generated from the same source list as the sidebar, so adding a component must add its card.

---

## 3. Component page anatomy (`/docs/components/<slug>.mdx`)

Every section below is required and appears **in this order**. Sections marked *(interactive only)* may be omitted for a purely presentational component (e.g. `Box`) — the omission must be deliberate, not an oversight.

### 3.1 Header
- `# <Component>` (H1) and a one-line description directly under it — plain, functional, no marketing ("Used to trigger an action or event"), matching the `description` frontmatter and the index card.
- A status badge: `stable` / `beta` / `experimental`.
- A row of top-right links: **Source** (GitHub), **Recipe** (`<Component>.css.ts`), **Storybook**, and the **Copy Page** control.

### 3.2 Usage
The `## Usage` heading, then:
1. An **import block** — `import { Button } from '@panux-ui/react'` — highlighted, with a copy button.
2. The **base markup** snippet showing the minimal composition (for compound components, the full part tree).
3. One primary `Example` block (§4) — the canonical, live rendering.

### 3.3 Examples
`## Examples`, then **one `###` subsection per prop or capability axis**. Each subsection is:
- a one-line sentence naming the prop and what it does ("Use the `size` prop to change the size of the button."), then
- an `Example` block whose preview renders **every value of that axis side by side, live**.

**Not acceptable:** a single interactive demo with a dropdown to switch values; prose listing the values without rendering them; a static image. The reader must see all values at once.

Axis subsections come from the component's actual recipe and props. The standard set, in this order where applicable:

| Order | Subsection | Renders |
|---|---|---|
| 1 | Sizes | every `size` value side by side |
| 2 | Variants | every `variant` value side by side |
| 3 | Colors | every `colorScheme` × `variant` as a labelled grid |
| 4 | Radius | every `radius` value, semantic and core steps |
| 5 | With Icon | leading/trailing icon composition |
| 6 | Disabled | disabled state, plus the disabled-link caveat where relevant |
| 7 | Loading | loading state, and the spinner-placement / custom-spinner variations |
| 8 | Grouped | composition with `Group`/`ButtonGroup`/`Stack` |
| 9 | Controlled / Uncontrolled | *(stateful components)* both modes, side by side |
| 10 | Responsive | responsive prop values across breakpoints |
| 11 | As Link / `asChild` | polymorphism escape hatch |
| 12 | *component-specific* | anything the component uniquely does (split menu, spinner placement, range selection, …) |

### 3.4 Ref
`### Ref` — a code block showing how to take a ref and what element type it resolves to. One block, no live preview needed.

### 3.5 Customization
`## Customization`, opening with the CLI line that ejects the recipe into the consumer's project (`npx panux add <component>` / `panux theme`), then these four subsections, each with a **complete recipe file** and a short usage snippet showing the new value in use:

1. `### Adding a new variant`
2. `### Adding a new size`
3. `### Changing the default size` — via `defaultVariants.size` in the recipe, never a prop default in the `.tsx`
4. `### Changing the default variant` — via `defaultVariants.variant`

### 3.6 Props
`## Props` — **auto-generated** from TypeScript via `react-docgen-typescript` (`scripts/generate-props-tables.mjs` → `.generated/props-tables.json` → `PropsTable.tsx`). One table per sub-component (tabbed or stacked under `### <Component>.<Part>` headings). Columns: **Prop / Default / Type**, with the description under or beside the type, and the full union expanded in the type cell. Inherited HTML props are acknowledged in a footer note, not enumerated.

**Never hand-written.** A hand-written props table is a defect, not a shortcut.

### 3.7 Data attributes
`## Data Attributes` — table of every `data-*` styling hook the component emits: attribute, the values it can take, and when it is present (`data-state="open|closed"`, `data-disabled`, `data-side`, …).

### 3.8 CSS variables
`## CSS Variables` — table of the component tokens (`--panux-<component>-*`) a consumer can override, with default value and what it controls.

### 3.9 Keyboard interactions *(interactive only)*
`## Keyboard Interactions` — table of key → behavior, matching the WAI-ARIA Authoring Practice for the pattern. This table and the component's keyboard tests must match 1:1 (`testing-strategy.md`).

### 3.10 Accessibility
`## Accessibility` — the ARIA pattern implemented, roles/states/properties, focus management, screen-reader behavior, and any caveat or consumer responsibility (e.g. "`Float` requires a positioned parent").

### 3.11 Composition
`## Composition` — one or more real-world recipes combining this component with others, each a live `Example` (e.g. Combobox inside Dialog inside Form).

### 3.12 Styling
`## Styling` — how to override: `className`, extending the recipe, and setting CSS variables per instance. One live example per approach.

### 3.13 Footer
Previous / Next links to the sibling components in **sidebar order**, wired automatically — not hand-maintained per page.

---

## 4. The `Example` block

`apps/docs/app/components/Example.tsx` is the reference implementation; do not fork it per page.

- **Preview tab (default):** the live, interactive, real component. Fully functional — every documented prop actually takes effect.
- **Code tab:** the exact source for what the preview renders. Never paraphrased, never a shortened "roughly this" version.
- **Copy button:** copies the source; shows a transient confirmation.
- **Sandbox link:** "Open in StackBlitz/CodeSandbox" per example.
- **Highlighting:** custom on-brand Shiki theme (`app/shiki.css`), light + dark. No monochrome code blocks. No stock theme (GitHub Dark, Dracula, Nord) used verbatim.

Demo components live in `apps/docs/app/components/ComponentDemos.tsx` and are registered in `apps/docs/app/docs/[[...slug]]/page.tsx`'s `mdxComponents` map. One named export per example, `<Component><Axis>Example` (e.g. `ButtonSizesExample`).

---

## 5. Copy Page control

Top-right of every docs page: a split control — primary action copies the page as Markdown; the dropdown offers "View as Markdown", "Copy page URL", and "Open in ChatGPT/Claude". Backed by the per-page `.md` endpoint and `llms.txt`.

---

## 6. Hook page anatomy (`/docs/hooks/<slug>`)

Signature block · parameters table · return-shape table · one minimal live example · one real-world live example · SSR/RSC notes · related hooks. Same shell, same TOC, same Copy Page control.

---

## 7. Page QA checklist (blocks merge)

Run for every page before a component is called done:

- [ ] Every section in §3 present and in order (or deliberately N/A with a reason)
- [ ] Index card exists, thumbnail renders the **real** component, description matches frontmatter
- [ ] Every `### ` axis subsection renders **all** values side by side, live
- [ ] Every preview is interactive, functional, and reflects the prop it demonstrates
- [ ] Zero console errors/warnings on the page
- [ ] Every code block syntax-highlighted with the custom theme; copy button works
- [ ] Code tab source matches the preview exactly
- [ ] Props table auto-generated and matching the real API (no drift, no hand-writing)
- [ ] Data-attributes and CSS-variables tables match what the component actually emits
- [ ] Keyboard table matches the component's keyboard tests 1:1
- [ ] Light, dark, and contrast modes all correct; RTL correct where directional
- [ ] Right-rail TOC complete; prev/next wired to sidebar neighbours
- [ ] axe-core: zero violations on the rendered page
- [ ] Visual design does not resemble any reference library (`design-system.md` §Originality Requirement)

---

## 8. Known gaps in existing pages

The Phase 1 (Layout) and early Typography pages predate this file and stop after `## Props`. They are missing: Data Attributes, CSS Variables, Accessibility, Composition, Styling, Ref, the four-part Customization section, index cards, and prev/next. **Backfill them to this spec before Phase 2 (Typography) is called complete** — do not carry the shortfall forward into new pages.
