/**
 * Dev-only misuse warnings — strips entirely from production builds via the
 * NODE_ENV check (see .claude/context/coding-standards.md §Error Handling).
 * Never throws; use `invariant` for cases that should hard-fail instead.
 */
const warned = new Set<string>();

export function warnOnce(key: string, message: string): void {
  if (process.env.NODE_ENV === 'production') return;
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[sandbar-ui] ${message}`);
}

/** Throws in every environment — a broken compound-component tree isn't a dev-only concern. */
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[sandbar-ui] ${message}`);
  }
}
