/**
 * Forces every vanilla-extract generated CSS variable/class name to carry the
 * `panux-` prefix required by CLAUDE.md — vanilla-extract does not prefix
 * identifiers by default (unconfigured, it produces names like
 * `--bg-canvas__sij84e0`). `debugId` reflects the token/recipe's key path;
 * `hash` is the fallback when no debugId is available (e.g. anonymous
 * `style()` calls). Duplicated verbatim from packages/tokens — see the note
 * in docs/adr/0001-styling-engine-and-rsc-strategy.md.
 */
export function panuxUiIdentifiers({ hash, debugId }: { hash: string; debugId?: string }): string {
  const readable = (debugId ?? hash).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  return `panux-${readable}`;
}
