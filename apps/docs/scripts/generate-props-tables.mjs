// Auto-generates props tables from TypeScript source — CLAUDE.md's hard
// rule "Props tables in docs are auto-generated from TypeScript — never
// hand-written" means this script's output is the *only* source for the
// <PropsTable> component; never hand-edit apps/docs/.generated/props-tables.json.
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withCustomConfig } from 'react-docgen-typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../../..');
const reactPkgDir = resolve(repoRoot, 'packages/react');
const tsconfigPath = resolve(reactPkgDir, 'tsconfig.json');
const srcDir = resolve(reactPkgDir, 'src');

function findComponentFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findComponentFiles(full));
    } else if (entry.name.endsWith('.tsx') && !entry.name.endsWith('.test.tsx') && !entry.name.endsWith('.stories.tsx')) {
      results.push(full);
    }
  }
  return results;
}

// Filters out props whose declaration lives in node_modules (i.e. inherited
// straight from React's HTMLAttributes/AriaAttributes — 280+ entries for
// even a trivial component). Architecture.md wants inherited HTML props
// *acknowledged*, not literally enumerated one-by-one in a table that would
// be near-identical for every component; each generated entry instead notes
// "extends all standard <element> props" — see `hasInheritedDomProps` below.
const parser = withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => !prop.parent?.fileName.includes('node_modules'),
});

const sourceFiles = findComponentFiles(srcDir);
const table = {};

for (const file of sourceFiles) {
  const docs = parser.parse(file);
  for (const doc of docs) {
    const props = Object.fromEntries(
      Object.entries(doc.props).map(([name, prop]) => [
        name,
        {
          type: prop.type.name,
          required: prop.required,
          defaultValue: prop.defaultValue?.value ?? null,
          description: prop.description || null,
        },
      ]),
    );
    table[doc.displayName] = {
      props,
      description: doc.description || null,
      // Every component spreads DOM props per coding-standards.md's hard
      // rule — always true, not detected per-element-type; the props table
      // renders this as a single footer note instead of enumerating
      // React's ~280 HTMLAttributes/AriaAttributes per component.
      extendsDomProps: true,
    };
  }
}

const outDir = resolve(__dirname, '../.generated');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'props-tables.json'), JSON.stringify(table, null, 2));

// eslint-disable-next-line no-console
console.log(`[props-tables] generated ${Object.keys(table).length} component(s): ${Object.keys(table).join(', ')}`);
