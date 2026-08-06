---
"@sandbar-ui/react": minor
---

Complete the Layout category: add `Bleed`, `Flex`, `Float`, `Grid`, `Group`, `SimpleGrid`, and `Wrap`, each with a vanilla-extract recipe, unit tests, an axe a11y test, a Storybook story, and an MDX docs page with an auto-generated props table.

- `Flex` — the general-purpose flex container (`direction`/`align`/`justify`/`gap`/`wrap`), the full escape hatch `Stack` doesn't cover.
- `Grid`/`SimpleGrid` — CSS grid containers; `columns` is a dynamic prop (like `AspectRatio`'s `ratio`), not a recipe variant. `SimpleGrid` adds `minChildWidth` for a breakpoint-free responsive column count.
- `Group`/`Wrap` — row-only clusters for actions and tag lists, distinct from `Stack`/`Flex` in default spacing and always-wrap behavior.
- `Bleed` — negative-margin escape hatch for content that spans past a padded parent's edge.
- `Float` — absolutely-positions a child at a parent corner (e.g. a status dot on an `Avatar`), with logical placement so it flips under `dir="rtl"`.

This finishes every component in the Layout sidebar category per `.claude/context/architecture.md`'s Component Scope.
