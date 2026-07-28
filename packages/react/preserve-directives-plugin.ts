import { readFileSync } from 'node:fs';
import type { Plugin } from 'esbuild';

const DIRECTIVES = ['use client', 'use server'] as const;

function detectDirective(sourcePath: string): (typeof DIRECTIVES)[number] | null {
  let source: string;
  try {
    source = readFileSync(sourcePath, 'utf8').trimStart();
  } catch {
    return null; // virtual/unreadable module (e.g. a vanilla-extract .css.ts) — no directive
  }
  return DIRECTIVES.find((d) => source.startsWith(`"${d}"`) || source.startsWith(`'${d}'`)) ?? null;
}

/**
 * esbuild strips a top-level "use client"/"use server" directive once the
 * file that declared it is bundled into the middle of a larger output file
 * (the directive is only meaningful as literally the first statement of a
 * JS file). This plugin re-detects, post-build, which source files declared
 * a directive and prepends it back onto every emitted output chunk whose
 * inputs include that source — see
 * docs/adr/0001-styling-engine-and-rsc-strategy.md §2 RSC Strategy.
 *
 * tsup runs esbuild with `write: false` internally (so it can apply its own
 * banner/footer/dts logic before writing), so `result.outputFiles` — not the
 * filesystem — is where output content actually lives at `onEnd` time; this
 * plugin mutates those in place rather than reading/writing dist/ directly.
 */
export function preserveDirectivesPlugin(): Plugin {
  return {
    name: 'preserve-directives',
    setup(build) {
      build.initialOptions.metafile = true;
      build.onEnd((result) => {
        if (!result.metafile || !result.outputFiles) return;
        const cache = new Map<string, (typeof DIRECTIVES)[number] | null>();
        const cachedDetect = (path: string) => {
          if (!cache.has(path)) cache.set(path, detectDirective(path));
          return cache.get(path)!;
        };

        for (const outputFile of result.outputFiles) {
          const meta = result.metafile.outputs[outputFile.path] ?? result.metafile.outputs[toRelative(outputFile.path)];
          if (!meta) continue;
          const directive = Object.keys(meta.inputs).map(cachedDetect).find(Boolean);
          if (!directive) continue;

          const current = outputFile.text;
          if (current.startsWith(`"${directive}"`) || current.startsWith(`'${directive}'`)) continue;
          outputFile.contents = new TextEncoder().encode(`"${directive}";\n${current}`);
        }
      });
    },
  };
}

function toRelative(absPath: string): string {
  return absPath.replace(/\\/g, '/').replace(new RegExp(`^${escapeRegExp(process.cwd().replace(/\\/g, '/'))}/`), '');
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
