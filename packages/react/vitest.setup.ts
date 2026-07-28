import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { toHaveNoViolations } from 'jest-axe';
import { afterEach, expect } from 'vitest';

// Explicit rather than relying on vitest's `globals: true` (not enabled in
// vitest.config.ts) — RTL's own auto-cleanup only registers against a true
// global `afterEach`, which we don't have since tests import it from
// 'vitest' explicitly per .claude/context/coding-standards.md conventions.
afterEach(() => {
  cleanup();
});

expect.extend(toHaveNoViolations);
