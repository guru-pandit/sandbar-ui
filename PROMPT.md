# Prompt: Build **Panux** — A Complete React / Next.js Design System

You are a senior frontend architect, design-systems engineer, and technical writer. Build **Panux**: a complete, accessible, deeply themeable component library and design system for **React 19** and **Next.js 15 (App Router)**, with a documentation site as thorough as Material UI's and Ant Design's.

Panux should be as capable and complete as MUI, Ant Design, Chakra, and Radix — but it is **its own system**. Do not copy any library's component API, theme shape, class names, prop names, visual language, or docs layout. Where those libraries converge on a good idea (compound components, design tokens, controlled/uncontrolled state), adopt the *idea*, not the *implementation*. Panux's conventions (`--panux-` variables, `data-panux-*` attributes, recipe-based styling, the token tiers below) are the source of truth. If a request would make Panux resemble another library's surface, choose Panux's own convention instead.

---

## 0. Brand

| Field | Value |
|---|---|
| **Name** | Panux |
| **Tagline** | *The container for your interface.* |
| **Domain** | `panux-ui.dev` (fallbacks: `panux-ui.com`, `usepanux.dev`) |
| **npm scope** | `@panux-ui` |
| **GitHub** | `panux-ui/panux-ui` |

### Packages

| Package | Purpose |
|---|---|
| `@panux-ui/react` | Main styled component package |
| `@panux-ui/core` | Headless primitives, hooks, context (no styles) |
| `@panux-ui/tokens` | Design tokens, theme contract, color scales |
| `@panux-ui/icons` | Tree-shakeable SVG icon set |
| `@panux-ui/themes` | Prebuilt themes + theme-builder logic |
| `@panux-ui/cli` | Scaffolding, `add`, codemods, theme export |
| `@panux-ui/eslint-plugin` | Misuse detection + a11y lint rules |
| `@panux-ui/test-utils` | Render helpers, a11y assertions, user-event wrappers |

CLI binary is `panux`: `npx panux init`, `npx panux add dialog`, `npx panux theme`, `npx panux migrate`.

### Visual Identity

- **Mark:** a minimal panux glyph — two stacked horizontal strokes (a bar above a wave line) inside a rounded square, legible at 16px. A negative-space "S" variant serves as the social avatar.
- **Wordmark:** lowercase `panux`, geometric grotesque (Geist or Inter Display), tight tracking.
- **Brand accent:** deep teal-slate (`#0F766E` family) — deliberately unlike MUI blue, Ant blue, Chakra green, shadcn zinc. Neutrals are a true cool gray.
- **Typography:** Inter (UI), Geist Mono / JetBrains Mono (code), Inter Display (marketing headings only).
- **Illustration:** geometric line diagrams and component-anatomy schematics, never 3D renders or stock gradients.

### Voice

Direct, technical, unhyped. Write like a good API reference: short sentences, concrete nouns, no superlatives ("beautiful," "blazing fast," "magical" are banned). State what a thing does and what it costs. CLI output and error messages explain the problem and the fix — nothing else.

### Reserved Namespaces (never collide with these)

- CSS variables: `--panux-` prefix (e.g. `--panux-color-bg-canvas`, `--panux-space-4`, `--panux-radius-md`)
- Data attributes: `data-panux-*` for internals; state hooks use `data-state`, `data-disabled`, `data-side`, `data-orientation`, `data-highlighted`, `data-selected`
- Theme root: `.panux-ui-theme` with `data-theme="light | dark | contrast"` and `data-accent="<scale>"`
- Recipe class prefix: `panux-<component>` (e.g. `panux-button`, `panux-button--solid`)
- Storybook titles: `Panux/<Category>/<Component>`

---

## 1. Architecture

**Monorepo:** pnpm workspaces + Turborepo + Changesets.

```
panux/
├─ packages/
│  ├─ core/           # @panux-ui/core          — headless primitives, hooks, context
│  ├─ react/          # @panux-ui/react         — styled components (main package)
│  ├─ tokens/         # @panux-ui/tokens        — design tokens, theme contract
│  ├─ icons/          # @panux-ui/icons         — SVG icon set
│  ├─ themes/         # @panux-ui/themes        — prebuilt themes + builder
│  ├─ cli/            # @panux-ui/cli
│  ├─ eslint-plugin/  # @panux-ui/eslint-plugin
│  └─ test-utils/     # @panux-ui/test-utils
└─ apps/
   ├─ docs/           # Next.js docs site (panux-ui.dev)
   ├─ playground/     # dev sandbox
   └─ storybook/
```

**Build:** tsup (ESM + CJS + `.d.ts`), `"sideEffects": false`, per-component entry points for tree-shaking, `"use client"` only on interactive components. Every package is independently versioned and publishable.

**Styling engine:** Zero-runtime, compile-time CSS via CSS variables + a recipe system (choose vanilla-extract *or* Panda CSS in the ADR). No runtime CSS-in-JS. Every component renders correctly as a React Server Component with no hydration cost for static parts. Styling variants are defined as **recipes** — typed functions mapping `variant`/`size`/`etc.` to class names.

---

## 2. Design Tokens

Four-tier token architecture (deeper than the previous draft):

1. **Primitive tokens** — raw, mode-agnostic values:
   - Full color scales (see §3)
   - Space scale: `0, px, 0.5, 1, 1.5, 2 … 24, 28, 32, 40, 48, 56, 64` (4px base grid)
   - Font families, font sizes (`xs → 9xl`), line heights, letter spacing, font weights (`100 → 900`)
   - Radii: `none, xs, sm, md, lg, xl, 2xl, 3xl, full`
   - Border widths, shadows (`xs → 2xl`, plus `inner`), blurs
   - Z-index scale (named: `hide, base, docked, dropdown, sticky, banner, overlay, modal, popover, toast, tooltip, max`)
   - Durations (`instant → slowest`) and easings (`linear, ease, emphasized, decelerate, accelerate, spring`)
   - Breakpoints: `xs, sm, md, lg, xl, 2xl`
2. **Semantic tokens** — role aliases resolved per mode: `bg.canvas / bg.subtle / bg.muted / bg.emphasis`, `fg.default / fg.muted / fg.subtle / fg.onAccent`, `border.default / border.muted / border.focus`, `accent.solid / accent.hover / accent.active / accent.subtle / accent.text`, plus `success / warning / danger / info` families each with `solid / subtle / text / border`.
3. **Component tokens** — per-component variables consuming semantic tokens (`--panux-button-bg`, `--panux-input-border`), overridable per instance.
4. **Density & scale modifiers** — a global `density` (`comfortable | compact`) and `scaling` (`0.9 → 1.1`) that rescale space and font tokens without touching component code.

**Requirements:** a typed theme contract (full autocomplete), light / dark / high-contrast modes via `data-theme`, no FOUC (inline blocking theme script), runtime theme override via `ThemeProvider`, per-subtree theming (nested providers), and a CSS-var-only output so themes can be swapped without re-rendering React.

---

## 3. Color System

Ship a complete, self-owned color system — do not reuse another library's palette values.

- **12-step scales** (Radix Colors *model*, Panux's *own* hue values), each in light and dark, plus **alpha** variants of every scale for overlays.
- **Scales to ship:** `gray, mauve, slate, sage` (neutrals) + `teal (brand), blue, indigo, violet, purple, pink, crimson, red, orange, amber, yellow, lime, green, cyan, sky, bronze, gold` and semantic aliases `accent, success, warning, danger, info`.
- **Step semantics documented** (1–2 backgrounds, 3–5 component backgrounds, 6–8 borders, 9–10 solid, 11–12 text) so consumers know which step to use where.
- **Contrast:** every foreground/background pairing that Panux emits must pass WCAG 2.2 AA; document the pass/fail matrix.
- **Utilities:** a `createScale(hue)` generator, `getContrastText(bg)`, alpha-compositing helpers, and a P3 wide-gamut variant behind `@media (color-gamut: p3)`.
- **Accent swap:** changing `data-accent="violet"` re-skins the whole system from one attribute — every component reads `accent.*`, never a hardcoded hue.

Deliver a **color reference page** in docs: interactive swatches for all scales × steps × light/dark, click-to-copy token names, contrast readouts, and a live accent picker.

---

## 4. Component Catalog

Ship every component below. Each is a compound component where it has sub-parts. `†` marks components that are headless-first in `@panux-ui/core` and styled in `@panux-ui/react`.

### Layout & Primitives
Box, Flex, Grid, SimpleGrid, Stack (HStack/VStack), Wrap, Container, Section, Center, Circle, Square, Spacer, AspectRatio, Bleed, Divider, Separator, ScrollArea†, Portal†, VisuallyHidden, Show/Hide (responsive), ClientOnly, Slot†, For (list helper).

### Typography
Heading, Text, Prose (long-form MDX styling), Link, Highlight, Mark, Code, Kbd, Blockquote, List (Ordered/Unordered/Description), Em, Strong, Truncate.

### Forms & Inputs
Button, IconButton, ButtonGroup, ToggleButton, ToggleGroup†, Input, InputGroup (addons/elements), Textarea (auto-resize), NumberInput, PinInput†, PasswordInput, SearchInput, Select† (native + custom), MultiSelect, Combobox/Autocomplete†, Checkbox, CheckboxGroup, Radio, RadioGroup†, Switch, Slider†, RangeSlider†, RatingGroup†, SegmentedControl†, TagsInput†, ColorPicker†, FileUpload† (drag-drop, preview), DatePicker†, DateRangePicker†, TimePicker†, DateTimePicker, Calendar†, Cascader†, TransferList†, Editable (inline edit)†, Field (Label/HelperText/ErrorText/RequiredIndicator), Fieldset, Form (validation adapter for RHF/Zod).

### Overlays & Disclosure
Dialog/Modal†, Drawer†, Popover†, Tooltip†, HoverCard†, Menu/Dropdown† (nested, checkbox/radio items), ContextMenu†, Toast/Notifications† (queue, promise API), AlertDialog†, CommandPalette† (Cmd+K), Sheet, Accordion†, Collapsible†, Disclosure†.

### Navigation
Tabs† (line/enclosed/soft variants), Breadcrumb, Pagination†, Stepper†/Steps, NavigationMenu† (mega-menu), Sidebar (collapsible, nested), Menubar†, Anchor/TableOfContents (scroll-spy), BackTop, Link, SkipNav.

### Data Display
Table (base), DataTable† (sorting, multi-select, column resize/reorder/pin, virtualization, expandable rows, sticky header/footer), DataGrid (editable cells), Card, Avatar, AvatarGroup, Badge, Tag/Chip (closable), Label, List, Stat/Statistic (with trend), Timeline, Tree/TreeView†, Descriptions (key-value), Accordion, Carousel†, Image (with fallback/skeleton), Gallery, Code/CodeBlock (with copy), Kbd, EmptyState, Calendar (display), Comment/Thread.

### Feedback & Status
Alert, Banner/Callout, Spinner, Progress (linear), CircularProgress, Skeleton (text/circle/rect + shimmer), Toast, Result (success/error/404/403/500 pages), Loader/Overlay (blocking), Watermark.

### Utilities & Behavior
FocusTrap†, Presence† (mount/unmount animation), Transition, Collapse, Portal†, DismissableLayer†, RovingFocusGroup†, Slot†, Affix (sticky-on-scroll), ResizeHandle, Splitter/Resizable panels†, InfiniteScroll†, VirtualList†.

**Per component ship:** compound implementation, recipe with all variants/sizes/colorSchemes, controlled + uncontrolled state, full TS types (generics where needed), ref + DOM-prop forwarding, ARIA per WAI-APG, and the docs page from §8.

---

## 5. Hooks (`@panux-ui/core`)

Export a robust hook layer. Each hook is documented on its own docs page with signature, params, return shape, and a live example.

**State & control:** `useControllableState`, `useToggle`, `useBoolean`, `useCounter`, `useSet`, `useMap`, `usePrevious`, `useStateHistory` (undo/redo), `useDefault`.

**Refs & DOM:** `useMergedRefs`, `useCallbackRef`, `useMeasure`, `useSize`, `useResizeObserver`, `useIntersectionObserver`, `useMutationObserver`, `useElementRect`, `useIsomorphicLayoutEffect`.

**Interaction:** `useClickOutside`, `useFocusTrap`, `useFocusReturn`, `useRovingFocus`, `useHover`, `useLongPress`, `usePress`, `useKeyboard`/`useHotkeys`, `useMove`/`useDrag`, `useScrollLock`, `useDismissable`, `useTypeahead`.

**Layout & positioning:** `usePopper`/`useFloating` (Floating UI wrapper), `useAnchoredPosition`, `useOverflow`, `useViewportSize`, `useMediaQuery`, `useBreakpoint`, `useBreakpointValue`, `useColumns`.

**Lifecycle & async:** `useMount`, `useUnmount`, `useUpdateEffect`, `useTimeout`, `useInterval`, `useDebouncedValue`, `useDebouncedCallback`, `useThrottledValue`, `useIdle`, `useAsync`, `usePromise`.

**Storage & environment:** `useLocalStorage`, `useSessionStorage`, `useCookie`, `useColorMode`/`useTheme`, `useReducedMotion`, `useSystemColorScheme`, `useNetworkState`, `useDocumentVisibility`, `useWindowEvent`, `useEventListener`.

**Utility:** `useId`, `useUncontrolled`, `useClipboard`, `useCounter`, `useForceUpdate`, `useFirstRender`, `useDidUpdate`, `useShallowEffect`, `useQueue`, `usePagination`, `useDisclosure`.

Also expose per-component "state hooks" (e.g. `useDialogState`, `useComboboxState`) so advanced users can build fully custom UIs on Panux's behavior without its markup.

---

## 6. Theming API

- `<ThemeProvider theme={...} defaultMode="system" defaultAccent="teal" density="comfortable">` — nestable, each provider scopes a CSS-var subtree.
- `createTheme(overrides)` — deep-merges into the base contract; type-checked against it.
- `createScale(hue)` and `defineRecipe(config)` for extending components.
- **Prebuilt themes** in `@panux-ui/themes`: `panux` (default), `minimal`, `contrast`, `warm`, `dusk`, plus a `radius`/`scaling` preset set.
- `useTheme()`, `useColorMode()` (`{ mode, setMode, toggle, resolvedMode }`), `useToken(path)`.
- **Theme builder** (docs `/themes`): live controls for accent, gray, radius, density, font, scaling → live preview across a component board → export as `theme.ts`, CSS variables, or a `panux add`-compatible config.

---

## 7. API Design Principles

- Compound components for multi-part UIs: `<Dialog.Root><Dialog.Trigger/><Dialog.Content/></Dialog.Root>`.
- `asChild` (Slot merge) as the primary polymorphism escape hatch; `as` prop secondary.
- Controlled **and** uncontrolled for every stateful component (`value` / `defaultValue` / `onValueChange`).
- One consistent variant vocabulary across the whole library: `variant`, `size`, `colorScheme`, `radius`, `density`.
- State exposed as data attributes for styling, never magic class names.
- Full ref + native prop forwarding on every element.
- No prop explosion — overrides go through `className`, recipes, and CSS vars, not dozens of style props.
- Every public type is exported; no `any`; generics for polymorphic and collection components.

---

## 8. Documentation Website (MUI / Ant-Design depth)

`apps/docs` — Next.js 15 App Router, statically generated, built entirely with Panux (primary dogfooding surface), and held to the same a11y and performance bar as the library.

### Stack
Next.js 15 + MDX (Fumadocs or Contentlayer) · live editable playgrounds (Sandpack) · Shiki highlighting (dual theme, line/word highlight) · **auto-generated props tables** from TS source via `react-docgen-typescript` (never hand-written) · full-text search + `Cmd+K` (Panux's own CommandPalette) · per-page OG images via `next/og`.

### Information Architecture
```
/                          Landing page (hero, feature grid, live demo board)
/docs/overview             What Panux is, philosophy, when to use it
/docs/getting-started      Install; setup for Next.js App Router, Vite, Remix, Astro; ThemeProvider wiring; first component
/docs/styling              Recipes, className, CSS vars, style overrides, cx helper
/docs/theming              Contract, createTheme, dark mode, density/scaling, per-subtree themes
/docs/colors               Full interactive color reference (all scales × steps × modes)
/docs/tokens               Every primitive/semantic token, click-to-copy
/docs/dark-mode            Strategy, no-FOUC script, system sync
/docs/responsive          Breakpoints, responsive props, useBreakpointValue
/docs/components           Index (searchable grid) → /docs/components/[slug]
/docs/hooks                Index → /docs/hooks/[slug]
/docs/patterns            Auth form, dashboard shell, data table page, settings page, wizard, command menu, nested overlays
/docs/guides              SSR & RSC, TypeScript, testing, animation, performance & bundle size, i18n & RTL, forms & validation, virtualization
/docs/migration          From MUI, from Ant Design, from Chakra (codemods + mapping tables)
/docs/accessibility       Philosophy, keyboard conventions, focus management, screen-reader matrix, testing method
/docs/cli                 panux init / add / theme / migrate reference
/docs/figma               Design-kit parity notes
/docs/changelog           Generated from Changesets
/docs/roadmap
/blog                     Release notes, design-system deep dives
/themes                   Interactive theme builder + export
/playground               Full-page live editor
/llms.txt                 Machine-readable docs index for AI tools
```

### Every Component Page Must Contain (in order)
1. Title, one-line description, status badge (stable/beta), and category.
2. Import statement with copy button + package name.
3. **Anatomy** — labeled diagram of every compound part with its data attributes.
4. **Usage** — primary live editable example.
5. **Variants gallery** — every `variant` × `size` × `colorScheme` × `radius`, each live.
6. **Feature sections** — one runnable example per capability (states, disabled, loading, with icons, controlled, async, etc.).
7. **Props tables** — auto-generated for the root and *every* sub-component, including inherited HTML props, defaults, and types; deep-linkable rows.
8. **Data attributes** table (styling hooks) and **CSS variables** table (component tokens).
9. **Keyboard interactions** table.
10. **Accessibility** notes — ARIA pattern implemented, roles/states, SR behavior, caveats.
11. **Composition recipes** — real-world combinations (e.g. Combobox inside Dialog inside Form).
12. **Styling** — override via className, recipe extension, and CSS vars, with examples.
13. **API differences from other libraries** callout where relevant (so migrators aren't surprised).
14. Source link (GitHub) + Storybook story link + "Open in Sandbox."

### Every Hook Page Must Contain
Signature, parameter table, return-shape table, one minimal + one real-world live example, SSR notes, and related hooks.

### Site Features
Header theme switcher (light/dark/contrast) that re-themes all examples in place · live accent picker · LTR/RTL toggle applied to examples · density toggle · docs version switcher · copy-as-Markdown on every code block · `llms.txt` + per-page `.md` endpoints · responsive, keyboard-navigable, axe-clean · CI Lighthouse budget (100 a11y, 95+ perf) · sitemap + full SEO metadata.

---

## 9. Accessibility (Non-Negotiable)
WAI-ARIA Authoring Practices for every component: correct roles/states/properties, full keyboard support (arrows, Home/End, typeahead, Escape, focus loops), focus management (trap, restore, initial focus), scroll lock without layout shift, RTL, `prefers-reduced-motion`, live-region announcements, and WCAG 2.2 AA contrast on every emitted pairing. **Gate:** axe-core in CI with zero violations across library and docs; documented VoiceOver/NVDA matrix per component.

---

## 10. Testing & Quality Gates
- Unit + interaction tests (Vitest + Testing Library + `@panux-ui/test-utils`) per component.
- a11y test (axe) per component and per docs page.
- Visual regression (Storybook + Chromatic) — approval required to merge.
- Type tests (`tsd` or `expect-type`) for public generics.
- Bundle budget per component (`size-limit`) — regression blocks merge.
- Coverage: 90%+ on `@panux-ui/core`.
- Matrix: Node 18/20/22 × React 18/19.
- Semantic versioning via Changesets; every change ships a changeset.

---

## 11. DX
- `npx panux init` (framework detection, theme setup, provider wiring), `panux add <component>` (shadcn-style source copy), `panux theme` (builder → export), `panux migrate <mui|antd|chakra>` (codemods).
- Two consumption models: installed npm package **and** copy-in source.
- ESLint plugin: misuse + a11y rules. Codemods for every breaking change.
- SSR-safe by default: no module-scope `window`, `useIsomorphicLayoutEffect`, `useId` for deterministic IDs.
- First-class TypeScript: strict mode, all types exported, generics documented.

---

## 12. Execution Order
1. Monorepo scaffold, build pipeline, CI, Changesets.
2. `@panux-ui/tokens` + color system + theme engine + `ThemeProvider` (§2, §3, §6).
3. `@panux-ui/core` primitives (Box, Slot, Portal, VisuallyHidden, DismissableLayer, RovingFocusGroup) + the hook layer (§5).
4. **Docs site skeleton** — MDX pipeline, live playground, auto props tables, theme + accent switchers, color/token reference (§8). Build early so every later component ships fully documented.
5. Typography + Layout.
6. Forms (Button → Input family → Checkbox/Radio/Switch → Select/Combobox → Date/Time → Field/Form).
7. Overlays (Popover foundation → Dialog, Menu, Tooltip, HoverCard, Toast, CommandPalette).
8. Navigation + Disclosure.
9. Data Display (Card/Avatar/Badge → Table → DataTable → Tree/Timeline/Carousel).
10. Feedback + Utilities.
11. `@panux-ui/themes` prebuilt themes + theme builder + `@panux-ui/icons`.
12. CLI, migration codemods + mapping tables, guides, `llms.txt`, v1.0 release.

---

## Output Format
Begin with a written **Architecture Decision Record** covering: styling-engine choice (vanilla-extract vs Panda) with rationale, RSC/hydration strategy, theming approach, color-system generation, and docs stack. Apply the Panux brand, package names, and reserved namespaces from §0 consistently in every file, token, class, and page — and ensure nothing mirrors another library's public surface.

Then implement in the order in §12. For each component, hook, and docs page, output **complete file trees with full source** — no placeholders, no `// TODO`, no truncation. Explain non-obvious trade-offs inline as comments. When a design choice diverges from MUI/Ant/Chakra on purpose, note why in a one-line comment so the distinction is intentional and documented.

---

## 13. Keep `.claude` Up to Date

Maintain project memory in a `.claude/` directory at the repo root, and **update it whenever the project changes** — treat it as a living contract, not a one-time file. Specifically:

- Create/maintain `CLAUDE.md` (repo root) and `.claude/` with: the brand and reserved namespaces from §0, the package map, the styling-engine decision, the token/color conventions, the component and hook catalogs, and the conventions any contributor (human or AI) must follow.
- After **every** meaningful change, update `.claude` in the same commit: when a package, component, hook, token, CSS variable, or CLI command is added, renamed, or removed; when the styling engine, theme contract, or folder structure changes; when a convention (naming, `--panux-` prefix, `data-panux-*`, recipe prefix) is introduced or revised; and when the execution order in §12 advances.
- Keep a short **changelog / decisions log** inside `.claude` (or link the ADR) so the current state of the system is always reconstructable from it alone.
- If the library name, scope (`@panux-ui`), domain, or any reserved namespace ever changes again, update `.claude` first, then propagate the rename across the codebase — `.claude` is the source of truth for these values.
- Add a repo check (lint or CI note) reminding contributors that PRs touching public API, tokens, or structure must also update `.claude`.