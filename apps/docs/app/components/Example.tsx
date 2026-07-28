'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';

const tabButtonStyle = (active: boolean): CSSProperties => ({
  padding: '8px 14px',
  fontSize: 13,
  fontWeight: 500,
  border: 'none',
  borderBottom: active ? '2px solid var(--sandbar-accent-solid)' : '2px solid transparent',
  background: 'transparent',
  color: active ? 'var(--sandbar-fg-default)' : 'var(--sandbar-fg-muted)',
  cursor: 'pointer',
});

/**
 * Chakra-UI-style Preview/Code example block: live rendered output by
 * default, a Code tab showing the exact source, and a copy button — the
 * house standard for every component doc page's examples, not just a
 * one-off. See .claude/context/architecture.md §Every Component Page Must
 * Contain and design-system.md.
 */
export function Example({ code, children }: { code: string; children: ReactNode }) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

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
      style={{
        border: '1px solid var(--sandbar-border-default)',
        borderRadius: 'var(--sandbar-radius-md)',
        overflow: 'hidden',
        margin: '16px 0',
        background: 'var(--sandbar-bg-canvas)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--sandbar-border-default)',
          background: 'var(--sandbar-bg-subtle)',
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
            borderRadius: 'var(--sandbar-radius-sm)',
            border: '1px solid var(--sandbar-border-default)',
            background: 'var(--sandbar-bg-canvas)',
            color: 'var(--sandbar-fg-muted)',
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
      ) : (
        <pre
          style={{
            margin: 0,
            padding: 16,
            overflow: 'auto',
            background: 'var(--sandbar-bg-subtle)',
            fontSize: 13,
            fontFamily: 'var(--sandbar-font-family-mono)',
          }}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
