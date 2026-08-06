'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { highlightCode, type HighlightLang } from '../../lib/highlight';

const tabButtonStyle = (active: boolean): CSSProperties => ({
  padding: '8px 14px',
  fontSize: 13,
  fontWeight: 500,
  border: 'none',
  borderBottom: active ? '2px solid var(--panux-accent-solid)' : '2px solid transparent',
  background: 'transparent',
  color: active ? 'var(--panux-fg-default)' : 'var(--panux-fg-muted)',
  cursor: 'pointer',
});

/**
 * Chakra-UI-style Preview/Code example block: live rendered output by
 * default, a Code tab showing the exact source, and a copy button — the
 * house standard for every component doc page's examples, not just a
 * one-off. See .claude/context/architecture.md §Every Component Page Must
 * Contain and design-system.md.
 */
export function Example({
  code,
  lang = 'tsx',
  children,
}: {
  code: string;
  /** Language for syntax highlighting. @default 'tsx' */
  lang?: HighlightLang;
  children: ReactNode;
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    highlightCode(code, lang).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable (e.g. insecure context) — no-op, not worth surfacing an error for
    }
  };

  return (
    <div
      // `not-prose` (Fumadocs/Tailwind Typography's own escape hatch — see
      // the "shiki ... not-prose ..." class Fumadocs puts on its own code
      // blocks) opts the whole example out of the MDX article's prose
      // typography reset. Without it, `.prose h1/h2/.../p` rules override
      // every Heading/Text recipe variant (size/weight/color) rendered
      // inside a doc page's live preview — every value looked identical
      // regardless of which variant was passed.
      className="not-prose"
      style={{
        border: '1px solid var(--panux-border-default)',
        borderRadius: 'var(--panux-radius-md)',
        overflow: 'hidden',
        margin: '16px 0',
        background: 'var(--panux-bg-canvas)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--panux-border-default)',
          background: 'var(--panux-bg-subtle)',
        }}
      >
        <div style={{ display: 'flex' }}>
          <button type="button" onClick={() => setTab('preview')} aria-pressed={tab === 'preview'} style={tabButtonStyle(tab === 'preview')}>
            Preview
          </button>
          <button type="button" onClick={() => setTab('code')} aria-pressed={tab === 'code'} style={tabButtonStyle(tab === 'code')}>
            Code
          </button>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            marginRight: 8,
            padding: '4px 10px',
            fontSize: 12,
            borderRadius: 'var(--panux-radius-sm)',
            border: '1px solid var(--panux-border-default)',
            background: 'var(--panux-bg-canvas)',
            color: 'var(--panux-fg-muted)',
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {tab === 'preview' ? (
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      ) : html ? (
        // `html` is Shiki's own sanitized output for a hardcoded source
        // string authored in ComponentDemos.tsx — never consumer/user input.
        // See .claude/context/security-baseline.md.
        <div
          style={{ margin: 0, padding: 16, overflow: 'auto', fontSize: 13 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre
          style={{
            margin: 0,
            padding: 16,
            overflow: 'auto',
            background: 'var(--panux-bg-subtle)',
            fontSize: 13,
            fontFamily: 'var(--panux-font-family-mono)',
          }}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
