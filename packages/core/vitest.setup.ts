import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

// See packages/react/vitest.setup.ts for why this is explicit rather than
// relying on vitest's `globals: true`.
afterEach(() => {
  cleanup();
});
