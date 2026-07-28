import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

// Sandpack live playground and Orama search wiring are tracked as follow-up
// work — see apps/docs/README.md and docs/adr/0001-styling-engine-and-rsc-strategy.md.
// No `eslint` block here — Next 16 removed next.config's build-time eslint
// option; linting runs once for the whole monorepo via the root
// `eslint.config.js` (pnpm lint) regardless.
const nextConfig: NextConfig = {};

export default withMDX(nextConfig);
